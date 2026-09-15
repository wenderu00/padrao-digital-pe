# Pattern — Navigation (Header/Footer/Menu genérico)

Categoria prometida em `guides/layout.md` sem arquivo até esta versão. Cobre a composição de navegação de páginas que **não** usam o pattern Backoffice (que tem sua própria navegação via `AdminSideBar`/`AdminUserBar`) nem o Split Login (que não tem navegação).

## Componentes

`Header` e `Footer` **não existem como componentes** de `@uigovpe/components` (ver avisos em `components/header.md`/`components/footer.md`) — são padrões de composição com HTML semântico + `GovBar`/`Menu`/`Typography`/`TextLink`.

## Esqueleto de código de referência

```tsx
// componente de projeto, não um import de @uigovpe/components
function SiteHeader() {
  return (
    <header>
      <Typography variant="span" size="md" fontWeight="bold">
        Nome do serviço
      </Typography>
      <Menu items={navItems} />
    </header>
  );
}

function SiteFooter() {
  return (
    <footer>
      <Typography variant="p" size="sm">
        Secretaria/órgão responsável
      </Typography>
      <Divider />
      <nav>
        <TextLink href="/acessibilidade">Acessibilidade</TextLink>
        <TextLink href="/privacidade">Privacidade</TextLink>
      </nav>
    </footer>
  );
}
```

## Regras

- `GovBar` sempre acima deste header (identidade do Governo de PE é sempre distinta da identidade da aplicação).
- Mobile: navegação colapsa para menu (ver `components/menu.md` e `components/header.md` para o comportamento de abrir/fechar acessível).
- Nunca recriar `AdminSideBar`/`AdminUserBar` fora do contexto Backoffice — se a aplicação precisa de navegação lateral persistente entre módulos, ela é um Backoffice, use aquele pattern em vez deste.
