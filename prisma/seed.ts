import { PrismaClient, ExamType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Seed UPSC exam
  const upsc = await prisma.exam.upsert({
    where: { type: ExamType.UPSC },
    update: {},
    create: {
      type: ExamType.UPSC,
      name: 'Union Public Service Commission (UPSC)',
      description: 'Civil Services Examination for IAS, IPS, IFS, and other central services',
      subjects: {
        create: [
          {
            name: 'History',
            description: 'Ancient, Medieval, and Modern Indian History',
            weightage: 150,
            topics: {
              create: [
                { name: 'Ancient Indian History', description: 'Indus Valley to Gupta Period' },
                { name: 'Medieval Indian History', description: 'Delhi Sultanate to Mughals' },
                { name: 'Modern Indian History', description: 'British Rule to Independence' },
                { name: 'World History', description: 'Major global events and movements' },
              ]
            }
          },
          {
            name: 'Geography',
            description: 'Physical, Economic, and Human Geography',
            weightage: 150,
            topics: {
              create: [
                { name: 'Physical Geography', description: 'Landforms, climate, and natural resources' },
                { name: 'Indian Geography', description: 'Physical and economic geography of India' },
                { name: 'World Geography', description: 'Continents, countries, and global patterns' },
              ]
            }
          },
          {
            name: 'Polity',
            description: 'Indian Constitution, Governance, and Political System',
            weightage: 150,
            topics: {
              create: [
                { name: 'Constitutional Framework', description: 'Fundamental rights, DPSP, and duties' },
                { name: 'Union and State Governments', description: 'Executive, legislature, and judiciary' },
                { name: 'Local Governance', description: 'Panchayati Raj and urban administration' },
              ]
            }
          },
          {
            name: 'Economy',
            description: 'Indian Economy and Economic Development',
            weightage: 150,
            topics: {
              create: [
                { name: 'Economic Planning', description: 'Five-year plans and NITI Aayog' },
                { name: 'Indian Economic Development', description: 'Sectors, reforms, and policies' },
                { name: 'Current Economic Issues', description: 'Budget, inflation, and global trade' },
              ]
            }
          },
          {
            name: 'Environment & Ecology',
            description: 'Environmental Science and Biodiversity',
            weightage: 100,
            topics: {
              create: [
                { name: 'Biodiversity', description: 'Ecosystems and conservation' },
                { name: 'Climate Change', description: 'Global warming and mitigation strategies' },
                { name: 'Environmental Laws', description: 'National and international policies' },
              ]
            }
          },
          {
            name: 'Science & Technology',
            description: 'General Science and Applied Technology',
            weightage: 100,
            topics: {
              create: [
                { name: 'Physics', description: 'Fundamental concepts and applications' },
                { name: 'Chemistry', description: 'Basic chemistry and everyday applications' },
                { name: 'Biology', description: 'Life sciences and health' },
                { name: 'Technology', description: 'IT, space, and defense technology' },
              ]
            }
          },
          {
            name: 'Current Affairs',
            description: 'National and International Events',
            weightage: 200,
            topics: {
              create: [
                { name: 'National Current Affairs', description: 'Indian politics, economy, and society' },
                { name: 'International Relations', description: 'Global politics and diplomacy' },
                { name: 'Science & Tech News', description: 'Recent developments in science' },
              ]
            }
          },
        ]
      }
    }
  })

  // Seed JEE exam
  const jee = await prisma.exam.upsert({
    where: { type: ExamType.JEE },
    update: {},
    create: {
      type: ExamType.JEE,
      name: 'Joint Entrance Examination (JEE)',
      description: 'Engineering entrance exam for IITs, NITs, and other engineering colleges',
      subjects: {
        create: [
          {
            name: 'Physics',
            description: 'Mechanics, Thermodynamics, and Modern Physics',
            weightage: 100,
            topics: {
              create: [
                { name: 'Mechanics', description: 'Kinematics, laws of motion, work-energy' },
                { name: 'Thermodynamics', description: 'Heat, temperature, and laws' },
                { name: 'Electromagnetism', description: 'Electric and magnetic fields' },
                { name: 'Optics', description: 'Reflection, refraction, and wave optics' },
                { name: 'Modern Physics', description: 'Atoms, nuclei, and semiconductors' },
              ]
            }
          },
          {
            name: 'Chemistry',
            description: 'Physical, Organic, and Inorganic Chemistry',
            weightage: 100,
            topics: {
              create: [
                { name: 'Physical Chemistry', description: 'Thermodynamics, equilibrium, and kinetics' },
                { name: 'Organic Chemistry', description: 'Hydrocarbons, reactions, and compounds' },
                { name: 'Inorganic Chemistry', description: 'Periodic table, coordination compounds' },
              ]
            }
          },
          {
            name: 'Mathematics',
            description: 'Algebra, Calculus, and Geometry',
            weightage: 100,
            topics: {
              create: [
                { name: 'Algebra', description: 'Equations, inequalities, and matrices' },
                { name: 'Calculus', description: 'Differentiation, integration, and applications' },
                { name: 'Coordinate Geometry', description: 'Lines, circles, and conic sections' },
                { name: 'Trigonometry', description: 'Ratios, identities, and equations' },
                { name: 'Vectors & 3D Geometry', description: 'Vector algebra and spatial geometry' },
              ]
            }
          },
        ]
      }
    }
  })

  // Seed NEET exam
  const neet = await prisma.exam.upsert({
    where: { type: ExamType.NEET },
    update: {},
    create: {
      type: ExamType.NEET,
      name: 'National Eligibility cum Entrance Test (NEET)',
      description: 'Medical entrance exam for MBBS, BDS, and other medical courses',
      subjects: {
        create: [
          {
            name: 'Physics',
            description: 'Fundamental Physics for Medical Students',
            weightage: 45,
            topics: {
              create: [
                { name: 'Mechanics', description: 'Motion, forces, and energy' },
                { name: 'Thermodynamics', description: 'Heat and thermal properties' },
                { name: 'Electrostatics & Current', description: 'Electric charge and circuits' },
                { name: 'Optics', description: 'Light and optical instruments' },
              ]
            }
          },
          {
            name: 'Chemistry',
            description: 'Physical, Organic, and Inorganic Chemistry',
            weightage: 45,
            topics: {
              create: [
                { name: 'Physical Chemistry', description: 'Solutions, equilibrium, and electrochemistry' },
                { name: 'Organic Chemistry', description: 'Organic compounds and biomolecules' },
                { name: 'Inorganic Chemistry', description: 'Chemical bonding and coordination' },
              ]
            }
          },
          {
            name: 'Biology',
            description: 'Botany and Zoology',
            weightage: 90,
            topics: {
              create: [
                { name: 'Diversity in Living World', description: 'Classification and taxonomy' },
                { name: 'Plant Physiology', description: 'Photosynthesis and plant nutrition' },
                { name: 'Human Physiology', description: 'Organ systems and functions' },
                { name: 'Genetics & Evolution', description: 'Heredity and molecular biology' },
                { name: 'Ecology', description: 'Ecosystems and environmental issues' },
              ]
            }
          },
        ]
      }
    }
  })

  console.log('Database seeded successfully!')
  console.log({ upsc, jee, neet })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
