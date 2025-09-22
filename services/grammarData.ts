import { Chapter, ExerciseType } from '../types';

export const grammarData: Chapter[] = [
  {
    id: 'orthographe',
    title: 'Orthographe et Accentuation',
    theory: `
        <h3 class="text-xl font-bold mb-3 text-secondary-dark">Accent Tonique vs. Accent Graphique (´)</h3>
        <p class="mb-3">En espagnol, chaque mot de plus d'une syllabe possède un <strong>accent tonique</strong> : une syllabe est prononcée avec plus d'intensité. Parfois, cet accent est marqué par un <strong>accent graphique</strong> (´), aussi appelé <em>tilde</em>. La présence de cet accent écrit suit des règles précises basées sur la structure du mot.</p>
        
        <div class="p-4 bg-primary/10 rounded-lg border border-primary/20 mb-4">
          <h4 class="font-semibold text-primary-dark">Concepts Clés : Syllabes, Diphtongue et Hiatus</h4>
          <p>Pour appliquer les règles, il faut savoir découper un mot en syllabes. Le principe de base est : une syllabe par voyelle. Mais attention aux diphtongues et hiatus !</p>
          <ul class="list-disc list-inside space-y-2 mt-2">
              <li>
                  <strong>Diphtongue</strong>: C'est l'union de deux voyelles qui se prononcent comme <strong>une seule syllabe</strong>.
                  <ul class="list-disc list-inside ml-4 mt-1">
                    <li>Une voyelle forte (a, e, o) + une voyelle faible <strong>non accentuée</strong> (i, u). Ex: p<span class="font-bold text-primary">ia</span>-no, f<span class="font-bold text-primary">ue</span>-go, p<span class="font-bold text-primary">ai</span>-sa-je.</li>
                    <li>Deux voyelles faibles (i, u). Ex: c<span class="font-bold text-primary">iu</span>-dad, v<span class="font-bold text-primary">iu</span>-da.</li>
                  </ul>
              </li>
              <li>
                <strong>Hiatus</strong>: C'est la rencontre de deux voyelles qui appartiennent à <strong>deux syllabes distinctes</strong>.
                <ul class="list-disc list-inside ml-4 mt-1">
                  <li>Deux voyelles fortes ensemble. Ex: t<span class="font-bold text-danger">e</span>-<span class="font-bold text-danger">a</span>-tro, p<span class="font-bold text-danger">o</span>-<span class="font-bold text-danger">e</span>-ta.</li>
                  <li>Une voyelle forte + une voyelle faible <strong>accentuée (toniquement)</strong>. Ex: Mar<span class="font-bold text-danger">í</span>-<span class="font-bold text-danger">a</span>, d<span class="font-bold text-danger">í</span>-<span class="font-bold text-danger">a</span>, ba<span class="font-bold text-danger">ú</span>l.</li>
                </ul>
              </li>
          </ul>
           <div class="mt-3 p-3 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg">
             <h5 class="font-bold text-amber-800">Pourquoi un hiatus et pas une diphtongue ?</h5>
             <p class="text-sm text-amber-900">La question clé est : "Où tombe l'accent tonique ?". Dans une diphtongue (ex: <code class="bg-slate-200 p-1 rounded">piano</code>), l'accent tombe naturellement sur la voyelle forte. Mais si les règles de prononciation exigent que l'accent tombe sur la voyelle <strong>faible</strong> (i, u), alors on "casse" la diphtongue. Cet accent tonique sur la voyelle faible crée un hiatus et <strong>doit toujours être marqué par un accent écrit (´)</strong>, même si cela contredit les règles générales d'accentuation. C'est une règle prioritaire !</p>
             <p class="text-sm text-amber-900 mt-1">Exemple : <strong>alegría</strong>. Sans accent, ce serait *a-le-gria* (llano, finit par voyelle, pas d'accent écrit). Mais on prononce a-le-gr<span class="underline">í</span>-a. L'accent tonique sur le 'i' casse la diphtongue 'ia' et crée un hiatus. On doit donc l'écrire : a-le-gr<span class="font-bold text-danger">í</span>-a.</p>
           </div>
        </div>

        <h3 class="text-lg font-bold mt-6 mb-2">Les 3 Règles Générales d'Accentuation</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 bg-background-light rounded-lg border">
              <h5 class="font-bold text-secondary-dark">1. Mots 'Agudos'</h5>
              <p>Accent tonique sur la <strong>dernière</strong> syllabe. Ils portent un accent écrit s'ils se terminent par <strong>-n</strong>, <strong>-s</strong>, ou une <strong>voyelle</strong>.</p>
              <p class="mt-2 text-sm"><strong class="text-success">Exemples avec accent :</strong> canci<span class="font-bold text-danger">ó</span>n, Pa<span class="font-bold text-danger">í</span>s, so<span class="font-bold text-danger">á</span>.</p>
              <p class="mt-1 text-sm"><strong class="text-danger">Exemples sans accent :</strong> cant<span class="font-bold">a</span>r (finit par -r), generosid<span class="font-bold">a</span>d (finit par -d).</p>
          </div>
          <div class="p-4 bg-background-light rounded-lg border">
              <h5 class="font-bold text-secondary-dark">2. Mots 'Llanos' (ou 'Graves')</h5>
              <p>Accent tonique sur l'<strong>avant-dernière</strong> syllabe. C'est le cas le plus courant. Ils portent un accent écrit s'ils ne se terminent <strong>PAS</strong> par <strong>-n</strong>, <strong>-s</strong>, ou une <strong>voyelle</strong> (la règle inverse des 'agudos').</p>
              <p class="mt-2 text-sm"><strong class="text-success">Exemples avec accent :</strong> <span class="font-bold text-danger">á</span>rbol (finit par -l), f<span class="font-bold text-danger">á</span>cil (finit par -l).</p>
              <p class="mt-1 text-sm"><strong class="text-danger">Exemples sans accent :</strong> probl<span class="font-bold">e</span>ma (finit par voyelle), cant<span class="font-bold">a</span>s (finit par -s).</p>
          </div>
          <div class="p-4 bg-background-light rounded-lg border">
              <h5 class="font-bold text-secondary-dark">3. Mots 'Esdrújulos' & 'Sobresdrújulos'</h5>
              <p>Accent tonique sur l'<strong>antépénultième</strong> syllabe (ou encore avant). Règle simple : ils portent <strong>toujours</strong> un accent écrit.</p>
              <p class="mt-2 text-sm"><strong class="text-success">Exemples :</strong> m<span class="font-bold text-danger">ú</span>sica, tel<span class="font-bold text-danger">é</span>fono, p<span class="font-bold text-danger">á</span>gina, d<span class="font-bold text-danger">í</span>gamelo.</p>
          </div>
        </div>
        
        <h3 class="text-lg font-bold mt-6 mb-2">Les Accents Diacritiques : Différencier les Homonymes</h3>
        <p>Certains mots (souvent d'une seule syllabe) prennent un accent pour les distinguer de leurs jumeaux orthographiques qui ont une fonction grammaticale différente.</p>
        <table class="w-full text-left border-collapse mt-2 text-sm">
          <thead>
            <tr><th class="border p-2 bg-slate-200/60 font-semibold">Sans Accent (atone)</th><th class="border p-2 bg-slate-200/60 font-semibold">Avec Accent (tonique)</th></tr>
          </thead>
          <tbody>
            <tr><td class="border p-2"><strong>el</strong> (article: le) - <em>el perro</em></td><td class="border p-2"><strong>él</strong> (pronom: il, lui) - <em>es para él</em></td></tr>
            <tr><td class="border p-2"><strong>tu</strong> (adjectif possessif: ton, ta) - <em>tu casa</em></td><td class="border p-2"><strong>tú</strong> (pronom personnel: tu, toi) - <em>tú hablas</em></td></tr>
            <tr><td class="border p-2"><strong>mi</strong> (adjectif possessif: mon, ma) - <em>mi libro</em></td><td class="border p-2"><strong>mí</strong> (pronom réfléchi: moi) - <em>a mí me gusta</em></td></tr>
            <tr><td class="border p-2"><strong>si</strong> (conjonction: si) - <em>si llueve...</em></td><td class="border p-2"><strong>sí</strong> (adverbe: oui; pronom: soi) - <em>sí, quiero; piensa en sí mismo</em></td></tr>
            <tr><td class="border p-2"><strong>te</strong> (pronom: te, t') - <em>te llamo</em></td><td class="border p-2"><strong>té</strong> (nom: le thé) - <em>quiero un té</em></td></tr>
            <tr><td class="border p-2"><strong>mas</strong> (conjonction, littéraire: mais) - <em>es bueno, mas caro</em></td><td class="border p-2"><strong>más</strong> (adverbe: plus) - <em>quiero más</em></td></tr>
            <tr><td class="border p-2"><strong>se</strong> (pronom réfléchi: se) - <em>se levanta</em></td><td class="border p-2"><strong>sé</strong> (verbes 'saber' et 'ser': je sais / sois) - <em>yo sé; sé amable</em></td></tr>
            <tr><td class="border p-2"><strong>de</strong> (préposition: de) - <em>libro de español</em></td><td class="border p-2"><strong>dé</strong> (verbe 'dar': que je/il donne) - <em>espero que me lo dé</em></td></tr>
          </tbody>
        </table>

        <h3 class="text-lg font-bold mt-6 mb-2">Règles Orthographiques Spécifiques</h3>
        <ul class="list-disc list-inside space-y-2">
            <li><strong>Le son [x] (jota)</strong>: S'écrit <strong>j</strong> devant 'a', 'o', 'u' (e.g., <em>jamón, joven, jugo</em>). Devant 'e', 'i', il peut s'écrire <strong>j</strong> (<em>jefe</em>) ou <strong>g</strong> (<em>gente</em>). Il n'y a pas de règle fixe, il faut les apprendre.</li>
            <li><strong>Le son [k]</strong>: S'écrit <strong>c</strong> devant 'a', 'o', 'u' (<em>casa, cosa, cuna</em>) et <strong>qu</strong> (le 'u' est muet) devant 'e', 'i' (<em>queso, quitar</em>).</li>
            <li><strong>Le son [θ] (type 'th' anglais dans 'thing')</strong>: S'écrit <strong>z</strong> devant 'a', 'o', 'u' (<em>zapato, pozo, zumo</em>) et <strong>c</strong> devant 'e', 'i' (<em>cielo, cena</em>).</li>
            <li><strong>Le son [g] (doux)</strong>: S'écrit <strong>g</strong> devant 'a', 'o', 'u' (<em>gato, gota, gusano</em>) et <strong>gu</strong> (le 'u' est muet) devant 'e', 'i' (<em>guerra, guitarra</em>). Pour prononcer le 'u' entre le 'g' et le 'e'/'i', on utilise un tréma (<em>diéresis</em>): <strong>gü</strong> (<em>pingüino, vergüenza</em>).</li>
        </ul>
    `,
    exercises: [
      {
        id: 'exo_ortho_1',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: 'Complétez avec g, gu ou gü, selon le cas.',
        content: [
            { sentenceParts: ['__illermo y __onzalo son bilin__es de castellano y __allego, porque son de Lu__o.'], solutions: ['Gu', 'G', 'gü', 'g', 'g'] },
            { sentenceParts: ['Averi__emos quién es el sinver__enza que le ha robado el para__as a __loria.'], solutions: ['gü', 'gü', 'gu', 'G'] },
            { sentenceParts: ['El pin__ino del zoo, curioso, se__ía atento a todo.'], solutions: ['gü', 'gu'] },
            { sentenceParts: ['Si si__es así, no podrás averi__ar por dónde se va el a__a.'], solutions: ['gu', 'gu', 'gu'] },
            { sentenceParts: ['Un lin__ista se dedica al estudio de las len__as.'], solutions: ['gü', 'gu'] }
        ],
        feedback: {
            correct: "Parfait ! Vous maîtrisez l'utilisation de g, gu et gü.",
            incorrect: "Attention. On utilise 'gü' (avec tréma) pour prononcer le 'u' devant 'e' et 'i' (pingüino). On utilise 'gu' pour le son [g] devant 'e' et 'i' (guerra). On utilise 'g' pour le son [g] devant 'a', 'o', 'u' (gato)."
        }
      },
      {
        id: 'exo_ortho_2',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: 'Complétez avec g ou j, selon le cas.',
        content: [
          { sentenceParts: ['Todo el pueblo colaboró, con __enerosidad, en la compra de la ima__en de la Vir__en.'], solutions: ['g', 'g', 'g'] },
          { sentenceParts: ['Co__e una galleta, están cru__ientes.'], solutions: ['g', 'j'] },
          { sentenceParts: ['La manera de te__er alfombras se transmite __eneralmente de __eneracion en __eneracion.'], solutions: ['j', 'g', 'g', 'g'] },
          { sentenceParts: ['Que ba__en ellos y traba__en ahora, que nosotros ya hemos hecho bastante.'], solutions: ['j', 'j'] },
          { sentenceParts: ['Eu__enio es muy foto__énico y también muy in__enioso.'], solutions: ['g', 'g', 'g'] },
          { sentenceParts: ['Reco__amos nuestras cosas y vayamos a la a__encia a reco__er los billetes de avión.'], solutions: ['j', 'g', 'g'] }
        ],
        feedback: {
            correct: "Excellent ! Le son [x] n'a plus de secrets pour vous.",
            incorrect: "Rappel : Le son [x] (jota) s'écrit 'j' devant 'a', 'o', 'u' (jamón), mais peut s'écrire 'g' ou 'j' devant 'e', 'i' (gente, jefe). Il faut apprendre les cas par cœur."
        }
      },
      {
        id: 'exo_ortho_3',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: 'Complétez avec c, z, cc ou qu, selon le cas.',
        content: [
          { sentenceParts: ['No apar__e el co__e en la a__era por__e se lo llevará la grúa.'], solutions: ['qu', 'ch', 'c', 'qu'] },
          { sentenceParts: ['Esta tienda propone una sele__ión de productos muy buenos.'], solutions: ['cc'] },
          { sentenceParts: ['Recono__co __e tienes ra__ón en ese asunto, pero díselo de manera __e pare__ca __e la tiene él.'], solutions: ['z', 'qu', 'z', 'qu', 'z', 'qu'] },
          { sentenceParts: ['Dime, ¿qué tal ha ido la inspe__ión?'], solutions: ['cc'] },
          { sentenceParts: ['La infla__ión afecta espe__ialmente a los productos de primera ne__esidad.'], solutions: ['c', 'c', 'c'] },
          { sentenceParts: ['Nadie es perfe__to; yo también tengo mal carácter a ve__es y me enfure__co sin motivo.'], solutions: ['c', 'c', 'z'] },
        ],
        feedback: {
            correct: "Très bien ! Vous jonglez avec les sons [k] et [θ] sans difficulté.",
            incorrect: "Attention. Son [k]: 'ca, co, cu', mais 'que, qui'. Son [θ]: 'za, zo, zu', mais 'ce, ci'. 'cc' est utilisé dans des mots comme 'acción' ou 'inspección'."
        }
      },
      {
          id: 'exo_accent_1',
          type: ExerciseType.REWRITE_ACCENT,
          instructions: "Rétablissez l'accent écrit si besoin pour les mots suivants.",
          content: [
              { word: "escritorio", solution: "escritorio" }, { word: "automovil", solution: "automóvil" },
              { word: "autoridad", solution: "autoridad" }, { word: "purisima", solution: "purísima" },
              { word: "hipocrita", solution: "hipócrita" }, { word: "autopista", solution: "autopista" },
              { word: "boligrafo", solution: "bolígrafo" }, { word: "alegria", solution: "alegría" },
              { word: "alergia", solution: "alergia" }, { word: "rapidamente", solution: "rápidamente" },
              { word: "maquina", solution: "máquina" }, { word: "continuo", solution: "continuo" },
              { word: "publico", solution: "público" }, { word: "razones", solution: "razones" }, 
              { word: "Examen", solution: "Examen" }, { word: "examenes", solution: "exámenes" }, 
              { word: "cambio", solution: "cambio" }, { word: "petroleo", solution: "petróleo" },
              { word: "silaba", solution: "sílaba" }, { word: "ladron", solution: "ladrón" },
              { word: "miercoles", solution: "miércoles" }, { word: "teorico", solution: "teórico" },
              { word: "farol", solution: "farol" }, { word: "holgazan", solution: "holgazán" },
              { word: "actitud", solution: "actitud" }
          ],
          feedback: {
              correct: "Excellent travail ! Vos accents sont au bon endroit.",
              incorrect: "Presque ! Révisez les règles des mots 'agudos', 'llanos' et 'esdrújulos'. Un mot comme 'público' ou 'sílaba' est 'esdrújulo', donc il prend toujours un accent. 'Automóvil' est 'llano' et ne finit ni par n, s, ou voyelle, donc il en prend un."
          }
      },
      {
        id: 'exo_accent_2',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Choisissez l'option correcte pour compléter la phrase.",
        content: [
            { question: "Dicen que ____ es el que lo inventó.", options: ['el', 'él'], solution: 'él' },
            { question: "No es ____ quien hace el tonto, sino el otro niño.", options: ['el', 'él'], solution: 'él' },
            { question: "____ tía tiene treinta años.", options: ['Mi', 'Mí'], solution: 'Mi' },
            { question: "Intentará hacerlo por ____ misma.", options: ['si', 'sí'], solution: 'sí' },
            { question: "____ lo dije un montón de veces, ¿no te acuerdas?", options: ['Te', 'Té'], solution: 'Te' },
            { question: "____ eres el mejor de tu clase.", options: ['Tu', 'Tú'], solution: 'Tú' },
            { question: "____ no cree que el amigo de Ana venga.", options: ['El', 'Él'], solution: 'Él' },
            { question: "No debes pedírselo ____, sino tu tía.", options: ['tu', 'tú'], solution: 'tú' },
            { question: "Esa no es ____ casa.", options: ['tu', 'tú'], solution: 'tu' },
            { question: "____ llueve, hoy no saldremos, pero mañana ____.", options: ['Si / si', 'Sí / sí', 'Si / sí'], solution: 'Si / sí' },
            { question: "No ____ esperaba hoy.", options: ['te', 'té'], solution: 'te' },
            { question: "____ eres tonto, ¿qué culpa tengo yo?", options: ['Si', 'Sí'], solution: 'Si' },
            { question: "No sé ____ me explico.", options: ['si', 'sí'], solution: 'si' },
            { question: "Pídeselo a ____, que es ____ jefe.", options: ['el/el', 'él/él', 'el/él', 'él/el'], solution: 'él/el' },
            { question: "No es inteligente ____ negarse.", options: ['el', 'él'], solution: 'el' },
            { question: "Ese oficio no es para ____, sino para ti.", options: ['mi', 'mí'], solution: 'mí' },
            { question: "No comprendo ____ actitud.", options: ['tu', 'tú'], solution: 'tu' },
            { question: "____ no sabes hacer tu trabajo.", options: ['Tu', 'Tú'], solution: 'Tú' },
            { question: "Ana siempre desayuna ____.", options: ['te', 'té'], solution: 'té' },
        ],
        feedback: {
            correct: "Félicitations ! Vous distinguez parfaitement les accents diacritiques.",
            incorrect: "Attention, l'accent diacritique change le sens du mot. Par exemple, 'tú' (avec accent) est le pronom 'tu', alors que 'tu' (sans accent) est l'adjectif possessif 'ton/ta'."
        }
      },
      {
        id: 'exo_accent_3',
        type: ExerciseType.CLASSIFY_WORDS,
        instructions: "Choisissez la bonne catégorie pour chaque mot selon son accentuation.",
        content: [
          {
            categories: ["Agudas", "Llanas", "Esdrújulas"],
            words: [
              { word: "canción", category: "Agudas" },
              { word: "árbol", category: "Llanas" },
              { word: "música", category: "Esdrújulas" },
              { word: "hablar", category: "Agudas" },
              { word: "examen", category: "Llanas" },
              { word: "pájaro", category: "Esdrújulas" },
              { word: "reloj", category: "Agudas" },
              { word: "difícil", category: "Llanas" },
              { word: "teléfono", category: "Esdrújulas" },
              { word: "pared", category: "Agudas" },
              { word: "carácter", category: "Llanas" },
              { word: "dámelo", category: "Esdrújulas" },
            ]
          }
        ],
        feedback: {
            correct: "Excellent ! Vous maîtrisez la classification des mots selon leur accentuation.",
            incorrect: "Pas tout à fait. Révisez les règles : 'Agudas' (accent sur la dernière syllabe), 'Llanas' (avant-dernière), et 'Esdrújulas' (antépénultième)."
        }
      },
      {
        id: 'exo_trad_1',
        type: ExerciseType.TRANSLATION,
        instructions: "Traduisez la phrase suivante en espagnol (Thème).",
        content: [
          {
            frenchSentence: "Pour lui, tu es plus important que mon thé.",
            possibleSolutions: ["Para él, tú eres más importante que mi té."],
            note: "En espagnol, les accents diacritiques sont cruciaux ! <strong>él</strong> (pronom 'il/lui'), <strong>tú</strong> (pronom 'tu'), <strong>más</strong> ('plus') et <strong>té</strong> ('thé') prennent un accent pour se différencier de leurs homonymes <strong>el</strong> (article 'le'), <strong>tu</strong> (possessif 'ton'), <strong>mas</strong> ('mais') et <strong>te</strong> (pronom 'te'). C'est une erreur très courante à éviter."
          }
        ],
        feedback: {
          correct: "Parfait ! Votre usage des accents diacritiques est impeccable.",
          incorrect: "Attention aux accents diacritiques ! Ils changent complètement le sens des mots courts."
        }
      }
    ],
    quiz: [
      {
        question: "Quand un mot terminant par une voyelle porte-t-il un accent écrit ?",
        options: [
          "Quand l'accent tonique est sur l'avant-dernière syllabe (llano).",
          "Quand l'accent tonique est sur la dernière syllabe (agudo).",
          "Jamais.",
        ],
        answer: "Quand l'accent tonique est sur la dernière syllabe (agudo).",
        feedback: {
            correct: "Exact ! Comme dans 'sofá' ou 'café'.",
            incorrect: "Incorrect. C'est la règle pour les mots 'agudos'. Les 'llanos' terminant par une voyelle (comme 'casa') ne prennent pas d'accent écrit."
        }
      },
      {
        question: "Lequel de ces mots est 'esdrújulo' et doit toujours prendre un accent ?",
        options: ["ordenador", "boligrafo", "facil"],
        answer: "boligrafo",
        feedback: {
            correct: "C'est bien ça ! La bonne orthographe est 'bolígrafo'. L'accent est sur l'antépénultième syllabe.",
            incorrect: "Ce n'est pas le bon mot. 'Bolígrafo' est 'esdrújulo' car l'accent tonique tombe sur la troisième syllabe en partant de la fin (bo-lí-gra-fo)."
        }
      },
      {
        question: "Quelle est la différence entre 'tu' et 'tú' ?",
        options: [
            "'tu' est un pronom (tu), 'tú' est un adjectif (ton/ta).",
            "'tu' est un adjectif (ton/ta), 'tú' est un pronom (tu).",
            "Il n'y a pas de différence."
        ],
        answer: "'tu' est un adjectif (ton/ta), 'tú' est un pronom (tu).",
        feedback: {
            correct: "Parfait ! C'est un accent diacritique essentiel. 'Tú eres mi amigo', mais 'Es tu libro'.",
            incorrect: "C'est l'inverse ! 'Tú eres mi amigo' (pronom), mais 'Es tu libro' (adjectif)."
        }
      },
      {
        question: "Le mot 'facil' doit-il prendre un accent écrit ?",
        options: [
          "Oui, sur le 'a'.",
          "Oui, sur le 'i'.",
          "Non."
        ],
        answer: "Oui, sur le 'a'.",
        feedback: {
            correct: "Correct ! C'est un mot 'llano' qui ne se termine ni par -n, -s ou voyelle, donc 'fácil'.",
            incorrect: "Incorrect. C'est un mot 'llano' (fa-cil), l'accent tonique est sur l'avant-dernière syllabe. Comme il se termine par -l, il doit prendre un accent écrit sur le 'a'."
        }
      }
    ]
  },
  {
    id: 'present_indicatif',
    title: "Le Présent de l'Indicatif",
    theory: `
        <h3 class="text-xl font-bold mb-3 text-secondary-dark">Usages du Présent de l'Indicatif</h3>
        <p class="mb-3">Le présent de l'indicatif en espagnol (<em>presente de indicativo</em>) est utilisé pour exprimer :</p>
        <ul class="list-disc list-inside space-y-2 mb-4">
            <li><strong>Des actions habituelles ou des routines :</strong> <em>Todos los días, <strong>voy</strong> al trabajo en autobús.</em> (Tous les jours, je vais au travail en bus.)</li>
            <li><strong>Des vérités générales ou des faits permanents :</strong> <em>La Tierra <strong>gira</strong> alrededor del Sol.</em> (La Terre tourne autour du Soleil.)</li>
            <li><strong>Des actions qui se déroulent au moment où l'on parle :</strong> <em>Ahora mismo, <strong>leo</strong> un libro.</em> (En ce moment, je lis un livre.)</li>
            <li><strong>Un futur proche (très courant en espagnol) :</strong> <em>Mañana <strong>tengo</strong> un examen.</em> (Demain, j'ai un examen.)</li>
            <li><strong>Des ordres ou instructions (valeur d'impératif) :</strong> <em>Tú <strong>te quedas</strong> aquí.</em> (Toi, tu restes ici.)</li>
        </ul>

        <h3 class="text-xl font-bold mb-3 text-secondary-dark">La Conjugaison : Verbes Réguliers</h3>
        <p class="mb-3">La conjugaison des verbes réguliers se forme en enlevant la terminaison de l'infinitif (-ar, -er, -ir) et en ajoutant les terminaisons du présent.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 bg-background-light rounded-lg border">
                <h5 class="font-bold text-secondary-dark text-center">-AR (hablar)</h5>
                <ul class="mt-2 text-sm space-y-1">
                    <li>(yo) habl<strong>o</strong></li>
                    <li>(tú) habl<strong>as</strong></li>
                    <li>(él/ella/usted) habl<strong>a</strong></li>
                    <li>(nosotros/as) habl<strong>amos</strong></li>
                    <li>(vosotros/as) habl<strong>áis</strong></li>
                    <li>(ellos/as/ustedes) habl<strong>an</strong></li>
                </ul>
            </div>
            <div class="p-4 bg-background-light rounded-lg border">
                <h5 class="font-bold text-secondary-dark text-center">-ER (comer)</h5>
                <ul class="mt-2 text-sm space-y-1">
                    <li>(yo) com<strong>o</strong></li>
                    <li>(tú) com<strong>es</strong></li>
                    <li>(él/ella/usted) com<strong>e</strong></li>
                    <li>(nosotros/as) com<strong>emos</strong></li>
                    <li>(vosotros/as) com<strong>éis</strong></li>
                    <li>(ellos/as/ustedes) com<strong>en</strong></li>
                </ul>
            </div>
            <div class="p-4 bg-background-light rounded-lg border">
                <h5 class="font-bold text-secondary-dark text-center">-IR (vivir)</h5>
                <ul class="mt-2 text-sm space-y-1">
                    <li>(yo) viv<strong>o</strong></li>
                    <li>(tú) viv<strong>es</strong></li>
                    <li>(él/ella/usted) viv<strong>e</strong></li>
                    <li>(nosotros/as) viv<strong>imos</strong></li>
                    <li>(vosotros/as) viv<strong>ís</strong></li>
                    <li>(ellos/as/ustedes) viv<strong>en</strong></li>
                </ul>
            </div>
        </div>

        <h3 class="text-xl font-bold mt-6 mb-3 text-secondary-dark">Les Principales Irrégularités</h3>
        <p class="mb-3">De nombreux verbes très courants sont irréguliers. Voici les principaux types d'irrégularités :</p>
        
        <div class="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20 mb-4">
            <h4 class="font-semibold text-amber-800">1. Verbes à diphtongue et à affaiblissement</h4>
            <p class="text-sm mb-2">Le radical du verbe change à toutes les personnes, <strong>sauf à la 1ère et 2ème personne du pluriel (nosotros, vosotros)</strong>.</p>
            <ul class="list-disc list-inside space-y-2 text-sm">
                <li><strong>e → ie</strong> (querer, empezar, pensar): <em>p<strong>ie</strong>nso, p<strong>ie</strong>nsas, p<strong>ie</strong>nsa, pensamos, pensáis, p<strong>ie</strong>nsan</em>.</li>
                <li><strong>o → ue</strong> (poder, dormir, encontrar): <em>p<strong>ue</strong>do, p<strong>ue</strong>des, p<strong>ue</strong>de, podemos, podéis, p<strong>ue</strong>den</em>.</li>
                <li><strong>e → i</strong> (pedir, seguir, servir): <em>p<strong>i</strong>do, p<strong>i</strong>des, p<strong>i</strong>de, pedimos, pedís, p<strong>i</strong>den</em>.</li>
                <li><strong>u → ue</strong> (jugar): <em>j<strong>ue</strong>go, j<strong>ue</strong>gas, j<strong>ue</strong>ga, jugamos, jugáis, j<strong>ue</strong>gan</em>.</li>
            </ul>
        </div>

        <div class="p-4 bg-primary/10 rounded-lg border border-primary/20 mb-4">
            <h4 class="font-semibold text-primary-dark">2. Verbes avec la 1ère personne (yo) irrégulière</h4>
            <p class="text-sm mb-2">Seule la première personne du singulier est irrégulière, les autres formes sont souvent régulières (ou ont une autre irrégularité).</p>
            <ul class="list-disc list-inside space-y-2 text-sm">
                <li><strong>Verbes en -go ("yo-go") :</strong> 
                    <ul>
                        <li>hacer → <strong>hago</strong></li>
                        <li>poner → <strong>pongo</strong></li>
                        <li>salir → <strong>salgo</strong></li>
                        <li>tener → <strong>tengo</strong> (aussi diphtongue: tienes)</li>
                        <li>venir → <strong>vengo</strong> (aussi diphtongue: vienes)</li>
                    </ul>
                </li>
                 <li><strong>Verbes en -zco :</strong> (pour les verbes finissant en -cer ou -cir précédés d'une voyelle)
                    <ul>
                        <li>conocer → <strong>conozco</strong></li>
                        <li>parecer → <strong>parezco</strong></li>
                        <li>conducir → <strong>conduzco</strong></li>
                    </ul>
                </li>
                 <li><strong>Autres irrégularités en "yo" :</strong> 
                    <ul>
                        <li>dar → <strong>doy</strong></li>
                        <li>saber → <strong>sé</strong></li>
                        <li>ver → <strong>veo</strong></li>
                        <li>caber → <strong>quepo</strong></li>
                    </ul>
                </li>
            </ul>
        </div>
        
        <h4 class="font-semibold text-secondary-dark mt-4 mb-2">3. Verbes totalement irréguliers</h4>
        <p class="mb-3">Trois verbes essentiels ont une conjugaison unique qu'il faut mémoriser : <strong>ser, estar, ir</strong>.</p>
        <table class="w-full text-left border-collapse mt-2 text-sm">
          <thead>
            <tr class="bg-slate-200/60"><th class="border p-2 font-semibold">Pronom</th><th class="border p-2 font-semibold">Ser (être - essence)</th><th class="border p-2 font-semibold">Estar (être - état)</th><th class="border p-2 font-semibold">Ir (aller)</th></tr>
          </thead>
          <tbody>
            <tr><td class="border p-2">yo</td><td class="border p-2"><strong>soy</strong></td><td class="border p-2"><strong>estoy</strong></td><td class="border p-2"><strong>voy</strong></td></tr>
            <tr><td class="border p-2">tú</td><td class="border p-2"><strong>eres</strong></td><td class="border p-2"><strong>estás</strong></td><td class="border p-2"><strong>vas</strong></td></tr>
            <tr><td class="border p-2">él/ella/ud.</td><td class="border p-2"><strong>es</strong></td><td class="border p-2"><strong>está</strong></td><td class="border p-2"><strong>va</strong></td></tr>
            <tr><td class="border p-2">nosotros/as</td><td class="border p-2"><strong>somos</strong></td><td class="border p-2"><strong>estamos</strong></td><td class="border p-2"><strong>vamos</strong></td></tr>
            <tr><td class="border p-2">vosotros/as</td><td class="border p-2"><strong>sois</strong></td><td class="border p-2"><strong>estáis</strong></td><td class="border p-2"><strong>vais</strong></td></tr>
            <tr><td class="border p-2">ellos/as/uds.</td><td class="border p-2"><strong>son</strong></td><td class="border p-2"><strong>están</strong></td><td class="border p-2"><strong>van</strong></td></tr>
          </tbody>
        </table>
    `,
    exercises: [
      {
        id: 'exo_present_1',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Conjuguez les verbes réguliers entre parenthèses au présent de l'indicatif.",
        content: [
            { sentenceParts: ['Yo (hablar) español con mis amigos. → Yo '], solutions: ['hablo'] },
            { sentenceParts: ['Tú (comer) muchas verduras. → Tú '], solutions: ['comes'] },
            { sentenceParts: ['Él (vivir) en un apartamento grande. → Él '], solutions: ['vive'] },
            { sentenceParts: ['Nosotros (aprender) rápido. → Nosotros '], solutions: ['aprendemos'] },
            { sentenceParts: ['Ellos (abrir) la tienda a las nueve. → Ellos '], solutions: ['abren'] }
        ],
        feedback: {
            correct: "Parfait ! Les terminaisons des verbes réguliers sont bien assimilées.",
            incorrect: "Presque ! Révisez bien les terminaisons pour chaque groupe : -o, -as, -a... pour -AR; -o, -es, -e... pour -ER; et -o, -es, -e... (-imos, -ís) pour -IR."
        }
      },
      {
        id: 'exo_present_2',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Conjuguez les verbes à diphtongue ou à affaiblissement.",
        content: [
          { sentenceParts: ['¿Tú (querer) venir conmigo? → ¿Tú '], solutions: ['quieres'] },
          { sentenceParts: ['Yo no (poder) ir a la fiesta. → Yo no '], solutions: ['puedo'] },
          { sentenceParts: ['Ella (pedir) siempre el mismo plato. → Ella '], solutions: ['pide'] },
          { sentenceParts: ['Nosotros (pensar) que es una buena idea. → Nosotros '], solutions: ['pensamos'] },
          { sentenceParts: ['Mi hermano (dormir) ocho horas cada noche. → Mi hermano '], solutions: ['duerme'] }
        ],
        feedback: {
            correct: "Excellent ! Vous maîtrisez les verbes à changement de radical.",
            incorrect: "Attention ! Ces verbes changent leur voyelle du radical (e→ie, o→ue, e→i) sauf pour 'nosotros' et 'vosotros'. 'Pensar' devient 'pienso' mais 'pensamos'."
        }
      },
      {
        id: 'exo_present_3',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Choisissez la forme correcte du verbe, souvent irrégulière à la 1ère personne.",
        content: [
          { question: "Yo siempre ____ la verdad.", options: ['digo', 'dico', 'dizo'], solution: 'digo' },
          { question: "Yo ____ mi trabajo a las cinco de la tarde.", options: ['salo', 'salgo', 'salio'], solution: 'salgo' },
          { question: "Yo no ____ la respuesta.", options: ['sabo', 'sé', 'sayo'], solution: 'sé' },
          { question: "Yo te ____ las gracias.", options: ['doy', 'do', 'dao'], solution: 'doy' },
          { question: "Yo ____ a muchos artistas franceses.", options: ['conoco', 'conozco', 'conozo'], solution: 'conozco' }
        ],
        feedback: {
            correct: "Très bien ! Les premières personnes irrégulières sont bien connues.",
            incorrect: "Attention, beaucoup de verbes ont une première personne (yo) irrégulière qu'il faut mémoriser (hago, pongo, salgo, conozco, sé, doy...)."
        }
      },
      {
        id: 'exo_trad_2',
        type: ExerciseType.TRANSLATION,
        instructions: "Traduisez la phrase suivante en espagnol (Thème).",
        content: [
          {
            frenchSentence: "Je ne connais pas Pierre, mais je sais qu'il veut toujours ce qu'il ne peut pas avoir.",
            possibleSolutions: ["No conozco a Pedro, pero sé que siempre quiere lo que no puede tener."],
            note: "Notez l'usage de la préposition 'a' devant un complément d'objet direct de personne ('conozco <strong>a</strong> Pedro'). C'est une règle grammaticale importante en espagnol. De plus, cet exercice utilise plusieurs verbes irréguliers courants : <strong>conozco</strong> (de 'conocer'), <strong>sé</strong> (de 'saber'), <strong>quiere</strong> (de 'querer') et <strong>puede</strong> (de 'poder')."
          }
        ],
        feedback: {
          correct: "Excellent ! La conjugaison des verbes irréguliers et la grammaire sont maîtrisées.",
          incorrect: "Presque ! Revoyez la conjugaison des verbes irréguliers comme 'conocer', 'saber', 'querer' et 'poder', et n'oubliez pas le 'a' personnel."
        }
      }
    ],
    quiz: [
      {
        question: "Laquelle de ces formes est correcte pour le verbe 'querer' (vouloir) à la première personne du singulier (yo) ?",
        options: ["quero", "quiero", "quiro"],
        answer: "quiero",
        feedback: {
            correct: "Exact ! C'est un verbe à diphtongue (e → ie).",
            incorrect: "Incorrect. 'Querer' est un verbe à diphtongue, le 'e' du radical devient 'ie' : 'quiero'."
        }
      },
      {
        question: "Pour le verbe 'tener' (avoir), la forme 'yo' est...",
        options: ["teno", "tengo", "tieno"],
        answer: "tengo",
        feedback: {
            correct: "C'est bien ça ! 'Tener' est un verbe 'yo-go', irrégulier à la première personne.",
            incorrect: "Non, 'tener' a une première personne irrégulière en -go : 'tengo'. C'est un verbe très important à mémoriser."
        }
      },
      {
        question: "Le verbe 'ir' (aller) est totalement irrégulier. Quelle est la forme pour 'nosotros' (nous) ?",
        options: ["imos", "vamos", "iremos"],
        answer: "vamos",
        feedback: {
            correct: "Parfait ! 'Vamos' est la forme correcte.",
            incorrect: "Ce n''est pas ça. La conjugaison de 'ir' est unique : voy, vas, va, vamos, vais, van."
        }
      },
      {
        question: "Le verbe 'pedir' (demander) est un verbe à affaiblissement (e->i). Quelle est la forme pour 'él' (il) ?",
        options: ["pede", "pide", "pedie"],
        answer: "pide",
        feedback: {
            correct: "Correct ! 'pedir' change son 'e' en 'i' aux 3 personnes du singulier et à la 3ème du pluriel.",
            incorrect: "Attention, 'pedir' est un verbe à affaiblissement. Le 'e' du radical devient 'i' : 'pide'."
        }
      }
    ]
  },
  {
    id: 'subjonctif',
    title: 'Le Subjonctif Présent',
    theory: `
        <h3 class="text-xl font-bold mb-3 text-secondary-dark">Qu'est-ce que le Subjonctif ?</h3>
        <p class="mb-3">Contrairement à l'indicatif qui décrit la réalité objective, le subjonctif (<em>el subjuntivo</em>) est le mode de la <strong>subjectivité</strong>. On l'utilise pour exprimer des souhaits, des doutes, des émotions, des ordres indirects, des possibilités... En bref, tout ce qui n'est pas une certitude absolue.</p>
        
        <h3 class="text-xl font-bold mb-3 text-secondary-dark">Formation du Subjonctif Présent</h3>
        <p class="mb-3">La règle de base pour former le subjonctif présent est simple :</p>
        <ol class="list-decimal list-inside space-y-2 p-4 bg-primary/10 rounded-lg">
          <li>Prenez la <strong>1ère personne du singulier (yo)</strong> du présent de l'indicatif. (Ex: hablar -> <strong>hablo</strong>, comer -> <strong>como</strong>, hacer -> <strong>hago</strong>)</li>
          <li>Enlevez la terminaison <strong>-o</strong>. (Ex: habl-, com-, hag-)</li>
          <li>Ajoutez les terminaisons "inversées" :
              <ul class="list-disc list-inside ml-4 mt-1">
                  <li>Pour les verbes en <strong>-AR</strong>, ajoutez les terminaisons en <strong>-E</strong>: -e, -es, -e, -emos, -éis, -en.</li>
                  <li>Pour les verbes en <strong>-ER</strong> et <strong>-IR</strong>, ajoutez les terminaisons en <strong>-A</strong>: -a, -as, -a, -amos, -áis, -an.</li>
              </ul>
          </li>
        </ol>
        <p class="mt-2 text-sm">Cette règle explique pourquoi les verbes irréguliers à la première personne au présent de l'indicatif (ex: <em>tengo, pongo, conozco</em>) conservent cette irrégularité à toutes les personnes du subjonctif (<em>tenga, ponga, conozca</em>).</p>

        <h4 class="font-semibold text-secondary-dark mt-4 mb-2">Les Verbes Irréguliers Incontournables</h4>
        <p class="mb-3">Certains verbes ont une forme totalement irrégulière qu'il faut mémoriser.</p>
        <table class="w-full text-left border-collapse mt-2 text-sm">
          <thead>
            <tr class="bg-slate-200/60"><th class="border p-2 font-semibold">Verbe</th><th class="border p-2 font-semibold">yo</th><th class="border p-2 font-semibold">tú</th><th class="border p-2 font-semibold">él/ella</th><th class="border p-2 font-semibold">nosotros</th><th class="border p-2 font-semibold">vosotros</th><th class="border p-2 font-semibold">ellos/as</th></tr>
          </thead>
          <tbody>
            <tr><td class="border p-2"><strong>Ser</strong> (être)</td><td class="border p-2">sea</td><td class="border p-2">seas</td><td class="border p-2">sea</td><td class="border p-2">seamos</td><td class="border p-2">seáis</td><td class="border p-2">sean</td></tr>
            <tr><td class="border p-2"><strong>Ir</strong> (aller)</td><td class="border p-2">vaya</td><td class="border p-2">vayas</td><td class="border p-2">vaya</td><td class="border p-2">vayamos</td><td class="border p-2">vayáis</td><td class="border p-2">vayan</td></tr>
            <tr><td class="border p-2"><strong>Saber</strong> (savoir)</td><td class="border p-2">sepa</td><td class="border p-2">sepas</td><td class="border p-2">sepa</td><td class="border p-2">sepamos</td><td class="border p-2">sepáis</td><td class="border p-2">sepan</td></tr>
            <tr><td class="border p-2"><strong>Haber</strong> (aux. avoir)</td><td class="border p-2">haya</td><td class="border p-2">hayas</td><td class="border p-2">haya</td><td class="border p-2">hayamos</td><td class="border p-2">hayáis</td><td class="border p-2">hayan</td></tr>
            <tr><td class="border p-2"><strong>Estar</strong> (être)</td><td class="border p-2">esté</td><td class="border p-2">estés</td><td class="border p-2">esté</td><td class="border p-2">estemos</td><td class="border p-2">estéis</td><td class="border p-2">estén</td></tr>
            <tr><td class="border p-2"><strong>Dar</strong> (donner)</td><td class="border p-2">dé</td><td class="border p-2">des</td><td class="border p-2">dé</td><td class="border p-2">demos</td><td class="border p-2">deis</td><td class="border p-2">den</td></tr>
          </tbody>
        </table>

        <h3 class="text-xl font-bold mt-6 mb-3 text-secondary-dark">Principaux Emplois du Subjonctif</h3>
        <p class="mb-3">Le subjonctif est "déclenché" par le verbe ou l'expression de la proposition principale. La structure est souvent : <strong>[Déclencheur] + QUE + [Subjonctif]</strong>.</p>
        
        <div class="space-y-4">
            <div class="p-4 bg-background-light rounded-lg border">
                <h5 class="font-bold text-secondary-dark">1. Le Souhait, la Volonté, l'Ordre, le Conseil</h5>
                <p class="text-sm">Verbes comme <em>querer, desear, preferir, necesitar, pedir, aconsejar...</em></p>
                <p class="mt-2 text-sm"><em><strong>Quiero que</strong> tú <strong>hables</strong> con él.</em> (Je veux que tu parles avec lui.)</p>
                <p class="text-sm"><em>Te <strong>pido que</strong> <strong>vengas</strong> pronto.</em> (Je te demande de venir bientôt.)</p>
            </div>
            <div class="p-4 bg-background-light rounded-lg border">
                <h5 class="font-bold text-secondary-dark">2. Les Sentiments et Émotions</h5>
                <p class="text-sm">Verbes comme <em>gustar, encantar, alegrarse de, sentir, tener miedo de...</em></p>
                <p class="mt-2 text-sm"><em><strong>Me alegro de que</strong> <strong>estés</strong> aquí.</em> (Je suis content que tu sois ici.)</p>
                <p class="text-sm"><em><strong>Siento que</strong> no <strong>puedas</strong> venir.</em> (Je regrette que tu ne puisses pas venir.)</p>
            </div>
            <div class="p-4 bg-background-light rounded-lg border">
                <h5 class="font-bold text-secondary-dark">3. Le Doute et la Négation de la Réalité</h5>
                <p class="text-sm">Verbes comme <em>dudar, no creer, no pensar, negar...</em></p>
                <p class="mt-2 text-sm"><em><strong>Dudo que</strong> él <strong>diga</strong> la verdad.</em> (Je doute qu'il dise la vérité.)</p>
                <p class="text-sm"><em><strong>No creo que</strong> <strong>llueva</strong> mañana.</em> (Je ne crois pas qu'il pleuve demain.)</p>
                <p class="mt-2 text-sm text-amber-900 bg-amber-100 p-2 rounded"><strong>Attention :</strong> Les verbes d'opinion à la forme affirmative (<em>creer que, pensar que</em>) sont suivis de l'indicatif. C'est la négation qui déclenche le subjonctif.</p>
            </div>
            <div class="p-4 bg-background-light rounded-lg border">
                <h5 class="font-bold text-secondary-dark">4. Les Expressions Impersonnelles</h5>
                <p class="text-sm">Expressions comme <em>es importante que, es necesario que, es posible que, es una lástima que...</em></p>
                <p class="mt-2 text-sm"><em><strong>Es necesario que</strong> <strong>estudiemos</strong> más.</em> (Il est nécessaire que nous étudiions plus.)</p>
                <p class="text-sm"><em><strong>Es posible que</strong> <strong>lleguen</strong> tarde.</em> (Il est possible qu'ils arrivent en retard.)</p>
            </div>
             <div class="p-4 bg-background-light rounded-lg border">
                <h5 class="font-bold text-secondary-dark">5. Après certaines conjonctions</h5>
                <p class="text-sm">Notamment pour exprimer un but, une condition, une temporalité future...</p>
                <p class="mt-2 text-sm"><em>Te lo explico <strong>para que</strong> lo <strong>entiendas</strong>.</em> (Je te l'explique pour que tu le comprennes.)</p>
                <p class="text-sm"><em>Llámame <strong>cuando</strong> <strong>llegues</strong> a casa.</em> (Appelle-moi quand tu arriveras à la maison - action future)</p>
            </div>
        </div>
    `,
    exercises: [
      {
        id: 'exo_subj_1',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Conjuguez les verbes entre parenthèses au subjonctif présent (formation).",
        content: [
            { sentenceParts: ['Espero que tú (comer) bien. → Espero que tú '], solutions: ['comas'] },
            { sentenceParts: ['Queremos que vosotros (vivir) felices. → Queremos que vosotros '], solutions: ['viváis'] },
            { sentenceParts: ['Es importante que él (entender) la lección. → Es importante que él '], solutions: ['entienda'] },
            { sentenceParts: ['Dudo que ellos (encontrar) la solución. → Dudo que ellos '], solutions: ['encuentren'] },
            { sentenceParts: ['Te pido que (cerrar) la puerta. → Te pido que '], solutions: ['cierres'] }
        ],
        feedback: {
            correct: "Excellent ! La formation du subjonctif présent semble acquise.",
            incorrect: "Révisez la règle de formation : on part de la forme 'yo' de l'indicatif (tengo), on enlève le -o (teng-), et on ajoute la terminaison opposée (tenga, tengas...)."
        }
      },
      {
        id: 'exo_subj_2',
        type: ExerciseType.FILL_IN_THE_BLANK,
        instructions: "Conjuguez les verbes irréguliers au subjonctif présent.",
        content: [
          { sentenceParts: ["Ojalá que (ser) verdad. → Ojalá que "], solutions: ['sea'] },
          { sentenceParts: ["No creo que (haber) problemas. → No creo que "], solutions: ['haya'] },
          { sentenceParts: ["Espero que me (dar) une réponse pronto. → Espero que me "], solutions: ['dé'] },
          { sentenceParts: ["Cuando (ir) a Madrid, te llamaré. → Cuando "], solutions: ['vaya'] },
          { sentenceParts: ["Aunque no lo (saber) todo, lo intenta. → Aunque no lo "], solutions: ['sepa'] }
        ],
        feedback: {
            correct: "Félicitations ! Vous maîtrisez les verbes irréguliers les plus importants.",
            incorrect: "Les verbes comme ser, ir, saber, haber sont totalement irréguliers au subjonctif. Il est essentiel de les mémoriser : sea, vaya, sepa, haya..."
        }
      },
      {
        id: 'exo_subj_3',
        type: ExerciseType.MULTIPLE_CHOICE,
        instructions: "Choisissez la forme correcte : indicatif ou subjonctif ?",
        content: [
          { question: "No dudo que él ____ la verdad.", options: ['dice', 'diga'], solution: 'dice' },
          { question: "Dudo que él ____ la verdad.", options: ['dice', 'diga'], solution: 'diga' },
          { question: "Pienso que la película ____ interesante.", options: ['es', 'sea'], solution: 'es' },
          { question: "No pienso que la película ____ interesante.", options: ['es', 'sea'], solution: 'sea' },
          { question: "Te llamaré cuando ____ a casa.", options: ['llego', 'llegue'], solution: 'llegue' }
        ],
        feedback: {
            correct: "Très bien ! Vous savez quand utiliser l'indicatif et le subjonctif.",
            incorrect: "Attention au déclencheur. Les verbes d'opinion ou de certitude à la forme affirmative (creo que, es verdad que) utilisent l'indicatif. Le doute, la négation ou l'expression d'un souhait déclenchent le subjonctif."
        }
      },
      {
        id: 'exo_trad_3',
        type: ExerciseType.TRANSLATION,
        instructions: "Traduisez la phrase suivante en espagnol (Thème).",
        content: [
          {
            frenchSentence: "Je doute que le patron aille bien, j'espère qu'il sera bientôt de retour.",
            possibleSolutions: ["Dudo que el jefe esté bien, espero que vuelva pronto.", "Dudo que el jefe esté bien, espero que esté pronto de vuelta."],
            note: "La culture du travail en Espagne peut être plus directe. 'El jefe' est commun, mais 'el responsable' ou 'el director' sont aussi utilisés. Pour la santé, on utilise <strong>estar bien</strong> plutôt que 'ir bien'. Le doute ('Dudo que...') et le souhait ('espero que...') déclenchent ici le subjonctif : <strong>esté</strong> (de 'estar') et <strong>vuelva</strong> (de 'volver') ou <strong>esté de vuelta</strong>."
          }
        ],
        feedback: {
          correct: "Excellent ! Vous avez correctement identifié les déclencheurs du subjonctif.",
          incorrect: "Attention, les verbes exprimant le doute et le souhait ('dudar que', 'esperar que') sont suivis du subjonctif en espagnol."
        }
      }
    ],
    quiz: [
      {
        question: "Après l'expression 'Es importante que...', quel mode utilise-t-on ?",
        options: ["L'indicatif", "Le subjonctif", "L'impératif"],
        answer: "Le subjonctif",
        feedback: {
            correct: "Exact ! Les expressions impersonnelles de jugement de valeur déclenchent le subjonctif.",
            incorrect: "Incorrect. Les expressions impersonnelles comme 'es importante que', 'es necesario que' expriment une subjectivité et sont donc suivies du subjonctif."
        }
      },
      {
        question: "Quelle est la première personne du singulier (yo) du verbe 'ir' au subjonctif présent ?",
        options: ["vo", "vea", "vaya"],
        answer: "vaya",
        feedback: {
            correct: "Parfait ! 'Ir' est un verbe totalement irrégulier au subjonctif.",
            incorrect: "Ce n'est pas ça. Le verbe 'ir' est très irrégulier. Sa conjugaison au subjonctif est : vaya, vayas, vaya, vayamos, vayáis, vayan."
        }
      },
      {
        question: "La phrase 'Creo que Juan viene' est correcte. Comment devient-elle à la forme négative ?",
        options: ["No creo que Juan viene", "No creo que Juan venga", "No creo que Juan venirá"],
        answer: "No creo que Juan venga",
        feedback: {
            correct: "Excellent ! La négation du verbe d'opinion ('no creo que') déclenche le subjonctif.",
            incorrect: "Presque. Le verbe 'creer' à la forme affirmative est suivi de l'indicatif, mais à la forme négative, il exprime un doute et doit être suivi du subjonctif."
        }
      }
    ]
  }
];