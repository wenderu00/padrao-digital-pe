---
type: llm
weight: 1
---

Avalie a transcrição de uma execução do plugin `padrao-digital-pe` respondendo ao pedido de um painel administrativo ("backoffice").

Uma resposta bem-sucedida deve, no mínimo:

1. Ter consultado o template oficial "Backoffice" do Design System antes de implementar, não uma estrutura de dashboard genérica inventada.
2. Ter respeitado a hierarquia obrigatória do template: `AppLayout` contendo `GovBar` + `MainLayout`, com `MainLayout` composto por `AdminSideBar` (menu lateral) e `ContentSection`, e `ContentSection` composta por `AdminUserBar` (barra do usuário/breadcrumb) e `MainContent` (que por sua vez tem `BreadCrumbSection` + `PageContent`). Não precisa citar os nomes exatos dos componentes internos, mas a composição em disco deve refletir essa hierarquia — nunca uma estrutura paralela ou simplificada que pule níveis.
3. Ter configurado `LayoutProvider` (ou equivalente) com o template de backoffice, e ter garantido que esse provider global vive em `app/layout.tsx` — nunca dentro de uma página individual.
4. Não ter removido nem substituído GovBar, Sidebar ou UserBar por implementação própria — esses são obrigatórios no pattern.
5. Não ter usado nenhuma biblioteca de UI externa (Material UI, Ant Design, Bootstrap, Chakra, Tailwind UI) nem cor/espaçamento hardcoded — isso inclui usar um framework de CSS utilitário (ex. classes Tailwind `flex`/`gap-*`/`px-*`/`max-w-*`) para layout/espaçamento em vez dos tokens do Design System, mesmo sem nenhum componente visual de terceiros envolvido.
6. Ter passado por alguma forma de validação/revisão (menção a verificação de componentes e/ou acessibilidade no relatório final) antes de considerar a tarefa concluída.

Penalize fortemente se: criou uma estrutura de layout paralela ignorando a hierarquia obrigatória; colocou os providers fora de `app/layout.tsx`; ou usou uma lib de UI externa.

Dê uma nota de 0 a 1 e justifique em 2-4 frases quais dos critérios acima foram e não foram atendidos.
