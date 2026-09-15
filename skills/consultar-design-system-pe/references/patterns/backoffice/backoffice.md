# Backoffice

## Objetivo

O Backoffice é o template oficial para aplicações administrativas do Design System do Governo de Pernambuco.

Este template define a estrutura base da aplicação, organizando os principais componentes responsáveis pela navegação, identidade visual e área de conteúdo.

Sempre que uma aplicação possuir uma área administrativa, este template deve ser utilizado antes da implementação de qualquer funcionalidade.

---

# Quando utilizar

Utilize este template para:

- Sistemas administrativos
- Painéis internos
- Backoffice
- Área autenticada
- Gestão de conteúdo
- Cadastro de informações
- Administração de usuários
- Configurações do sistema
- Aplicações internas

---

# Quando não utilizar

Não utilize este template para:

- Landing Pages
- Portais públicos
- Páginas institucionais
- Fluxos de autenticação
- Formulários independentes

Nestes casos utilize o template correspondente.

---

# Objetivo do template

Este template possui quatro responsabilidades principais:

- Definir a estrutura global da aplicação.
- Configurar o contexto de layout através do LayoutProvider.
- Organizar as áreas fixas da interface.
- Disponibilizar uma área para renderização das páginas.

O GovBar faz parte da estrutura obrigatória do Pattern Backoffice.

Além de representar a identidade institucional do Governo de Pernambuco, o GovBar centraliza funcionalidades globais da aplicação, como recursos de acessibilidade e preferências de interface.

O AdminUserBar complementa o GovBar, apresentando o contexto da página e as informações do usuário autenticado.

Esses componentes possuem responsabilidades distintas e complementares, não devendo ser removidos, substituídos ou utilizados de forma isolada.

Este template não define o conteúdo das páginas.

As páginas devem ser implementadas utilizando os patterns específicos definidos pelo Design System.

---

# Estrutura da aplicação

Toda aplicação deve seguir a seguinte hierarquia.

```text
RootLayout

└── LayoutProvider
    │
    └── UiProvider
        │
        └── AppLayout
            │
            ├── GovBar
            │
            └── MainLayout
                │
                ├── AdminSideBar
                │
                └── ContentSection
                    │
                    ├── AdminUserBar
                    │
                    └── MainContent
                        │
                        ├── BreadCrumbSection
                        │
                        └── PageContent
```

Todo conteúdo da aplicação deve ser renderizado dentro de `PageContent`.

---

# Composição da interface

O Pattern Backoffice possui uma estrutura visual fixa, responsável por organizar a navegação e o conteúdo da aplicação.

```text
┌────────────────────────────────────────────┐
│ GovBar                                     │
├───────────────┬────────────────────────────┤
│               │ Admin UserBar              │
│               ├────────────────────────────┤
│ AdminSideBar  │                            │
│               │       PageContent          │
│               │                            │
└───────────────┴────────────────────────────┘
```

Cada área possui uma responsabilidade específica:

- **GovBar:** apresenta a identidade institucional da aplicação.
- **AdminSideBar:** disponibiliza a navegação principal entre os módulos do sistema.
- **AdminUserBar:** apresenta o contexto da página e as informações do usuário autenticado.
- **PageContent:** recebe o conteúdo específico de cada funcionalidade.

A estrutura do Pattern Backoffice deve permanecer inalterada durante toda a aplicação.

Apenas o conteúdo renderizado em **PageContent** deve variar de acordo com a funcionalidade implementada.

---

# Componentes obrigatórios

A estrutura do Backoffice é composta pelos seguintes componentes.

| Componente | Obrigatório |
|------------|-------------|
| LayoutProvider | ✅ |
| UiProvider | ✅ |
| AppLayout | ✅ |
| GovBar | ✅ |
| AdminSideBar | ✅ |
| AdminUserBar | ✅ |
| MainContent | ✅ |
| PageContent | ✅ |

---

# Configuração obrigatória

O LayoutProvider deve envolver toda a aplicação.

```tsx
<LayoutProvider
    breakpoint={900}
    template="backoffice"
>
    <UiProvider>
        {children}
    </UiProvider>
</LayoutProvider>
```

O atributo `template="backoffice"` é obrigatório para aplicações administrativas.

---

# Esqueleto de código de referência

`AppLayout` é um componente composto — suas partes (`MainLayout`, `ContentSection`, `BreadCrumbSection`, `MainContent`, `PageContent`) são acessadas como `AppLayout.MainLayout` etc., não como componentes soltos importados individualmente. Copie e adapte este esqueleto em vez de recompor a árvore do zero a cada geração.

```tsx
// app/admin/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <GovBar />
      <AppLayout.MainLayout>
        <AdminSideBar items={sidebarItems} />
        <AppLayout.ContentSection>
          <AdminUserBar />
          <AppLayout.MainContent>
            <AppLayout.BreadCrumbSection />
            <AppLayout.PageContent>{children}</AppLayout.PageContent>
          </AppLayout.MainContent>
        </AppLayout.ContentSection>
      </AppLayout.MainLayout>
    </AppLayout>
  );
}
```

```tsx
// app/layout.tsx (root — LayoutProvider/UiProvider só aqui, nunca em app/admin/layout.tsx)
<LayoutProvider breakpoint={900} template="backoffice">
  <UiProvider>{children}</UiProvider>
</LayoutProvider>
```

Confirme os nomes exatos das subpartes de `AppLayout` (`MainLayout`/`ContentSection`/`BreadCrumbSection`/`MainContent`/`PageContent`) contra `node_modules/@uigovpe/components/**/*.d.ts` do projeto-alvo antes de usar — são compostos reais confirmados no pacote, mas confirme a forma exata de acesso (propriedade estática vs. export nomeado) na versão instalada.

Para o conteúdo de `PageContent`, ver os padrões dedicados: `pagecontent-listagem.md`, `pagecontent-formulario.md`, `pagecontent-detalhes.md`.

---

# Fluxo de implementação

Sempre implemente um Backoffice seguindo esta sequência.

1. Configurar o RootLayout.
2. Adicionar o LayoutProvider.
3. Definir o template como `backoffice`.
4. Adicionar o UiProvider.
5. Criar o AppLayout.
6. Inserir o GovBar.
7. Inserir o AdminSideBar.
8. Inserir o AdminUserBar.
9. Criar a área de conteúdo.
10. Renderizar as páginas dentro de `PageContent`.

---

# Regras

Sempre:

- Utilizar LayoutProvider.
- Utilizar `template="backoffice"`.
- Utilizar UiProvider.
- Utilizar AppLayout.
- Utilizar GovBar.
- Utilizar AdminSideBar.
- Utilizar AdminUserBar.
- Preservar a estrutura do Pattern Backoffice.
- Renderizar as páginas exclusivamente em `PageContent`.

Nunca:

- Criar páginas administrativas fora do AppLayout.
- Inserir conteúdo diretamente no MainLayout.
- Remover GovBar.
- Remover AdminSideBar.
- Remover AdminUserBar.
- Alterar a estrutura base do Pattern Backoffice.
- Criar estruturas paralelas ao Backoffice.

---

# Fluxo esperado da IA

Ao receber solicitações como:

- Crie um CRUD.
- Crie um painel administrativo.
- Crie um sistema interno.

A IA deve executar o seguinte fluxo.

```text
Solicitação

↓

Identificar que a aplicação utiliza o Pattern Backoffice

↓

Criar RootLayout

↓

Configurar LayoutProvider

↓

Configurar template="backoffice"

↓

Criar AppLayout

↓

Adicionar GovBar

↓

Adicionar AdminSideBar

↓

Adicionar AdminUserBar

↓

Criar PageContent

↓

Preservar a estrutura do Pattern Backoffice

↓

Implementar a funcionalidade somente em PageContent
```

---

# Patterns de conteúdo de `PageContent`

Este documento define apenas a estrutura base da aplicação. Os padrões abaixo complementam o Backoffice para o conteúdo de `PageContent` (a única parte que varia):

- `pagecontent-listagem.md` — tabela + filtro + paginação (CRUD: listar).
- `pagecontent-formulario.md` — formulário em seções (CRUD: criar/editar).
- `pagecontent-detalhes.md` — visualização somente-leitura (CRUD: detalhar).

Um Wizard (fluxo multi-etapa dentro do Backoffice) reaproveita a composição de `patterns/servico-publico/solicitacao-stepper.md` (StepperHeader/StepperBody) dentro de `PageContent` — não é um pattern separado.