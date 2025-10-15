// Script to remove confusing_topics column from users table
const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function removeConfusingTopicsColumn() {
  console.log('Removing confusing_topics column from users table...')

  try {
    // Execute raw SQL to drop the column
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE users DROP COLUMN IF EXISTS confusing_topics;'
    })

    if (error) {
      // Try alternative method using pg connection
      console.log('RPC method not available, trying direct SQL execution...')

      // Alternative: Use Supabase SQL editor or direct connection
      console.log('\nPlease run this SQL command manually in your Supabase SQL Editor:')
      console.log('ALTER TABLE users DROP COLUMN IF EXISTS confusing_topics;')
      console.log('\nOr use the Supabase dashboard:')
      console.log('1. Go to: https://supabase.com/dashboard/project/xsspkwwuwoazeodlwywo/editor')
      console.log('2. Click on SQL Editor')
      console.log('3. Run the command above')

      process.exit(0)
    }

    console.log('✅ Successfully removed confusing_topics column!')
    console.log('Migration complete.')
  } catch (err) {
    console.error('Error:', err.message)
    console.log('\n⚠️  Manual migration required!')
    console.log('Please run this SQL command in Supabase SQL Editor:')
    console.log('ALTER TABLE users DROP COLUMN IF EXISTS confusing_topics;')
    process.exit(1)
  }
}

removeConfusingTopicsColumn()
