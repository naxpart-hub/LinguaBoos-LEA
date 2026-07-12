import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Unit, LessonNode, LessonQuestion } from '../types';
import { checkQuestion, correctAnswerText } from '../services/gameLogic';
import {
  getBossDef, buildStartingDeck, drawCards, computeCardDamage, elementMultiplier,
  pickBossIntent, ELEMENT_STYLE, PLAYER_MAX_HP, HAND_SIZE, ENERGY_BASE, ENERGY_BONUS,
  type CardInstance, type BossDef, type BossIntent,
} from '../services/cardEngine';

// ── Sons procéduraux (compact, autonome) ───────────────────────────────────
let audioCtx: AudioContext | null = null;
const beep = (freqs: number[], type: OscillatorType, dur = 0.18, gainVal = 0.05, slide = 0) => {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = audioCtx;
    const now = ctx.currentTime;
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(f, now + i * 0.05);
      if (slide) osc.frequency.linearRampToValueAtTime(f * slide, now + i * 0.05 + dur);
      gain.gain.setValueAtTime(gainVal, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + dur);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now + i * 0.05); osc.stop(now + i * 0.05 + dur);
    });
  } catch { /* audio bloqué */ }
};
const sfx = {
  hover: () => beep([520], 'sine', 0.05, 0.02),
  click: () => beep([660], 'square', 0.06, 0.03),
  hitBoss: () => beep([180, 140], 'sawtooth', 0.12, 0.06, 0.4),
  crit: () => beep([880, 1320, 1760], 'square', 0.1, 0.05),
  hitPlayer: () => beep([220, 110], 'triangle', 0.2, 0.06, 0.5),
  heal: () => beep([261, 329, 392, 523], 'sine', 0.16, 0.05),
  shield: () => beep([392, 523], 'triangle', 0.14, 0.05),
  victory: () => beep([523, 659, 783, 1046], 'triangle', 0.4, 0.05),
  defeat: () => beep([220, 174, 146], 'sawtooth', 0.5, 0.06, 0.5),
  correct: () => beep([659, 880], 'sine', 0.12, 0.04),
  wrong: () => beep([200, 150], 'square', 0.2, 0.05, 0.6),
};

interface CardBattleProps {
  unit: Unit;
  node: LessonNode;
  onQuit: () => void;
  onComplete: (perfect: boolean) => void;
  onReviewTheory: () => void;
}

type Phase = 'intro' | 'grammar' | 'feedback' | 'cards' | 'bossTurn' | 'won' | 'lost';

interface FloatNum { id: number; value: string; target: 'boss' | 'player'; tone: 'dmg' | 'heal' | 'shield' | 'crit'; }

let floatIdCounter = 0;

export const CardBattle: React.FC<CardBattleProps> = ({ unit, node, onQuit, onComplete, onReviewTheory }) => {
  const boss = useMemo<BossDef>(() => getBossDef(unit.id), [unit.id]);
  const elemStyle = ELEMENT_STYLE;

  // Banque de questions de grammaire (le boss = quiz de l'unité), mélangée + recyclée.
  const questionBank = useRef<LessonQuestion[]>([]);
  const questionCursor = useRef(0);
  const nextQuestion = (): LessonQuestion => {
    if (questionCursor.current >= questionBank.current.length) {
      questionBank.current = [...node.questions].sort(() => Math.random() - 0.5);
      questionCursor.current = 0;
    }
    return questionBank.current[questionCursor.current++];
  };

  // ── État de combat ────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>('intro');
  const [turn, setTurn] = useState(1);
  const [bossHp, setBossHp] = useState(boss.maxHp);
  const [bossBlock, setBossBlock] = useState(0);
  const [bossBurn, setBossBurn] = useState<{ dmg: number; turns: number }>({ dmg: 0, turns: 0 });
  const [bossFrozen, setBossFrozen] = useState(false);
  const [intent, setIntent] = useState<BossIntent>(() => pickBossIntent(boss));
  const prevIntentId = useRef<string>('');

  const [playerHp, setPlayerHp] = useState(PLAYER_MAX_HP);
  const [block, setBlock] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [maxEnergyThisTurn, setMaxEnergyThisTurn] = useState(ENERGY_BASE + ENERGY_BONUS);

  const [deck, setDeck] = useState<CardInstance[]>([]);
  const [hand, setHand] = useState<CardInstance[]>([]);
  const [discard, setDiscard] = useState<CardInstance[]>([]);

  const [question, setQuestion] = useState<LessonQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answeredCorrect, setAnsweredCorrect] = useState<boolean | null>(null);
  const [mistakes, setMistakes] = useState(0);

  const [gm, setGm] = useState(`Le Maître du Jeu : Vous affrontez ${boss.name}. Sa faiblesse : ${elemStyle[boss.weakness].emoji} ${elemStyle[boss.weakness].label}. Préparez votre grimoire !`);
  const [floats, setFloats] = useState<FloatNum[]>([]);
  const [bossFlash, setBossFlash] = useState(false);
  const [playerFlash, setPlayerFlash] = useState(false);
  const [bossAttacking, setBossAttacking] = useState(false);
  const [playedCardUid, setPlayedCardUid] = useState<string | null>(null);

  const timers = useRef<number[]>([]);
  const after = (ms: number, fn: () => void) => { timers.current.push(window.setTimeout(fn, ms)); };
  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  const pushFloat = (value: string, target: 'boss' | 'player', tone: FloatNum['tone']) => {
    const id = floatIdCounter++;
    setFloats(f => [...f, { id, value, target, tone }]);
    after(1100, () => setFloats(f => f.filter(x => x.id !== id)));
  };

  const bossHpPct = Math.round((bossHp / boss.maxHp) * 100);
  const bossImage = bossAttacking ? boss.images.attack
    : bossHpPct <= 30 ? boss.images.critical
    : bossHpPct <= 60 ? boss.images.damaged
    : boss.images.full;

  // ── Démarrage d'un tour du joueur ─────────────────────────────────────────
  const startPlayerTurn = (currentDeck: CardInstance[], currentDiscard: CardInstance[], currentHand: CardInstance[]) => {
    setBlock(0); // le bouclier ne protège que pour l'attaque à venir
    // défausser la main restante puis repiocher une main fraîche
    const toDiscard = [...currentDiscard, ...currentHand];
    const { drawn, deck: d, discard: disc } = drawCards(currentDeck, toDiscard, HAND_SIZE);
    setDeck(d); setDiscard(disc); setHand(drawn);
    const q = nextQuestion();
    setQuestion(q);
    setSelectedOption(null);
    setAnsweredCorrect(null);
    setEnergy(0);
    setPhase('grammar');
    setGm('Le Maître du Jeu : Canalisez votre savoir — répondez pour libérer votre énergie magique.');
  };

  const beginBattle = () => {
    sfx.click();
    const fresh = buildStartingDeck();
    questionBank.current = [...node.questions].sort(() => Math.random() - 0.5);
    questionCursor.current = 0;
    prevIntentId.current = intent.id;
    startPlayerTurn(fresh, [], []);
  };

  // ── Réponse à la question de grammaire ────────────────────────────────────
  const answerGrammar = (option: string) => {
    if (phase !== 'grammar' || !question) return;
    setSelectedOption(option);
    const correct = checkQuestion(question, [option]);
    setAnsweredCorrect(correct);
    if (correct) {
      sfx.correct();
      const e = ENERGY_BASE + ENERGY_BONUS;
      setEnergy(e); setMaxEnergyThisTurn(e);
      setGm(`Le Maître du Jeu : Incantation juste ! ⚡ ${e} énergie. Déchaînez vos cartes.`);
    } else {
      sfx.wrong();
      setMistakes(m => m + 1);
      setEnergy(ENERGY_BASE); setMaxEnergyThisTurn(ENERGY_BASE);
      setGm(`Le Maître du Jeu : Formule erronée... La bonne réponse était « ${correctAnswerText(question)} ». Énergie réduite (⚡ ${ENERGY_BASE}).`);
    }
    setPhase('feedback');
    after(correct ? 850 : 1900, () => setPhase('cards'));
  };

  // ── Jouer une carte ───────────────────────────────────────────────────────
  const playCard = (card: CardInstance) => {
    if (phase !== 'cards' || energy < card.cost) return;
    sfx.hover();
    setPlayedCardUid(card.uid);
    setEnergy(e => e - card.cost);

    // retirer de la main -> défausse
    setHand(h => h.filter(c => c.uid !== card.uid));
    setDiscard(d => [...d, card]);

    let newBossHp = bossHp;

    if (card.kind === 'attack') {
      const { amount, isCrit, multiplier } = computeCardDamage(card, boss);
      // le bouclier du boss absorbe d'abord
      let dmg = amount;
      if (bossBlock > 0) {
        const absorbed = Math.min(bossBlock, dmg);
        setBossBlock(b => b - absorbed);
        dmg -= absorbed;
      }
      newBossHp = Math.max(0, bossHp - dmg);
      setBossHp(newBossHp);
      setBossFlash(true); after(380, () => setBossFlash(false));
      isCrit ? sfx.crit() : sfx.hitBoss();
      pushFloat(`-${dmg}`, 'boss', isCrit ? 'crit' : 'dmg');
      if (multiplier === 2) setGm(`Le Maître du Jeu : 🎯 Faiblesse exploitée ! ${card.name} inflige ${dmg} dégâts.${isCrit ? ' COUP CRITIQUE !' : ''}`);
      else if (isCrit) setGm(`Le Maître du Jeu : ✨ COUP CRITIQUE ! ${card.name} inflige ${dmg} dégâts.`);
      else if (multiplier === 0.5) setGm(`Le Maître du Jeu : Le boss résiste à ${elemStyle[card.element].label}... seulement ${dmg} dégâts.`);
      else setGm(`Le Maître du Jeu : ${card.name} inflige ${dmg} dégâts.`);

      if (card.effects?.lifesteal) {
        const heal = Math.round(dmg * card.effects.lifesteal);
        if (heal > 0) {
          setPlayerHp(p => Math.min(PLAYER_MAX_HP, p + heal));
          after(250, () => { pushFloat(`+${heal}`, 'player', 'heal'); sfx.heal(); });
        }
      }
    } else if (card.kind === 'heal') {
      setPlayerHp(p => Math.min(PLAYER_MAX_HP, p + card.power));
      sfx.heal();
      pushFloat(`+${card.power}`, 'player', 'heal');
      setGm(`Le Maître du Jeu : ${card.name} restaure ${card.power} PV.`);
    } else if (card.kind === 'shield') {
      setBlock(b => b + card.power);
      sfx.shield();
      pushFloat(`+${card.power}`, 'player', 'shield');
      setGm(`Le Maître du Jeu : ${card.name} érige ${card.power} de bouclier.`);
    } else {
      setGm(`Le Maître du Jeu : ${card.name} — ${card.desc}`);
    }

    // effets de statut
    if (card.effects?.burn) {
      setBossBurn(prev => ({ dmg: Math.max(prev.dmg, card.effects!.burn!), turns: prev.turns + 3 }));
      setGm(g => g + ' 🔥 Brûlure appliquée !');
    }
    if (card.effects?.freeze) {
      setBossFrozen(true);
      setGm(g => g + ' ❄️ Boss gelé !');
    }
    if (card.effects?.energy) setEnergy(e => e + card.effects!.energy!);
    if (card.effects?.draw) {
      const { drawn, deck: d, discard: disc } = drawCards(deck, discard, card.effects.draw);
      setDeck(d); setDiscard(disc);
      setHand(h => [...h, ...drawn]);
    }

    after(260, () => setPlayedCardUid(null));

    if (newBossHp <= 0) {
      after(500, () => triggerVictory());
    }
  };

  // ── Fin du tour : le boss agit ────────────────────────────────────────────
  const endTurn = () => {
    if (phase !== 'cards') return;
    sfx.click();
    setPhase('bossTurn');
    setGm('Le Maître du Jeu : Le boss prépare sa riposte...');

    let hp = bossHp;
    // 1. brûlure
    if (bossBurn.turns > 0) {
      hp = Math.max(0, hp - bossBurn.dmg);
      setBossHp(hp);
      setBossBurn(prev => ({ dmg: prev.turns - 1 > 0 ? prev.dmg : 0, turns: prev.turns - 1 }));
      pushFloat(`-${bossBurn.dmg}`, 'boss', 'dmg');
      sfx.hitBoss();
      if (hp <= 0) { after(700, () => triggerVictory()); return; }
    }

    after(900, () => {
      setBossBlock(0); // le bouclier du boss expire à son tour
      if (bossFrozen) {
        setBossFrozen(false);
        setGm('Le Maître du Jeu : ❄️ Le boss est gelé et rate son attaque !');
        after(1300, () => advanceToNextTurn());
        return;
      }

      if (intent.kind === 'guard') {
        setBossBlock(intent.value);
        setGm(`Le Maître du Jeu : ${boss.name} se protège (${intent.emoji} +${intent.value} bouclier).`);
        after(1300, () => advanceToNextTurn());
        return;
      }

      // attaque / lourde
      setBossAttacking(true); after(500, () => setBossAttacking(false));
      let dmg = intent.value;
      let absorbed = 0;
      if (block > 0) { absorbed = Math.min(block, dmg); dmg -= absorbed; }
      const remaining = Math.max(0, playerHp - dmg);
      setPlayerFlash(true); after(450, () => setPlayerFlash(false));
      sfx.hitPlayer();
      if (absorbed > 0) pushFloat(`🛡️${absorbed}`, 'player', 'shield');
      if (dmg > 0) pushFloat(`-${dmg}`, 'player', 'dmg');
      setPlayerHp(remaining);
      setGm(`Le Maître du Jeu : ${intent.emoji} ${intent.label} ! ${absorbed > 0 ? `Bouclier -${absorbed}, ` : ''}Gargui subit ${dmg} dégâts.`);

      after(1400, () => {
        if (remaining <= 0) triggerDefeat();
        else advanceToNextTurn();
      });
    });
  };

  const advanceToNextTurn = () => {
    const next = pickBossIntent(boss, prevIntentId.current);
    prevIntentId.current = next.id;
    setIntent(next);
    setTurn(t => t + 1);
    startPlayerTurn(deck, discard, hand);
  };

  // ── Victoire / Défaite ────────────────────────────────────────────────────
  const triggerVictory = () => { sfx.victory(); setPhase('won'); };
  const triggerDefeat = () => { sfx.defeat(); setPhase('lost'); };

  // ── Cinématique (typewriter) ──────────────────────────────────────────────
  const story = phase === 'won' ? boss.victoryStory : phase === 'lost' ? boss.defeatStory : [];
  const [storyStep, setStoryStep] = useState(0);
  const [typed, setTyped] = useState('');
  const [typedDone, setTypedDone] = useState(false);
  const currentLine = story[storyStep] || '';

  useEffect(() => {
    if (story.length === 0 || storyStep >= story.length) return;
    setTyped(''); setTypedDone(false);
    let i = 0;
    const iv = window.setInterval(() => {
      i++;
      setTyped(currentLine.slice(0, i));
      if (i >= currentLine.length) { clearInterval(iv); setTypedDone(true); }
    }, 26);
    return () => clearInterval(iv);
  }, [storyStep, currentLine, story.length]);

  // ── RENDUS ────────────────────────────────────────────────────────────────

  // Écran cinématique (victoire/défaite)
  if (phase === 'won' || phase === 'lost') {
    const isWin = phase === 'won';
    const done = storyStep >= story.length;
    return (
      <div className="min-h-screen wood-table flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
        {isWin && Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="absolute text-amber-300 animate-float-particle" style={{ left: `${(i * 53) % 100}%`, bottom: `${(i * 31) % 60}%`, animationDelay: `${(i % 6) * 0.4}s`, fontSize: `${10 + (i % 4) * 6}px` }}>✦</span>
        ))}
        <div className="relative z-10 max-w-lg w-full flex flex-col items-center gap-4">
          <div className={`w-48 h-48 rounded-2xl overflow-hidden border-4 ${isWin ? 'border-amber-400' : 'border-red-900'} shadow-2xl ${isWin ? '' : 'grayscale brightness-50'}`}>
            <img src={asset(isWin ? boss.images.defeated : '/gargoyle_defeated.png')} alt="" className="w-full h-full object-cover" />
          </div>
          <h2 className={`font-gothic font-black text-2xl tracking-widest ${isWin ? 'text-gold-mirror' : 'text-red-300'}`}>
            {isWin ? 'VICTOIRE' : 'DÉFAITE'}
          </h2>
          {!done && (
            <div className="bg-amber-50/95 border-2 border-amber-900/70 rounded-2xl px-5 py-4 shadow-xl min-h-[5rem] flex items-center">
              <p className="font-gothic text-sm text-amber-950 font-semibold italic leading-relaxed">{typed}<span className="animate-pulse">▍</span></p>
            </div>
          )}
          <div className="flex gap-3 mt-2">
            {!done ? (
              <button
                onClick={() => { sfx.click(); if (typedDone) setStoryStep(s => s + 1); }}
                onMouseEnter={sfx.hover}
                className="btn-3d bg-amber-500 border-2 border-amber-600 text-white font-extrabold uppercase tracking-widest py-3 px-8 rounded-2xl text-sm font-gothic shadow-lg"
                style={{ ['--btn-shadow' as string]: '#d97706' }}
              >
                {typedDone ? 'Suivant ▸' : '...'}
              </button>
            ) : isWin ? (
              <button
                onClick={() => { sfx.click(); onComplete(mistakes === 0); }}
                className="btn-3d bg-emerald-500 border-2 border-emerald-600 text-white font-extrabold uppercase tracking-widest py-3 px-8 rounded-2xl text-sm font-gothic shadow-lg"
                style={{ ['--btn-shadow' as string]: '#059669' }}
              >
                🏆 Réclamer la récompense
              </button>
            ) : (
              <>
                <button
                  onClick={() => { sfx.click(); onReviewTheory(); }}
                  className="btn-3d bg-violet-500 border-2 border-violet-600 text-white font-extrabold uppercase tracking-widest py-3 px-6 rounded-2xl text-xs font-gothic shadow-lg"
                  style={{ ['--btn-shadow' as string]: '#7c3aed' }}
                >
                  📖 Réviser la théorie
                </button>
                <button
                  onClick={() => { sfx.click(); onQuit(); }}
                  className="btn-3d bg-white border-2 border-slate-300 text-slate-700 font-extrabold uppercase tracking-widest py-3 px-6 rounded-2xl text-xs font-gothic shadow-lg"
                  style={{ ['--btn-shadow' as string]: '#cbd5e1' }}
                >
                  Quitter
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Écran d'intro
  if (phase === 'intro') {
    return (
      <div className="min-h-screen wood-table flex flex-col items-center justify-center p-4 text-center relative">
        <div className="max-w-md w-full flex flex-col items-center gap-5 z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-200/60 font-gothic">⚔️ Combat de Boss ⚔️</span>
          <div className="w-44 h-44 rounded-2xl overflow-hidden border-4 border-amber-900 shadow-2xl animate-pop-in">
            <img src={asset(boss.images.full)} alt={boss.name} className="w-full h-full object-cover" />
          </div>
          <h2 className="font-gothic font-black text-2xl text-gold-mirror tracking-wider">{boss.name}</h2>
          <p className="text-amber-100/70 text-sm italic font-gothic">{boss.desc}</p>
          <div className="flex gap-2 text-xs font-bold">
            <span className="bg-emerald-900/40 border border-emerald-500/40 text-emerald-200 rounded-lg px-3 py-1">
              Faiblesse {elemStyle[boss.weakness].emoji} {elemStyle[boss.weakness].label} (×2)
            </span>
            <span className="bg-slate-900/40 border border-slate-500/40 text-slate-200 rounded-lg px-3 py-1">
              Résiste {elemStyle[boss.resist].emoji} (×½)
            </span>
          </div>
          <p className="text-amber-100/60 text-xs leading-relaxed max-w-xs">
            Réponds juste pour gagner de l'énergie ⚡, puis dépense-la pour jouer tes cartes-sorts.
            Vise sa faiblesse, anticipe ses attaques avec un bouclier 🛡️.
          </p>
          <div className="flex gap-3 mt-1">
            <button onClick={onQuit} onMouseEnter={sfx.hover} className="btn-3d bg-white border-2 border-slate-300 text-slate-700 font-extrabold uppercase tracking-widest py-3 px-5 rounded-2xl text-xs font-gothic" style={{ ['--btn-shadow' as string]: '#cbd5e1' }}>
              Fuir
            </button>
            <button onClick={beginBattle} onMouseEnter={sfx.hover} className="btn-3d bg-amber-500 border-2 border-amber-600 text-white font-extrabold uppercase tracking-widest py-3 px-8 rounded-2xl text-sm font-gothic shadow-lg animate-pulse" style={{ ['--btn-shadow' as string]: '#d97706' }}>
              ⚔️ Engager le combat
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Plateau de combat ───────────────────────────────────────────────────
  const isMc = question?.kind === 'mc';
  const grammarOptions = isMc ? (question as any).options as string[] : [];

  return (
    <div className="min-h-screen wood-table text-slate-800 flex flex-col select-none relative overflow-y-auto font-sans">
      {/* Header */}
      <header className="w-full max-w-lg mx-auto flex items-center justify-between gap-2 z-20 px-3 pt-3 pb-1">
        <button onClick={() => { sfx.click(); onQuit(); }} title="Fuir le combat" className="text-amber-800 hover:text-amber-950 text-lg font-bold bg-amber-50 border-2 border-amber-800/60 rounded-xl w-9 h-9 flex items-center justify-center active:scale-95 transition-all shadow-md flex-shrink-0">✕</button>
        <div className="flex-1 bg-amber-50/95 border-2 border-amber-900/80 rounded-2xl px-3 py-2 text-center shadow-lg font-gothic text-[10px] sm:text-xs text-amber-900 font-extrabold italic leading-tight">🗣️ {gm}</div>
        <div className="flex items-center gap-1 font-extrabold text-amber-900 bg-amber-50/90 border-2 border-amber-800/40 px-2 py-1 rounded-xl shadow-md flex-shrink-0 text-[10px] font-gothic" title="Tour">T{turn}</div>
      </header>

      {/* Arène : Boss en haut */}
      <main className="flex-1 max-w-lg w-full mx-auto flex flex-col items-center z-10 px-3 py-1 gap-2">
        {/* Carte du boss */}
        <div className="flex flex-col items-center w-full">
          <div className={`rpg-card w-44 h-56 sm:w-52 sm:h-64 p-2 relative flex flex-col justify-between transition-all duration-300 ${bossFlash ? 'animate-shake-card bg-red-500/20' : ''} ${bossHpPct <= 35 ? 'card-low-hp card-cracked' : ''}`}>
            {floats.filter(f => f.target === 'boss').map(f => (
              <span key={f.id} className={`absolute top-1/3 left-1/2 -translate-x-1/2 text-3xl font-black drop-shadow-lg z-50 animate-dmg-float ${f.tone === 'crit' ? 'text-amber-400' : 'text-rose-600'}`}>{f.value}</span>
            ))}
            <div className="text-[9px] sm:text-[11px] font-black uppercase text-amber-900 text-center tracking-wider border-b-2 border-amber-900/20 pb-0.5 truncate" title={boss.name}>{boss.name}</div>
            <div className="flex-1 my-1 overflow-hidden rounded-lg bg-amber-900/10 border border-amber-900/10 flex items-center justify-center relative">
              <img src={asset(bossImage)} alt={boss.name} className="w-full h-full object-cover transition-all duration-500" />
              {/* badges statut */}
              <div className="absolute top-1 right-1 flex flex-col gap-1">
                {bossBlock > 0 && <span className="bg-sky-500 text-white text-[9px] font-black rounded-md px-1.5 py-0.5 shadow border border-white/60">🛡️{bossBlock}</span>}
                {bossBurn.turns > 0 && <span className="bg-orange-600 text-white text-[9px] font-black rounded-md px-1.5 py-0.5 shadow border border-white/60">🔥{bossBurn.turns}</span>}
                {bossFrozen && <span className="bg-cyan-400 text-white text-[9px] font-black rounded-md px-1.5 py-0.5 shadow border border-white/60">❄️</span>}
              </div>
            </div>
            <div className="space-y-1">
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-300">
                <div className={`h-full rounded-full transition-all duration-500 ${bossHpPct <= 30 ? 'bg-red-700 animate-pulse' : bossHpPct <= 60 ? 'bg-orange-500' : 'bg-red-600'}`} style={{ width: `${bossHpPct}%` }} />
              </div>
              <div className="flex justify-between text-[8px] sm:text-[10px] font-extrabold text-amber-900">
                <span>PV : {bossHp}/{boss.maxHp}</span>
                <span>Faib. {elemStyle[boss.weakness].emoji}</span>
              </div>
            </div>
          </div>
          {/* Télégraphe d'intention */}
          <div className={`mt-1.5 px-3 py-1 rounded-xl border-2 shadow-md text-[10px] sm:text-xs font-extrabold font-gothic flex items-center gap-1.5 ${intent.kind === 'guard' ? 'bg-sky-50 border-sky-500 text-sky-900' : 'bg-red-50 border-red-500 text-red-900'} ${bossFrozen ? 'opacity-40 line-through' : ''}`}>
            <span>Intention :</span>
            <span>{intent.emoji} {intent.label}</span>
            <span className="opacity-70">{intent.kind === 'guard' ? `(🛡️ ${intent.value})` : `(${intent.value} dégâts)`}</span>
          </div>
        </div>

        {/* Joueur en bas */}
        <div className="flex items-center gap-3 w-full justify-center mt-1">
          {/* Pioche/défausse */}
          <div className="flex flex-col items-center gap-1">
            <div className="rpg-card-back w-12 h-16 rounded-lg flex items-end justify-center pb-1 shadow-lg"><span className="text-white text-[9px] font-black bg-black/50 rounded px-1">{deck.length}</span></div>
            <span className="text-[7px] text-amber-100/50 font-bold uppercase tracking-wider">Pioche</span>
          </div>

          {/* Carte Gargui */}
          <div className={`rpg-card w-32 h-40 sm:w-36 sm:h-44 p-2 relative flex flex-col justify-between transition-all duration-300 ${playerFlash ? 'animate-shake-card bg-red-500/20' : ''} ${playerHp <= PLAYER_MAX_HP * 0.3 ? 'card-low-hp' : ''} ${block > 0 ? 'card-shielded' : ''}`}>
            {block > 0 && <div className="absolute -top-3 -right-3 bg-sky-500 border-2 border-white text-white rounded-full w-9 h-9 flex items-center justify-center text-[10px] font-black shadow-lg animate-shield-pulse">🛡️{block}</div>}
            {floats.filter(f => f.target === 'player').map(f => (
              <span key={f.id} className={`absolute top-1/3 left-1/2 -translate-x-1/2 text-2xl font-black drop-shadow-lg z-50 animate-dmg-float ${f.tone === 'heal' ? 'text-emerald-500' : f.tone === 'shield' ? 'text-sky-500' : 'text-rose-600'}`}>{f.value}</span>
            ))}
            <div className="text-[9px] sm:text-[11px] font-black uppercase text-amber-900 text-center tracking-wider border-b border-amber-900/20 pb-0.5">Gargui</div>
            <div className="flex-1 my-1 overflow-hidden rounded-lg bg-amber-900/10 border border-amber-900/10"><img src={asset('/card_gargui.png')} alt="Gargui" className="w-full h-full object-cover" /></div>
            <div className="space-y-1">
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-300"><div className="bg-red-500 h-full rounded-full transition-all" style={{ width: `${(playerHp / PLAYER_MAX_HP) * 100}%` }} /></div>
              <div className="text-center text-[8px] sm:text-[10px] font-extrabold text-amber-900">PV : {playerHp}/{PLAYER_MAX_HP}</div>
            </div>
          </div>

          {/* Énergie */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-16 rounded-lg border-2 border-amber-400 bg-gradient-to-b from-sky-400 to-blue-700 shadow-lg flex flex-col items-center justify-center text-white">
              <span className="text-lg font-black font-gothic leading-none">{energy}</span>
              <span className="text-[7px] font-bold opacity-80">/{maxEnergyThisTurn}</span>
            </div>
            <span className="text-[7px] text-amber-100/50 font-bold uppercase tracking-wider">⚡ Énergie</span>
          </div>
        </div>
      </main>

      {/* Zone basse : grammaire ou main de cartes */}
      <section className="w-full max-w-2xl mx-auto z-25 px-3 space-y-2 pb-3">
        {/* Phase grammaire / feedback */}
        {(phase === 'grammar' || phase === 'feedback') && question && (
          <div className="bg-amber-50/95 border-2 border-amber-900/80 rounded-2xl p-3 sm:p-4 shadow-xl space-y-2.5 animate-bubble-in">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-gothic border-b border-slate-300 pb-1 text-center">🔮 Canalise ton savoir</h3>
            <p className="text-sm font-bold text-slate-800 text-center">{isMc ? (question as any).prompt : 'Réponds correctement'}</p>
            <div className="grid gap-2">
              {grammarOptions.map(opt => {
                const chosen = selectedOption === opt;
                const reveal = phase === 'feedback';
                const isAnswer = checkQuestion(question, [opt]);
                let cls = 'bg-white border-slate-300 hover:border-amber-500 text-slate-800';
                if (reveal && isAnswer) cls = 'bg-emerald-50 border-emerald-500 text-emerald-900';
                else if (reveal && chosen && !isAnswer) cls = 'bg-rose-50 border-rose-500 text-rose-900';
                return (
                  <button
                    key={opt}
                    disabled={phase !== 'grammar'}
                    onMouseEnter={() => phase === 'grammar' && sfx.hover()}
                    onClick={() => answerGrammar(opt)}
                    className={`btn-3d border-2 rounded-xl px-4 py-2.5 text-left text-xs sm:text-sm font-bold transition-all ${cls}`}
                    style={{ ['--btn-shadow' as string]: '#cbd5e1' }}
                  >
                    {reveal && isAnswer ? '✓ ' : reveal && chosen && !isAnswer ? '✕ ' : ''}{opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Phase cartes : main + bouton fin de tour */}
        {phase === 'cards' && (
          <div className="space-y-2 animate-bubble-in">
            <div className="flex justify-center items-end gap-1.5 sm:gap-2 flex-wrap min-h-[150px]">
              {hand.length === 0 && <p className="text-amber-100/60 text-xs italic py-8">Main vide — terminez le tour.</p>}
              {hand.map(card => {
                const playable = energy >= card.cost;
                const st = elemStyle[card.element];
                const mult = card.kind === 'attack' ? elementMultiplier(card.element, boss) : 1;
                return (
                  <button
                    key={card.uid}
                    disabled={!playable || (playedCardUid !== null)}
                    onMouseEnter={() => playable && sfx.hover()}
                    onClick={() => playCard(card)}
                    className={`rpg-card relative w-[88px] h-[132px] sm:w-[104px] sm:h-[152px] p-1.5 flex flex-col justify-between text-left transition-all duration-200 ${st.bg} ${st.border} ${playedCardUid === card.uid ? 'animate-pop-in opacity-0 scale-125' : ''} ${!playable ? 'opacity-45 grayscale cursor-not-allowed' : 'hover:-translate-y-3'}`}
                  >
                    {/* coût énergie */}
                    <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-b from-sky-400 to-blue-700 border-2 border-amber-300 text-white text-[11px] font-black flex items-center justify-center shadow-md z-10">{card.cost}</span>
                    {/* badge faiblesse */}
                    {mult === 2 && <span className="absolute -top-2 -right-2 bg-emerald-500 border-2 border-white text-white text-[8px] font-black rounded-full px-1 py-0.5 shadow z-10">×2</span>}
                    {mult === 0.5 && <span className="absolute -top-2 -right-2 bg-slate-500 border-2 border-white text-white text-[8px] font-black rounded-full px-1 py-0.5 shadow z-10">×½</span>}
                    <div className="flex justify-between items-center border-b border-amber-900/10 pb-0.5">
                      <span className={`text-[7px] sm:text-[8px] font-black uppercase tracking-wider font-gothic ${st.text} truncate max-w-[70%]`}>{card.name}</span>
                      <span className="text-xs">{st.emoji}</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <span className="text-2xl sm:text-3xl">{card.emoji}</span>
                      {card.kind === 'attack' && <span className="text-[10px] font-black text-rose-700 mt-0.5">⚔ {card.power}</span>}
                      {card.kind === 'heal' && <span className="text-[10px] font-black text-emerald-700 mt-0.5">+{card.power} PV</span>}
                      {card.kind === 'shield' && <span className="text-[10px] font-black text-sky-700 mt-0.5">🛡 {card.power}</span>}
                    </div>
                    <p className="text-[6px] sm:text-[7px] text-slate-600 font-semibold leading-tight border-t border-amber-900/10 pt-0.5 text-center">{card.desc}</p>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-center">
              <button
                onClick={endTurn}
                onMouseEnter={sfx.hover}
                className="btn-3d bg-red-600 border-2 border-red-700 text-white font-extrabold uppercase tracking-widest py-2.5 px-8 rounded-2xl text-xs sm:text-sm font-gothic shadow-lg"
                style={{ ['--btn-shadow' as string]: '#b91c1c' }}
              >
                Terminer le tour ▸
              </button>
            </div>
          </div>
        )}

        {phase === 'bossTurn' && (
          <div className="text-center py-6">
            <span className="text-amber-100/70 text-sm font-gothic italic animate-pulse">⚔️ Le boss agit...</span>
          </div>
        )}
      </section>
    </div>
  );
};
