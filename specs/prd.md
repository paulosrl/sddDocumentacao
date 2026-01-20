# Product Requirements Document (PRD): Landing Page SDD Meta-Referencial

## 1. Visão Geral do Projeto
Desenvolvimento de uma Landing Page HTML única (Single File), responsiva e totalmente offline. O objetivo principal é educar desenvolvedores sobre a metodologia **SDD (Structured Driven Development)**, contrastando-a com o "Vibe Coding" (codificação baseada em tentativa e erro sem planejamento).

A característica única deste projeto é sua natureza **meta-referencial**: a própria página servirá como estudo de caso, exibindo os artefatos (este PRD, o plano de implementação e o código fonte) que foram usados para criá-la.

## 2. Declaração do Problema
O desenvolvimento assistido por IA frequentemente sofre de "Vibe Coding": desenvolvedores solicitam código sem especificações claras, resultando em:
*   Alucinações de bibliotecas inexistentes.
*   Estilos inconsistentes e bugs de regressão.
*   Loops infinitos de "fix this error".
*   Falta de documentação e manutenibilidade.

## 3. Solução Proposta
Uma página web estática, leve e de alto impacto visual que define o SDD e prova sua eficácia mostrando sua própria estrutura.

### Metodologia SDD Aplicada
O projeto seguirá o fluxo RPI (Research, Plan, Implement) [6, 7]:
1.  **Contexto/Spec:** Definição clara (este documento).
2.  **Plano:** Criação de um plano passo-a-passo (via `2.create_plan.md`).
3.  **Implementação:** Execução do código com verificação a cada etapa.

## 4. Requisitos Funcionais

### 4.1. Estrutura da Página (Seções)
1.  **Hero Section:**
    *   Título de alto impacto (ex: "Pare de Codar por Vibração. Comece a Projetar.").
    *   Subtítulo explicando o SDD em uma frase.
    *   Call to Action (CTA) para o estudo de caso (scroll down).
2.  **O Problema (Vibe Coding):**
    *   Explicação visual ou em tópicos sobre os riscos de codar sem spec (context rot, loops de erro).
3.  **A Solução (SDD):**
    *   Diagrama ou passo-a-passo da metodologia (Spec -> Plan -> Implement -> Verify).
    *   Benefícios: Previsibilidade, Manutenibilidade, Escalabilidade.
4.  **Meta-Estudo de Caso (O "Core" do Projeto):**
    *   Deve haver uma seção interativa (tabs ou accordion) intitulada "Como esta página foi feita".
    *   **Tab 1 - O PRD:** Exibe o conteúdo deste arquivo `prd.md`.
    *   **Tab 2 - O Plano:** Exibe o plano gerado pelo Claude Code.
    *   **Tab 3 - O Prompt:** Exibe o prompt inicial usado.
5.  **Rodapé:**
    *   Créditos e links para referências sobre SDD.

### 4.2. Requisitos Técnicos
*   **Single File:** Todo o CSS e JS deve estar "inlined" no arquivo HTML final. Nenhuma requisição HTTP externa (fontes, scripts, imagens) é permitida para garantir funcionamento offline.
*   **Responsividade:** Layout deve se adaptar perfeitamente a Mobile (320px+), Tablet e Desktop.
*   **Performance:** Pontuação Lighthouse > 95 em todas as métricas.

## 5. Requisitos Não-Funcionais
*   **Design System:** Utilizar uma paleta de cores "Dark Mode" moderna (ex: Slate/Zinc com acentos em Neon Blue ou Purple) para evocar tecnologia e precisão.
*   **Acessibilidade:** Conformidade WCAG 2.1 AA (contraste de cores, tags semânticas).

## 6. Stack Tecnológico
*   **Core:** HTML5 Semântico.
*   **Estilização:** Tailwind CSS (processado e injetado via script de build para um único arquivo).
*   **Ícones:** SVG Inline (para evitar requisições externas).
*   **Scripting:** JavaScript Vanilla (ES6+) para interatividade leve (tabs do estudo de caso).

## 7. Critérios de Sucesso
Para considerar o projeto concluído, o agente de implementação deve verificar:
1.  [ ] O arquivo final é um único `.html` que abre sem conexão com a internet?
2.  [ ] A página passa no validador HTML5 sem erros críticos?
3.  [ ] A seção "Meta-Estudo de Caso" contém o texto real deste PRD (automático ou hardcoded)?
4.  [ ] O redimensionamento da janela não quebra o layout (hambúrguer menu funciona no mobile)?
5.  [ ] Não existem console logs de erro ou warnings de assets não encontrados (404).

## 8. Estrutura de Arquivos Proposta (Ambiente de Dev)
*   `src/index.html` (Template base)
*   `src/styles.css` (Diretivas Tailwind)
*   `prd.md` (Este arquivo)
*   `build.js` (Script Node para compilar Tailwind e gerar `dist/index.html` único)
