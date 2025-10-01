import { FileText } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service',
  description: 'TradaX Terms of Service - Legal terms and conditions for using our platform',
}

export default function TermsPage() {
  return (
    <div className="py-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container py-16">
          <div className="flex items-center gap-4">
            <FileText className="h-12 w-12" />
            <div>
              <h1 className="text-4xl font-bold">Terms of Service</h1>
              <p className="mt-2 text-primary-100">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mt-8 max-w-4xl">
        <div className="space-y-8 text-navy-600 dark:text-navy-400">
          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              1. Agreement to Terms
            </h2>
            <p className="mt-4">
              By accessing and using TradaX ("Website", "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              2. Use License
            </h2>
            <p className="mt-4">
              Permission is granted to temporarily access the materials (information or software) on TradaX for personal, non-commercial transitory viewing only.
            </p>
            <p className="mt-4">This license shall automatically terminate if you violate any of these restrictions:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>You may not modify or copy the materials</li>
              <li>You may not use the materials for any commercial purpose</li>
              <li>You may not attempt to decompile or reverse engineer any software</li>
              <li>You may not remove any copyright or proprietary notations</li>
              <li>You may not transfer the materials to another person</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              3. User Accounts
            </h2>
            <p className="mt-4">
              When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms.
            </p>
            <p className="mt-4">
              You are responsible for safeguarding the password and for all activities that occur under your account. You agree to:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Keep your password confidential</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Not allow others to use your account</li>
              <li>Be solely responsible for any activities or actions under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              4. User Content
            </h2>
            <p className="mt-4">
              Our Service allows you to post, link, store, share and otherwise make available certain information, text, or material ("Content"). You are responsible for the Content that you post on or through the Service.
            </p>
            <p className="mt-4">
              By posting Content, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.
            </p>
            <p className="mt-4">You agree not to post Content that:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Is illegal, harmful, or violates any law</li>
              <li>Infringes any intellectual property rights</li>
              <li>Contains viruses or malicious code</li>
              <li>Is spam, advertising, or solicitation</li>
              <li>Harasses, abuses, or harms another person</li>
              <li>Contains false or misleading information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              5. Intellectual Property
            </h2>
            <p className="mt-4">
              The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of TradaX and its licensors.
            </p>
            <p className="mt-4">
              Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              6. Financial Information Disclaimer
            </h2>
            <div className="mt-4 rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
              <p className="text-red-900 dark:text-red-200">
                <strong>IMPORTANT:</strong> TradaX provides financial information and educational content for informational purposes only. This is NOT financial advice. Trading involves significant risk, and you may lose your entire investment.
              </p>
            </div>
            <p className="mt-4">You acknowledge and agree that:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>We are not a licensed financial advisor, broker, or investment firm</li>
              <li>All content is for educational purposes only</li>
              <li>You should consult with a qualified financial professional before making investment decisions</li>
              <li>Past performance is not indicative of future results</li>
              <li>You trade at your own risk</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              7. Limitation of Liability
            </h2>
            <p className="mt-4">
              In no event shall TradaX, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, or other intangible losses, resulting from:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use or alteration of your transmissions or content</li>
              <li>Trading losses based on information or analysis from our Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              8. Links to Other Websites
            </h2>
            <p className="mt-4">
              Our Service may contain links to third-party websites or services that are not owned or controlled by TradaX. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              9. Termination
            </h2>
            <p className="mt-4">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms.
            </p>
            <p className="mt-4">
              Upon termination, your right to use the Service will immediately cease. All provisions of the Terms which by their nature should survive termination shall survive.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              10. Governing Law
            </h2>
            <p className="mt-4">
              These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which TradaX operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              11. Changes to Terms
            </h2>
            <p className="mt-4">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
            </p>
            <p className="mt-4">
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              12. Contact Information
            </h2>
            <p className="mt-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="mt-4 space-y-2">
              <li>• Email: legal@tradax.com</li>
              <li>• Contact Form: <a href="/contact" className="text-primary-600 hover:underline">Contact Us</a></li>
            </ul>
          </section>

          <div className="mt-12 rounded-lg border border-navy-300 bg-navy-50 p-6 dark:border-navy-700 dark:bg-navy-900">
            <p className="text-sm">
              <strong>Acceptance of Terms:</strong> By using TradaX, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Service. Your continued use of the Service following the posting of changes to this policy will be deemed your acceptance of those changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

