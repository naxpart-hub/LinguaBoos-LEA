// Théories des chapitres « temps et modes verbaux », basées sur le fascicule
// LEA 1 – Outils linguistiques 1 (S. Grillo & I. Collado Rojas).
// Même code couleur que theoryContent.ts :
//   rose = syllabe tonique / accent écrit · bleu = terminaisons
//   violet = irrégularités · vert = exemples corrects · rouge = erreurs

import { garguiTip } from './theoryContent';

export const IMPERATIVO_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">📣 1. L'impératif affirmatif : donner un ordre</h3>
  <p class="mb-3">L'impératif espagnol n'a <strong>pas de 1ʳᵉ personne du singulier</strong> (on ne se donne pas d'ordre à soi-même !). Chaque personne a sa recette :</p>
  <table class="w-full text-left border-collapse mt-2 text-sm not-prose">
    <thead>
      <tr class="bg-slate-100"><th class="border p-2 font-extrabold">Personne</th><th class="border p-2 font-extrabold">Formation</th><th class="border p-2 font-extrabold">cantar / comer / vivir</th></tr>
    </thead>
    <tbody>
      <tr><td class="border p-2"><strong>tú</strong></td><td class="border p-2">3ᵉ pers. sing. du présent de l'indicatif</td><td class="border p-2 text-green-700 font-semibold">canta / come / vive</td></tr>
      <tr><td class="border p-2"><strong>usted</strong></td><td class="border p-2">subjonctif présent</td><td class="border p-2 text-green-700 font-semibold">cante / coma / viva</td></tr>
      <tr><td class="border p-2"><strong>nosotros</strong></td><td class="border p-2">subjonctif présent</td><td class="border p-2 text-green-700 font-semibold">cantemos / comamos / vivamos</td></tr>
      <tr><td class="border p-2"><strong>vosotros</strong></td><td class="border p-2">infinitif − <span class="text-blue-600 font-extrabold">R</span> + <span class="text-blue-600 font-extrabold">D</span></td><td class="border p-2 text-green-700 font-semibold">canta<span class="text-blue-600 font-extrabold">d</span> / come<span class="text-blue-600 font-extrabold">d</span> / vivi<span class="text-blue-600 font-extrabold">d</span></td></tr>
      <tr><td class="border p-2"><strong>ustedes</strong></td><td class="border p-2">subjonctif présent</td><td class="border p-2 text-green-700 font-semibold">canten / coman / vivan</td></tr>
    </tbody>
  </table>

  ${garguiTip('3 personnes sur 5 = subjonctif !', `
    Seuls <strong>tú</strong> et <strong>vosotros</strong> ont une vraie forme d'impératif.
    Pour <strong>usted, nosotros, ustedes</strong>, on recycle le <strong>subjonctif présent</strong>.
    Si tu connais ton subjonctif, tu connais déjà 60 % de l'impératif ! 🏰
  `)}

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">⚡ 2. Les 9 irréguliers de « tú » à connaître par cœur</h3>
  <p class="mb-3">Neuf verbes ont une forme <strong>tú</strong> ultra-courte :</p>
  <div class="grid grid-cols-3 gap-2 not-prose mb-3 text-center text-sm">
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">decir → <span class="text-violet-600 font-extrabold">di</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">hacer → <span class="text-violet-600 font-extrabold">haz</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">ir → <span class="text-violet-600 font-extrabold">ve</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">poner → <span class="text-violet-600 font-extrabold">pon</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">salir → <span class="text-violet-600 font-extrabold">sal</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">ser → <span class="text-violet-600 font-extrabold">sé</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">tener → <span class="text-violet-600 font-extrabold">ten</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">valer → <span class="text-violet-600 font-extrabold">val</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">ver → <span class="text-violet-600 font-extrabold">ve</span></div>
  </div>
  <p class="mb-3 text-sm">⚠️ À la 1ʳᵉ personne du pluriel de <strong>ir</strong>, on emploie l'indicatif : <span class="text-green-700 font-bold">¡Vamos!</span> (Allons-y !). Les verbes à diphtongue/affaiblissement gardent leurs irrégularités : <span class="text-green-700">s<span class="text-violet-600 font-bold">ie</span>nte, p<span class="text-violet-600 font-bold">i</span>de, d<span class="text-violet-600 font-bold">ue</span>rme</span>.</p>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🧲 3. L'enclise : les pronoms collés au verbe</h3>
  <p class="mb-3">À l'impératif <strong>affirmatif</strong>, les pronoms compléments se <strong>collent derrière</strong> le verbe (= enclise), dans l'ordre <strong>COI puis COD</strong> :</p>
  <ul class="list-disc list-inside space-y-1 mb-3">
    <li><span class="text-green-700 font-bold">Dá<span class="text-rose-600 font-extrabold">melo</span></span> = Donne-<strong>le-moi</strong> (me = COI, lo = COD)</li>
    <li><span class="text-green-700 font-bold">Levánta<span class="text-rose-600 font-extrabold">te</span></span> = Lève-toi</li>
  </ul>
  <p class="mb-3 text-sm">Deux chutes de lettres avec les verbes pronominaux :</p>
  <ul class="list-disc list-inside space-y-1 mb-3 text-sm">
    <li><strong>nosotros</strong> perd son <strong>-s</strong> : levantemos + nos → <span class="text-green-700 font-bold">levantémonos</span> (pas <span class="text-red-500 line-through">levantémosnos</span>)</li>
    <li><strong>vosotros</strong> perd son <strong>-d</strong> : levantad + os → <span class="text-green-700 font-bold">levantaos</span> (exception : <span class="text-green-700 font-bold">idos</span>)</li>
  </ul>

  ${garguiTip("l'accent qui apparaît", `
    Quand on colle des pronoms, la syllabe tonique <strong>ne bouge pas</strong>... mais elle recule dans le mot,
    qui devient souvent esdrújulo → il faut <strong>écrire l'accent</strong> :
    <span class="text-green-700 font-bold">da</span> → <span class="text-green-700 font-bold">dá<u>melo</u></span> ·
    <span class="text-green-700 font-bold">diga</span> → <span class="text-green-700 font-bold">dígame</span> 🎯
  `)}

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🚫 4. L'impératif négatif : la défense</h3>
  <p class="mb-3">Interdire = <strong>no + subjonctif présent</strong>, à TOUTES les personnes. Et attention : les pronoms repassent <strong>devant</strong> le verbe (pas d'enclise), toujours dans l'ordre COI puis COD :</p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-4">
    <div class="p-4 bg-green-50 border-2 border-green-300 rounded-2xl">
      <p class="font-extrabold text-green-700 mb-1">✅ Affirmatif (enclise)</p>
      <p class="text-sm"><span class="text-green-700 font-bold">Dámelo.</span> (Donne-le-moi.)<br><span class="text-green-700 font-bold">Levántate.</span> (Lève-toi.)</p>
    </div>
    <div class="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl">
      <p class="font-extrabold text-rose-700 mb-1">🚫 Négatif (no + subjonctif, pronoms devant)</p>
      <p class="text-sm"><span class="text-green-700 font-bold">No <span class="text-rose-600 font-extrabold">me lo</span> des.</span> (Ne me le donne pas.)<br><span class="text-green-700 font-bold">No <span class="text-rose-600 font-extrabold">te</span> levantes.</span> (Ne te lève pas.)</p>
    </div>
  </div>
  <p class="mb-2 text-sm">Modèles complets : <span class="text-green-700">no cantes, no cante, no cantemos, no cantéis, no canten</span> · <span class="text-green-700">no comas...</span> · <span class="text-green-700">no vivas...</span></p>
`;

export const FUTURO_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">🔮 1. La formation : l'infinitif entier + terminaisons</h3>
  <p class="mb-3">Grande nouveauté : on ne coupe RIEN ! On garde l'<strong>infinitif complet</strong> et on ajoute les terminaisons du verbe <em>haber</em> au présent : <span class="text-blue-600 font-extrabold">-é, -ás, -á, -emos, -éis, -án</span>. L'accent tonique tombe sur la voyelle qui suit l'infinitif (accent écrit partout sauf <em>nosotros</em>).</p>
  <div class="p-4 bg-sky-50 border-2 border-sky-300 rounded-2xl not-prose mb-4">
    <p class="text-sm text-center font-semibold">hablar<span class="text-blue-600 font-extrabold">é</span> · hablar<span class="text-blue-600 font-extrabold">ás</span> · hablar<span class="text-blue-600 font-extrabold">á</span> · hablar<span class="text-blue-600 font-extrabold">emos</span> · hablar<span class="text-blue-600 font-extrabold">éis</span> · hablar<span class="text-blue-600 font-extrabold">án</span></p>
    <p class="text-xs text-center mt-1 text-slate-500">Même chose pour comer → comeré... et vivir → viviré...</p>
  </div>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🧪 2. Les 12 radicaux irréguliers</h3>
  <p class="mb-3">Les terminaisons ne changent JAMAIS. Seul le <span class="text-violet-600 font-bold">radical</span> se déforme, de 3 façons :</p>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mb-4">
    <div class="p-4 bg-sky-50 border-2 border-sky-300 rounded-2xl">
      <h4 class="font-extrabold text-sky-700 mb-2">Le « e » tombe 🍂</h4>
      <ul class="text-sm space-y-1">
        <li>poder → <span class="text-violet-600 font-extrabold">podr</span>é</li>
        <li>saber → <span class="text-violet-600 font-extrabold">sabr</span>é</li>
        <li>querer → <span class="text-violet-600 font-extrabold">querr</span>é</li>
        <li>haber → <span class="text-violet-600 font-extrabold">habr</span>é</li>
        <li>caber → <span class="text-violet-600 font-extrabold">cabr</span>é</li>
      </ul>
    </div>
    <div class="p-4 bg-violet-50 border-2 border-violet-300 rounded-2xl">
      <h4 class="font-extrabold text-violet-700 mb-2">Un « d » remplace la voyelle 🔧</h4>
      <ul class="text-sm space-y-1">
        <li>poner → <span class="text-violet-600 font-extrabold">pondr</span>é</li>
        <li>tener → <span class="text-violet-600 font-extrabold">tendr</span>é</li>
        <li>venir → <span class="text-violet-600 font-extrabold">vendr</span>é</li>
        <li>salir → <span class="text-violet-600 font-extrabold">saldr</span>é</li>
        <li>valer → <span class="text-violet-600 font-extrabold">valdr</span>é</li>
      </ul>
    </div>
    <div class="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl">
      <h4 class="font-extrabold text-rose-700 mb-2">Une syllabe disparaît ✂️</h4>
      <ul class="text-sm space-y-1">
        <li>decir → <span class="text-violet-600 font-extrabold">dir</span>é</li>
        <li>hacer → <span class="text-violet-600 font-extrabold">har</span>é</li>
      </ul>
    </div>
  </div>

  ${garguiTip('le radical se propage', `
    Un radical irrégulier du futur vaut pour <strong>toutes les personnes</strong> :
    <span class="text-green-700 font-bold">tendré, tendrás, tendrá, tendremos, tendréis, tendrán</span>.
    Et bonus : ce sont <strong>les mêmes radicaux qu'au conditionnel</strong> (tendría...). Deux temps pour le prix d'un ! 💰
  `)}

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🎯 3. Les emplois du futur</h3>
  <ul class="list-disc list-inside space-y-2 mb-4">
    <li><strong>Action à venir</strong> (comme en français) : <span class="text-green-700">Mañana <strong>iré</strong> al trabajo.</span> (Demain, j'irai au travail.)</li>
    <li><strong>Conjecture, hypothèse sur le présent</strong> (très espagnol !) : <span class="text-green-700"><strong>Serán</strong> las dos.</span> (Il doit être deux heures.) · <span class="text-green-700"><strong>Estará</strong> enfermo.</span> (Il doit être malade.)</li>
  </ul>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">⏭️ 4. Le futur antérieur</h3>
  <p class="mb-3"><strong>haber au futur + participe passé</strong>. Il exprime une antériorité par rapport à une action future, ou une probabilité :</p>
  <ul class="list-disc list-inside space-y-1 mb-3">
    <li><span class="text-green-700 font-bold">Habré terminado cuando vengas.</span> (J'aurai terminé quand tu viendras.)</li>
    <li><span class="text-green-700 font-bold">No habrá sabido convencerte.</span> (Il n'a pas dû savoir te convaincre. → probabilité)</li>
  </ul>

  ${garguiTip('piège du « quand » futur', `
    En français : « J'aurai terminé quand tu <u>viendras</u> » (futur).
    En espagnol, après <strong>cuando</strong> tourné vers le futur → <strong>subjonctif</strong> :
    <span class="text-green-700 font-bold">cuando vengas</span>, jamais <span class="text-red-500 line-through">cuando vendrás</span> ! 🚦
  `)}
`;

export const PASADO_COMPUESTO_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">🧩 1. La formation : haber au présent + participe passé</h3>
  <p class="mb-3">Le <em>pretérito perfecto compuesto</em> se construit avec l'auxiliaire <strong>haber</strong> au présent (<span class="text-blue-600 font-extrabold">he, has, ha, hemos, habéis, han</span>) suivi du <strong>participe passé</strong> :</p>
  <ul class="list-disc list-inside space-y-1 mb-3">
    <li>verbes en <strong>-AR</strong> → <span class="text-blue-600 font-extrabold">-ado</span> : cantar → <span class="text-green-700 font-bold">cantado</span></li>
    <li>verbes en <strong>-ER / -IR</strong> → <span class="text-blue-600 font-extrabold">-ido</span> : comer → <span class="text-green-700 font-bold">comido</span> · vivir → <span class="text-green-700 font-bold">vivido</span></li>
  </ul>
  <p class="mb-3"><span class="text-green-700 font-bold">María ha llegado.</span> (María est arrivée.)</p>

  <div class="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl not-prose mb-4">
    <p class="font-extrabold text-rose-700 mb-1">⚠️ Deux règles d'or (différences avec le français)</p>
    <ul class="text-sm space-y-1 list-disc list-inside">
      <li><strong>UN SEUL auxiliaire : haber.</strong> Jamais « être » ! <span class="text-green-700 font-bold">Se han levantado</span> (ils SE SONT levés) — pas <span class="text-red-500 line-through">son levantado</span>.</li>
      <li>Le participe passé est <strong>toujours invariable</strong> avec haber et <strong>inséparable</strong> de lui : <span class="text-green-700 font-bold">Juan y Arturo han comido mucho.</span></li>
    </ul>
  </div>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">✍️ 2. Participes : accents et irréguliers</h3>
  <p class="mb-2 text-sm">Verbes en -ER/-IR dont le radical finit par une voyelle → accent écrit sur le i : <span class="text-green-700 font-bold">leído, caído, oído, creído</span>. Mais les verbes en <strong>-UIR</strong> n'en prennent pas : <span class="text-green-700 font-bold">construido</span>.</p>
  <p class="mb-2">Les grands participes irréguliers :</p>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-2 not-prose mb-3 text-center text-sm">
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">abrir → <span class="text-violet-600 font-extrabold">abierto</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">escribir → <span class="text-violet-600 font-extrabold">escrito</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">romper → <span class="text-violet-600 font-extrabold">roto</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">morir → <span class="text-violet-600 font-extrabold">muerto</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">decir → <span class="text-violet-600 font-extrabold">dicho</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">hacer → <span class="text-violet-600 font-extrabold">hecho</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">poner → <span class="text-violet-600 font-extrabold">puesto</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">ver → <span class="text-violet-600 font-extrabold">visto</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">volver → <span class="text-violet-600 font-extrabold">vuelto</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">imprimir → <span class="text-violet-600 font-extrabold">impreso</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">resolver → <span class="text-violet-600 font-extrabold">resuelto</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">cubrir → <span class="text-violet-600 font-extrabold">cubierto</span></div>
  </div>
  <p class="mb-3 text-sm">Les composés héritent de l'irrégularité (descubrir → descubierto, devolver → devuelto)... sauf <strong>bendecir/maldecir</strong> → bendecido/maldecido.</p>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🕐 3. Quand l'employer ?</h3>
  <p class="mb-3">Beaucoup <strong>moins utilisé qu'en français</strong> ! Il s'emploie quand l'action s'est produite dans un moment <strong>pas encore terminé</strong> pour le locuteur, ou dont les conséquences durent encore :</p>
  <ul class="list-disc list-inside space-y-1 mb-3">
    <li><span class="text-green-700 font-bold">Esta mañana me he levantado a las ocho.</span> (« ce matin » fait partie d'aujourd'hui)</li>
    <li><span class="text-green-700 font-bold">Siempre has sido optimista.</span> (qualité toujours vraie aujourd'hui)</li>
  </ul>
  <p class="mb-3 text-sm">Mots déclencheurs : <span class="text-green-700 font-semibold">hoy, esta mañana, esta semana, este año, todavía no, ya, nunca, siempre</span>.</p>

  ${garguiTip('hoy → he / ayer → fui', `
    Le repère magique : si le moment <strong>contient encore le présent</strong> (hoy, esta semana...) → passé composé.
    Si le moment est <strong>fini et détaché</strong> (ayer, la semana pasada, en 2020...) → l'espagnol préfère le
    <strong>passé simple</strong> : <span class="text-green-700 font-bold">Ayer fui al cine</span>,
    pas <span class="text-red-500 line-through">Ayer he ido</span>. 🗓️
  `)}
`;

export const IMPERFECTO_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">🎨 1. L'imparfait : le temps du décor</h3>
  <p class="mb-3">L'<em>imperfecto</em> est le temps de la <strong>description</strong>, de l'<strong>habitude</strong> et des actions en cours dans le passé. Sa formation est d'une régularité exemplaire :</p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-4">
    <div class="p-4 bg-sky-50 border-2 border-sky-300 rounded-2xl">
      <h4 class="font-extrabold text-sky-700 text-center mb-2">-AR → <span class="text-blue-600">-aba</span></h4>
      <p class="text-sm text-center">cant<span class="text-blue-600 font-extrabold">aba</span>, cant<span class="text-blue-600 font-extrabold">abas</span>, cant<span class="text-blue-600 font-extrabold">aba</span>, cant<span class="text-rose-600 font-extrabold">á</span><span class="text-blue-600 font-extrabold">bamos</span>, cant<span class="text-blue-600 font-extrabold">abais</span>, cant<span class="text-blue-600 font-extrabold">aban</span></p>
    </div>
    <div class="p-4 bg-green-50 border-2 border-green-300 rounded-2xl">
      <h4 class="font-extrabold text-green-700 text-center mb-2">-ER / -IR → <span class="text-blue-600">-ía</span></h4>
      <p class="text-sm text-center">com<span class="text-blue-600 font-extrabold">ía</span>, com<span class="text-blue-600 font-extrabold">ías</span>, com<span class="text-blue-600 font-extrabold">ía</span>, com<span class="text-blue-600 font-extrabold">íamos</span>, com<span class="text-blue-600 font-extrabold">íais</span>, com<span class="text-blue-600 font-extrabold">ían</span> · viv<span class="text-blue-600 font-extrabold">ía</span>...</p>
    </div>
  </div>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🎁 2. SEULEMENT 3 verbes irréguliers !</h3>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mb-4">
    <div class="p-4 bg-violet-50 border-2 border-violet-300 rounded-2xl text-center">
      <h4 class="font-extrabold text-violet-700">ir (aller)</h4>
      <p class="text-sm"><span class="text-violet-600 font-extrabold">iba</span>, ibas, iba, íbamos, ibais, iban</p>
    </div>
    <div class="p-4 bg-violet-50 border-2 border-violet-300 rounded-2xl text-center">
      <h4 class="font-extrabold text-violet-700">ser (être)</h4>
      <p class="text-sm"><span class="text-violet-600 font-extrabold">era</span>, eras, era, éramos, erais, eran</p>
    </div>
    <div class="p-4 bg-violet-50 border-2 border-violet-300 rounded-2xl text-center">
      <h4 class="font-extrabold text-violet-700">ver (voir)</h4>
      <p class="text-sm"><span class="text-violet-600 font-extrabold">veía</span>, veías, veía, veíamos, veíais, veían</p>
    </div>
  </div>

  ${garguiTip("l'imparfait, temps le plus gentil", `
    3 irréguliers seulement, et les terminaisons -aba / -ía valent pour tout le monde.
    Petit piège quand même : l'accent écrit de <span class="text-green-700 font-bold">cantábamos, íbamos, éramos</span>
    (esdrújulos → accent obligatoire !). 😇
  `)}

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🎯 3. Les valeurs de l'imparfait</h3>
  <ul class="list-disc list-inside space-y-2 mb-4">
    <li><strong>Action qui se déroulait :</strong> <span class="text-green-700">Paco <strong>leía</strong> y <strong>pensaba</strong>.</span></li>
    <li><strong>Action en parallèle d'une autre :</strong> <span class="text-green-700">Sonia <strong>leía</strong> cuando Juan entró.</span> (imparfait = décor, passé simple = événement)</li>
    <li><strong>Narration et description du récit :</strong> <span class="text-green-700">El castillo <strong>era</strong> enorme y <strong>llovía</strong> sin parar.</span></li>
    <li><strong>Habitudes du passé :</strong> <span class="text-green-700">De niño, <strong>jugaba</strong> en el patio todos los días.</span></li>
    <li><strong>Atténuation polie :</strong> <span class="text-green-700"><strong>Quería</strong> pedirte un favor.</span> (Je voulais te demander un service.)</li>
  </ul>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">⏮️ 4. Le plus-que-parfait (pluscuamperfecto)</h3>
  <p class="mb-3"><strong>haber à l'imparfait (había...) + participe passé</strong>. Il exprime une action <strong>antérieure à une autre action passée</strong> :</p>
  <p class="mb-3"><span class="text-green-700 font-bold">Había comido cuando llegó Pablo.</span> (J'avais mangé quand Pablo arriva.)</p>
  <p class="mb-2 text-sm">Conjugaison : <span class="text-green-700">había, habías, había, habíamos, habíais, habían + comido/cantado/vivido...</span></p>
`;

export const PASADO_SIMPLE_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">🗡️ 1. Le passé simple : le temps roi du récit espagnol</h3>
  <p class="mb-3">Contrairement au français où il est littéraire, le <em>pretérito indefinido</em> s'emploie <strong>tous les jours</strong> en espagnol ! Formation régulière :</p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-4">
    <div class="p-4 bg-sky-50 border-2 border-sky-300 rounded-2xl">
      <h4 class="font-extrabold text-sky-700 text-center mb-2">-AR · cantar</h4>
      <p class="text-sm text-center">cant<span class="text-rose-600 font-extrabold">é</span>, cant<span class="text-blue-600 font-extrabold">aste</span>, cant<span class="text-rose-600 font-extrabold">ó</span>, cant<span class="text-blue-600 font-extrabold">amos</span>, cant<span class="text-blue-600 font-extrabold">asteis</span>, cant<span class="text-blue-600 font-extrabold">aron</span></p>
    </div>
    <div class="p-4 bg-green-50 border-2 border-green-300 rounded-2xl">
      <h4 class="font-extrabold text-green-700 text-center mb-2">-ER / -IR · comer, vivir</h4>
      <p class="text-sm text-center">com<span class="text-rose-600 font-extrabold">í</span>, com<span class="text-blue-600 font-extrabold">iste</span>, com<span class="text-rose-600 font-extrabold">ió</span>, com<span class="text-blue-600 font-extrabold">imos</span>, com<span class="text-blue-600 font-extrabold">isteis</span>, com<span class="text-blue-600 font-extrabold">ieron</span></p>
    </div>
  </div>

  ${garguiTip("l'accent qui change tout", `
    <span class="text-green-700 font-bold">canté</span> (passé simple, j'ai chanté) ≠ <span class="text-green-700 font-bold">cante</span> (subjonctif) ·
    <span class="text-green-700 font-bold">cantó</span> (il chanta) ≠ <span class="text-green-700 font-bold">canto</span> (je chante).
    Un accent oublié = un contresens total. Les 1ʳᵉ et 3ᵉ personnes du singulier <strong>régulières</strong> portent TOUJOURS l'accent écrit ! ⚡
  `)}

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🔤 2. Modifications orthographiques</h3>
  <ul class="list-disc list-inside space-y-1 mb-3 text-sm">
    <li>1ʳᵉ pers. des verbes en <strong>-car / -gar / -zar / -guar</strong> : aparcar → <span class="text-green-700 font-bold">aparqué</span> · pagar → <span class="text-green-700 font-bold">pagué</span> · lanzar → <span class="text-green-700 font-bold">lancé</span> · averiguar → <span class="text-green-700 font-bold">averigüé</span> · empezar → <span class="text-green-700 font-bold">empecé</span></li>
    <li>3ᵉ pers. des verbes dont le radical finit par une voyelle : <strong>i → y</strong> : caer → <span class="text-green-700 font-bold">cayó, cayeron</span> · oír → <span class="text-green-700 font-bold">oyó</span> · leer → <span class="text-green-700 font-bold">leyó</span></li>
    <li>radical en <strong>-ñ / -ll</strong> : perte du i : gruñir → <span class="text-green-700 font-bold">gruñó</span> · bullir → <span class="text-green-700 font-bold">bulló</span> · reír → <span class="text-green-700 font-bold">rió, rieron</span></li>
  </ul>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">💪 3. Les prétérits forts (irréguliers)</h3>
  <p class="mb-3">Radical spécial + terminaisons <span class="text-blue-600 font-extrabold">-e, -iste, -o, -imos, -isteis, -ieron</span>... et <strong>SANS accent écrit</strong> aux 1ʳᵉ/3ᵉ personnes :</p>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-2 not-prose mb-3 text-center text-sm">
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">andar → <span class="text-violet-600 font-extrabold">anduve</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">estar → <span class="text-violet-600 font-extrabold">estuve</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">tener → <span class="text-violet-600 font-extrabold">tuve</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">haber → <span class="text-violet-600 font-extrabold">hube</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">poder → <span class="text-violet-600 font-extrabold">pude</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">poner → <span class="text-violet-600 font-extrabold">puse</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">saber → <span class="text-violet-600 font-extrabold">supe</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">querer → <span class="text-violet-600 font-extrabold">quise</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">venir → <span class="text-violet-600 font-extrabold">vine</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">hacer → <span class="text-violet-600 font-extrabold">hice, hizo</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">decir → <span class="text-violet-600 font-extrabold">dije</span></div>
    <div class="p-2 bg-violet-50 border-2 border-violet-300 rounded-xl">conducir → <span class="text-violet-600 font-extrabold">conduje</span></div>
  </div>
  <ul class="list-disc list-inside space-y-1 mb-3 text-sm">
    <li><strong>ir et ser ont le MÊME passé simple :</strong> <span class="text-green-700 font-bold">fui, fuiste, fue, fuimos, fuisteis, fueron</span></li>
    <li>dar : <span class="text-green-700 font-bold">di, diste, dio...</span> (sans accent)</li>
    <li>affaiblissement à la 3ᵉ pers. : pedir → <span class="text-green-700 font-bold">pidió, pidieron</span> · dormir → <span class="text-green-700 font-bold">durmió, durmieron</span></li>
    <li>-uir : construir → <span class="text-green-700 font-bold">construyó</span> · verbes en -cir → <strong>j</strong> partout : <span class="text-green-700 font-bold">conduje, condujeron</span> (sans i !)</li>
  </ul>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🎯 4. Emploi</h3>
  <ul class="list-disc list-inside space-y-1 mb-3">
    <li><strong>Action achevée, sans lien avec le présent :</strong> <span class="text-green-700">Ayer <strong>fui</strong> al teatro.</span> (Hier, je suis allé au théâtre.)</li>
    <li><strong>Antériorité dans une subordonnée :</strong> <span class="text-green-700">En cuanto <strong>terminó</strong>, se fue.</span> (Dès qu'il eut terminé, il sortit.)</li>
  </ul>
  <p class="mb-2 text-sm">Le <strong>passé antérieur</strong> (hube + participe : <span class="text-green-700">Cuando hubo acabado, se fue</span>) est rare dans la langue courante.</p>
`;

export const GERUNDIO_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">🏃 1. Formation du gérondif</h3>
  <p class="mb-3">Le gérondif espagnol correspond au participe présent / « en + -ant » français. Il est <strong>invariable</strong> :</p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-4">
    <div class="p-4 bg-sky-50 border-2 border-sky-300 rounded-2xl text-center">
      <h4 class="font-extrabold text-sky-700 mb-1">-AR → <span class="text-blue-600">-ANDO</span></h4>
      <p class="text-sm">cantar → <span class="text-green-700 font-bold">cant<span class="text-blue-600 font-extrabold">ando</span></span> · hablar → <span class="text-green-700 font-bold">habl<span class="text-blue-600 font-extrabold">ando</span></span></p>
    </div>
    <div class="p-4 bg-green-50 border-2 border-green-300 rounded-2xl text-center">
      <h4 class="font-extrabold text-green-700 mb-1">-ER / -IR → <span class="text-blue-600">-IENDO</span></h4>
      <p class="text-sm">comer → <span class="text-green-700 font-bold">com<span class="text-blue-600 font-extrabold">iendo</span></span> · vivir → <span class="text-green-700 font-bold">viv<span class="text-blue-600 font-extrabold">iendo</span></span></p>
    </div>
  </div>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🧪 2. Les irréguliers</h3>
  <ul class="list-disc list-inside space-y-1 mb-3 text-sm">
    <li><strong>i → y</strong> entre voyelles : caer → <span class="text-violet-600 font-extrabold">cayendo</span> · leer → <span class="text-violet-600 font-extrabold">leyendo</span> · oír → <span class="text-violet-600 font-extrabold">oyendo</span> · construir → <span class="text-violet-600 font-extrabold">construyendo</span> · ir → <span class="text-violet-600 font-extrabold">yendo</span></li>
    <li><strong>e → i</strong> (type pedir/sentir) : pedir → <span class="text-violet-600 font-extrabold">pidiendo</span> · sentir → <span class="text-violet-600 font-extrabold">sintiendo</span> · decir → <span class="text-violet-600 font-extrabold">diciendo</span> · venir → <span class="text-violet-600 font-extrabold">viniendo</span> · reír → <span class="text-violet-600 font-extrabold">riendo</span> (un seul i !)</li>
    <li><strong>o → u</strong> : dormir → <span class="text-violet-600 font-extrabold">durmiendo</span> · morir → <span class="text-violet-600 font-extrabold">muriendo</span> · poder → <span class="text-violet-600 font-extrabold">pudiendo</span></li>
    <li>radical en -ll / -ñ : perte du i : bullir → <span class="text-violet-600 font-extrabold">bullendo</span> · gruñir → <span class="text-violet-600 font-extrabold">gruñendo</span></li>
  </ul>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🎯 3. Les valeurs du gérondif</h3>
  <ul class="list-disc list-inside space-y-2 mb-4">
    <li><strong>La manière :</strong> <span class="text-green-700">Entró en la universidad <strong>corriendo</strong>.</span> (Il entra en courant.)</li>
    <li><strong>La durée / simultanéité :</strong> <span class="text-green-700"><strong>Viendo</strong> la televisión, se dio cuenta del drama.</span></li>
    <li><strong>La cause :</strong> <span class="text-green-700">No <strong>hallando</strong> su llave, no pudo cerrar.</span></li>
    <li><strong>La condition :</strong> <span class="text-green-700"><strong>Siendo</strong> trabajador, encontrará un empleo.</span></li>
  </ul>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">⏳ 4. Estar + gérondif : l'action en direct</h3>
  <p class="mb-3">La périphrase <strong>estar + gérondif</strong> = « être en train de » : <span class="text-green-700 font-bold">Estoy comiendo.</span> (Je suis en train de manger.) · <span class="text-green-700 font-bold">Estaba lloviendo.</span> (Il était en train de pleuvoir.)</p>
  <p class="mb-3 text-sm">Autres semi-auxiliaires : <span class="text-green-700 font-semibold">seguir + gérondif</span> (continuer à), <span class="text-green-700 font-semibold">ir + gérondif</span> (petit à petit), <span class="text-green-700 font-semibold">llevar + durée + gérondif</span>.</p>

  ${garguiTip('quand NE PAS employer le gérondif', `
    Si le français « -ant » exprime une <strong>qualité/un état</strong> (et non une action), l'espagnol emploie
    une relative avec <strong>que</strong> : « une fenêtre donnant sur la mer » →
    <span class="text-green-700 font-bold">una ventana <u>que daba</u> al mar</span>,
    pas <span class="text-red-500 line-through">una ventana dando al mar</span> ! 🪟
  `)}
`;
