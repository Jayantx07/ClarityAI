import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, Navbar } from '../components/layout';
import { Button } from '../components/ui';
import { getFirebase } from '../lib/firebaseClient';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const { auth } = getFirebase();

  const googleProvider = useMemo(() => auth ? new GoogleAuthProvider() : null, [auth]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    if (!auth) {
      setError('Auth is not configured. Add Firebase env vars to enable login.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/profile');
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    if (!auth || !googleProvider) {
      setError('Auth is not configured.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/profile');
    } catch (err) {
      setError(err.message || 'Failed to login with Google');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Navbar />
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#110d2a] via-[#1d1649] to-[#1c9fb4] opacity-90" />
        <div className="absolute -top-36 -left-24 h-[420px] w-[420px] rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-[360px] w-[360px] rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-md px-6 pt-24 pb-16">
          <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl p-8 shadow-2xl">
            <h1 className="text-white text-2xl font-extrabold mb-2">Welcome back</h1>
            <p className="text-white/70 mb-6">Log in to continue your wellness journey.</p>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/15 border border-red-500/30 text-red-200 px-3 py-2 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-white/80 text-sm">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm">Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPw ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 pr-12"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={()=>setShowPw(s=>!s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 text-sm cursor-pointer">
                    {showPw ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-white text-black font-semibold py-3 shadow cursor-pointer hover:shadow-md disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>

              <div className="flex items-center gap-3 my-2">
                <div className="h-px bg-white/15 flex-1" />
                <span className="text-white/50 text-xs">or</span>
                <div className="h-px bg-white/15 flex-1" />
              </div>

              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="w-full rounded-xl bg-white/10 text-white font-semibold py-3 border border-white/20 cursor-pointer hover:bg-white/15 disabled:opacity-60"
              >
                Continue with Google
              </button>

              <p className="text-white/70 text-sm mt-4 text-center">
                Don’t have an account?{' '}
                <Link href="/signup" className="underline">Create one</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
