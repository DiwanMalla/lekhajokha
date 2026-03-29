import { NextResponse } from 'next/server';
import { categoryList } from '@/lib/commitments';
import { sampleCommitments } from '@/lib/sample-data';

export async function GET() {
  const payload = categoryList.map((category) => {
    const rows = sampleCommitments.filter((item) => item.category_id === category.id);
    const completed = rows.filter((item) => item.status === 'completed').length;
    const inProgress = rows.filter((item) => item.status === 'in_progress').length;
    const score = Math.round(((completed + inProgress * 0.5) / Math.max(rows.length, 1)) * 100);

    return {
      ...category,
      total: rows.length,
      completed,
      inProgress,
      score,
    };
  });

  return NextResponse.json(payload);
}
