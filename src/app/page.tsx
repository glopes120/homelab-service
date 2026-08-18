import Link from "next/link"

/**
 * Landing Page do Homelab-as-a-Service
 * 
 * Esta é a primeira coisa que o visitante vê.
 * O objetivo é comunicar claramente:
 * 1. O que é o serviço
 * 2. Para quem é
 * 3. Como funciona
 * 4. Quanto custa
 */

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* ========================================
          HERO SECTION
          O pitch principal - 5 segundos para convencer
      ======================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              O teu{" "}
              <span className="text-blue-600">homelab pessoal</span>
              , sem complicação
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Serviços como Nextcloud, Jellyfin e Home Assistant a correr na tua
              casa, com instalação profissional e manutenção contínua. Tudo open-source,
              tudo teu.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth/register"
                className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Começar Agora
              </Link>
              <Link
                href="/#como-funciona"
                className="text-base font-semibold leading-7 text-gray-900 hover:text-blue-600 transition-colors"
              >
                Saber mais →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          PROBLEMA/SOLUÇÃO
          Porque é que isto existe
      ======================================== */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Porque é que precisas disto?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Queres ter os teus dados na tua mão, mas não tens tempo,
              conhecimento técnico ou vontade de configurar tudo tu mesmo.
              Nós tratamos de tudo.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {/* Benefício 1 */}
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Privacidade Total
                </h3>
                <p className="mt-2 text-gray-600">
                  Os teus dados ficam na tua casa, no teu hardware. Sem
                  dependência de empresas de tech.
                </p>
              </div>

              {/* Benefício 2 */}
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.42 15.17l-5.384 3.18A1.125 1.125 0 014.63 17.25V5.25a1.125 1.125 0 011.406-1.1l5.384 3.18m0 0l5.384-3.18A1.125 1.125 0 0118.12 5.25v12a1.125 1.125 0 01-1.406 1.1l-5.384-3.18m0-5.36v5.36"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Setup Profissional
                </h3>
                <p className="mt-2 text-gray-600">
                  Instalação correta, otimizada e segura. Sem erros de
                  configuração que estragam tudo.
                </p>
              </div>

              {/* Benefício 3 */}
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Manutenção Contínua
                </h3>
                <p className="mt-2 text-gray-600">
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
          O que oferecemos concretamente
      ======================================== */}
      <section id="servicos" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              O que oferecemos
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Escolhe o que precisas. Tudo baseado em software open-source já
              testado e fiável.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Card: CasaOS */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                C
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Instalação CasaOS
              </h3>
              <p className="mt-2 text-gray-600">
                Interface simples para gerir os teus serviços. Perfecto para
                quem quer algo direto e fácil de usar.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Nextcloud, Jellyfin, Pi-hole
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Dashboard web intuitivo
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Docker containers pré-configurados
                </li>
              </ul>
              <div className="mt-8">
                <span className="text-3xl font-bold text-gray-900">€49</span>
                <span className="text-sm text-gray-500 ml-2">instalação única</span>
              </div>
            </div>

            {/* Card: Umbrel */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 text-white font-bold">
                U
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Instalação Umbrel
              </h3>
              <p className="mt-2 text-gray-600">
                Experiência premium com interface moderna e catálogo rico de
                aplicações. O homelab "Apple-like".
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  100+ aplicações disponíveis
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  UI elegante e moderna
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  One-click apps + backups
                </li>
              </ul>
              <div className="mt-8">
                <span className="text-3xl font-bold text-gray-900">€79</span>
                <span className="text-sm text-gray-500 ml-2">instalação única</span>
              </div>
            </div>
          </div>

          {/* Manutenção Mensal */}
          <div className="mx-auto mt-12 max-w-2xl">
            <div className="rounded-2xl border-2 border-blue-600 bg-blue-50 p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900">
                Manutenção Mensal
              </h3>
              <p className="mt-2 text-gray-600">
                Atualizações de segurança, monitorização de uptime, backups
                automáticos e suporte técnico por email.
              </p>
              <div className="mt-6">
                <span className="text-3xl font-bold text-gray-900">€15/mês</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          COMO FUNCIONA
          Processo passo a passo
      ======================================== */}
      <section id="como-funciona" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Como funciona
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Três passos simples para teres o teu homelab a funcionar.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
              {/* Passo 1 */}
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  1
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Escolhe o teu serviço
                </h3>
                <p className="mt-2 text-gray-600">
                  CasaOS ou Umbrel, conforme as tuas necessidades e nível de
                  experiência.
                </p>
              </div>

              {/* Passo 2 */}
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  2
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Nós instalamos
                </h3>
                <p className="mt-2 text-gray-600">
                  Configuração remota do teu hardware com todos os serviços
                  que escolheste.
                </p>
              </div>

              {/* Passo 3 */}
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  3
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Usa e goza
                </h3>
                <p className="mt-2 text-gray-600">
                  Acede aos teus dados de qualquer lugar. Nós tratamos da
                  manutenção, tu vives a vida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          CTA FINAL
          Última chance de convencer
      ======================================== */}
      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pronto para começar?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Cria a tua conta gratuita e descobre o que podes fazer com o teu
            próprio homelab.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/register"
              className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50 transition-colors"
            >
              Criar Conta Grátis
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================
          FOOTER
      ======================================== */}
      <footer className="bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                HL
              </div>
              <span className="text-lg font-bold text-white">
                Homelab Service
              </span>
            </div>
            <p className="text-sm text-gray-400">
              © 2026 Homelab Service. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
