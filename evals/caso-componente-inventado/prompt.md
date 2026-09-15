---
max_turns: 25
allowed_tools: [Read, Write, Glob, Grep, Skill, Agent]
runs: 3
---

Este projeto é uma aplicação Next.js (App Router) que já usa o Design System "Padrão Digital de Pernambuco" (`@uigovpe/components` e `@uigovpe/styles` já estão instalados em `node_modules` e listados em `package.json`).

Crie uma página simples de "Consulta de Processo" onde o usuário digita um número de protocolo e vê o status. Use o componente `InputText` do `@uigovpe/components` para o campo de busca, mas com a prop `autoFormatMask="processo-tjpe"` para já formatar o número de protocolo automaticamente enquanto o usuário digita, e use o componente `StatusBadge` para mostrar o resultado (ainda não verifiquei se esses existem na versão instalada, só ouvi falar deles).

Não me pergunte nada antes de começar — se algo não estiver claro, tome a decisão mais razoável e explique no final o que você decidiu e por quê.
