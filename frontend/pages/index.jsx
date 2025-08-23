import Link from 'next/link';
import Nav from '../components/Nav';

export default function Home() {
  return (
    <div>
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold">Your safe digital space</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            ClarityAI empowers you with an empathetic AI companion, mood tracking, journaling assistance,
            guided micro-activities, curated resources, and gentle gamification.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/chat" className="btn-primary">Start Chat</Link>
            <Link href="/mood" className="card">Log Mood</Link>
          </div>
        </section>
      </main>
    </div>
  );
}

