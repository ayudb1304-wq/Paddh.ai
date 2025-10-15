// Test Database Connection Script
// Run with: node test-db-connection.js

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function testConnection() {
  try {
    console.log('Testing database connection...')
    console.log('Using DATABASE_URL from .env file')
    console.log('')

    // Try to connect
    await prisma.$connect()
    console.log('✅ Database connection successful!')

    // Try a simple query
    const result = await prisma.$queryRaw`SELECT current_database(), current_user, version()`
    console.log('✅ Query successful!')
    console.log('Database info:', result)

  } catch (error) {
    console.error('❌ Database connection failed!')
    console.error('Error:', error.message)
    console.error('')
    console.error('Common fixes:')
    console.error('1. Check your DATABASE_URL in .env file')
    console.error('2. Make sure password is correct (no special characters unencoded)')
    console.error('3. Verify the connection string format from Supabase dashboard')
    console.error('4. Check if your Supabase project is active')
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
