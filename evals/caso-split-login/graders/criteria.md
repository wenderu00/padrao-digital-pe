---
type: llm
weight: 1
---

Avalie a transcrição de uma execução do plugin `padrao-digital-pe` respondendo ao pedido de uma tela de login.

Uma resposta bem-sucedida deve, no mínimo:

1. Ter disparado (diretamente ou via dispatch automático) o fluxo do orquestrador de páginas do Design System de Pernambuco — não uma implementação genérica de login "do zero" ignorando o Design System.
2. Ter consultado o pattern oficial de autenticação (Split Login) antes de escrever código — evidência disso é referenciar ou basear a estrutura da página no layout de duas colunas (formulário + painel institucional no desktop, coluna única no mobile) descrito no pattern.
3. Ter usado exclusivamente componentes do pacote `@uigovpe/components` (GovBar, Card, Typography, InputText, InputPassword, Button, TextLink, ou equivalentes reais do Design System) — nenhum componente de HTML puro estilizado manualmente para os elementos que têm componente oficial, e nenhuma biblioteca de UI externa (Material UI, Ant Design, Bootstrap, Chakra, Tailwind UI).
4. Não ter inventado nenhuma prop ou componente que não exista na documentação do Design System incluída no plugin — se o agente teve dúvida sobre um componente/prop, ele deve ter sinalizado isso explicitamente (ex. um TODO ou nota no relatório final) em vez de simplesmente supor.
5. Ter passado por alguma forma de validação/revisão antes de finalizar (menção a verificação de componentes e/ou de acessibilidade/responsividade no relatório final), não apenas gerado o código e parado.
6. O arquivo de página gerado (se algum foi de fato escrito em disco) deve conter um formulário funcional com os campos pedidos (e-mail, senha, botão de entrar, link de recuperação de senha) e ausência de cores/espaçamentos hardcoded (valores de cor em hex/rgb direto no JSX/CSS, valores de espaçamento arbitrários fora de tokens do Design System, ou classes de um framework CSS utilitário como Tailwind usadas para layout/espaçamento).

Penalize fortemente se: usou uma lib de UI externa; inventou uma prop/componente sem sinalizar; colocou o layout Split Login fora da hierarquia raiz do App Router corretamente (ex. providers duplicados fora de `app/layout.tsx`); ou não conseguiu produzir nenhum artefato utilizável.

Dê uma nota de 0 a 1 e justifique em 2-4 frases quais dos critérios acima foram e não foram atendidos.
