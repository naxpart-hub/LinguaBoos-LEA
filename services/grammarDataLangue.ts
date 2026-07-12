// Chapitres « groupe nominal, pronoms et discours » — exercices basés sur le
// fascicule LEA 1 – Outils linguistiques 1 (S. Grillo & I. Collado Rojas).
import { Chapter, ExerciseType } from '../types';
import {
  GENERO_NUMERO_THEORY,
  ARTICULOS_THEORY,
  DEMOSTRATIVOS_POSESIVOS_THEORY,
  PRONOMBRES_THEORY,
  NUMERALES_THEORY,
  INDEFINIDOS_THEORY,
  ESTILO_INDIRECTO_THEORY,
} from './theoryLangue';

export const grammarDataLangue: Chapter[] = [
  {
    id: 'genre_nombre',
    title: 'Genre et Nombre',
    theory: GENERO_NUMERO_THEORY,
    exercises: [
      {
        id: 'exo_gn_1',
        type: ExerciseType.CLASSIFY_WORDS,
        instructions: "Masculin (el) ou féminin (la) ? Classez chaque nom.",
        content: [
          {
            categories: ['el (masculin)', 'la (féminin)'],
            words: [
              { word: 'problema', category: 'el (masculin)' },
              { word: 'mano', category: 'la (féminin)' },
              { word: 'día', category: 'el (masculin)' },
              { word: 'mapa', category: 'el (masculin)' },
              { word: 'flor', category: 'la (féminin)' },
              { word: 'coche', category: 'el (masculin)' },
              { word: 'sal', category: 'la (féminin)' },
              { word: 'sangre', category: 'la (féminin)' },
              { word: 'idioma', category: 'el (masculin)' },
              { word: 'libertad', category: 'la (féminin)' },
              { word: 'corazón', category: 'el (masculin)' },
              { word: 'miel', category: 'la (féminin)' },
            ],
          },
        ],
        feedback: {
          correct: "Excellent ! Même les pièges (problema, mano, sal) sont maîtrisés.",
          incorrect: "Attention aux pièges : les mots grecs en -a sont masculins (el problema, el día, el mapa, el idioma), la mano est féminin, et sal/sangre/miel sont féminins en espagnol !",
        },
      },
      {
        id: 'exo_gn_2',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Écrivez le pluriel des noms suivants (avec l'article).",
        content: [
          { sentenceParts: ['el chico → los '], solutions: ['chicos'] },
          { sentenceParts: ['la mujer → las '], solutions: ['mujeres'] },
          { sentenceParts: ['el pez → los '], solutions: ['peces'] },
          { sentenceParts: ['el camión → los '], solutions: ['camiones'] },
          { sentenceParts: ['el rey → los '], solutions: ['reyes'] },
          { sentenceParts: ['el lunes → los '], solutions: ['lunes'] },
          { sentenceParts: ['un inglés → dos '], solutions: ['ingleses'] },
          { sentenceParts: ['el país → los '], solutions: ['países'] },
        ],
        feedback: {
          correct: "Parfait ! -s, -es, -z → -ces et les accents qui bougent : tout y est.",
          incorrect: "Voyelle → +s ; consonne → +es ; -z → -ces (peces) ; l'accent disparaît au pluriel (camión → camiones, inglés → ingleses) mais apparaît sur países ; lunes est invariable.",
        },
      },
      {
        id: 'exo_gn_3',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Choisissez l'article correct (attention aux hispanismes !).",
        content: [
          { question: "____ análisis es correcto. (l'analyse)", options: ['El', 'La'], solution: 'El' },
          { question: "____ leche está fría. (le lait)", options: ['La', 'El'], solution: 'La' },
          { question: "Me duele ____ mano.", options: ['la', 'el'], solution: 'la' },
          { question: "____ primavera es mi estación favorita. (le printemps)", options: ['La', 'El'], solution: 'La' },
          { question: "____ planeta Tierra es azul.", options: ['El', 'La'], solution: 'El' },
          { question: "Pásame ____ sal, por favor. (le sel)", options: ['la', 'el'], solution: 'la' },
          { question: "____ equipo ganó el partido. (l'équipe)", options: ['El', 'La'], solution: 'El' },
        ],
        feedback: {
          correct: "Très bien ! Les genres trompeurs sont domptés.",
          incorrect: "Hispanismes à retenir : el análisis, el planeta, el equipo (masculins) ; la leche, la sal, la primavera, la mano (féminins).",
        },
      },
      {
        id: 'exo_gn_4',
        type: ExerciseType.MATCH_PAIRS,
        instructions: "Associez le masculin et le féminin (radical modifié !).",
        content: [
          {
            pairs: [
              { left: 'el actor', right: 'la actriz' },
              { left: 'el gallo', right: 'la gallina' },
              { left: 'el caballo', right: 'la yegua' },
              { left: 'el hombre', right: 'la mujer' },
              { left: 'el padre', right: 'la madre' },
            ],
          },
          {
            pairs: [
              { left: 'el rey', right: 'la reina' },
              { left: 'el duque', right: 'la duquesa' },
              { left: 'el emperador', right: 'la emperatriz' },
              { left: 'el héroe', right: 'la heroína' },
              { left: 'el macho', right: 'la hembra' },
            ],
          },
        ],
        feedback: {
          correct: "Bravo ! Les féminins à radical modifié sont appariés.",
          incorrect: "Certains féminins changent de radical : actor → actriz, gallo → gallina, caballo → yegua, emperador → emperatriz...",
        },
      },
      {
        id: 'exo_gn_5',
        type: ExerciseType.TRANSLATION,
        instructions: "Traduisez la phrase suivante en espagnol (Thème).",
        content: [
          {
            frenchSentence: "Le problème, c'est que la voiture est en panne.",
            possibleSolutions: ["El problema es que el coche está averiado.", "El problema es que el coche está estropeado."],
            note: "Double piège de genre : <strong>el problema</strong> (masculin malgré le -a, origine grecque) et <strong>el coche</strong> (masculin alors que « voiture » est féminin en français). « En panne » = <strong>averiado/estropeado</strong>, avec estar.",
          },
        ],
        feedback: {
          correct: "Excellent ! Deux hispanismes déjoués d'un coup.",
          incorrect: "Rappel : el problema (masculin !) et el coche (masculin !). « est en panne » = está averiado (estar pour un état).",
        },
      },
    ],
    quiz: [
      {
        question: "Lequel de ces noms en -a est MASCULIN ?",
        options: ["el problema", "la novela", "la mesa"],
        answer: "el problema",
        feedback: {
          correct: "Exact ! Comme el día, el mapa, el idioma, el clima (origine grecque).",
          incorrect: "Les mots savants d'origine grecque en -a sont masculins : el problema, el tema, el sistema...",
        },
      },
      {
        question: "Quel est le pluriel de « el pez » ?",
        options: ["los peces", "los pezes", "los pezs"],
        answer: "los peces",
        feedback: {
          correct: "Oui ! Le z final devient -ces au pluriel.",
          incorrect: "Le z devient c devant e : el pez → los peces (comme la voz → las voces).",
        },
      },
      {
        question: "« La mer » se dit...",
        options: ["el mar (masculin)", "la mar toujours", "los mares uniquement"],
        answer: "el mar (masculin)",
        feedback: {
          correct: "Exact ! Un hispanisme classique : el mar, el coche, la sal, la sangre...",
          incorrect: "« mer » est masculin en espagnol courant : el mar Mediterráneo.",
        },
      },
      {
        question: "Que signifie « las esposas » (au pluriel) ?",
        options: ["les menottes (ou les épouses)", "seulement les épouses", "les promesses"],
        answer: "les menottes (ou les épouses)",
        feedback: {
          correct: "Exact ! Certains mots changent de sens au pluriel : el celo (zèle) / los celos (jalousie)...",
          incorrect: "la esposa = l'épouse, mais las esposas = les menottes ! Le nombre peut changer le sens.",
        },
      },
    ],
  },
  {
    id: 'articles',
    title: 'Les Articles',
    theory: ARTICULOS_THEORY,
    exercises: [
      {
        id: 'exo_art_1',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Complétez avec al, del, el, la, los ou las.",
        content: [
          { sentenceParts: ['Voy (a + el) colegio. → Voy '], solutions: ['al'] },
          { sentenceParts: ['María viene (de + el) parque. → María viene '], solutions: ['del'] },
          { sentenceParts: ['(?) agua está fría. → '], solutions: ['El'] },
          { sentenceParts: ['(?) aguas del río bajan turbias. → '], solutions: ['Las'] },
          { sentenceParts: ['Son (?) ocho de la mañana. → Son '], solutions: ['las'] },
          { sentenceParts: ['Nos vemos (?) lunes. → Nos vemos '], solutions: ['el'] },
        ],
        feedback: {
          correct: "Parfait ! Contractions, el agua et les emplois horaires : tout est bon.",
          incorrect: "a + el = al, de + el = del. Devant a-/ha- tonique féminin : el agua (mais las aguas). L'heure : son las ocho. Le jour : el lunes.",
        },
      },
      {
        id: 'exo_art_2',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Article ou pas d'article ? Choisissez la phrase correcte.",
        content: [
          { question: "Je veux du chocolat.", options: ['Quiero chocolate.', 'Quiero del chocolate.'], solution: 'Quiero chocolate.' },
          { question: "Il veut un autre verre d'eau.", options: ['Quiere otro vaso de agua.', 'Quiere un otro vaso de agua.'], solution: 'Quiere otro vaso de agua.' },
          { question: "Je vois des oiseaux.", options: ['Veo pájaros.', 'Veo unos pájaros siempre.'], solution: 'Veo pájaros.' },
          { question: "La France est belle.", options: ['Francia es bonita.', 'La Francia es bonita.'], solution: 'Francia es bonita.' },
          { question: "La France du XXe siècle.", options: ['La Francia del siglo XX.', 'Francia del siglo XX.'], solution: 'La Francia del siglo XX.' },
          { question: "Je suis à la maison.", options: ['Estoy en casa.', 'Estoy en la casa.'], solution: 'Estoy en casa.' },
          { question: "J'apprends l'anglais.", options: ['Aprendo inglés.', 'Aprendo el inglés.'], solution: 'Aprendo inglés.' },
        ],
        feedback: {
          correct: "Excellent ! Les omissions typiques de l'espagnol sont acquises.",
          incorrect: "Pas de partitif (quiero chocolate), pas d'article après otro, pas d'article devant les pays non déterminés (Francia), ni avec casa/clase/misa, ni après aprender/tocar/practicar.",
        },
      },
      {
        id: 'exo_art_3',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "L'article neutre LO : choisissez la bonne traduction.",
        content: [
          { question: "« Ce qui est dit est dit. »", options: ['Lo dicho, dicho.', 'El dicho, dicho.'], solution: 'Lo dicho, dicho.' },
          { question: "« J'aime ce qui est petit. »", options: ['Me gusta lo pequeño.', 'Me gusta el pequeño.'], solution: 'Me gusta lo pequeño.' },
          { question: "« ce que tu me dis »", options: ['lo que me dices', 'el que me dices'], solution: 'lo que me dices' },
          { question: "« Le mieux est l'ennemi du bien. »", options: ['Lo mejor es enemigo de lo bueno.', 'El mejor es enemigo del bueno.'], solution: 'Lo mejor es enemigo de lo bueno.' },
        ],
        feedback: {
          correct: "Très bien ! LO + adjectif = « ce qui est... ».",
          incorrect: "L'article neutre lo s'emploie devant un adjectif pour dire « ce qui est » : lo bueno, lo pequeño, lo que...",
        },
      },
      {
        id: 'exo_art_4',
        type: ExerciseType.LISTENING,
        instructions: "Écoutez et écrivez la phrase (attention aux articles et contractions).",
        content: [
          { audioText: 'Voy al colegio.', possibleSolutions: ['Voy al colegio.', 'Voy al colegio'] },
          { audioText: 'El agua está fría.', possibleSolutions: ['El agua está fría.', 'El agua esta fria'] },
          { audioText: 'Son las ocho.', possibleSolutions: ['Son las ocho.', 'Son las ocho'] },
          { audioText: 'María viene del parque.', possibleSolutions: ['María viene del parque.', 'Maria viene del parque'] },
        ],
        feedback: {
          correct: "Bravo ! Votre oreille reconnaît les articles et les contractions.",
          incorrect: "Réécoutez : al = a + el, del = de + el, et « el agua » malgré le féminin.",
        },
      },
      {
        id: 'exo_art_5',
        type: ExerciseType.TRANSLATION,
        instructions: "Traduisez la phrase suivante en espagnol (Thème).",
        content: [
          {
            frenchSentence: "Alejandro veut un autre verre d'eau.",
            possibleSolutions: ["Alejandro quiere otro vaso de agua."],
            note: "Après <strong>otro</strong>, l'article indéfini est TOUJOURS omis : <strong>otro vaso</strong>, jamais « un otro vaso ». C'est l'une des fautes de français-espagnol les plus courantes !",
          },
        ],
        feedback: {
          correct: "Parfait ! « un autre » = otro, sans article.",
          incorrect: "Piège classique : « un autre » se traduit par otro tout seul (jamais « un otro »).",
        },
      },
    ],
    quiz: [
      {
        question: "Pourquoi dit-on « el agua » alors que agua est féminin ?",
        options: [
          "Pour l'euphonie, devant un a- tonique (mais las aguas au pluriel).",
          "Parce que agua est masculin.",
          "C'est une erreur courante.",
        ],
        answer: "Pour l'euphonie, devant un a- tonique (mais las aguas au pluriel).",
        feedback: {
          correct: "Exact ! Le mot reste féminin : el agua turbia, las aguas.",
          incorrect: "agua est féminin, mais « la a- » sonne mal : on dit el agua (et las aguas au pluriel).",
        },
      },
      {
        question: "Comment traduit-on « Je veux du pain » ?",
        options: ["Quiero pan.", "Quiero del pan.", "Quiero un pan siempre."],
        answer: "Quiero pan.",
        feedback: {
          correct: "Parfait ! Le partitif français ne se traduit pas.",
          incorrect: "Pas de partitif en espagnol : Quiero pan, Como carne, Bebo agua.",
        },
      },
      {
        question: "Quelle contraction est obligatoire ?",
        options: ["a + el = al et de + el = del", "a + la = ala", "de + los = delos"],
        answer: "a + el = al et de + el = del",
        feedback: {
          correct: "Exact ! Ce sont les deux seules contractions de l'espagnol.",
          incorrect: "Seulement deux contractions existent : al (a+el) et del (de+el).",
        },
      },
      {
        question: "« Lo » s'emploie...",
        options: [
          "devant un adjectif pour dire « ce qui est » (lo bueno).",
          "devant n'importe quel nom masculin.",
          "seulement dans les questions.",
        ],
        answer: "devant un adjectif pour dire « ce qui est » (lo bueno).",
        feedback: {
          correct: "Oui ! lo bueno = ce qui est bon, lo que = ce que.",
          incorrect: "lo est l'article NEUTRE : lo + adjectif substantive l'adjectif (lo pequeño = ce qui est petit).",
        },
      },
    ],
  },
  {
    id: 'demonstratifs_possessifs',
    title: 'Démonstratifs et Possessifs',
    theory: DEMOSTRATIVOS_POSESIVOS_THEORY,
    exercises: [
      {
        id: 'exo_dp_1',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Este, ese ou aquel ? Choisissez selon la distance.",
        content: [
          { question: "____ libro que tengo en la mano es mío. (tout près de moi)", options: ['Este', 'Ese', 'Aquel'], solution: 'Este' },
          { question: "____ libro que tienes tú es interesante. (près de toi)", options: ['Ese', 'Este', 'Aquel'], solution: 'Ese' },
          { question: "____ montañas que se ven a lo lejos son los Pirineos. (là-bas)", options: ['Aquellas', 'Estas', 'Esas'], solution: 'Aquellas' },
          { question: "____ mañana he desayunado tarde. (ce matin, aujourd'hui)", options: ['Esta', 'Esa', 'Aquella'], solution: 'Esta' },
          { question: "____ verano de 1995 fue inolvidable. (été lointain)", options: ['Aquel', 'Este', 'Ese'], solution: 'Aquel' },
          { question: "____ no se dice. (reprendre une idée : cela)", options: ['Eso', 'Ese', 'Esa'], solution: 'Eso' },
        ],
        feedback: {
          correct: "Parfait ! Les trois distances (este/ese/aquel) sont bien calibrées.",
          incorrect: "este = près de moi / maintenant ; ese = près de toi / assez proche ; aquel = loin / lointain. Le neutre eso reprend une idée.",
        },
      },
      {
        id: 'exo_dp_2',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Complétez avec le possessif atone (mi, tu, su, nuestro...).",
        content: [
          { sentenceParts: ['(à moi) → '], solutions: ['mi'], },
          { sentenceParts: ['(à nous, fém.) → hermana = '], solutions: ['nuestra'] },
          { sentenceParts: ['(à vous vosotros, fém. pl.) → hermanas = '], solutions: ['vuestras'] },
          { sentenceParts: ['(à toi) → libros = '], solutions: ['tus'] },
          { sentenceParts: ['(à lui) → coche = '], solutions: ['su'] },
          { sentenceParts: ['(à eux) → casas = '], solutions: ['sus'] },
        ],
        feedback: {
          correct: "Très bien ! L'accord se fait avec l'objet possédé.",
          incorrect: "Le possessif s'accorde en genre/nombre avec l'objet possédé : nuestra hermana, vuestras hermanas, tus libros. su = sa/leur/votre (ambigu !).",
        },
      },
      {
        id: 'exo_dp_3',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "« Celui de », « ce que »... choisissez la traduction correcte.",
        content: [
          { question: "Ce livre est celui de mon ami.", options: ['Ese libro es el de mi amigo.', 'Ese libro es aquel de mi amigo.'], solution: 'Ese libro es el de mi amigo.' },
          { question: "Ces boîtes sont celles de sa grand-mère.", options: ['Estas cajas son las de su abuela.', 'Estas cajas son esas de su abuela.'], solution: 'Estas cajas son las de su abuela.' },
          { question: "Je veux ce que tu m'as promis.", options: ['Quiero lo que me has prometido.', 'Quiero eso que me has prometido.'], solution: 'Quiero lo que me has prometido.' },
          { question: "Ceux qui sont ici, venez !", options: ['Los que estáis aquí, venid.', 'Esos que estáis aquí, venid.'], solution: 'Los que estáis aquí, venid.' },
        ],
        feedback: {
          correct: "Excellent ! Article défini + de/que : le réflexe est pris.",
          incorrect: "« celui de » = el de (jamais de démonstratif), « celui qui » = el que, « ce que » = lo que.",
        },
      },
      {
        id: 'exo_dp_4',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Possessif tonique et tournures espagnoles : choisissez.",
        content: [
          { question: "Les lettres sur la table sont à toi.", options: ['Las cartas en la mesa son tuyas.', 'Las cartas en la mesa son tus.'], solution: 'Las cartas en la mesa son tuyas.' },
          { question: "C'est une de mes filles.", options: ['Es una hija mía.', 'Es una mi hija.'], solution: 'Es una hija mía.' },
          { question: "Je me lave les mains.", options: ['Me lavo las manos.', 'Lavo mis manos.'], solution: 'Me lavo las manos.' },
          { question: "Bois ta soupe !", options: ['¡Tómate la sopa!', '¡Toma tu sopa siempre!'], solution: '¡Tómate la sopa!' },
          { question: "Le nôtre ressemble au vôtre.", options: ['El nuestro se parece al vuestro.', 'Nuestro se parece a vuestro.'], solution: 'El nuestro se parece al vuestro.' },
        ],
        feedback: {
          correct: "Bravo ! Formes toniques et remplacement du possessif : tout est là.",
          incorrect: "« à toi » = tuyas (tonique après ser) ; « une de mes » = una hija mía ; corps/vêtements/nourriture → article + pronom réfléchi (me lavo las manos).",
        },
      },
      {
        id: 'exo_dp_5',
        type: ExerciseType.TRANSLATION,
        instructions: "Traduisez la phrase suivante en espagnol (Thème).",
        content: [
          {
            frenchSentence: "Ce livre est le mien, celui-là est le tien.",
            possibleSolutions: ["Este libro es el mío, ése es el tuyo.", "Este libro es el mío, ese es el tuyo.", "Este libro es mío, ése es tuyo.", "Este libro es mío, ese es tuyo."],
            note: "Démonstratif proche <strong>este</strong> + pronom possessif <strong>el mío / el tuyo</strong> (article + forme tonique). Le pronom démonstratif <em>ése</em> peut s'écrire avec ou sans accent selon la norme récente de la RAE.",
          },
        ],
        feedback: {
          correct: "Excellent ! Démonstratifs et pronoms possessifs combinés sans faute.",
          incorrect: "« le mien » = el mío, « le tien » = el tuyo (article + forme tonique). « ce livre » (près de moi) = este libro.",
        },
      },
    ],
    quiz: [
      {
        question: "Quelle est la différence entre este, ese et aquel ?",
        options: [
          "La distance : près de moi / près de toi / loin.",
          "Le genre : masculin / féminin / neutre.",
          "Aucune, ce sont des synonymes.",
        ],
        answer: "La distance : près de moi / près de toi / loin.",
        feedback: {
          correct: "Exact ! 3 degrés d'éloignement, spatial ou temporel.",
          incorrect: "L'espagnol distingue 3 distances : este (yo), ese (tú), aquel (él/là-bas).",
        },
      },
      {
        question: "Comment traduit-on « celui de mon ami » ?",
        options: ["el de mi amigo", "este de mi amigo", "aquel de mi amigo"],
        answer: "el de mi amigo",
        feedback: {
          correct: "Parfait ! Article défini + de, jamais de démonstratif.",
          incorrect: "« celui de » = el de (article défini). Le démonstratif ne s'emploie jamais ici.",
        },
      },
      {
        question: "« su coche » peut signifier...",
        options: [
          "sa voiture, leur voiture ou votre voiture (usted).",
          "seulement sa voiture.",
          "seulement votre voiture.",
        ],
        answer: "sa voiture, leur voiture ou votre voiture (usted).",
        feedback: {
          correct: "Exact ! su est ambigu : le contexte (ou « de usted ») précise.",
          incorrect: "su couvre él/ella/ellos/ellas/usted/ustedes : c'est le contexte qui tranche.",
        },
      },
      {
        question: "Comment dit-on « Je me lave les mains » ?",
        options: ["Me lavo las manos.", "Lavo mis manos.", "Me lavo mis manos."],
        answer: "Me lavo las manos.",
        feedback: {
          correct: "Parfait ! Pronom réfléchi + article défini remplacent le possessif.",
          incorrect: "Pour le corps, l'espagnol évite le possessif : me lavo LAS manos.",
        },
      },
    ],
  },
  {
    id: 'pronoms',
    title: 'Les Pronoms Personnels',
    theory: PRONOMBRES_THEORY,
    exercises: [
      {
        id: 'exo_pro_1',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Remplacez le complément souligné par le bon pronom.",
        content: [
          { question: "Veo «el libro» → ____ veo.", options: ['Lo', 'Le', 'La'], solution: 'Lo' },
          { question: "Veo «a María» → ____ veo.", options: ['La', 'Le', 'Lo'], solution: 'La' },
          { question: "Escribo «a mi madre» → ____ escribo.", options: ['Le', 'La', 'Lo'], solution: 'Le' },
          { question: "Compro «las flores» → ____ compro.", options: ['Las', 'Les', 'Los'], solution: 'Las' },
          { question: "Hablo «a mis amigos» → ____ hablo.", options: ['Les', 'Los', 'Las'], solution: 'Les' },
          { question: "Conozco «a tus hermanos» → ____ conozco.", options: ['Los', 'Les', 'Las'], solution: 'Los' },
        ],
        feedback: {
          correct: "Parfait ! COD : lo/la/los/las ; COI : le/les. La distinction est nette.",
          incorrect: "COD → lo, la, los, las (selon le genre). COI → le, les (sans genre). Astuce : si la phrase passe à la voix passive, c'est un COD.",
        },
      },
      {
        id: 'exo_pro_2',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Remplacez les DEUX compléments par des pronoms (attention à SE LO !).",
        content: [
          { sentenceParts: ['Pedro da un regalo a Paco. → Pedro '], solutions: ['se lo da'] },
          { sentenceParts: ['Digo la verdad a mis padres. → '], solutions: ['Se la digo'] },
          { sentenceParts: ['Me das el libro. → Tú '], solutions: ['me lo das'] },
          { sentenceParts: ['Nos cuentan las historias. → '], solutions: ['Nos las cuentan'] },
          { sentenceParts: ['Te presto mis apuntes. → '], solutions: ['Te los presto'] },
        ],
        feedback: {
          correct: "Excellent ! L'ordre COI + COD et la transformation le → se sont acquis.",
          incorrect: "Ordre : COI puis COD (me lo, te los, nos las). Et quand le/les rencontre lo/la/los/las → le devient SE : se lo da (jamais « le lo »).",
        },
      },
      {
        id: 'exo_pro_3',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Vouvoiement : choisissez la forme correcte avec usted/ustedes.",
        content: [
          { question: "Monsieur, pouvez-vous m'aider ? →", options: ['¿Puede usted ayudarme?', '¿Puedes usted ayudarme?', '¿Podéis usted ayudarme?'], solution: '¿Puede usted ayudarme?' },
          { question: "Messieurs, vous ne pouvez pas entrer. →", options: ['Señores, no pueden entrar.', 'Señores, no podéis entrar.', 'Señores, no puedes entrar.'], solution: 'Señores, no pueden entrar.' },
          { question: "(à des amis) Vous venez au cinéma ? →", options: ['¿Venís al cine?', '¿Vienen al cine ustedes siempre?', '¿Viene al cine?'], solution: '¿Venís al cine?' },
          { question: "Je vous parle, Madame. →", options: ['Le hablo, señora.', 'Te hablo, señora.', 'Os hablo, señora.'], solution: 'Le hablo, señora.' },
        ],
        feedback: {
          correct: "Très bien ! usted = 3ᵉ personne, vosotros = tutoiement collectif.",
          incorrect: "usted → verbe à la 3ᵉ pers. sing. (puede, le hablo) ; ustedes → 3ᵉ pers. pl. (pueden) ; vosotros → 2ᵉ pers. pl. familière (venís).",
        },
      },
      {
        id: 'exo_pro_4',
        type: ExerciseType.WORD_ORDER,
        instructions: "Remettez les mots dans l'ordre (place des pronoms !).",
        content: [
          { words: ['No', 'te', 'lo', 'quiero', 'decir'], solution: 'No te lo quiero decir', translation: 'Je ne veux pas te le dire' },
          { words: ['Me', 'lo', 'dirá', 'mañana'], solution: 'Me lo dirá mañana', translation: 'Il me le dira demain' },
          { words: ['¿Quieres', 'venir', 'conmigo', 'al', 'cine?'], solution: '¿Quieres venir conmigo al cine?', translation: 'Veux-tu venir avec moi au cinéma ?' },
          { words: ['A', 'nosotros', 'nos', 'gusta', 'patinar'], solution: 'A nosotros nos gusta patinar', translation: 'Nous, nous aimons patiner' },
        ],
        feedback: {
          correct: "Parfait ! Pronoms devant le verbe conjugué, conmigo, et la redondance a nosotros... nos.",
          incorrect: "Les pronoms se placent devant le verbe conjugué (COI puis COD). « avec moi » = conmigo. La redondance « A nosotros, nos... » renforce le pronom.",
        },
      },
      {
        id: 'exo_pro_5',
        type: ExerciseType.TRANSLATION,
        instructions: "Traduisez la phrase suivante en espagnol (Thème).",
        content: [
          {
            frenchSentence: "Je te le donne demain.",
            possibleSolutions: ["Te lo doy mañana.", "Te lo daré mañana."],
            note: "Ordre invariable : <strong>COI (te) puis COD (lo)</strong>, devant le verbe conjugué. L'espagnol emploie volontiers le présent pour un futur proche : <strong>te lo doy mañana</strong>.",
          },
        ],
        feedback: {
          correct: "Excellent ! te lo : l'ordre des pronoms est un réflexe.",
          incorrect: "« te le » se traduit te lo (COI puis COD), placé devant le verbe : Te lo doy mañana.",
        },
      },
    ],
    quiz: [
      {
        question: "Pourquoi dit-on « Pedro se lo da » et pas « Pedro le lo da » ?",
        options: [
          "Le COI le/les devient SE devant lo/la/los/las.",
          "C'est un verbe pronominal.",
          "se remplace le sujet.",
        ],
        answer: "Le COI le/les devient SE devant lo/la/los/las.",
        feedback: {
          correct: "Exact ! le + lo est imprononçable : le → se.",
          incorrect: "Règle d'or : quand le/les (COI) précède lo/la/los/las (COD), il se transforme en se.",
        },
      },
      {
        question: "Avec « usted », le verbe se conjugue à quelle personne ?",
        options: ["3ᵉ personne du singulier", "2ᵉ personne du singulier", "2ᵉ personne du pluriel"],
        answer: "3ᵉ personne du singulier",
        feedback: {
          correct: "Parfait ! ¿Puede usted...? Comme pour él/ella.",
          incorrect: "usted (vouvoiement) prend la 3ᵉ personne : usted habla, usted puede.",
        },
      },
      {
        question: "Comment dit-on « avec moi » ?",
        options: ["conmigo", "con mí", "con yo"],
        answer: "conmigo",
        feedback: {
          correct: "Exact ! Formes spéciales : conmigo, contigo, consigo.",
          incorrect: "« avec moi » = conmigo (jamais con mí). De même : contigo, consigo.",
        },
      },
      {
        question: "Où placer les pronoms avec un infinitif : « je ne veux pas te le dire » ?",
        options: [
          "No te lo quiero decir OU No quiero decírtelo (les deux).",
          "Seulement No quiero decírtelo.",
          "Seulement No te lo quiero decir.",
        ],
        answer: "No te lo quiero decir OU No quiero decírtelo (les deux).",
        feedback: {
          correct: "Exact ! Devant le verbe conjugué, ou enclise sur l'infinitif : les deux sont corrects.",
          incorrect: "Avec verbe conjugué + infinitif, deux options valides : pronoms devant (no te lo quiero decir) ou enclise (no quiero decírtelo).",
        },
      },
    ],
  },
  {
    id: 'numeraux',
    title: 'Les Numéraux',
    theory: NUMERALES_THEORY,
    exercises: [
      {
        id: 'exo_num_1',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Écrivez les nombres en toutes lettres.",
        content: [
          { sentenceParts: ['16 → '], solutions: ['dieciséis'] },
          { sentenceParts: ['21 (coches) → '], solutions: ['veintiún'] },
          { sentenceParts: ['32 → '], solutions: ['treinta y dos'] },
          { sentenceParts: ['100 (invitados) → '], solutions: ['cien'] },
          { sentenceParts: ['500 (casas) → '], solutions: ['quinientas'] },
          { sentenceParts: ['1000 → '], solutions: ['mil'] },
        ],
        feedback: {
          correct: "Parfait ! Apocopes et accords des centaines inclus.",
          incorrect: "veintiún coches (apocope), cien invitados (ciento → cien), quinientas casas (accord féminin), y seulement entre dizaines et unités (treinta y dos).",
        },
      },
      {
        id: 'exo_num_2',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Choisissez la forme correcte.",
        content: [
          { question: "____ euros (100)", options: ['cien', 'ciento', 'cientos'], solution: 'cien' },
          { question: "____ dos euros (102)", options: ['ciento', 'cien', 'cien y'], solution: 'ciento' },
          { question: "trescient____ páginas (300 pages)", options: ['as', 'os', 'o'], solution: 'as' },
          { question: "un millón ____ habitantes", options: ['de', 'a', '(rien)'], solution: 'de' },
          { question: "1 milliard =", options: ['mil millones', 'un billón', 'cien millones'], solution: 'mil millones' },
          { question: "31 casas =", options: ['treinta y una casas', 'treinta y un casas', 'treinta y uno casas'], solution: 'treinta y una casas' },
        ],
        feedback: {
          correct: "Excellent ! cien/ciento, millón de, mil millones : les pièges sont évités.",
          incorrect: "cien devant un nom, ciento dans 101-199. Les centaines s'accordent (trescientas). millón + de. Le milliard = mil millones. una s'accorde : treinta y una casas.",
        },
      },
      {
        id: 'exo_num_3',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Ordinaux, siècles et rois : choisissez la forme correcte.",
        content: [
          { question: "le premier ministre →", options: ['el primer ministro', 'el primero ministro'], solution: 'el primer ministro' },
          { question: "le troisième étage →", options: ['el tercer piso', 'el tercero piso'], solution: 'el tercer piso' },
          { question: "Louis XIV →", options: ['Luis catorce', 'Luis decimocuarto'], solution: 'Luis catorce' },
          { question: "le XVIe siècle →", options: ['el siglo dieciséis', 'el siglo decimosexto'], solution: 'el siglo dieciséis' },
          { question: "Alphonse X (dixième) →", options: ['Alfonso décimo', 'Alfonso diez siempre'], solution: 'Alfonso décimo' },
          { question: "la dixième expédition →", options: ['la décima expedición', 'el décimo expedición'], solution: 'la décima expedición' },
        ],
        feedback: {
          correct: "Très bien ! primer/tercer, et cardinal après le nom au-delà de 10.",
          incorrect: "primero/tercero s'apocopent (primer ministro). Au-delà de 10 : cardinal APRÈS le nom (Luis catorce, el siglo dieciséis). Jusqu'à 10 : ordinal possible (Alfonso décimo).",
        },
      },
      {
        id: 'exo_num_4',
        type: ExerciseType.LISTENING,
        instructions: "Écoutez le nombre et écrivez-le en chiffres.",
        content: [
          { audioText: 'setenta y cinco', possibleSolutions: ['75'] },
          { audioText: 'doscientos cuarenta y tres', possibleSolutions: ['243'] },
          { audioText: 'mil novecientos noventa y dos', possibleSolutions: ['1992'] },
          { audioText: 'quinientos sesenta', possibleSolutions: ['560'] },
        ],
        feedback: {
          correct: "Bravo ! Votre oreille décode les nombres espagnols.",
          incorrect: "Décomposez : centaines (doscientos, quinientos, novecientos) + dizaines (cuarenta, sesenta, noventa) + y + unités.",
        },
      },
      {
        id: 'exo_num_5',
        type: ExerciseType.TRANSLATION,
        instructions: "Traduisez la phrase suivante en espagnol (Thème).",
        content: [
          {
            frenchSentence: "Environ 20 % des Français vivent à Paris.",
            possibleSolutions: ["Un 20% de los franceses vive en París.", "Un veinte por ciento de los franceses vive en París."],
            note: "Pourcentage vague → article <strong>indéfini</strong> (un 20%). Précis → article défini (el 20%). Et le verbe qui suit un % est au <strong>singulier</strong> : vive.",
          },
        ],
        feedback: {
          correct: "Excellent ! Article + verbe au singulier : les pourcentages sont maîtrisés.",
          incorrect: "Les % prennent un article (un 20% si approximatif) et le verbe est au singulier : un 20% de los franceses VIVE en París.",
        },
      },
    ],
    quiz: [
      {
        question: "Quand emploie-t-on « y » dans un nombre ?",
        options: [
          "Seulement entre dizaines et unités (treinta y dos).",
          "Entre centaines et dizaines (ciento y treinta).",
          "Partout.",
        ],
        answer: "Seulement entre dizaines et unités (treinta y dos).",
        feedback: {
          correct: "Exact ! ciento dos (sans y), mais treinta y dos.",
          incorrect: "y n'apparaît qu'entre dizaines et unités : treinta y dos, mais ciento dos.",
        },
      },
      {
        question: "Comment dit-on « 500 maisons » ?",
        options: ["quinientas casas", "quinientos casas", "cinco cientas casas"],
        answer: "quinientas casas",
        feedback: {
          correct: "Parfait ! Les centaines s'accordent en genre : quinientAs casas.",
          incorrect: "500 = quinientos/quinientas, et l'accord au féminin s'impose : quinientas casas.",
        },
      },
      {
        question: "Comment dit-on « Louis XIV » ?",
        options: ["Luis catorce", "Luis decimocuarto", "Luis el catorceno"],
        answer: "Luis catorce",
        feedback: {
          correct: "Exact ! Au-delà de 10, cardinal après le nom : Luis catorce, siglo dieciséis.",
          incorrect: "Pour les rois au-delà de X : cardinal postposé → Luis catorce.",
        },
      },
      {
        question: "1 milliard se dit...",
        options: ["mil millones", "un billón", "un millardo siempre"],
        answer: "mil millones",
        feedback: {
          correct: "Exact ! Attention : un billón espagnol = mille milliards !",
          incorrect: "Le milliard = mil millones. (billón = 10¹², faux ami !)",
        },
      },
    ],
  },
  {
    id: 'indefinis',
    title: 'Les Indéfinis',
    theory: INDEFINIDOS_THEORY,
    exercises: [
      {
        id: 'exo_ind_1',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Complétez avec algún, alguno, alguna, ningún ou ninguna.",
        content: [
          { sentenceParts: ['¿Tienes (?) libro de gramática? → ¿Tienes '], solutions: ['algún'] },
          { sentenceParts: ['No tengo (?) problema. → No tengo '], solutions: ['ningún'] },
          { sentenceParts: ['(?) día volverá. → '], solutions: ['Algún'] },
          { sentenceParts: ['No hay (?) solución. → No hay '], solutions: ['ninguna'] },
          { sentenceParts: ['¿Queda (?) pregunta? → ¿Queda '], solutions: ['alguna'] },
        ],
        feedback: {
          correct: "Parfait ! Les apocopes algún/ningún devant nom masculin sont acquises.",
          incorrect: "Devant un nom masculin singulier : alguno → algún, ninguno → ningún. Au féminin, pas d'apocope : alguna, ninguna.",
        },
      },
      {
        id: 'exo_ind_2',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Nadie, nada, alguien, algo : choisissez la phrase correcte.",
        content: [
          { question: "Personne ne lui répond.", options: ['Nadie le responde.', 'Nadie no le responde.'], solution: 'Nadie le responde.' },
          { question: "Il ne dit rien.", options: ['No dice nada.', 'Dice nada.'], solution: 'No dice nada.' },
          { question: "Je ne vois personne.", options: ['No veo a nadie.', 'No veo nadie.'], solution: 'No veo a nadie.' },
          { question: "Quelqu'un t'appelle.", options: ['Alguien te llama.', 'Algún te llama.'], solution: 'Alguien te llama.' },
          { question: "J'ai quelque chose d'intéressant.", options: ['Tengo algo interesante.', 'Tengo algo de interesante.'], solution: 'Tengo algo interesante.' },
          { question: "Rien ne me plaît. (indéfini AVANT le verbe)", options: ['Nada me gusta.', 'No nada me gusta.'], solution: 'Nada me gusta.' },
        ],
        feedback: {
          correct: "Excellent ! Double construction et « a » personnel : tout est bon.",
          incorrect: "Avant le verbe → pas de no (Nadie responde). Après le verbe → no obligatoire (No dice nada). COD de personne → a : No veo A nadie. « quelque chose de » = algo + adjectif direct.",
        },
      },
      {
        id: 'exo_ind_3',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Todo, otro, cada, cualquiera : choisissez la forme correcte.",
        content: [
          { question: "Je sais tout. →", options: ['Lo sé todo.', 'Sé todo siempre.'], solution: 'Lo sé todo.' },
          { question: "Il y a d'autres hôtels. →", options: ['Hay otros hoteles.', 'Hay unos otros hoteles.'], solution: 'Hay otros hoteles.' },
          { question: "J'attendais deux autres personnes. →", options: ['Esperaba a otras dos personas.', 'Esperaba a dos otras personas.'], solution: 'Esperaba a otras dos personas.' },
          { question: "Chaque femme avait un chapeau. →", options: ['Cada mujer tenía un sombrero.', 'Cada una mujer tenía un sombrero.'], solution: 'Cada mujer tenía un sombrero.' },
          { question: "N'importe quelle chose →", options: ['cualquier cosa', 'cualquiera cosa'], solution: 'cualquier cosa' },
          { question: "Ils étaient tout seuls. →", options: ['Estaban solos.', 'Estaban todos solos siempre.'], solution: 'Estaban solos.' },
        ],
        feedback: {
          correct: "Bravo ! lo...todo, otro sans article, otro + numéral, cualquier : maîtrisé.",
          incorrect: "« tout » COD exige lo : Lo sé todo. otro sans article (otros hoteles), et otro AVANT le numéral (otras dos). cualquiera s'apocope : cualquier cosa. « tout seuls » ne se traduit pas (solos).",
        },
      },
      {
        id: 'exo_ind_4',
        type: ExerciseType.WORD_ORDER,
        instructions: "Remettez les mots dans l'ordre.",
        content: [
          { words: ['No', 'veo', 'a', 'nadie', 'en', 'la', 'calle'], solution: 'No veo a nadie en la calle', translation: 'Je ne vois personne dans la rue' },
          { words: ['Algún', 'día', 'volverá', 'a', 'España'], solution: 'Algún día volverá a España', translation: 'Un jour, il reviendra en Espagne' },
          { words: ['Mis', 'propios', 'hijos', 'me', 'abandonan'], solution: 'Mis propios hijos me abandonan', translation: 'Mes propres enfants m’abandonnent' },
          { words: ['Tengo', 'el', 'mismo', 'bolígrafo', 'que', 'ella'], solution: 'Tengo el mismo bolígrafo que ella', translation: "J'ai le même stylo qu'elle" },
        ],
        feedback: {
          correct: "Parfait ! Les indéfinis trouvent leur place naturellement.",
          incorrect: "Ordre : no + verbe + a nadie ; algún + nom ; propio avant le nom ; el mismo... que.",
        },
      },
      {
        id: 'exo_ind_5',
        type: ExerciseType.TRANSLATION,
        instructions: "Traduisez la phrase suivante en espagnol (Thème).",
        content: [
          {
            frenchSentence: "Aucun de nous ne viendra.",
            possibleSolutions: ["Ninguno de nosotros vendrá.", "No vendrá ninguno de nosotros."],
            note: "Deux constructions valides : <strong>Ninguno de nosotros vendrá</strong> (indéfini avant le verbe, pas de « no ») ou <strong>No vendrá ninguno de nosotros</strong> (après le verbe, « no » obligatoire).",
          },
        ],
        feedback: {
          correct: "Excellent ! La double construction de ninguno est comprise.",
          incorrect: "Avant le verbe : Ninguno de nosotros vendrá. Après : No vendrá ninguno de nosotros. Les deux sont correctes !",
        },
      },
    ],
    quiz: [
      {
        question: "Quand « alguno » devient-il « algún » ?",
        options: [
          "Devant un nom masculin singulier.",
          "Devant tous les noms.",
          "Jamais.",
        ],
        answer: "Devant un nom masculin singulier.",
        feedback: {
          correct: "Exact ! Algún día, mais alguna vez et alguno employé seul.",
          incorrect: "Apocope devant un nom masculin singulier : algún día (comme ningún problema).",
        },
      },
      {
        question: "Quelle phrase est correcte ?",
        options: ["No veo a nadie.", "No veo nadie.", "Veo a nadie."],
        answer: "No veo a nadie.",
        feedback: {
          correct: "Parfait ! nadie après le verbe exige no, et le a personnel s'impose.",
          incorrect: "nadie COD de personne prend le « a » personnel, et après le verbe il faut no : No veo a nadie.",
        },
      },
      {
        question: "Comment dit-on « Je sais tout » ?",
        options: ["Lo sé todo.", "Sé todo.", "Todo sé siempre."],
        answer: "Lo sé todo.",
        feedback: {
          correct: "Exact ! todo COD est obligatoirement doublé par lo.",
          incorrect: "todo pronom COD exige le pronom lo : Lo sé todo, lo ve todo.",
        },
      },
      {
        question: "« N'importe quel autre homme » se dit...",
        options: ["cualquier otro hombre", "cualquiera otro hombre", "otro cualquier hombre"],
        answer: "cualquier otro hombre",
        feedback: {
          correct: "Parfait ! cualquiera s'apocope en cualquier devant le nom.",
          incorrect: "Devant un nom, cualquiera perd son -a : cualquier otro hombre.",
        },
      },
    ],
  },
  {
    id: 'style_indirect',
    title: 'Du Style Direct au Style Indirect',
    theory: ESTILO_INDIRECTO_THEORY,
    exercises: [
      {
        id: 'exo_si_1',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Verbe introducteur au PRÉSENT : transposez au style indirect.",
        content: [
          { question: "Dice: «Yo me marcho» →", options: ['Dice que se marcha.', 'Dice que me marcho.', 'Dice que se marchaba.'], solution: 'Dice que se marcha.' },
          { question: "María dice: «Tengo hambre» →", options: ['María dice que tiene hambre.', 'María dice que tengo hambre.', 'María dice que tenía hambre.'], solution: 'María dice que tiene hambre.' },
          { question: "Pregunta: «¿Vienes?» →", options: ['Pregunta si viene.', 'Pregunta que viene.', 'Pregunta cuándo viene.'], solution: 'Pregunta si viene.' },
          { question: "Pregunta: «¿Cuál es tu nombre?» →", options: ['Pregunta cuál es su nombre.', 'Pregunta cual es su nombre.', 'Pregunta que su nombre.'], solution: 'Pregunta cuál es su nombre.' },
        ],
        feedback: {
          correct: "Parfait ! Personnes ajustées, « si » pour les questions oui/non, accent conservé.",
          incorrect: "Introducteur au présent → le temps ne change pas, mais la personne oui (yo → él). Question totale → si. Le mot interrogatif garde son accent (cuál).",
        },
      },
      {
        id: 'exo_si_2',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Verbe introducteur au PASSÉ : appliquez la concordance des temps.",
        content: [
          { question: "Dijo: «Como en casa» →", options: ['Dijo que comía en casa.', 'Dijo que come en casa.', 'Dijo que comerá en casa.'], solution: 'Dijo que comía en casa.' },
          { question: "Dijo: «He comido» →", options: ['Dijo que había comido.', 'Dijo que ha comido.', 'Dijo que comió siempre.'], solution: 'Dijo que había comido.' },
          { question: "Dijo: «Comeré mañana» →", options: ['Dijo que comería al día siguiente.', 'Dijo que comerá mañana.', 'Dijo que comía mañana.'], solution: 'Dijo que comería al día siguiente.' },
          { question: "Dijo: «¡Come!» →", options: ['Dijo que comiera.', 'Dijo que come.', 'Dijo que comerá.'], solution: 'Dijo que comiera.' },
        ],
        feedback: {
          correct: "Excellent ! Présent→imparfait, PC→PQP, futur→conditionnel, impératif→subj. imparfait.",
          incorrect: "Introducteur au passé : présent → imparfait (comía), passé composé → plus-que-parfait (había comido), futur → conditionnel (comería), impératif → imparfait du subjonctif (comiera).",
        },
      },
      {
        id: 'exo_si_3',
        type: ExerciseType.MATCH_PAIRS,
        instructions: "Associez l'adverbe du style direct à son équivalent au style indirect (passé).",
        content: [
          {
            pairs: [
              { left: 'hoy', right: 'aquel día' },
              { left: 'ayer', right: 'el día anterior' },
              { left: 'mañana', right: 'al día siguiente' },
              { left: 'aquí', right: 'allí' },
              { left: 'este', right: 'aquel' },
            ],
          },
          {
            pairs: [
              { left: 'ahora', right: 'entonces' },
              { left: 'Présent', right: 'Imparfait' },
              { left: 'Passé composé', right: 'Plus-que-parfait' },
              { left: 'Futur', right: 'Conditionnel' },
              { left: 'Impératif', right: 'Imparfait du subjonctif' },
            ],
          },
        ],
        feedback: {
          correct: "Bravo ! La machine à remonter le temps fonctionne parfaitement.",
          incorrect: "hoy → aquel día, ayer → el día anterior, mañana → al día siguiente, aquí → allí, ahora → entonces. Et les temps reculent d'un cran.",
        },
      },
      {
        id: 'exo_si_4',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Exclamations et cas particuliers : choisissez la transposition correcte.",
        content: [
          { question: "¡Qué inteligente es Juan! →", options: ['Dice que Juan es muy inteligente.', 'Dice que qué inteligente es Juan.', 'Dice que Juan es mucho inteligente.'], solution: 'Dice que Juan es muy inteligente.' },
          { question: "¡Cuánto bebe este señor! →", options: ['Dice que ese señor bebe mucho.', 'Dice que ese señor bebe muy.', 'Dice cuánto bebe.'], solution: 'Dice que ese señor bebe mucho.' },
          { question: "Me dijeron: «Es un lugar famoso» (vérité générale) →", options: ['Me dijeron que es un lugar famoso.', 'Me dijeron que fuera un lugar famoso.', 'Obligatoirement : que era.'], solution: 'Me dijeron que es un lugar famoso.' },
          { question: "Pregunta: «¿Qué quieres?» →", options: ['Pregunta qué quiere / lo que quiere.', 'Pregunta que quiere.', 'Pregunta si qué quiere.'], solution: 'Pregunta qué quiere / lo que quiere.' },
        ],
        feedback: {
          correct: "Excellent ! muy/mucho pour l'intensité, présent conservé pour les vérités générales.",
          incorrect: "Exclamation → muy devant adjectif, mucho après verbe. Vérité générale : le présent peut rester. ¿Qué...? → qué ou lo que.",
        },
      },
      {
        id: 'exo_si_5',
        type: ExerciseType.TRANSLATION,
        instructions: "Transposez au style indirect (verbe introducteur au passé) : Dijo: «Vendré mañana»",
        content: [
          {
            frenchSentence: "Il dit (passé) : « Je viendrai demain » → Il a dit qu'il...",
            possibleSolutions: ["Dijo que vendría al día siguiente.", "Dijo que vendría al otro día."],
            note: "Double transformation : futur → <strong>conditionnel</strong> (vendré → vendría) et mañana → <strong>al día siguiente</strong>. La personne passe aussi à la 3ᵉ (yo → él).",
          },
        ],
        feedback: {
          correct: "Chef-d'œuvre ! Temps, adverbe et personne transposés d'un coup.",
          incorrect: "Trois changements : vendré → vendría (conditionnel), mañana → al día siguiente, et yo → él : Dijo que vendría al día siguiente.",
        },
      },
    ],
    quiz: [
      {
        question: "Introducteur au passé : que devient le futur « comeré » ?",
        options: ["comería (conditionnel)", "comerá", "comiera"],
        answer: "comería (conditionnel)",
        feedback: {
          correct: "Exact ! Futur → conditionnel : Dijo que comería.",
          incorrect: "La concordance transforme le futur en conditionnel : comeré → comería.",
        },
      },
      {
        question: "Comment rapporte-t-on la question « ¿Vienes? » ?",
        options: ["Le pregunta si viene.", "Le pregunta que viene.", "Le pregunta cuándo viene."],
        answer: "Le pregunta si viene.",
        feedback: {
          correct: "Parfait ! Question totale (oui/non) → si.",
          incorrect: "Pour une question oui/non, on ajoute si : Le pregunta si viene.",
        },
      },
      {
        question: "« ayer » devient au style indirect (passé)...",
        options: ["el día anterior", "al día siguiente", "aquel día"],
        answer: "el día anterior",
        feedback: {
          correct: "Exact ! ayer → el día anterior / la víspera.",
          incorrect: "ayer → el día anterior (mañana → al día siguiente, hoy → aquel día).",
        },
      },
      {
        question: "L'impératif « ¡Come! » rapporté au passé devient...",
        options: ["Dijo que comiera (imparfait du subjonctif).", "Dijo que come.", "Dijo que comerá."],
        answer: "Dijo que comiera (imparfait du subjonctif).",
        feedback: {
          correct: "Parfait ! Impératif → imparfait du subjonctif.",
          incorrect: "Un ordre rapporté au passé passe à l'imparfait du subjonctif : que comiera.",
        },
      },
    ],
  },
];
