// Théorie de grammaire espagnole, version "hyper expliquée" et colorée.
// Code couleur commun à tous les chapitres :
//   rose  = syllabe tonique / accent écrit
//   bleu  = terminaisons
//   violet = irrégularités (radical modifié)
//   vert  = exemples corrects
//   rouge = erreurs à éviter

const chispaTip = (title: string, body: string) => `
  <div class="my-5 p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl not-prose">
    <p class="font-extrabold text-amber-700 mb-1">🐲 Astuce de Chispa — ${title}</p>
    <div class="text-sm text-amber-900 leading-relaxed">${body}</div>
  </div>
`;

export const ORTHOGRAPHE_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">🗣️ 1. L'accent tonique : la base de tout</h3>
  <p class="mb-3">En espagnol, <strong>chaque mot</strong> de plus d'une syllabe possède un <strong>accent tonique</strong> : une syllabe prononcée plus fort que les autres. Parfois (et seulement parfois !), cet accent est <em>écrit</em> avec le signe <span class="text-rose-600 font-extrabold">´</span>, appelé <em>tilde</em>. Savoir où tombe l'accent tonique, c'est la clé pour savoir s'il faut l'écrire.</p>
  <p class="mb-3">Dans tous les exemples, la <span class="text-rose-600 font-extrabold">syllabe tonique est en rose</span> :</p>
  <p class="mb-3 text-lg">ca-<span class="text-rose-600 font-extrabold">sa</span> · co-<span class="text-rose-600 font-extrabold">mer</span> · <span class="text-rose-600 font-extrabold">mú</span>-si-ca · can-<span class="text-rose-600 font-extrabold">ción</span></p>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">✂️ 2. Découper en syllabes : diphtongue et hiatus</h3>
  <p class="mb-3">Pour appliquer les règles d'accentuation, il faut savoir découper un mot en syllabes. Principe de base : <strong>une voyelle = une syllabe</strong>. Mais que faire quand deux voyelles se touchent ? Tout dépend de leur force :</p>
  <ul class="list-disc list-inside mb-3 space-y-1">
    <li>Voyelles <strong>fortes</strong> : <span class="text-blue-600 font-bold">a, e, o</span></li>
    <li>Voyelles <strong>faibles</strong> : <span class="text-violet-600 font-bold">i, u</span></li>
  </ul>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-4">
    <div class="p-4 bg-green-50 border-2 border-green-300 rounded-2xl">
      <h4 class="font-extrabold text-green-700 mb-2">💚 DIPHTONGUE = 1 seule syllabe</h4>
      <p class="text-sm mb-2">Forte + faible <em>non accentuée</em>, ou deux faibles :</p>
      <ul class="text-sm space-y-1">
        <li>p<span class="text-rose-600 font-extrabold">ia</span>-no <em>(ia ensemble)</em></li>
        <li>f<span class="text-rose-600 font-extrabold">ue</span>-go <em>(ue ensemble)</em></li>
        <li>c<span class="text-rose-600 font-extrabold">iu</span>-dad <em>(deux faibles : iu ensemble)</em></li>
        <li>p<span class="text-rose-600 font-extrabold">ai</span>-sa-je</li>
      </ul>
    </div>
    <div class="p-4 bg-violet-50 border-2 border-violet-300 rounded-2xl">
      <h4 class="font-extrabold text-violet-700 mb-2">💜 HIATUS = 2 syllabes séparées</h4>
      <p class="text-sm mb-2">Deux fortes ensemble, ou forte + faible <em>accentuée</em> :</p>
      <ul class="text-sm space-y-1">
        <li>te-<span class="text-rose-600 font-extrabold">a</span>-tro <em>(e + a : deux fortes)</em></li>
        <li>po-<span class="text-rose-600 font-extrabold">e</span>-ta</li>
        <li>Ma-<span class="text-rose-600 font-extrabold">rí</span>-a <em>(í accentué casse la diphtongue)</em></li>
        <li>ba-<span class="text-rose-600 font-extrabold">úl</span> · <span class="text-rose-600 font-extrabold">dí</span>-a</li>
      </ul>
    </div>
  </div>

  ${chispaTip('casser une diphtongue', `
    La question magique : <strong>« Où tombe l'accent tonique ? »</strong> Si la prononciation exige
    d'accentuer la voyelle <strong>faible</strong> (i, u) à côté d'une forte, on « casse » la diphtongue :
    c'est un hiatus, et on <strong>doit toujours écrire l'accent</strong>, même si les règles générales disent le contraire. Règle prioritaire !<br><br>
    Exemple : <em>alegría</em>. Sans accent on lirait <span class="text-red-500 line-through">a-le-gria</span> (3 syllabes).
    Mais on prononce a-le-<span class="text-rose-600 font-extrabold">grí</span>-a : le « i » tonique casse la diphtongue
    → on écrit <span class="text-green-700 font-bold">alegría</span> ✔. Pareil pour <span class="text-green-700 font-bold">día, país, baúl, río, María</span>.
  `)}

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">📏 3. Les 3 règles d'or de l'accent écrit</h3>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mb-4">
    <div class="p-4 bg-sky-50 border-2 border-sky-300 rounded-2xl">
      <h4 class="font-extrabold text-sky-700">1️⃣ AGUDAS</h4>
      <p class="text-xs font-bold text-sky-600 uppercase mb-2">Tonique sur la DERNIÈRE syllabe</p>
      <p class="text-sm mb-2">Accent écrit si le mot finit par <span class="text-blue-600 font-extrabold">-n, -s ou voyelle</span>.</p>
      <p class="text-sm"><span class="text-green-700 font-bold">✔ avec accent :</span> can-<span class="text-rose-600 font-extrabold">ción</span>, so-<span class="text-rose-600 font-extrabold">fá</span>, qui-<span class="text-rose-600 font-extrabold">zás</span></p>
      <p class="text-sm"><span class="text-green-700 font-bold">✔ sans accent :</span> can-<span class="text-rose-600 font-extrabold">tar</span> (finit en -r), ver-<span class="text-rose-600 font-extrabold">dad</span> (finit en -d)</p>
    </div>
    <div class="p-4 bg-green-50 border-2 border-green-300 rounded-2xl">
      <h4 class="font-extrabold text-green-700">2️⃣ LLANAS (graves)</h4>
      <p class="text-xs font-bold text-green-600 uppercase mb-2">Tonique sur l'AVANT-DERNIÈRE syllabe</p>
      <p class="text-sm mb-2">Le cas le plus fréquent ! Accent écrit si le mot ne finit <strong>PAS</strong> par <span class="text-blue-600 font-extrabold">-n, -s ou voyelle</span> (règle inverse des agudas).</p>
      <p class="text-sm"><span class="text-green-700 font-bold">✔ avec accent :</span> <span class="text-rose-600 font-extrabold">ár</span>-bol, <span class="text-rose-600 font-extrabold">fá</span>-cil, <span class="text-rose-600 font-extrabold">lá</span>-piz</p>
      <p class="text-sm"><span class="text-green-700 font-bold">✔ sans accent :</span> pro-<span class="text-rose-600 font-extrabold">ble</span>-ma, <span class="text-rose-600 font-extrabold">can</span>-tas</p>
    </div>
    <div class="p-4 bg-violet-50 border-2 border-violet-300 rounded-2xl">
      <h4 class="font-extrabold text-violet-700">3️⃣ ESDRÚJULAS</h4>
      <p class="text-xs font-bold text-violet-600 uppercase mb-2">Tonique sur l'ANTÉPÉNULTIÈME (ou avant)</p>
      <p class="text-sm mb-2">Règle ultra simple : accent écrit <strong>TOUJOURS</strong>, sans exception. 🎉</p>
      <p class="text-sm"><span class="text-green-700 font-bold">✔</span> <span class="text-rose-600 font-extrabold">mú</span>-si-ca, te-<span class="text-rose-600 font-extrabold">lé</span>-fo-no, <span class="text-rose-600 font-extrabold">pá</span>-gi-na, <span class="text-rose-600 font-extrabold">dí</span>-ga-me-lo <em>(sobresdrújula)</em></p>
    </div>
  </div>

  ${chispaTip('le réflexe en 3 questions', `
    1️⃣ Je prononce le mot : où est la syllabe forte ?<br>
    2️⃣ Aguda, llana ou esdrújula ?<br>
    3️⃣ J'applique la règle : <strong>esdrújula → toujours</strong> ; <strong>aguda → accent si -n/-s/voyelle</strong> ;
    <strong>llana → accent si AUTRE chose que -n/-s/voyelle</strong>. C'est tout !
  `)}

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">👯 4. Les accents diacritiques : différencier les jumeaux</h3>
  <p class="mb-3">Certains petits mots s'écrivent pareil mais n'ont pas la même fonction. L'accent écrit sert alors à les <strong>distinguer</strong> (et non à marquer une syllabe inhabituelle) :</p>
  <table class="w-full text-left border-collapse mt-2 text-sm">
    <thead>
      <tr><th class="border p-2 bg-slate-100 font-extrabold">Sans accent (atone)</th><th class="border p-2 bg-rose-50 font-extrabold text-rose-700">Avec accent (tonique)</th></tr>
    </thead>
    <tbody>
      <tr><td class="border p-2"><strong>el</strong> = le (article) · <em class="text-green-700">el perro</em></td><td class="border p-2"><strong class="text-rose-600">él</strong> = il, lui (pronom) · <em class="text-green-700">es para él</em></td></tr>
      <tr><td class="border p-2"><strong>tu</strong> = ton, ta (possessif) · <em class="text-green-700">tu casa</em></td><td class="border p-2"><strong class="text-rose-600">tú</strong> = tu, toi (pronom) · <em class="text-green-700">tú hablas</em></td></tr>
      <tr><td class="border p-2"><strong>mi</strong> = mon, ma (possessif) · <em class="text-green-700">mi libro</em></td><td class="border p-2"><strong class="text-rose-600">mí</strong> = moi (après préposition) · <em class="text-green-700">a mí me gusta</em></td></tr>
      <tr><td class="border p-2"><strong>si</strong> = si (condition) · <em class="text-green-700">si llueve...</em></td><td class="border p-2"><strong class="text-rose-600">sí</strong> = oui / soi · <em class="text-green-700">sí, quiero · piensa en sí mismo</em></td></tr>
      <tr><td class="border p-2"><strong>te</strong> = te, t' (pronom) · <em class="text-green-700">te llamo</em></td><td class="border p-2"><strong class="text-rose-600">té</strong> = le thé · <em class="text-green-700">quiero un té</em></td></tr>
      <tr><td class="border p-2"><strong>mas</strong> = mais (littéraire) · <em class="text-green-700">es bueno, mas caro</em></td><td class="border p-2"><strong class="text-rose-600">más</strong> = plus · <em class="text-green-700">quiero más</em></td></tr>
      <tr><td class="border p-2"><strong>se</strong> = se (réfléchi) · <em class="text-green-700">se levanta</em></td><td class="border p-2"><strong class="text-rose-600">sé</strong> = je sais / sois ! · <em class="text-green-700">yo sé · sé amable</em></td></tr>
      <tr><td class="border p-2"><strong>de</strong> = de (préposition) · <em class="text-green-700">libro de español</em></td><td class="border p-2"><strong class="text-rose-600">dé</strong> = donne (subj. de dar) · <em class="text-green-700">espero que me lo dé</em></td></tr>
    </tbody>
  </table>

  <h4 class="font-extrabold text-slate-800 mt-5 mb-2">❓ Les interrogatifs et exclamatifs prennent l'accent</h4>
  <p class="mb-2">Dans une question ou une exclamation (directe <em>ou indirecte</em>), les mots interrogatifs portent toujours un accent écrit :</p>
  <p class="mb-2 text-lg"><span class="text-rose-600 font-extrabold">qué · quién · cómo · cuándo · dónde · cuánto · por qué</span></p>
  <ul class="list-disc list-inside space-y-1 text-sm mb-3">
    <li><span class="text-green-700 font-semibold">¿<strong>Dónde</strong> vives?</span> (Où habites-tu ?) — mais : <span class="text-green-700 font-semibold">la casa <strong>donde</strong> vivo</span> (relatif, sans accent)</li>
    <li><span class="text-green-700 font-semibold">No sé <strong>cuándo</strong> llega.</span> (question indirecte → accent quand même !)</li>
    <li><span class="text-green-700 font-semibold">¡<strong>Qué</strong> bonito!</span> (Que c'est beau !)</li>
  </ul>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🔤 5. Règles orthographiques : les sons qui changent d'habit</h3>
  <p class="mb-3">Certains sons s'écrivent différemment selon la voyelle qui suit. Le secret : regarder la <span class="text-blue-600 font-bold">voyelle suivante</span>.</p>
  <table class="w-full text-left border-collapse mt-2 text-sm not-prose">
    <thead>
      <tr><th class="border p-2 bg-slate-100 font-extrabold">Son</th><th class="border p-2 bg-slate-100 font-extrabold">devant a, o, u</th><th class="border p-2 bg-slate-100 font-extrabold">devant e, i</th><th class="border p-2 bg-slate-100 font-extrabold">Exemples</th></tr>
    </thead>
    <tbody>
      <tr><td class="border p-2 font-bold">[k]</td><td class="border p-2"><span class="text-blue-600 font-extrabold">c</span></td><td class="border p-2"><span class="text-violet-600 font-extrabold">qu</span> (u muet)</td><td class="border p-2"><span class="text-green-700">casa, cosa, cuna · queso, quitar</span></td></tr>
      <tr><td class="border p-2 font-bold">[θ] (« th »)</td><td class="border p-2"><span class="text-blue-600 font-extrabold">z</span></td><td class="border p-2"><span class="text-violet-600 font-extrabold">c</span></td><td class="border p-2"><span class="text-green-700">zapato, pozo, zumo · cielo, cena</span></td></tr>
      <tr><td class="border p-2 font-bold">[g] doux</td><td class="border p-2"><span class="text-blue-600 font-extrabold">g</span></td><td class="border p-2"><span class="text-violet-600 font-extrabold">gu</span> (u muet) · <span class="text-rose-600 font-extrabold">gü</span> (u prononcé)</td><td class="border p-2"><span class="text-green-700">gato, gota · guerra, guitarra · pingüino, vergüenza</span></td></tr>
      <tr><td class="border p-2 font-bold">[x] (jota)</td><td class="border p-2"><span class="text-blue-600 font-extrabold">j</span></td><td class="border p-2"><span class="text-violet-600 font-extrabold">g ou j</span> (à mémoriser)</td><td class="border p-2"><span class="text-green-700">jamón, joven, jugo · gente, jefe</span></td></tr>
    </tbody>
  </table>

  ${chispaTip('le tréma magique ü', `
    Dans <em>gue / gui</em>, le « u » est <strong>muet</strong> : <span class="text-green-700 font-bold">guitarra</span> se dit « gui-tarra ».
    Pour <strong>entendre</strong> le « u », on lui met deux petits points : <span class="text-rose-600 font-extrabold">gü</span> →
    <span class="text-green-700 font-bold">pingüino</span> (pin-gou-i-no), <span class="text-green-700 font-bold">vergüenza, lingüista</span>.
    Sans tréma, ce serait <span class="text-red-500 line-through">pinguino</span> prononcé « pin-gui-no » ! 🐧
  `)}
`;

export const PRESENTE_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">🎯 1. À quoi sert le présent de l'indicatif ?</h3>
  <p class="mb-3">Le <em>presente de indicativo</em> est le temps le plus utilisé de l'espagnol. Il exprime :</p>
  <ul class="list-disc list-inside space-y-2 mb-4">
    <li><strong>Les habitudes :</strong> <span class="text-green-700">Todos los días <strong>voy</strong> al trabajo en autobús.</span> (Tous les jours, je vais au travail en bus.)</li>
    <li><strong>Les vérités générales :</strong> <span class="text-green-700">La Tierra <strong>gira</strong> alrededor del Sol.</span></li>
    <li><strong>Ce qui se passe maintenant :</strong> <span class="text-green-700">Ahora mismo <strong>leo</strong> un libro.</span></li>
    <li><strong>Le futur proche (très courant !) :</strong> <span class="text-green-700">Mañana <strong>tengo</strong> un examen.</span> (Demain, j'ai un examen.)</li>
    <li><strong>Un ordre :</strong> <span class="text-green-700">Tú <strong>te quedas</strong> aquí.</span> (Toi, tu restes ici.)</li>
  </ul>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🧱 2. Les verbes réguliers : radical + terminaison</h3>
  <p class="mb-3">On enlève la terminaison de l'infinitif (<span class="text-blue-600 font-extrabold">-ar, -er, -ir</span>) et on ajoute les <span class="text-blue-600 font-bold">terminaisons en bleu</span> :</p>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mb-4">
    <div class="p-4 bg-sky-50 border-2 border-sky-300 rounded-2xl">
      <h4 class="font-extrabold text-sky-700 text-center mb-2">-AR · hablar</h4>
      <ul class="text-sm space-y-1">
        <li>yo habl<span class="text-blue-600 font-extrabold">o</span></li>
        <li>tú habl<span class="text-blue-600 font-extrabold">as</span></li>
        <li>él/ella/usted habl<span class="text-blue-600 font-extrabold">a</span></li>
        <li>nosotros habl<span class="text-blue-600 font-extrabold">amos</span></li>
        <li>vosotros habl<span class="text-blue-600 font-extrabold">áis</span></li>
        <li>ellos/ustedes habl<span class="text-blue-600 font-extrabold">an</span></li>
      </ul>
    </div>
    <div class="p-4 bg-green-50 border-2 border-green-300 rounded-2xl">
      <h4 class="font-extrabold text-green-700 text-center mb-2">-ER · comer</h4>
      <ul class="text-sm space-y-1">
        <li>yo com<span class="text-blue-600 font-extrabold">o</span></li>
        <li>tú com<span class="text-blue-600 font-extrabold">es</span></li>
        <li>él/ella/usted com<span class="text-blue-600 font-extrabold">e</span></li>
        <li>nosotros com<span class="text-blue-600 font-extrabold">emos</span></li>
        <li>vosotros com<span class="text-blue-600 font-extrabold">éis</span></li>
        <li>ellos/ustedes com<span class="text-blue-600 font-extrabold">en</span></li>
      </ul>
    </div>
    <div class="p-4 bg-violet-50 border-2 border-violet-300 rounded-2xl">
      <h4 class="font-extrabold text-violet-700 text-center mb-2">-IR · vivir</h4>
      <ul class="text-sm space-y-1">
        <li>yo viv<span class="text-blue-600 font-extrabold">o</span></li>
        <li>tú viv<span class="text-blue-600 font-extrabold">es</span></li>
        <li>él/ella/usted viv<span class="text-blue-600 font-extrabold">e</span></li>
        <li>nosotros viv<span class="text-blue-600 font-extrabold">imos</span></li>
        <li>vosotros viv<span class="text-blue-600 font-extrabold">ís</span></li>
        <li>ellos/ustedes viv<span class="text-blue-600 font-extrabold">en</span></li>
      </ul>
    </div>
  </div>

  ${chispaTip('-ER et -IR sont presque jumeaux', `
    Les terminaisons de <strong>-ER</strong> et <strong>-IR</strong> sont identiques sauf à
    <strong>nosotros</strong> (com<span class="text-blue-600 font-bold">emos</span> / viv<span class="text-blue-600 font-bold">imos</span>)
    et <strong>vosotros</strong> (com<span class="text-blue-600 font-bold">éis</span> / viv<span class="text-blue-600 font-bold">ís</span>).
    Tu n'as donc que 2 différences à retenir ! 😎
  `)}

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🥾 3. Les verbes à diphtongue : les « verbes en botte »</h3>
  <p class="mb-3">Beaucoup de verbes changent leur <span class="text-violet-600 font-bold">voyelle du radical</span> à toutes les personnes <strong>sauf nosotros et vosotros</strong>. Si tu entoures les formes modifiées dans le tableau, le dessin forme... une <strong>botte</strong> 🥾 (comme celle du Chat Potté !).</p>
  <ul class="list-disc list-inside space-y-2 mb-3">
    <li><strong>e → <span class="text-violet-600 font-extrabold">ie</span></strong> (pensar, querer, empezar) : <span class="text-green-700">p<span class="text-violet-600 font-extrabold">ie</span>nso, p<span class="text-violet-600 font-extrabold">ie</span>nsas, p<span class="text-violet-600 font-extrabold">ie</span>nsa, <u>pensamos, pensáis</u>, p<span class="text-violet-600 font-extrabold">ie</span>nsan</span></li>
    <li><strong>o → <span class="text-violet-600 font-extrabold">ue</span></strong> (poder, dormir, encontrar) : <span class="text-green-700">p<span class="text-violet-600 font-extrabold">ue</span>do, p<span class="text-violet-600 font-extrabold">ue</span>des, p<span class="text-violet-600 font-extrabold">ue</span>de, <u>podemos, podéis</u>, p<span class="text-violet-600 font-extrabold">ue</span>den</span></li>
    <li><strong>e → <span class="text-violet-600 font-extrabold">i</span></strong> (affaiblissement : pedir, seguir, servir) : <span class="text-green-700">p<span class="text-violet-600 font-extrabold">i</span>do, p<span class="text-violet-600 font-extrabold">i</span>des, p<span class="text-violet-600 font-extrabold">i</span>de, <u>pedimos, pedís</u>, p<span class="text-violet-600 font-extrabold">i</span>den</span></li>
    <li><strong>u → <span class="text-violet-600 font-extrabold">ue</span></strong> (jugar, le seul !) : <span class="text-green-700">j<span class="text-violet-600 font-extrabold">ue</span>go, j<span class="text-violet-600 font-extrabold">ue</span>gas, j<span class="text-violet-600 font-extrabold">ue</span>ga, <u>jugamos, jugáis</u>, j<span class="text-violet-600 font-extrabold">ue</span>gan</span></li>
  </ul>
  <p class="mb-3 text-sm">⚠️ Erreur classique : <span class="text-red-500 line-through">piensamos</span> → c'est <span class="text-green-700 font-bold">pensamos</span> (nosotros sort de la botte !).</p>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🙋 4. Les verbes irréguliers à la 1ʳᵉ personne (yo)</h3>
  <p class="mb-3">Seul le <strong>yo</strong> est bizarre, le reste est (souvent) régulier :</p>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mb-4">
    <div class="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl">
      <h4 class="font-extrabold text-rose-700 mb-2">Les « yo-go » 💪</h4>
      <ul class="text-sm space-y-1">
        <li>hacer → <span class="text-violet-600 font-extrabold">hago</span></li>
        <li>poner → <span class="text-violet-600 font-extrabold">pongo</span></li>
        <li>salir → <span class="text-violet-600 font-extrabold">salgo</span></li>
        <li>decir → <span class="text-violet-600 font-extrabold">digo</span> <em>(+ e→i : dices)</em></li>
        <li>tener → <span class="text-violet-600 font-extrabold">tengo</span> <em>(+ diphtongue : tienes)</em></li>
        <li>venir → <span class="text-violet-600 font-extrabold">vengo</span> <em>(+ diphtongue : vienes)</em></li>
        <li>oír → <span class="text-violet-600 font-extrabold">oigo</span></li>
      </ul>
    </div>
    <div class="p-4 bg-sky-50 border-2 border-sky-300 rounded-2xl">
      <h4 class="font-extrabold text-sky-700 mb-2">Les « -zco » 🦎</h4>
      <p class="text-xs mb-2">Verbes en <span class="text-blue-600 font-bold">-cer / -cir</span> après voyelle :</p>
      <ul class="text-sm space-y-1">
        <li>conocer → <span class="text-violet-600 font-extrabold">conozco</span></li>
        <li>parecer → <span class="text-violet-600 font-extrabold">parezco</span></li>
        <li>conducir → <span class="text-violet-600 font-extrabold">conduzco</span></li>
        <li>traducir → <span class="text-violet-600 font-extrabold">traduzco</span></li>
      </ul>
    </div>
    <div class="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl">
      <h4 class="font-extrabold text-amber-700 mb-2">Les uniques ✨</h4>
      <ul class="text-sm space-y-1">
        <li>dar → <span class="text-violet-600 font-extrabold">doy</span></li>
        <li>saber → <span class="text-violet-600 font-extrabold">sé</span></li>
        <li>ver → <span class="text-violet-600 font-extrabold">veo</span></li>
        <li>caber → <span class="text-violet-600 font-extrabold">quepo</span></li>
        <li>traer → <span class="text-violet-600 font-extrabold">traigo</span></li>
      </ul>
    </div>
  </div>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">👑 5. Les 3 rois irréguliers : ser, estar, ir</h3>
  <p class="mb-3">Trois verbes essentiels ont une conjugaison unique, à connaître par cœur :</p>
  <table class="w-full text-left border-collapse mt-2 text-sm">
    <thead>
      <tr class="bg-slate-100"><th class="border p-2 font-extrabold">Pronom</th><th class="border p-2 font-extrabold">Ser (être · essence)</th><th class="border p-2 font-extrabold">Estar (être · état/lieu)</th><th class="border p-2 font-extrabold">Ir (aller)</th></tr>
    </thead>
    <tbody>
      <tr><td class="border p-2">yo</td><td class="border p-2"><span class="text-violet-600 font-extrabold">soy</span></td><td class="border p-2"><span class="text-violet-600 font-extrabold">estoy</span></td><td class="border p-2"><span class="text-violet-600 font-extrabold">voy</span></td></tr>
      <tr><td class="border p-2">tú</td><td class="border p-2"><span class="text-violet-600 font-extrabold">eres</span></td><td class="border p-2">est<span class="text-rose-600 font-extrabold">á</span>s</td><td class="border p-2"><span class="text-violet-600 font-extrabold">vas</span></td></tr>
      <tr><td class="border p-2">él/ella/ud.</td><td class="border p-2"><span class="text-violet-600 font-extrabold">es</span></td><td class="border p-2">est<span class="text-rose-600 font-extrabold">á</span></td><td class="border p-2"><span class="text-violet-600 font-extrabold">va</span></td></tr>
      <tr><td class="border p-2">nosotros/as</td><td class="border p-2"><span class="text-violet-600 font-extrabold">somos</span></td><td class="border p-2">estamos</td><td class="border p-2"><span class="text-violet-600 font-extrabold">vamos</span></td></tr>
      <tr><td class="border p-2">vosotros/as</td><td class="border p-2"><span class="text-violet-600 font-extrabold">sois</span></td><td class="border p-2">est<span class="text-rose-600 font-extrabold">á</span>is</td><td class="border p-2"><span class="text-violet-600 font-extrabold">vais</span></td></tr>
      <tr><td class="border p-2">ellos/uds.</td><td class="border p-2"><span class="text-violet-600 font-extrabold">son</span></td><td class="border p-2">est<span class="text-rose-600 font-extrabold">á</span>n</td><td class="border p-2"><span class="text-violet-600 font-extrabold">van</span></td></tr>
    </tbody>
  </table>

  ${chispaTip('ser ou estar ?', `
    <strong>SER</strong> = ce qu'on <em>est</em> (identité, caractère, origine, profession, heure) :
    <span class="text-green-700 font-bold">Soy francés. Es simpática. Son las dos.</span><br>
    <strong>ESTAR</strong> = comment/où on <em>se trouve</em> (état passager, lieu, humeur) :
    <span class="text-green-700 font-bold">Estoy cansado. Madrid está en España.</span><br>
    Comparez : <span class="text-green-700 font-bold">es aburrido</span> (il est ennuyeux) vs
    <span class="text-green-700 font-bold">está aburrido</span> (il s'ennuie) !
  `)}

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🪞 6. Bonus : les verbes pronominaux</h3>
  <p class="mb-3">Comme en français « se lever », certains verbes s'utilisent avec un pronom réfléchi placé <strong>devant</strong> le verbe conjugué :</p>
  <p class="mb-2"><em>levantarse</em> (se lever) : <span class="text-green-700"><span class="text-blue-600 font-bold">me</span> levanto, <span class="text-blue-600 font-bold">te</span> levantas, <span class="text-blue-600 font-bold">se</span> levanta, <span class="text-blue-600 font-bold">nos</span> levantamos, <span class="text-blue-600 font-bold">os</span> levantáis, <span class="text-blue-600 font-bold">se</span> levantan</span></p>
  <p class="text-sm mb-3">Autres exemples courants : <span class="text-green-700 font-semibold">llamarse</span> (s'appeler), <span class="text-green-700 font-semibold">despertarse</span> (se réveiller, e→ie : <em>me despierto</em>), <span class="text-green-700 font-semibold">acostarse</span> (se coucher, o→ue : <em>me acuesto</em>).</p>
`;

export const SUBJUNTIVO_THEORY = `
  <h3 class="text-xl font-extrabold mb-3 text-slate-800">🌫️ 1. C'est quoi, le subjonctif ?</h3>
  <p class="mb-3">L'<strong>indicatif</strong> décrit la réalité : ce qui est sûr, constaté, objectif. Le <strong>subjonctif</strong> (<em>el subjuntivo</em>), lui, est le mode de la <strong>subjectivité</strong> : souhaits, doutes, émotions, ordres indirects, possibilités... Bref, tout ce qui se passe dans la tête plutôt que dans les faits.</p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-4">
    <div class="p-4 bg-green-50 border-2 border-green-300 rounded-2xl">
      <p class="font-extrabold text-green-700 mb-1">✅ Réalité → INDICATIF</p>
      <p class="text-sm"><span class="text-green-700 font-semibold">Sé que María <strong>viene</strong>.</span><br>(Je sais qu'elle vient : certitude.)</p>
    </div>
    <div class="p-4 bg-violet-50 border-2 border-violet-300 rounded-2xl">
      <p class="font-extrabold text-violet-700 mb-1">💭 Subjectivité → SUBJONCTIF</p>
      <p class="text-sm"><span class="text-green-700 font-semibold">Espero que María <strong class="text-violet-600">venga</strong>.</span><br>(J'espère qu'elle vienne : souhait, pas certitude.)</p>
    </div>
  </div>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🔧 2. Formation : la recette en 3 étapes</h3>
  <ol class="list-decimal list-inside space-y-2 p-4 bg-sky-50 border-2 border-sky-300 rounded-2xl not-prose mb-4">
    <li>Prends la forme <strong>yo</strong> du présent de l'indicatif : hablar → <span class="text-green-700 font-bold">hablo</span> · comer → <span class="text-green-700 font-bold">como</span> · hacer → <span class="text-violet-600 font-bold">hago</span></li>
    <li>Enlève le <span class="text-blue-600 font-extrabold">-o</span> : habl- · com- · hag-</li>
    <li>Ajoute les terminaisons <strong>inversées</strong> :
      <ul class="list-disc list-inside ml-5 mt-1">
        <li>verbes en <strong>-AR</strong> → terminaisons en <span class="text-blue-600 font-extrabold">E</span> : habl<span class="text-blue-600 font-extrabold">e, es, e, emos, éis, en</span></li>
        <li>verbes en <strong>-ER / -IR</strong> → terminaisons en <span class="text-blue-600 font-extrabold">A</span> : com<span class="text-blue-600 font-extrabold">a, as, a, amos, áis, an</span></li>
      </ul>
    </li>
  </ol>
  <p class="mb-3 text-sm">💡 Conséquence géniale : les irrégularités du « yo » de l'indicatif se <strong>propagent à tout le subjonctif</strong> : tengo → <span class="text-violet-600 font-extrabold">tenga, tengas, tenga...</span> · conozco → <span class="text-violet-600 font-extrabold">conozca...</span> · digo → <span class="text-violet-600 font-extrabold">diga...</span></p>

  ${chispaTip("le monde à l'envers 🙃", `
    Au subjonctif, les verbes en -AR parlent comme des -ER, et les -ER/-IR parlent comme des -AR !
    <span class="text-green-700 font-bold">hablas</span> (indicatif) devient <span class="text-violet-600 font-bold">hables</span>,
    et <span class="text-green-700 font-bold">comes</span> devient <span class="text-violet-600 font-bold">comas</span>.
    Si la voyelle te semble « fausse »... c'est sûrement que c'est du subjonctif !
  `)}

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🥾 3. Et les verbes à diphtongue ?</h3>
  <p class="mb-3">Ils gardent leur « botte » au subjonctif : <em>pensar</em> → <span class="text-green-700">p<span class="text-violet-600 font-extrabold">ie</span>nse, p<span class="text-violet-600 font-extrabold">ie</span>nses, p<span class="text-violet-600 font-extrabold">ie</span>nse, <u>pensemos, penséis</u>, p<span class="text-violet-600 font-extrabold">ie</span>nsen</span>.</p>
  <p class="mb-3 text-sm">⚠️ Particularité des verbes en <strong>-IR</strong> (dormir, sentir, pedir) : nosotros/vosotros changent AUSSI, mais autrement : <em>dormir</em> → <span class="text-green-700">duerma, duermas, duerma, <span class="text-violet-600 font-extrabold">durmamos, durmáis</span>, duerman</span> · <em>pedir</em> → <span class="text-green-700">pida, pidas, pida, <span class="text-violet-600 font-extrabold">pidamos, pidáis</span>, pidan</span>.</p>

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">⭐ 4. Les 6 grands irréguliers à mémoriser</h3>
  <table class="w-full text-left border-collapse mt-2 text-sm">
    <thead>
      <tr class="bg-slate-100"><th class="border p-2 font-extrabold">Verbe</th><th class="border p-2 font-extrabold">yo</th><th class="border p-2 font-extrabold">tú</th><th class="border p-2 font-extrabold">él/ella</th><th class="border p-2 font-extrabold">nosotros</th><th class="border p-2 font-extrabold">vosotros</th><th class="border p-2 font-extrabold">ellos</th></tr>
    </thead>
    <tbody>
      <tr><td class="border p-2"><strong>Dar</strong> (donner)</td><td class="border p-2"><span class="text-violet-600 font-bold">dé</span></td><td class="border p-2">des</td><td class="border p-2"><span class="text-violet-600 font-bold">dé</span></td><td class="border p-2">demos</td><td class="border p-2">deis</td><td class="border p-2">den</td></tr>
      <tr><td class="border p-2"><strong>Ir</strong> (aller)</td><td class="border p-2"><span class="text-violet-600 font-bold">vaya</span></td><td class="border p-2">vayas</td><td class="border p-2">vaya</td><td class="border p-2">vayamos</td><td class="border p-2">vayáis</td><td class="border p-2">vayan</td></tr>
      <tr><td class="border p-2"><strong>Ser</strong> (être)</td><td class="border p-2"><span class="text-violet-600 font-bold">sea</span></td><td class="border p-2">seas</td><td class="border p-2">sea</td><td class="border p-2">seamos</td><td class="border p-2">seáis</td><td class="border p-2">sean</td></tr>
      <tr><td class="border p-2"><strong>Haber</strong> (aux. avoir)</td><td class="border p-2"><span class="text-violet-600 font-bold">haya</span></td><td class="border p-2">hayas</td><td class="border p-2">haya</td><td class="border p-2">hayamos</td><td class="border p-2">hayáis</td><td class="border p-2">hayan</td></tr>
      <tr><td class="border p-2"><strong>Estar</strong> (être)</td><td class="border p-2"><span class="text-violet-600 font-bold">esté</span></td><td class="border p-2">estés</td><td class="border p-2">esté</td><td class="border p-2">estemos</td><td class="border p-2">estéis</td><td class="border p-2">estén</td></tr>
      <tr><td class="border p-2"><strong>Saber</strong> (savoir)</td><td class="border p-2"><span class="text-violet-600 font-bold">sepa</span></td><td class="border p-2">sepas</td><td class="border p-2">sepa</td><td class="border p-2">sepamos</td><td class="border p-2">sepáis</td><td class="border p-2">sepan</td></tr>
    </tbody>
  </table>

  ${chispaTip('le truc « DISHES » 🍽️', `
    Pour retenir les 6 irréguliers : <strong>D</strong>ar, <strong>I</strong>r, <strong>S</strong>er,
    <strong>H</strong>aber, <strong>E</strong>star, <strong>S</strong>aber = <strong>« DISHES »</strong>
    (la vaisselle en anglais). Quand tu fais la vaisselle, pense à moi ! 🐲
  `)}

  <h3 class="text-xl font-extrabold mt-7 mb-3 text-slate-800">🚦 5. Quand l'utiliser ? Les déclencheurs</h3>
  <p class="mb-3">Le subjonctif est presque toujours déclenché par la proposition principale, selon le schéma : <strong>[déclencheur] + <span class="text-rose-600 font-extrabold">que</span> + [subjonctif]</strong>.</p>
  <div class="space-y-4 not-prose">
    <div class="p-4 bg-green-50 border-2 border-green-300 rounded-2xl">
      <h4 class="font-extrabold text-green-700">1. Souhait, volonté, ordre, conseil 🙏</h4>
      <p class="text-sm mb-1"><em>querer, desear, preferir, necesitar, pedir, aconsejar, esperar...</em></p>
      <p class="text-sm"><span class="text-green-700 font-semibold"><strong>Quiero que</strong> tú <span class="text-violet-600 font-extrabold">hables</span> con él.</span> (Je veux que tu parles avec lui.)</p>
      <p class="text-sm"><span class="text-green-700 font-semibold">Te <strong>pido que</strong> <span class="text-violet-600 font-extrabold">vengas</span> pronto.</span> (Je te demande de venir vite.)</p>
      <p class="text-sm mt-1"><span class="text-green-700 font-semibold"><strong>¡Ojalá</strong> <span class="text-violet-600 font-extrabold">llueva</span> café!</span> — <em>ojalá</em> (« pourvu que », hérité de l'arabe <em>in shā' Allāh</em>) est TOUJOURS suivi du subjonctif.</p>
    </div>
    <div class="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl">
      <h4 class="font-extrabold text-rose-700">2. Sentiments et émotions 💗</h4>
      <p class="text-sm mb-1"><em>gustar, encantar, alegrarse de, sentir, tener miedo de...</em></p>
      <p class="text-sm"><span class="text-green-700 font-semibold"><strong>Me alegro de que</strong> <span class="text-violet-600 font-extrabold">estés</span> aquí.</span> (Je suis content que tu sois là.)</p>
      <p class="text-sm"><span class="text-green-700 font-semibold"><strong>Siento que</strong> no <span class="text-violet-600 font-extrabold">puedas</span> venir.</span> (Je regrette que tu ne puisses pas venir.)</p>
    </div>
    <div class="p-4 bg-violet-50 border-2 border-violet-300 rounded-2xl">
      <h4 class="font-extrabold text-violet-700">3. Doute et négation de la réalité 🤔</h4>
      <p class="text-sm mb-1"><em>dudar, no creer, no pensar, negar...</em></p>
      <p class="text-sm"><span class="text-green-700 font-semibold"><strong>Dudo que</strong> él <span class="text-violet-600 font-extrabold">diga</span> la verdad.</span> · <span class="text-green-700 font-semibold"><strong>No creo que</strong> <span class="text-violet-600 font-extrabold">llueva</span> mañana.</span></p>
      <p class="text-sm mt-2 p-2 bg-white rounded-lg">⚠️ <strong>Piège n°1 du subjonctif :</strong> affirmatif = indicatif, négatif = subjonctif !<br>
      <span class="text-green-700 font-semibold">Creo que <strong>es</strong> verdad</span> ✔ (indicatif) mais
      <span class="text-green-700 font-semibold">No creo que <span class="text-violet-600 font-extrabold">sea</span> verdad</span> ✔ (subjonctif).<br>
      <span class="text-red-500 line-through">No creo que es verdad</span> ✘</p>
    </div>
    <div class="p-4 bg-sky-50 border-2 border-sky-300 rounded-2xl">
      <h4 class="font-extrabold text-sky-700">4. Expressions impersonnelles ⚖️</h4>
      <p class="text-sm mb-1"><em>es importante que, es necesario que, es posible que, es una lástima que...</em></p>
      <p class="text-sm"><span class="text-green-700 font-semibold"><strong>Es necesario que</strong> <span class="text-violet-600 font-extrabold">estudiemos</span> más.</span> · <span class="text-green-700 font-semibold"><strong>Es posible que</strong> <span class="text-violet-600 font-extrabold">lleguen</span> tarde.</span></p>
      <p class="text-sm mt-1">Mais certitude → indicatif : <span class="text-green-700 font-semibold">Es verdad que <strong>tienes</strong> razón.</span></p>
    </div>
    <div class="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl">
      <h4 class="font-extrabold text-amber-700">5. Après certaines conjonctions 🔗</h4>
      <p class="text-sm mb-1">But : <em>para que</em> · condition : <em>a condición de que</em> · temps futur : <em>cuando, en cuanto...</em></p>
      <p class="text-sm"><span class="text-green-700 font-semibold">Te lo explico <strong>para que</strong> lo <span class="text-violet-600 font-extrabold">entiendas</span>.</span> (...pour que tu comprennes.)</p>
      <p class="text-sm"><span class="text-green-700 font-semibold">Llámame <strong>cuando</strong> <span class="text-violet-600 font-extrabold">llegues</span> a casa.</span> (action future → subjonctif !)</p>
      <p class="text-sm mt-1">Comparez : <span class="text-green-700 font-semibold">Cuando <strong>llego</strong> a casa, ceno</span> (habitude → indicatif) vs <span class="text-green-700 font-semibold">Cuando <span class="text-violet-600 font-extrabold">llegue</span>, te llamo</span> (futur → subjonctif).</p>
    </div>
  </div>

  ${chispaTip('le résumé du dragon', `
    Demande-toi : <strong>« Est-ce un fait réel et affirmé ? »</strong><br>
    OUI → indicatif. &nbsp;NON (souhait, émotion, doute, jugement, futur incertain) → <strong>subjonctif</strong>.<br>
    Et repère le schéma <strong>verbe déclencheur + que + ...</strong> : c'est lui qui commande ! 🚦
  `)}
`;

export const THEORY_BY_CHAPTER: Record<string, string> = {
  orthographe: ORTHOGRAPHE_THEORY,
  present_indicatif: PRESENTE_THEORY,
  subjonctif: SUBJUNTIVO_THEORY,
};
