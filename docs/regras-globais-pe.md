# Regras globais — Padrão Digital de Pernambuco

Fonte única das regras que valem para **todo** agente deste plugin, extraídas do `AGENTS.md` original do projeto que deu origem a este plugin. Cada agente em `agents/*.md` referencia este arquivo em vez de duplicar o conteúdo abaixo.

## Contexto

Todo trabalho gerado por este plugin usa o **Padrão Digital de Pernambuco**, o Design System oficial do Governo de Pernambuco. O objetivo não é só gerar uma interface — é gerar código limpo, reutilizável e conforme o Design System, em que a aparência visual é consequência do uso correto dos componentes oficiais, não um objetivo em si.

## Stack obrigatória

- Next.js (App Router)
- React
- TypeScript
- `@uigovpe/components`
- `@uigovpe/styles`

## Bibliotecas de UI e CSS proibidas

Nunca usar, recriar ou misturar com: Material UI, Ant Design, Bootstrap, Chakra UI, Tailwind UI, ou qualquer outra biblioteca de UI externa. Nunca recriar um componente que já existe no Design System.

Isso inclui explicitamente **frameworks de CSS utilitário** (Tailwind CSS, UnoCSS, Windi CSS etc.), mesmo quando usados só para layout/espaçamento e não para componentes visuais prontos — usar classes utilitárias (`flex`, `gap-*`, `px-*`, `max-w-*`, `md:*`) para estruturar página é reimplementar por fora o que os tokens de `@uigovpe/styles` e o `FlexContainer` já resolvem, e quebra a régua de espaçamento oficial. Se o projeto-alvo tiver `tailwindcss` (ou similar) instalado, não o utilize para layout de página — reporte a presença dessa dependência no resumo final em vez de aproveitá-la. **Isso já aconteceu em uso real do plugin**: um projeto de teste com `tailwindcss` em `devDependencies` teve todo o layout de página construído com classes Tailwind em vez de tokens do Design System, gerando larguras de container (`max-w-6xl`, `max-w-3xl`, `max-w-md`, `max-w-sm`) e paddings (`py-16`, `py-12`) diferentes por página, sem nenhuma régua compartilhada.

Para composição de layout, o Design System não expõe um componente "Grid" — a primitiva real é `FlexContainer`. Ver `skills/consultar-design-system-pe/references/tokens.md` para a escala de espaçamento e os breakpoints reais a usar em vez de valores arbitrários ou classes utilitárias.

## Regra central: nunca inventar componente ou prop

Antes de usar qualquer componente de `@uigovpe/components`:

1. Verificar que o componente existe na documentação de referência (`skills/consultar-design-system-pe/references/components/INDEX.md` e o arquivo específico do componente).
2. Verificar que o componente é de fato exportado pela versão instalada do pacote no projeto-alvo (não confiar em memória do modelo).
3. Nunca inventar uma prop que não esteja documentada. Se houver incerteza, consultar a documentação disponível ou o Storybook oficial antes de implementar — nunca assumir.
4. Nunca modificar o comportamento de um componente além do que foi pedido.

Ordem de prioridade das fontes de verdade:

1. **Pacote `@uigovpe/components`/`@uigovpe/styles` de fato instalado no projeto-alvo** — é a fonte de verdade mais forte sempre que divergir da documentação local. Já há casos confirmados de divergência real (ex. `Header`/`Footer` documentados em `components/header.md`/`footer.md` mas não exportados pela versão `1.1.39` do pacote) — nesses casos, o pacote instalado vence e a documentação local deve ser tratada como desatualizada, não como autoridade.
2. Documentação local deste plugin (`guides/`, `patterns/`, `components/`) — ponto de partida e referência primária **enquanto não houver conflito confirmado** com o pacote instalado, ou quando o projeto-alvo ainda não tiver o pacote instalado (ver regra de fallback abaixo).
3. Storybook oficial: `https://ligadigital.pe.gov.br/storybook/index.html` — usar quando a documentação local for omissa e o pacote não estiver instalado no projeto-alvo ainda.

Se o pacote não estiver instalado no projeto-alvo, isso é um problema de setup do projeto, não motivo para inventar API: registrar como aviso e seguir validando só contra a documentação local/Storybook.

## Arquitetura da aplicação — providers só no root layout

Antes de implementar qualquer página, verificar se `app/layout.tsx` já está configurado com os providers do Design System exigidos pelo pattern escolhido (ex. `LayoutProvider`, `UiProvider`). Se não estiver, atualizar `app/layout.tsx` antes de implementar qualquer página. **Nunca** adicionar `LayoutProvider` ou `UiProvider` dentro de páginas individuais — providers globais pertencem exclusivamente a `app/layout.tsx`.

## Design System — regras de uso

Sempre:
- Usar componentes de `@uigovpe/components`.
- Usar os tokens reais de `@uigovpe/styles` (cor, espaçamento, tipografia, breakpoints) listados em `skills/consultar-design-system-pe/references/tokens.md` — eles são CSS custom properties (`--color-*`, `--spacing-*`, `--text-size-*` etc.), não constantes JS/TS importáveis.
- Compor layout com `FlexContainer` e os tokens de espaçamento/breakpoint acima (não há componente "Grid" dedicado no pacote).
- Construir interfaces responsivas (desktop, tablet e mobile — nunca desktop-only).
- Construir interfaces acessíveis.
- Usar a tipografia oficial Inter, configurada globalmente (nunca por página/componente).

Nunca:
- Usar cores hardcoded.
- Usar valores arbitrários de espaçamento ou tipografia fora dos tokens.

## Workflow mandatório

Sempre seguir esta sequência antes de escrever código:

1. Entender a funcionalidade pedida.
2. Analisar o conteúdo/contexto.
3. Propor a estrutura da página.
4. Listar os componentes do Design System que serão usados, explicando por que cada um foi escolhido.
5. Explicar as decisões de implementação.
6. Só então escrever o código.

## Qualidade de código

Sempre gerar: código limpo, componentes pequenos, responsabilidade única (SRP), componentes reutilizáveis, tipagem forte, nomenclatura consistente.

Evitar: componentes grandes, código duplicado, abstrações desnecessárias.

## Acessibilidade (obrigatória, não opcional)

- HTML semântico.
- Hierarquia de headings respeitada.
- Texto alternativo (`alt`) em imagens.
- Navegação por teclado garantida.
- Preferir sempre a variante acessível de um componente do Design System, quando existir.

## Responsividade (obrigatória, não opcional)

Toda interface precisa funcionar corretamente em desktop, tablet e mobile. Nunca construir um layout que só funcione em desktop.
