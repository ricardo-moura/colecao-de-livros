# 📚 Coleção de Livros

Uma aplicação web completa para gerenciar sua coleção pessoal de livros, permitindo organizar, avaliar e acompanhar suas leituras de forma intuitiva.

![Interface da aplicação](docs/interface.jpg)

## 🏗️ Arquitetura

A aplicação segue uma arquitetura **Full-Stack** com separação clara entre frontend e backend:

```
colecao-de-livros/
├── frontend/          # Next.js 14 com TypeScript
├── backend/           # NestJS com TypeScript
├── docker-compose.yml # Orquestração de containers
└── Makefile          # Comandos de desenvolvimento
```

### 🔄 Comunicação
- **Frontend** → **Backend**: Requisições HTTP via API REST
- **Backend** → **MongoDB**: Consultas via Mongoose ODM
- **Containeres**: Comunicação via rede Docker interna

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Type safety e melhor DX
- **Tailwind CSS** - Estilização utilitária e responsiva
- **Axios** - Cliente HTTP para consumo da API

### Backend
- **NestJS** - Framework Node.js com arquitetura modular
- **TypeScript** - Type safety em todo o backend
- **MongoDB** - Banco NoSQL para dados flexíveis
- **Mongoose** - ODM para modelagem de dados
- **Class Validator** - Validação de dados

### Infraestrutura
- **Docker & Docker Compose** - Containerização e orquestração
- **Make** - Automação de comandos
- **Node.js 18** - Runtime JavaScript

## 📋 Funcionalidades

### 🏠 Página Inicial
- Lista completa de livros cadastrados
- Cards com título, autor, status e avaliação
- Botão "Adicionar livro" para novos cadastros
- Interface responsiva para mobile e desktop

### ➕ Criar livro
- Formulário intuitivo com validação
- Campos: título, autor, data início, data término, status, nota
- Validação de campos obrigatórios
- Feedback visual ao usuário

### ✏️ Editar livro
- Pré-preenchimento de dados existentes
- Mesmo formulário da criação
- Atualização em tempo real

### 🗑️ Excluir livro
- Confirmação antes da exclusão
- Remoção permanente da base de dados

## 🎯 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/books` | Lista todos os livros |
| GET | `/api/books/:id` | Busca livro por ID |
| POST | `/api/books` | Cria novo livro |
| PUT | `/api/books/:id` | Atualiza livro existente |
| DELETE | `/api/books/:id` | Remove livro |

## 🏃‍♂️ Como Executar o Projeto

### Pré-requisitos
- Docker e Docker Compose instalados
- Make (opcional, mas recomendado)
- Node.js 18+ (para desenvolvimento local)

### Configuração de Variáveis de Ambiente

1. **Copie os arquivos de exemplo:**
   ```bash
   # Na raiz do projeto
   cp .env.example .env
   
   # Backend
   cp backend/.env.example backend/.env
   
   # Frontend
   cp frontend/.env.example frontend/.env
   ```

2. **Edite conforme necessário** (os valores padrão funcionam para desenvolvimento local)

### Opção 1: Com Make (Recomendado)

```bash
# Clonar o repositório
git clone [URL_DO_REPOSITORIO]
cd colecao-de-livros

# Configurar variáveis de ambiente
make setup-env  # Novo comando para configurar .env

# Ver comandos disponíveis
make help

# Desenvolvimento com hot-reload
make up-dev

# Produção
make up
```

### Opção 2: Com Docker Compose

```bash
# Desenvolvimento com hot-reload
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d

# Produção
docker-compose up -d
```

### Acesso
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **MongoDB**: localhost:27017

### Comandos Úteis

```bash
# Ver logs
make logs                 # Todos os serviços
make logs-frontend        # Apenas frontend
make logs-backend         # Apenas backend

# Limpar ambiente
make clean

# Rebuild completo
make rebuild

# Parar tudo
make down
```

## 🗂️ Estrutura de Dados

```typescript
interface Book {
  _id: string;
  title: string;
  author: string;
  startDate: Date;
  endDate?: Date;
  status: 'lido' | 'lendo' | 'quero-ler';
  rating?: number; // 1-5 estrelas
}
```

## 🛠️ Desenvolvimento

### Sem Docker (Desenvolvimento local)

**Backend:**
```bash
cd backend
npm install
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Feito com ❤️ por Ricardo Moura