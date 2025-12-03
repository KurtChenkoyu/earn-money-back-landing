import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

/**
 * Stripe Webhook Handler
 * 
 * Handles payment events from Stripe
 * POST /api/webhooks/stripe
 */
export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    )
  }

  // Handle different event types
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Payment successful - update database
        // TODO: Integrate with your backend API
        // - Credit points_accounts
        // - Create points_transaction
        // - Send confirmation email
        
        console.log('Payment successful:', {
          sessionId: session.id,
          amount: session.amount_total,
          metadata: session.metadata,
        })
        
        // Call backend API to update database
        const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
        try {
          await fetch(`${backendUrl}/api/deposits/confirm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              session_id: session.id,
              child_id: session.metadata?.child_id,
              user_id: session.metadata?.user_id,
              amount: session.amount_total! / 100,
            }),
          })
        } catch (error) {
          console.error('Failed to confirm deposit in backend:', error)
          // Don't fail the webhook - we can retry later
        }
        
        break
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment intent succeeded:', paymentIntent.id)
        break
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error('Payment failed:', paymentIntent.id)
        // TODO: Notify user of payment failure
        break
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Disable body parsing for webhooks (Stripe needs raw body)
export const runtime = 'nodejs'

