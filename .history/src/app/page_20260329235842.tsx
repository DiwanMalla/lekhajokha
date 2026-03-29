"use client";

import Hero from '@/components/Hero';
import StatsDashboard from '@/components/StatsDashboard';
import CommitmentList from '@/components/CommitmentList';
import CategoryProgress from '@/components/CategoryProgress';
import Methodology from '@/components/Methodology';

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-20">
      <Hero />
      <StatsDashboard />
      <CommitmentList />
      <CategoryProgress />
      <Methodology />
    </div>
  );
}
