import { NextRequest, NextResponse } from 'next/server';
import { queryAIEngine } from '@/lib/ai-engine';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message content is required.' },
        { status: 400 }
      );
    }

    const aiResult = queryAIEngine(message);

    return NextResponse.json({
      success: true,
      content: aiResult.responseText,
      action: aiResult.action,
      suggestedPrompts: aiResult.suggestedPrompts,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing the request.' },
      { status: 500 }
    );
  }
}
