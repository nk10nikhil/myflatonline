import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { authMiddleware } from '@/lib/auth';
import { createOrder, getSubscriptionPrice } from '@/lib/razorpay';
import { UserRole } from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const auth = await authMiddleware(req);
    
    if (auth instanceof NextResponse) {
      return auth;
    }
    
    await connectDB();
    
    const { subscriptionType } = await req.json();
    
    // Validate subscription type
    if (!Object.values(UserRole).includes(subscriptionType as UserRole) || 
        subscriptionType === UserRole.ADMIN) {
      return NextResponse.json(
        { success: false, message: 'Invalid subscription type' },
        { status: 400 }
      );
    }
    
    // Get subscription price
    const amount = getSubscriptionPrice(subscriptionType as UserRole);
    
    if (amount === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid subscription type' },
        { status: 400 }
      );
    }
    
    // Create Razorpay order
    const result = await createOrder(
      amount,
      'INR',
      `subscription_${auth.userId}_${Date.now()}`,
      {
        userId: auth.userId,
        subscriptionType,
      }
    );
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Failed to create order' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      order: result.order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
