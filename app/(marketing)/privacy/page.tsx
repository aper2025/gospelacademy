export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Last updated: March 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-gray max-w-none space-y-8">

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              The Gospel Academy, operated by Veritas AI Solutions (&quot;Company,&quot; &quot;we,&quot; &quot;us&quot;), is committed
              to protecting the privacy of our students, parents, and users. This Privacy Policy explains
              how we collect, use, store, and protect your personal information when you use our platform.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">We collect the following types of information:</p>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Account Information</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Name, email address, password (hashed), role (parent/student), and billing information
                  processed through Stripe.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Student Information</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Student name, grade level, date of birth, learning pathway, scheduling preferences,
                  and academic records (grades, assessments, progress).
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Usage Data</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Lesson progress, tutor session conversations, assessment responses, time spent on
                  lessons, and platform interaction data.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Technical Data</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  IP address, browser type, device information, and cookies necessary for authentication
                  and platform functionality.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>Providing and personalizing the educational experience</li>
              <li>AI tutor interactions (conversations are stored to maintain session context)</li>
              <li>Grading assessments and tracking academic progress</li>
              <li>Communicating with parents about student performance</li>
              <li>Processing payments through Stripe</li>
              <li>Improving our platform and curriculum</li>
              <li>Complying with legal obligations</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. AI Tutor Data</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Conversations with the AI Master Tutor are stored in our database to provide session
              continuity and improve the learning experience. These conversations are:
            </p>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>Accessible only to the student, their parent, and platform administrators</li>
              <li>Not shared with or sold to third parties</li>
              <li>Not used to train external AI models</li>
              <li>Subject to content safety filters and rate limiting</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Data Sharing</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We do not sell your personal information. We share data only with:
            </p>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li><span className="text-gray-700">Stripe</span> — for payment processing (Stripe&apos;s privacy policy applies)</li>
              <li><span className="text-gray-700">Supabase</span> — for authentication and database hosting</li>
              <li><span className="text-gray-700">Google (Gemini AI)</span> — for AI tutor responses (no student PII is sent to the AI model)</li>
              <li><span className="text-gray-700">Law enforcement</span> — only when required by law</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Children&apos;s Privacy (COPPA)</h2>
            <p className="text-gray-600 leading-relaxed">
              We comply with the Children&apos;s Online Privacy Protection Act (COPPA). Student accounts
              for children under 13 are created and managed by parents or legal guardians. We do not
              knowingly collect personal information from children under 13 without parental consent.
              Parents may review, modify, or delete their child&apos;s information by contacting us.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement industry-standard security measures to protect your data, including encrypted
              connections (SSL/TLS), hashed passwords, secure authentication tokens, and access controls.
              Our database is hosted on Supabase with PostgreSQL encryption at rest. However, no method of
              electronic transmission or storage is 100% secure.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
            <p className="text-gray-600 leading-relaxed">
              We retain your data for as long as your account is active or as needed to provide the Service.
              Academic records (grades, assessments) are retained for the duration of enrollment plus two
              years. You may request deletion of your account and associated data at any time by contacting us.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-3">You have the right to:</p>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>Access the personal data we hold about you or your child</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of non-essential communications</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes
              via email or through the platform. The &quot;Last updated&quot; date at the top reflects the most
              recent revision.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">11. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For privacy questions or data requests, contact us at{' '}
              <a href="mailto:support@thegospelacademy.com" className="text-[#E8632B] hover:underline">
                support@thegospelacademy.com
              </a>.
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
