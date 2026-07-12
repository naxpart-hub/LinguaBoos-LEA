import React, { useMemo, useState, useEffect } from 'react';
import type { LessonNode, LessonQuestion, Unit, UnitColor } from '../types';
import { checkQuestion, correctAnswerText, MAX_HEARTS } from '../services/gameLogic';
import { Mascot, MascotMood } from './Mascot';
import { TransparentImage } from './TransparentImage';
import { asset } from '../services/assets';

interface LessonViewProps {
  unit: Unit;
  node: LessonNode;
  hearts: number;
  onLoseHeart: () => number;
  onQuit: () => void;
  onComplete: (perfect: boolean) => void;
  onReviewTheory: () => void;
  onRefillHearts?: () => void;
  // Remédiation : signale chaque question ratée pour l'ajouter au deck de révision.
  onMistake?: (question: LessonQuestion) => void;
}

// Synthèse vocale espagnole (gratuite, intégrée au navigateur) pour les dictées.
const speakSpanish = (text: string, rate = 0.9) => {
  try {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'es-ES';
    utter.rate = rate;
    const esVoice = window.speechSynthesis
      .getVoices()
      .find(v => v.lang.toLowerCase().startsWith('es'));
    if (esVoice) utter.voice = esVoice;
    window.speechSynthesis.speak(utter);
  } catch {
    // Synthèse indisponible : l'élève peut afficher le texte en secours.
  }
};

type Phase = 'answering' | 'correct' | 'incorrect' | 'finished' | 'failed';

const praise = ['Incinération !', 'Impact direct !', 'Sortilège parfait !', 'Explosion magique !', 'Foudroiement !', 'Parade magique !'];

const CONFETTI_COLORS = ['#38bdf8', '#0ea5e9', '#0284c7', '#ffc800', '#f59e0b', '#22c55e'];

const Confetti: React.FC = () => {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        duration: 2.2 + Math.random() * 1.8,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotate: Math.random() * 360,
      })),
    []
  );
  return (
    <>
      {pieces.map((p, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${p.left}vw`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </>
  );
};

const questionTitle = (q: LessonQuestion): string => {
  switch (q.kind) {
    case 'mc': return 'Choisissez la bonne incantation';
    case 'fill': return 'Complétez la formule magique';
    case 'accent': return 'Rétablissez l\'accent gothique';
    case 'classify': return 'Classifiez les ingrédients';
    case 'translate': return 'Traduisez la prophétie';
    case 'order': return 'Reconstituez le sortilège';
    case 'match': return 'Reliez les runes jumelles';
    case 'listen': return 'Écoutez la voix du château';
  }
};

// Procedural audio synthesizer using the Web Audio API
const playRpgSound = (type: 'hover' | 'click' | 'roll' | 'hit_boss' | 'hit_player' | 'crit' | 'heal' | 'victory' | 'defeat') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;
    
    if (type === 'hover') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.08);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    }
    else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.07);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    }
    else if (type === 'roll') {
      for (let i = 0; i < 7; i++) {
        const t = now + i * 0.11;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140 + Math.random() * 60, t);
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.05);
      }
      const finalTime = now + 7 * 0.11;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340, finalTime);
      gain.gain.setValueAtTime(0.04, finalTime);
      gain.gain.exponentialRampToValueAtTime(0.001, finalTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(finalTime);
      osc.stop(finalTime + 0.22);
    }
    else if (type === 'hit_boss') {
      // White noise blast for the boss hit
      const bufferSize = ctx.sampleRate * 0.3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(100, now + 0.25);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      const sweep = ctx.createOscillator();
      const sweepGain = ctx.createGain();
      sweep.type = 'sawtooth';
      sweep.frequency.setValueAtTime(80, now);
      sweep.frequency.linearRampToValueAtTime(30, now + 0.2);
      sweepGain.gain.setValueAtTime(0.08, now);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      sweep.connect(sweepGain);
      sweepGain.connect(ctx.destination);
      
      noise.start(now);
      noise.stop(now + 0.3);
      sweep.start(now);
      sweep.stop(now + 0.2);
    }
    else if (type === 'hit_player') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(70, now);
      osc.frequency.exponentialRampToValueAtTime(20, now + 0.2);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
      
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(160, now);
      osc2.frequency.setValueAtTime(80, now + 0.04);
      gain2.gain.setValueAtTime(0.08, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.22);
    }
    else if (type === 'crit') {
      playRpgSound('hit_boss');
      setTimeout(() => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(950, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.3);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.3);
        } catch {}
      }, 80);
    }
    else if (type === 'heal') {
      const notes = [261.63, 329.63, 392.00, 523.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.06, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.18);
      });
    }
    else if (type === 'victory') {
      const chords = [
        { time: 0.0, freqs: [261.63, 329.63, 392.00] },
        { time: 0.2, freqs: [349.23, 440.00, 523.25] },
        { time: 0.4, freqs: [392.00, 493.88, 587.33] },
        { time: 0.6, freqs: [523.25, 659.25, 783.99] }
      ];
      chords.forEach((chord) => {
        chord.freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + chord.time);
          gain.gain.setValueAtTime(0.04, now + chord.time);
          gain.gain.exponentialRampToValueAtTime(0.001, now + chord.time + 0.45);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + chord.time);
          osc.stop(now + chord.time + 0.45);
        });
      });
    }
    else if (type === 'defeat') {
      const freqs = [146.83, 174.61, 220.00];
      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.linearRampToValueAtTime(freq * 0.5, now + 1.1);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, now);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.1);
      });
    }
  } catch (e) {
    console.warn("Audio Context blocked or failed:", e);
  }
};

interface SpellDetails {
  name: string;
  element: string;
  emoji: string;
  desc: string;
  bg: string;
  border: string;
  text: string;
  bonusDmg: number;
  effect: 'burn' | 'freeze' | 'lightning' | 'lifesteal' | 'normal';
}

const getSpellInfo = (idx: number, text: string): SpellDetails => {
  const types: SpellDetails[] = [
    {
      name: "Bola de Fuego",
      element: "Feu",
      emoji: "🔥",
      desc: "Dégâts accrus (+3 base)",
      bg: "bg-red-50/90 dark:bg-red-950/20",
      border: "border-red-600 ring-red-400",
      text: "text-red-900 dark:text-red-200",
      bonusDmg: 3,
      effect: "burn"
    },
    {
      name: "Lanza de Hielo",
      element: "Glace",
      emoji: "❄️",
      desc: "Si le dé est pair, soigne +1 PV",
      bg: "bg-cyan-50/90 dark:bg-cyan-950/20",
      border: "border-cyan-500 ring-cyan-400",
      text: "text-cyan-900 dark:text-cyan-200",
      bonusDmg: 0,
      effect: "freeze"
    },
    {
      name: "Rayo Purificador",
      element: "Foudre",
      emoji: "⚡",
      desc: "Critique doublé si dé >= 7",
      bg: "bg-amber-50/90 dark:bg-amber-950/20",
      border: "border-amber-500 ring-amber-400",
      text: "text-amber-900 dark:text-amber-200",
      bonusDmg: 0,
      effect: "lightning"
    },
    {
      name: "Drenaje de Sangre",
      element: "Sang",
      emoji: "🩸",
      desc: "Absorbe +2 PV si Gargui <= 2 PV",
      bg: "bg-rose-50/90 dark:bg-rose-950/20",
      border: "border-rose-600 ring-rose-400",
      text: "text-rose-900 dark:text-rose-200",
      bonusDmg: 0,
      effect: "lifesteal"
    }
  ];
  return types[idx % types.length];
};

// Bestiaire des gardiens : un boss nommé pour chacune des nouvelles salles.
// Les images réutilisent les cartes existantes du jeu (time / illusion / accent).
interface BossRosterEntry {
  name: string;
  emoji: string;
  desc: string;
  image: string;
  intro: string;
  lesson: string;
  taunt: string;
}

const BOSS_ROSTER: Record<string, BossRosterEntry> = {
  imperatif: {
    name: "Le Capitaine des Ordres",
    emoji: '⚔️',
    desc: "Tyran de l'enclise",
    image: '/boss_time.png',
    intro: "Ses ordres hurlés se brisent contre le bouclier de Gargui.",
    lesson: "À l'affirmatif, les pronoms se collent derrière : ¡Dámelo! Au négatif, no + subjonctif : ¡No me lo des!",
    taunt: "¡Obedece! Tu ne sais même pas dire « haz » ni « pon » !",
  },
  futur: {
    name: "L'Oracle du Lendemain",
    emoji: '🔮',
    desc: "Devin des radicaux tordus",
    image: '/boss_illusion.png',
    intro: "Sa boule de cristal se fissure : l'avenir appartient à Gargui.",
    lesson: "Infinitif entier + é, ás, á... et douze radicaux tordus : tendré, podré, diré, haré !",
    taunt: "Tu ne verras jamais demain... ¡No sabrás conjugar!",
  },
  passe_compose: {
    name: "L'Archiviste du Présent",
    emoji: '📚',
    desc: "Gardien des participes",
    image: '/boss_accent.png',
    intro: "Ses archives s'ouvrent enfin, libérant les participes enchaînés.",
    lesson: "Un seul auxiliaire, haber, et un participe invariable : María ha llegado, se han levantado.",
    taunt: "¡Has roto tu destino! Tu confonds encore hecho et dicho !",
  },
  imparfait: {
    name: "La Dame des Souvenirs",
    emoji: '🌫️',
    desc: "Tisseuse du passé",
    image: '/boss_illusion.png',
    intro: "Ses brumes de nostalgie se dissipent devant tant de maîtrise.",
    lesson: "Trois irréguliers seulement : iba, era, veía. L'imparfait peint le décor, le passé simple frappe l'événement.",
    taunt: "Cuando eras pequeño... tu confondais déjà era et fue !",
  },
  passe_simple: {
    name: "Le Chroniqueur de Pierre",
    emoji: '🗿',
    desc: "Scribe des prétérits forts",
    image: '/boss_time.png',
    intro: "Sa plume de granit se brise : le récit appartient désormais à Gargui.",
    lesson: "Ayer fui, estuve, tuve, hice, dije : les prétérits forts n'ont pas d'accent écrit, les réguliers si (canté, cantó) !",
    taunt: "¡Fuiste y serás vencido! Tes accents tombent toujours au mauvais endroit !",
  },
  gerondif: {
    name: "Le Danseur Perpétuel",
    emoji: '🌀',
    desc: "Esprit du mouvement",
    image: '/boss_illusion.png',
    intro: "Sa danse infinie s'arrête net, gelée par le dernier gérondif de Gargui.",
    lesson: "-ando / -iendo, avec les métamorphoses : leyendo, pidiendo, durmiendo, yendo. Estar + gérondif = en train de !",
    taunt: "¡Sigues perdiendo! Tu danses sans jamais conjuguer !",
  },
  genre_nombre: {
    name: "Le Bibliothécaire Fou",
    emoji: '📖',
    desc: "Trieur de genres trompeurs",
    image: '/boss_accent.png',
    intro: "Ses étagères truquées s'effondrent : chaque nom retrouve son article.",
    lesson: "El problema, el día, el mapa... mais la mano, la sal, la sangre ! Et el pez → los peces.",
    taunt: "¡La problema! ¡El mano! Tu classes tout de travers, petite gargouille !",
  },
  articles: {
    name: "Le Douanier des Mots",
    emoji: '🛃',
    desc: "Contrôleur d'articles",
    image: '/boss_time.png',
    intro: "Sa barrière magique s'ouvre : les articles circulent librement.",
    lesson: "al = a + el, del = de + el, el agua (mais las aguas), quiero chocolate sans partitif, et otro sans « un » !",
    taunt: "¡Un otro error! Tes papiers d'articles ne sont pas en règle !",
  },
  demonstratifs_possessifs: {
    name: "Le Seigneur des Trois Distances",
    emoji: '👁️',
    desc: "Maître d'este, ese, aquel",
    image: '/boss_illusion.png',
    intro: "Ses trois yeux — proche, moyen, lointain — se ferment un à un.",
    lesson: "Este (près de moi), ese (près de toi), aquel (là-bas). Et « celui de » = el de, « ce que » = lo que !",
    taunt: "¿Este? ¿Ese? ¿Aquel? Tu ne sais jamais où tu te trouves !",
  },
  pronoms: {
    name: "L'Hydre aux Deux Têtes",
    emoji: '🐉',
    desc: "COI et COD entremêlés",
    image: '/boss_accent.png',
    intro: "Ses deux têtes (COI et COD) s'inclinent enfin dans le bon ordre.",
    lesson: "COI puis COD : me lo, te la... et le + lo devient SE LO : Pedro se lo da.",
    taunt: "¡Le lo daré! ... Tu vois ? Même moi je te piège avec se lo !",
  },
  numeraux: {
    name: "Le Comptable Spectral",
    emoji: '🧮',
    desc: "Avare des apocopes",
    image: '/boss_time.png',
    intro: "Son boulier maudit explose en mille (mil !) éclats dorés.",
    lesson: "Cien invitados, veintiún coches, quinientas casas, Luis catorce et mil millones pour le milliard !",
    taunt: "¡Ciento errores! Tu comptes comme un fantôme sans doigts !",
  },
  indefinis: {
    name: "Le Spectre du Néant",
    emoji: '👻',
    desc: "Souffleur de nada",
    image: '/boss_illusion.png',
    intro: "Le néant recule : alguien, algo, quelque chose renaît sous les voûtes.",
    lesson: "Nadie responde OU no responde nadie — et toujours le « a » personnel : no veo a nadie !",
    taunt: "¡Nada sabes! ¡A nadie vencerás!",
  },
  style_indirect: {
    name: "L'Écho Déformant",
    emoji: '🗣️',
    desc: "Rapporteur de rumeurs",
    image: '/boss_accent.png',
    intro: "Ses échos mensongers s'accordent enfin à la vérité des temps.",
    lesson: "Dijo que comía, que había comido, que comería... et mañana devient al día siguiente !",
    taunt: "Dijo que me vencerías... ¡pero mintió!",
  },
};

export const LessonView: React.FC<LessonViewProps> = ({
  unit, node, hearts, onLoseHeart, onQuit, onComplete, onReviewTheory, onRefillHearts, onMistake,
}) => {
  const isBossNode = node.type === 'boss';

  const [queue, setQueue] = useState<LessonQuestion[]>(node.questions);
  const [solvedCount, setSolvedCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('answering');
  const [answers, setAnswers] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [praiseIndex, setPraiseIndex] = useState(0);

  // État du puzzle de phrase ('order') : indices des tuiles déjà posées.
  const [orderPicked, setOrderPicked] = useState<number[]>([]);
  // État de l'appariement ('match').
  const [matchedLefts, setMatchedLefts] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchWrongTaps, setMatchWrongTaps] = useState(0);
  const [matchFlash, setMatchFlash] = useState<string | null>(null);
  // Ordre mélangé mais stable de la colonne droite du 'match'.
  const [rightOrder, setRightOrder] = useState<string[]>([]);

  // RPG Card-Battle Boss Fight States
  const totalQuestions = node.questions.length;
  const damagePerCorrect = Math.ceil(100 / totalQuestions);
  const [bossHp, setBossHp] = useState(100);
  const [gargoyleHp, setGargoyleHp] = useState(hearts);
  
  // Animation states
  const [projectileActive, setProjectileActive] = useState(false);
  const [bossFlashing, setBossFlashing] = useState(false);
  const [cutsceneStep, setCutsceneStep] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [gargoyleFlashing, setGargoyleFlashing] = useState(false);
  const [projectileChar, setProjectileChar] = useState('☄️');

  // Voice of Cards Tabletop RPG States
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollRequired, setRollRequired] = useState<boolean>(false);
  const [isWaitingForPlayerRoll, setIsWaitingForPlayerRoll] = useState<boolean>(false);
  const [floatingDmg, setFloatingDmg] = useState<{ value: string | number; target: 'boss' | 'player'; isHeal?: boolean } | null>(null);
  const [selectedSpellIdx, setSelectedSpellIdx] = useState<number>(0);
  const [battlePhase, setBattlePhase] = useState<'question' | 'action-choice' | 'player-roll'>('question');
  const [chosenAction, setChosenAction] = useState<'attack' | 'heal' | 'shield' | null>(null);
  const [hasShield, setHasShield] = useState<boolean>(false);

  const question = queue[0];
  const progressPct = Math.round((solvedCount / totalQuestions) * 100);

  // Réinitialise les mini-jeux (puzzle, paires) à chaque nouvelle question.
  useEffect(() => {
    setOrderPicked([]);
    setMatchedLefts([]);
    setSelectedLeft(null);
    setMatchWrongTaps(0);
    setMatchFlash(null);
    if (question?.kind === 'match') {
      // Mélange stable de la colonne de droite (déterministe par contenu).
      const rights = question.pairs.map(p => p.right);
      const shuffled = [...rights].sort(
        (a, b) => ((a.charCodeAt(0) * 31 + a.length) % 17) - ((b.charCodeAt(0) * 31 + b.length) % 17)
      );
      setRightOrder(shuffled);
    } else {
      setRightOrder([]);
    }
  }, [question]);

  const hasAnswer = useMemo(() => {
    if (!question) return false;
    if (question.kind === 'fill') {
      return question.solutions.every((_, i) => (answers[i] ?? '').trim() !== '');
    }
    if (question.kind === 'match') return false; // validation automatique
    if (question.kind === 'order') {
      return orderPicked.length === question.words.length;
    }
    return (answers[0] ?? '').trim() !== '';
  }, [question, answers, orderPicked]);

  const mascotMood: MascotMood =
    phase === 'correct' ? 'happy' :
    phase === 'incorrect' ? 'sad' :
    phase === 'finished' ? 'celebrate' :
    phase === 'failed' ? 'sad' :
    'thinking';

  const bossDetails = useMemo(() => {
    if (unit.id === 'orthographe') {
      return { 
        name: "L'Inquisiteur des Accents", 
        emoji: '👹', 
        desc: "Lancier de tildes aiguisés",
        images: {
          full: "/boss_accent.png",
          damaged: "/boss_accent_damaged.png",
          critical: "/boss_accent_critical.png",
          attack: "/boss_accent_attack.png",
          defeated: "/boss_accent_defeated.png",
        },
        victoryStory: [
          "L'armure de l'Inquisiteur se fissure... Les accents qu'il tenait prisonniers s'échappent dans un tourbillon doré.",
          "\"¡Imposible!\" hurle-t-il, tombant à genoux. \"Personne ne connaît la différence entre público et publico... entre automóvil et automovil...!\"",
          "Gargui ramasse le tilde brisé au sol. \"C'est simple\" dit-il. \"Les mots esdrújulas comme máquina, bolígrafo et hipócrita portent TOUJOURS l'accent. Les mots agudos terminés en voyelle, -n ou -s aussi : ladrón, holgazán...\"",
          "L'Inquisiteur se dissout en poussière dorée. Là où il se tenait, les lettres á, é, í, ó, ú brillent sur le sol comme des étoiles.",
          "Gargui grave une dernière règle sur le mur du donjon : \"Les mots llanos terminés en consonne (sauf -n, -s) portent l'accent : automóvil, fácil. Les mots llanos terminés en voyelle, -n ou -s n'en ont PAS : escritorio, examen.\"",
          "🏆 La Salle des Accents est libérée ! Le savoir orthographique coule à nouveau dans les veines du château."
        ],
        defeatStory: [
          "Gargui vacille, son énergie magique s'épuisant sous la grêle de tildes enflammés de l'Inquisiteur.",
          "\"Ton accentuation manque de rigueur !\" ricane le boss en levant sa lance étincelante.",
          "Gargui confond les mots agudos (accentués sur la dernière syllabe si terminés par une voyelle, -n, -s comme ladrón) et n'a pas su placer les tildes obligatoires sur les mots esdrújulas.",
          "L'Inquisiteur pointe son arme. Une décharge d'énergie pétrifie lentement les membres de la petite gargouille, la figeant sur place.",
          "Le voilà transformé en statue de pierre inerte au milieu des ombres du donjon. Le savoir orthographique reste prisonnier.",
          "❌ Défaite... Mais tout n'est pas perdu ! Consulte le grimoire de théorie pour ranimer Gargui et retenter le combat !"
        ]
      };
    } else if (unit.id === 'present_indicatif') {
      return { 
        name: "La Sentinelle du Temps", 
        emoji: '🛡️💀', 
        desc: "Gardien des sabliers",
        images: {
          full: "/boss_time.png",
          damaged: "/boss_time.png",
          critical: "/boss_time.png",
          attack: "/boss_time.png",
          defeated: "/boss_time.png",
        },
        victoryStory: [
          "La Sentinelle du Temps vacille. Son sablier se brise et le sable du présent coule librement.",
          "\"Les conjugaisons... elles m'échappent...\" murmure-t-elle en s'effondrant.",
          "Gargui contemple les restes du gardien. Le présent de l'indicatif est à nouveau maîtrisé.",
          "🏆 La Salle du Temps est libérée !"
        ],
        defeatStory: [
          "Le sablier de Gargui se vide entièrement. Les rouages du temps ralentissent puis se figent complètement.",
          "\"Le présent n'attend pas les esprits hésitants...\" résonne la voix de pierre de la Sentinelle.",
          "Gargui s'est emmêlé dans les conjugaisons du présent de l'indicatif : les verbes réguliers et irréguliers l'ont submergé.",
          "La Sentinelle lève son lourd bouclier temporel et enferme Gargui dans une boucle de temps ralenti.",
          "Le pauvre Gargui reste figé, incapable de bouger dans cette salle hors du temps.",
          "❌ Défaite... Révise le grimoire de théorie pour briser la boucle temporelle et reprendre le combat !"
        ]
      };
    } else if (unit.id !== 'subjonctif' && BOSS_ROSTER[unit.id]) {
      const b = BOSS_ROSTER[unit.id];
      return {
        name: b.name,
        emoji: b.emoji,
        desc: b.desc,
        images: {
          full: b.image,
          damaged: b.image,
          critical: b.image,
          attack: b.image,
          defeated: b.image,
        },
        victoryStory: [
          `${b.name} chancelle sous le dernier sortilège de Gargui. ${b.intro}`,
          `"¡Imposible!" gronde-t-il. "Personne n'avait encore maîtrisé ${unit.title.toLowerCase()} dans ce donjon !"`,
          `Gargui rengaine sa craie magique : "${b.lesson}"`,
          `Le gardien se dissout en poussière dorée, libérant le savoir qu'il gardait prisonnier.`,
          `🏆 La salle « ${unit.title} » est libérée ! Un nouveau pan du grimoire s'illumine.`,
        ],
        defeatStory: [
          `Les attaques de ${b.name} pleuvent sur Gargui, qui vacille sous les formules ennemies.`,
          `"${b.taunt}" ricane le gardien en levant son arme.`,
          `Gargui n'a pas su déjouer les pièges de ${unit.title.toLowerCase()} : ses sorts se sont retournés contre lui.`,
          `Une décharge d'énergie pétrifie lentement la petite gargouille, la figeant en statue de pierre.`,
          `❌ Défaite... Consulte le grimoire de théorie pour ranimer Gargui et retenter le combat !`,
        ],
      };
    } else {
      return {
        name: "Le Mage de l'Illusion",
        emoji: '🧙‍♂️',
        desc: "Maître du subjonctif",
        images: {
          full: "/boss_illusion.png",
          damaged: "/boss_illusion.png",
          critical: "/boss_illusion.png",
          attack: "/boss_illusion.png",
          defeated: "/boss_illusion.png",
        },
        victoryStory: [
          "Les illusions du Mage se dissipent une à une, révélant la vérité grammaticale.",
          "\"Le subjonctif... il était ma plus belle illusion...\" soupire-t-il en disparaissant.",
          "Gargui a vaincu le Mage. Les règles du subjonctif brillent désormais clairement.",
          "🏆 La Salle des Illusions est libérée !"
        ],
        defeatStory: [
          "Les illusions du Mage entourent Gargui, créant un labyrinthe de doutes, de craintes et de faux espoirs.",
          "\"Le doute est le poison de l'esprit !\" murmure le Mage en multipliant ses clones d'ombres.",
          "Gargui n'a pas su employer le subjonctif après les expressions d'émotion, de volonté ou de doute.",
          "Les ombres du Mage lancent un sortilège de sommeil éternel, plongeant la gargouille dans un rêve brumeux.",
          "Gargui s'endort profondément, vaincu par les mirages du subjonctif.",
          "❌ Défaite... Révise le grimoire de théorie pour réveiller Gargui et dissiper les brumes de l'illusion !"
        ]
      };
    }
  }, [unit]);

  // Dynamic boss image based on HP and state
  const bossCurrentImage = useMemo(() => {
    if (gargoyleFlashing) return bossDetails.images.attack; // Boss is attacking
    if (bossHp <= 30) return bossDetails.images.critical;
    if (bossHp <= 60) return bossDetails.images.damaged;
    return bossDetails.images.full;
  }, [bossHp, gargoyleFlashing, bossDetails]);

  // Boss cutscene story lines (unconditionally at the top level)
  const cutsceneStoryLines = useMemo(() => {
    if (!isBossNode) return [];
    if (phase === 'finished') return bossDetails.victoryStory;
    if (phase === 'failed') return bossDetails.defeatStory || [];
    return [];
  }, [isBossNode, phase, bossDetails]);

  const cutsceneCurrentLine = cutsceneStoryLines[cutsceneStep] || '';
  const cutsceneIsLastStep = cutsceneStep >= cutsceneStoryLines.length;

  // Typewriter effect for cutscene story line (unconditionally at the top level)
  useEffect(() => {
    if (cutsceneStoryLines.length === 0 || cutsceneIsLastStep) {
      return;
    }
    setTypewriterText('');
    setTypewriterDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypewriterText(cutsceneCurrentLine.slice(0, i));
      if (i >= cutsceneCurrentLine.length) {
        clearInterval(interval);
        setTypewriterDone(true);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [cutsceneStep, cutsceneCurrentLine, cutsceneIsLastStep, cutsceneStoryLines.length]);

  // Game Master text narrator
  const [gmText, setGmText] = useState<string>(
    `Le Maître du Jeu : Vous faites face à ${bossDetails.name}. Préparez vos cartes de sort pour briser sa garde !`
  );

  // Play Victory/Defeat procedural fanfares
  useEffect(() => {
    if (phase === 'finished') {
      playRpgSound('victory');
    } else if (phase === 'failed') {
      playRpgSound('defeat');
    }
  }, [phase]);

  // Reset GM text and combat states on question changes
  useEffect(() => {
    if (phase === 'answering' && isBossNode && question) {
      setDiceValue(null);
      setIsRolling(false);
      setRollRequired(false);
      setIsWaitingForPlayerRoll(false);
      setFloatingDmg(null);
      setBossFlashing(false);
      setGargoyleFlashing(false);
      setBattlePhase('question');
      setChosenAction(null);
      setGmText(`Le Maître du Jeu : Gargui prépare une incantation. Choisissez votre carte de sort...`);
    }
  }, [solvedCount, phase, isBossNode, question]);

  const triggerBossTurn = () => {
    setIsRolling(true);
    setDiceValue(null);
    setGmText(`Le Maître du Jeu : L'incantation a échoué ! Le Boss prépare sa contre-attaque...`);
    playRpgSound('roll');
    
    setTimeout(() => {
      const rolled = Math.floor(Math.random() * 6) + 1; // D6
      setDiceValue(rolled);
      setIsRolling(false);
      
      if (hasShield) {
        setHasShield(false);
        setGmText(`Le Maître du Jeu : 🛡️ Le bouclier d'ESCUDO absorbe l'attaque du Boss ! Aucun dégât subi.`);
        setTimeout(() => {
          setPhase('incorrect');
        }, 1800);
      } else {
        setGargoyleFlashing(true);
        setFloatingDmg({ value: 1, target: 'player' });
        playRpgSound('hit_player');
        
        // Apply heart loss
        const remaining = onLoseHeart();
        setGargoyleHp(remaining);
        
        if (rolled >= 5) {
          setGmText(`Le Maître du Jeu : Attaque dévastatrice du Boss (Dé: ${rolled}) ! Gargui perd 1 PV.`);
        } else {
          setGmText(`Le Maître du Jeu : Le Boss assène un coup (Dé: ${rolled}) ! Gargui perd 1 PV.`);
        }
        
        setTimeout(() => {
          setGargoyleFlashing(false);
          setFloatingDmg(null);
          if (remaining <= 0) {
            setPhase('failed');
          } else {
            setPhase('incorrect');
          }
        }, 1800);
      }
    }, 1200);
  };

  const handlePlayerDiceRoll = () => {
    if (!isWaitingForPlayerRoll) return;
    setRollRequired(false);
    setIsRolling(true);
    setDiceValue(null);
    setGmText(`Le Maître du Jeu : Le dé tourne sur le plateau...`);
    playRpgSound('roll');
    
    setTimeout(() => {
      const rolled = Math.floor(Math.random() * 10) + 1; // D10
      setDiceValue(rolled);
      setIsRolling(false);
      
      // Look up spell attributes
      let spellInfo = { name: "Sortilège", element: "Standard", emoji: "🔮", bonusDmg: 0, effect: "normal" };
      if (question.kind === 'mc' || question.kind === 'classify') {
        spellInfo = getSpellInfo(selectedSpellIdx, answers[0] || '');
      }

      let totalDmg = 0;
      let healingDone = 0;
      let shieldGained = false;
      let isCrit = rolled === 10;

      if (chosenAction === 'attack') {
        let baseDmg = damagePerCorrect;
        if (spellInfo.effect === 'burn') {
          baseDmg += 5; // +5 for Fire spell
        }
        let diceBonus = Math.round(rolled * 1.5);
        if (isCrit) {
          diceBonus *= 2;
        }
        totalDmg = baseDmg + diceBonus;
      } else if (chosenAction === 'heal') {
        healingDone = Math.max(1, Math.round(rolled / 2.5)); // 1 to 4 PV
        if (spellInfo.effect === 'freeze') {
          healingDone += 1;
        }
      } else if (chosenAction === 'shield') {
        totalDmg = 15;
        if (spellInfo.effect === 'lightning') {
          totalDmg += 5;
        }
        shieldGained = true;
      }

      // Apply damage to boss
      if (totalDmg > 0) {
        setBossFlashing(true);
        setFloatingDmg({ value: totalDmg, target: 'boss' });
        setBossHp(prev => Math.max(0, prev - totalDmg));
      }

      // Apply healing to player
      if (healingDone > 0) {
        setGargoyleHp(prev => Math.min(5, prev + healingDone));
        // Show green heal floating number
        setTimeout(() => {
          setFloatingDmg({ value: healingDone, target: 'player', isHeal: true });
          playRpgSound('heal');
          setTimeout(() => setFloatingDmg(null), 1200);
        }, 600);
      }

      // Apply shield
      if (shieldGained) {
        setHasShield(true);
      }

      // Play impact sound
      if (chosenAction === 'heal') {
        playRpgSound('heal');
      } else if (isCrit) {
        playRpgSound('crit');
      } else {
        playRpgSound('hit_boss');
      }

      // Update GM speech
      if (chosenAction === 'attack') {
        if (isCrit) {
          setGmText(`Le Maître du Jeu : ✨ COUP CRITIQUE avec ATACAR 🔥 sous l'égide de ${spellInfo.name} ! Le dé affiche ${rolled} ! Le Boss subit -${totalDmg} HP !`);
        } else {
          setGmText(`Le Maître du Jeu : 🔮 Sort ATACAR 🔥 réussi ! Le dé affiche ${rolled}. Le Boss subit -${totalDmg} HP.`);
        }
      } else if (chosenAction === 'heal') {
        setGmText(`Le Maître du Jeu : ❄️ Sort de soin CURAR réussi ! Le dé affiche ${rolled}. Gargui récupère +${healingDone} PV.`);
      } else if (chosenAction === 'shield') {
        setGmText(`Le Maître du Jeu : ⚡ Sort de protection ESCUDO érigé ! Le dé affiche ${rolled}. Le Boss subit -${totalDmg} HP et la prochaine attaque sera bloquée.`);
      }

      setTimeout(() => {
        setBossFlashing(false);
        setFloatingDmg(null);
        setIsWaitingForPlayerRoll(false);
        setPhase('correct');
      }, 2000);
    }, 1100);
  };

  // Auto-check handler for boss MC/classify card selection
  const handleBossCardSelect = (option: string, spellIdx: number) => {
    if (!question) return;
    setAnswers([option]);
    setSelectedSpellIdx(spellIdx);
    playRpgSound('click');

    const isCorrect = checkQuestion(question, [option]);

    if (isCorrect) {
      setPraiseIndex(Math.floor(Math.random() * praise.length));
      setBattlePhase('action-choice');
      setGmText("Le Maître du Jeu : Formule correcte ! Choisissez votre action tactique...");
    } else {
      setMistakes(m => m + 1);
      onMistake?.(question);
      triggerBossTurn();
    }
  };

  const handleCheck = () => {
    if (!question || !hasAnswer) return;

    const isCorrect = checkQuestion(question, answers);

    if (isBossNode) {
      if (isCorrect) {
        setPraiseIndex(Math.floor(Math.random() * praise.length));
        setBattlePhase('action-choice');
        setGmText("Le Maître du Jeu : Formule correcte ! Gargui a canalisé le sort avec succès. Choisissez votre action tactique...");
      } else {
        setMistakes(m => m + 1);
        onMistake?.(question);
        triggerBossTurn();
      }
      return;
    }

    // Standard non-boss check logic
    if (isCorrect) {
      setPraiseIndex(Math.floor(Math.random() * praise.length));
      
      const spellTypes = ['☄️', '⚡', '🔥', '🔮', '❄️'];
      setProjectileChar(spellTypes[Math.floor(Math.random() * spellTypes.length)]);
      setProjectileActive(true);
      
      setTimeout(() => {
        setBossFlashing(true);
        setBossHp(prev => Math.max(0, prev - damagePerCorrect));
      }, 500);

      setPhase('correct');
    } else {
      setGargoyleFlashing(true);
      const remaining = onLoseHeart();
      setGargoyleHp(remaining);
      setMistakes(m => m + 1);
      onMistake?.(question);

      if (remaining <= 0) {
        setPhase('failed');
      } else {
        setPhase('incorrect');
      }
    }
  };

  // ---- Mini-jeu d'appariement ('match') ----
  const handleMatchTap = (side: 'left' | 'right', value: string) => {
    if (!question || question.kind !== 'match' || phase !== 'answering') return;
    playRpgSound('click');
    if (side === 'left') {
      setSelectedLeft(value === selectedLeft ? null : value);
      return;
    }
    if (!selectedLeft) return;
    const pair = question.pairs.find(p => p.left === selectedLeft);
    if (pair && pair.right === value) {
      const nextMatched = [...matchedLefts, selectedLeft];
      setMatchedLefts(nextMatched);
      setSelectedLeft(null);
      if (nextMatched.length === question.pairs.length) {
        // Toutes les paires trouvées : la question est validée.
        setAnswers(['ok']);
        setPraiseIndex(Math.floor(Math.random() * praise.length));
        if (matchWrongTaps > 0) {
          // Des ratés pendant l'appariement coûtent le « sans faute », pas un cœur.
          setMistakes(m => m + 1);
        }
        setPhase('correct');
      } else {
        playRpgSound('heal');
      }
    } else {
      // Mauvaise paire : flash rouge, on retient l'erreur (sans perdre de PV).
      setMatchWrongTaps(t => t + 1);
      setMatchFlash(value);
      playRpgSound('hit_player');
      setTimeout(() => setMatchFlash(null), 500);
      setSelectedLeft(null);
    }
  };

  // Turn off visual flashes on phase change
  useEffect(() => {
    if (phase === 'answering') {
      setProjectileActive(false);
      setBossFlashing(false);
      setGargoyleFlashing(false);
    }
  }, [phase]);

  const handleContinue = () => {
    const [current, ...rest] = queue;
    if (phase === 'correct') {
      const newSolved = solvedCount + 1;
      
      // If boss HP is 0, we finish the battle
      if (rest.length === 0 || bossHp <= 0) {
        setSolvedCount(newSolved);
        setBossHp(0);
        setPhase('finished');
        return;
      }
      setQueue(rest);
      setSolvedCount(newSolved);
    } else {
      // Re-queue incorrect question
      setQueue([...rest, current]);
    }
    setAnswers([]);
    setPhase('answering');
  };

  const setAnswer = (index: number, value: string) => {
    setAnswers(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  // Finished & Failed Screens
  if (phase === 'finished') {
    const perfect = mistakes === 0;

    // Boss victory cutscene
    if (isBossNode) {
      const storyLines = bossDetails.victoryStory;
      const currentLine = storyLines[cutsceneStep] || '';
      const isLastStep = cutsceneStep >= storyLines.length;

      const handleCutsceneNext = () => {
        if (!typewriterDone) {
          // Skip to end of current line
          setTypewriterText(currentLine);
          setTypewriterDone(true);
          return;
        }
        if (cutsceneStep < storyLines.length) {
          setCutsceneStep(prev => prev + 1);
        }
      };

      // Final summary screen (after all story steps)
      if (isLastStep) {
        return (
          <div className="min-h-screen wood-table flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            <Confetti />
            {/* Golden glow behind image */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-amber-400/20 blur-3xl animate-pulse" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-amber-500 shadow-2xl mb-4 animate-pop-in relative">
                <img src={asset(bossDetails.images.defeated)} alt="Boss vaincu" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <span className="text-white text-xs font-black uppercase tracking-wider bg-black/40 px-3 py-0.5 rounded-full">Terrassé</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 mt-2 font-gothic tracking-wide drop-shadow-lg animate-pop-in">
                ⚔️ BOSS VAINCU ! 🏆
              </h2>
              <p className="text-amber-200/80 font-semibold mt-1 text-sm max-w-sm">
                {perfect 
                  ? '¡Magnífico! Combat parfait ! ⭐' 
                  : `${mistakes} blessure${mistakes > 1 ? 's' : ''} reçue${mistakes > 1 ? 's' : ''} au combat.`}
              </p>

              <div className="flex gap-3 mt-6">
                <div className="animate-xp bg-amber-900/60 border-2 border-amber-500/50 rounded-2xl px-5 py-2.5 shadow-lg backdrop-blur-sm">
                  <p className="text-[9px] font-bold uppercase text-amber-400 tracking-wider font-gothic">EXP</p>
                  <p className="text-xl font-black text-amber-300">⚡ +20</p>
                </div>
                <div className="animate-xp bg-amber-900/60 border-2 border-amber-500/50 rounded-2xl px-5 py-2.5 shadow-lg backdrop-blur-sm" style={{ animationDelay: '0.15s' }}>
                  <p className="text-[9px] font-bold uppercase text-sky-400 tracking-wider font-gothic">Précision</p>
                  <p className="text-xl font-black text-sky-300">
                    {Math.round((totalQuestions / (totalQuestions + mistakes)) * 100)}%
                  </p>
                </div>
                <div className="animate-xp bg-amber-900/60 border-2 border-amber-500/50 rounded-2xl px-5 py-2.5 shadow-lg backdrop-blur-sm" style={{ animationDelay: '0.3s' }}>
                  <p className="text-[9px] font-bold uppercase text-emerald-400 tracking-wider font-gothic">Blessures</p>
                  <p className="text-xl font-black text-emerald-300">{gargoyleHp}/5 PV</p>
                </div>
              </div>

              <button
                onClick={() => onComplete(perfect)}
                className="btn-3d mt-8 bg-amber-500 hover:bg-amber-600 border-2 border-amber-600 text-white font-extrabold uppercase tracking-widest py-3.5 px-12 rounded-2xl text-base font-gothic animate-pulse shadow-xl"
                style={{ ['--btn-shadow' as string]: '#d97706' }}
              >
                Continuer la quête →
              </button>
            </div>
          </div>
        );
      }

      // Cutscene story slide
      return (
        <div 
          className="min-h-screen wood-table flex flex-col items-center justify-between p-4 relative overflow-hidden cursor-pointer select-none"
          onClick={handleCutsceneNext}
        >
          {/* Dark cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 z-0" />
          
          {/* Floating golden particles */}
          <div className="absolute inset-0 pointer-events-none z-5">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-amber-400 rounded-full animate-float-particle"
                style={{
                  left: `${10 + (i * 7) % 80}%`,
                  top: `${15 + (i * 13) % 60}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${3 + (i % 3)}s`,
                  opacity: 0.3 + (i % 5) * 0.15,
                }}
              />
            ))}
          </div>

          {/* Top: Step indicator */}
          <div className="z-10 w-full max-w-md flex items-center justify-between pt-2">
            <div className="flex gap-1">
              {storyLines.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i <= cutsceneStep ? 'bg-amber-400 w-6' : 'bg-amber-800/40 w-3'
                  }`} 
                />
              ))}
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setCutsceneStep(storyLines.length); }}
              className="text-[9px] text-amber-400/60 font-bold uppercase tracking-wider hover:text-amber-300 transition-colors"
            >
              Passer ▸▸
            </button>
          </div>

          {/* Center: Boss defeated image + story text */}
          <div className="flex-1 flex flex-col items-center justify-center z-10 max-w-md w-full gap-4">
            {/* Boss image with cinematic framing */}
            <div className="relative">
              <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-3 border-amber-600/60 shadow-2xl relative">
                <img 
                  src={asset(cutsceneStep < 3 ? bossDetails.images.critical : bossDetails.images.defeated)} 
                  alt={bossDetails.name} 
                  className="w-full h-full object-cover transition-all duration-1000"
                />
                {/* Dramatic vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
              </div>
              {/* Boss name plate */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-950/90 border border-amber-600/50 rounded-full px-4 py-0.5">
                <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest font-gothic">
                  {bossDetails.name}
                </span>
              </div>
            </div>

            {/* Story narration text with typewriter effect */}
            <div className="bg-black/50 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-5 sm:p-6 w-full min-h-[7rem] flex items-center relative">
              {/* Narrator icon */}
              <div className="absolute -top-4 left-4 bg-amber-900 border-2 border-amber-600 rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-lg">
                📜
              </div>
              <p className="text-amber-100 text-sm sm:text-base font-semibold leading-relaxed font-gothic italic">
                {typewriterText}
                {!typewriterDone && <span className="animate-pulse text-amber-400">▌</span>}
              </p>
            </div>
          </div>

          {/* Bottom: Tap to continue */}
          <div className="z-10 pb-4 animate-pulse">
            <p className="text-amber-500/50 text-[10px] font-bold uppercase tracking-widest">
              {typewriterDone ? '▸ Toucher pour continuer' : '▸ Toucher pour accélérer'}
            </p>
          </div>
        </div>
      );
    }

    // Non-boss normal victory screen
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6 text-center">
        <Confetti />
        <div className="w-36 h-36 mb-4 relative flex items-center justify-center">
          <TransparentImage src="/castle_gate.png" alt="Porte du château" className="absolute inset-0 w-full h-full object-contain" />
          <Mascot mood="celebrate" className="w-20 h-20 z-10 mt-6" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 mt-4 animate-pop-in font-gothic tracking-wide">
          SALLE CONQUISE ! ⚔️
        </h2>
        <p className="text-slate-600 font-semibold mt-2 max-w-md">
          {perfect 
            ? '¡Magnífico! Pas une seule erreur ! ⭐' 
            : `Bien joué ! ${mistakes} erreur${mistakes > 1 ? 's' : ''} commise${mistakes > 1 ? 's' : ''}.`}
        </p>
        
        <div className="flex gap-4 mt-8">
          <div className="animate-xp bg-amber-50 border-2 border-amber-300 rounded-2xl px-6 py-3 shadow-xs">
            <p className="text-[10px] font-bold uppercase text-amber-700 tracking-wider font-gothic">EXP Obtenue</p>
            <p className="text-2xl font-black text-amber-500">⚡ +{perfect ? 15 : 10}</p>
          </div>
          <div className="animate-xp bg-sky-50 border-2 border-sky-300 rounded-2xl px-6 py-3 shadow-xs" style={{ animationDelay: '0.15s' }}>
            <p className="text-[10px] font-bold uppercase text-sky-700 tracking-wider font-gothic">Précision</p>
            <p className="text-2xl font-black text-sky-600">
              {Math.round((totalQuestions / (totalQuestions + mistakes)) * 100)}%
            </p>
          </div>
        </div>
        
        <button
          onClick={() => onComplete(perfect)}
          className="btn-3d mt-10 bg-amber-500 hover:bg-amber-600 border-2 border-amber-600 text-white font-extrabold uppercase tracking-widest py-3.5 px-14 rounded-2xl text-lg font-gothic animate-pulse"
          style={{ ['--btn-shadow' as string]: '#d97706' }}
        >
          Continuer la quête
        </button>
      </div>
    );
  }

  if (phase === 'failed') {
    if (isBossNode) {
      const storyLines = bossDetails.defeatStory || [];
      const currentLine = storyLines[cutsceneStep] || '';
      const isLastStep = cutsceneStep >= storyLines.length;

      const handleCutsceneNext = () => {
        if (!typewriterDone) {
          setTypewriterText(currentLine);
          setTypewriterDone(true);
          return;
        }
        if (cutsceneStep < storyLines.length) {
          setCutsceneStep(prev => prev + 1);
        }
      };

      const handleRetry = () => {
        setBossHp(100);
        setGargoyleHp(hearts);
        setMistakes(0);
        setCutsceneStep(0);
        setQueue(node.questions);
        setAnswers([]);
        setPhase('answering');
        if (onRefillHearts) {
          onRefillHearts();
        }
      };

      if (isLastStep) {
        return (
          <div className="min-h-screen wood-table flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            {/* Dark/red glow behind image */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-rose-900/30 blur-3xl animate-pulse" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-rose-900 shadow-2xl mb-4 animate-pop-in relative">
                <img src={asset('/gargoyle_defeated.png')} alt="Gargouille pétrifiée" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <span className="text-white text-xs font-black uppercase tracking-wider bg-rose-950/70 px-3 py-0.5 rounded-full border border-rose-800">Pétrifié</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-200 mt-2 font-gothic tracking-wide drop-shadow-lg animate-pop-in uppercase">
                💀 COMBAT PERDU... 💔
              </h2>
              <p className="text-rose-300 font-semibold mt-1 text-sm max-w-sm">
                Le boss **{bossDetails.name}** a triomphé. Gargui a été changé en statue de pierre.
              </p>

              <div className="flex gap-3 mt-6">
                <div className="animate-xp bg-rose-950/60 border-2 border-rose-900/50 rounded-2xl px-5 py-2.5 shadow-lg backdrop-blur-sm">
                  <p className="text-[9px] font-bold uppercase text-rose-400 tracking-wider font-gothic">État</p>
                  <p className="text-xl font-black text-rose-300">Statue 🪨</p>
                </div>
                <div className="animate-xp bg-rose-950/60 border-2 border-rose-900/50 rounded-2xl px-5 py-2.5 shadow-lg backdrop-blur-sm" style={{ animationDelay: '0.15s' }}>
                  <p className="text-[9px] font-bold uppercase text-amber-400 tracking-wider font-gothic">Boss HP</p>
                  <p className="text-xl font-black text-amber-300">{bossHp}%</p>
                </div>
                <div className="animate-xp bg-rose-950/60 border-2 border-rose-900/50 rounded-2xl px-5 py-2.5 shadow-lg backdrop-blur-sm" style={{ animationDelay: '0.3s' }}>
                  <p className="text-[9px] font-bold uppercase text-emerald-400 tracking-wider font-gothic">Erreurs</p>
                  <p className="text-xl font-black text-emerald-300">{mistakes}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={handleRetry}
                  className="btn-3d bg-amber-500 hover:bg-amber-600 border-2 border-amber-600 text-white font-extrabold uppercase tracking-widest py-3 px-8 rounded-2xl text-sm font-gothic animate-pulse shadow-xl"
                  style={{ ['--btn-shadow' as string]: '#d97706' }}
                >
                  ⚔️ Réessayer le combat
                </button>
                <button
                  onClick={onReviewTheory}
                  className="btn-3d bg-sky-500 hover:bg-sky-600 border-2 border-sky-600 text-white font-extrabold uppercase tracking-wide py-3 px-8 rounded-2xl font-gothic text-sm shadow-xl"
                  style={{ ['--btn-shadow' as string]: '#0284c7' }}
                >
                  📜 Réviser le grimoire
                </button>
                <button
                  onClick={onQuit}
                  className="btn-3d bg-white hover:bg-slate-50 text-slate-700 font-extrabold uppercase tracking-wide py-3 px-8 rounded-2xl border-2 border-slate-300 text-sm shadow-xl"
                  style={{ ['--btn-shadow' as string]: '#94a3b8' }}
                >
                  Fuir au parcours
                </button>
              </div>
            </div>
          </div>
        );
      }

      // Defeat cutscene story slide
      return (
        <div 
          className="min-h-screen wood-table flex flex-col items-center justify-between p-4 relative overflow-hidden cursor-pointer select-none"
          onClick={handleCutsceneNext}
        >
          {/* Dark cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 z-0" />
          
          {/* Floating red/purple magic particles */}
          <div className="absolute inset-0 pointer-events-none z-5">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-rose-600 rounded-full animate-float-particle"
                style={{
                  left: `${10 + (i * 7) % 80}%`,
                  top: `${15 + (i * 13) % 60}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${3 + (i % 3)}s`,
                  opacity: 0.2 + (i % 5) * 0.1,
                }}
              />
            ))}
          </div>

          {/* Top: Step indicator */}
          <div className="z-10 w-full max-w-md flex items-center justify-between pt-2">
            <div className="flex gap-1">
              {storyLines.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i <= cutsceneStep ? 'bg-rose-500 w-6' : 'bg-rose-950/40 w-3'
                  }`} 
                />
              ))}
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setCutsceneStep(storyLines.length); }}
              className="text-[9px] text-rose-400/60 font-bold uppercase tracking-wider hover:text-rose-300 transition-colors"
            >
              Passer ▸▸
            </button>
          </div>

          {/* Center: Petrified gargoyle image + story text */}
          <div className="flex-1 flex flex-col items-center justify-center z-10 max-w-md w-full gap-4">
            <div className="relative animate-pulse">
              <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-3 border-rose-900 shadow-2xl relative">
                <img 
                  src="/gargoyle_defeated.png" 
                  alt="Gargouille vaincue" 
                  className="w-full h-full object-cover transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />
              </div>
              {/* Gargui name plate */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-rose-950/90 border border-rose-800 rounded-full px-4 py-0.5">
                <span className="text-[9px] font-black text-rose-300 uppercase tracking-widest font-gothic">
                  Gargui Pétrifié
                </span>
              </div>
            </div>

            {/* Story narration text with typewriter effect */}
            <div className="bg-black/70 backdrop-blur-sm border border-rose-900/30 rounded-2xl p-5 sm:p-6 w-full min-h-[7rem] flex items-center relative">
              <div className="absolute -top-4 left-4 bg-rose-900 border-2 border-rose-800 rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-lg">
                💔
              </div>
              <p className="text-rose-100 text-sm sm:text-base font-semibold leading-relaxed font-gothic italic">
                {typewriterText}
                {!typewriterDone && <span className="animate-pulse text-rose-400">▌</span>}
              </p>
            </div>
          </div>

          {/* Bottom: Tap to continue */}
          <div className="z-10 pb-4 animate-pulse">
            <p className="text-rose-500/50 text-[10px] font-bold uppercase tracking-widest">
              {typewriterDone ? '▸ Toucher pour continuer' : '▸ Toucher pour accélérer'}
            </p>
          </div>
        </div>
      );
    }

    // Default non-boss failed screen
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6 text-center">
        <div className="w-32 h-32 mb-4 relative flex items-center justify-center">
          <TransparentImage src="/castle_gate.png" alt="Porte fermée" className="absolute inset-0 w-full h-full object-contain opacity-60" />
          <Mascot mood="sad" className="w-16 h-16 z-10 mt-6" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 mt-4 font-gothic tracking-wide uppercase">DÉFAITE AU COMBAT...</h2>
        <p className="text-slate-600 font-semibold mt-2 max-w-md leading-relaxed">
          Le boss **{bossDetails.name}** vous a terrassé ! Votre gargouille a été changée en statue de pierre inerte. Révisez le grimoire de théorie pour régénérer vos PV.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={onReviewTheory}
            className="btn-3d bg-sky-500 hover:bg-sky-600 border-2 border-sky-600 text-white font-extrabold uppercase tracking-wide py-3 px-8 rounded-2xl font-gothic"
            style={{ ['--btn-shadow' as string]: '#0284c7' }}
          >
            📜 Consulter le grimoire
          </button>
          <button
            onClick={onQuit}
            className="btn-3d bg-white hover:bg-slate-50 text-slate-700 font-extrabold uppercase tracking-wide py-3 px-8 rounded-2xl border-2 border-slate-300"
            style={{ ['--btn-shadow' as string]: '#94a3b8' }}
          >
            Fuir au parcours
          </button>
        </div>
      </div>
    );
  }

  if (!question) return null;

  const isChecked = phase === 'correct' || phase === 'incorrect';

  // Renders the Spell Cards (Duolingo multiple choice transformed to Card-Battle Hand)
  const renderSpellCards = (options: string[], solution: string) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center py-2">
        {options.map((option, idx) => {
          const selected = answers[0] === option;
          
          let cardBorderColor = 'border-amber-300';
          let cardBg = 'bg-amber-50/40 hover:bg-amber-50/70 dark:bg-slate-900';
          let shadowStyle = '0 4px 6px -1px rgba(212, 175, 55, 0.2)';
          let fontColor = 'text-slate-800';

          if (isChecked) {
            if (option === solution) {
              cardBorderColor = 'border-emerald-500';
              cardBg = 'bg-emerald-50';
              fontColor = 'text-emerald-800';
              shadowStyle = '0 4px 10px rgba(16, 185, 129, 0.3)';
            } else if (selected) {
              cardBorderColor = 'border-rose-500';
              cardBg = 'bg-rose-50';
              fontColor = 'text-rose-800 line-through';
              shadowStyle = '0 4px 10px rgba(239, 68, 68, 0.3)';
            } else {
              cardBorderColor = 'border-slate-200';
              cardBg = 'bg-slate-100 opacity-40';
              fontColor = 'text-slate-400';
            }
          } else if (selected) {
            cardBorderColor = 'border-sky-500 ring-2 ring-sky-300';
            cardBg = 'bg-sky-50';
            fontColor = 'text-sky-850';
            shadowStyle = '0 6px 15px rgba(56, 189, 248, 0.45)';
          }

          return (
            <button
              key={option}
              disabled={isChecked}
              onClick={() => setAnswer(0, option)}
              className="spell-card p-4 flex flex-col justify-between text-left h-32 focus:outline-none transition-all duration-200"
              style={{ 
                borderWidth: '3px',
                borderColor: cardBorderColor.split(' ')[0].replace('border-', '#'), // fallback style key integration
                boxShadow: shadowStyle
              }}
            >
              {/* Card Header/Type */}
              <div className="flex justify-between items-center w-full">
                <span className="text-[8px] font-black uppercase tracking-widest text-amber-800/80 font-gothic">
                  Sort {idx + 1}
                </span>
                <span className="text-xs">🔮</span>
              </div>
              
              {/* Spell Incantation (Option value) */}
              <div className={`font-gothic font-extrabold text-sm ${fontColor} leading-tight py-2 text-center w-full`}>
                {option}
              </div>

              {/* Card Footer */}
              <div className="text-[7px] text-slate-400 font-bold uppercase tracking-wider text-right w-full">
                Cible : Unique
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderQuestion = () => {
    switch (question.kind) {
      case 'mc':
      case 'classify': {
        const options = question.kind === 'mc' ? question.options : question.categories;
        const solution = question.kind === 'mc' ? question.answer : question.answer;
        return (
          <div className="space-y-4">
            {question.kind === 'classify' && (
              <p className="text-center text-3xl font-black text-slate-800 bg-white/70 border-3 border-slate-300 rounded-2xl py-5 font-gothic shadow-xs">
                {question.word}
              </p>
            )}
            {question.kind === 'mc' && (
              <p className="text-lg font-bold text-slate-700 text-center py-1 bg-slate-50 rounded-xl border border-slate-200/50">{question.prompt}</p>
            )}
            {renderSpellCards(options, solution)}
          </div>
        );
      }
      case 'accent':
        return (
          <div className="space-y-4 text-center">
            <p className="text-3xl font-black text-slate-800 bg-white/70 border-3 border-slate-300 rounded-2xl py-6 font-gothic shadow-xs">
              {question.word}
            </p>
            <input
              type="text"
              autoFocus
              value={answers[0] ?? ''}
              disabled={isChecked}
              onChange={e => setAnswer(0, e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCheck()}
              placeholder="Invoquez l'orthographe corrigée..."
              className="w-full text-center text-2xl font-bold px-4 py-3 border-3 border-slate-300 rounded-2xl bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-200/50 outline-none"
            />
            <div className="flex justify-center gap-2 flex-wrap">
              {['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'].map(ch => (
                <button
                  key={ch}
                  disabled={isChecked}
                  onClick={() => setAnswer(0, (answers[0] ?? '') + ch)}
                  className="btn-3d bg-white border-2 border-slate-250 rounded-xl w-10 h-10 font-extrabold text-lg text-sky-750 hover:bg-sky-50"
                  style={{ ['--btn-shadow' as string]: '#cbd5e1' }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        );
      case 'fill': {
        let inputIndex = -1;
        return (
          <div className="space-y-4">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{question.instructions}</p>
            <div className="bg-white border-3 border-slate-300 rounded-2xl p-6 text-lg leading-loose text-slate-800 font-semibold shadow-xs">
              {question.parts.map((part, i) => {
                const showInput = i < question.solutions.length;
                if (showInput) inputIndex++;
                const idx = inputIndex;
                const solLength = showInput ? (question.solutions[idx]?.length || 2) : 2;
                const isSingleCorrect = showInput && (answers[idx] ?? '').trim().toLowerCase() === (question.solutions[idx] ?? '').trim().toLowerCase();

                return (
                  <React.Fragment key={i}>
                    <span>{part}</span>
                    {showInput && (
                      <input
                        type="text"
                        value={answers[idx] ?? ''}
                        disabled={isChecked}
                        onChange={e => setAnswer(idx, e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleCheck()}
                        style={{
                          width: `${Math.max(1.5, solLength * 0.85 + 0.65)}em`,
                          height: '1.4em',
                          verticalAlign: 'baseline',
                        }}
                        className={`inline-block text-center border-x-0 border-t-0 border-b-2 rounded-t-sm outline-none font-bold transition-colors px-1 mx-0.5 ${
                          isChecked
                            ? isSingleCorrect
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                              : 'border-rose-500 bg-rose-50 text-rose-750 line-through'
                            : 'border-dashed border-slate-400 bg-amber-50/20 focus:bg-amber-50/40 focus:border-solid focus:border-sky-500'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="flex gap-2 flex-wrap">
              {['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'].map(ch => (
                <button
                  key={ch}
                  disabled={isChecked}
                  onClick={() => {
                    const lastIdx = Math.max(0, answers.length - 1);
                    setAnswer(lastIdx, (answers[lastIdx] ?? '') + ch);
                  }}
                  className="btn-3d bg-white border-2 border-slate-250 rounded-xl w-10 h-10 font-extrabold text-sky-750 hover:bg-sky-50"
                  style={{ ['--btn-shadow' as string]: '#cbd5e1' }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        );
      }
      case 'translate':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mascot mood="thinking" className="w-16 h-16 flex-shrink-0" />
              <div className="animate-bubble-in relative bg-white border-2 border-slate-350 rounded-xl px-4 py-2 shadow-md">
                <p className="font-extrabold text-slate-800 text-sm leading-relaxed">"{question.french}"</p>
                <div className="absolute -left-2 top-3 w-3.5 h-3.5 bg-white border-l-2 border-b-2 border-slate-350 rotate-45"></div>
              </div>
            </div>
            <textarea
              value={answers[0] ?? ''}
              disabled={isChecked}
              onChange={e => setAnswer(0, e.target.value)}
              placeholder="Invoquez la traduction en espagnol..."
              rows={3}
              className="w-full text-lg font-semibold px-4 py-3.5 border-3 border-slate-300 rounded-2xl bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-200/50 outline-none resize-none"
            />
            <div className="flex gap-2 flex-wrap">
              {['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ', '¿', '¡'].map(ch => (
                <button
                  key={ch}
                  disabled={isChecked}
                  onClick={() => setAnswer(0, (answers[0] ?? '') + ch)}
                  className="btn-3d bg-white border-2 border-slate-250 rounded-xl w-10 h-10 font-extrabold text-sky-750 hover:bg-sky-50"
                  style={{ ['--btn-shadow' as string]: '#cbd5e1' }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        );
      case 'order': {
        const pickTile = (idx: number) => {
          if (isChecked || orderPicked.includes(idx)) return;
          playRpgSound('click');
          const next = [...orderPicked, idx];
          setOrderPicked(next);
          setAnswer(0, next.map(i => question.words[i]).join(' '));
        };
        const unpickTile = (pos: number) => {
          if (isChecked) return;
          playRpgSound('click');
          const next = orderPicked.filter((_, i) => i !== pos);
          setOrderPicked(next);
          setAnswer(0, next.map(i => question.words[i]).join(' '));
        };
        return (
          <div className="space-y-4">
            {question.translation && (
              <div className="flex items-start gap-3">
                <Mascot mood="thinking" className="w-14 h-14 flex-shrink-0" />
                <div className="animate-bubble-in relative bg-white border-2 border-slate-350 rounded-xl px-4 py-2 shadow-md">
                  <p className="font-extrabold text-slate-800 text-sm leading-relaxed">"{question.translation}"</p>
                  <div className="absolute -left-2 top-3 w-3.5 h-3.5 bg-white border-l-2 border-b-2 border-slate-350 rotate-45"></div>
                </div>
              </div>
            )}
            {/* Zone de construction de la phrase */}
            <div className="min-h-[3.5rem] bg-white border-3 border-dashed border-slate-300 rounded-2xl p-3 flex flex-wrap gap-2 items-center">
              {orderPicked.length === 0 && (
                <span className="text-slate-400 text-sm font-semibold italic px-1">Touchez les tuiles pour composer la phrase...</span>
              )}
              {orderPicked.map((wordIdx, pos) => (
                <button
                  key={`${wordIdx}-${pos}`}
                  disabled={isChecked}
                  onClick={() => unpickTile(pos)}
                  className="btn-3d bg-sky-50 hover:bg-sky-100 border-2 border-sky-400 rounded-xl px-3 py-1.5 font-extrabold text-sky-800 text-base animate-pop-in"
                  style={{ ['--btn-shadow' as string]: '#7dd3fc' }}
                >
                  {question.words[wordIdx]}
                </button>
              ))}
            </div>
            {/* Tuiles disponibles */}
            <div className="flex flex-wrap gap-2 justify-center">
              {question.words.map((word, idx) => {
                const used = orderPicked.includes(idx);
                return (
                  <button
                    key={idx}
                    disabled={isChecked || used}
                    onClick={() => pickTile(idx)}
                    className={`btn-3d border-2 rounded-xl px-3 py-1.5 font-extrabold text-base transition-all ${
                      used
                        ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-default'
                        : 'bg-white hover:bg-amber-50 border-slate-300 text-slate-800'
                    }`}
                    style={{ ['--btn-shadow' as string]: used ? '#e2e8f0' : '#cbd5e1' }}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>
        );
      }
      case 'match': {
        const lefts = question.pairs.map(p => p.left);
        const rights = rightOrder.length === question.pairs.length ? rightOrder : question.pairs.map(p => p.right);
        const rightMatched = (r: string) =>
          question.pairs.some(p => p.right === r && matchedLefts.includes(p.left));
        return (
          <div className="space-y-3">
            <p className="text-center text-xs font-black text-slate-500 uppercase tracking-widest">
              Touchez une rune à gauche, puis sa jumelle à droite
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                {lefts.map(left => {
                  const done = matchedLefts.includes(left);
                  const selected = selectedLeft === left;
                  return (
                    <button
                      key={left}
                      disabled={done || isChecked}
                      onClick={() => handleMatchTap('left', left)}
                      className={`w-full btn-3d border-2 rounded-xl px-3 py-2.5 font-extrabold text-sm transition-all ${
                        done
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-500 cursor-default'
                          : selected
                            ? 'bg-sky-100 border-sky-500 text-sky-800 ring-2 ring-sky-300'
                            : 'bg-white hover:bg-amber-50 border-slate-300 text-slate-800'
                      }`}
                      style={{ ['--btn-shadow' as string]: done ? '#a7f3d0' : selected ? '#7dd3fc' : '#cbd5e1' }}
                    >
                      {done ? '✓ ' : ''}{left}
                    </button>
                  );
                })}
              </div>
              <div className="space-y-2">
                {rights.map(right => {
                  const done = rightMatched(right);
                  const flashing = matchFlash === right;
                  return (
                    <button
                      key={right}
                      disabled={done || isChecked}
                      onClick={() => handleMatchTap('right', right)}
                      className={`w-full btn-3d border-2 rounded-xl px-3 py-2.5 font-extrabold text-sm transition-all ${
                        done
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-500 cursor-default'
                          : flashing
                            ? 'bg-rose-100 border-rose-500 text-rose-700 animate-shake'
                            : 'bg-white hover:bg-amber-50 border-slate-300 text-slate-800'
                      }`}
                      style={{ ['--btn-shadow' as string]: done ? '#a7f3d0' : flashing ? '#fda4af' : '#cbd5e1' }}
                    >
                      {done ? '✓ ' : ''}{right}
                    </button>
                  );
                })}
              </div>
            </div>
            {matchWrongTaps > 0 && (
              <p className="text-center text-xs font-bold text-rose-500">
                💥 {matchWrongTaps} rune{matchWrongTaps > 1 ? 's' : ''} mal appariée{matchWrongTaps > 1 ? 's' : ''} — le sans-faute s'envole !
              </p>
            )}
          </div>
        );
      }
      case 'listen':
        return (
          <div className="space-y-4 text-center">
            <div className="flex justify-center gap-3">
              <button
                onClick={() => { playRpgSound('click'); speakSpanish(question.text); }}
                className="btn-3d bg-sky-500 hover:bg-sky-600 border-2 border-sky-600 text-white font-extrabold uppercase tracking-wide py-3 px-6 rounded-2xl text-sm font-gothic"
                style={{ ['--btn-shadow' as string]: '#0284c7' }}
              >
                🔊 Écouter
              </button>
              <button
                onClick={() => { playRpgSound('click'); speakSpanish(question.text, 0.55); }}
                className="btn-3d bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-700 font-extrabold uppercase tracking-wide py-3 px-5 rounded-2xl text-sm font-gothic"
                style={{ ['--btn-shadow' as string]: '#cbd5e1' }}
                title="Vitesse lente"
              >
                🐢 Lentement
              </button>
            </div>
            <input
              type="text"
              autoFocus
              value={answers[0] ?? ''}
              disabled={isChecked}
              onChange={e => setAnswer(0, e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCheck()}
              placeholder="Écrivez ce que vous entendez..."
              className="w-full text-center text-xl font-bold px-4 py-3 border-3 border-slate-300 rounded-2xl bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-200/50 outline-none"
            />
            <div className="flex justify-center gap-2 flex-wrap">
              {['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'].map(ch => (
                <button
                  key={ch}
                  disabled={isChecked}
                  onClick={() => setAnswer(0, (answers[0] ?? '') + ch)}
                  className="btn-3d bg-white border-2 border-slate-250 rounded-xl w-10 h-10 font-extrabold text-lg text-sky-750 hover:bg-sky-50"
                  style={{ ['--btn-shadow' as string]: '#cbd5e1' }}
                >
                  {ch}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 font-semibold">
              Astuce : la voix espagnole vient de votre navigateur — réécoutez autant de fois que nécessaire !
            </p>
          </div>
        );
    }
  };

  const renderDirectInputContent = () => {
    switch (question.kind) {
      case 'accent':
        return (
          <div className="space-y-4 text-center">
            <p className="text-2xl font-black text-slate-800 bg-white/70 border-2 border-slate-300 rounded-2xl py-4 font-gothic shadow-xs">
              {question.word}
            </p>
            <input
              type="text"
              autoFocus
              value={answers[0] ?? ''}
              disabled={isChecked || isWaitingForPlayerRoll || isRolling}
              onChange={e => setAnswer(0, e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCheck()}
              placeholder="Invoquez l'orthographe corrigée..."
              className="w-full text-center text-lg sm:text-2xl font-bold px-4 py-2 sm:py-3 border-3 border-amber-800/20 rounded-2xl bg-white focus:border-amber-600 focus:ring-4 focus:ring-amber-200 outline-none"
            />
            <div className="flex justify-center gap-2 flex-wrap">
              {['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'].map(ch => (
                <button
                  key={ch}
                  disabled={isChecked || isWaitingForPlayerRoll || isRolling}
                  onClick={() => setAnswer(0, (answers[0] ?? '') + ch)}
                  className="btn-3d bg-white border-2 border-slate-250 rounded-xl w-9 h-9 font-extrabold text-lg text-amber-900 hover:bg-amber-50"
                  style={{ ['--btn-shadow' as string]: '#cbd5e1' }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        );
      case 'fill': {
        let inputIndex = -1;
        return (
          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{question.instructions}</p>
            <div className="bg-white border-2 border-amber-800/10 rounded-2xl p-4 text-sm sm:text-base leading-loose text-slate-800 font-semibold shadow-inner text-left">
              {question.parts.map((part, i) => {
                const showInput = i < question.solutions.length;
                if (showInput) inputIndex++;
                const idx = inputIndex;
                const solLength = showInput ? (question.solutions[idx]?.length || 2) : 2;
                const isSingleCorrect = showInput && (answers[idx] ?? '').trim().toLowerCase() === (question.solutions[idx] ?? '').trim().toLowerCase();

                return (
                  <React.Fragment key={i}>
                    <span>{part}</span>
                    {showInput && (
                      <input
                        type="text"
                        value={answers[idx] ?? ''}
                        disabled={isChecked || isWaitingForPlayerRoll || isRolling}
                        onChange={e => setAnswer(idx, e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleCheck()}
                        style={{
                          width: `${Math.max(1.5, solLength * 0.85 + 0.65)}em`,
                          height: '1.4em',
                          verticalAlign: 'baseline',
                        }}
                        className={`inline-block text-center border-x-0 border-t-0 border-b-2 rounded-t-sm outline-none font-bold transition-colors px-1 mx-0.5 ${
                          isChecked
                            ? isSingleCorrect
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                              : 'border-rose-500 bg-rose-50 text-rose-750 line-through'
                            : 'border-dashed border-slate-400 bg-amber-50/20 focus:bg-amber-50/40 focus:border-solid focus:border-amber-600'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="flex gap-2 flex-wrap">
              {['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'].map(ch => (
                <button
                  key={ch}
                  disabled={isChecked || isWaitingForPlayerRoll || isRolling}
                  onClick={() => {
                    const lastIdx = Math.max(0, answers.length - 1);
                    setAnswer(lastIdx, (answers[lastIdx] ?? '') + ch);
                  }}
                  className="btn-3d bg-white border-2 border-slate-250 rounded-xl w-9 h-9 font-extrabold text-amber-900 hover:bg-amber-50"
                  style={{ ['--btn-shadow' as string]: '#cbd5e1' }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        );
      }
      case 'translate':
        return (
          <div className="space-y-3">
            <div className="flex items-start gap-2 text-left">
              <div className="animate-bubble-in relative bg-white border-2 border-amber-900/10 rounded-xl px-4 py-2 shadow-sm flex-1">
                <p className="font-extrabold text-slate-800 text-sm leading-relaxed">"{question.french}"</p>
              </div>
            </div>
            <textarea
              value={answers[0] ?? ''}
              disabled={isChecked || isWaitingForPlayerRoll || isRolling}
              onChange={e => setAnswer(0, e.target.value)}
              placeholder="Invoquez la traduction en espagnol..."
              rows={2}
              className="w-full text-base font-semibold px-4 py-3 border-2 border-amber-900/10 rounded-2xl bg-white focus:border-amber-600 focus:ring-4 focus:ring-amber-200 outline-none resize-none"
            />
            <div className="flex gap-2 flex-wrap">
              {['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ', '¿', '¡'].map(ch => (
                <button
                  key={ch}
                  disabled={isChecked || isWaitingForPlayerRoll || isRolling}
                  onClick={() => setAnswer(0, (answers[0] ?? '') + ch)}
                  className="btn-3d bg-white border-2 border-slate-250 rounded-xl w-9 h-9 font-extrabold text-amber-900 hover:bg-amber-50"
                  style={{ ['--btn-shadow' as string]: '#cbd5e1' }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderVoiceOfCardsBoard = () => {
    return (
      <div className="min-h-screen wood-table text-slate-800 flex flex-col select-none relative overflow-y-auto font-sans">
        {/* Floating Accents / Runes backdrop details */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
          <span className="absolute top-[20%] left-[10%] text-6xl font-black">¿</span>
          <span className="absolute top-[60%] right-[15%] text-7xl font-black">ñ</span>
          <span className="absolute bottom-[20%] left-[30%] text-8xl font-black">á</span>
        </div>

        {/* 1. Header Area */}
        <header className="w-full max-w-lg mx-auto flex items-center justify-between gap-3 z-20 px-3 pt-3 pb-1">
          <button 
            onClick={() => { playRpgSound('click'); onQuit(); }} 
            title="Fuir le combat" 
            className="text-amber-800 hover:text-amber-955 text-lg font-bold font-gothic bg-amber-50 border-2 border-amber-800/60 rounded-xl w-9 h-9 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md flex-shrink-0"
          >
            ✕
          </button>
          
          {/* GM Dialogue Scroll Panel */}
          <div className="flex-1 bg-amber-50/95 border-2 border-amber-900/80 rounded-2xl px-3 py-2 text-center shadow-lg font-gothic text-[10px] sm:text-xs text-amber-900 font-extrabold italic leading-tight">
            🗣️ {gmText}
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-1.5 font-extrabold text-red-500 bg-amber-50/90 border-2 border-amber-800/40 px-2 py-1 rounded-xl shadow-md flex-shrink-0" title="Points de Vie">
            <span className="text-base">❤️</span>
            <span className="font-gothic text-[10px]">{gargoyleHp}/5</span>
          </div>
        </header>

        {/* 2. Vertical Battle Arena: Boss on top, Player on bottom */}
        <main className="flex-1 max-w-lg w-full mx-auto flex flex-col items-center z-10 px-3 py-2 gap-2">
          
          {/* Boss Card - Top */}
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-black uppercase tracking-wider text-amber-100/40 mb-1 font-gothic">Gardien</span>
            <div 
              className={`rpg-card w-40 h-52 sm:w-48 sm:h-64 p-2 relative flex flex-col justify-between transition-all duration-300 ${
                bossFlashing ? 'animate-shake-card bg-red-500/20' : ''
              } ${
                bossHp <= 40 ? 'card-low-hp card-cracked' : ''
              }`}
              style={{ transform: bossFlashing ? 'scale(1.05) rotate(2deg)' : 'none' }}
            >
              {/* Floating Dmg over boss */}
              {floatingDmg && floatingDmg.target === 'boss' && (
                <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-black drop-shadow-lg z-50 animate-dmg-float ${
                  floatingDmg.isHeal ? 'text-emerald-500' : 'text-rose-600'
                }`}>
                  {floatingDmg.isHeal ? '+' : '-'}{floatingDmg.value} HP
                </span>
              )}
              {/* Card Title */}
              <div className="text-[9px] sm:text-[11px] font-black uppercase text-amber-900 text-center tracking-wider border-b-2 border-amber-900/20 pb-0.5 truncate max-w-full" title={bossDetails.name}>
                {bossDetails.name}
              </div>
              {/* Card Illustration - dynamic based on HP */}
              <div className="flex-1 my-1 overflow-hidden rounded-lg bg-amber-900/10 border border-amber-900/10 flex items-center justify-center">
                <img 
                  src={asset(bossCurrentImage)} 
                  alt={bossDetails.name} 
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
              {/* Boss HP Bar */}
              <div className="space-y-1">
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-350">
                  <div className={`h-full rounded-full transition-all duration-500 ${
                    bossHp <= 30 ? 'bg-red-700 animate-pulse' : bossHp <= 60 ? 'bg-orange-500' : 'bg-red-600'
                  }`} style={{ width: `${bossHp}%` }} />
                </div>
                <div className="flex justify-between text-[8px] sm:text-[10px] font-extrabold text-amber-900">
                  <span>HP : {bossHp}%</span>
                  <span>ATK : 9</span>
                </div>
              </div>
            </div>
          </div>

          {/* VS / Dice Area - Middle */}
          <div className="flex items-center gap-3 py-1">
            <div className="font-gothic font-black text-amber-100/30 italic text-sm tracking-widest">
              ⚔️ VS ⚔️
            </div>
            {(isRolling || diceValue !== null) && (
              <div className="flex items-center gap-2">
                <div 
                  className={`w-10 h-10 sm:w-12 sm:h-12 bg-red-800 border-2 border-amber-400 rounded-xl shadow-2xl flex items-center justify-center font-gothic font-black text-white text-lg sm:text-xl ${isRolling ? 'animate-dice-roll' : 'ring-2 ring-amber-400/50'}`}
                >
                  {isRolling ? '?' : diceValue}
                </div>
                <span className="text-[7px] text-amber-100/70 font-bold uppercase tracking-widest">
                  {isRolling ? 'Dé...' : `= ${diceValue}`}
                </span>
              </div>
            )}
            {rollRequired && !isRolling && diceValue === null && (
              <button
                onClick={handlePlayerDiceRoll}
                onMouseEnter={() => playRpgSound('hover')}
                className="btn-3d bg-amber-500 hover:bg-amber-600 border-2 border-amber-600 text-white font-extrabold uppercase tracking-widest py-1.5 px-4 rounded-xl text-[10px] sm:text-xs font-gothic animate-pulse shadow-md"
                style={{ ['--btn-shadow' as string]: '#d97706' }}
              >
                🎲 Lancer le dé
              </button>
            )}
          </div>

          {/* Player Gargui Card - Bottom */}
          <div className="flex flex-col items-center">
            <div 
              className={`rpg-card w-36 h-44 sm:w-44 sm:h-56 p-2 relative flex flex-col justify-between transition-all duration-300 ${
                gargoyleFlashing ? 'animate-shake-card bg-red-500/20' : ''
              } ${
                gargoyleHp <= 2 ? 'card-low-hp card-cracked' : ''
              } ${
                isWaitingForPlayerRoll ? 'card-glowing' : ''
              } ${
                hasShield ? 'card-shielded' : ''
              }`}
            >
              {/* Shield Overlay Badge */}
              {hasShield && (
                <div className="absolute -top-3 -right-3 bg-sky-500 border-2 border-white text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg animate-shield-pulse">
                  🛡️
                </div>
              )}
              {/* Floating Dmg or Heal over player */}
              {floatingDmg && floatingDmg.target === 'player' && (
                <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-black drop-shadow-lg z-50 animate-dmg-float ${
                  floatingDmg.isHeal ? 'text-emerald-500' : 'text-rose-600'
                }`}>
                  {floatingDmg.isHeal ? '+' : '-'}{floatingDmg.value} PV
                </span>
              )}
              {/* Card Title */}
              <div className="text-[9px] sm:text-[11px] font-black uppercase text-amber-900 text-center tracking-wider border-b border-amber-900/20 pb-0.5">
                Gargui
              </div>
              {/* Card Illustration */}
              <div className="flex-1 my-1 overflow-hidden rounded-lg bg-amber-900/10 border border-amber-900/10 flex items-center justify-center">
                <img 
                  src={asset('/card_gargui.png')} 
                  alt="Gargui" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Player HP stats */}
              <div className="space-y-1">
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-355">
                  <div className="bg-red-500 h-full rounded-full transition-all" style={{ width: `${(gargoyleHp / 5) * 100}%` }} />
                </div>
                <div className="flex justify-between text-[8px] sm:text-[10px] font-extrabold text-amber-900">
                  <span>HP : {gargoyleHp}/5 PV</span>
                  <span>MANA : {progressPct}%</span>
                </div>
              </div>
            </div>
            <span className="text-[8px] font-black uppercase tracking-wider text-amber-100/40 mt-1 font-gothic">Votre Héros</span>
          </div>
        </main>

        {/* 3. Question / Spell Cards / Action Cards */}
        <section className="w-full max-w-lg mx-auto z-25 px-3 space-y-2 pb-2">
          
          {/* Question panel (only during question phase) */}
          {battlePhase === 'question' && phase === 'answering' && (
            <div className="bg-amber-50/95 border-2 border-amber-900/80 rounded-2xl p-3 sm:p-4 text-center shadow-xl space-y-2 relative">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-gothic border-b border-slate-300 pb-1">
                {questionTitle(question)}
              </h3>
              {question.kind !== 'translate' && (question as any).prompt && (
                <p className="text-sm font-bold text-slate-700">{(question as any).prompt}</p>
              )}
              {(question.kind === 'accent' || question.kind === 'fill' || question.kind === 'translate') && (
                <div className="pt-1">{renderDirectInputContent()}</div>
              )}
            </div>
          )}

          {/* Action Choice text panel */}
          {battlePhase !== 'question' && (
            <div className="bg-amber-50/95 border-2 border-amber-900/80 rounded-2xl p-3 text-center shadow-xl space-y-1 relative animate-bubble-in">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-gothic border-b border-slate-300 pb-0.5">
                RÉSOLUTION TACTIQUE
              </h3>
              <p className="text-xs sm:text-sm font-extrabold text-amber-900">
                {chosenAction === 'attack' ? "🔥 Attaque de Feu !" :
                 chosenAction === 'heal' ? "❄️ Magie curative !" :
                 chosenAction === 'shield' ? "⚡ Bouclier de Foudre !" :
                 "Choisissez votre action :"}
              </p>
            </div>
          )}

          {/* Tactical Action choices rendered as Cards */}
          {battlePhase === 'action-choice' && (
            <div className="flex justify-center gap-2 sm:gap-3 py-1 animate-pop-in">
              <button
                onMouseEnter={() => playRpgSound('hover')}
                onClick={() => {
                  setChosenAction('attack');
                  setBattlePhase('player-roll');
                  setRollRequired(true);
                  setIsWaitingForPlayerRoll(true);
                  playRpgSound('click');
                  setGmText("Le Maître du Jeu : Sort ATACAR 🔥 chargé ! Lancez le dé !");
                }}
                className="rpg-card w-[100px] h-[140px] sm:w-[130px] sm:h-[180px] p-1.5 sm:p-2 flex flex-col justify-between text-center focus:outline-none transition-all duration-200 border-2 rounded-xl shadow-md bg-red-50/95 border-red-600 hover:border-red-700 hover:-translate-y-2 hover:shadow-lg"
              >
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider font-gothic text-red-900/70">ATACAR</span>
                <div className="flex-1 flex flex-col justify-center items-center">
                  <span className="text-2xl sm:text-3xl">⚔️🔥</span>
                  <p className="font-gothic font-black text-[9px] sm:text-xs text-red-950 mt-1">Feu destructeur</p>
                </div>
                <p className="text-[6px] sm:text-[7px] text-red-900/60 font-bold">Dégâts = 20 + Dé×2</p>
              </button>

              <button
                onMouseEnter={() => playRpgSound('hover')}
                onClick={() => {
                  setChosenAction('heal');
                  setBattlePhase('player-roll');
                  setRollRequired(true);
                  setIsWaitingForPlayerRoll(true);
                  playRpgSound('click');
                  setGmText("Le Maître du Jeu : Sort CURAR ❄️ chargé ! Lancez le dé !");
                }}
                className="rpg-card w-[100px] h-[140px] sm:w-[130px] sm:h-[180px] p-1.5 sm:p-2 flex flex-col justify-between text-center focus:outline-none transition-all duration-200 border-2 rounded-xl shadow-md bg-cyan-50/95 border-cyan-500 hover:border-cyan-600 hover:-translate-y-2 hover:shadow-lg"
              >
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider font-gothic text-cyan-900/70">CURAR</span>
                <div className="flex-1 flex flex-col justify-center items-center">
                  <span className="text-2xl sm:text-3xl">💖❄️</span>
                  <p className="font-gothic font-black text-[9px] sm:text-xs text-cyan-950 mt-1">Eau de vie</p>
                </div>
                <p className="text-[6px] sm:text-[7px] text-cyan-900/60 font-bold">Soin = Dé / 2 PV</p>
              </button>

              <button
                onMouseEnter={() => playRpgSound('hover')}
                onClick={() => {
                  setChosenAction('shield');
                  setBattlePhase('player-roll');
                  setRollRequired(true);
                  setIsWaitingForPlayerRoll(true);
                  playRpgSound('click');
                  setGmText("Le Maître du Jeu : Sort ESCUDO ⚡ chargé ! Lancez le dé !");
                }}
                className="rpg-card w-[100px] h-[140px] sm:w-[130px] sm:h-[180px] p-1.5 sm:p-2 flex flex-col justify-between text-center focus:outline-none transition-all duration-200 border-2 rounded-xl shadow-md bg-amber-50/95 border-amber-500 hover:border-amber-600 hover:-translate-y-2 hover:shadow-lg"
              >
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider font-gothic text-amber-900/70">ESCUDO</span>
                <div className="flex-1 flex flex-col justify-center items-center">
                  <span className="text-2xl sm:text-3xl">🛡️⚡</span>
                  <p className="font-gothic font-black text-[9px] sm:text-xs text-amber-955 mt-1">Parade foudre</p>
                </div>
                <p className="text-[6px] sm:text-[7px] text-amber-900/60 font-bold">15 Dmg + Parade</p>
              </button>
            </div>
          )}

          {/* Spell Card Selection - Auto-check on click for MC/classify */}
          {battlePhase === 'question' && phase === 'answering' && (question.kind === 'mc' || question.kind === 'classify') && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 py-1">
              {(question.kind === 'mc' ? question.options : question.categories).map((option, idx) => {
                const spellInfo = getSpellInfo(idx, option);

                return (
                  <button
                    key={option}
                    disabled={isRolling}
                    onMouseEnter={() => !isRolling && playRpgSound('hover')}
                    onClick={() => handleBossCardSelect(option, idx)}
                    className={`rpg-card w-[105px] h-[150px] sm:w-[135px] sm:h-[190px] p-2 flex flex-col justify-between text-left focus:outline-none transition-all duration-200 border-2 rounded-xl shadow-md ${spellInfo.bg} ${spellInfo.border} hover:-translate-y-2 hover:shadow-lg active:scale-95`}
                  >
                    <div className="flex justify-between items-center w-full border-b border-amber-900/10 pb-0.5">
                      <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-wider font-gothic text-amber-900/60 truncate max-w-[75%]">
                        {spellInfo.name}
                      </span>
                      <span className="text-xs" title={spellInfo.element}>{spellInfo.emoji}</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center my-1">
                      <p className="text-[5px] sm:text-[7px] uppercase tracking-wider text-slate-455 font-bold text-center">Incantation</p>
                      <div className={`font-gothic font-extrabold text-[9px] sm:text-[11px] leading-snug py-1 text-center w-full ${spellInfo.text}`}>
                        {option}
                      </div>
                    </div>
                    <div className="border-t border-amber-900/10 pt-1 text-center w-full">
                      <p className="text-[6px] sm:text-[7px] text-slate-500 font-semibold leading-tight">
                        {spellInfo.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Manual submit button for fill/accent/translate only */}
          {phase === 'answering' && battlePhase === 'question' && question.kind !== 'mc' && question.kind !== 'classify' && (
            <div className="flex justify-center pt-1">
              <button
                onClick={() => { playRpgSound('click'); handleCheck(); }}
                disabled={!hasAnswer}
                className="btn-3d bg-amber-500 disabled:bg-slate-700/50 disabled:text-slate-500 border-2 border-amber-600 text-white font-extrabold uppercase tracking-widest py-3 px-10 rounded-2xl text-sm disabled:cursor-not-allowed font-gothic shadow-lg"
                style={{ ['--btn-shadow' as string]: hasAnswer ? '#d97706' : '#57534e' }}
              >
                Lancer le sort
              </button>
            </div>
          )}
          
          {/* Continue panel after correct/incorrect resolution */}
          {isChecked && !isWaitingForPlayerRoll && !isRolling && (
            <div className="animate-slide-up flex flex-col gap-3 bg-amber-50/95 border-2 border-amber-900/80 rounded-2xl p-3 sm:p-4 shadow-xl">
              <div className="flex items-start gap-3">
                <span className="text-2xl animate-pop-in">{phase === 'correct' ? '⚔️' : '💥'}</span>
                <div className="flex-1">
                  {phase === 'correct' ? (
                    <p className="font-extrabold text-emerald-800 text-sm sm:text-base font-gothic tracking-wide">
                      {chosenAction === 'attack' ? "🔥 Attaque réussie !" :
                       chosenAction === 'heal' ? "❄️ Soin réussi !" :
                       "⚡ Bouclier déployé !"}
                    </p>
                  ) : (
                    <>
                      <p className="font-extrabold text-rose-800 text-sm font-gothic">
                        Sort raté ! Le Boss contre-attaque !
                      </p>
                      <p className="font-bold text-rose-805 text-xs mt-0.5">
                        Réponse : <span className="underline">{correctAnswerText(question)}</span>
                      </p>
                      <p className="text-rose-900/70 text-xs mt-1">{question.hint}</p>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => { playRpgSound('click'); handleContinue(); }}
                autoFocus
                className={`btn-3d w-full ${phase === 'correct' ? 'bg-amber-500 border-amber-600' : 'bg-red-600 border-red-700'} text-white font-extrabold uppercase tracking-wide py-3 rounded-2xl text-sm font-gothic`}
                style={{ ['--btn-shadow' as string]: phase === 'correct' ? '#d97706' : '#991b1b' }}
              >
                Continuer →
              </button>
            </div>
          )}
        </section>
      </div>
    );
  };

  if (isBossNode && phase !== 'finished' && phase !== 'failed') {
    return renderVoiceOfCardsBoard();
  }

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between">
      
      {/* Header bar: Exit, Mana, HP */}
      <header className="max-w-3xl w-full mx-auto px-4 pt-5">
        <div className="flex items-center justify-between gap-4">
          <button 
            onClick={onQuit} 
            title="Fuir le combat" 
            className="text-slate-400 hover:text-slate-650 text-xl font-bold font-gothic bg-white border-2 border-slate-300 rounded-xl w-10 h-10 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xs"
          >
            ✕
          </button>
          
          {/* Mana Bar */}
          <div className="flex-1 flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-450 tracking-wider uppercase font-gothic">Mana</span>
            <div className="flex-1 h-5 bg-slate-200/60 rounded-full overflow-hidden border-2 border-slate-300">
              <div
                className="mana-bar-fill h-full rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
          
          {/* PV health indicator */}
          <div className="flex items-center gap-1.5 font-extrabold text-red-500 bg-white border-2 border-slate-300 px-3 py-1 rounded-xl shadow-2xs" title="Points de Vie">
            <span className="text-lg">❤️</span>
            <span className="font-gothic text-xs">{gargoyleHp}/5 PV</span>
          </div>
        </div>
      </header>

      {/* RPG Boss Battle Arena (rendered at top if boss node) */}
      {isBossNode && (
        <div className="max-w-3xl w-full mx-auto px-4 mt-6">
          <div className="bg-slate-50/90 border-3 border-slate-300 rounded-2xl p-3 sm:p-5 shadow-md flex justify-between items-center relative overflow-hidden min-h-[6.5rem] sm:h-36">
            
            {/* Spell Projectile Particle Effect */}
            {projectileActive && (
              <span className="text-4xl absolute z-30 animate-projectile left-16 top-12">
                {projectileChar}
              </span>
            )}

            {/* Left side: Hero Gargouille */}
            <div className={`flex items-center gap-1.5 sm:gap-3 ${gargoyleFlashing ? 'animate-shake' : ''}`}>
              <Mascot mood={mascotMood} className={`w-11 h-11 sm:w-16 sm:h-16 ${gargoyleFlashing ? 'bg-red-500/20 rounded-full' : ''}`} />
              <div>
                <p className="hidden sm:block font-bold text-xs uppercase text-slate-450 tracking-wider font-gothic">Gargouille</p>
                <div className="w-14 sm:w-24 bg-slate-200 h-2 rounded-full border border-slate-300 overflow-hidden mt-1">
                  <div className="bg-red-500 h-full rounded-full transition-all" style={{ width: `${(gargoyleHp / 5) * 100}%` }} />
                </div>
                <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{gargoyleHp} / 5 PV</span>
              </div>
            </div>

            {/* Versus Crest */}
            <div className="font-gothic font-black text-slate-400 italic text-xs sm:text-xl border-2 border-slate-300 rounded-full w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center bg-white shadow-2xs flex-shrink-0">
              VS
            </div>

            {/* Right side: Boss */}
            <div className={`flex items-center gap-1.5 sm:gap-3 text-right ${bossFlashing ? 'animate-flash-red' : ''}`}>
              <div>
                <p className="font-extrabold text-xs sm:text-sm text-slate-800 font-gothic uppercase tracking-wide truncate max-w-[70px] min-[400px]:max-w-[110px] sm:max-w-[150px]" title={bossDetails.name}>
                  {bossDetails.name}
                </p>
                <div className="w-14 sm:w-24 bg-slate-200 h-2 rounded-full border border-slate-300 overflow-hidden mt-1 ml-auto">
                  <div className="bg-red-600 h-full rounded-full transition-all" style={{ width: `${bossHp}%` }} />
                </div>
                <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{bossHp}% HP</span>
              </div>
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-slate-200 border-2 border-slate-300 rounded-xl flex items-center justify-center text-xl sm:text-3xl shadow-2xs flex-shrink-0">
                {bossDetails.emoji}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Question Stone Tablet Container */}
      <main className={`flex-1 max-w-3xl w-full mx-auto px-4 py-6 flex flex-col justify-center ${phase === 'incorrect' ? 'animate-shake' : ''}`}>
        <div className="stone-panel p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3 border-b-2 border-slate-300/40 pb-4">
            {!isBossNode && question.kind !== 'translate' && (
              <Mascot mood={mascotMood} className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 filter drop-shadow-sm" />
            )}
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-gothic tracking-wide">
              {questionTitle(question)}
            </h2>
          </div>
          {renderQuestion()}
        </div>
      </main>

      {/* Footer bar with RPG check/result details */}
      <footer
        className={`border-t-4 ${
          phase === 'correct' ? 'bg-emerald-500/10 border-emerald-300/40' :
          phase === 'incorrect' ? 'bg-rose-500/10 border-rose-300/40' :
          'bg-white border-slate-300/60'
        }`}
      >
        <div className="max-w-3xl mx-auto px-4 py-5">
          {phase === 'answering' && (
            <div className="flex justify-between items-center">
              <button 
                onClick={onReviewTheory}
                className="font-bold text-sm text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1"
              >
                📜 Relire le grimoire
              </button>
              <button
                onClick={handleCheck}
                disabled={!hasAnswer}
                className="btn-3d bg-amber-500 disabled:bg-slate-200 disabled:text-slate-400 border-2 border-amber-600 text-white font-extrabold uppercase tracking-widest py-3 px-10 rounded-2xl text-base disabled:cursor-not-allowed font-gothic"
                style={{ ['--btn-shadow' as string]: hasAnswer ? '#d97706' : '#cbd5e1' }}
              >
                Lancer
              </button>
            </div>
          )}
          {isChecked && (
            <div className="animate-slide-up flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 flex items-start gap-3">
                <span className="text-3xl animate-pop-in">{phase === 'correct' ? '⚔️' : '💥'}</span>
                <div>
                  {phase === 'correct' ? (
                    <p className="font-extrabold text-emerald-800 text-lg font-gothic tracking-wide">
                      {isBossNode ? `Sort réussi ! Dégâts infligés au Boss : -${damagePerCorrect} HP` : praise[praiseIndex]}
                    </p>
                  ) : (
                    <>
                      <p className="font-extrabold text-rose-800 text-lg font-gothic tracking-wide">
                        {isBossNode ? `Sort raté ! Le Boss contre-attaque ! (-1 PV)` : 'Blessure reçue !'}
                      </p>
                      <p className="font-bold text-rose-805 text-sm mt-0.5">
                        Formule correcte : <span className="underline">{correctAnswerText(question)}</span>
                      </p>
                      <p className="text-rose-900/70 text-sm mt-1 max-w-xl">{question.hint}</p>
                    </>
                  )}
                  {phase === 'correct' && question.kind === 'translate' && question.note && (
                    <div
                      className="text-emerald-850/90 text-sm mt-1.5 max-w-xl leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: `🌍 ${question.note}` }}
                    />
                  )}
                </div>
              </div>
              <button
                onClick={handleContinue}
                autoFocus
                className={`btn-3d ${phase === 'correct' ? 'bg-amber-500' : 'bg-red-500'} text-white font-extrabold uppercase tracking-wide py-3 px-10 rounded-2xl text-base flex-shrink-0 font-gothic`}
                style={{ ['--btn-shadow' as string]: phase === 'correct' ? '#d97706' : '#b91c1c' }}
              >
                Continuer
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
