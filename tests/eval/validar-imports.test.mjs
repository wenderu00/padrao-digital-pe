// Suíte sintética, sem LLM (CONTRIBUTING.md §5) — testa hooks/validar-imports.mjs
// diretamente, contra o fixture em tests/fixtures/mock-project/. Rodar com:
//   node --test tests/eval/validar-imports.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const HOOK = path.join(REPO_ROOT, "hooks", "validar-imports.mjs");
const FIXTURE_FILE = path.join(
  REPO_ROOT,
  "tests",
  "fixtures",
  "mock-project",
  "app",
  "pagina-teste.tsx"
);

function runHook(content, filePath = FIXTURE_FILE) {
  const event = {
    tool_name: "Write",
    tool_input: { file_path: filePath, content },
  };
  const result = spawnSync("node", [HOOK], {
    input: JSON.stringify(event),
    encoding: "utf8",
  });
  return result;
}

test("permite componentes reais do pacote instalado (fixture)", () => {
  const { status } = runHook(
    `import { Button, Card } from "@uigovpe/components";\nexport default function P() { return <Card><Button/></Card>; }`
  );
  assert.equal(status, 0);
});

test("bloqueia componente inventado não presente no pacote instalado", () => {
  const { status, stderr } = runHook(
    `import { Button, StatusBadge } from "@uigovpe/components";\nexport default function P() { return <StatusBadge/>; }`
  );
  assert.equal(status, 2);
  assert.match(stderr, /StatusBadge/);
});

test("bloqueia import nomeado de @uigovpe/styles (pacote é CSS puro, sem exports JS)", () => {
  const { status, stderr } = runHook(
    `import { corPrimaria } from "@uigovpe/styles";\nexport default function P() { return null; }`
  );
  assert.equal(status, 2);
  assert.match(stderr, /não tem exports JS\/TS reais/);
});

test("ignora arquivos que não são .ts/.tsx", () => {
  const { status } = runHook(
    `import { StatusBadgeQualquerCoisa } from "@uigovpe/components";`,
    path.join(REPO_ROOT, "tests", "fixtures", "mock-project", "app", "estilo.css")
  );
  assert.equal(status, 0);
});

test("ignora arquivos sem nenhum import de @uigovpe/*", () => {
  const { status } = runHook(`export default function P() { return null; }`);
  assert.equal(status, 0);
});

test("hierarquia Backoffice completa não gera achado", () => {
  const { status } = runHook(
    `import { LayoutProvider, UiProvider, AppLayout, GovBar, AdminSideBar, AdminUserBar, MainContent, PageContent } from "@uigovpe/components";
     export default function L() {
       return <LayoutProvider template="backoffice"><UiProvider><AppLayout><GovBar/><AdminSideBar/><AdminUserBar/><MainContent><PageContent/></MainContent></AppLayout></UiProvider></LayoutProvider>;
     }`
  );
  assert.equal(status, 0);
});

test("hierarquia Backoffice incompleta é bloqueada com os nomes faltantes", () => {
  const { status, stderr } = runHook(
    `import { LayoutProvider, AppLayout, GovBar } from "@uigovpe/components";
     export default function L() {
       return <LayoutProvider template="backoffice"><AppLayout><GovBar/></AppLayout></LayoutProvider>;
     }`
  );
  assert.equal(status, 2);
  assert.match(stderr, /AdminSideBar/);
  assert.match(stderr, /PageContent/);
});

test("componente real mas com grafia incorreta (AdminSidebar) é bloqueado", () => {
  const { status, stderr } = runHook(
    `import { AdminSidebar } from "@uigovpe/components";\nexport default function P() { return <AdminSidebar/>; }`
  );
  assert.equal(status, 2);
  assert.match(stderr, /AdminSidebar/);
});
