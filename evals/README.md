# Eval suite — padrao-digital-pe

Suíte de testes automatizados usando `claude plugin eval` (nativo do Claude Code). Cada caso mora em `evals/<nome>/` com `prompt.md` (o pedido + config de tools/turnos) e `graders/criteria.md` (rubrica avaliada por um LLM juiz).

## Pré-requisito

Os agentes deste plugin esperam operar dentro de um projeto Next.js que já tenha `@uigovpe/components` e `@uigovpe/styles` instalados. O `claude plugin eval` roda o agente no diretório de trabalho atual — então rode a partir de um projeto assim, não de dentro deste repo do plugin.

O `poc-template-generator` já tem essas dependências instaladas e serve como fixture de teste:

```bash
cd /home/wenderu/projects/jp/poc-template-generator
```

`~/projects/teste-pe` é outro projeto real com `@uigovpe/components@1.1.39`/`@uigovpe/styles@1.1.21` de fato instalados e já usado para testar este plugin manualmente — serve como segunda fixture, e o código gerado nele (`app/login`, `app/admin`, `app/consulta-protocolo`, `app/solicitacao-segunda-via`) foi a evidência real que motivou várias correções deste plugin (ver `docs/regras-globais-pe.md` e `references/tokens.md`).

## Rodando a suíte inteira

```bash
claude plugin eval /home/wenderu/projects/padrao-digital-pe --allow-tools Write Edit Agent --ablation with-without
```

- `--allow-tools Write Edit Agent`: `Write`/`Edit`/`Agent` são "gated tools" — precisam de autorização explícita do operador para rodar sem prompt interativo dentro do eval.
- `--ablation with-without`: roda cada caso com e sem o plugin carregado e mostra o delta de score — é a forma mais direta de provar que o plugin realmente muda o comportamento (e não só "o modelo teria acertado sozinho").
- Por padrão cada caso roda 3 vezes (`runs: 3` no frontmatter de cada `prompt.md`) para reduzir ruído de amostragem.

## Rodando um caso específico

```bash
claude plugin eval /home/wenderu/projects/padrao-digital-pe --case caso-componente-inventado --allow-tools Write Edit Agent
```

## Casos incluídos

| Caso | O que testa |
|---|---|
| `caso-split-login` | Geração positiva: tela de login usando o pattern Split Login e componentes reais |
| `caso-backoffice` | Geração positiva: estrutura de painel administrativo respeitando a hierarquia obrigatória do template Backoffice |
| `caso-componente-inventado` | Adversarial: o pedido pede explicitamente uma prop e um componente que não existem — o teste reprova (nota 0) se eles vazarem pro código final sem sinalização |
| `caso-auto-dispatch` | Auto-dispatch: pedido em linguagem natural comum, sem citar nenhum agente pelo nome, só o pacote `@uigovpe/components` — verifica se o orquestrador dispara sozinho |
| `caso-servico-publico-consulta` | Geração positiva: página de consulta usando `patterns/servico-publico/consulta.md`, com os quatro estados (processando/encontrado/não encontrado/falha) e o componente `Loading` real para "processando" |
| `caso-layout-generico` | Geração positiva: landing page institucional usando `patterns/generico/page.md`+`navigation.md`, sem tentar importar `Header`/`Footer` (que não existem no pacote) nem usar Tailwind para o layout |

## Relatório

Por padrão o resultado tenta publicar um HTML em claude.ai; use `--no-publish` se não quiser isso, ou `--report <arquivo>` para salvar localmente. Resultados também ficam em `evals/results/<timestamp>/` dentro deste repo.

## Primeira vez rodando um caso

Como este plugin ainda não foi publicado num marketplace confiável, a primeira execução pede confirmação de que você confia no código/eval suite do plugin (`--trust-plugin` responde isso automaticamente, útil em CI — só use em plugins que você mesmo revisou).
