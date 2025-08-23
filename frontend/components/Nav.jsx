import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg text-white">ClarityAI</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/chat" className="hover:text-brand-light">Chat</Link>
          <Link href="/mood" className="hover:text-brand-light">Mood</Link>
          <Link href="/journal" className="hover:text-brand-light">Journal</Link>
          <Link href="/resources" className="hover:text-brand-light">Resources</Link>
          <Link href="/profile" className="hover:text-brand-light">Profile</Link>
        </div>
      </div>
    </nav>
  );
}



