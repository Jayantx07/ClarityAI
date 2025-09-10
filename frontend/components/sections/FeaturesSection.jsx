import { useState } from 'react';
import { Button, Card, AnimatedButton, BgVideo } from '../ui';
import BreathingExercise from '../BreathingExercise';
import SoundTherapy from '../SoundTherapy';

export default function FeaturesSection() {
  const [breathingActive, setBreathingActive] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [soundFrequency, setSoundFrequency] = useState('alpha');

  return (
    <div className="relative">
      <BgVideo />

      {/* SCROLLER SECTION 1 */}
      <section className="section mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div className="reveal">
          <h2 className="text-3xl md:text-5xl font-bold">Sentiment-aware conversations</h2>
          <p className="mt-4 text-white/80">
            Detects stress, anxiety, restlessness, or positivity and adapts responses — empathetic, motivational,
            or uplifting — recommending the most relevant activity in real time.
          </p>
          <div className="mt-6 flex gap-3">
            <AnimatedButton href="/chat">Try the Chatbot</AnimatedButton>
            <Button href="/journal" variant="secondary">Open Journal</Button>
          </div>
        </div>
        <Card className="reveal">
          <div className="aspect-[4/3] w-full rounded-lg bg-white/5" />
        </Card>
      </section>

      {/* SCROLLER SECTION 2 */}
      <section className="section mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <Card className="reveal order-2 md:order-1">
          <div className="aspect-[4/3] w-full rounded-lg bg-white/5" />
        </Card>
        <div className="reveal order-1 md:order-2">
          <h2 className="text-3xl md:text-5xl font-bold">Sound therapy & breathing</h2>
          <p className="mt-4 text-white/80">
            Adaptive soundscapes (alpha for focus, theta for calm) and visual inhale–exhale sequences help
            you regulate in the moment, triggered when the chatbot senses rising stress.
          </p>
          <div className="mt-6 flex gap-3">
            <AnimatedButton onClick={() => setBreathingActive(true)}>
              Start Breathing
            </AnimatedButton>
            <Button 
              onClick={() => {
                setSoundFrequency('theta');
                setSoundActive(true);
              }}
              variant="secondary"
            >
              Try Sound Therapy
            </Button>
          </div>
        </div>
      </section>

      {/* PRINCIPLES GRID */}
      <section className="section mx-auto max-w-6xl px-4 py-24">
        <h3 className="text-center text-sm tracking-widest text-white/60">WHY CLARITYAI STANDS OUT</h3>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'Emotionally adaptive, not static',
            'AI + creativity + wellness in one',
            'Accessible for students & professionals',
            'Personal mood analytics over time',
            'Guided activities that meet your state',
            'Safe, empathetic companion 24/7'
            ].map((title, idx) => (
              <Card key={idx} className="reveal h-full">
                <div className="text-lg font-semibold">{title}</div>
                <p className="mt-2 text-sm text-white/75">
                  Built to understand you in real-time and guide you with gentle, effective practices.
                </p>
              </Card>
            ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section mx-auto max-w-4xl px-4 pb-28 text-center">
        <h4 className="reveal text-2xl md:text-4xl font-bold">Begin your journey</h4>
        <p className="reveal mt-4 text-white/80">Step into a calmer, clearer you — one breath at a time.</p>
        <div className="reveal mt-6 flex items-center justify-center gap-4">
          <AnimatedButton href="/chat">Start Now</AnimatedButton>
          <Button href="/resources" variant="secondary">See Resources</Button>
        </div>
      </section>

      {/* Wellness Components */}
      <BreathingExercise 
        isActive={breathingActive} 
        onComplete={() => setBreathingActive(false)} 
      />
      <SoundTherapy 
        isActive={soundActive} 
        frequency={soundFrequency}
        onClose={() => setSoundActive(false)}
      />
    </div>
  );
}
