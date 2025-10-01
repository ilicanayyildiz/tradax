import { AlertTriangle } from 'lucide-react'

export const metadata = {
  title: 'Disclaimer',
  description: 'Important legal information about using TradaX',
}

export default function DisclaimerPage() {
  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        <div className="mb-8 flex items-center gap-4">
          <AlertTriangle className="h-12 w-12 text-red-600" />
          <div>
            <h1 className="text-4xl font-bold">Disclaimer</h1>
            <p className="mt-2 text-navy-600 dark:text-navy-400">
              Important Information About Risk
            </p>
          </div>
        </div>

        <div className="space-y-6 text-navy-600 dark:text-navy-400">
          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-6 dark:bg-red-900/20">
            <h2 className="text-xl font-bold text-red-900 dark:text-red-200">
              Trading Involves Significant Risk
            </h2>
            <p className="mt-2 text-red-800 dark:text-red-300">
              Trading foreign exchange, cryptocurrencies, and other financial instruments on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Not Financial Advice
            </h2>
            <p className="mt-4">
              The information provided on TradaX is for educational and informational purposes only. It is not intended as, and should not be construed as, financial advice. We do not provide personalized investment advice or recommendations.
            </p>
            <p className="mt-4">
              Any opinions, analyses, or information presented are general in nature and do not take into account your individual circumstances, financial situation, or needs. You should consult with a qualified financial advisor before making any investment decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              No Guarantee of Results
            </h2>
            <p className="mt-4">
              Past performance is not indicative of future results. The content on our website is subject to change at any time without notice. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information.
            </p>
            <p className="mt-4">
              Trading results can vary, and there is always the potential for loss. Your trading results may differ significantly from any examples or past performance shown on this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Risk of Loss
            </h2>
            <p className="mt-4">
              You acknowledge that you are aware of the risks associated with trading and investing. There is a possibility that you may sustain a loss equal to or greater than your entire investment. Therefore, you should only invest money that you can afford to lose.
            </p>
            <p className="mt-4">
              You should be aware of all the risks associated with trading and seek advice from an independent financial advisor if you have any doubts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Third-Party Content
            </h2>
            <p className="mt-4">
              Our website may contain links to third-party websites or content. We do not endorse or assume any responsibility for any third-party sites, information, materials, products, or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Limitation of Liability
            </h2>
            <p className="mt-4">
              TradaX, its employees, partners, and affiliates will not be held liable for any losses or damages in connection with the use of this website or reliance on any information provided. This includes, without limitation, direct, indirect, incidental, punitive, and consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Regulatory Notice
            </h2>
            <p className="mt-4">
              TradaX is an informational website and does not provide brokerage services. We are not a registered investment advisor, broker-dealer, or exchange. Always verify the regulatory status of any broker or financial service provider before engaging in transactions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Your Responsibility
            </h2>
            <p className="mt-4">
              By using this website, you acknowledge that you have read and understood this disclaimer and agree to its terms. You are solely responsible for your trading decisions and the consequences of those decisions.
            </p>
          </section>

          <div className="mt-8 rounded-lg border border-navy-300 bg-navy-50 p-6 dark:border-navy-700 dark:bg-navy-900">
            <p className="text-sm">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="mt-2 text-sm">
              This disclaimer is subject to change without notice. Please review this page periodically for updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

