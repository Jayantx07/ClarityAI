import { useState } from 'react';
import { Layout, Navbar } from '../components/layout';
import { Button, Card } from '../components/ui';
import BreathingExercise from '../components/BreathingExercise';
import PaintingCanvas from '../components/PaintingCanvas';

export default function WellnessHubPage() {
  const [breathingActive, setBreathingActive] = useState(false);
  const [paintingActive, setPaintingActive] = useState(false);

  // TODO: Affirmations may be AI-generated or curated and stored in Firestore
  const [affirmations] = useState([
    'I am safe. I am grounded. I can take one small step.',
    'My feelings matter, and I am allowed to rest.',
    'I am learning to be kinder to myself every day.'
  ]);

  return (
    <Layout>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        <h2 className="text-2xl font-semibold">Wellness Hub</h2>

        {/* Guided Breathing */}
        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Guided Breathing</div>
              <div className="text-sm text-white/70">Regulate your breath with a 4-4-6 cycle to calm the nervous system.</div>
            </div>
            <Button onClick={() => setBreathingActive(true)}>Start</Button>
          </div>
        </Card>

        {/* Journaling Quick Access */}
        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Journaling</div>
              <div className="text-sm text-white/70">Reflect on your thoughts with gentle prompts.</div>
            </div>
            <Button onClick={() => window.location.href = '/journal'}>Open Journal</Button>
          </div>
        </Card>

        {/* Creative Expression */}
        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Creative Expression</div>
              <div className="text-sm text-white/70">Express through color and motion on a digital canvas.</div>
            </div>
            <Button onClick={() => setPaintingActive(true)}>Open Canvas</Button>
          </div>
        </Card>

        {/* Daily Affirmations */}
        <Card>
          <div className="font-semibold mb-2">Daily Affirmations</div>
          {/* TODO: These cards should be AI-generated or fetched from Firestore */}
          <div className="grid md:grid-cols-3 gap-3">
            {affirmations.map((a, idx) => (
              <div key={idx} className="p-3 bg-white/5 rounded-lg border border-white/10 text-sm">
                {a}
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* Modals */}
      <BreathingExercise isActive={breathingActive} onComplete={() => setBreathingActive(false)} />
      <PaintingCanvas isActive={paintingActive} onClose={() => setPaintingActive(false)} />
    </Layout>
  );
}
