/**
 * Email templates for The Gospel Academy.
 * Returns HTML strings for use with Resend.
 */

const HEADER = `
<div style="background-color: #1E1B4B; padding: 32px 24px; text-align: center;">
  <h1 style="color: white; font-family: Georgia, serif; font-size: 24px; margin: 0; letter-spacing: 1px;">
    THE GOSPEL ACADEMY
  </h1>
</div>`

const FOOTER = `
<div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
  <p style="color: #9ca3af; font-size: 12px; margin: 0;">
    The Gospel Academy &mdash; Christ-centered education powered by AI
  </p>
  <p style="color: #9ca3af; font-size: 12px; margin: 8px 0 0 0;">
    <a href="https://thegospelacademy.com" style="color: #6366f1;">thegospelacademy.com</a>
  </p>
</div>`

function wrap(body: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; margin-top: 24px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    ${HEADER}
    <div style="padding: 32px 24px;">
      ${body}
    </div>
    ${FOOTER}
  </div>
</body>
</html>`
}

// ─── Welcome Email ───────────────────────────────────────────────────────────

export function welcomeEmail(params: {
  parentName: string
  studentName: string
  courseName: string
  pathway: string
}): { subject: string; html: string } {
  const pathwayLabel =
    params.pathway === 'ADVANCED' ? 'Advanced Scholars' :
    params.pathway === 'VOCATIONAL' ? 'Vocational' : 'Standard Academic'

  return {
    subject: `Welcome to The Gospel Academy, ${params.parentName}!`,
    html: wrap(`
      <h2 style="color: #111827; font-size: 20px; margin: 0 0 16px 0;">Welcome to The Gospel Academy!</h2>
      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
        Dear ${params.parentName},
      </p>
      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
        Thank you for enrolling <strong>${params.studentName}</strong> in The Gospel Academy. We're thrilled to have your family join our community of learners.
      </p>
      <div style="background-color: #f0f9ff; border-left: 4px solid #4F46E5; padding: 16px; border-radius: 0 8px 8px 0; margin: 24px 0;">
        <p style="color: #1e3a5f; font-size: 14px; margin: 0 0 8px 0;"><strong>Enrollment Details:</strong></p>
        <p style="color: #374151; font-size: 14px; margin: 0;">Course: <strong>${params.courseName}</strong></p>
        <p style="color: #374151; font-size: 14px; margin: 4px 0 0 0;">Pathway: <strong>${pathwayLabel}</strong></p>
      </div>
      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
        Your student can begin learning right away. Just have them log in to access their dashboard and start their first lesson.
      </p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="https://thegospelacademy.com/dashboard/student" style="display: inline-block; background-color: #4F46E5; color: white; font-weight: 600; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 15px;">
          Go to Student Dashboard
        </a>
      </div>
      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 8px 0;">
        If you have any questions, don't hesitate to reach out.
      </p>
      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0;">
        In Christ,<br />
        <strong>The Gospel Academy Team</strong>
      </p>
    `),
  }
}

// ─── Weekly Digest Email ─────────────────────────────────────────────────────

interface CourseProgressItem {
  courseName: string
  completedLessons: number
  totalLessons: number
}

interface RecentGradeItem {
  assessmentTitle: string
  score: number
  gradedAt: string
}

interface StudentDigest {
  studentName: string
  lessonsCompleted: number
  lessonsStarted: number
  courseProgress: CourseProgressItem[]
  recentGrades: RecentGradeItem[]
}

export function weeklyDigestEmail(params: {
  parentName: string
  students: StudentDigest[]
}): { subject: string; html: string } {
  const studentSections = params.students.map((s) => {
    const progressRows = s.courseProgress
      .map((cp) => {
        const pct = cp.totalLessons > 0 ? Math.round((cp.completedLessons / cp.totalLessons) * 100) : 0
        return `
        <tr>
          <td style="padding: 8px 0; color: #374151; font-size: 14px;">${cp.courseName}</td>
          <td style="padding: 8px 0; width: 140px;">
            <div style="background-color: #e5e7eb; border-radius: 9999px; height: 8px; overflow: hidden;">
              <div style="background-color: #4F46E5; height: 100%; width: ${pct}%; border-radius: 9999px;"></div>
            </div>
          </td>
          <td style="padding: 8px 0 8px 12px; color: #6b7280; font-size: 13px; white-space: nowrap;">${cp.completedLessons}/${cp.totalLessons}</td>
        </tr>`
      })
      .join('')

    const gradeRows = s.recentGrades.length > 0
      ? s.recentGrades
          .map(
            (g) => `
        <tr>
          <td style="padding: 6px 0; color: #374151; font-size: 14px;">${g.assessmentTitle}</td>
          <td style="padding: 6px 0; color: #374151; font-size: 14px; text-align: right; font-weight: 600;">${g.score}%</td>
        </tr>`
          )
          .join('')
      : ''

    const gradesSection = gradeRows
      ? `
      <p style="color: #111827; font-size: 14px; font-weight: 600; margin: 16px 0 8px 0;">Recent Grades</p>
      <table style="width: 100%; border-collapse: collapse;">${gradeRows}</table>`
      : ''

    return `
    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 16px 0;">
      <h3 style="color: #111827; font-size: 16px; margin: 0 0 4px 0;">${s.studentName}</h3>
      <p style="color: #6b7280; font-size: 13px; margin: 0 0 16px 0;">
        ${s.lessonsCompleted} lesson${s.lessonsCompleted !== 1 ? 's' : ''} completed this week
        ${s.lessonsStarted > 0 ? ` &middot; ${s.lessonsStarted} in progress` : ''}
      </p>
      ${s.courseProgress.length > 0 ? `
      <p style="color: #111827; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">Course Progress</p>
      <table style="width: 100%; border-collapse: collapse;">${progressRows}</table>` : ''}
      ${gradesSection}
    </div>`
  }).join('')

  return {
    subject: `Weekly Progress Report — The Gospel Academy`,
    html: wrap(`
      <h2 style="color: #111827; font-size: 20px; margin: 0 0 16px 0;">Weekly Progress Report</h2>
      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
        Dear ${params.parentName},
      </p>
      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
        Here&rsquo;s a summary of your student${params.students.length > 1 ? 's&rsquo;' : '&rsquo;s'} activity this past week.
      </p>
      ${studentSections}
      <div style="text-align: center; margin: 32px 0;">
        <a href="https://thegospelacademy.com/dashboard/parent" style="display: inline-block; background-color: #4F46E5; color: white; font-weight: 600; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 15px;">
          View Dashboard
        </a>
      </div>
      <p style="color: #6b7280; font-size: 13px; font-style: italic; margin: 24px 0 0 0;">
        &ldquo;Train up a child in the way he should go; even when he is old he will not depart from it.&rdquo; &mdash; Proverbs 22:6
      </p>
    `),
  }
}

// ─── Course Completion Email ─────────────────────────────────────────────────

export function courseCompletionEmail(params: {
  parentName: string
  studentName: string
  courseName: string
  letterGrade: string
  score: number
}): { subject: string; html: string } {
  return {
    subject: `${params.studentName} completed ${params.courseName}!`,
    html: wrap(`
      <h2 style="color: #111827; font-size: 20px; margin: 0 0 16px 0;">Course Completed!</h2>
      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
        Dear ${params.parentName},
      </p>
      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
        Great news! <strong>${params.studentName}</strong> has successfully completed <strong>${params.courseName}</strong>.
      </p>
      <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; border-radius: 0 8px 8px 0; margin: 24px 0; text-align: center;">
        <p style="color: #166534; font-size: 14px; margin: 0 0 8px 0;"><strong>Final Results</strong></p>
        <p style="color: #166534; font-size: 32px; font-weight: bold; margin: 0;">
          ${params.letterGrade} (${params.score}%)
        </p>
      </div>
      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
        A certificate of completion is available for download from the student dashboard.
      </p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="https://thegospelacademy.com/dashboard/parent" style="display: inline-block; background-color: #22c55e; color: white; font-weight: 600; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 15px;">
          View on Parent Dashboard
        </a>
      </div>
      <p style="color: #6b7280; font-size: 13px; font-style: italic; margin: 24px 0 0 0;">
        &ldquo;The fear of the LORD is the beginning of knowledge, but fools despise wisdom and instruction.&rdquo; &mdash; Proverbs 1:7
      </p>
    `),
  }
}
