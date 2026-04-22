export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Last updated: March 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-gray max-w-none space-y-8">

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing or using The Gospel Academy platform (&quot;Service&quot;), operated by Veritas AI Solutions
              (&quot;Company,&quot; &quot;we,&quot; &quot;us&quot;), you agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use the Service. Parents or legal guardians must agree to these
              terms on behalf of minor students.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 leading-relaxed">
              The Gospel Academy provides AI-powered online education for students in Pre-K through Grade 12.
              The Service includes curriculum content, AI tutoring, assessments, grading, progress tracking,
              and parent/student dashboards. Content is delivered from a Christian worldview and is designed
              to be academically rigorous.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Account Registration</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              You must provide accurate and complete information when creating an account. You are responsible
              for maintaining the confidentiality of your account credentials and for all activities under
              your account. You must notify us immediately of any unauthorized use.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Parents are responsible for creating and managing student accounts for their children.
              Student accounts for minors must be created by a parent or legal guardian.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Subscriptions and Payment</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Access to the Service requires a paid subscription. Subscription plans, pricing, and billing
              cycles are described on our Pricing page. All payments are processed securely through Stripe.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Subscriptions renew automatically unless canceled before the renewal date. Refunds are handled
              on a case-by-case basis. Please contact support@thegospelacademy.com for refund requests.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Acceptable Use</h2>
            <p className="text-gray-600 leading-relaxed mb-3">You agree not to:</p>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to the Service or its systems</li>
              <li>Share your account credentials with others</li>
              <li>Misuse the AI tutor (e.g., attempting prompt injection or generating inappropriate content)</li>
              <li>Copy, redistribute, or commercially exploit any course content</li>
              <li>Interfere with or disrupt the Service</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              All curriculum content, course materials, software, trademarks, and other intellectual property
              associated with the Service are owned by Veritas AI Solutions. Your subscription grants you a
              limited, non-exclusive, non-transferable license to access and use the content for personal
              educational purposes only.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. AI Tutor Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed">
              The AI Master Tutor is designed to assist learning using the Socratic method. While we strive
              for accuracy, AI-generated responses may occasionally contain errors. The AI tutor is a
              supplementary educational tool and does not replace professional instruction. We are not
              liable for decisions made based on AI-generated content.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              The Service is provided &quot;as is&quot; without warranties of any kind. To the maximum extent permitted
              by law, Veritas AI Solutions shall not be liable for any indirect, incidental, special, or
              consequential damages arising from your use of the Service. Our total liability shall not
              exceed the amount you paid for the Service in the twelve months preceding the claim.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Termination</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to suspend or terminate your account if you violate these Terms.
              You may cancel your subscription at any time. Upon termination, your access to course
              content and student data will be discontinued in accordance with our data retention policy.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update these Terms from time to time. We will notify you of material changes via
              email or through the Service. Continued use after changes constitutes acceptance of the
              updated Terms.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">11. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about these Terms, contact us at{' '}
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
