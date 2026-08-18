# Homelab Service

Serviço de instalação e manutenção de homelabs em Portugal.

## Descrição

Plataforma web que ajuda pessoas não-técnicas a terem o seu próprio homelab (self-hosting de serviços como Nextcloud, Jellyfin, etc.), cobrando uma taxa de instalação única + subscrição mensal de manutenção.

## Stack Técnica

- **Frontend/Backend**: Next.js 16 (React) com App Router
- **Base de dados**: PostgreSQL + Prisma ORM
- **Autenticação**: NextAuth v5 (Auth.js) com Credentials Provider
- **Estilo**: Tailwind CSS v4
- **Deploy**: Pensado para Vercel (desenvolvimento local)

## Estrutura do Projeto

```
homelab-service/
├── prisma/
│   ├── schema.prisma          # Schema da base de dados
│   └── migrations/            # Migrations do Prisma
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── auth.ts        # Server Actions para autenticação
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts  # API route do NextAuth
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx   # Página de login
│   │   │   └── register/
│   │   │       └── page.tsx   # Página de registo
│   │   ├── dashboard/
│   │   │   └── page.tsx       # Dashboard do cliente
│   │   ├── globals.css        # Estilos globais
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── header.tsx         # Componente de navegação
│   │   └── providers.tsx      # SessionProvider wrapper
│   ├── lib/
│   │   ├── auth.ts            # Configuração do NextAuth
│   │   └── db.ts              # Prisma Client singleton
│   └── types/
│       └── next-auth.d.ts     # Extensões de tipos do NextAuth
├── .env                       # Variáveis de ambiente
└── package.json
```

## Como Correr

### Pré-requisitos

1. Node.js 18+ instalado
2. Prisma Dev server a correr (para PostgreSQL local)

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o Prisma Dev server (PostgreSQL local)
npx prisma dev start default --detach

# 3. Aplicar migrations
npx prisma migrate dev

# 4. Gerar Prisma Client
npx prisma generate

# 5. Iniciar o servidor de desenvolvimento
npm run dev
```

O servidor fica disponível em `http://localhost:3000`

## Base de Dados

### Modelos

- **User**: Utilizadores da plataforma (clientes e admin)
- **Service**: Catálogo de serviços oferecidos
- **Order**: Pedidos dos clientes
- **Account/Session/VerificationToken**: Modelos do NextAuth para autenticação

### Comandos Úteis

```bash
# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Abrir Prisma Studio (GUI para ver a BD)
npx prisma studio

# Reset da base de dados
npx prisma migrate reset
```

## Changelog

### Fase 1 - Fundação (2026-08-18)

**Adicionado:**
- Projeto Next.js 16 com App Router e TypeScript
- Configuração do Prisma ORM com PostgreSQL
- Schema inicial da base de dados (User, Service, Order)
- NextAuth v5 com Credentials Provider (email/password)
- Landing page com pitch do serviço
- Páginas de login e registo
- Dashboard básico do cliente
- Middleware para proteção de rotas
- Header/Navbar com navegação
- Server Actions para registo de utilizadores

**Técnicas aprendidas:**
- Prisma Client singleton pattern (evitar múltiplas instâncias em dev)
- Server Actions para formulários (em vez de API routes manuais)
- JWT strategy no NextAuth (melhor para Vercel/serverless)
- Extensão de tipos do NextAuth para adicionar role/id
- Middleware para redirecionamento baseado em sessão

### Fase 2 - Admin Dashboard (2026-08-18)

**Adicionado:**
- Dashboard admin com visão geral (estatísticas, últimos utilizadores/pedidos)
- Página de gestão de pedidos (alterar estado, notas internas)
- Página de listagem de utilizadores
- Layout admin com sidebar de navegação
- Middleware para proteger rotas admin (só角色 ADMIN)
- Server Actions para atualizar pedidos

**Técnicas aprendidas:**
- Layouts aninhados (admin/layout.tsx com sidebar)
- Server Actions com revalidatePath para atualizar UI
- Verificação de role no middleware e em Server Components

---

## Roadmap

### Fase 2 - Core do Produto (em curso)
- [ ] Formulário de pedido de serviço
- [x] Dashboard de admin (2026-08-18)
- [ ] Sistema de subscrição simulado

### Fase 3 - Funcionalidades a Sério
- [ ] Integração Stripe
- [ ] Emails automáticos
- [ ] Mini-CRM

### Fase 4 - Avançado
- [ ] Monitorização remota de homelabs
- [ ] API/Agente de monitorização

## Licença

Projeto privado - Guilherme © 2026
