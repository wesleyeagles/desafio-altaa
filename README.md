# 🛍️ Desafio Altaa Digital

Aplicação front-end em React + TypeScript que consome a Fake Store API, demonstrando boas práticas de desenvolvimento, arquitetura limpa e integração com APIs REST.

## 🚀 Deploy

**[Ver aplicação ao vivo](https://desafio-altaa-ten.vercel.app/)**

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#️-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Decisões Técnicas](#-decisões-técnicas)
- [Arquitetura](#️-arquitetura)
- [Como Rodar](#-como-rodar)
- [Testes](#-testes)
- [Trade-offs](#️-trade-offs)
- [Melhorias Futuras](#-melhorias-futuras)

---

## 📖 Sobre o Projeto

Esta aplicação foi desenvolvida como parte do desafio técnico da Altaa Digital. O objetivo é criar uma experiência de e-commerce completa consumindo a [Fake Store API](https://fakestoreapi.com/docs), demonstrando conhecimento em React, TypeScript e arquitetura front-end.

### 🎯 Objetivos Alcançados

- ✅ Integração completa com Fake Store API
- ✅ Interface responsiva e moderna
- ✅ Arquitetura escalável e manutenível
- ✅ Testes automatizados
- ✅ Performance otimizada
- ✅ Código limpo e bem documentado

---

## 🛠️ Tecnologias

### Core
- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server de alta performance

### Styling
- **Tailwind CSS 3** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones moderna e leve

### Testes
- **Vitest** - Framework de testes unitários ultrarrápido
- **Testing Library** - Utilitários para testes de componentes React

### Qualidade de Código
- **ESLint** - Linter para identificar problemas no código
- **TypeScript Strict Mode** - Tipagem rigorosa habilitada

---

## ✨ Funcionalidades

#### Listagem de Produtos
- Exibição de todos os produtos da API
- Informações: título, imagem, preço, categoria e avaliações
- Grid responsivo que se adapta a diferentes tamanhos de tela
- Hover effects e animações suaves

#### Filtro e Ordenação
- **Filtro por Categoria**: Eletrônicos, Joias, Roupas Masculinas, Roupas Femininas
- **Ordenação por Nome**: A-Z e Z-A
- **Ordenação por Preço**: Menor para Maior e Maior para Menor

#### Tela de Detalhes
Modal interativo exibindo:
- Título completo do produto
- Imagem em alta qualidade
- Descrição detalhada
- Preço formatado
- Categoria
- Rating com estrelas visuais
- Quantidade de avaliações

#### Estados da Aplicação
- **Loading State**: Spinner com feedback visual claro
- **Error State**: Mensagem amigável com botão de retry
- **Empty State**: Feedback quando não há produtos nos filtros aplicados

### Diferenciais Implementados 🌟

- ✅ **Testes Automatizados** com Vitest e Testing Library
- ✅ **Design System** básico com componentes reutilizáveis
- ✅ **Otimização de Performance** (useMemo, componentes otimizados)
- ✅ **Animações** suaves e feedback visual
- ✅ **Header Sticky** para melhor navegação
- ✅ **Contador de produtos** em tempo real

---

## 🏗️ Decisões Técnicas

### Por que Vite ao invés de Next.js?

Escolhi o **Vite** pelos seguintes motivos:

#### ✅ Vantagens do Vite para este projeto:

1. **Escopo do Projeto**: SPA pura sem necessidade de SSR/SSG
2. **Performance de Desenvolvimento**: 
   - HMR instantâneo (~200ms vs ~2s do Next.js)
   - Cold start mais rápido
   - Melhor experiência de desenvolvimento
3. **Build Otimizado**: 
   - Bundle menor e mais rápido
   - Tree-shaking eficiente
   - Code splitting automático
4. **Simplicidade**: 
   - Configuração mínima
   - Menos overhead
   - Foco no essencial
5. **Tamanho**: 
   - Next.js adicionaria ~100KB extras desnecessários
   - Vite gera bundles mais enxutos

#### 🤔 Quando usar Next.js?

O Next.js seria ideal para cenários como:
- SEO crítico para busca orgânica
- Páginas dinâmicas geradas no servidor
- Aplicações com múltiplas rotas complexas
- Necessidade de API routes integradas
- Renderização híbrida (SSR + CSR)

### Arquitetura de Pastas

```
src/
├── components/              # Componentes React organizados por feature
│   ├── EmptyState/
│   ├── ErrorState/
│   ├── Filters/
│   ├── LoadingSpinner/
│   └── Product/
│       ├── ProductCard/
│       └── ProductDetail/
├── hooks/                   # Custom hooks (lógica reutilizável)
│   ├── useCategories/
│   ├── useFilteredProducts/
│   └── useProducts/
│       └── __tests__/      # Testes colocados junto ao código
├── services/                # Camada de integração com APIs
│   ├── api.ts
│   └── __tests__/
├── types/                   # Definições TypeScript centralizadas
│   ├── product.types.ts
│   └── shared.types.ts
├── test/                    # Configuração de testes
│   └── setup.ts
└── App.tsx                  # Componente raiz
```

### Separação de Responsabilidades

**Clean Architecture aplicada:**

- **Services Layer** (`api.ts`): 
  - Comunicação HTTP
  - Tratamento de erros da rede
  - Abstração da API externa

- **Hooks Layer** (custom hooks): 
  - Gerenciamento de estado
  - Lógica de negócio
  - Side effects (useEffect)

- **Components Layer**: 
  - Apenas apresentação
  - Interação do usuário
  - Props drilling evitado

- **Types Layer**: 
  - Contratos TypeScript
  - Interfaces compartilhadas
  - Type safety em toda aplicação

---

## 🏛️ Arquitetura

### Custom Hooks

#### `useProducts`
Responsável por:
- Buscar produtos da API
- Gerenciar estado de loading
- Tratar erros de rede
- Retornar lista de produtos

#### `useCategories`
Responsável por:
- Buscar categorias disponíveis
- Cache de categorias
- Estado de loading

#### `useFilteredProducts`
Responsável por:
- Filtrar produtos por categoria
- Ordenar produtos (preço/nome)
- Memoização para performance
- Não faz chamadas à API (apenas transforma dados)

### Padrões de Design Utilizados

- **Container/Presenter Pattern**: Separação clara entre lógica e UI
- **Custom Hooks Pattern**: Reutilização de lógica de estado
- **Service Layer Pattern**: Abstração de chamadas HTTP
- **Composition Pattern**: Componentes pequenos e componíveis

### Otimizações de Performance

- ✅ `useMemo` para operações custosas de filtro/ordenação
- ✅ Aspect ratio fixo para evitar layout shift
- ✅ Keys únicas em listas (product.id)

---

## 🚀 Como Rodar

### Pré-requisitos

- **Node.js** 18 ou superior
- **npm** ou **yarn**

### Instalação

```bash
# Clone o repositório
git clone https://github.com/wesleyeagles/desafio-altaa

# Entre na pasta do projeto
cd desafio-altaa

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicia servidor de desenvolvimento
npm run dev

# Acesse http://localhost:5173
```

O servidor de desenvolvimento inclui:
- Hot Module Replacement (HMR)
- Error overlay
- Fast refresh

### Build para Produção

```bash
# Gera build otimizado
npm run build

# Preview do build localmente
npm run preview
```

O build de produção inclui:
- Minificação de código
- Tree shaking
- Code splitting
- Otimização de assets

---

## 🧪 Testes

### Comandos

```bash
# Roda todos os testes
npm test

# Roda testes em modo watch (desenvolvimento)
npm run test:watch

# Roda testes com UI visual interativa
npm run test:ui

# Gera relatório de cobertura
npm run test:coverage
```

### Cobertura de Testes

Áreas testadas:

- ✅ **Custom Hooks**: `useProducts`, `useCategories`, `useFilteredProducts`

### Casos de Teste Implementados

#### `useProducts`
- Estado inicial (loading = true)
- Busca de produtos com sucesso

#### `useFilteredProducts`
- Filtro por categoria
- Ordenação por nome (A-Z, Z-A)
- Ordenação por preço (crescente, decrescente)
- Combinação de filtros

**Meta de Coverage**: 80%+ em statements, branches, functions e lines

---

## ⚖️ Trade-offs

### Decisões Importantes e Seus Impactos

| Decisão | ✅ Prós | ⚠️ Contras | 💡 Justificativa |
|---------|---------|------------|------------------|
| **Vite ao invés de Next.js** | Build 10x mais rápido, DX superior, bundle 30% menor | Sem SSR/SSG nativos | Escopo não requer renderização servidor |
| **Tailwind CSS** | Desenvolvimento 50% mais rápido, bundle otimizado | Curva de aprendizado, classes longas | Padrão da indústria, produtividade |
| **Modal para detalhes** | Mantém contexto, preserva filtros, melhor UX | Pode ser pesado em mobile 3G | Produtos únicos beneficiam de modal |
| **Fetch nativo** | Zero dependências extras, bundle menor | Menos features que Axios/React Query | API simples, não requer interceptors |
| **Testes em hooks/services** | Cobertura nos pontos críticos de lógica | N/A | ROI: 80% do valor com 20% do esforço |
| **Estado local** | Simplicidade, sem complexidade extra | Sem persistência entre reloads | Não há necessidade de estado global |

### Por que não usei Context API?

- ❌ **Overengineering**: Estado não é compartilhado entre componentes distantes
- ❌ **Complexidade desnecessária**: Props drilling limitado e controlado

### Por que não usei React Query?

- ❌ **Overhead**: 40KB extras para funcionalidades não utilizadas
- ❌ **API simples**: Não há polling, mutations complexas ou cache sofisticado
- ✅ **Custom hooks suficientes**: useProducts já gerencia o estado adequadamente

---

## 🔮 Melhorias Futuras

### Curto Prazo
- [ ] **Paginação ou Scroll Infinito**: Melhorar performance com muitos produtos
- [ ] **Cache de Requisições**: Implementar com React Query ou SWR
- [ ] **Busca por Texto**: Filtro adicional por título/descrição
- [ ] **Skeleton Screens**: Loading states mais sofisticados
- [ ] **Toast Notifications**: Feedback visual para ações

### Médio Prazo
- ✅ **Carrinho de Compras**: Funcional com Context API + localStorage
- [ ] **Favoritos**: Persistência local de produtos favoritos
- [ ] **Modo Escuro**: Dark mode com preferência do sistema
- [ ] **PWA**: Service workers, offline-first, install prompt
- [ ] **Histórico de Navegação**: Breadcrumbs e voltar para filtros

### Longo Prazo
- [ ] **Migração para Next.js**: Se houver necessidade de SSR/SEO
- [ ] **Autenticação**: Login/cadastro de usuários
- [ ] **Backend Próprio**: API customizada com mais features
- [ ] **Sistema de Reviews**: Comentários e avaliações reais
- [ ] **Gateway de Pagamento**: Integração Stripe/PayPal
- [ ] **Testes E2E**: Playwright ou Cypress
- [ ] **Storybook**: Documentação visual de componentes
- [ ] **Analytics**: Google Analytics ou Mixpanel
- [ ] **A/B Testing**: Otimização de conversão

---

### Lighthouse Score (Alvo)

- Performance: 95+ 🟢
- Accessibility: 100 🟢
- Best Practices: 100 🟢
- SEO: 90+ 🟢

---

## 🎨 Design System

### Paleta de Cores

```css
/* Primary */
--blue-600: #2563EB;
--blue-700: #1D4ED8;

/* Semantic */
--success: #22C55E;
--error: #EF4444;
--warning: #F59E0B;

/* Neutrals */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-600: #4B5563;
--gray-900: #111827;
```

### Espaçamento

Sistema baseado em múltiplos de 4px:
- `0.5rem` (8px)
- `1rem` (16px)
- `1.5rem` (24px)
- `2rem` (32px)
- `3rem` (48px)
- `4rem` (64px)

### Tipografia

- **Font Family**: System UI (SF Pro, Segoe UI, Roboto)
- **Font Weights**: 
  - Regular (400)
  - Medium (500)
  - Semibold (600)
  - Bold (700)
- **Font Sizes**: 
  - xs (0.75rem)
  - sm (0.875rem)
  - base (1rem)
  - lg (1.125rem)
  - xl (1.25rem)
  - 2xl (1.5rem)
  - 3xl (1.875rem)

### Componentes Base

- **Button**: Primary, Secondary, Ghost
- **Card**: Shadow-md, hover:shadow-xl
- **Modal**: Backdrop blur, animação fade-in
- **Input**: Focus ring, states (error, success)

---

## 📝 Convenção de Commits

Este projeto segue o padrão **Conventional Commits**:

```bash
# Features
feat: adiciona filtro por categoria
feat(filters): implementa ordenação por preço

# Correções
fix: corrige bug na ordenação de produtos
fix(api): trata erro de timeout corretamente

# Refatoração
refactor: extrai lógica de filtros para custom hook
refactor(hooks): simplifica useProducts

# Testes
test: adiciona testes para useFilteredProducts
test(api): melhora cobertura dos services

# Documentação
docs: atualiza README com instruções de teste
docs: adiciona comentários nos custom hooks

# Estilo
style: formata código com Prettier
style: ajusta espaçamentos no ProductCard

# Performance
perf: adiciona useMemo em filtros
perf: otimiza renderização de lista

# Build
build: atualiza dependências
chore: configura Vitest
```

---

## 🌟 Destaques do Código

### 1. Separação de Responsabilidades

```typescript
// ❌ Ruim: Tudo misturado
function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('api/products').then(/* ... */);
  }, []);
}

// ✅ Bom: Separado em camadas
function ProductList() {
  const { products } = useProducts();
  return <UI products={products} />;
}
```

### 2. Tipagem Forte

```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  // ...
}

const api = {
  getProducts(): Promise<Product[]> { /* ... */ }
}
```

### 3. Performance com Memoização

```typescript
const filtered = useMemo(() => {
  return products.filter(/* ... */).sort(/* ... */);
}, [products, category, sortOption]);
```

---

## 🤝 Contribuindo

Embora este seja um projeto de desafio técnico, sugestões são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins de avaliação técnica no processo seletivo da Altaa Digital.

---

## 🙏 Agradecimentos

- **Altaa Digital** pela oportunidade do desafio
- **Fake Store API** pela API pública e bem documentada
- **Comunidade React** pelas ferramentas incríveis

---

<div align="center">

**⭐ Desenvolvido com dedicação para o desafio Altaa Digital ⭐**

</div>