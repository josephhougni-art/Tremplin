let currentPhase = 0;
let currentBlock = 0;
let answers = {};
let phaseResults = {};
let activeDocTab = 0;
let unlockedUpTo = 0;
let selectedCountry = '';
let currentUser = null;

async function saveState(){
  if(!currentUser) return;
  try{
    const { error } = await supabaseClient.from('progress').upsert({
      user_id: currentUser.id,
      selected_country: selectedCountry,
      unlocked_up_to: unlockedUpTo,
      phase_results: phaseResults
    });
    if(error) console.warn('Sauvegarde impossible :', error.message);
  } catch(e){
    console.warn('Sauvegarde impossible :', e);
  }
}

async function loadState(){
  if(!currentUser) return;
  try{
    const { data, error } = await supabaseClient
      .from('progress')
      .select('selected_country, unlocked_up_to, phase_results')
      .eq('user_id', currentUser.id)
      .maybeSingle();
    if(error){ console.warn('Lecture de la progression impossible :', error.message); return; }
    if(data){
      selectedCountry = data.selected_country || '';
      unlockedUpTo = data.unlocked_up_to || 0;
      phaseResults = data.phase_results || {};
    }
  } catch(e){
    console.warn('Lecture de la progression impossible :', e);
  }
}

const COUNTRIES = [
  "Bénin", "Côte d'Ivoire", "Sénégal", "Togo", "Mali", "Burkina Faso",
  "Cameroun", "Niger", "Guinée", "République Démocratique du Congo",
  "France", "Belgique", "Suisse", "Canada (Québec)", "Autre"
];

const AFRICAN_COUNTRIES = new Set([
  "Bénin", "Côte d'Ivoire", "Sénégal", "Togo", "Mali", "Burkina Faso",
  "Cameroun", "Niger", "Guinée", "République Démocratique du Congo"
]);

function renderCountrySelector(){
  const el = document.getElementById('countrySelector');
  el.innerHTML = `
    <div class="country-box">
      <label>Ton pays</label>
      <select id="countrySelect" onchange="setCountry(this.value)">
        <option value="">— Choisir —</option>
        ${COUNTRIES.map(c => `<option value="${c}" ${c===selectedCountry?'selected':''}>${c}</option>`).join('')}
      </select>
      <div class="country-note">Le contenu généré (notamment la structuration juridique en Phase 5) s'adapte à ce choix.</div>
    </div>
  `;
}

async function setCountry(value){
  selectedCountry = value;
  renderCountrySelector();
  await saveState();
  toast(value ? `Pays défini : ${value}` : 'Pays effacé');
}

function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2600);
}

function phaseStatus(i){
  if(phaseResults[i]) return 'done';
  if(i <= unlockedUpTo) return 'active';
  return 'locked';
}

function renderDashboard(){
  const el = document.getElementById('dashboard');
  el.innerHTML = PHASES.map((p,i)=>{
    const status = phaseStatus(i);
    const clickable = status !== 'locked';
    const a11y = clickable
      ? `tabindex="0" role="button" aria-label="Ouvrir la Phase ${i+1} : ${p.title}" onclick="openPhase(${i})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openPhase(${i});}"`
      : `aria-disabled="true"`;
    return `
    <div class="node ${status}" ${a11y}>
      <div class="node-marker">${status==='done' ? '✓' : status==='active' ? (i+1) : '🔒'}</div>
      <div class="node-body">
        <div class="node-title">Phase ${i+1} — ${p.title}</div>
        <div class="node-desc">${p.desc}</div>
        <span class="tag ${status==='locked'?'locked':status==='done'?'done':'free'}">${status==='done' ? 'Terminé' : status==='locked' ? 'Verrouillé' : (p.free ? 'Gratuit' : 'Débloqué')}</span>
      </div>
    </div>`;
  }).join('');
}

function openPhase(i){
  if(!selectedCountry) { toast('Choisis d\'abord ton pays pour continuer.'); return; }
  if(phaseStatus(i) === 'locked') { toast('Termine la phase précédente pour continuer.'); return; }
  currentPhase = i;
  currentBlock = 0;
  answers = {};
  document.getElementById('formPanel').classList.remove('hidden');
  document.getElementById('resultsPanel').classList.add('hidden');
  document.getElementById('paywallPanel').classList.add('hidden');
  renderBlock();
  document.getElementById('formPanel').scrollIntoView({behavior:'smooth', block:'start'});
}

function escapeHtml(str){
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderBlock(){
  const phase = PHASES[currentPhase];
  const b = phase.blocks[currentBlock];
  const panel = document.getElementById('formPanel');
  const dots = phase.blocks.map((_,i)=>`<div class="dot ${i<currentBlock?'done':i===currentBlock?'current':''}"></div>`).join('');
  panel.innerHTML = `
    <div class="progress-dots">${dots}</div>
    <div class="block-label">${b.label} · Phase ${currentPhase+1} ${phase.title}</div>
    <div class="block-title">${b.title}</div>
    ${b.questions.map(q=>`
      <div class="q">
        <label>${q.label}</label>
        ${q.type==='textarea'
          ? `<textarea rows="3" id="${q.id}" maxlength="2000">${escapeHtml(answers[q.id]||'')}</textarea>`
          : `<input type="text" id="${q.id}" value="${escapeHtml(answers[q.id]||'')}" maxlength="300">`}
      </div>
    `).join('')}
    <div class="nav-row">
      <button class="btn-ghost" onclick="prevBlock()" ${currentBlock===0?'disabled':''}>← Précédent</button>
      <button class="btn-primary" onclick="nextBlock()">${currentBlock===phase.blocks.length-1 ? 'Générer mes documents' : 'Suivant →'}</button>
    </div>
  `;
}

function saveBlockAnswers(){
  PHASES[currentPhase].blocks[currentBlock].questions.forEach(q=>{
    const el = document.getElementById(q.id);
    if(el) answers[q.id] = el.value;
  });
}

function prevBlock(){
  saveBlockAnswers();
  currentBlock = Math.max(0, currentBlock-1);
  renderBlock();
}

function nextBlock(){
  saveBlockAnswers();
  const phase = PHASES[currentPhase];
  if(currentBlock < phase.blocks.length-1){
    currentBlock++;
    renderBlock();
  } else {
    generateDocuments();
  }
}

async function generateDocuments(){
  const phase = PHASES[currentPhase];
  document.getElementById('formPanel').innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <div>Génération des documents de la Phase ${currentPhase+1}…</div>
    </div>
  `;

  const answersText = phase.blocks.map(b => b.questions.map(q => `${q.label}\n${answers[q.id]||'(non renseigné)'}`).join('\n\n')).join('\n\n');

  const countryLine = `Le projet est basé dans le pays suivant : ${selectedCountry}. Adapte le contenu généré aux réalités de ce pays (réglementation, monnaie, usages locaux) chaque fois que c'est pertinent, sans l'inventer si l'information précise te manque — dans ce cas, indique clairement que le point doit être vérifié localement.`;

  const prompt = `Tu es un ${phase.role}. ${countryLine}

Voici les réponses d'un entrepreneur pour la phase "${phase.title}" de son projet :

${answersText}

À partir de ces réponses, génère et enrichis le contenu (reformule, structure, complète intelligemment sans inventer de faits non fournis) pour produire les documents suivants. Réponds UNIQUEMENT avec un objet JSON valide, sans texte avant ni après, sans balises markdown, respectant exactement cette structure de clés (le contenu de chaque valeur doit être le texte complet du document, en français, bien structuré avec des sauts de ligne) :

${phase.docSpec}`;

  try{
    const { data, error } = await supabaseClient.functions.invoke('generate-documents', {
      body: { prompt }
    });
    if(error) throw error;
    if(data && data.error) throw new Error(data.error);

    const textBlock = data.content.find(b=>b.type==='text');
    let raw = textBlock ? textBlock.text : '{}';
    raw = raw.replace(/```json|```/g,'').trim();
    phaseResults[currentPhase] = JSON.parse(raw);
    // Remarque : on ne débloque plus automatiquement la phase suivante ici.
    // unlockedUpTo n'est modifié que côté serveur, après vérification réelle
    // du paiement (voir supabase/functions/verify-kkiapay-payment et stripe-webhook).
    await saveState();
    renderResults();
  } catch(err){
    console.error(err);
    document.getElementById('formPanel').innerHTML = `
      <div class="loading">
        <div>Une erreur est survenue pendant la génération.</div>
        <button class="btn-primary" onclick="generateDocuments()">Réessayer</button>
      </div>
    `;
  }
}

function renderResults(){
  document.getElementById('formPanel').classList.add('hidden');
  const panel = document.getElementById('resultsPanel');
  panel.classList.remove('hidden');
  const phase = PHASES[currentPhase];
  const docs = phase.docs;
  const generatedDocs = phaseResults[currentPhase];
  activeDocTab = 0;
  function renderTabs(){
    panel.innerHTML = `
      <div class="block-label">Pack Phase ${currentPhase+1} — prêt</div>
      <div class="block-title">Tes documents : ${phase.title}</div>
      <div class="doc-tabs">
        ${docs.map((d,i)=>`<div class="doc-tab ${i===activeDocTab?'active':''}" tabindex="0" role="tab" aria-selected="${i===activeDocTab}" onclick="setDocTab(${i})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();setDocTab(${i});}">${d.label}</div>`).join('')}
      </div>
      <div class="doc-content">${(generatedDocs[docs[activeDocTab].key]||'').replace(/</g,'&lt;')}</div>
      <div class="nav-row">
        <button class="btn-ghost" onclick="openPhase(${currentPhase})">← Modifier mes réponses</button>
        <div style="display:flex;gap:10px;">
          <button class="btn-ghost" onclick="downloadPackDocx()">📄 Word (.docx)</button>
          <button class="btn-primary" onclick="downloadPackPdf()">📄 PDF</button>
        </div>
      </div>
    `;
  }
  window.setDocTab = (i)=>{ activeDocTab = i; renderTabs(); };
  renderTabs();
  renderDashboard();
  renderNextStep();
}

function downloadPackDocx(){
  const phase = PHASES[currentPhase];
  const generatedDocs = phaseResults[currentPhase];
  const { Document, Packer, Paragraph, TextRun, HeadingLevel } = docx;

  const children = [
    new Paragraph({ text: 'Tremplin', heading: HeadingLevel.HEADING_3 }),
    new Paragraph({ text: `Pack Phase ${currentPhase+1} — ${phase.title}`, heading: HeadingLevel.TITLE }),
    new Paragraph({ text: '' }),
  ];

  phase.docs.forEach(d => {
    children.push(new Paragraph({ text: d.label, heading: HeadingLevel.HEADING_1 }));
    const text = generatedDocs[d.key] || '';
    text.split('\n').forEach(line => {
      children.push(new Paragraph({ children: [new TextRun(line)] }));
    });
    children.push(new Paragraph({ text: '' }));
  });

  const doc = new Document({ sections: [{ children }] });

  Packer.toBlob(doc).then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tremplin-pack-phase-${currentPhase+1}.docx`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Document Word téléchargé ✓');
  }).catch(() => toast("Erreur lors de la génération du fichier Word."));
}

function downloadPackPdf(){
  const phase = PHASES[currentPhase];
  const generatedDocs = phaseResults[currentPhase];
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
  const marginX = 18;
  const pageWidth = 210 - marginX * 2;
  const pageHeight = 297 - 20;
  let y = 20;

  function addLine(text, size, bold){
    pdf.setFontSize(size);
    pdf.setFont('helvetica', bold ? 'bold' : 'normal');
    const lines = pdf.splitTextToSize(text, pageWidth);
    lines.forEach(line => {
      if(y > pageHeight){ pdf.addPage(); y = 20; }
      pdf.text(line, marginX, y);
      y += size * 0.55;
    });
  }

  addLine('Tremplin', 11, true);
  addLine(`Pack Phase ${currentPhase+1} — ${phase.title}`, 18, true);
  y += 4;

  phase.docs.forEach(d => {
    if(y > pageHeight - 20){ pdf.addPage(); y = 20; }
    y += 4;
    addLine(d.label, 14, true);
    y += 1;
    (generatedDocs[d.key] || '').split('\n').forEach(line => addLine(line || ' ', 10.5, false));
    y += 4;
  });

  pdf.save(`tremplin-pack-phase-${currentPhase+1}.pdf`);
  toast('PDF téléchargé ✓');
}

function renderNextStep(){
  const el = document.getElementById('paywallPanel');
  const nextIndex = currentPhase + 1;
  if(nextIndex >= PHASES.length){
    el.classList.add('hidden');
    return;
  }
  el.classList.remove('hidden');
  const next = PHASES[nextIndex];
  const phase0Done = currentPhase === 0;
  if(phase0Done){
    el.innerHTML = `
      <div class="paywall">
        <div class="lock-icon">🔒</div>
        <h3>Prêt pour la Phase 2 ?</h3>
        <p>Ta note de concept est posée. La suite du parcours — validation marché, cadrage produit, business plan et lancement — se débloque avec le pack complet Tremplin.</p>
        <a href="checkout.html" class="btn-lock" style="display:inline-block;text-decoration:none;">Débloquer la suite</a>
      </div>
    `;
  } else {
    el.innerHTML = `
      <div class="paywall">
        <h3>Phase ${currentPhase+1} terminée</h3>
        <p>Tu peux continuer directement vers la Phase ${nextIndex+1} — ${next.title}.</p>
        <button class="btn-primary" onclick="openPhase(${nextIndex})">Continuer vers la Phase ${nextIndex+1}</button>
      </div>
    `;
  }
}

async function initApp(){
  currentUser = await requireAuth();
  if(!currentUser) return; // requireAuth a déjà redirigé vers login.html
  await loadState();
  renderCountrySelector();
  renderDashboard();
}

initApp();
          
