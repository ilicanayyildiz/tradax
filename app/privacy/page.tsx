import { Shield } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy',
  description: 'TradaX Privacy Policy - How we collect, use, and protect your information',
}

export default function PrivacyPage() {
  return (
    <div className="py-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container py-16">
          <div className="flex items-center gap-4">
            <Shield className="h-12 w-12" />
            <div>
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
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
              Introduction
            </h2>
            <p className="mt-4">
              At TradaX, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
            <p className="mt-4">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Information We Collect
            </h2>
            <h3 className="mt-6 text-xl font-semibold text-navy-900 dark:text-navy-100">
              Personal Data
            </h3>
            <p className="mt-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Register for an account</li>
              <li>Subscribe to our newsletter</li>
              <li>Fill out a contact form</li>
              <li>Post comments or interact with content</li>
            </ul>
            <p className="mt-4">
              This information may include:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Name and email address</li>
              <li>Username and password</li>
              <li>Profile information (bio, avatar, social links)</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold text-navy-900 dark:text-navy-100">
              Automatically Collected Information
            </h3>
            <p className="mt-4">
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>Clickstream data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              How We Use Your Information
            </h2>
            <p className="mt-4">
              We use the information we collect to:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new features and functionality</li>
              <li>Send you newsletters and marketing communications (with your consent)</li>
              <li>Respond to your comments and questions</li>
              <li>Prevent fraudulent transactions and monitor against theft</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Cookies and Tracking Technologies
            </h2>
            <p className="mt-4">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.
            </p>
            <p className="mt-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Third-Party Services
            </h2>
            <p className="mt-4">
              We may use third-party service providers to help us operate our website and provide services to you. These third parties include:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li><strong>Supabase</strong> - Database and authentication services</li>
              <li><strong>Vercel</strong> - Hosting and deployment</li>
              <li><strong>API Providers</strong> - Market data (ExchangeRate-API, CoinGecko)</li>
              <li><strong>Investing.com</strong> - Economic calendar widget</li>
            </ul>
            <p className="mt-4">
              These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Data Security
            </h2>
            <p className="mt-4">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Your Privacy Rights
            </h2>
            <p className="mt-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>The right to access your personal data</li>
              <li>The right to request correction of your personal data</li>
              <li>The right to request deletion of your personal data</li>
              <li>The right to object to processing of your personal data</li>
              <li>The right to request restriction of processing your personal data</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at privacy@tradax.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Children's Privacy
            </h2>
            <p className="mt-4">
              Our website is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Changes to This Privacy Policy
            </h2>
            <p className="mt-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <p className="mt-4">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Contact Us
            </h2>
            <p className="mt-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="mt-4 space-y-2">
              <li>• Email: privacy@tradax.com</li>
              <li>• Website: <a href="/contact" className="text-primary-600 hover:underline">Contact Form</a></li>
            </ul>
          </section>

          <div className="mt-12 rounded-lg border border-primary-200 bg-primary-50 p-6 dark:border-primary-900 dark:bg-primary-900/20">
            <p className="text-sm">
              <strong>GDPR Compliance:</strong> If you are located in the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR). TradaX aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your personal data.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

