# Tokens — Padrão Digital de Pernambuco

Fonte única de valores reais de `@uigovpe/styles`. Extraído por leitura direta de `node_modules/@uigovpe/styles@1.1.21/dist/index.css` num projeto real com o pacote instalado — não são valores inventados nem aproximados.

**Importante:** `@uigovpe/styles` é um pacote **CSS puro** (`dist/index.css`, `dist/no-reset.css`; `index.d.ts` é vazio, "side-effect CSS package; no runtime exports"). Todo token é uma **CSS custom property** (`var(--nome)`), nunca uma constante JS/TS importável. Use os tokens via `style={{ color: 'var(--color-surface-primary-default)' }}`, uma classe CSS própria do projeto que os referencia, ou a prop dedicada do componente (ex. `Card`'s `elevation`) — nunca hardcode o valor hex/px equivalente.

Versão consultada: `@uigovpe/components@1.1.39` + `@uigovpe/styles@1.1.21`. Se o projeto-alvo tiver uma versão diferente instalada, os *nomes* dos tokens abaixo tendem a ser estáveis, mas confirme os valores em `node_modules/@uigovpe/styles/dist/index.css` antes de assumir — ver ordem de prioridade de fontes de verdade em `docs/regras-globais-pe.md`.

## Cores

### Paleta base
5 famílias, 5 tons cada (`default/soft/softer/softest/strong`):

`dark-blue`, `dark-gray`, `dark-green`, `dark-red`, `dark-yellow`, `light-blue`, `light-gray`, `light-green`, `light-red`, `light-yellow` — ex.: `--color-dark-blue-default: #0b2463`, `--color-light-blue-default: #0034b7`, `--color-light-red-default: #ac1010`, `--color-light-green-default: #2b6418`, `--color-light-yellow-default: #ffb60c`.

Use a paleta base só quando não houver um token semântico equivalente abaixo — prefira sempre o semântico.

### Camada semântica (preferir estes)
- `--color-surface-{primary,secondary,danger,success,warning,plain}-{default,soft,softer,softest,strong}` — superfícies (fundos de blocos, cards, painéis).
- `--color-feedback-{danger,info,success,warning}-*` — estados de feedback (Message, Toast, validação de campo).
- `--color-outline-{primary,secondary,danger,success,warning,default,disabled,strong,softest}` — bordas/contornos.
- `--color-background-{default,secondary,dark,darker,feedback-*}` — fundo de página/seção.
- `--text-color: #212529` (texto padrão), `--text-color-secondary: #6c757d` (texto secundário/legenda).

**Atenção:** algumas variáveis semânticas (ex. `--color-surface-primary-default`) têm **duas definições diferentes no mesmo `index.css`**, provavelmente sob seletores de tema claro/escuro distintos. Antes de citar um valor hex específico num doc ou decisão, confirme sob qual seletor ele se aplica no CSS real — não assuma que existe um único valor global por nome de token.

### Painel institucional do Split Login
O painel de marca do Split Login (`patterns/authentication/split-login.md`) deve usar `--color-surface-primary-strong` para o fundo e `--color-text-bright` (ou `--text-color` invertido, conforme o que o CSS definir para texto sobre fundo escuro) para o texto — não resolver isso lendo o CSS bruto a cada geração nem hardcodar um hex. Ver também a nota em `patterns/authentication/split-login.md`.

## Espaçamento

Escala numérica única (`--spacing-N`, em px), sem nomes semânticos (não há "sm/md/lg"):

```
--spacing-2   2px
--spacing-4   4px
--spacing-6   6px
--spacing-8   8px
--spacing-10  10px
--spacing-12  12px
--spacing-16  16px
--spacing-20  20px
--spacing-24  24px
--spacing-32  32px
--spacing-40  40px
--spacing-48  48px
--spacing-56  56px
--spacing-64  64px
--spacing-72  72px
--spacing-80  80px
```

Use sempre o valor da escala mais próximo da necessidade — nunca um px arbitrário fora dela (ex. nunca `padding: 18px`; use `--spacing-16` ou `--spacing-20`).

## Tipografia

- Tamanhos (`--text-size-*`): `xs`/`ultrasmall` = 12px, `sm`/`small` = 14px, `default` = 16px, `md` = 20px, `lg` = 24px, `xl` = 32px, `xxl` = 40px, `xxxl` = 64px. (`default`/`small`/`ultrasmall` são sinônimos de `sm`/`xs` respectivamente — não são um tamanho extra.)
- Pesos: `--font-weight-regular: 400`, `--font-weight-medium: 500`, `--font-weight-bold: 700`.
- Line-heights: `--line-height-120: 1.2`, `--line-height-140: 1.4`, `--line-height-150: 1.5`.
- Componente `Typography`: `variant` = `h1..h6 | p | span | label | div | small | display`; `size` = um dos nomes acima; `fontWeight` = `regular|medium|bold`; `textAlign`, `textTransform`.

Fonte Inter é aplicada globalmente via `next/font/google` em `app/layout.tsx` (ver `guides/typography.md`) — os tokens acima controlam tamanho/peso/altura de linha, não a família da fonte.

## Breakpoints

**Não há um breakpoint canônico único do Design System.** Media queries reais encontradas no CSS compilado: `480px`, `680px`, `769px`, `1024px`, `1280px` (`680px` e `1024px` são os mais recorrentes). `LayoutProvider` aceita `breakpoint?: number` como prop livre — não tem um valor default documentado além do `900` já fixado pelo pattern Backoffice.

Para cada padrão que define comportamento responsivo (Split Login, Backoffice, e os que forem criados para Serviço Público/Genérico), declare explicitamente qual breakpoint usar em vez de deixar como decisão implícita do especialista:
- **Backoffice:** `breakpoint={900}` (já documentado em `patterns/backoffice/backoffice.md`).
- **Split Login:** usar `769px` (mudança coluna dupla → única) como referência — mais próximo dos breakpoints reais do CSS compilado do que um valor arbitrário.
- **Demais padrões:** na ausência de exigência específica, usar `1024px` como limite desktop/tablet e `680px` como limite tablet/mobile, por serem os dois valores mais recorrentes no CSS do próprio pacote.

## Elevação e borda

- `--border-radius: 8px` — único valor de raio de borda em todo o pacote; use-o em vez de qualquer outro valor.
- `--elevation-{low,medium,high}` — mapeiam para tons de cinza (não para `box-shadow` direto). Não há tokens de `z-index`; resolva empilhamento por ordem no DOM/contexto de empilhamento local, não por valores arbitrários de `z-index`.
- `Card` aceita a prop `elevation?: "low" | "medium" | "high"` — prefira essa prop a qualquer sombra customizada.

## `LayoutProvider` — dois templates reais

`LayoutProvider` aceita `template?: 'backoffice' | 'landingpage'`. **`'landingpage'` existe de verdade no componente mas não está documentado em nenhum arquivo do plugin hoje.** Ao criar/revisar o padrão de Layout Genérico (landing page/institucional), avaliar se `template="landingpage"` deve ser o provider oficial desse padrão em vez de deixar o root layout sem template definido — hoje `agents/orquestrador-paginas-pe.md` só define um requisito de provider explícito para Backoffice.

## Componentes reais existentes mas hoje fora do catálogo (`components/INDEX.md`)

Confirmados por leitura de `node_modules/@uigovpe/components@1.1.39/dist/index.d.ts` e ausentes ou incorretos no catálogo atual — ver tarefa de atualização do `INDEX.md`:

`Loading`, `LoadingScreen` (estado de carregamento/processamento — hoje nenhum doc do plugin aponta para eles, e `guides/services/consulta.md`/`solicitacao.md` exigem comunicar um estado "processando" sem indicar com o quê), `InputMasked` (distinto de `InputMask` — nomes quase idênticos, risco de confusão), `InputCurrency`, `InputSearch`, `InputSwitch`, `FileInput` (distinto de `InputFile`, que também existe), `Divider`, `FlexContainer`, `Image`, `Galleria`, `Avatar`, `Icon`, `OverlayPanel`, `Badge`, `XviaLayoutProvider`, subcomponentes de sidebar (`SidebarFooter`, `SidebarItem`, `SidebarLogo`, `SidebarSection`, `SidebarSubItem`, `SidebarToggleButton`), hooks `useInitials`/`useWindowSize`.

`StepperHeader` e `StepperBody` existem como dois componentes separados — **não existe um componente único `Stepper`** (ver correção em `components/stepper.md`).

`Header` e `Footer` **não existem** como componentes exportados (confirmado ausentes em `dist/index.d.ts`) — ver aviso em `components/header.md`/`components/footer.md`.
