# Authentication Pattern A — Split Login

## Purpose

Recommended authentication pattern for internal systems and backoffice applications.

This pattern combines an authentication form with an institutional panel to reinforce identity and trust.

---

## Layout

Desktop

- Two-column layout.
- Left column: authentication form.
- Right column: institutional panel.
- Columns have similar visual weight.

Mobile

- Single-column layout.
- Authentication area first.
- Institutional panel below the form.

---

## Authentication Area

Typical elements:

- Title
- Description
- Email field
- Password field
- Password recovery
- Primary action
- Optional secondary action

The authentication form is always the primary visual focus.

---

## Institutional Area

Typical elements:

- Product name
- Description
- Illustration or graphic
- Organization branding

No interactive controls are allowed.

---

## Official Components

Compose this pattern using official Design System components.

Typical composition:

- GovBar
- Card
- Typography
- InputText
- InputPassword
- Button
- TextLink

---

## Reference Implementation

- `desktop-reference.png`

Review the reference image before implementing this pattern.

The reference image is part of the official pattern documentation and should be considered together with this document.

Use it to understand the intended:

- composition;
- visual hierarchy;
- spacing;
- proportions;
- visual balance.

If the reference image and this document appear to conflict, follow this document.

Do not reproduce the reference image literally. Preserve its visual intent while adapting the implementation to the project's content and the Design System.

---

## Breakpoint

Use `769px` as the column-collapse threshold (two columns above, single column at/below) — see `references/tokens.md` for why this value instead of an arbitrary one.

## Reference Code Skeleton

Literal starting point — copy and adapt, don't re-derive this structure from prose each time. Institutional-panel color and text use the real semantic tokens from `references/tokens.md`, not a hardcoded hex or a value read ad hoc from the compiled CSS.

```tsx
export default function LoginPage() {
  return (
    <div className="split-login">
      <div className="split-login__form-column">
        <Card elevation="low">
          <Typography variant="h1" size="lg" fontWeight="bold">
            Entrar
          </Typography>
          <Typography variant="p" size="default">
            Acesse sua conta para continuar.
          </Typography>
          <InputText id="email" label="E-mail" />
          <InputPassword id="password" label="Senha" />
          <TextLink href="/recuperar-senha">Esqueci minha senha</TextLink>
          <Button variant="primary">Entrar</Button>
        </Card>
      </div>
      <div
        className="split-login__institutional-column"
        style={{
          backgroundColor: 'var(--color-surface-primary-strong)',
          color: 'var(--color-text-bright, #fff)',
        }}
      >
        <Typography variant="h2" size="xl" fontWeight="bold">
          Nome do serviço/programa
        </Typography>
        <Typography variant="p" size="default">
          Descrição institucional curta.
        </Typography>
      </div>
    </div>
  );
}
```

```css
.split-login {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

@media (min-width: 769px) {
  .split-login {
    flex-direction: row;
  }
  .split-login__form-column,
  .split-login__institutional-column {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.split-login__form-column {
  background-color: var(--color-background-default);
  padding: var(--spacing-32);
}

.split-login__institutional-column {
  padding: var(--spacing-40);
}
```

Confirme `--color-text-bright` (ou o nome real do token de texto claro) contra `node_modules/@uigovpe/styles/dist/index.css` do projeto-alvo antes de usar — não foi possível confirmar esse nome exato na extração que gerou `tokens.md`; se não existir, use branco (`#fff`) só neste caso pontual (texto sobre fundo de marca escuro), documentando a exceção no resumo final.

## Composition Rules

- The authentication form must be vertically centered.
- Both columns occupy the full available content height.
- Preserve generous whitespace around the form.
- The authentication area must use the official Design System Card component.
- Do not replace the Card with custom containers.
- The institutional panel uses the primary brand color.
- The form area uses a neutral background.
- The institutional panel is a supporting element and must not compete visually with the authentication form.

---

## Adaptation Rules

Do not change:

- page composition;
- column structure;
- authentication flow;
- component hierarchy.

Adapt as needed:

- titles;
- descriptions;
- illustrations;
- branding.

---

## Do

- Keep the authentication form as the primary action.
- Reinforce institutional identity.
- Use official Design System components only.

## Don't

- Add secondary content inside the form.
- Compete visually with the authentication flow.
- Introduce additional navigation.