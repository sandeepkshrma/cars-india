// /app/page.jsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /cars when the homepage is visited
    router.push('/cars');
  }, [router]);

  return null; // No need to render anything since we redirect
}
