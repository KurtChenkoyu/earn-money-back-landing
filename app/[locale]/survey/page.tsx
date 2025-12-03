'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import SurveyEngine from '@/components/survey/SurveyEngine';

export default function SurveyPage() {
  const router = useRouter();

  const handleExit = () => {
    // Navigate back to home or dashboard after survey
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-gray-950">
      {/* We wrap the Engine in a distinct layout container 
        to ensure it takes full viewport height and centers correctly.
      */}
      <SurveyEngine 
        onExit={handleExit} 
      />
    </main>
  );
}

