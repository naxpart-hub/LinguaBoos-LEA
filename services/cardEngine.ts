// ──────────────────────────────────────────────────────────────────────────
//  cardEngine.ts — Moteur du "vrai" jeu de cartes RPG des boss (deckbuilder)
//
//  Boucle d'un tour :
//    1. GRAMMAIRE : une question de grammaire est posée. Bonne réponse =>
//       énergie pleine (knowledge = power). Mauvaise réponse => énergie réduite
//       et la solution est révélée (on apprend).
//    2. JEU DE CARTES : le joueur dépense son énergie pour jouer des cartes de
//       sa main (attaque / soin / bouclier / utilitaire). L'élément de la carte
//       face à la faiblesse du boss multiplie les dégâts.
//    3. BOSS : le boss exécute l'intention qu'il avait télégraphiée (sauf gel /
//       bouclier du joueur), puis télégraphie la suivante.
//
//  Ce module ne contient QUE de la logique pure + des données : aucun React,
//  aucun effet de bord. Il est testable et réutilisable.
// ──────────────────────────────────────────────────────────────────────────

export type Element = 'fuego' | 'hielo' | 'rayo' | 'sombra' | 'arcano';

export type CardKind = 'attack' | 'heal' | 'shield' | 'utility';

/** Effets secondaires que peut porter une carte. */
export interface CardEffects {
  /** Inflige X dégâts de saignement au boss à chaque début de son tour. */
  burn?: number;
  /** Le boss saute sa prochaine intention (gel). */
  freeze?: boolean;
  /** Soigne le joueur d'une fraction des dégâts infligés (0..1). */
  lifesteal?: number;
  /** Pioche immédiatement N cartes supplémentaires. */
  draw?: number;
  /** Rend N points d'énergie ce tour. */
  energy?: number;
}

export interface CardDef {
  defId: string;
  name: string;        // nom espagnol (immersion)
  subtitle: string;    // libellé FR court
  element: Element;
  kind: CardKind;
  cost: number;        // énergie
  power: number;       // valeur de base (dégâts / soin / bouclier)
  emoji: string;
  desc: string;        // description FR de l'effet
  rarity: 'common' | 'rare' | 'epic';
  effects?: CardEffects;
}

/** Instance de carte en jeu (un defId peut être présent en plusieurs exemplaires). */
export interface CardInstance extends CardDef {
  uid: string;
}

// ── Esthétique par élément (classes Tailwind réutilisées par l'UI) ──────────
export const ELEMENT_STYLE: Record<Element, { label: string; emoji: string; bg: string; border: string; text: string; ring: string }> = {
  fuego:  { label: 'Feu',    emoji: '🔥', bg: 'bg-red-50',    border: 'border-red-500',    text: 'text-red-900',    ring: 'ring-red-400' },
  hielo:  { label: 'Glace',  emoji: '❄️', bg: 'bg-cyan-50',   border: 'border-cyan-500',   text: 'text-cyan-900',   ring: 'ring-cyan-400' },
  rayo:   { label: 'Foudre', emoji: '⚡', bg: 'bg-amber-50',  border: 'border-amber-500',  text: 'text-amber-900',  ring: 'ring-amber-400' },
  sombra: { label: 'Ombre',  emoji: '🩸', bg: 'bg-fuchsia-50',border: 'border-fuchsia-600',text: 'text-fuchsia-900',ring: 'ring-fuchsia-400' },
  arcano: { label: 'Arcane', emoji: '🔮', bg: 'bg-violet-50', border: 'border-violet-500', text: 'text-violet-900', ring: 'ring-violet-400' },
};

// ── Bibliothèque de cartes ──────────────────────────────────────────────────
export const CARD_LIBRARY: Record<string, CardDef> = {
  chispa: {
    defId: 'chispa', name: 'Chispa', subtitle: 'Étincelle', element: 'rayo', kind: 'attack',
    cost: 0, power: 3, emoji: '✨', rarity: 'common',
    desc: 'Gratuit. 3 dégâts de foudre.',
  },
  bola_fuego: {
    defId: 'bola_fuego', name: 'Bola de Fuego', subtitle: 'Boule de feu', element: 'fuego', kind: 'attack',
    cost: 1, power: 6, emoji: '🔥', rarity: 'common',
    desc: '6 dégâts de feu.',
  },
  llamarada: {
    defId: 'llamarada', name: 'Llamarada', subtitle: 'Embrasement', element: 'fuego', kind: 'attack',
    cost: 2, power: 9, emoji: '🌋', rarity: 'rare',
    desc: '9 dégâts + brûlure (3/tour pendant 3 tours).',
    effects: { burn: 3 },
  },
  carambano: {
    defId: 'carambano', name: 'Carámbano', subtitle: 'Stalactite', element: 'hielo', kind: 'attack',
    cost: 2, power: 7, emoji: '❄️', rarity: 'rare',
    desc: '7 dégâts de glace + gèle le boss (il saute son prochain tour).',
    effects: { freeze: true },
  },
  rayo: {
    defId: 'rayo', name: 'Rayo Purificador', subtitle: 'Foudre', element: 'rayo', kind: 'attack',
    cost: 2, power: 10, emoji: '⚡', rarity: 'rare',
    desc: '10 dégâts de foudre.',
  },
  tajo_sombrio: {
    defId: 'tajo_sombrio', name: 'Tajo Sombrío', subtitle: 'Entaille d\'ombre', element: 'sombra', kind: 'attack',
    cost: 1, power: 5, emoji: '🩸', rarity: 'common',
    desc: '5 dégâts d\'ombre. Soigne le héros de la moitié des dégâts.',
    effects: { lifesteal: 0.5 },
  },
  escudo: {
    defId: 'escudo', name: 'Escudo', subtitle: 'Bouclier', element: 'arcano', kind: 'shield',
    cost: 1, power: 8, emoji: '🛡️', rarity: 'common',
    desc: 'Gagne 8 points de bouclier (absorbe les dégâts).',
  },
  gran_escudo: {
    defId: 'gran_escudo', name: 'Gran Escudo', subtitle: 'Grand bouclier', element: 'arcano', kind: 'shield',
    cost: 2, power: 14, emoji: '🛡️', rarity: 'rare',
    desc: 'Gagne 14 points de bouclier.',
  },
  pocion: {
    defId: 'pocion', name: 'Poción de Vida', subtitle: 'Potion', element: 'arcano', kind: 'heal',
    cost: 1, power: 8, emoji: '💖', rarity: 'common',
    desc: 'Rend 8 PV au héros.',
  },
  concentracion: {
    defId: 'concentracion', name: 'Concentración', subtitle: 'Concentration', element: 'arcano', kind: 'utility',
    cost: 0, power: 0, emoji: '🧠', rarity: 'common',
    desc: 'Gratuit. Pioche 2 cartes.',
    effects: { draw: 2 },
  },
};

/** Deck de départ (12 cartes). */
export const STARTER_DECK: string[] = [
  'chispa', 'chispa', 'chispa',
  'bola_fuego', 'bola_fuego',
  'tajo_sombrio',
  'carambano',
  'rayo',
  'escudo',
  'pocion',
  'concentracion',
  'llamarada',
];

// ── Définition des boss ─────────────────────────────────────────────────────
export interface BossIntent {
  id: string;
  label: string;          // texte télégraphié
  kind: 'attack' | 'heavy' | 'guard' | 'curse';
  value: number;          // dégâts (attack/heavy) ou bouclier (guard)
  emoji: string;
}

export interface BossDef {
  unitId: string;
  name: string;
  emoji: string;
  desc: string;
  maxHp: number;
  weakness: Element;      // x2 dégâts
  resist: Element;        // x0.5 dégâts
  images: {
    full: string; damaged: string; critical: string; attack: string; defeated: string;
  };
  intents: BossIntent[];
  victoryStory: string[];
  defeatStory: string[];
}

const ACCENT_BOSS: BossDef = {
  unitId: 'orthographe',
  name: "L'Inquisiteur des Accents",
  emoji: '👹',
  desc: 'Lancier de tildes aiguisés',
  maxHp: 90,
  weakness: 'hielo',  // la glace fige ses tildes brûlants
  resist: 'fuego',
  images: {
    full: '/boss_accent.png',
    damaged: '/boss_accent_damaged.png',
    critical: '/boss_accent_critical.png',
    attack: '/boss_accent_attack.png',
    defeated: '/boss_accent_defeated.png',
  },
  intents: [
    { id: 'estoc', label: 'Estocade de tilde', kind: 'attack', value: 7, emoji: '🗡️' },
    { id: 'lluvia', label: 'Pluie d\'accents', kind: 'heavy', value: 11, emoji: '☄️' },
    { id: 'guardia', label: 'Garde de fer', kind: 'guard', value: 10, emoji: '🛡️' },
  ],
  victoryStory: [
    "L'armure de l'Inquisiteur se fissure... Les accents qu'il tenait prisonniers s'échappent dans un tourbillon doré.",
    "\"¡Imposible!\" hurle-t-il, tombant à genoux. \"Personne ne connaît la différence entre público et publico...!\"",
    "Gargui ramasse le tilde brisé. \"Les mots esdrújulas comme máquina, bolígrafo, hipócrita portent TOUJOURS l'accent.\"",
    "L'Inquisiteur se dissout en poussière dorée. Les lettres á, é, í, ó, ú brillent sur le sol comme des étoiles.",
    "🏆 La Salle des Accents est libérée ! Le savoir orthographique coule à nouveau dans les veines du château.",
  ],
  defeatStory: [
    "Gargui vacille, son énergie magique s'épuisant sous la grêle de tildes enflammés de l'Inquisiteur.",
    "\"Ton accentuation manque de rigueur !\" ricane le boss en levant sa lance étincelante.",
    "L'Inquisiteur pointe son arme. Une décharge pétrifie lentement les membres de la petite gargouille.",
    "❌ Défaite... Mais tout n'est pas perdu ! Consulte le grimoire de théorie pour ranimer Gargui et retenter le combat !",
  ],
};

const TIME_BOSS: BossDef = {
  unitId: 'present_indicatif',
  name: 'La Sentinelle du Temps',
  emoji: '🛡️',
  desc: 'Gardien des sabliers',
  maxHp: 100,
  weakness: 'rayo',   // la foudre brise ses rouages
  resist: 'hielo',
  images: {
    full: '/boss_time.png', damaged: '/boss_time.png', critical: '/boss_time.png',
    attack: '/boss_time.png', defeated: '/gargoyle_defeated.png',
  },
  intents: [
    { id: 'engranaje', label: 'Coup d\'engrenage', kind: 'attack', value: 8, emoji: '⚙️' },
    { id: 'arena', label: 'Tempête de sable', kind: 'heavy', value: 12, emoji: '⏳' },
    { id: 'parada', label: 'Bouclier temporel', kind: 'guard', value: 12, emoji: '🛡️' },
  ],
  victoryStory: [
    "La Sentinelle du Temps vacille. Son sablier se brise et le sable du présent coule librement.",
    "\"Les conjugaisons... elles m'échappent...\" murmure-t-elle en s'effondrant.",
    "Gargui contemple les restes du gardien. Le présent de l'indicatif est à nouveau maîtrisé.",
    "🏆 La Salle du Temps est libérée !",
  ],
  defeatStory: [
    "Le sablier de Gargui se vide entièrement. Les rouages du temps se figent.",
    "\"Le présent n'attend pas les esprits hésitants...\" résonne la voix de pierre de la Sentinelle.",
    "Gargui reste figé, incapable de bouger dans cette salle hors du temps.",
    "❌ Défaite... Révise le grimoire de théorie pour briser la boucle temporelle et reprendre le combat !",
  ],
};

const ILLUSION_BOSS: BossDef = {
  unitId: 'subjonctif',
  name: "Le Mage de l'Illusion",
  emoji: '🧙',
  desc: 'Maître du subjonctif',
  maxHp: 110,
  weakness: 'sombra',  // l'ombre dissipe ses mirages de lumière
  resist: 'arcano',
  images: {
    full: '/boss_illusion.png', damaged: '/boss_illusion.png', critical: '/boss_illusion.png',
    attack: '/boss_illusion.png', defeated: '/gargoyle_defeated.png',
  },
  intents: [
    { id: 'espejismo', label: 'Mirage tranchant', kind: 'attack', value: 9, emoji: '🌀' },
    { id: 'clones', label: 'Nuée de clones', kind: 'heavy', value: 13, emoji: '👥' },
    { id: 'velo', label: 'Voile d\'illusion', kind: 'guard', value: 14, emoji: '🛡️' },
  ],
  victoryStory: [
    "Les illusions du Mage se dissipent une à une, révélant la vérité grammaticale.",
    "\"Le subjonctif... il était ma plus belle illusion...\" soupire-t-il en disparaissant.",
    "Gargui a vaincu le Mage. Les règles du subjonctif brillent désormais clairement.",
    "🏆 La Salle des Illusions est libérée !",
  ],
  defeatStory: [
    "Les illusions du Mage entourent Gargui, créant un labyrinthe de doutes.",
    "\"Le doute est le poison de l'esprit !\" murmure le Mage en multipliant ses clones d'ombre.",
    "Les ombres lancent un sortilège de sommeil éternel, plongeant la gargouille dans un rêve brumeux.",
    "❌ Défaite... Révise le grimoire de théorie pour réveiller Gargui et dissiper les brumes de l'illusion !",
  ],
};

export const getBossDef = (unitId: string): BossDef => {
  if (unitId === 'orthographe') return ACCENT_BOSS;
  if (unitId === 'present_indicatif') return TIME_BOSS;
  return ILLUSION_BOSS;
};

// ── Constantes d'équilibrage ────────────────────────────────────────────────
export const PLAYER_MAX_HP = 40;
export const HAND_SIZE = 5;
export const ENERGY_BASE = 2;        // énergie de base par tour
export const ENERGY_BONUS = 2;       // énergie supplémentaire si réponse correcte
export const CRIT_CHANCE = 0.12;     // 12% de coup critique
export const CRIT_MULT = 1.5;

// ── Helpers purs ────────────────────────────────────────────────────────────

let uidCounter = 0;
export const makeInstance = (defId: string): CardInstance => {
  const def = CARD_LIBRARY[defId];
  return { ...def, uid: `${defId}-${uidCounter++}` };
};

/** Fisher–Yates (copie, ne mute pas l'entrée). */
export const shuffle = <T,>(arr: T[]): T[] => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const buildStartingDeck = (): CardInstance[] =>
  shuffle(STARTER_DECK.map(makeInstance));

/** Multiplicateur élémentaire d'une carte contre un boss. */
export const elementMultiplier = (element: Element, boss: BossDef): number => {
  if (element === boss.weakness) return 2;
  if (element === boss.resist) return 0.5;
  return 1;
};

export interface DamageResult {
  amount: number;
  isCrit: boolean;
  multiplier: number;
}

/** Calcule les dégâts d'une carte d'attaque contre le boss. */
export const computeCardDamage = (card: CardDef, boss: BossDef): DamageResult => {
  const multiplier = elementMultiplier(card.element, boss);
  const isCrit = Math.random() < CRIT_CHANCE;
  let amount = card.power * multiplier;
  if (isCrit) amount *= CRIT_MULT;
  return { amount: Math.round(amount), isCrit, multiplier };
};

/** Pioche N cartes depuis la pioche, en remélangeant la défausse si besoin. */
export const drawCards = (
  deck: CardInstance[],
  discard: CardInstance[],
  n: number
): { drawn: CardInstance[]; deck: CardInstance[]; discard: CardInstance[] } => {
  let d = deck.slice();
  let disc = discard.slice();
  const drawn: CardInstance[] = [];
  for (let i = 0; i < n; i++) {
    if (d.length === 0) {
      if (disc.length === 0) break; // plus rien à piocher
      d = shuffle(disc);
      disc = [];
    }
    drawn.push(d.shift()!);
  }
  return { drawn, deck: d, discard: disc };
};

/** Choisit la prochaine intention du boss (évite de répéter la même 3x). */
export const pickBossIntent = (boss: BossDef, previousId?: string): BossIntent => {
  const pool = boss.intents.filter(i => i.id !== previousId);
  const list = pool.length ? pool : boss.intents;
  return list[Math.floor(Math.random() * list.length)];
};
