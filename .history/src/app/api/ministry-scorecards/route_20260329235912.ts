import { NextResponse } from 'next/server';
import { ministryList } from '@/lib/commitments';
import { sampleCommitments } from '@/lib/sample-data';

export async function GET() {
  const scorecards = ministryList.map((ministry) => {
    const rows = sampleCommitments.filter((item) => item.responsible_ministry === ministry);
    const completed = rows.filter((item) => item.status === 'completed').length;
    const inProgress = rows.filter((item) => item.status === 'in_progress').length;
    const score = Math.round(((completed + inProgress * 0.5) / Math.max(rows.length, 1)) * 100);

    return {
      ministry,
      total: rows.length,
      completed,
      inProgress,
      score,
    };
  });

  return NextResponse.json(scorecards.sort((a, b) => b.score - a.score));
}
