import { Chapter, ExerciseType } from '../types';
import { THEORY_BY_CHAPTER } from './theoryContent';

export const grammarData: Chapter[] = [
  {
    id: 'orthographe',
    title: 'Orthographe et Accentuation',
    theory: THEORY_BY_CHAPTER.orthographe,
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
    theory: THEORY_BY_CHAPTER.present_indicatif,
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
    theory: THEORY_BY_CHAPTER.subjonctif,
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