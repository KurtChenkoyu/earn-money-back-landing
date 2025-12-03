import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

/**
 * Create Stripe Checkout Session for deposit
 * 
 * POST /api/deposits/create-checkout
 * Body: { amount: number, childId: string, userId: string }
 */
export async function POST(request: NextRequest) {
  try {
    const { amount, childId, userId } = await request.json()
    
    // Validate input
    if (!amount || amount < 500 || amount > 10000) {
      return NextResponse.json(
        { error: 'Amount must be between NT$500 and NT$10,000' },
        { status: 400 }
      )
    }
    
    if (!childId || !userId) {
      return NextResponse.json(
        { error: 'childId and userId are required' },
        { status: 400 }
      )
    }
    
    // Get origin for redirect URLs
    const origin = request.headers.get('origin') || 'http://localhost:3000'
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'twd',
            product_data: {
              name: 'LexiCraft Block Trust Package',
              description: 'Deposit for vocabulary learning rewards',
            },
            unit_amount: amount * 100, // Convert NT$ to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard?canceled=true`,
      metadata: {
        child_id: childId,
        user_id: userId,
        amount: amount.toString(),
      },
      // Taiwan-specific settings
      locale: 'zh-TW',
      payment_intent_data: {
        description: `LexiCraft deposit for child ${childId}`,
      },
    })

    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id 
    })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

