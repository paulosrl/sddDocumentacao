# Landing Page SDD Meta-Referencial - Plano de Implementação

## Overview

Criar uma landing page HTML única (single-file) que educa desenvolvedores sobre a metodologia SDD (Structured Driven Development), contrastando com "Vibe Coding". A página é meta-referencial: exibe seus próprios artefatos (PRD, este plano, e o prompt usado) como estudo de caso.

## Current State Analysis

- Projeto novo, apenas com arquivos de configuração (`.claude/commands/`) e PRD
- Nenhum código-fonte existe ainda
- Estrutura `src/` e `dist/` precisa ser criada

## Desired End State

Um único arquivo `dist/index.html` que:
- Funciona 100% offline (sem requisições externas)
- É responsivo (320px até desktop)
- Tem design dark mode moderno (Slate/Zinc + acentos neon)
- Contém sistema de tabs interativo mostrando PRD, Plano e Prompt
- Passa no validador HTML5
- Pontuação Lighthouse > 95

### Key Discoveries:
- Tailwind Standalone CLI disponível para Linux x64
- Projeto é greenfield - liberdade total de estrutura
- Conteúdo das tabs será hardcoded no HTML final

## What We're NOT Doing

- Não usar npm/Node.js para build (apenas Tailwind Standalone)
- Não implementar backend ou APIs
- Não usar fontes externas (Google Fonts, etc.)
- Não criar menu hamburger complexo (scroll suave é suficiente)
- Não implementar dark/light mode toggle (apenas dark mode fixo)

## Implementation Approach

1. Usar Tailwind Standalone CLI (binário único, sem dependências)
2. Desenvolver em `src/index.html` com classes Tailwind
3. Build process: Tailwind compila CSS → script inline no HTML → `dist/index.html`
4. JavaScript vanilla para tabs e scroll suave

---

## Phase 1: Setup do Ambiente

### Overview
Configurar a estrutura de pastas e baixar o Tailwind Standalone CLI.

### Changes Required:

#### 1. Estrutura de Pastas
```
sddDocumentacao/
├── specs/
│   ├── prd.md
│   └── 2026-01-19-landing-page-sdd-spec.md
├── src/
│   ├── index.html
│   └── input.css
├── dist/
│   └── (gerado pelo build)
├── tailwindcss (binário)
├── tailwind.config.js
└── build.sh
```

#### 2. Download Tailwind Standalone CLI
**Comando**:
```bash
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64
chmod +x tailwindcss-linux-x64
mv tailwindcss-linux-x64 tailwindcss
```

#### 3. Configuração Tailwind
**File**: `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html"],
  theme: {
    extend: {
      colors: {
        // Dark mode palette
        dark: {
          900: '#0f172a', // slate-900
          800: '#1e293b', // slate-800
          700: '#334155', // slate-700
        },
        // Neon accents
        neon: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
```

#### 4. CSS de Entrada
**File**: `src/input.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-dark-900 text-gray-100 font-sans antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-neon-blue hover:bg-neon-purple text-white font-semibold rounded-lg transition-colors duration-300;
  }

  .section-container {
    @apply max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24;
  }

  .tab-button {
    @apply px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200;
  }

  .tab-button.active {
    @apply bg-dark-700 text-neon-cyan border-b-2 border-neon-cyan;
  }

  .tab-button:not(.active) {
    @apply bg-dark-800 text-gray-400 hover:text-gray-200;
  }

  .tab-content {
    @apply hidden bg-dark-800 rounded-b-lg rounded-tr-lg p-4 sm:p-6;
  }

  .tab-content.active {
    @apply block;
  }
}
```

### Success Criteria:

#### Automated Verification:
- [ ] Binário `tailwindcss` existe e é executável: `test -x ./tailwindcss && echo "OK"`
- [ ] Arquivo `tailwind.config.js` existe: `test -f tailwind.config.js && echo "OK"`
- [ ] Diretórios criados: `test -d src && test -d dist && echo "OK"`
- [ ] Tailwind compila sem erros: `./tailwindcss -i src/input.css -o dist/output.css --minify`

#### Manual Verification:
- [ ] Estrutura de pastas está organizada conforme especificado

**Implementation Note**: Após verificação automática, confirmar estrutura antes de prosseguir.

---

## Phase 2: HTML Base (Estrutura Semântica)

### Overview
Criar o HTML com todas as seções, estrutura semântica e acessibilidade.

### Changes Required:

#### 1. HTML Principal
**File**: `src/index.html`
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="SDD - Structured Driven Development: Pare de codar por vibração, comece a projetar.">
  <title>SDD - Structured Driven Development</title>
  <link rel="stylesheet" href="output.css">
</head>
<body>
  <!-- Navigation -->
  <nav class="fixed top-0 w-full bg-dark-900/95 backdrop-blur-sm border-b border-dark-700 z-50">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <span class="text-xl font-bold text-neon-cyan">SDD</span>
        <div class="flex gap-4 sm:gap-6 text-sm">
          <a href="#problema" class="text-gray-400 hover:text-white transition-colors">Problema</a>
          <a href="#solucao" class="text-gray-400 hover:text-white transition-colors">Solução</a>
          <a href="#estudo-caso" class="text-gray-400 hover:text-white transition-colors">Estudo de Caso</a>
        </div>
      </div>
    </div>
  </nav>

  <main>
    <!-- Hero Section -->
    <section id="hero" class="min-h-screen flex items-center justify-center pt-16">
      <div class="section-container text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span class="text-white">Pare de Codar por Vibração.</span><br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Comece a Projetar.</span>
        </h1>
        <p class="text-xl sm:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
          <strong class="text-neon-cyan">SDD</strong> (Structured Driven Development) é a metodologia que transforma prompts caóticos em código previsível e manutenível.
        </p>
        <a href="#estudo-caso" class="btn-primary inline-block">
          Ver Esta Página Como Exemplo ↓
        </a>
      </div>
    </section>

    <!-- O Problema: Vibe Coding -->
    <section id="problema" class="bg-dark-800">
      <div class="section-container">
        <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12">
          O Problema: <span class="text-red-400">Vibe Coding</span>
        </h2>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-dark-900 rounded-xl p-6 border border-red-500/30">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-3xl">🎲</span>
              <h3 class="text-xl font-semibold text-red-400">Codificação por Tentativa e Erro</h3>
            </div>
            <p class="text-gray-400">
              Pedir código à IA sem especificações claras resulta em soluções aleatórias que raramente atendem às necessidades reais.
            </p>
          </div>

          <div class="bg-dark-900 rounded-xl p-6 border border-red-500/30">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-3xl">🔄</span>
              <h3 class="text-xl font-semibold text-red-400">Loops Infinitos de "Fix This"</h3>
            </div>
            <p class="text-gray-400">
              Sem contexto estruturado, cada correção gera novos bugs. O desenvolvedor fica preso em ciclos de "conserta isso" intermináveis.
            </p>
          </div>

          <div class="bg-dark-900 rounded-xl p-6 border border-red-500/30">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-3xl">👻</span>
              <h3 class="text-xl font-semibold text-red-400">Alucinações de Bibliotecas</h3>
            </div>
            <p class="text-gray-400">
              A IA inventa funções e pacotes que não existem, gerando código impossível de executar sem pesquisa manual extensiva.
            </p>
          </div>

          <div class="bg-dark-900 rounded-xl p-6 border border-red-500/30">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-3xl">🧠</span>
              <h3 class="text-xl font-semibold text-red-400">Context Rot (Degradação de Contexto)</h3>
            </div>
            <p class="text-gray-400">
              Em conversas longas, a IA "esquece" decisões anteriores, introduzindo inconsistências e regressões no código.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- A Solução: SDD -->
    <section id="solucao">
      <div class="section-container">
        <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12">
          A Solução: <span class="text-neon-cyan">SDD</span>
        </h2>

        <p class="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          O SDD segue o fluxo <strong class="text-white">RPI</strong>: Research (Pesquisa), Plan (Plano), Implement (Implementação). Cada etapa gera artefatos que servem como contexto persistente.
        </p>

        <!-- Diagrama Visual -->
        <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 mb-16">
          <!-- Step 1 -->
          <div class="flex flex-col items-center">
            <div class="w-24 h-24 rounded-full bg-gradient-to-br from-neon-blue to-neon-cyan flex items-center justify-center text-3xl font-bold">1</div>
            <span class="mt-3 font-semibold text-neon-blue">SPEC</span>
            <span class="text-sm text-gray-500">PRD / Requisitos</span>
          </div>

          <!-- Arrow -->
          <div class="hidden md:block text-4xl text-dark-700 px-4">→</div>
          <div class="md:hidden text-4xl text-dark-700 py-2">↓</div>

          <!-- Step 2 -->
          <div class="flex flex-col items-center">
            <div class="w-24 h-24 rounded-full bg-gradient-to-br from-neon-purple to-pink-500 flex items-center justify-center text-3xl font-bold">2</div>
            <span class="mt-3 font-semibold text-neon-purple">PLAN</span>
            <span class="text-sm text-gray-500">Plano Detalhado</span>
          </div>

          <!-- Arrow -->
          <div class="hidden md:block text-4xl text-dark-700 px-4">→</div>
          <div class="md:hidden text-4xl text-dark-700 py-2">↓</div>

          <!-- Step 3 -->
          <div class="flex flex-col items-center">
            <div class="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-3xl font-bold">3</div>
            <span class="mt-3 font-semibold text-green-500">IMPLEMENT</span>
            <span class="text-sm text-gray-500">Código + Verificação</span>
          </div>
        </div>

        <!-- Benefícios -->
        <div class="grid sm:grid-cols-3 gap-6">
          <div class="text-center p-6">
            <div class="text-4xl mb-4">📐</div>
            <h3 class="text-lg font-semibold text-white mb-2">Previsibilidade</h3>
            <p class="text-gray-400 text-sm">Cada fase tem critérios de sucesso claros. Sem surpresas.</p>
          </div>
          <div class="text-center p-6">
            <div class="text-4xl mb-4">🔧</div>
            <h3 class="text-lg font-semibold text-white mb-2">Manutenibilidade</h3>
            <p class="text-gray-400 text-sm">Documentação gerada junto com o código. Contexto preservado.</p>
          </div>
          <div class="text-center p-6">
            <div class="text-4xl mb-4">📈</div>
            <h3 class="text-lg font-semibold text-white mb-2">Escalabilidade</h3>
            <p class="text-gray-400 text-sm">Projetos grandes divididos em fases incrementais e testáveis.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Meta-Estudo de Caso -->
    <section id="estudo-caso" class="bg-dark-800">
      <div class="section-container">
        <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4">
          <span class="text-neon-purple">Meta-Estudo de Caso</span>
        </h2>
        <p class="text-center text-gray-400 mb-8">
          Esta própria página foi criada usando SDD. Veja os artefatos:
        </p>

        <!-- Tabs -->
        <div class="max-w-4xl mx-auto">
          <div class="flex border-b border-dark-700" role="tablist" aria-label="Artefatos do projeto">
            <button
              class="tab-button active"
              role="tab"
              aria-selected="true"
              aria-controls="tab-prd"
              data-tab="prd">
              📋 O PRD
            </button>
            <button
              class="tab-button"
              role="tab"
              aria-selected="false"
              aria-controls="tab-plano"
              data-tab="plano">
              📝 O Plano
            </button>
            <button
              class="tab-button"
              role="tab"
              aria-selected="false"
              aria-controls="tab-prompt"
              data-tab="prompt">
              💬 O Prompt
            </button>
          </div>

          <!-- Tab Content: PRD -->
          <div id="tab-prd" class="tab-content active" role="tabpanel">
            <pre class="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed"><code><!-- PRD_CONTENT_PLACEHOLDER --></code></pre>
          </div>

          <!-- Tab Content: Plano -->
          <div id="tab-plano" class="tab-content" role="tabpanel">
            <pre class="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed"><code><!-- PLANO_CONTENT_PLACEHOLDER --></code></pre>
          </div>

          <!-- Tab Content: Prompt -->
          <div id="tab-prompt" class="tab-content" role="tabpanel">
            <pre class="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed"><code>/2.create_plan specs/prd.md

Este comando invoca o skill de criação de plano, que:
1. Lê o PRD completamente
2. Analisa os requisitos
3. Faz perguntas de clarificação
4. Propõe estrutura de fases
5. Gera plano detalhado com critérios de sucesso

A interação foi iterativa: o humano aprovou cada etapa
antes de prosseguir, garantindo alinhamento contínuo.</code></pre>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="border-t border-dark-700">
    <div class="section-container text-center py-8">
      <p class="text-gray-500 text-sm mb-4">
        Criado com <span class="text-neon-cyan">SDD</span> usando Claude Code
      </p>
      <p class="text-gray-600 text-xs">
        Referências:
        <a href="https://claude.ai/claude-code" class="text-neon-blue hover:underline" target="_blank" rel="noopener">Claude Code</a> ·
        <a href="https://www.anthropic.com" class="text-neon-blue hover:underline" target="_blank" rel="noopener">Anthropic</a>
      </p>
    </div>
  </footer>

  <!-- JavaScript -->
  <script>
    // Tab functionality
    document.querySelectorAll('[data-tab]').forEach(button => {
      button.addEventListener('click', () => {
        // Update buttons
        document.querySelectorAll('[data-tab]').forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');

        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        const tabId = 'tab-' + button.dataset.tab;
        document.getElementById(tabId).classList.add('active');
      });
    });
  </script>
</body>
</html>
```

### Success Criteria:

#### Automated Verification:
- [ ] Arquivo `src/index.html` existe: `test -f src/index.html && echo "OK"`
- [ ] HTML tem estrutura válida: `grep -q "<!DOCTYPE html>" src/index.html && echo "OK"`
- [ ] Todas as seções existem: `grep -q 'id="hero"' src/index.html && grep -q 'id="problema"' src/index.html && grep -q 'id="solucao"' src/index.html && grep -q 'id="estudo-caso"' src/index.html && echo "OK"`
- [ ] Tabs estruturados: `grep -q 'data-tab=' src/index.html && echo "OK"`

#### Manual Verification:
- [ ] Estrutura semântica faz sentido ao ler o código
- [ ] Navegação contém links para todas as seções

**Implementation Note**: Após verificação, prosseguir para compilação inicial do Tailwind.

---

## Phase 3: Build e Teste Inicial

### Overview
Compilar o CSS com Tailwind e testar a página no navegador.

### Changes Required:

#### 1. Script de Build para Desenvolvimento
**File**: `build.sh`
```bash
#!/bin/bash

# Build CSS with Tailwind
./tailwindcss -i src/input.css -o dist/output.css --minify

# Copy HTML to dist
cp src/index.html dist/index.html

echo "Build complete! Open dist/index.html in browser"
```

#### 2. Executar Build
```bash
chmod +x build.sh
mkdir -p dist
./build.sh
```

### Success Criteria:

#### Automated Verification:
- [ ] CSS compilado existe: `test -f dist/output.css && echo "OK"`
- [ ] CSS tem conteúdo (não vazio): `test -s dist/output.css && echo "OK"`
- [ ] HTML copiado para dist: `test -f dist/index.html && echo "OK"`

#### Manual Verification:
- [ ] Abrir `dist/index.html` no navegador
- [ ] Verificar que estilos estão aplicados
- [ ] Testar navegação por scroll
- [ ] Testar tabs do estudo de caso
- [ ] Testar responsividade (redimensionar janela)

**Implementation Note**: Esta fase requer teste manual no navegador antes de prosseguir.

---

## Phase 4: Injetar Conteúdo Real nas Tabs

### Overview
Substituir os placeholders pelo conteúdo real do PRD e do Plano.

### Changes Required:

#### 1. Script de Build Final com Inline
**File**: `build-final.sh`
```bash
#!/bin/bash

# Build CSS with Tailwind (minified)
./tailwindcss -i src/input.css -o dist/output.css --minify

# Read content files and escape for HTML
PRD_CONTENT=$(cat specs/prd.md | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')
PLANO_CONTENT=$(cat specs/2026-01-19-landing-page-sdd-spec.md | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')

# Read CSS
CSS_CONTENT=$(cat dist/output.css)

# Read HTML template
HTML=$(cat src/index.html)

# Replace external CSS link with inline style
HTML=$(echo "$HTML" | sed 's|<link rel="stylesheet" href="output.css">|<style>'"$CSS_CONTENT"'</style>|')

# Inject PRD content
HTML=$(echo "$HTML" | sed 's|<!-- PRD_CONTENT_PLACEHOLDER -->|'"$PRD_CONTENT"'|')

# Inject Plano content
HTML=$(echo "$HTML" | sed 's|<!-- PLANO_CONTENT_PLACEHOLDER -->|'"$PLANO_CONTENT"'|')

# Write final HTML
echo "$HTML" > dist/index.html

echo "Final build complete! dist/index.html is now a single self-contained file"
```

**Nota**: Se o script bash tiver problemas com caracteres especiais, usar um script Node.js alternativo:

**File**: `build-final.js`
```javascript
const fs = require('fs');
const path = require('path');

// Read files
const css = fs.readFileSync('dist/output.css', 'utf8');
const prd = fs.readFileSync('specs/prd.md', 'utf8');
const plano = fs.readFileSync('specs/2026-01-19-landing-page-sdd-spec.md', 'utf8');
let html = fs.readFileSync('src/index.html', 'utf8');

// Escape HTML entities
const escapeHtml = (str) => str
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

// Inline CSS
html = html.replace(
  '<link rel="stylesheet" href="output.css">',
  `<style>${css}</style>`
);

// Inject content
html = html.replace('<!-- PRD_CONTENT_PLACEHOLDER -->', escapeHtml(prd));
html = html.replace('<!-- PLANO_CONTENT_PLACEHOLDER -->', escapeHtml(plano));

// Write final file
fs.writeFileSync('dist/index.html', html);

console.log('Final build complete! dist/index.html is now a single self-contained file');
```

### Success Criteria:

#### Automated Verification:
- [ ] Arquivo final não tem link externo CSS: `! grep -q 'href="output.css"' dist/index.html && echo "OK"`
- [ ] Arquivo final tem tag style: `grep -q '<style>' dist/index.html && echo "OK"`
- [ ] Conteúdo PRD injetado: `grep -q 'Landing Page SDD Meta-Referencial' dist/index.html && echo "OK"`
- [ ] Conteúdo Plano injetado: `grep -q 'Desired End State' dist/index.html && echo "OK"`

#### Manual Verification:
- [ ] Tab PRD mostra conteúdo real do prd.md
- [ ] Tab Plano mostra conteúdo real deste spec
- [ ] Tab Prompt mostra o comando usado

**Implementation Note**: Após injeção, verificar visualmente que o conteúdo está legível.

---

## Phase 5: Verificação Final e Ajustes

### Overview
Testes completos de qualidade, acessibilidade e funcionamento offline.

### Changes Required:

Nenhuma mudança estrutural - apenas verificações e ajustes finos se necessário.

### Success Criteria:

#### Automated Verification:
- [ ] Arquivo único sem dependências externas: `! grep -qE 'href="http|src="http' dist/index.html && echo "OK"`
- [ ] Tamanho do arquivo razoável (< 500KB): `test $(stat -f%z dist/index.html 2>/dev/null || stat -c%s dist/index.html) -lt 512000 && echo "OK"`

#### Manual Verification:
- [ ] **Offline**: Desconectar da internet e abrir o arquivo - funciona?
- [ ] **Responsividade**: Testar em 320px, 768px, 1024px+
- [ ] **Acessibilidade**: Navegação por teclado funciona nos tabs
- [ ] **Console**: Nenhum erro ou warning no console do navegador
- [ ] **Validador HTML**: Passar em https://validator.w3.org/ (upload do arquivo)

---

## Testing Strategy

### Automated Tests:
- Verificação de existência de arquivos
- Grep para estrutura HTML esperada
- Verificação de inline de recursos

### Manual Testing Steps:
1. Abrir `dist/index.html` diretamente no navegador (file://)
2. Clicar em cada tab e verificar conteúdo
3. Clicar nos links de navegação e verificar scroll suave
4. Redimensionar janela de 320px até tela cheia
5. Desligar WiFi e recarregar a página
6. Abrir DevTools e verificar console limpo
7. Testar navegação por teclado (Tab + Enter)

## Performance Considerations

- CSS minificado pelo Tailwind (`--minify`)
- Apenas classes utilizadas incluídas (purge automático)
- JavaScript mínimo (~20 linhas)
- Sem fontes externas (system fonts)
- Sem imagens (emojis e gradientes CSS)

## References

- PRD: `specs/prd.md`
- Tailwind Standalone CLI: https://tailwindcss.com/blog/standalone-cli
