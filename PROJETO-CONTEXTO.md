# Homelab-as-a-Service — Contexto para IA

## Visão Geral do Projeto

Plataforma web full-stack para um serviço de "homelab-as-a-service" em Portugal: instalação e manutenção de homelabs (Nextcloud, Jellyfin, Home Assistant, etc.) para pessoas não-técnicas, cobrando instalação única + subscrição mensal.

**Stack**: Next.js 16 (App Router) + PostgreSQL + Prisma + NextAuth v5 + Tailwind CSS v4

---

## Estado Atual

### Fase 1 — Fundação ✅
### Fase 2 — Admin Dashboard ✅ (parcial)
### Fase 2 — Formulário de Pedido ❌ (próximo passo)

---

## O Que Foi Construído

### 1. Projeto Base
- Next.js 16 com App Router, TypeScript, Tailwind CSS v4
- Prisma ORM com PostgreSQL (via `prisma dev` local)
- Prisma schema com 6 modelos: User, Account, Session, VerificationToken, Service, Order

### 2. Autenticação (NextAuth v5)
- Credentials Provider (email/password com bcrypt)
- JWT strategy (não database sessions — melhor para serverless/Vercel)
- Extensão de tipos para adicionar `id` e `role` ao `session.user`
- Server Action para registo (`src/app/actions/auth.ts`)
- Páginas de login e registo com formulários React

### 3. Landing Page
- Hero section com pitch do serviço
- Secção de benefícios (Privacidade, Setup Profissional, Manutenção)
- Cards de serviços: CasaOS (€49), Umbrel (€79), Manutenção (€15/mês)
- Secção "Como Funciona" (3 passos)
- CTA final
- Footer

### 4. Dashboard do Cliente (`/dashboard`)
- Página protegida (só utilizadores autenticados)
- Cards: Pedidos Ativos, Subscrições, Novo Pedido
- Lista de pedidos recentes (vazia por agora)

### 5. Admin Dashboard (`/admin`)
- **Layout com sidebar** (`src/app/admin/layout.tsx`)
- **Dashboard principal** (`/admin`): estatísticas, últimos utilizadores, últimos pedidos
- **Gestão de pedidos** (`/admin/pedidos`): alterar estado (PENDING/IN_PROGRESS/COMPLETED/CANCELLED), notas internas
- **Listagem de utilizadores** (`/admin/Utilizadores`): tabela com todos os users
- **Server Actions** (`src/app/actions/admin.ts`): updateOrderStatus, updateOrderNotes

### 6. Proteção de Rotas
- Ficheiro `src/proxy.ts` (Next.js 16 usa "proxy" em vez de "middleware")
- Verifica sessão + role para `/admin/*`
- Verifica sessão para `/dashboard/*`
- Redireciona para login se não autenticado

---

## Decisões Técnicas e "Porquê"

### Prisma com driver adapter
O Prisma 7.x exige um driver adapter explícito (`@prisma/adapter-pg`) em vez de configurar a connection string diretamente. O `PrismaClient` é criado com `new PrismaClient({ adapter })`.

### Prisma Client Singleton
Em desenvolvimento, o Next.js recompila o servidor frequentemente. Sem o singleton pattern, criaríamos múltiplas instâncias do Prisma Client e esgotaríamos as conexões da BD. Usamos `globalThis` para guardar a instância.

### JWT em vez de Database Sessions
JWT é mais simples para Vercel/serverless porque não precisa de queries à BD para cada request. O token é guardado no cookie e verificado criptograficamente.

### Server Actions em vez de API Routes
Server Actions permitem chamar funções do servidor diretamente a partir de formulários React, sem precisar de criar rotas API manuais para cada operação. Mais limpo e type-safe.

### proxy.ts em vez de middleware.ts
O Next.js 16 renomeou "middleware" para "proxy". Mais importante: o proxy corre em **Node.js runtime** por defeito, ao contrário do middleware que era Edge runtime. Isto é crucial porque o Prisma precisa de módulos Node.js que não existem no Edge.

### Role-based access control
O campo `role` no modelo `User` (enum: CLIENT, ADMIN) é guardado no JWT. O proxy verifica o role antes de permitir acesso a rotas admin. O NextAuth callback `jwt` adiciona o role ao token, e o callback `session` expõe-o ao client.

---

## Estrutura do Projeto

```
homelab-service/
├── prisma/
│   ├── schema.prisma              # User, Service, Order + NextAuth models
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   ├── auth.ts            # Server Action: registo de utilizador
│   │   │   └── admin.ts           # Server Actions: updateOrderStatus, updateOrderNotes
│   │   ├── admin/
│   │   │   ├── layout.tsx         # Layout com sidebar admin
│   │   │   ├── page.tsx           # Dashboard admin (estatísticas)
│   │   │   ├── pedidos/
│   │   │   │   └── page.tsx       # Gestão de pedidos
│   │   │   └── Utilizadores/
│   │   │       └── page.tsx       # Listagem de utilizadores
│   │   ├── api/auth/[...nextauth]/
│   │   │   └── route.ts           # API route do NextAuth
│   │   ├── auth/
│   │   │   ├── login/page.tsx     # Página de login
│   │   │   └── register/page.tsx  # Página de registo
│   │   ├── dashboard/
│   │   │   └── page.tsx           # Dashboard do cliente
│   │   ├── globals.css
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Landing page
│   ├── components/
│   │   ├── header.tsx             # Navbar (mostra link Admin se role=ADMIN)
│   │   └── providers.tsx          # SessionProvider wrapper
│   ├── lib/
│   │   ├── auth.ts                # Config NextAuth (providers, callbacks, pages)
│   │   └── db.ts                  # Prisma Client singleton
│   ├── proxy.ts                   # Proxy (proteção de rotas)
│   └── types/
│       └── next-auth.d.ts         # Extensão de tipos NextAuth
├── .env                           # DATABASE_URL, AUTH_SECRET, AUTH_URL
├── package.json
├── README.md
└── tsconfig.json
```

---

## Schema da Base de Dados

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  passwordHash  String?
  role          UserRole  @default(CLIENT)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts Account[]
  sessions Session[]
  orders   Order[]
}

enum UserRole { CLIENT ADMIN }

model Service {
  id          String      @id @default(cuid())
  name        String
  slug        String      @unique
  description String
  shortDesc   String
  price       Decimal     @db.Decimal(10, 2)
  type        ServiceType
  active      Boolean     @default(true)
  features    String[]
  orders Order[]
}

enum ServiceType { ONE_TIME SUBSCRIPTION }

model Order {
  id         String      @id @default(cuid())
  userId     String
  serviceId  String
  status     OrderStatus @default(PENDING)
  notes      String?     @db.Text
  adminNotes String?     @db.Text
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt
  user    User    @relation(fields: [userId], references: [id])
  service Service @relation(fields: [serviceId], references: [id])
}

enum OrderStatus { PENDING IN_PROGRESS COMPLETED CANCELLED }
```

---

## Como Correr

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar PostgreSQL local (Prisma Dev)
npx prisma dev start default --detach

# 3. Aplicar migrations
npx prisma migrate dev

# 4. Gerar Prisma Client
npx prisma generate

# 5. Tornar o utilizador admin (substituir email se necessário)
npx tsx -e "
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
async function main() {
  const adapter = new PrismaPg({ connectionString: 'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable' });
  const prisma = new PrismaClient({ adapter });
  await prisma.user.update({ where: { email: 'SEU_EMAIL' }, data: { role: 'ADMIN' } });
  console.log('Admin definido!');
  await prisma.\$disconnect();
}
main();
"

# 6. Iniciar servidor de desenvolvimento
npm run dev
```

**URLs:**
- Landing page: `http://localhost:3000`
- Login: `http://localhost:3000/auth/login`
- Registo: `http://localhost:3000/auth/register`
- Dashboard cliente: `http://localhost:3000/dashboard`
- Admin: `http://localhost:3000/admin`

---

## Notas Importantes

### O papel ADMIN tem de ser definido manualmente
O `role` padrão é `CLIENT`. Para tornar alguém admin, é preciso atualizar manualmente na BD (comandos acima). Em produção, isto seria feito via seed script ou painel admin.

### A BD do Prisma Dev é temporária
O `npx prisma dev` cria uma BD temporária que pode ser perdida se o servidor for parado com `npx prisma dev rm`. Para persistir, usar um PostgreSQL externo (Neon, Supabase, etc.).

### O middleware foi migrado para proxy
O Next.js 16 deprecou `middleware.ts` em favor de `proxy.ts`. O proxy corre em Node.js runtime (não Edge), o que permite usar Prisma diretamente.

### O header mostra "Admin" só para ADMINs
O componente `header.tsx` verifica `session.user.role === "ADMIN"` e mostra o link condicionalmente.

---

## Próximos Passos (Fase 2 cont.)

### 1. Formulário de Pedido de Serviço
Criar em `/dashboard/novo-pedido`:
- Select do serviço (CasaOS ou Umbrel)
- Campo de texto para descrever o que o cliente precisa
- Submeter cria um `Order` na BD com status PENDING
- Server Action para criar o pedido

### 2. Sistema de Subscrição Simulado
- Criar um modelo `Subscription` no Prisma schema
- Formulário para ativar manutenção mensal num pedido
- Dashboard mostra subscrições ativas

### 3. Seed Script
Criar `prisma/seed.ts` para popular:
- Serviços do catálogo (CasaOS, Umbrel, Manutenção)
- Utilizador admin inicial

---

## Fase 3 — Funcionalidades a Sério (futuro)

- Integração Stripe (pagamento único + recorrente)
- Emails automáticos (confirmação, lembretes)
- Mini-CRM com histórico por cliente

## Fase 4 — Avançado (futuro)

- Agente de monitorização remota de homelabs
- API de status/uptime
