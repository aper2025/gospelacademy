import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CertificateData {
  studentName: string
  courseTitle: string
  subject: string
  completionDate: string
  letterGrade: string
  overallScore: number
  units: {
    unitNumber: number
    title: string
    letterGrade: string
    score: number
  }[]
  /** If true, student completed 80%+ of SAT/ACT extension questions */
  satActChallengeBadge?: boolean
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  border: {
    border: '3pt solid #4F46E5',
    borderRadius: 8,
    padding: 30,
    flex: 1,
    position: 'relative',
  },
  innerBorder: {
    border: '1pt solid #C7D2FE',
    borderRadius: 4,
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 11,
    letterSpacing: 4,
    color: '#4F46E5',
    marginBottom: 6,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    color: '#1E1B4B',
    marginBottom: 20,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
  divider: {
    width: 120,
    height: 2,
    backgroundColor: '#4F46E5',
    marginBottom: 20,
  },
  preamble: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 6,
    textAlign: 'center',
  },
  studentName: {
    fontSize: 28,
    color: '#111827',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  courseLine: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 4,
    textAlign: 'center',
  },
  gradeBadge: {
    fontSize: 14,
    color: '#4F46E5',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dateLine: {
    fontSize: 9,
    color: '#9CA3AF',
    marginBottom: 16,
    textAlign: 'center',
  },
  unitTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    padding: 6,
    borderRadius: 3,
    marginBottom: 2,
  },
  unitTableRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottom: '0.5pt solid #E5E7EB',
  },
  unitNum: {
    width: 40,
    fontSize: 8,
    color: '#6B7280',
    textAlign: 'center',
  },
  unitTitle: {
    flex: 1,
    fontSize: 8,
    color: '#374151',
  },
  unitGrade: {
    width: 50,
    fontSize: 8,
    color: '#4F46E5',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },
  unitHeaderText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#4F46E5',
  },
  scripture: {
    fontSize: 8,
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginTop: 16,
    textAlign: 'center',
  },
  scriptureRef: {
    fontSize: 7,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 2,
  },
})

// ─── Certificate Document ────────────────────────────────────────────────────

export function CertificateDocument({ data }: { data: CertificateData }) {
  return (
    <Document>
      <Page size="LETTER" orientation="landscape" style={styles.page}>
        <View style={styles.border}>
          <View style={styles.innerBorder}>
            <Text style={styles.header}>THE GOSPEL ACADEMY</Text>
            <Text style={styles.title}>CERTIFICATE OF COMPLETION</Text>
            <View style={styles.divider} />

            <Text style={styles.preamble}>This certifies that</Text>
            <Text style={styles.studentName}>{data.studentName}</Text>

            <Text style={styles.courseLine}>
              has successfully completed the course
            </Text>
            <Text style={{ ...styles.courseLine, fontFamily: 'Helvetica-Bold', fontSize: 14, marginBottom: 6 }}>
              {data.courseTitle}
            </Text>
            <Text style={{ ...styles.courseLine, fontSize: 10, color: '#6B7280', marginBottom: 12 }}>
              {data.subject}
            </Text>

            <Text style={styles.gradeBadge}>
              Final Grade: {data.letterGrade} ({data.overallScore}%)
            </Text>

            <Text style={styles.dateLine}>
              Completed on {data.completionDate}
            </Text>

            {/* Unit Summary Table */}
            {data.units.length > 0 && (
              <View style={{ width: '80%', marginBottom: 12 }}>
                <View style={styles.unitTableHeader}>
                  <Text style={{ ...styles.unitHeaderText, width: 40, textAlign: 'center' }}>Unit</Text>
                  <Text style={{ ...styles.unitHeaderText, flex: 1 }}>Title</Text>
                  <Text style={{ ...styles.unitHeaderText, width: 50, textAlign: 'center' }}>Grade</Text>
                </View>
                {data.units.map((unit) => (
                  <View key={unit.unitNumber} style={styles.unitTableRow}>
                    <Text style={styles.unitNum}>{unit.unitNumber}</Text>
                    <Text style={styles.unitTitle}>{unit.title}</Text>
                    <Text style={styles.unitGrade}>{unit.letterGrade} ({unit.score}%)</Text>
                  </View>
                ))}
              </View>
            )}

            {data.satActChallengeBadge && (
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FEF3C7',
                borderRadius: 6,
                padding: 8,
                paddingLeft: 14,
                paddingRight: 14,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#F59E0B',
              }}>
                <Text style={{ fontSize: 12, marginRight: 6 }}>&#9733;</Text>
                <Text style={{
                  fontSize: 9,
                  fontFamily: 'Helvetica-Bold',
                  color: '#92400E',
                  letterSpacing: 1,
                }}>SAT/ACT CHALLENGE SCHOLAR</Text>
                <Text style={{ fontSize: 12, marginLeft: 6 }}>&#9733;</Text>
              </View>
            )}

            <Text style={styles.scripture}>
              &quot;The fear of the LORD is the beginning of knowledge, but fools despise wisdom and instruction.&quot;
            </Text>
            <Text style={styles.scriptureRef}>Proverbs 1:7</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
