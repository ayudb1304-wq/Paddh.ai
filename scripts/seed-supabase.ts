// Script to seed Supabase database with exam data
import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)

async function seedExams() {
  console.log('🌱 Seeding exam data...\n')

  // Insert exams
  const { data: exams, error: examError } = await supabase
    .from('exams')
    .insert([
      {
        name: 'UPSC',
        full_name: 'Union Public Service Commission',
        description: 'Civil Services Examination for IAS, IPS, IFS',
      },
      {
        name: 'JEE',
        full_name: 'Joint Entrance Examination',
        description: 'Engineering entrance for IITs, NITs, IIITs',
      },
      {
        name: 'NEET',
        full_name: 'National Eligibility cum Entrance Test',
        description: 'Medical entrance for MBBS, BDS',
      },
    ])
    .select()

  if (examError) {
    console.error('❌ Error seeding exams:', examError.message)
    return
  }

  console.log('✅ Exams seeded:', exams?.length)

  // Get exam IDs
  const upscExam = exams?.find((e) => e.name === 'UPSC')
  const jeeExam = exams?.find((e) => e.name === 'JEE')
  const neetExam = exams?.find((e) => e.name === 'NEET')

  if (!upscExam || !jeeExam || !neetExam) {
    console.error('❌ Could not find exam IDs')
    return
  }

  // Seed UPSC subjects
  const { data: upscSubjects } = await supabase
    .from('subjects')
    .insert([
      { exam_id: upscExam.id, name: 'History', weightage: 100 },
      { exam_id: upscExam.id, name: 'Geography', weightage: 100 },
      { exam_id: upscExam.id, name: 'Polity', weightage: 150 },
      { exam_id: upscExam.id, name: 'Economy', weightage: 100 },
      { exam_id: upscExam.id, name: 'Environment & Ecology', weightage: 75 },
      { exam_id: upscExam.id, name: 'Science & Technology', weightage: 75 },
      { exam_id: upscExam.id, name: 'Current Affairs', weightage: 100 },
    ])
    .select()

  console.log('✅ UPSC subjects seeded:', upscSubjects?.length)

  // Seed JEE subjects
  const { data: jeeSubjects } = await supabase
    .from('subjects')
    .insert([
      { exam_id: jeeExam.id, name: 'Physics', weightage: 100 },
      { exam_id: jeeExam.id, name: 'Chemistry', weightage: 100 },
      { exam_id: jeeExam.id, name: 'Mathematics', weightage: 100 },
    ])
    .select()

  console.log('✅ JEE subjects seeded:', jeeSubjects?.length)

  // Seed NEET subjects
  const { data: neetSubjects } = await supabase
    .from('subjects')
    .insert([
      { exam_id: neetExam.id, name: 'Physics', weightage: 45 },
      { exam_id: neetExam.id, name: 'Chemistry', weightage: 45 },
      { exam_id: neetExam.id, name: 'Biology', weightage: 90 },
    ])
    .select()

  console.log('✅ NEET subjects seeded:', neetSubjects?.length)

  // Seed topics for each subject
  if (upscSubjects) {
    // History topics
    const historySubject = upscSubjects.find((s) => s.name === 'History')
    if (historySubject) {
      await supabase.from('topics').insert([
        { subject_id: historySubject.id, name: 'Ancient India' },
        { subject_id: historySubject.id, name: 'Medieval India' },
        { subject_id: historySubject.id, name: 'Modern India' },
        { subject_id: historySubject.id, name: 'World History' },
      ])
    }

    // Geography topics
    const geoSubject = upscSubjects.find((s) => s.name === 'Geography')
    if (geoSubject) {
      await supabase.from('topics').insert([
        { subject_id: geoSubject.id, name: 'Physical Geography' },
        { subject_id: geoSubject.id, name: 'Indian Geography' },
        { subject_id: geoSubject.id, name: 'World Geography' },
        { subject_id: geoSubject.id, name: 'Economic Geography' },
      ])
    }

    // Polity topics
    const politySubject = upscSubjects.find((s) => s.name === 'Polity')
    if (politySubject) {
      await supabase.from('topics').insert([
        { subject_id: politySubject.id, name: 'Indian Constitution' },
        { subject_id: politySubject.id, name: 'Union Government' },
        { subject_id: politySubject.id, name: 'State Government' },
        { subject_id: politySubject.id, name: 'Local Governance' },
        { subject_id: politySubject.id, name: 'Fundamental Rights' },
      ])
    }

    console.log('✅ UPSC topics seeded')
  }

  if (jeeSubjects) {
    // Physics topics
    const physicsSubject = jeeSubjects.find((s) => s.name === 'Physics')
    if (physicsSubject) {
      await supabase.from('topics').insert([
        { subject_id: physicsSubject.id, name: 'Mechanics' },
        { subject_id: physicsSubject.id, name: 'Thermodynamics' },
        { subject_id: physicsSubject.id, name: 'Electromagnetism' },
        { subject_id: physicsSubject.id, name: 'Optics' },
        { subject_id: physicsSubject.id, name: 'Modern Physics' },
      ])
    }

    // Chemistry topics
    const chemSubject = jeeSubjects.find((s) => s.name === 'Chemistry')
    if (chemSubject) {
      await supabase.from('topics').insert([
        { subject_id: chemSubject.id, name: 'Physical Chemistry' },
        { subject_id: chemSubject.id, name: 'Organic Chemistry' },
        { subject_id: chemSubject.id, name: 'Inorganic Chemistry' },
      ])
    }

    // Mathematics topics
    const mathSubject = jeeSubjects.find((s) => s.name === 'Mathematics')
    if (mathSubject) {
      await supabase.from('topics').insert([
        { subject_id: mathSubject.id, name: 'Algebra' },
        { subject_id: mathSubject.id, name: 'Calculus' },
        { subject_id: mathSubject.id, name: 'Coordinate Geometry' },
        { subject_id: mathSubject.id, name: 'Trigonometry' },
        { subject_id: mathSubject.id, name: 'Vectors & 3D Geometry' },
      ])
    }

    console.log('✅ JEE topics seeded')
  }

  if (neetSubjects) {
    // Physics topics
    const physicsSubject = neetSubjects.find((s) => s.name === 'Physics')
    if (physicsSubject) {
      await supabase.from('topics').insert([
        { subject_id: physicsSubject.id, name: 'Mechanics' },
        { subject_id: physicsSubject.id, name: 'Thermodynamics' },
        { subject_id: physicsSubject.id, name: 'Electrostatics' },
        { subject_id: physicsSubject.id, name: 'Optics' },
      ])
    }

    // Chemistry topics
    const chemSubject = neetSubjects.find((s) => s.name === 'Chemistry')
    if (chemSubject) {
      await supabase.from('topics').insert([
        { subject_id: chemSubject.id, name: 'Physical Chemistry' },
        { subject_id: chemSubject.id, name: 'Organic Chemistry' },
        { subject_id: chemSubject.id, name: 'Inorganic Chemistry' },
      ])
    }

    // Biology topics
    const bioSubject = neetSubjects.find((s) => s.name === 'Biology')
    if (bioSubject) {
      await supabase.from('topics').insert([
        { subject_id: bioSubject.id, name: 'Diversity of Living Organisms' },
        { subject_id: bioSubject.id, name: 'Plant Physiology' },
        { subject_id: bioSubject.id, name: 'Human Physiology' },
        { subject_id: bioSubject.id, name: 'Genetics & Evolution' },
        { subject_id: bioSubject.id, name: 'Ecology & Environment' },
      ])
    }

    console.log('✅ NEET topics seeded')
  }

  console.log('\n🎉 Database seeding complete!')
  console.log('📊 Summary:')
  console.log(`   - Exams: 3 (UPSC, JEE, NEET)`)
  console.log(`   - Subjects: ${(upscSubjects?.length || 0) + (jeeSubjects?.length || 0) + (neetSubjects?.length || 0)}`)
  console.log(`   - Topics: Multiple per subject`)
}

seedExams()
  .then(() => {
    console.log('\n✅ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error:', error)
    process.exit(1)
  })
