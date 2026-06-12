import React from 'react';

export type MascotMood = 'idle' | 'happy' | 'sad' | 'thinking' | 'celebrate';

interface MascotProps {
  mood?: MascotMood;
  className?: string;
}

/**
 * Chispa, le bébé dragon mascotte. 100% SVG + animations CSS.
 * Grands yeux brillants façon Chat Potté, petites ailes, flamme de fête.
 */
export const Mascot: React.FC<MascotProps> = ({ mood = 'idle', className = '' }) => {
  const bodyAnim = {
    idle: 'mascot-idle',
    happy: 'mascot-happy',
    sad: 'mascot-sad',
    thinking: 'mascot-thinking',
    celebrate: 'mascot-celebrate',
  }[mood];

  const excited = mood === 'happy' || mood === 'celebrate';
  const tailAnim = excited ? 'tail-wag-fast' : 'tail-wag';
  const wingAnim = excited ? 'wing-flap-fast' : 'wing-flap';

  // Les très grands yeux "Chat Potté" : pupilles immenses + reflets.
  // Selon l'humeur, la position des pupilles et des paupières change.
  const pupilOffset = {
    idle: { x: 0, y: 0 },
    happy: { x: 0, y: -1.5 },
    sad: { x: 0, y: 3 },
    thinking: { x: 3.5, y: -3.5 },
    celebrate: { x: 0, y: -2 },
  }[mood];

  return (
    <div className={`${className} select-none pointer-events-none`} aria-hidden="true">
      <div className={bodyAnim}>
        <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Queue */}
          <g className={tailAnim}>
            <path
              d="M150 150 Q185 145 188 115 Q190 98 178 92 Q183 110 170 122 Q158 132 142 138 Z"
              fill="#58cc02"
            />
            {/* Pointe de flèche de la queue */}
            <path d="M178 92 L196 86 L188 104 Z" fill="#ff9600" />
          </g>

          {/* Aile gauche */}
          <g className={wingAnim}>
            <path
              d="M52 108 Q28 88 32 64 Q48 76 56 90 Q44 78 42 66 Q58 80 62 98 Z"
              fill="#89e219"
              stroke="#46a302"
              strokeWidth="2"
            />
          </g>

          {/* Corps rond de bébé */}
          <ellipse cx="100" cy="138" rx="52" ry="46" fill="#58cc02" />
          {/* Ventre clair */}
          <ellipse cx="100" cy="148" rx="34" ry="30" fill="#d7ffb8" />
          {/* Écailles du ventre */}
          <path d="M78 140 Q100 132 122 140" stroke="#aee571" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M80 152 Q100 144 120 152" stroke="#aee571" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M84 164 Q100 156 116 164" stroke="#aee571" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Pattes */}
          <ellipse cx="68" cy="178" rx="14" ry="10" fill="#46a302" />
          <ellipse cx="132" cy="178" rx="14" ry="10" fill="#46a302" />

          {/* Petits bras */}
          {mood === 'celebrate' ? (
            <>
              {/* Bras levés pour la fête */}
              <ellipse cx="52" cy="118" rx="9" ry="14" fill="#46a302" transform="rotate(-35 52 118)" />
              <ellipse cx="148" cy="118" rx="9" ry="14" fill="#46a302" transform="rotate(35 148 118)" />
            </>
          ) : (
            <>
              <ellipse cx="58" cy="148" rx="9" ry="13" fill="#46a302" transform="rotate(20 58 148)" />
              <ellipse cx="142" cy="148" rx="9" ry="13" fill="#46a302" transform="rotate(-20 142 148)" />
            </>
          )}

          {/* Tête (grosse, proportions bébé) */}
          <ellipse cx="100" cy="78" rx="56" ry="50" fill="#58cc02" />

          {/* Petites cornes */}
          <path d="M62 38 Q58 22 70 16 Q72 30 76 36 Z" fill="#ffc800" />
          <path d="M138 38 Q142 22 130 16 Q128 30 124 36 Z" fill="#ffc800" />

          {/* Crête sur la tête */}
          <path d="M92 28 Q100 14 108 28 Q100 24 92 28 Z" fill="#ff9600" />

          {/* Oreilles / nageoires */}
          <path d="M46 64 Q30 58 28 44 Q44 50 52 58 Z" fill="#89e219" stroke="#46a302" strokeWidth="1.5" />
          <path d="M154 64 Q170 58 172 44 Q156 50 148 58 Z" fill="#89e219" stroke="#46a302" strokeWidth="1.5" />

          {/* Museau */}
          <ellipse cx="100" cy="98" rx="26" ry="16" fill="#d7ffb8" />
          {/* Narines */}
          <ellipse cx="92" cy="94" rx="2.5" ry="3.5" fill="#46a302" />
          <ellipse cx="108" cy="94" rx="2.5" ry="3.5" fill="#46a302" />

          {/* ---- LES GRANDS YEUX CHAT POTTÉ ---- */}
          {/* Blanc des yeux, immenses et brillants */}
          <g className={mood === 'idle' || mood === 'thinking' ? 'eye-blink' : ''}>
            <ellipse cx="76" cy="68" rx="19" ry="23" fill="#ffffff" stroke="#46a302" strokeWidth="1.5" />
            <ellipse cx="124" cy="68" rx="19" ry="23" fill="#ffffff" stroke="#46a302" strokeWidth="1.5" />

            {/* Iris + pupilles géantes (l'effet "yeux doux") */}
            <g transform={`translate(${pupilOffset.x} ${pupilOffset.y})`}>
              <ellipse cx="76" cy="70" rx="13.5" ry="17" fill="#7a4f1d" />
              <ellipse cx="124" cy="70" rx="13.5" ry="17" fill="#7a4f1d" />
              <ellipse cx="76" cy="70" rx="10" ry="13.5" fill="#1e1410" />
              <ellipse cx="124" cy="70" rx="10" ry="13.5" fill="#1e1410" />
              {/* Grands reflets brillants */}
              <ellipse cx="71" cy="62" rx="4.5" ry="6" fill="#ffffff" opacity="0.95" />
              <ellipse cx="119" cy="62" rx="4.5" ry="6" fill="#ffffff" opacity="0.95" />
              <ellipse cx="81" cy="76" rx="2.2" ry="3" fill="#ffffff" opacity="0.7" />
              <ellipse cx="129" cy="76" rx="2.2" ry="3" fill="#ffffff" opacity="0.7" />
            </g>

            {/* Paupières selon l'humeur */}
            {mood === 'sad' && (
              <>
                <path d="M57 52 Q76 44 95 56 L95 50 Q76 38 57 46 Z" fill="#58cc02" />
                <path d="M105 56 Q124 44 143 52 L143 46 Q124 38 105 50 Z" fill="#58cc02" />
              </>
            )}
            {(mood === 'happy' || mood === 'celebrate') && (
              <>
                {/* Sourcils joyeux relevés */}
                <path d="M60 44 Q76 36 92 44" stroke="#46a302" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M108 44 Q124 36 140 44" stroke="#46a302" strokeWidth="3" fill="none" strokeLinecap="round" />
              </>
            )}
            {mood === 'thinking' && (
              <path d="M104 42 Q124 34 144 44" stroke="#46a302" strokeWidth="3" fill="none" strokeLinecap="round" />
            )}
          </g>

          {/* Larme quand triste */}
          {mood === 'sad' && (
            <ellipse className="tear" cx="60" cy="88" rx="3.5" ry="5" fill="#1cb0f6" />
          )}

          {/* Bouche selon l'humeur */}
          {mood === 'idle' && (
            <path d="M90 108 Q100 114 110 108" stroke="#46a302" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
          {mood === 'thinking' && (
            <path d="M93 110 Q101 108 107 111" stroke="#46a302" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
          {(mood === 'happy' || mood === 'celebrate') && (
            <path d="M86 105 Q100 120 114 105 Q100 113 86 105 Z" fill="#46a302" />
          )}
          {mood === 'sad' && (
            <path d="M90 112 Q100 105 110 112" stroke="#46a302" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}

          {/* Joues roses */}
          {mood !== 'sad' && (
            <>
              <ellipse cx="56" cy="92" rx="8" ry="5" fill="#ffb3c1" opacity="0.7" />
              <ellipse cx="144" cy="92" rx="8" ry="5" fill="#ffb3c1" opacity="0.7" />
            </>
          )}

          {/* Petite flamme de célébration */}
          {mood === 'celebrate' && (
            <g className="flame-flicker">
              <path d="M118 100 Q138 92 150 98 Q142 102 148 108 Q132 110 118 106 Z" fill="#ff9600" />
              <path d="M122 101 Q136 96 144 100 Q138 103 140 106 Q130 107 122 104 Z" fill="#ffc800" />
            </g>
          )}

          {/* Étincelles autour quand il célèbre ou est content */}
          {excited && (
            <g fill="#ffc800">
              <path className="sparkle" d="M30 40 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" />
              <path className="sparkle" style={{ animationDelay: '0.4s' }} d="M168 30 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 Z" />
              <path className="sparkle" style={{ animationDelay: '0.8s' }} d="M178 130 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" />
            </g>
          )}

          {/* Point d'interrogation quand il réfléchit */}
          {mood === 'thinking' && (
            <g className="animate-bubble-in">
              <circle cx="162" cy="28" r="14" fill="#ffffff" stroke="#e5e5e5" strokeWidth="2" />
              <text x="162" y="35" textAnchor="middle" fontSize="18" fontWeight="800" fill="#1cb0f6">?</text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
