import React, { useState, useEffect, useRef } from 'react';
import { Mascot } from './Mascot';

interface LandingPageProps {
  onEnterGame: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterGame }) => {
  // 3D Parallax Tilt state
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  
  // Interactive Mascot Speech Bubble
  const [speech, setSpeech] = useState<string>("¡Hola! Soy Gargui. ¿Listo para convertirte en un mago de la gramática?");
  const [mascotMood, setMascotMood] = useState<'idle' | 'happy' | 'thinking' | 'celebrate'>('idle');
  
  // Audio state
  const [musicActive, setMusicActive] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicTimerRef = useRef<number | null>(null);

  // Motivational speech quotes
  const quotes = [
    "¡Hola! Soy Gargui. ¿Listo para convertirte en un mago de la gramática?",
    "Aprender un idioma es tener une fenêtre de plus pour regarder le monde. 🌍",
    "Chaque règle maîtrisée est un sortilège puissant contre le Boss de l'étage ! ⚡",
    "¿Sabías que el español es el segundo idioma más hablado del mundo? ¡Vamos! 🚀",
    "¡Ven con nosotros al Grimorio de la Gárgola y despierta tus poderes lingüísticos! 🏰",
    "Un pas après l'autre, votre gargouille se changera en puissant gardien de pierre ! 🛡️"
  ];

  // 1. Mouse Move 3D Tilt handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Calculate rotation angles (max 15 degrees)
    const rotateX = -(y / (box.height / 2)) * 12;
    const rotateY = (x / (box.width / 2)) * 12;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'transform 0.05s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s ease-out'
    });
  };

  // 2. Synthesize Sound Effect (Chime / Spell) using Web Audio API
  const playMagicChime = (ctx: AudioContext) => {
    const now = ctx.currentTime;
    // Play an arpeggio of 4 notes quickly
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);
      
      gain.gain.setValueAtTime(0.12, now + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.45);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.5);
    });
  };

  // Synthesize a gothic harp/lute note
  const playHarpNote = (ctx: AudioContext, freq: number, time: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);
    
    // Plucked string envelope
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.08, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);
    
    // Lowpass filter to make it sound warm like a wooden lute
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, time);
    filter.frequency.exponentialRampToValueAtTime(150, time + 0.8);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(time);
    osc.stop(time + 1.5);
  };

  // Start the background gothic melody loop
  const startMusic = (ctx: AudioContext) => {
    const Am = [220.00, 261.63, 329.63, 440.00]; // A3, C4, E4, A4
    const F  = [174.61, 261.63, 349.23, 440.00]; // F3, C4, F4, A4
    const Dm = [146.83, 293.66, 349.23, 440.00]; // D3, D4, F4, A4
    const E  = [164.81, 246.94, 329.63, 415.30]; // E3, B3, E4, G#4
    
    const chords = [Am, F, Dm, E];
    let chordIdx = 0;
    let noteIdx = 0;
    
    const scheduler = () => {
      const currentChord = chords[chordIdx];
      // Play note in arpeggio pattern
      const noteFreq = currentChord[noteIdx % currentChord.length];
      const now = ctx.currentTime;
      playHarpNote(ctx, noteFreq, now);
      
      noteIdx++;
      if (noteIdx % 8 === 0) {
        chordIdx = (chordIdx + 1) % chords.length;
      }
    };

    // Run scheduler every 250ms (120 BPM)
    const timer = window.setInterval(scheduler, 250);
    musicTimerRef.current = timer;
  };

  const stopMusic = () => {
    if (musicTimerRef.current !== null) {
      clearInterval(musicTimerRef.current);
      musicTimerRef.current = null;
    }
  };

  const handleToggleMusic = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    
    if (musicActive) {
      stopMusic();
      setMusicActive(false);
    } else {
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      playMagicChime(ctx);
      startMusic(ctx);
      setMusicActive(true);
    }
  };

  // Cleanup music on unmount
  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  const handleMascotClick = () => {
    if (audioCtxRef.current) {
      playMagicChime(audioCtxRef.current);
    }
    setMascotMood('celebrate');
    setTimeout(() => setMascotMood('idle'), 1200);
    
    // Choose random speech bubble quote
    const currentQuoteIndex = quotes.indexOf(speech);
    let nextQuoteIndex = Math.floor(Math.random() * quotes.length);
    while (nextQuoteIndex === currentQuoteIndex) {
      nextQuoteIndex = Math.floor(Math.random() * quotes.length);
    }
    setSpeech(quotes[nextQuoteIndex]);
  };

  const handleEnterClick = () => {
    if (audioCtxRef.current) {
      // Play a sword sweep slash sound effect procedurally
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(1500, now + 0.1);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.45);
      
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.55);
    }
    stopMusic();
    onEnterGame();
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden flex flex-col justify-between py-8 px-4 font-sans select-none">
      
      {/* 1. Background Magic Sparks & Floating Runes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="sparkle absolute top-[15%] left-[8%] text-2xl opacity-60">✨</div>
        <div className="sparkle absolute top-[40%] right-[10%] text-xl opacity-50" style={{ animationDelay: '0.4s' }}>✨</div>
        <div className="sparkle absolute bottom-[20%] left-[12%] text-3xl opacity-40" style={{ animationDelay: '0.8s' }}>🔮</div>
        <div className="sparkle absolute bottom-[35%] right-[15%] text-2xl opacity-50" style={{ animationDelay: '1.2s' }}>✨</div>
        
        {/* Floating Spanish accents */}
        <span className="absolute top-[25%] right-[25%] text-3xl font-black text-amber-500/20 animate-bounce" style={{ animationDuration: '3.5s' }}>ñ</span>
        <span className="absolute top-[60%] left-[20%] text-4xl font-black text-amber-500/25 animate-pulse">¿</span>
        <span className="absolute bottom-[40%] left-[8%] text-3xl font-black text-amber-500/15 animate-bounce" style={{ animationDuration: '4.2s' }}>í</span>
        <span className="absolute top-[10%] left-[40%] text-3xl font-black text-amber-500/15 animate-bounce" style={{ animationDuration: '2.8s' }}>ü</span>
        <span className="absolute bottom-[15%] right-[30%] text-4xl font-black text-amber-500/20 animate-pulse">é</span>
      </div>

      {/* 2. Top Bar with sound controls */}
      <header className="max-w-5xl w-full mx-auto flex justify-between items-center z-10 px-4">
        <div className="flex items-center gap-1.5">
          <span className="text-2xl">🏰</span>
          <span className="font-gothic font-black text-lg tracking-wider text-slate-800 font-semibold">Grimorio de la Gárgola</span>
        </div>
        <button
          onClick={handleToggleMusic}
          className="btn-3d bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-700 font-extrabold uppercase py-2 px-4 rounded-xl text-xs flex items-center gap-2"
          style={{ ['--btn-shadow' as string]: '#cbd5e1' }}
        >
          {musicActive ? '🔊 Musique : Actived' : '🔇 Musique : Off'}
        </button>
      </header>

      {/* 3. Main Hero Card + Interactive Mascot */}
      <main className="max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-10 z-10 my-auto">
        
        {/* Interactive 3D Parallax Card */}
        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={tiltStyle}
          className="w-full max-w-lg stone-panel p-5 sm:p-8 md:p-10 text-center space-y-6 cursor-pointer select-none transition-all duration-300 shadow-2xl relative group bg-white/95"
        >
          {/* Subtle outer shield shine */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-tr from-amber-500/0 via-amber-300/10 to-amber-500/0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-black text-gold-mirror font-gothic tracking-widest leading-none drop-shadow-md">
              EL GRIMORIO
            </h1>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-700 font-gothic tracking-widest">
              DE LA GÁRGOLA
            </h2>
          </div>

          <div className="h-0.5 bg-gradient-to-r from-transparent via-slate-350 to-transparent w-full my-4" />

          <p className="text-slate-600 text-base leading-relaxed font-semibold max-w-sm mx-auto">
            Pénétrez dans les salles sacrées du sanctuaire. Maîtrisez les incantations de la grammaire espagnole et détruisez les Inquisiteurs avec vos sortilèges !
          </p>

          <div className="pt-6">
            <button
              onClick={handleEnterClick}
              className="w-full sm:w-auto btn-3d bg-amber-500 hover:bg-amber-600 border-2 border-amber-600 text-white font-extrabold uppercase tracking-widest py-3.5 px-6 sm:px-10 rounded-2xl text-lg font-gothic animate-pulse group-hover:scale-105 transition-transform"
              style={{ ['--btn-shadow' as string]: '#d97706' }}
            >
              Ouvrir le grimoire ⚔️
            </button>
          </div>
        </div>

        {/* Mascot Widget side */}
        <div className="flex flex-col items-center max-w-xs text-center relative">
          
          {/* Speech bubble */}
          <div className="animate-bubble-in relative bg-white border-3 border-slate-300 rounded-2xl px-5 py-4 shadow-lg max-w-xs mb-5 z-20">
            <p className="font-extrabold text-slate-800 text-sm leading-relaxed">
              {speech}
            </p>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-3 border-b-3 border-slate-300 rotate-45" />
          </div>

          {/* Large Interactive Mascot */}
          <div 
            onClick={handleMascotClick}
            className="cursor-pointer group relative flex flex-col items-center"
            title="Cliquez sur Gargui !"
          >
            <div className="absolute -inset-4 bg-amber-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <Mascot 
              mood={mascotMood} 
              className="w-48 h-48 filter drop-shadow-xl transform group-hover:scale-105 active:scale-95 transition-all duration-300" 
            />
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider mt-3 block group-hover:text-amber-600 transition-colors">
              👉 Cliquez sur Gargui !
            </span>
          </div>
        </div>
      </main>

      {/* 4. Bottom Core Pillars Grid */}
      <footer className="max-w-5xl w-full mx-auto z-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white/70 backdrop-blur-xs border-2 border-slate-200/80 rounded-2xl p-5 hover:border-amber-400/60 transition-all duration-300 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚔️</span>
              <h3 className="font-black font-gothic text-slate-800 text-sm uppercase tracking-wide">Combats de Boss</h3>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-2 leading-relaxed">
              Affrontez les Inquisiteurs avec vos réponses sous forme de Cartes de Sortilèges. Surveillez vos PV et lancez vos attaques !
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-xs border-2 border-slate-200/80 rounded-2xl p-5 hover:border-amber-400/60 transition-all duration-300 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📜</span>
              <h3 className="font-black font-gothic text-slate-800 text-sm uppercase tracking-wide">Grimoire Magique</h3>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-2 leading-relaxed">
              Consultez les parchemins de théorie avant le combat pour régénérer votre Mana et redonner toutes ses forces à Gargui.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-xs border-2 border-slate-200/80 rounded-2xl p-5 hover:border-amber-400/60 transition-all duration-300 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏰</span>
              <h3 className="font-black font-gothic text-slate-800 text-sm uppercase tracking-wide">Mascotte Évolutive</h3>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-2 leading-relaxed">
              Gargui, la petite gargouille, réagit à vos erreurs et victoires avec des émotions et des animations fluides.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
};
