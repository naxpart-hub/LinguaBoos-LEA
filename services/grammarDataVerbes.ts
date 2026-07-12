// Chapitres « temps et modes verbaux » — exercices basés sur le fascicule
// LEA 1 – Outils linguistiques 1 (S. Grillo & I. Collado Rojas).
import { Chapter, ExerciseType } from '../types';
import {
  IMPERATIVO_THEORY,
  FUTURO_THEORY,
  PASADO_COMPUESTO_THEORY,
  IMPERFECTO_THEORY,
  PASADO_SIMPLE_THEORY,
  GERUNDIO_THEORY,
} from './theoryVerbes';

export const grammarDataVerbes: Chapter[] = [
  {
    id: 'imperatif',
    title: "L'Impératif",
    theory: IMPERATIVO_THEORY,
    exercises: [
      {
        id: 'exo_imp_1',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Conjuguez à l'impératif affirmatif, à la personne indiquée.",
        content: [
          { sentenceParts: ['(cantar, tú) → ¡'], solutions: ['canta'] },
          { sentenceParts: ['(comer, vosotros) → ¡'], solutions: ['comed'] },
          { sentenceParts: ['(vivir, usted) → ¡'], solutions: ['viva'] },
          { sentenceParts: ['(hablar, nosotros) → ¡'], solutions: ['hablemos'] },
          { sentenceParts: ['(escribir, ustedes) → ¡'], solutions: ['escriban'] },
          { sentenceParts: ['(abrir, vosotros) → ¡'], solutions: ['abrid'] },
        ],
        feedback: {
          correct: "Parfait ! Les cinq formations de l'impératif sont en place.",
          incorrect: "Rappel : tú = 3ᵉ pers. de l'indicatif (canta), vosotros = infinitif -r +d (cantad), et usted/nosotros/ustedes = subjonctif présent (cante, cantemos, canten).",
        },
      },
      {
        id: 'exo_imp_2',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Choisissez la forme irrégulière correcte de « tú ».",
        content: [
          { question: '¡____ la verdad! (decir)', options: ['di', 'dice', 'diga'], solution: 'di' },
          { question: '¡____ tus deberes ahora! (hacer)', options: ['haz', 'hace', 'haces'], solution: 'haz' },
          { question: '¡____ aquí ahora mismo! (venir)', options: ['ven', 'viene', 'venga'], solution: 'ven' },
          { question: '¡____ la mesa, por favor! (poner)', options: ['pon', 'pone', 'ponga'], solution: 'pon' },
          { question: '¡____ de la habitación! (salir)', options: ['sal', 'sale', 'salga'], solution: 'sal' },
          { question: '¡____ bueno con tu hermana! (ser)', options: ['sé', 'es', 'sea'], solution: 'sé' },
          { question: '¡____ cuidado con el perro! (tener)', options: ['ten', 'tiene', 'tenga'], solution: 'ten' },
        ],
        feedback: {
          correct: "Excellent ! Les 9 irréguliers de « tú » sont mémorisés.",
          incorrect: "Les 9 formes courtes à connaître : di, haz, ve, pon, sal, sé, ten, val, ve (decir, hacer, ir, poner, salir, ser, tener, valer, ver).",
        },
      },
      {
        id: 'exo_imp_3',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Impératif négatif ou enclise : choisissez la phrase correcte.",
        content: [
          { question: 'Donne-le-moi !', options: ['¡Dámelo!', '¡Dálome!', '¡Me lo da!'], solution: '¡Dámelo!' },
          { question: 'Ne me le donne pas !', options: ['¡No me lo des!', '¡No dámelo!', '¡No des me lo!'], solution: '¡No me lo des!' },
          { question: 'Lève-toi !', options: ['¡Levántate!', '¡Te levanta!', '¡Levántase!'], solution: '¡Levántate!' },
          { question: 'Ne te lève pas !', options: ['¡No te levantes!', '¡No levántate!', '¡No te levantas!'], solution: '¡No te levantes!' },
          { question: 'Levons-nous ! (nosotros)', options: ['¡Levantémonos!', '¡Levantémosnos!', '¡Nos levantemos!'], solution: '¡Levantémonos!' },
          { question: 'Levez-vous ! (vosotros)', options: ['¡Levantaos!', '¡Levantados!', '¡Os levantad!'], solution: '¡Levantaos!' },
          { question: 'Dites-moi ! (usted)', options: ['¡Dígame!', '¡Dime usted!', '¡Me diga!'], solution: '¡Dígame!' },
        ],
        feedback: {
          correct: "Bravo ! Enclise à l'affirmatif, pronoms devant au négatif : c'est acquis.",
          incorrect: "À l'affirmatif, les pronoms se collent derrière (dámelo, levántate) ; au négatif, no + subjonctif et pronoms devant (no me lo des). Nosotros perd son -s (levantémonos) et vosotros son -d (levantaos).",
        },
      },
      {
        id: 'exo_imp_4',
        type: ExerciseType.WORD_ORDER,
        instructions: "Remettez les mots dans l'ordre pour former l'ordre (ou la défense) correct.",
        content: [
          { words: ['No', 'me', 'lo', 'des'], solution: 'No me lo des', translation: 'Ne me le donne pas' },
          { words: ['Dile', 'la', 'verdad', 'a', 'tu', 'madre'], solution: 'Dile la verdad a tu madre', translation: 'Dis la vérité à ta mère' },
          { words: ['No', 'te', 'levantes', 'tarde'], solution: 'No te levantes tarde', translation: 'Ne te lève pas tard' },
          { words: ['Ponte', 'el', 'abrigo', 'ahora'], solution: 'Ponte el abrigo ahora', translation: 'Mets ton manteau maintenant' },
        ],
        feedback: {
          correct: "Parfait ! L'ordre des pronoms n'a plus de secret pour vous.",
          incorrect: "Ordre des pronoms : toujours COI puis COD. Enclise à l'affirmatif (ponte), pronoms devant le verbe au négatif (no te levantes).",
        },
      },
      {
        id: 'exo_imp_5',
        type: ExerciseType.TRANSLATION,
        instructions: "Traduisez la phrase suivante en espagnol (Thème).",
        content: [
          {
            frenchSentence: "Lève-toi et donne-le-moi !",
            possibleSolutions: ["¡Levántate y dámelo!", "Levántate y dámelo"],
            note: "Deux enclises d'affilée : <strong>levántate</strong> (levantar + te) et <strong>dámelo</strong> (da + me + lo, ordre COI puis COD). L'accent écrit apparaît car le mot devient esdrújulo.",
          },
        ],
        feedback: {
          correct: "Impeccable ! Enclise et accents parfaitement maîtrisés.",
          incorrect: "Pensez à l'enclise : les pronoms se soudent au verbe (levántate, dámelo) et l'accent écrit apparaît sur la syllabe tonique d'origine.",
        },
      },
    ],
    quiz: [
      {
        question: "Comment forme-t-on l'impératif de « vosotros » ?",
        options: [
          "On remplace le -r final de l'infinitif par un -d (cantad).",
          "On utilise le subjonctif présent (cantéis).",
          "On utilise la 3ᵉ personne de l'indicatif (canta).",
        ],
        answer: "On remplace le -r final de l'infinitif par un -d (cantad).",
        feedback: {
          correct: "Exact ! cantar → cantad, comer → comed, vivir → vivid.",
          incorrect: "Non : vosotros = infinitif − r + d : cantad, comed, vivid.",
        },
      },
      {
        question: "Comment dit-on « Ne me le donne pas » ?",
        options: ["No me lo des", "No dámelo", "No des me lo"],
        answer: "No me lo des",
        feedback: {
          correct: "Parfait ! Négatif = no + subjonctif, pronoms devant le verbe (COI puis COD).",
          incorrect: "À l'impératif négatif, pas d'enclise : les pronoms passent devant le verbe au subjonctif → No me lo des.",
        },
      },
      {
        question: "Quelle est la forme « tú » de l'impératif de « hacer » ?",
        options: ["haz", "hace", "haga"],
        answer: "haz",
        feedback: {
          correct: "Oui ! C'est l'un des 9 irréguliers : di, haz, ve, pon, sal, sé, ten, val, ve.",
          incorrect: "« hacer » a une forme courte irrégulière : haz. (hace = il fait, haga = usted).",
        },
      },
      {
        question: "Que devient « levantemos + nos » avec l'enclise ?",
        options: ["levantémonos (le -s disparaît)", "levantémosnos", "nos levantemos"],
        answer: "levantémonos (le -s disparaît)",
        feedback: {
          correct: "Exact ! À nosotros, le -s final tombe devant le pronom enclitique.",
          incorrect: "Le -s final de la 1ʳᵉ personne du pluriel disparaît : levantémonos.",
        },
      },
    ],
  },
  {
    id: 'futur',
    title: "Le Futur de l'Indicatif",
    theory: FUTURO_THEORY,
    exercises: [
      {
        id: 'exo_fut_1',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Conjuguez les verbes réguliers au futur.",
        content: [
          { sentenceParts: ['Mañana yo (hablar) con el director. → '], solutions: ['hablaré'] },
          { sentenceParts: ['Tú (comer) en casa de tus abuelos. → '], solutions: ['comerás'] },
          { sentenceParts: ['Ella (vivir) en Madrid el año que viene. → '], solutions: ['vivirá'] },
          { sentenceParts: ['Nosotros (estudiar) juntos esta noche. → '], solutions: ['estudiaremos'] },
          { sentenceParts: ['Vosotros (aprender) mucho en la universidad. → '], solutions: ['aprenderéis'] },
          { sentenceParts: ['Ellos (escribir) una carta al alcalde. → '], solutions: ['escribirán'] },
        ],
        feedback: {
          correct: "Parfait ! Infinitif + é, ás, á, emos, éis, án : la mécanique tourne.",
          incorrect: "Au futur, on garde l'infinitif ENTIER et on ajoute -é, -ás, -á, -emos, -éis, -án. Accent écrit partout sauf à nosotros !",
        },
      },
      {
        id: 'exo_fut_2',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Conjuguez ces verbes irréguliers au futur (radical modifié !).",
        content: [
          { sentenceParts: ['Yo (tener) veinte años en marzo. → '], solutions: ['tendré'] },
          { sentenceParts: ['¿(poder, tú) venir mañana? → ¿'], solutions: ['podrás'] },
          { sentenceParts: ['Él te (decir) la verdad. → '], solutions: ['dirá'] },
          { sentenceParts: ['Nosotros (hacer) los ejercicios. → '], solutions: ['haremos'] },
          { sentenceParts: ['Vosotros (salir) temprano. → '], solutions: ['saldréis'] },
          { sentenceParts: ['Ellas (venir) a la fiesta. → '], solutions: ['vendrán'] },
          { sentenceParts: ['Yo no (saber) qué responder. → '], solutions: ['sabré'] },
          { sentenceParts: ['Usted (poner) la mesa. → '], solutions: ['pondrá'] },
        ],
        feedback: {
          correct: "Excellent ! Les 12 radicaux irréguliers sont solides.",
          incorrect: "Trois familles : le e tombe (podré, sabré), un d remplace la voyelle (tendré, pondré, saldré, vendré, valdré), une syllabe saute (diré, haré).",
        },
      },
      {
        id: 'exo_fut_3',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Futur d'action ou futur de conjecture ? Choisissez la bonne interprétation.",
        content: [
          { question: "« Serán las dos. » signifie...", options: ['Il doit être deux heures (hypothèse).', 'Il sera deux heures (action future).', 'Il était deux heures.'], solution: 'Il doit être deux heures (hypothèse).' },
          { question: "« ¿Dónde está Juan? — Estará enfermo. » : le futur exprime...", options: ['Une probabilité (il doit être malade).', 'Une action future certaine.', 'Un ordre.'], solution: 'Une probabilité (il doit être malade).' },
          { question: "« Mañana iré al trabajo. » : le futur exprime...", options: ['Une action à venir.', 'Une hypothèse.', 'Une habitude.'], solution: 'Une action à venir.' },
          { question: "« No habrá sabido convencerte. » signifie...", options: ["Il n'a pas dû savoir te convaincre.", "Il ne saura pas te convaincre.", "Il ne sait pas te convaincre."], solution: "Il n'a pas dû savoir te convaincre." },
        ],
        feedback: {
          correct: "Très bien ! Vous savez lire le futur de conjecture, très fréquent en espagnol.",
          incorrect: "Le futur espagnol peut exprimer une hypothèse sur le présent : « Serán las dos » = il doit être deux heures. Le futur antérieur exprime alors une probabilité passée.",
        },
      },
      {
        id: 'exo_fut_4',
        type: ExerciseType.MATCH_PAIRS,
        instructions: "Associez chaque infinitif à son futur irrégulier.",
        content: [
          {
            pairs: [
              { left: 'decir', right: 'diré' },
              { left: 'hacer', right: 'haré' },
              { left: 'poner', right: 'pondré' },
              { left: 'saber', right: 'sabré' },
              { left: 'venir', right: 'vendré' },
            ],
          },
          {
            pairs: [
              { left: 'tener', right: 'tendré' },
              { left: 'poder', right: 'podré' },
              { left: 'salir', right: 'saldré' },
              { left: 'querer', right: 'querré' },
              { left: 'caber', right: 'cabré' },
            ],
          },
        ],
        feedback: {
          correct: "Bravo ! Les radicaux du futur sont appariés sans erreur.",
          incorrect: "Revoyez les radicaux : dir-, har-, pondr-, sabr-, vendr-, tendr-, podr-, saldr-, querr-, cabr-.",
        },
      },
      {
        id: 'exo_fut_5',
        type: ExerciseType.TRANSLATION,
        instructions: "Traduisez la phrase suivante en espagnol (Thème).",
        content: [
          {
            frenchSentence: "J'aurai terminé quand tu viendras.",
            possibleSolutions: ["Habré terminado cuando vengas.", "Habré terminado cuando vengas"],
            note: "Le futur antérieur (<strong>habré terminado</strong>) marque l'antériorité. Et attention au piège : après <strong>cuando</strong> tourné vers le futur, l'espagnol emploie le <strong>subjonctif</strong> (vengas), jamais le futur !",
          },
        ],
        feedback: {
          correct: "Superbe ! Futur antérieur + subjonctif après cuando : niveau expert.",
          incorrect: "Deux clés : « j'aurai terminé » = habré terminado, et « quand tu viendras » = cuando vengas (subjonctif obligatoire après cuando au futur).",
        },
      },
    ],
    quiz: [
      {
        question: "Comment forme-t-on le futur régulier en espagnol ?",
        options: [
          "Infinitif entier + -é, -ás, -á, -emos, -éis, -án.",
          "Radical + -aré, -erás...",
          "Haber au présent + participe passé.",
        ],
        answer: "Infinitif entier + -é, -ás, -á, -emos, -éis, -án.",
        feedback: {
          correct: "Exact ! hablar → hablaré, comer → comerás, vivir → vivirá.",
          incorrect: "On garde tout l'infinitif : hablar + é = hablaré. Les terminaisons viennent de haber au présent.",
        },
      },
      {
        question: "Quel est le futur de « hacer » (yo) ?",
        options: ["haré", "haceré", "hago"],
        answer: "haré",
        feedback: {
          correct: "Oui ! hacer perd une syllabe complète : haré. Comme decir → diré.",
          incorrect: "hacer et decir perdent une syllabe : haré, diré.",
        },
      },
      {
        question: "Que peut exprimer « Serán las dos » ?",
        options: [
          "Une hypothèse : il doit être deux heures.",
          "Uniquement une action future.",
          "Un ordre.",
        ],
        answer: "Une hypothèse : il doit être deux heures.",
        feedback: {
          correct: "Parfait ! C'est le futur de conjecture, très employé en espagnol.",
          incorrect: "Le futur espagnol sert aussi à émettre une hypothèse sur le présent : « Serán las dos » = il doit être deux heures.",
        },
      },
      {
        question: "Quel verbe remplace la voyelle de l'infinitif par un « d » au futur ?",
        options: ["salir → saldré", "saber → sabré", "decir → diré"],
        answer: "salir → saldré",
        feedback: {
          correct: "Exact ! Comme poner → pondré, tener → tendré, venir → vendré, valer → valdré.",
          incorrect: "saber perd juste son e (sabré) et decir perd une syllabe (diré). C'est salir → saldré qui prend un d.",
        },
      },
    ],
  },
  {
    id: 'passe_compose',
    title: 'Le Passé Composé',
    theory: PASADO_COMPUESTO_THEORY,
    exercises: [
      {
        id: 'exo_pc_1',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Donnez le participe passé des verbes suivants.",
        content: [
          { sentenceParts: ['cantar → '], solutions: ['cantado'] },
          { sentenceParts: ['comer → '], solutions: ['comido'] },
          { sentenceParts: ['vivir → '], solutions: ['vivido'] },
          { sentenceParts: ['leer → '], solutions: ['leído'] },
          { sentenceParts: ['caer → '], solutions: ['caído'] },
          { sentenceParts: ['construir → '], solutions: ['construido'] },
        ],
        feedback: {
          correct: "Parfait ! Y compris les accents de leído et caído.",
          incorrect: "-AR → -ado, -ER/-IR → -ido. Radical terminé par voyelle → accent sur le i (leído, caído)... sauf les verbes en -UIR (construido, sans accent).",
        },
      },
      {
        id: 'exo_pc_2',
        type: ExerciseType.MATCH_PAIRS,
        instructions: "Associez chaque verbe à son participe passé irrégulier.",
        content: [
          {
            pairs: [
              { left: 'abrir', right: 'abierto' },
              { left: 'escribir', right: 'escrito' },
              { left: 'romper', right: 'roto' },
              { left: 'morir', right: 'muerto' },
              { left: 'decir', right: 'dicho' },
            ],
          },
          {
            pairs: [
              { left: 'hacer', right: 'hecho' },
              { left: 'poner', right: 'puesto' },
              { left: 'ver', right: 'visto' },
              { left: 'volver', right: 'vuelto' },
              { left: 'resolver', right: 'resuelto' },
            ],
          },
        ],
        feedback: {
          correct: "Excellent ! Les participes irréguliers sont tous appariés.",
          incorrect: "À mémoriser : abierto, escrito, roto, muerto, dicho, hecho, puesto, visto, vuelto, resuelto, impreso...",
        },
      },
      {
        id: 'exo_pc_3',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Conjuguez au passé composé (haber au présent + participe).",
        content: [
          { sentenceParts: ['Esta mañana yo (levantarse) a las ocho. → me '], solutions: ['he levantado'] },
          { sentenceParts: ['¿Tú (ver) esta película? → ¿'], solutions: ['has visto'] },
          { sentenceParts: ['María (llegar) tarde hoy. → '], solutions: ['ha llegado'] },
          { sentenceParts: ['Nosotros (escribir) la carta. → '], solutions: ['hemos escrito'] },
          { sentenceParts: ['Ellos (comer) mucho este mediodía. → '], solutions: ['han comido'] },
          { sentenceParts: ['Vosotros no (hacer) los deberes. → no '], solutions: ['habéis hecho'] },
        ],
        feedback: {
          correct: "Très bien ! haber + participe invariable, sans exception.",
          incorrect: "Un seul auxiliaire : haber (he, has, ha, hemos, habéis, han). Le participe est invariable et inséparable : « María ha llegado », « me he levantado » (jamais « soy levantado » !).",
        },
      },
      {
        id: 'exo_pc_4',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Passé composé ou passé simple ? Choisissez le temps adapté au marqueur temporel.",
        content: [
          { question: "____ al cine. (hoy)", options: ['Hoy he ido', 'Hoy fui'], solution: 'Hoy he ido' },
          { question: "____ al cine. (ayer)", options: ['Ayer fui', 'Ayer he ido'], solution: 'Ayer fui' },
          { question: "Esta semana ____ mucho.", options: ['ha llovido', 'llovió'], solution: 'ha llovido' },
          { question: "El año pasado ____ a México.", options: ['viajé', 'he viajado'], solution: 'viajé' },
          { question: "Todavía no ____ el correo.", options: ['he leído', 'leí'], solution: 'he leído' },
          { question: "En 2020 ____ mis estudios.", options: ['empecé', 'he empezado'], solution: 'empecé' },
        ],
        feedback: {
          correct: "Parfait ! Moment non terminé → passé composé, moment coupé du présent → passé simple.",
          incorrect: "Règle : hoy, esta semana, todavía no → passé composé. Ayer, el año pasado, en 2020 → passé simple (l'espagnol le préfère au passé composé français !).",
        },
      },
      {
        id: 'exo_pc_5',
        type: ExerciseType.TRANSLATION,
        instructions: "Traduisez la phrase suivante en espagnol (Thème).",
        content: [
          {
            frenchSentence: "Ce matin, je me suis levé à huit heures.",
            possibleSolutions: ["Esta mañana me he levantado a las ocho.", "Esta mañana, me he levantado a las ocho."],
            note: "« Ce matin » appartient encore à aujourd'hui → passé composé. Et surtout : en espagnol, l'auxiliaire est TOUJOURS <strong>haber</strong>, même pour les verbes pronominaux : <strong>me he levantado</strong> (je me SUIS levé).",
          },
        ],
        feedback: {
          correct: "Excellent ! L'auxiliaire unique haber est bien assimilé.",
          incorrect: "Attention : « je me suis levé » = me he levantado (auxiliaire haber, jamais ser). L'heure : a las ocho.",
        },
      },
    ],
    quiz: [
      {
        question: "Quel est l'unique auxiliaire des temps composés en espagnol ?",
        options: ["haber", "ser", "estar"],
        answer: "haber",
        feedback: {
          correct: "Exact ! Même les verbes pronominaux : se han levantado.",
          incorrect: "C'est haber, toujours : « María ha llegado », « nos hemos levantado ». Ser sert à la voix passive.",
        },
      },
      {
        question: "Le participe passé employé avec haber...",
        options: [
          "est toujours invariable.",
          "s'accorde avec le sujet.",
          "s'accorde avec le COD placé avant.",
        ],
        answer: "est toujours invariable.",
        feedback: {
          correct: "Parfait ! « Juan y Arturo han comido » : pas d'accord, jamais.",
          incorrect: "Contrairement au français, le participe avec haber est TOUJOURS invariable.",
        },
      },
      {
        question: "Quel est le participe passé de « volver » ?",
        options: ["vuelto", "volvido", "vuelvido"],
        answer: "vuelto",
        feedback: {
          correct: "Oui ! Comme puesto, hecho, dicho... un irrégulier à connaître.",
          incorrect: "« volver » a un participe irrégulier : vuelto.",
        },
      },
      {
        question: "« Ayer, je suis allé au théâtre » se traduit plutôt...",
        options: ["Ayer fui al teatro (passé simple).", "Ayer he ido al teatro (passé composé).", "Ayer iba al teatro (imparfait)."],
        answer: "Ayer fui al teatro (passé simple).",
        feedback: {
          correct: "Exact ! Action achevée, coupée du présent → passé simple en espagnol.",
          incorrect: "Avec « ayer » (moment terminé), l'espagnol emploie le passé simple : Ayer fui al teatro.",
        },
      },
    ],
  },
  {
    id: 'imparfait',
    title: 'Imparfait et Plus-que-parfait',
    theory: IMPERFECTO_THEORY,
    exercises: [
      {
        id: 'exo_imperf_1',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Conjuguez les verbes à l'imparfait de l'indicatif.",
        content: [
          { sentenceParts: ['De niño, yo (jugar) en el patio. → '], solutions: ['jugaba'] },
          { sentenceParts: ['Tú (comer) siempre a las dos. → '], solutions: ['comías'] },
          { sentenceParts: ['Ella (vivir) cerca del mar. → '], solutions: ['vivía'] },
          { sentenceParts: ['Nosotros (cantar) en el coro. → '], solutions: ['cantábamos'] },
          { sentenceParts: ['Vosotros (leer) muchos libros. → '], solutions: ['leíais'] },
          { sentenceParts: ['Ellos (escribir) cartas largas. → '], solutions: ['escribían'] },
        ],
        feedback: {
          correct: "Parfait ! -aba pour les -AR, -ía pour les -ER/-IR.",
          incorrect: "Imparfait : -AR → -aba, -abas, -aba, -ábamos... et -ER/-IR → -ía, -ías, -ía, -íamos... N'oubliez pas l'accent de cantábamos !",
        },
      },
      {
        id: 'exo_imperf_2',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Les 3 seuls irréguliers de l'imparfait : ir, ser, ver.",
        content: [
          { sentenceParts: ['Yo (ir) al colegio a pie. → '], solutions: ['iba'] },
          { sentenceParts: ['Tú (ser) muy tímido. → '], solutions: ['eras'] },
          { sentenceParts: ['Nosotros (ver) la tele juntos. → '], solutions: ['veíamos'] },
          { sentenceParts: ['Ellas (ir) a la playa cada verano. → '], solutions: ['iban'] },
          { sentenceParts: ['Nosotros (ser) vecinos. → '], solutions: ['éramos'] },
          { sentenceParts: ['Yo (ver) pasar los trenes. → '], solutions: ['veía'] },
        ],
        feedback: {
          correct: "Excellent ! iba, era, veía : les trois exceptions sont maîtrisées.",
          incorrect: "Seulement 3 irréguliers : ir → iba, íbamos... · ser → era, éramos... · ver → veía, veíamos...",
        },
      },
      {
        id: 'exo_imperf_3',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Imparfait (décor) ou passé simple (événement) ? Choisissez.",
        content: [
          { question: "Sonia ____ cuando Juan entró.", options: ['leía', 'leyó'], solution: 'leía' },
          { question: "Sonia leía cuando Juan ____.", options: ['entró', 'entraba'], solution: 'entró' },
          { question: "Cuando era pequeño, ____ al fútbol todos los días.", options: ['jugaba', 'jugué'], solution: 'jugaba' },
          { question: "Ayer ____ una carta a mi abuela.", options: ['escribí', 'escribía'], solution: 'escribí' },
          { question: "El castillo ____ enorme y oscuro.", options: ['era', 'fue'], solution: 'era' },
        ],
        feedback: {
          correct: "Très bien ! Décor/habitude → imparfait ; action ponctuelle → passé simple.",
          incorrect: "L'imparfait décrit le décor et les habitudes (leía, jugaba, era) ; le passé simple raconte l'événement qui surgit (entró, escribí).",
        },
      },
      {
        id: 'exo_imperf_4',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Conjuguez au plus-que-parfait (había + participe).",
        content: [
          { sentenceParts: ['Yo ya (comer) cuando llegó Pablo. → ya '], solutions: ['había comido'] },
          { sentenceParts: ['Tú no (ver) nunca el mar. → no '], solutions: ['habías visto'] },
          { sentenceParts: ['Ellos ya (salir) cuando llamaste. → ya '], solutions: ['habían salido'] },
          { sentenceParts: ['Nosotros (terminar) el trabajo antes de cenar. → '], solutions: ['habíamos terminado'] },
        ],
        feedback: {
          correct: "Parfait ! Le plus-que-parfait exprime l'action antérieure dans le passé.",
          incorrect: "Plus-que-parfait = haber à l'imparfait (había, habías...) + participe passé : « Había comido cuando llegó Pablo. »",
        },
      },
      {
        id: 'exo_imperf_5',
        type: ExerciseType.TRANSLATION,
        instructions: "Traduisez la phrase suivante en espagnol (Thème).",
        content: [
          {
            frenchSentence: "Quand j'étais petit, je jouais au football tous les jours.",
            possibleSolutions: ["Cuando era pequeño, jugaba al fútbol todos los días.", "Cuando era pequeño jugaba al fútbol todos los días."],
            note: "Deux imparfaits : <strong>era</strong> (description, verbe ser irrégulier) et <strong>jugaba</strong> (habitude du passé). « Jouer au football » = <strong>jugar al fútbol</strong> (avec la contraction a + el = al).",
          },
        ],
        feedback: {
          correct: "Excellent ! Description + habitude = imparfait des deux côtés.",
          incorrect: "« j'étais » = era (irrégulier), « je jouais » = jugaba, et « au football » = al fútbol (contraction a + el).",
        },
      },
    ],
    quiz: [
      {
        question: "Combien y a-t-il de verbes irréguliers à l'imparfait ?",
        options: ["3 : ir, ser, ver", "9", "21"],
        answer: "3 : ir, ser, ver",
        feedback: {
          correct: "Exact ! iba, era, veía. Tout le reste est régulier.",
          incorrect: "Seulement 3 : ir (iba), ser (era), ver (veía). L'imparfait est le temps le plus régulier !",
        },
      },
      {
        question: "Quelle est la terminaison de l'imparfait des verbes en -ER et -IR ?",
        options: ["-ía, -ías, -ía...", "-aba, -abas...", "-í, -iste..."],
        answer: "-ía, -ías, -ía...",
        feedback: {
          correct: "Oui ! comía, vivía... Et -aba pour les verbes en -AR.",
          incorrect: "-ER/-IR → -ía (comía, vivía) ; -AR → -aba (cantaba). -í/-iste, c'est le passé simple.",
        },
      },
      {
        question: "Comment forme-t-on le plus-que-parfait ?",
        options: [
          "haber à l'imparfait + participe passé (había comido).",
          "haber au présent + participe passé (he comido).",
          "haber au passé simple + participe (hube comido).",
        ],
        answer: "haber à l'imparfait + participe passé (había comido).",
        feedback: {
          correct: "Parfait ! Il exprime une action antérieure à une autre action passée.",
          incorrect: "Plus-que-parfait = había/habías/había... + participe : « Había comido cuando llegó Pablo. »",
        },
      },
      {
        question: "« Quería pedirte un favor » : quelle valeur a cet imparfait ?",
        options: [
          "L'atténuation polie (je voulais te demander...).",
          "Une habitude du passé.",
          "Une action future.",
        ],
        answer: "L'atténuation polie (je voulais te demander...).",
        feedback: {
          correct: "Exact ! Comme en français, l'imparfait adoucit la demande.",
          incorrect: "C'est l'imparfait d'atténuation, pour demander quelque chose poliment — même emploi qu'en français.",
        },
      },
    ],
  },
  {
    id: 'passe_simple',
    title: 'Le Passé Simple',
    theory: PASADO_SIMPLE_THEORY,
    exercises: [
      {
        id: 'exo_ps_1',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Conjuguez les verbes réguliers au passé simple. Attention aux accents !",
        content: [
          { sentenceParts: ['Ayer yo (cantar) en la fiesta. → '], solutions: ['canté'] },
          { sentenceParts: ['Tú (comer) demasiado anoche. → '], solutions: ['comiste'] },
          { sentenceParts: ['Él (vivir) tres años en Sevilla. → '], solutions: ['vivió'] },
          { sentenceParts: ['Nosotros (hablar) con el profesor. → '], solutions: ['hablamos'] },
          { sentenceParts: ['Vosotros (escribir) el informe. → '], solutions: ['escribisteis'] },
          { sentenceParts: ['Ellos (beber) toda el agua. → '], solutions: ['bebieron'] },
        ],
        feedback: {
          correct: "Parfait ! Les accents de canté et vivió sont bien là.",
          incorrect: "Réguliers : canté, cantaste, cantó... / comí, comiste, comió... L'accent écrit des 1ʳᵉ et 3ᵉ personnes du singulier est OBLIGATOIRE (canté ≠ cante, cantó ≠ canto).",
        },
      },
      {
        id: 'exo_ps_2',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Prétérits forts et irréguliers : conjuguez (sans accent écrit !).",
        content: [
          { sentenceParts: ['Ayer yo (estar) en casa. → '], solutions: ['estuve'] },
          { sentenceParts: ['Él (tener) un problema. → '], solutions: ['tuvo'] },
          { sentenceParts: ['Nosotros (ir) al teatro. → '], solutions: ['fuimos'] },
          { sentenceParts: ['Yo (hacer) los deberes. → '], solutions: ['hice'] },
          { sentenceParts: ['Ella (decir) la verdad. → '], solutions: ['dijo'] },
          { sentenceParts: ['Ellos (venir) tarde. → '], solutions: ['vinieron'] },
          { sentenceParts: ['Yo no (poder) dormir. → '], solutions: ['pude'] },
          { sentenceParts: ['Usted (poner) la mesa. → '], solutions: ['puso'] },
        ],
        feedback: {
          correct: "Excellent ! estuve, tuvo, hice, dijo... les prétérits forts sont acquis.",
          incorrect: "Radicaux forts : estuv-, tuv-, hic-/hiz-, dij-, vin-, pud-, pus-, sup-, quis-, anduv-... avec les terminaisons -e, -iste, -o (SANS accent). Et ir/ser → fui, fuiste, fue...",
        },
      },
      {
        id: 'exo_ps_3',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Choisissez la 3ᵉ personne correcte (modifications orthographiques).",
        content: [
          { question: "caer (él) →", options: ['cayó', 'caió', 'cajó'], solution: 'cayó' },
          { question: "leer (ellos) →", options: ['leyeron', 'leieron', 'leeron'], solution: 'leyeron' },
          { question: "pedir (él) →", options: ['pidió', 'pedió', 'pidó'], solution: 'pidió' },
          { question: "dormir (ellos) →", options: ['durmieron', 'dormieron', 'duermieron'], solution: 'durmieron' },
          { question: "construir (él) →", options: ['construyó', 'construió', 'construjó'], solution: 'construyó' },
          { question: "conducir (ellos) →", options: ['condujeron', 'condujieron', 'conducieron'], solution: 'condujeron' },
        ],
        feedback: {
          correct: "Très bien ! i → y, affaiblissement e → i / o → u, et le -j- des verbes en -cir.",
          incorrect: "3ᵉ personne : i → y entre voyelles (cayó, leyeron), affaiblissement (pidió, durmieron), et les verbes en -cir prennent un j : condujeron (sans i !).",
        },
      },
      {
        id: 'exo_ps_4',
        type: ExerciseType.WORD_ORDER,
        instructions: "Remettez les mots dans l'ordre (récit au passé simple).",
        content: [
          { words: ['Ayer', 'fui', 'al', 'teatro', 'con', 'María'], solution: 'Ayer fui al teatro con María', translation: 'Hier, je suis allé au théâtre avec María' },
          { words: ['El', 'director', 'se', 'levantó', 'y', 'dijo', 'basta'], solution: 'El director se levantó y dijo basta', translation: 'Le directeur se leva et dit « assez »' },
          { words: ['En', 'cuanto', 'terminó', 'se', 'fue'], solution: 'En cuanto terminó se fue', translation: "Dès qu'il eut terminé, il partit" },
        ],
        feedback: {
          correct: "Parfait ! Le récit au passé simple coule de source.",
          incorrect: "Structure du récit : marqueur temporel + verbe au passé simple. « En cuanto terminó, se fue » remplace le passé antérieur français.",
        },
      },
      {
        id: 'exo_ps_5',
        type: ExerciseType.TRANSLATION,
        instructions: "Traduisez la phrase suivante en espagnol (Thème).",
        content: [
          {
            frenchSentence: "Hier, je suis allé au théâtre.",
            possibleSolutions: ["Ayer fui al teatro.", "Ayer, fui al teatro."],
            note: "Avec <strong>ayer</strong> (moment terminé), l'espagnol emploie le <strong>passé simple</strong> là où le français dit « je suis allé » : <strong>fui</strong> (identique pour ir et ser !). Et n'oubliez pas la contraction <strong>al</strong> (a + el).",
          },
        ],
        feedback: {
          correct: "Excellent ! Le réflexe « ayer → passé simple » est en place.",
          incorrect: "« hier je suis allé » = ayer fui (passé simple, pas passé composé). fui = passé simple de ir (et de ser).",
        },
      },
    ],
    quiz: [
      {
        question: "Pourquoi l'accent de « cantó » est-il vital ?",
        options: [
          "Sans accent, « canto » signifie « je chante » (présent).",
          "C'est purement décoratif.",
          "Il indique le pluriel.",
        ],
        answer: "Sans accent, « canto » signifie « je chante » (présent).",
        feedback: {
          correct: "Exact ! cantó = il chanta / canto = je chante. L'accent change la personne ET le temps.",
          incorrect: "cantó (il chanta) ≠ canto (je chante) : l'accent distingue le passé simple du présent.",
        },
      },
      {
        question: "Quel est le passé simple commun à « ir » et « ser » ?",
        options: ["fui, fuiste, fue...", "iba, ibas...", "era, eras..."],
        answer: "fui, fuiste, fue...",
        feedback: {
          correct: "Oui ! Les deux verbes partagent exactement les mêmes formes.",
          incorrect: "ir et ser ont le MÊME passé simple : fui, fuiste, fue, fuimos, fuisteis, fueron (iba/era sont des imparfaits).",
        },
      },
      {
        question: "Les prétérits forts (estuve, tuve, hice...) portent-ils un accent écrit ?",
        options: ["Non, jamais aux 1ʳᵉ et 3ᵉ personnes.", "Oui, toujours.", "Seulement au pluriel."],
        answer: "Non, jamais aux 1ʳᵉ et 3ᵉ personnes.",
        feedback: {
          correct: "Exact ! estuve, estuvo — sans accent, contrairement aux réguliers (canté, cantó).",
          incorrect: "Les prétérits forts ne portent PAS d'accent : estuve, tuvo, hizo, dijo...",
        },
      },
      {
        question: "Comment conjugue-t-on « conducir » au passé simple (ellos) ?",
        options: ["condujeron", "condujieron", "conducieron"],
        answer: "condujeron",
        feedback: {
          correct: "Parfait ! Les verbes en -cir prennent un j, et -jeron (sans i).",
          incorrect: "Verbes en -cir → j à toutes les personnes : conduje, condujiste... condujeron (jamais -jieron).",
        },
      },
    ],
  },
  {
    id: 'gerondif',
    title: 'Le Gérondif',
    theory: GERUNDIO_THEORY,
    exercises: [
      {
        id: 'exo_ger_1',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Donnez le gérondif des verbes suivants.",
        content: [
          { sentenceParts: ['cantar → '], solutions: ['cantando'] },
          { sentenceParts: ['comer → '], solutions: ['comiendo'] },
          { sentenceParts: ['vivir → '], solutions: ['viviendo'] },
          { sentenceParts: ['leer → '], solutions: ['leyendo'] },
          { sentenceParts: ['pedir → '], solutions: ['pidiendo'] },
          { sentenceParts: ['dormir → '], solutions: ['durmiendo'] },
          { sentenceParts: ['ir → '], solutions: ['yendo'] },
          { sentenceParts: ['decir → '], solutions: ['diciendo'] },
        ],
        feedback: {
          correct: "Parfait ! -ando / -iendo et tous les irréguliers.",
          incorrect: "-AR → -ando, -ER/-IR → -iendo. Irréguliers : i → y entre voyelles (leyendo, yendo), e → i (pidiendo, diciendo), o → u (durmiendo, muriendo).",
        },
      },
      {
        id: 'exo_ger_2',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Choisissez le gérondif correct.",
        content: [
          { question: "oír →", options: ['oyendo', 'oiendo', 'oyiendo'], solution: 'oyendo' },
          { question: "venir →", options: ['viniendo', 'veniendo', 'vinyendo'], solution: 'viniendo' },
          { question: "poder →", options: ['pudiendo', 'podiendo', 'puediendo'], solution: 'pudiendo' },
          { question: "reír →", options: ['riendo', 'riiendo', 'reyendo'], solution: 'riendo' },
          { question: "construir →", options: ['construyendo', 'construiendo', 'construjendo'], solution: 'construyendo' },
          { question: "morir →", options: ['muriendo', 'moriendo', 'mueriendo'], solution: 'muriendo' },
        ],
        feedback: {
          correct: "Excellent ! Tous les gérondifs irréguliers sont identifiés.",
          incorrect: "Retenez : oyendo, viniendo, pudiendo, riendo (un seul i !), construyendo, muriendo.",
        },
      },
      {
        id: 'exo_ger_3',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Estar + gérondif : dites ce qui est en train de se passer.",
        content: [
          { sentenceParts: ['Yo (comer) ahora mismo. → Estoy '], solutions: ['comiendo'] },
          { sentenceParts: ['Ella (leer) una novela. → Está '], solutions: ['leyendo'] },
          { sentenceParts: ['Nosotros (estudiar) para el examen. → Estamos '], solutions: ['estudiando'] },
          { sentenceParts: ['Ellos (dormir) todavía. → Están '], solutions: ['durmiendo'] },
          { sentenceParts: ['¿Qué (hacer, tú)? → ¿Qué estás '], solutions: ['haciendo'] },
        ],
        feedback: {
          correct: "Très bien ! « Être en train de » = estar + gérondif.",
          incorrect: "estar conjugué + gérondif invariable : Estoy comiendo, Está leyendo, Están durmiendo.",
        },
      },
      {
        id: 'exo_ger_4',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Gérondif ou proposition relative ? Choisissez la traduction correcte.",
        content: [
          { question: "« Il entra en courant. »", options: ['Entró corriendo.', 'Entró que corría.'], solution: 'Entró corriendo.' },
          { question: "« une fenêtre donnant sur la mer »", options: ['una ventana que daba al mar', 'una ventana dando al mar'], solution: 'una ventana que daba al mar' },
          { question: "« En travaillant, il trouvera un emploi. »", options: ['Trabajando, encontrará un empleo.', 'Que trabaja, encontrará un empleo.'], solution: 'Trabajando, encontrará un empleo.' },
          { question: "« un garçon portant des lunettes » (état)", options: ['un chico que llevaba gafas', 'un chico llevando gafas'], solution: 'un chico que llevaba gafas' },
        ],
        feedback: {
          correct: "Parfait ! Action → gérondif ; qualité/état → relative avec « que ».",
          incorrect: "Le gérondif exprime une ACTION (entró corriendo). Pour une qualité ou un état (« donnant sur », « portant »), l'espagnol emploie une relative : que daba, que llevaba.",
        },
      },
      {
        id: 'exo_ger_5',
        type: ExerciseType.TRANSLATION,
        instructions: "Traduisez la phrase suivante en espagnol (Thème).",
        content: [
          {
            frenchSentence: "Il entra dans l'université en courant.",
            possibleSolutions: ["Entró en la universidad corriendo.", "Entró corriendo en la universidad."],
            note: "Le gérondif <strong>corriendo</strong> exprime la manière. « Entrer dans » = <strong>entrar en</strong>. Le passé simple <strong>entró</strong> raconte l'événement.",
          },
        ],
        feedback: {
          correct: "Excellent ! Gérondif de manière + passé simple : combo parfait.",
          incorrect: "« en courant » = corriendo (gérondif de manière), « il entra » = entró (passé simple), et entrar EN la universidad.",
        },
      },
    ],
    quiz: [
      {
        question: "Quelle est la terminaison du gérondif des verbes en -AR ?",
        options: ["-ando (cantando)", "-iendo (cantiendo)", "-ante (cantante)"],
        answer: "-ando (cantando)",
        feedback: {
          correct: "Exact ! -AR → -ando, -ER/-IR → -iendo.",
          incorrect: "-AR → -ando : cantando, hablando. (-iendo est pour -ER/-IR).",
        },
      },
      {
        question: "Quel est le gérondif de « dormir » ?",
        options: ["durmiendo", "dormiendo", "duermiendo"],
        answer: "durmiendo",
        feedback: {
          correct: "Oui ! o → u : durmiendo, comme muriendo et pudiendo.",
          incorrect: "dormir change o → u au gérondif : durmiendo.",
        },
      },
      {
        question: "Comment traduit-on « une fenêtre donnant sur la mer » ?",
        options: [
          "una ventana que daba al mar (relative).",
          "una ventana dando al mar (gérondif).",
          "una ventana dante al mar.",
        ],
        answer: "una ventana que daba al mar (relative).",
        feedback: {
          correct: "Parfait ! Qualité/état → relative avec que, pas de gérondif.",
          incorrect: "Quand le « -ant » français décrit un état (pas une action), l'espagnol exige une relative : que daba al mar.",
        },
      },
      {
        question: "Que signifie « Estoy comiendo » ?",
        options: ["Je suis en train de manger.", "Je vais manger.", "J'ai mangé."],
        answer: "Je suis en train de manger.",
        feedback: {
          correct: "Exact ! estar + gérondif = action en cours.",
          incorrect: "estar + gérondif = « être en train de » : Estoy comiendo = je suis en train de manger.",
        },
      },
    ],
  },
];
