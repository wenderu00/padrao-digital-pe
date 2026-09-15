#!/usr/bin/env node
// Guardrail determinístico proposto em CONTRIBUTING.md §4: reforça, sem chamada de LLM,
// a mesma regra que `agents/validador-componentes-pe.md` já aplica por julgamento —
// nunca importar um componente/token que o pacote instalado no projeto-alvo não exporta.
// Roda como hook PostToolUse em Write (ver hooks/hooks.json). Lê o payload do evento via stdin.

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

function readStdin() {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function findPackageRoot(startDir, pkgName) {
  let dir = startDir;
  for (let i = 0; i < 25; i++) {
    const candidate = path.join(dir, "node_modules", ...pkgName.split("/"));
    if (existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function collectDtsText(pkgRoot) {
  const files = [];
  function walk(dir) {
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry);
      let st;
      try {
        st = statSync(full);
      } catch {
        continue;
      }
      if (st.isDirectory()) {
        walk(full);
      } else if (entry.endsWith(".d.ts")) {
        files.push(full);
      }
    }
  }
  walk(pkgRoot);
  return files.map((f) => {
    try {
      return readFileSync(f, "utf8");
    } catch {
      return "";
    }
  }).join("\n");
}

function extractNamedImports(content, pkg) {
  const names = new Set();
  const re = new RegExp(
    `import\\s*(?:type\\s*)?\\{([^}]+)\\}\\s*from\\s*['"]${pkg.replace("/", "\\/")}['"]`,
    "g"
  );
  let m;
  while ((m = re.exec(content))) {
    for (const raw of m[1].split(",")) {
      const name = raw.trim().split(/\s+as\s+/)[0].trim();
      if (name) names.add(name);
    }
  }
  return names;
}

function main() {
  const raw = readStdin();
  if (!raw) process.exit(0);

  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const toolName = event.tool_name || event.tool || "";
  if (toolName !== "Write") process.exit(0);

  const input = event.tool_input || {};
  const filePath = input.file_path || input.path;
  const content = input.content ?? "";
  if (!filePath || !/\.(tsx|ts)$/.test(filePath)) process.exit(0);
  if (!content.includes("@uigovpe/")) process.exit(0);

  const startDir = path.dirname(filePath);

  const componentsImports = extractNamedImports(content, "@uigovpe/components");
  const stylesImports = extractNamedImports(content, "@uigovpe/styles");

  const problems = [];

  // Check estrutural leve: se o arquivo configura o template Backoffice, confirme que os
  // 8 componentes obrigatórios da hierarquia (backoffice.md) estão todos presentes.
  if (content.includes('template="backoffice"') || content.includes("template='backoffice'")) {
    const required = [
      "LayoutProvider",
      "UiProvider",
      "AppLayout",
      "GovBar",
      "AdminSideBar",
      "AdminUserBar",
      "MainContent",
      "PageContent",
    ];
    const missing = required.filter((name) => !content.includes(name));
    if (missing.length > 0) {
      problems.push(
        `template="backoffice" detectado, mas a hierarquia obrigatória (patterns/backoffice/backoffice.md) está incompleta neste arquivo — componente(s) ausente(s): ${missing.join(", ")}. ` +
        `Se a hierarquia está de fato completa mas dividida entre múltiplos arquivos (ex. layout.tsx + page.tsx), ignore este aviso — este check só olha o conteúdo de um arquivo por vez.`
      );
    }
  }

  if (stylesImports.size > 0) {
    problems.push(
      `@uigovpe/styles não tem exports JS/TS reais (é um pacote CSS puro — ver references/tokens.md). ` +
      `Import nomeado inválido: { ${[...stylesImports].join(", ")} } from '@uigovpe/styles'. ` +
      `Use tokens via CSS custom properties (var(--nome)), não import nomeado.`
    );
  }

  if (componentsImports.size > 0) {
    const pkgRoot = findPackageRoot(startDir, "@uigovpe/components");
    if (!pkgRoot) {
      // Pacote não instalado no projeto-alvo: aviso de setup, não bloqueio (ver docs/regras-globais-pe.md).
      console.error(
        `[validar-imports] Aviso: @uigovpe/components não encontrado em node_modules a partir de ${startDir}. ` +
        `Não foi possível confirmar os imports contra o pacote real — validação segue só via agente validador-componentes-pe.`
      );
      process.exit(0);
    }

    const dtsText = collectDtsText(pkgRoot);
    const notFound = [...componentsImports].filter((name) => {
      const re = new RegExp(`\\b${name}\\b`);
      return !re.test(dtsText);
    });

    if (notFound.length > 0) {
      problems.push(
        `Componente(s) importado(s) de '@uigovpe/components' não encontrados nos arquivos de tipos do pacote instalado (${pkgRoot}): ${notFound.join(", ")}. ` +
        `Confirme o nome exato (ex. AdminSideBar, não AdminSidebar) contra node_modules/@uigovpe/components/**/*.d.ts antes de usar, ou rode o agente validador-componentes-pe.`
      );
    }
  }

  if (problems.length > 0) {
    console.error(`[validar-imports] ${path.basename(filePath)}:\n- ${problems.join("\n- ")}`);
    process.exit(2); // bloqueia e devolve o stderr como feedback acionável
  }

  process.exit(0);
}

main();
