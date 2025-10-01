import { Cookie } from 'lucide-react'

export const metadata = {
  title: 'Cookie Policy',
  description: 'TradaX Cookie Policy - How we use cookies and similar technologies',
}

export default function CookiesPage() {
  return (
    <div className="py-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container py-16">
          <div className="flex items-center gap-4">
            <Cookie className="h-12 w-12" />
            <div>
              <h1 className="text-4xl font-bold">Cookie Policy</h1>
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
              What Are Cookies?
            </h2>
            <p className="mt-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="mt-4">
              We use cookies and similar tracking technologies to track activity on our Service and store certain information. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              How We Use Cookies
            </h2>
            <p className="mt-4">
              TradaX uses cookies for several purposes:
            </p>

            <div className="mt-6 space-y-6">
              <div className="rounded-lg border border-navy-200 p-4 dark:border-navy-800">
                <h3 className="text-lg font-semibold text-navy-900 dark:text-navy-100">
                  Essential Cookies
                </h3>
                <p className="mt-2">
                  Required for the website to function properly. These cookies enable core functionality such as security, network management, and accessibility.
                </p>
                <p className="mt-2 text-sm">
                  <strong>Examples:</strong> Authentication tokens, session management, security features
                </p>
              </div>

              <div className="rounded-lg border border-navy-200 p-4 dark:border-navy-800">
                <h3 className="text-lg font-semibold text-navy-900 dark:text-navy-100">
                  Functional Cookies
                </h3>
                <p className="mt-2">
                  Help us provide enhanced functionality and personalization. These cookies may be set by us or by third-party providers.
                </p>
                <p className="mt-2 text-sm">
                  <strong>Examples:</strong> Dark mode preference, language settings, user preferences
                </p>
              </div>

              <div className="rounded-lg border border-navy-200 p-4 dark:border-navy-800">
                <h3 className="text-lg font-semibold text-navy-900 dark:text-navy-100">
                  Analytics Cookies
                </h3>
                <p className="mt-2">
                  Allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                </p>
                <p className="mt-2 text-sm">
                  <strong>Examples:</strong> Page views, time on page, bounce rate, user flow
                </p>
              </div>

              <div className="rounded-lg border border-navy-200 p-4 dark:border-navy-800">
                <h3 className="text-lg font-semibold text-navy-900 dark:text-navy-100">
                  Marketing Cookies
                </h3>
                <p className="mt-2">
                  Used to track visitors across websites to display relevant and engaging advertisements.
                </p>
                <p className="mt-2 text-sm">
                  <strong>Note:</strong> Currently not used on TradaX
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Third-Party Cookies
            </h2>
            <p className="mt-4">
              In addition to our own cookies, we may use various third-party cookies to report usage statistics of the Service:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li><strong>Supabase</strong> - Authentication and session management</li>
              <li><strong>Vercel</strong> - Analytics and performance monitoring</li>
              <li><strong>Investing.com</strong> - Economic calendar widget</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Cookies We Use
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse border border-navy-300 dark:border-navy-700">
                <thead className="bg-navy-100 dark:bg-navy-800">
                  <tr>
                    <th className="border border-navy-300 p-3 text-left dark:border-navy-700">Cookie Name</th>
                    <th className="border border-navy-300 p-3 text-left dark:border-navy-700">Purpose</th>
                    <th className="border border-navy-300 p-3 text-left dark:border-navy-700">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-navy-300 p-3 dark:border-navy-700">sb-access-token</td>
                    <td className="border border-navy-300 p-3 dark:border-navy-700">Authentication session</td>
                    <td className="border border-navy-300 p-3 dark:border-navy-700">Session</td>
                  </tr>
                  <tr>
                    <td className="border border-navy-300 p-3 dark:border-navy-700">sb-refresh-token</td>
                    <td className="border border-navy-300 p-3 dark:border-navy-700">Session refresh</td>
                    <td className="border border-navy-300 p-3 dark:border-navy-700">Persistent</td>
                  </tr>
                  <tr>
                    <td className="border border-navy-300 p-3 dark:border-navy-700">theme</td>
                    <td className="border border-navy-300 p-3 dark:border-navy-700">Dark/Light mode preference</td>
                    <td className="border border-navy-300 p-3 dark:border-navy-700">Persistent</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              How to Control Cookies
            </h2>
            <p className="mt-4">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
            </p>
            
            <h3 className="mt-6 text-xl font-semibold text-navy-900 dark:text-navy-100">
              Browser Settings
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
            </ul>

            <div className="mt-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
              <p className="text-yellow-900 dark:text-yellow-200">
                <strong>Note:</strong> If you choose to disable cookies, some features of our Service may not function properly. Essential cookies are required for authentication and security.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Do Not Track
            </h2>
            <p className="mt-4">
              We do not support Do Not Track ("DNT") signals. We do not track users across third-party websites to provide targeted advertising.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Your Consent
            </h2>
            <p className="mt-4">
              By using our website, you consent to our use of cookies in accordance with this Cookie Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Changes to This Cookie Policy
            </h2>
            <p className="mt-4">
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-100">
              Contact Us
            </h2>
            <p className="mt-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <ul className="mt-4 space-y-2">
              <li>• Email: privacy@tradax.com</li>
              <li>• Contact Form: <a href="/contact" className="text-primary-600 hover:underline">Contact Us</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

