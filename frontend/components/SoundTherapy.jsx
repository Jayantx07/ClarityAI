import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';

export default function SoundTherapy({ isActive, frequency = 'alpha' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  const frequencies = {
    alpha: { freq: 10, color: '#6C63FF', name: 'Alpha (Focus)' },
    theta: { freq: 6, color: '#4C46CC', name: 'Theta (Calm)' },
    delta: { freq: 2, color: '#8E89FF', name: 'Delta (Deep Sleep)' },
    beta: { freq: 20, color: '#FF6B6B', name: 'Beta (Alert)' }
  };

  useEffect(() => {
    if (isActive && !isPlaying) {
      startSound();
    } else if (!isActive && isPlaying) {
      stopSound();
    }
  }, [isActive]);

  useEffect(() => {
    if (isPlaying && gainNodeRef.current) {
      gainNodeRef.current.volume.value = Tone.gainToDb(volume);
    }
  }, [volume, isPlaying]);

  const startSound = async () => {
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }

    const currentFreq = frequencies[frequency];
    
    // Create oscillator for binaural beats
    oscillatorRef.current = new Tone.Oscillator({
      frequency: currentFreq.freq,
      type: 'sine'
    });

    // Create gain node for volume control
    gainNodeRef.current = new Tone.Gain(volume);

    // Create stereo panner for binaural effect
    const panner = new Tone.Panner(0.5);

    // Connect the audio graph
    oscillatorRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(panner);
    panner.toDestination();

    // Start the oscillator
    oscillatorRef.current.start();
    setIsPlaying(true);
  };

  const stopSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.dispose();
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.dispose();
      gainNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  if (!isActive) return null;

  const currentFreq = frequencies[frequency];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8 max-w-md mx-4">
        <div 
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6"
          style={{ 
            backgroundColor: currentFreq.color + '20',
            border: `2px solid ${currentFreq.color}60`
          }}
        >
          <div className="text-white text-lg font-semibold">
            {currentFreq.freq}Hz
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">
          {currentFreq.name}
        </h3>
        
        <div className="mb-6">
          <label className="block text-white/80 text-sm mb-2">
            Volume: {Math.round(volume * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${currentFreq.color} 0%, ${currentFreq.color} ${volume * 200}%, rgba(255,255,255,0.2) ${volume * 200}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={isPlaying ? stopSound : startSound}
            className="px-6 py-2 rounded-lg transition text-white font-medium"
            style={{
              backgroundColor: isPlaying ? '#FF6B6B' : currentFreq.color
            }}
          >
            {isPlaying ? 'Stop' : 'Play'}
          </button>
          
          <button
            onClick={() => setIsActive(false)}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-white"
          >
            Close
          </button>
        </div>

        <p className="text-white/60 text-sm mt-4">
          Use headphones for best binaural beat experience
        </p>
      </div>
    </div>
  );
}
