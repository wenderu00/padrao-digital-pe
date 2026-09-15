# padrao-digital-pe

Plugin de Claude Code que gera páginas e sistemas Next.js usando o **Padrão Digital de Pernambuco** — o Design System oficial do Governo de Pernambuco (`@uigovpe/components` + `@uigovpe/styles`) — em qualquer projeto consumidor, sem depender de documentação local naquele projeto.

Todo o conhecimento sobre o Design System (guias, patterns de página, documentação de componentes) que antes vivia solto na pasta `ai/` de um projeto de POC específico foi extraído para dentro deste plugin, para ser reutilizável.

## O que este plugin faz

Dado um pedido do tipo "crie uma página de login para o sistema X" ou "crie um dashboard de backoffice para gerenciar Y", o plugin:

1. Classifica o pedido (autenticação, backoffice, serviço público de consulta/solicitação, ou layout genérico) e escolhe o pattern de página correspondente.
2. Garante que `app/layout.tsx` está com os providers do Design System configurados (nunca dentro de páginas individuais).
3. Implementa a página reutilizando componentes oficiais de `@uigovpe/components`.
4. Valida que nenhum componente ou prop usado foi inventado — cruza contra a documentação do plugin e contra a versão de `@uigovpe/components` de fato instalada no projeto-alvo.
5. Audita acessibilidade, responsividade e conformidade arquitetural antes de reportar a página como pronta.

## Estrutura

```
padrao-digital-pe/
├── .claude-plugin/plugin.json        # manifest do plugin
├── docs/regras-globais-pe.md         # regras que valem para todo agente do pipeline
├── skills/consultar-design-system-pe/ # índice de conhecimento sob demanda (guias, patterns, 32 componentes)
├── agents/                            # 7 subagentes do pipeline (ver abaixo)
└── commands/gerar-pagina-pe.md        # atalho manual opcional
```

## Agentes

| Agente | Papel |
|---|---|
| `orquestrador-paginas-pe` | Ponto de entrada único. Classifica o pedido, garante o bootstrap do root layout, despacha o especialista certo, depois validação e auditoria. |
| `especialista-autenticacao-pe` | Implementa o pattern split-login. |
| `especialista-backoffice-pe` | Implementa o pattern Backoffice, respeitando a hierarquia obrigatória de componentes. |
| `especialista-servico-publico-pe` | Implementa serviços de consulta ou de solicitação/formulário. |
| `especialista-layout-generico-pe` | Fallback para páginas sem pattern dedicado (landing pages, páginas institucionais). |
| `validador-componentes-pe` | Avaliador puro (sem `Write`) — confere que nenhum componente/prop foi inventado. |
| `auditor-conformidade-pe` | Avaliador puro — acessibilidade, responsividade e regras de arquitetura. |

## Instalação local (desenvolvimento)

Sem publicar em marketplace, aponte uma sessão do Claude Code direto para este diretório:

```
claude --plugin-dir /home/wenderu/projects/padrao-digital-pe
```

Rodando dentro de um projeto Next.js de destino (com `@uigovpe/components`/`@uigovpe/styles` já instalados), peça diretamente em linguagem natural (ex. "crie uma página de login split para o sistema de protocolo") ou use `/gerar-pagina-pe <descrição>`.

## Instalação via marketplace pessoal

```
claude plugin marketplace add /home/wenderu/projects/padrao-digital-pe
claude plugin install padrao-digital-pe@padrao-digital-pe
```

(ou, depois de publicado num repositório git, apontando `marketplace add` para a URL do repositório.)

## Fonte

O conhecimento deste plugin foi migrado e corrigido a partir da pasta `ai/` e do `AGENTS.md` de um projeto de POC de geração de páginas com este mesmo Design System. Ver `CONTRIBUTING.md` para o racional de arquitetura e como estender este plugin.
