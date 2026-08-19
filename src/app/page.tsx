import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* ========================================
          HERO SECTION
      ======================================== */}
      <section
        className="relative overflow-hidden py-24 sm:py-32"
        style={{
          backgroundImage: "url('/wallpaperhomelabbingblueprint.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-base/95" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p
              className="animate-hero-stagger font-mono text-xs tracking-widest text-signal uppercase"
              style={{ animationDelay: "0ms" }}
            >
              HOMELAB_SERVICE // PT
            </p>

            <h1
              className="animate-hero-stagger mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-6xl"
              style={{ animationDelay: "100ms" }}
            >
              A tua nuvem. Em tua casa.
            </h1>

            <p
              className="animate-hero-stagger mt-6 text-lg leading-relaxed text-ink/70"
              style={{ animationDelay: "200ms" }}
            >
              Nextcloud, Jellyfin, Home Assistant e mais — a correr no teu hardware,
              com instalação profissional e manutenção contínua. Sem mensalidades
              escondidas, sem dependência de nuvens de terceiros.
            </p>

            <div
              className="animate-hero-stagger mt-10 flex items-center justify-center gap-x-6"
              style={{ animationDelay: "300ms" }}
            >
              <Link
                href="/auth/register"
                className="rounded-lg bg-ink px-6 py-3 text-base font-semibold text-base transition-all duration-150 hover:bg-ink/90 hover:scale-[1.03]"
              >
                Agendar instalação
              </Link>
              <Link
                href="/#como-funciona"
                className="text-sm font-medium text-ink/70 hover:text-ink transition-colors"
              >
                Saber mais →
              </Link>
            </div>

            <div
              className="animate-hero-stagger mx-auto mt-14 max-w-xs rounded-xl bg-ink p-5 text-left"
              style={{ animationDelay: "400ms" }}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="block h-2 w-2 rounded-full bg-copper" />
                  <span className="font-mono text-xs tracking-wider text-base/80 uppercase">
                    A_INSTALAR
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="block h-2 w-2 rounded-full bg-signal"
                    style={{ animation: "signal-pulse 2s ease-in-out infinite" }}
                  />
                  <span className="font-mono text-xs tracking-wider text-base/80 uppercase">
                    LIGADO
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="block h-2 w-2 rounded-full bg-trust opacity-40" />
                  <span className="font-mono text-xs tracking-wider text-base/80 uppercase">
                    MANUTENCAO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SOCIAL PROOF BAR
      ======================================== */}
      <section className="bg-ink py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-signal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-base/70">Setup profissional garantido</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-signal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span className="text-sm text-base/70">Dados 100% teus</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-signal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
              </svg>
              <span className="text-sm text-base/70">Acesso remoto de qualquer lugar</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-signal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-base/70">Suporte técnico incluído</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          PROBLEMA / SOLUÇÃO
      ======================================== */}
      <section className="bg-base py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Porque é que precisas disto?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              Queres ter os teus dados na tua mão, mas não tens tempo,
              conhecimento técnico ou vontade de configurar tudo tu mesmo.
              Nós tratamos de tudo.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-ink/5">
                  <svg className="h-6 w-6 text-ink" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink">Privacidade Total</h3>
                <p className="mt-2 text-ink/70">
                  Os teus dados ficam na tua casa, no teu hardware. Sem
                  dependência de empresas de tech.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-ink/5">
                  <svg className="h-6 w-6 text-ink" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.18A1.125 1.125 0 014.63 17.25V5.25a1.125 1.125 0 011.406-1.1l5.384 3.18m0 0l5.384-3.18A1.125 1.125 0 0118.12 5.25v12a1.125 1.125 0 01-1.406 1.1l-5.384-3.18m0-5.36v5.36" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink">Setup Profissional</h3>
                <p className="mt-2 text-ink/70">
                  Instalação correta, otimizada e segura. Sem erros de
                  configuração que estragam tudo.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-ink/5">
                  <svg className="h-6 w-6 text-ink" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink">Manutenção Contínua</h3>
                <p className="mt-2 text-ink/70">
                  Atualizações, backups, monitorização. Tu vives a vida,
                  nós tratamos da infraestrutura.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SERVIÇOS
      ======================================== */}
      <section id="servicos" className="bg-ink py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-base sm:text-4xl">
              O que oferecemos
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-base/70">
              Escolhe o que precisas. Tudo baseado em software open-source já
              testado e fiável.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
            <ScrollReveal index={0}>
              <div className="rounded-xl border border-base/10 bg-ink p-8 transition-all hover:-translate-y-1 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-signal/20 font-bold text-signal">
                  C
                </div>
                <h3 className="mt-4 text-xl font-semibold text-base">Instalação CasaOS</h3>
                <p className="mt-2 text-base/70">
                  Interface simples para gerir os teus serviços. Perfeito para
                  quem quer algo direto e fácil de usar.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3 text-sm text-base/80">
                    <span className="block h-1.5 w-1.5 rounded-full bg-signal" />
                    Nextcloud, Jellyfin, Pi-hole
                  </li>
                  <li className="flex items-center gap-3 text-sm text-base/80">
                    <span className="block h-1.5 w-1.5 rounded-full bg-signal" />
                    Dashboard web intuitivo
                  </li>
                  <li className="flex items-center gap-3 text-sm text-base/80">
                    <span className="block h-1.5 w-1.5 rounded-full bg-signal" />
                    Docker containers pré-configurados
                  </li>
                </ul>
                <div className="mt-8">
                  <span className="text-3xl font-semibold text-base">€49</span>
                  <span className="ml-2 text-sm text-base/50">instalação única</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal index={1}>
              <div className="rounded-xl border border-base/10 bg-ink p-8 transition-all hover:-translate-y-1 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-copper/20 font-bold text-copper">
                  U
                </div>
                <h3 className="mt-4 text-xl font-semibold text-base">Instalação Umbrel</h3>
                <p className="mt-2 text-base/70">
                  Experiência premium com interface moderna e catálogo rico de
                  aplicações. O homelab &ldquo;Apple-like&rdquo;.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3 text-sm text-base/80">
                    <span className="block h-1.5 w-1.5 rounded-full bg-copper" />
                    100+ aplicações disponíveis
                  </li>
                  <li className="flex items-center gap-3 text-sm text-base/80">
                    <span className="block h-1.5 w-1.5 rounded-full bg-copper" />
                    UI elegante e moderna
                  </li>
                  <li className="flex items-center gap-3 text-sm text-base/80">
                    <span className="block h-1.5 w-1.5 rounded-full bg-copper" />
                    One-click apps + backups
                  </li>
                </ul>
                <div className="mt-8">
                  <span className="text-3xl font-semibold text-base">€79</span>
                  <span className="ml-2 text-sm text-base/50">instalação única</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal index={2}>
            <div className="mx-auto mt-12 max-w-2xl">
              <div className="rounded-xl border border-signal/30 bg-signal/10 p-8 text-center transition-all hover:-translate-y-1">
                <div className="flex items-center justify-center gap-2">
                  <span
                    className="block h-2 w-2 rounded-full bg-signal"
                    style={{ animation: "signal-pulse 2s ease-in-out infinite" }}
                  />
                  <span className="font-mono text-xs tracking-wider text-signal uppercase">
                    ATIVO
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-base">Manutenção Mensal</h3>
                <p className="mt-2 text-base/70">
                  Atualizações de segurança, monitorização de uptime, backups
                  automáticos e suporte técnico por email.
                </p>
                <div className="mt-6">
                  <span className="text-3xl font-semibold text-base">€15/mês</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================
          COMPARAÇÃO CASAOS vs UMBREL
      ======================================== */}
      <section className="bg-base py-24 sm:py-32 border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              CasaOS ou Umbrel?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              Ambos são excelentes. A escolha depende do que valorizas mais.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-ink/10">
                  <th className="py-4 pr-4 text-sm font-medium text-ink/50">Característica</th>
                  <th className="py-4 px-4 text-sm font-semibold text-signal">CasaOS</th>
                  <th className="py-4 pl-4 text-sm font-semibold text-copper">Umbrel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5 text-sm">
                <tr>
                  <td className="py-3.5 pr-4 text-ink/70">Preço instalação</td>
                  <td className="py-3.5 px-4 font-medium text-ink">€49</td>
                  <td className="py-3.5 pl-4 font-medium text-ink">€79</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-ink/70">Interface</td>
                  <td className="py-3.5 px-4 text-ink">Simples e funcional</td>
                  <td className="py-3.5 pl-4 text-ink">Moderna e polishada</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-ink/70">Catálogo de apps</td>
                  <td className="py-3.5 px-4 text-ink">~30 apps</td>
                  <td className="py-3.5 pl-4 text-ink">100+ apps</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-ink/70">Curva de aprendizagem</td>
                  <td className="py-3.5 px-4 text-ink">Muito fácil</td>
                  <td className="py-3.5 pl-4 text-ink">Fácil</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-ink/70">Backups</td>
                  <td className="py-3.5 px-4 text-ink">Manual</td>
                  <td className="py-3.5 pl-4 text-ink">Automáticos (one-click)</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-ink/70">Docker</td>
                  <td className="py-3.5 px-4 text-ink">Sim</td>
                  <td className="py-3.5 pl-4 text-ink">Sim</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-ink/70">Ideal para</td>
                  <td className="py-3.5 px-4 text-ink">Iniciantes,simplicidade</td>
                  <td className="py-3.5 pl-4 text-ink">Power users, variedade</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================
          COMO FUNCIONA
      ======================================== */}
      <section id="como-funciona" className="bg-base py-24 sm:py-32 border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Como funciona
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              Três passos para teres o teu homelab a funcionar.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
              <ScrollReveal index={0}>
                <div>
                  <p className="font-mono text-sm tracking-wider text-signal">STEP_01 →</p>
                  <h3 className="mt-3 text-lg font-semibold text-ink">Escolhe o teu serviço</h3>
                  <p className="mt-2 text-ink/70">
                    CasaOS ou Umbrel, conforme as tuas necessidades e nível de
                    experiência.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal index={1}>
                <div>
                  <p className="font-mono text-sm tracking-wider text-signal">STEP_02 →</p>
                  <h3 className="mt-3 text-lg font-semibold text-ink">Nós instalamos</h3>
                  <p className="mt-2 text-ink/70">
                    Configuração remota do teu hardware com todos os serviços
                    que escolheste.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal index={2}>
                <div>
                  <p className="font-mono text-sm tracking-wider text-signal">STEP_03 →</p>
                  <h3 className="mt-3 text-lg font-semibold text-ink">Usa e goza</h3>
                  <p className="mt-2 text-ink/70">
                    Acede aos teus dados de qualquer lugar. Nós tratamos da
                    manutenção, tu vives a vida.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          FAQ
      ======================================== */}
      <section className="bg-base py-24 sm:py-32 border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Perguntas frequentes
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-3xl space-y-6">
            <ScrollReveal index={0}>
              <div className="rounded-xl border border-ink/10 bg-white p-6">
                <h3 className="text-base font-semibold text-ink">
                  Que hardware preciso?
                </h3>
                <p className="mt-2 text-sm text-ink/70">
                  Um Raspberry Pi 4 (4GB+), um mini PC (Intel NUC ou similar),
                  ou qualquer computador com 8GB+ de RAM e 128GB+ de armazenamento.
                  Nós ajudamos-te a escolher o hardware ideal para o teu orçamento.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal index={1}>
              <div className="rounded-xl border border-ink/10 bg-white p-6">
                <h3 className="text-base font-semibold text-ink">
                  A instalação é remota?
                </h3>
                <p className="mt-2 text-sm text-ink/70">
                  Sim. Configuramos tudo remotamente via internet. Precisas apenas
                  de uma ligação estável e de nos pores em acesso ao teu dispositivo.
                  Sem necessidade de deslocamentos.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal index={2}>
              <div className="rounded-xl border border-ink/10 bg-white p-6">
                <h3 className="text-base font-semibold text-ink">
                  E se avariar o hardware?
                </h3>
                <p className="mt-2 text-sm text-ink/70">
                  Os teus dados ficam sempre no teu hardware. Se avariar, podes
                  migrar para um novo dispositivo. Com manutenção mensal, fazemos
                  backups regulares que facilitam a recuperação.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal index={3}>
              <div className="rounded-xl border border-ink/10 bg-white p-6">
                <h3 className="text-base font-semibold text-ink">
                  Preciso de internet rápida?
                </h3>
                <p className="mt-2 text-sm text-ink/70">
                  Para acesso local, qualquer rede serve. Para acesso remoto,
                  recomenda-se 20Mbps+ de upload. Para streaming de vídeo (Jellyfin),
                  50Mbps+ é ideal.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal index={4}>
              <div className="rounded-xl border border-ink/10 bg-white p-6">
                <h3 className="text-base font-semibold text-ink">
                  Posso adicionar mais serviços depois?
                </h3>
                <p className="mt-2 text-sm text-ink/70">
                  Sim. Podes sempre pedir para instalar serviços adicionais.
                  Cada instalação extra tem um custo separado, ou podes incluir
                  manutenção mensal para teres suporte contínuo.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================
          CTA FINAL
      ======================================== */}
      <section className="bg-base py-16 border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Pronto para começar?
          </h2>
          <p className="mt-4 text-lg text-ink/70">
            Cria a tua conta gratuita e descobre o que podes fazer com o teu
            próprio homelab.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/register"
              className="rounded-lg bg-ink px-6 py-3 text-base font-semibold text-base transition-colors hover:bg-ink/90"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================
          FOOTER
      ======================================== */}
      <footer className="bg-ink py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal/20 font-mono text-xs font-bold text-signal">
                HL
              </div>
              <span className="text-lg font-semibold text-base">Homelab Service</span>
            </div>
            <p className="text-sm text-base/50">
              © 2026 Homelab Service. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
