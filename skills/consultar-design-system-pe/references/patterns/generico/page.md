# Pattern — Page (institucional/conteúdo genérico)

Uma das quatro categorias prometidas em `guides/layout.md` (Page/Form/Navigation/Dashboard) e que, até esta versão, não tinha nenhum arquivo — o `especialista-layout-generico-pe` operava só com prosa heurística ("planeje seções, então escolha componentes"), sem nenhuma composição de referência. Este pattern cobre landing pages e páginas institucionais/de conteúdo (sobre, programa, campanha) que não são consulta, solicitação nem backoffice.

## Composição oficial

- `GovBar` (sempre) + `Navigation Pattern` (ver `navigation.md`) para cabeçalho/navegação da aplicação.
- Seção de destaque (hero): `Typography` (h1 + descrição) + `Button`/`TextLink` de ação principal, dentro de um `FlexContainer`.
- Seções de conteúdo: cada seção com um título (`Typography variant="h2"`) e um dos blocos de composição abaixo, nunca texto solto sem estrutura:
  - Lista de serviços/itens relacionados: `Card`s em grid (`FlexContainer` com wrap), um `Card` por item.
  - Conteúdo expansível (perguntas frequentes etc.): `Accordion`.
  - Chamada secundária: `Card` + `Button`.
- Rodapé: `Navigation Pattern` (footer, ver `navigation.md`) "quando fizer sentido institucionalmente" (nem toda página de conteúdo curta precisa de um footer completo).

## Esqueleto de código de referência

```tsx
export default function LandingPage() {
  return (
    <>
      <GovBar />
      <SiteHeader /> {/* ver navigation.md */}

      <section className="hero">
        <Typography variant="h1" size="xxl" fontWeight="bold">
          Título do serviço/programa
        </Typography>
        <Typography variant="p" size="lg">
          Descrição curta do que a página oferece.
        </Typography>
        <Button variant="primary">Ação principal</Button>
      </section>

      <section>
        <Typography variant="h2" size="xl" fontWeight="bold">
          Serviços relacionados
        </Typography>
        <div className="card-grid">
          <Card elevation="low">{/* ... */}</Card>
          <Card elevation="low">{/* ... */}</Card>
        </div>
      </section>

      <SiteFooter /> {/* ver navigation.md */}
    </>
  );
}
```

```css
.hero {
  padding: var(--spacing-64) var(--spacing-32);
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-24);
}
```

Use sempre `--spacing-*` de `references/tokens.md` para o padding de seção — não um valor Tailwind/px arbitrário (ver proibição explícita em `docs/regras-globais-pe.md`).

## Nunca

- Empilhar seções sem hierarquia de heading clara (todo `h2` de seção deve vir depois de um único `h1` na página).
- Usar classes utilitárias de um framework CSS para o grid de cards — usar `FlexContainer`/flexbox próprio com os tokens de espaçamento.
