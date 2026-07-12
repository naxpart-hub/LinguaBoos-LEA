// Théories des chapitres « groupe nominal, pronoms et discours », basées sur le
// fascicule LEA 1 – Outils linguistiques 1 (S. Grillo & I. Collado Rojas).
// Même code couleur que theoryContent.ts.

import { garguiTip } from './theoryContent';

export const GENERO_NUMERO_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">⚖️ 1. Le genre : masculin ou féminin ?</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-4">
    <div class="p-4 bg-sky-50 border-2 border-sky-300 rounded-2xl">
      <h4 class="font-extrabold text-sky-700 mb-2">♂️ Sont MASCULINS</h4>
      <ul class="text-sm space-y-1 list-disc list-inside">
        <li>les noms en <span class="text-blue-600 font-extrabold">-o</span> : <span class="text-green-700">el alumno</span> (sauf <span class="text-rose-600 font-bold">la mano, la foto, la moto, la radio</span>)</li>
        <li>la plupart des noms en <span class="text-blue-600 font-extrabold">-or</span> : <span class="text-green-700">el sudor, el calor, el color</span> (sauf <span class="text-rose-600 font-bold">la flor, la labor</span>)</li>
        <li>les noms en <span class="text-blue-600 font-extrabold">-aje, -ambre, -an</span> : <span class="text-green-700">el garaje, el pan</span></li>
        <li>mers, fleuves, montagnes : <span class="text-green-700">el Mediterráneo, el Sena, los Pirineos</span></li>
      </ul>
    </div>
    <div class="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl">
      <h4 class="font-extrabold text-rose-700 mb-2">♀️ Sont FÉMININS</h4>
      <ul class="text-sm space-y-1 list-disc list-inside">
        <li>la plupart des noms en <span class="text-blue-600 font-extrabold">-a</span> : <span class="text-green-700">una novela</span></li>
        <li>les noms abstraits en <span class="text-blue-600 font-extrabold">-tad, -dad, -tud, -triz</span> : <span class="text-green-700">la libertad, la ciudad, la virtud, la actriz</span></li>
        <li>les noms en <span class="text-blue-600 font-extrabold">-ción, -sión, -zón</span> : <span class="text-green-700">la acción, la presión, la razón</span> (mais <span class="text-rose-600 font-bold">el corazón</span> !)</li>
        <li>les noms en <span class="text-blue-600 font-extrabold">-ie, -ez</span> : <span class="text-green-700">la serie, la vez</span></li>
      </ul>
    </div>
  </div>

  <h4 class="font-extrabold text-slate-800 mt-4 mb-2">🚨 Les faux amis grecs en -A (masculins !)</h4>
  <p class="mb-2 text-sm">Mots d'origine grecque terminés en -a mais MASCULINS : <span class="text-violet-600 font-extrabold">el problema, el día, el mapa, el idioma, el clima, el sistema, el tema, el planeta, el programa</span>. Et les personnes en <strong>-ista</strong> suivent le sexe : <span class="text-green-700">el/la periodista, el/la turista</span>.</p>

  <h4 class="font-extrabold text-slate-800 mt-4 mb-2">🔁 Hispanismes : le genre change entre français et espagnol</h4>
  <table class="w-full text-left border-collapse mt-2 text-sm not-prose mb-3">
    <thead><tr class="bg-slate-100"><th class="border p-2 font-extrabold">Féminin FR → masculin ES</th><th class="border p-2 font-extrabold">Masculin FR → féminin ES</th></tr></thead>
    <tbody>
      <tr><td class="border p-2"><span class="text-green-700">el coche</span> (la voiture) · <span class="text-green-700">el mar</span> (la mer) · <span class="text-green-700">el análisis</span> (l'analyse)</td><td class="border p-2"><span class="text-green-700">la sal</span> (le sel) · <span class="text-green-700">la sangre</span> (le sang) · <span class="text-green-700">la miel</span> (le miel)</td></tr>
      <tr><td class="border p-2"><span class="text-green-700">el color, el calor, el valor</span> (les noms FR en -eur !)</td><td class="border p-2"><span class="text-green-700">la primavera</span> (le printemps) · <span class="text-green-700">la red</span> (le réseau) · <span class="text-green-700">la señal</span> (le signal)</td></tr>
    </tbody>
  </table>

  ${garguiTip('el cometa ou la cometa ?', `
    Certains mots changent de <strong>sens</strong> en changeant de genre :
    <span class="text-green-700 font-bold">el cometa</span> (la comète) / <span class="text-green-700 font-bold">la cometa</span> (le cerf-volant) ·
    <span class="text-green-700 font-bold">el capital</span> (l'argent) / <span class="text-green-700 font-bold">la capital</span> (la ville) ·
    <span class="text-green-700 font-bold">el frente</span> (le front militaire) / <span class="text-green-700 font-bold">la frente</span> (le front du visage) ·
    <span class="text-green-700 font-bold">el orden</span> (le rangement) / <span class="text-green-700 font-bold">la orden</span> (le commandement). 🪁
  `)}

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🔢 2. Le nombre : former le pluriel</h3>
  <ul class="list-disc list-inside space-y-2 mb-3">
    <li>Nom terminé par <strong>voyelle</strong> → <span class="text-blue-600 font-extrabold">+ s</span> : <span class="text-green-700">un chico → dos chico<strong>s</strong> · un café → café<strong>s</strong></span></li>
    <li>Nom terminé par <strong>consonne</strong> (autre que s/x), <strong>-y</strong>, ou <strong>-í/-ú accentué</strong> → <span class="text-blue-600 font-extrabold">+ es</span> : <span class="text-green-700">la mujer → mujer<strong>es</strong> · el rey → rey<strong>es</strong> · el jabalí → jabalí<strong>es</strong> · el país → país<strong>es</strong></span></li>
    <li>Nom terminé par <strong>-s ou -x</strong> (syllabe finale non accentuée) → <strong>invariable</strong> : <span class="text-green-700">la tesis → las tesis · el lunes → los lunes</span></li>
  </ul>
  <h4 class="font-extrabold text-slate-800 mt-4 mb-2">⚠️ Les pièges du pluriel</h4>
  <ul class="list-disc list-inside space-y-1 mb-3 text-sm">
    <li><strong>-z → -ces</strong> : <span class="text-green-700">el pez → los pe<span class="text-violet-600 font-extrabold">ces</span> · la voz → las voces</span></li>
    <li>L'accent écrit peut disparaître ou apparaître : <span class="text-green-700">el camión → los camiones · un inglés → dos ingleses · el examen → los ex<span class="text-rose-600 font-extrabold">á</span>menes</span></li>
    <li>Changement de sens au pluriel : <span class="text-green-700">el celo</span> (le zèle) / <span class="text-green-700">los celos</span> (la jalousie) · <span class="text-green-700">la esposa</span> (l'épouse) / <span class="text-green-700">las esposas</span> (les menottes !) · <span class="text-green-700">los padres</span> (les parents) · <span class="text-green-700">los reyes</span> (le couple royal)</li>
  </ul>
`;

export const ARTICULOS_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">🏷️ 1. L'article défini : el, la, los, las... et lo</h3>
  <table class="w-full text-left border-collapse mt-2 text-sm not-prose mb-3">
    <thead><tr class="bg-slate-100"><th class="border p-2"></th><th class="border p-2 font-extrabold">Singulier</th><th class="border p-2 font-extrabold">Pluriel</th></tr></thead>
    <tbody>
      <tr><td class="border p-2 font-bold">Masculin</td><td class="border p-2 text-green-700 font-bold">el perro</td><td class="border p-2 text-green-700 font-bold">los perros</td></tr>
      <tr><td class="border p-2 font-bold">Féminin</td><td class="border p-2 text-green-700 font-bold">la casa</td><td class="border p-2 text-green-700 font-bold">las casas</td></tr>
      <tr><td class="border p-2 font-bold">Neutre</td><td class="border p-2 text-green-700 font-bold" colspan="2">lo (+ adjectif) : lo bueno = ce qui est bon</td></tr>
    </tbody>
  </table>
  <p class="mb-3">Deux <strong>contractions obligatoires</strong> : <span class="text-rose-600 font-extrabold">a + el = al</span> (<span class="text-green-700">Voy al colegio</span>) et <span class="text-rose-600 font-extrabold">de + el = del</span> (<span class="text-green-700">María viene del parque</span>).</p>

  ${garguiTip("el agua... féminin !", `
    Devant un nom <strong>féminin</strong> commençant par <strong>a- / ha- accentué</strong>, on remplace « la » par
    <strong>el</strong> pour l'euphonie : <span class="text-green-700 font-bold">el agua turbia, el hacha blanca, el águila</span>.
    Le mot reste féminin (l'adjectif s'accorde au féminin !) et au pluriel tout redevient normal :
    <span class="text-green-700 font-bold">las aguas</span>. 💧
  `)}

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🕐 2. Emplois espagnols de l'article défini</h3>
  <ul class="list-disc list-inside space-y-1 mb-3">
    <li><strong>L'heure :</strong> <span class="text-green-700">Son <strong>las</strong> ocho.</span> (Il est huit heures.)</li>
    <li><strong>Le jour de la semaine :</strong> <span class="text-green-700">Nos vemos <strong>el</strong> lunes.</span> · périodicité : <span class="text-green-700"><strong>los</strong> domingos</span> (le dimanche = tous les dimanches)</li>
    <li><strong>L'âge :</strong> <span class="text-green-700">Se casó a <strong>los</strong> veinte (años).</span></li>
    <li><strong>lo + adjectif :</strong> <span class="text-green-700">Me gusta <strong>lo</strong> pequeño.</span> (J'aime ce qui est petit.) · <span class="text-green-700"><strong>lo que</strong> me dices</span> (ce que tu me dis)</li>
  </ul>
  <h4 class="font-extrabold text-slate-800 mt-4 mb-2">❌ Omission de l'article défini</h4>
  <ul class="list-disc list-inside space-y-1 mb-3 text-sm">
    <li>Pays, régions, villes non déterminés : <span class="text-green-700">Francia, España</span> (mais <span class="text-green-700">la Francia del siglo XX</span>)</li>
    <li>Avec <strong>casa, clase, misa, caza, pesca, paseo</strong> : <span class="text-green-700">Estoy en casa. Voy a clase.</span></li>
    <li>Après aprender, tocar, practicar : <span class="text-green-700">aprender inglés</span> · après tener : <span class="text-green-700">tener tiempo, tener derecho</span></li>
  </ul>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">1️⃣ 3. L'article indéfini : un, una, unos, unas</h3>
  <ul class="list-disc list-inside space-y-1 mb-3">
    <li>Individualiser : <span class="text-green-700">Es <strong>un</strong> perro que se parece a <strong>un</strong> oso.</span></li>
    <li>Exclamation : <span class="text-green-700">¡Hace <strong>un</strong> calor!</span> (Il fait une de ces chaleurs !)</li>
    <li><strong>unos/unas</strong> = quelques, une paire : <span class="text-green-700">Se ha quedado <strong>unas</strong> horas. · <strong>unas</strong> esposas</span> (des menottes)</li>
  </ul>
  <div class="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl not-prose mb-3">
    <p class="font-extrabold text-rose-700 mb-1">⚠️ Grandes différences avec le français</p>
    <ul class="text-sm space-y-1 list-disc list-inside">
      <li><strong>Pas de partitif</strong> « du / de la » : <span class="text-green-700 font-bold">Quiero chocolate.</span> (Je veux DU chocolat.) — jamais <span class="text-red-500 line-through">quiero del chocolate</span></li>
      <li><strong>Pas d'article pluriel</strong> en général : <span class="text-green-700 font-bold">Veo pájaros.</span> (Je vois DES oiseaux.)</li>
      <li><strong>Omission après otro, tal, tanto, igual</strong> : <span class="text-green-700 font-bold">Quiere otro vaso de agua.</span> (Il veut UN autre verre.) — jamais <span class="text-red-500 line-through">un otro</span> !</li>
    </ul>
  </div>
`;

export const DEMOSTRATIVOS_POSESIVOS_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">📍 1. Les démonstratifs : 3 distances au lieu de 1</h3>
  <p class="mb-3">Là où le français dit « ce », l'espagnol choisit selon la <strong>distance</strong> (dans l'espace, le temps, ou par rapport à l'interlocuteur) :</p>
  <table class="w-full text-left border-collapse mt-2 text-sm not-prose mb-3">
    <thead>
      <tr class="bg-slate-100"><th class="border p-2"></th><th class="border p-2 font-extrabold text-green-700">ESTE (proche, yo)</th><th class="border p-2 font-extrabold text-sky-700">ESE (moyen, tú)</th><th class="border p-2 font-extrabold text-violet-700">AQUEL (loin, él)</th></tr>
    </thead>
    <tbody>
      <tr><td class="border p-2 font-bold">Masculin</td><td class="border p-2">este, estos</td><td class="border p-2">ese, esos</td><td class="border p-2">aquel, aquellos</td></tr>
      <tr><td class="border p-2 font-bold">Féminin</td><td class="border p-2">esta, estas</td><td class="border p-2">esa, esas</td><td class="border p-2">aquella, aquellas</td></tr>
      <tr><td class="border p-2 font-bold">Espace</td><td class="border p-2">ici, près de moi</td><td class="border p-2">près de toi</td><td class="border p-2">là-bas</td></tr>
      <tr><td class="border p-2 font-bold">Temps</td><td class="border p-2">présent / très proche</td><td class="border p-2">passé/futur proche</td><td class="border p-2">passé/futur lointain</td></tr>
    </tbody>
  </table>
  <p class="mb-3 text-sm"><span class="text-green-700 font-semibold">esta mañana</span> (ce matin, aujourd'hui) · <span class="text-green-700 font-semibold">aquella mañana</span> (ce matin-là, lointain) · <span class="text-green-700 font-semibold">aquel despacho</span> (ce bureau là-bas)</p>
  <p class="mb-3 text-sm">Il existe une forme <strong>neutre invariable</strong> pour reprendre une idée : <span class="text-green-700 font-bold">esto, eso, aquello</span> → <span class="text-green-700">Eso no se dice.</span> (Cela ne se dit pas.)</p>

  ${garguiTip('traduire « celui de » et « celui qui »', `
    JAMAIS de démonstratif ici ! On emploie l'<strong>article défini</strong> :<br>
    « celui de mon ami » → <span class="text-green-700 font-bold">el de mi amigo</span> ·
    « celles de sa grand-mère » → <span class="text-green-700 font-bold">las de su abuela</span><br>
    « celui qui » → <span class="text-green-700 font-bold">el que</span> · « ce que / ce qui » → <span class="text-green-700 font-bold">lo que</span> :
    <span class="text-green-700 font-bold">Quiero lo que me has prometido.</span> 🎯
  `)}

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🔑 2. Les possessifs : forme atone (devant) et tonique (derrière)</h3>
  <table class="w-full text-left border-collapse mt-2 text-sm not-prose mb-3">
    <thead><tr class="bg-slate-100"><th class="border p-2 font-extrabold">Possesseur</th><th class="border p-2 font-extrabold">Atone (devant le nom)</th><th class="border p-2 font-extrabold">Tonique (derrière / pronom)</th></tr></thead>
    <tbody>
      <tr><td class="border p-2">yo</td><td class="border p-2 text-green-700 font-bold">mi, mis</td><td class="border p-2 text-green-700 font-bold">mío/a(s)</td></tr>
      <tr><td class="border p-2">tú</td><td class="border p-2 text-green-700 font-bold">tu, tus</td><td class="border p-2 text-green-700 font-bold">tuyo/a(s)</td></tr>
      <tr><td class="border p-2">él/ella/usted</td><td class="border p-2 text-green-700 font-bold">su, sus</td><td class="border p-2 text-green-700 font-bold">suyo/a(s)</td></tr>
      <tr><td class="border p-2">nosotros</td><td class="border p-2 text-green-700 font-bold">nuestro/a(s)</td><td class="border p-2 text-green-700 font-bold">nuestro/a(s)</td></tr>
      <tr><td class="border p-2">vosotros</td><td class="border p-2 text-green-700 font-bold">vuestro/a(s)</td><td class="border p-2 text-green-700 font-bold">vuestro/a(s)</td></tr>
      <tr><td class="border p-2">ellos/ustedes</td><td class="border p-2 text-green-700 font-bold">su, sus</td><td class="border p-2 text-green-700 font-bold">suyo/a(s)</td></tr>
    </tbody>
  </table>
  <ul class="list-disc list-inside space-y-1 mb-3 text-sm">
    <li>Le possessif s'accorde avec <strong>l'objet possédé</strong> : <span class="text-green-700">nuestra hermana, vuestras hermanas</span></li>
    <li>Forme tonique après <strong>ser</strong> = « à moi, à toi... » : <span class="text-green-700">Las cartas son <strong>tuyas</strong>.</span></li>
    <li>« un de mes... » : <span class="text-green-700">Es una hija <strong>mía</strong>. · ¿Es amigo <strong>tuyo</strong>?</span></li>
    <li>Pronom possessif = article + tonique : <span class="text-green-700"><strong>el mío, la tuya, los suyos</strong>... El nuestro se parece al vuestro.</span></li>
  </ul>

  <div class="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl not-prose mb-3">
    <p class="font-extrabold text-rose-700 mb-1">⚠️ Deux réflexes espagnols</p>
    <ul class="text-sm space-y-1 list-disc list-inside">
      <li><strong>su</strong> est ambigu (sa/leur/votre) : le contexte décide. Pour la politesse on précise : <span class="text-green-700 font-bold">Es asunto de usted.</span></li>
      <li>L'espagnol <strong>évite le possessif</strong> pour le corps, les vêtements, la nourriture : <span class="text-green-700 font-bold">Me lavo <u>las</u> manos.</span> (Je me lave LES mains, pas « mes » mains) · <span class="text-green-700 font-bold">Tómate <u>la</u> sopa.</span> (Bois ta soupe.)</li>
    </ul>
  </div>
`;

export const PRONOMBRES_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">👤 1. Les pronoms sujets : souvent invisibles !</h3>
  <p class="mb-3">La terminaison du verbe suffit à indiquer la personne : <span class="text-green-700 font-bold">Almuerzo a las dos.</span> (JE déjeune...). On n'emploie <strong>yo, tú, él...</strong> que pour <strong>insister</strong> (<span class="text-green-700">¡<strong>Yo</strong> digo la verdad!</span>) ou <strong>lever une ambiguïté</strong> (<span class="text-green-700">¿A qué hora almuerza <strong>usted</strong>?</span>).</p>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🎯 2. COD et COI : le tableau essentiel</h3>
  <table class="w-full text-left border-collapse mt-2 text-sm not-prose mb-3">
    <thead><tr class="bg-slate-100"><th class="border p-2 font-extrabold">Sujet</th><th class="border p-2 font-extrabold">COD</th><th class="border p-2 font-extrabold">COI</th><th class="border p-2 font-extrabold">Après préposition</th></tr></thead>
    <tbody>
      <tr><td class="border p-2">yo</td><td class="border p-2 text-green-700 font-bold">me</td><td class="border p-2 text-green-700 font-bold">me</td><td class="border p-2 text-green-700 font-bold">mí · <span class="text-violet-600">conmigo</span></td></tr>
      <tr><td class="border p-2">tú</td><td class="border p-2 text-green-700 font-bold">te</td><td class="border p-2 text-green-700 font-bold">te</td><td class="border p-2 text-green-700 font-bold">ti · <span class="text-violet-600">contigo</span></td></tr>
      <tr><td class="border p-2">él/ella/usted</td><td class="border p-2 text-green-700 font-bold">lo / la</td><td class="border p-2 text-green-700 font-bold">le</td><td class="border p-2 text-green-700 font-bold">él, ella, usted, sí</td></tr>
      <tr><td class="border p-2">nosotros/as</td><td class="border p-2 text-green-700 font-bold">nos</td><td class="border p-2 text-green-700 font-bold">nos</td><td class="border p-2 text-green-700 font-bold">nosotros/as</td></tr>
      <tr><td class="border p-2">vosotros/as</td><td class="border p-2 text-green-700 font-bold">os</td><td class="border p-2 text-green-700 font-bold">os</td><td class="border p-2 text-green-700 font-bold">vosotros/as</td></tr>
      <tr><td class="border p-2">ellos/as/ustedes</td><td class="border p-2 text-green-700 font-bold">los / las</td><td class="border p-2 text-green-700 font-bold">les</td><td class="border p-2 text-green-700 font-bold">ellos/as, ustedes, sí</td></tr>
    </tbody>
  </table>
  <p class="mb-3 text-sm">Ordre de la phrase : les pronoms se placent <strong>devant le verbe conjugué</strong>, toujours <strong>COI puis COD</strong> : <span class="text-green-700 font-bold">Me lo dirá.</span> (Il me le dira.)</p>

  ${garguiTip('le fameux « SE LO »', `
    Quand <strong>le/les</strong> (COI) rencontre <strong>lo/la/los/las</strong> (COD), le COI se transforme en
    <span class="text-rose-600 font-extrabold">SE</span> :<br>
    Pedro <u>le</u> da un regalo → Pedro <u>lo</u> da → <span class="text-green-700 font-bold">Pedro <span class="text-rose-600 font-extrabold">se lo</span> da.</span>
    Jamais <span class="text-red-500 line-through">le lo</span> ! 🎁
  `)}

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🧲 3. L'enclise : pronoms collés derrière</h3>
  <p class="mb-3">Avec l'<strong>infinitif</strong>, le <strong>gérondif</strong> et l'<strong>impératif affirmatif</strong>, les pronoms se soudent au verbe :</p>
  <ul class="list-disc list-inside space-y-1 mb-3">
    <li><span class="text-green-700 font-bold">No quiero decír<strong>telo</strong></span> ou <span class="text-green-700 font-bold"><strong>No te lo</strong> quiero decir</span> (les deux sont corrects !)</li>
    <li><span class="text-green-700 font-bold">Está explicándo<strong>selo</strong>.</span> · <span class="text-green-700 font-bold">Dá<strong>melo</strong>.</span></li>
  </ul>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🎩 4. Le vouvoiement : usted / ustedes = 3ᵉ personne !</h3>
  <div class="p-4 bg-sky-50 border-2 border-sky-300 rounded-2xl not-prose mb-3">
    <ul class="text-sm space-y-1 list-disc list-inside">
      <li><strong>usted</strong> (une personne, poli) → verbe à la <strong>3ᵉ pers. du singulier</strong> : <span class="text-green-700 font-bold">¿Puede usted indicarme el camino?</span></li>
      <li><strong>ustedes</strong> (plusieurs, poli) → <strong>3ᵉ pers. du pluriel</strong> : <span class="text-green-700 font-bold">Disculpen, señores, no pueden entrar.</span></li>
      <li><strong>vosotros</strong> = « vous » collectif familier (amis, famille) : <span class="text-green-700 font-bold">¿Venís al cine?</span></li>
      <li>Tous les pronoms et possessifs suivent la 3ᵉ personne : <span class="text-green-700 font-bold">Señor, <u>le</u> estoy diciendo que ésta no es <u>su</u> casa.</span></li>
    </ul>
  </div>

  ${garguiTip("l'accusatif de personne : le « a » personnel", `
    Devant un COD désignant une <strong>personne</strong>, on ajoute la préposition <strong>a</strong> :
    <span class="text-green-700 font-bold">Veo <u>a</u> María</span> mais <span class="text-green-700 font-bold">Veo la tele</span>.
    Ça vaut aussi pour alguien/nadie : <span class="text-green-700 font-bold">No veo <u>a</u> nadie.</span> 👀
  `)}
`;

export const NUMERALES_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">🔢 1. Les cardinaux : compter sans se tromper</h3>
  <p class="mb-2 text-sm">0-15 : <span class="text-green-700 font-semibold">cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez, once, doce, trece, catorce, quince</span> · 16-29 s'écrivent en un mot : <span class="text-green-700 font-semibold">dieciséis... veintiuno, veintidós...</span></p>
  <ul class="list-disc list-inside space-y-1 mb-3">
    <li>Le <strong>y</strong> ne s'emploie qu'entre <strong>dizaines et unités</strong> : <span class="text-green-700 font-bold">treinta y dos</span> (32), mais <span class="text-green-700 font-bold">ciento dos</span> (102, sans y !)</li>
    <li>100 = <span class="text-green-700 font-bold">cien</span> · 101 = <span class="text-green-700 font-bold">ciento uno</span> · 1000 = <span class="text-green-700 font-bold">mil</span> · 1 000 000 = <span class="text-green-700 font-bold">un millón (de...)</span> · 1 milliard = <span class="text-rose-600 font-extrabold">mil millones</span> !</li>
  </ul>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">✂️ 2. Apocopes et accords</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-4">
    <div class="p-4 bg-sky-50 border-2 border-sky-300 rounded-2xl">
      <h4 class="font-extrabold text-sky-700 mb-1">uno → un / una</h4>
      <p class="text-sm"><span class="text-green-700 font-bold">veintiún coches</span> (21 voitures) · <span class="text-green-700 font-bold">veintiuna casas</span> (accord au féminin !) · <span class="text-green-700 font-bold">cuarenta y un mil</span></p>
    </div>
    <div class="p-4 bg-green-50 border-2 border-green-300 rounded-2xl">
      <h4 class="font-extrabold text-green-700 mb-1">ciento → cien</h4>
      <p class="text-sm">Devant un nom, mil ou millones : <span class="text-green-700 font-bold">cien invitados, cien mil habitantes, cien millones</span></p>
    </div>
  </div>
  <p class="mb-3">Les <strong>centaines (200-900) s'accordent</strong> en genre : <span class="text-green-700 font-bold">trescient<span class="text-rose-600 font-extrabold">os</span> ejercicios</span> · <span class="text-green-700 font-bold">ochocient<span class="text-rose-600 font-extrabold">as</span> diecisiete habitaciones</span> · <span class="text-green-700 font-bold">quinientas casas</span>.</p>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🥇 3. Les ordinaux</h3>
  <p class="mb-2 text-sm">1º-10º : <span class="text-green-700 font-semibold">primero, segundo, tercero, cuarto, quinto, sexto, séptimo, octavo, noveno, décimo</span>.</p>
  <ul class="list-disc list-inside space-y-1 mb-3">
    <li>Apocope de <strong>primero</strong> et <strong>tercero</strong> devant un nom masculin singulier : <span class="text-green-700 font-bold">el prim<span class="text-rose-600 font-extrabold">er</span> ministro, el terc<span class="text-rose-600 font-extrabold">er</span> piso</span></li>
    <li>Au-delà de 10, on emploie le <strong>cardinal placé APRÈS le nom</strong> : siècles, rois, chapitres, étages : <span class="text-green-700 font-bold">Luis <u>catorce</u></span> (Louis XIV) · <span class="text-green-700 font-bold">el siglo <u>dieciséis</u></span> (le XVIᵉ siècle) · <span class="text-green-700 font-bold">Alfonso décimo</span> (≤ 10 : ordinal possible)</li>
  </ul>

  ${garguiTip('pourcentages et fractions', `
    Le % prend un article : <span class="text-green-700 font-bold">el 20% de los franceses <u>vive</u> en París</span>
    (verbe au singulier !). Le tiers = <span class="text-green-700 font-bold">la tercera parte</span>,
    le quart = <span class="text-green-700 font-bold">la cuarta parte</span>.
    Et « tous les 4 ans » = <span class="text-green-700 font-bold">cada cuatro años</span>. 📊
  `)}
`;

export const INDEFINIDOS_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">❔ 1. Alguno, alguien, algo : la présence</h3>
  <ul class="list-disc list-inside space-y-2 mb-3">
    <li><strong>alguno</strong> s'apocope en <span class="text-rose-600 font-extrabold">algún</span> devant un nom masculin singulier : <span class="text-green-700 font-bold">Algún día volverá.</span> Au pluriel = « quelques » : <span class="text-green-700 font-bold">Toma algunas cerezas.</span></li>
    <li><strong>alguien</strong> = quelqu'un (invariable) : <span class="text-green-700 font-bold">Alguien te llama.</span> — COD de personne → <strong>a</strong> : <span class="text-green-700 font-bold">Llama <u>a</u> alguien.</span></li>
    <li><strong>algo</strong> = quelque chose : <span class="text-green-700 font-bold">Hay algo que no entiendo.</span> · « quelque chose de + adj » = algo + adj direct : <span class="text-green-700 font-bold">algo interesante</span></li>
  </ul>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🚫 2. Ninguno, nadie, nada : l'absence et sa double construction</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-4">
    <div class="p-4 bg-green-50 border-2 border-green-300 rounded-2xl">
      <p class="font-extrabold text-green-700 mb-1">AVANT le verbe → pas de « no »</p>
      <p class="text-sm"><span class="text-green-700 font-bold">Nadie le responde.</span><br><span class="text-green-700 font-bold">Nada dice.</span><br><span class="text-green-700 font-bold">Ninguno de nosotros vendrá.</span></p>
    </div>
    <div class="p-4 bg-violet-50 border-2 border-violet-300 rounded-2xl">
      <p class="font-extrabold text-violet-700 mb-1">APRÈS le verbe → « no » obligatoire</p>
      <p class="text-sm"><span class="text-green-700 font-bold">No le responde nadie.</span><br><span class="text-green-700 font-bold">No dice nada.</span><br><span class="text-green-700 font-bold">No vendrá ninguno.</span></p>
    </div>
  </div>
  <p class="mb-3 text-sm">⚠️ <strong>ninguno → ningún</strong> devant nom masculin singulier. COD de personne : <span class="text-green-700 font-bold">No veo <u>a</u> nadie.</span></p>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">💯 3. Todo, cada, otro</h3>
  <ul class="list-disc list-inside space-y-2 mb-3">
    <li><strong>todo</strong> s'accorde : <span class="text-green-700 font-bold">todo el día, todas las manzanas</span>. Pronom neutre COD → il faut ajouter <strong>lo</strong> : <span class="text-green-700 font-bold"><span class="text-rose-600 font-extrabold">Lo</span> sé todo.</span> (Je sais tout.)</li>
    <li>Ne PAS traduire « tout » adverbe : <span class="text-green-700 font-bold">Estaban solos.</span> (Ils étaient tout seuls.)</li>
    <li><strong>cada</strong> invariable = chaque : <span class="text-green-700 font-bold">cada mujer</span> · chacun(e) : <span class="text-green-700 font-bold">cada uno / cada una / cada cual</span></li>
    <li><strong>otro</strong> SANS article indéfini : <span class="text-green-700 font-bold">Hay otros hoteles.</span> · <span class="text-red-500 line-through">un otro</span> ✘ · otro précède le numéral : <span class="text-green-700 font-bold">Esperaba a otros dos.</span> (deux autres)</li>
  </ul>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🪞 4. Mismo, propio, cualquiera</h3>
  <ul class="list-disc list-inside space-y-1 mb-3 text-sm">
    <li><strong>mismo</strong> = le même / lui-même : <span class="text-green-700 font-bold">Tengo el mismo bolígrafo que ella. · La misma directora me lo dijo.</span></li>
    <li><strong>propio</strong> (avant le nom) = renforcement : <span class="text-green-700 font-bold">Mis propios hijos me abandonan.</span></li>
    <li><strong>cualquiera</strong> perd son -a devant un nom : <span class="text-green-700 font-bold">cualquier cosa</span> (n'importe quoi) · <span class="text-green-700 font-bold">cualquier otro hombre</span> · concessive : <span class="text-green-700 font-bold">cualquiera que sea tu idea</span> (quelle que soit ton idée)</li>
  </ul>

  ${garguiTip('algo es algo !', `
    Expressions à glisser dans tes copies : <span class="text-green-700 font-bold">Algo es algo</span> (c'est mieux que rien) ·
    <span class="text-green-700 font-bold">alguno que otro</span> (l'un ou l'autre, de temps en temps) ·
    <span class="text-green-700 font-bold">es un cualquiera</span> (c'est un moins que rien) ·
    <span class="text-green-700 font-bold">no ha cambiado nada</span> (il n'a pas changé du tout). ✨
  `)}
`;

export const ESTILO_INDIRECTO_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">🗨️ 1. Rapporter des paroles : les 4 chantiers</h3>
  <p class="mb-3">Passer du style direct (<span class="text-green-700">Dice: «Yo me marcho»</span>) au style indirect (<span class="text-green-700">Dice que se marcha</span>) demande d'ajuster : les <strong>personnes</strong>, les <strong>temps</strong>, les <strong>adverbes</strong> et les <strong>démonstratifs</strong>.</p>
  <ul class="list-disc list-inside space-y-1 mb-3 text-sm">
    <li>Si le rapporteur = le locuteur : <span class="text-green-700">Digo: «Yo me marcho» → Digo que <strong>me marcho</strong>.</span></li>
    <li>Si le rapporteur parle de quelqu'un d'autre : <span class="text-green-700">Dice: «Yo me marcho» → Dice que <strong>se marcha</strong>.</span> (3ᵉ personne)</li>
  </ul>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">⏰ 2. La concordance des temps</h3>
  <p class="mb-2">Verbe introducteur au <strong>présent / passé composé</strong> → rien ne change : <span class="text-green-700 font-bold">Dice que come/comió/comerá.</span></p>
  <p class="mb-2">Verbe introducteur au <strong>passé (dijo, decía)</strong> → tout glisse vers le passé :</p>
  <table class="w-full text-left border-collapse mt-2 text-sm not-prose mb-3">
    <thead><tr class="bg-slate-100"><th class="border p-2 font-extrabold">Style direct</th><th class="border p-2 font-extrabold">Style indirect (introducteur au passé)</th></tr></thead>
    <tbody>
      <tr><td class="border p-2">Présent indicatif · <span class="text-green-700">«Como»</span></td><td class="border p-2 text-violet-600 font-bold">Imparfait · Dijo que comía</td></tr>
      <tr><td class="border p-2">Passé composé · <span class="text-green-700">«He comido»</span></td><td class="border p-2 text-violet-600 font-bold">Plus-que-parfait · Dijo que había comido</td></tr>
      <tr><td class="border p-2">Futur · <span class="text-green-700">«Comeré»</span></td><td class="border p-2 text-violet-600 font-bold">Conditionnel · Dijo que comería</td></tr>
      <tr><td class="border p-2">Impératif · <span class="text-green-700">«¡Come!»</span></td><td class="border p-2 text-violet-600 font-bold">Imparfait du subjonctif · Dijo que comiera</td></tr>
      <tr><td class="border p-2">Subjonctif présent · <span class="text-green-700">«...que venga»</span></td><td class="border p-2 text-violet-600 font-bold">Imparfait du subjonctif · Dijo que viniera</td></tr>
    </tbody>
  </table>
  <p class="mb-3 text-sm">💡 Exception : une <strong>vérité générale</strong> peut garder le présent : <span class="text-green-700 font-bold">Me dijeron que <u>es</u> un lugar famoso.</span></p>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">📅 3. Adverbes et démonstratifs qui glissent</h3>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-2 not-prose mb-3 text-center text-sm">
    <div class="p-2 bg-sky-50 border-2 border-sky-300 rounded-xl">hoy → <span class="text-violet-600 font-extrabold">aquel día</span></div>
    <div class="p-2 bg-sky-50 border-2 border-sky-300 rounded-xl">ayer → <span class="text-violet-600 font-extrabold">el día anterior</span></div>
    <div class="p-2 bg-sky-50 border-2 border-sky-300 rounded-xl">mañana → <span class="text-violet-600 font-extrabold">al día siguiente</span></div>
    <div class="p-2 bg-sky-50 border-2 border-sky-300 rounded-xl">ahora → <span class="text-violet-600 font-extrabold">ya / entonces</span></div>
    <div class="p-2 bg-sky-50 border-2 border-sky-300 rounded-xl">aquí → <span class="text-violet-600 font-extrabold">allí</span></div>
    <div class="p-2 bg-sky-50 border-2 border-sky-300 rounded-xl">este → <span class="text-violet-600 font-extrabold">ese / aquel</span></div>
    <div class="p-2 bg-sky-50 border-2 border-sky-300 rounded-xl">venir → <span class="text-violet-600 font-extrabold">ir</span></div>
    <div class="p-2 bg-sky-50 border-2 border-sky-300 rounded-xl">traer → <span class="text-violet-600 font-extrabold">llevar</span></div>
  </div>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">❓ 4. Questions et exclamations rapportées</h3>
  <ul class="list-disc list-inside space-y-2 mb-3">
    <li>Question totale (oui/non) → ajouter <strong>si</strong> : <span class="text-green-700">¿Vienes? → Le pregunta <strong>si</strong> viene.</span></li>
    <li>Mot interrogatif : il <strong>garde son accent</strong> : <span class="text-green-700">¿Cuál es tu nombre? → Le pregunta <strong>cuál</strong> es su nombre.</span></li>
    <li>« qué » : deux options : <span class="text-green-700">¿Qué quieres? → Le pregunta <strong>qué</strong> quiere / <strong>lo que</strong> quiere.</span></li>
    <li>Exclamation → muy/mucho : <span class="text-green-700">¡Qué inteligente es Juan! → Dice que Juan es <strong>muy</strong> inteligente.</span> · <span class="text-green-700">¡Cuánto bebe! → Dice que bebe <strong>mucho</strong>.</span></li>
  </ul>

  ${garguiTip('la machine à remonter le temps', `
    Verbe introducteur au passé = tout recule d'un cran : présent → imparfait, passé composé → plus-que-parfait,
    futur → conditionnel, impératif → imparfait du subjonctif.
    Et n'oublie pas de faire glisser <strong>hoy, ayer, mañana, aquí, este</strong> ! ⏳
  `)}
`;
