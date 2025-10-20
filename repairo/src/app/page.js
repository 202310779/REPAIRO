import Link from 'next/link';

export default function Home() {
  // Simple redirect link to Landing while keeping root accessible.
  return (
    <main style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',flexDirection:'column',gap:12}}>
      <h1>Repairo</h1>
      <p>Welcome. Continue to the landing page.</p>
      <Link href="/landing">Go to Landing</Link>
    </main>
  );
}
