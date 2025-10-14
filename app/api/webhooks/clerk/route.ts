// @ts-nocheck - Supabase type inference has issues with service role client
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase/client'

export async function POST(req: Request) {
  // Get the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET environment variable')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = (await headerPayload).get('svix-id')
  const svix_timestamp = (await headerPayload).get('svix-timestamp')
  const svix_signature = (await headerPayload).get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response(JSON.stringify({
      error: 'Missing svix headers',
      message: 'This endpoint requires svix headers from Clerk. Please test using Clerk Dashboard.',
      received_headers: {
        'svix-id': svix_id || 'missing',
        'svix-timestamp': svix_timestamp || 'missing',
        'svix-signature': svix_signature || 'missing'
      }
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error: Verification failed', {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type
  const supabase = createServerClient()

  try {
    switch (eventType) {
      case 'user.created': {
        // Create user in Supabase when they sign up in Clerk
        const { id, email_addresses, first_name, last_name } = evt.data

        const { error } = await supabase.from('users').insert({
          clerk_id: id,
          email: email_addresses[0]?.email_address || '',
          first_name: first_name || null,
          last_name: last_name || null,
          subscription_tier: 'FREE',
          onboarding_completed: false,
        } as any)

        if (error) {
          console.error('Error creating user in Supabase:', error)
          return new Response('Error creating user', { status: 500 })
        }

        console.log('✅ User created in Supabase:', id)
        break
      }

      case 'user.updated': {
        // Update user in Supabase when they update their profile in Clerk
        const { id, email_addresses, first_name, last_name } = evt.data

        const { error } = await supabase
          .from('users')
          .update({
            email: email_addresses[0]?.email_address || '',
            first_name: first_name || null,
            last_name: last_name || null,
          } as any)
          .eq('clerk_id', id)

        if (error) {
          console.error('Error updating user in Supabase:', error)
          return new Response('Error updating user', { status: 500 })
        }

        console.log('✅ User updated in Supabase:', id)
        break
      }

      case 'user.deleted': {
        // Delete user from Supabase when they delete their account
        const { id } = evt.data

        if (!id) {
          return new Response('Error: No user ID provided', { status: 400 })
        }

        const { error } = await supabase
          .from('users')
          .delete()
          .eq('clerk_id', id)

        if (error) {
          console.error('Error deleting user from Supabase:', error)
          return new Response('Error deleting user', { status: 500 })
        }

        console.log('✅ User deleted from Supabase:', id)
        break
      }

      default:
        console.log(`Unhandled webhook event: ${eventType}`)
    }

    return new Response('Webhook processed successfully', { status: 200 })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response('Error processing webhook', { status: 500 })
  }
}
