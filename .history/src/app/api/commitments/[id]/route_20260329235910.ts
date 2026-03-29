import { NextResponse } from 'next/server';
import { commitmentsById } from '@/lib/commitments';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const commitment = commitmentsById.get(id);

  if (!commitment) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(commitment);
}
