import { NextResponse } from 'next/server';
import { removeTokenCookie } from '@/lib/auth';

export async function POST() {
  try {
    // Remove token cookie
    removeTokenCookie();
    
    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Error logging out:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
