const details={
  mirador:{kicker:"Estación 01 · Paisaje",title:"Mirador del paisaje",text:"Punto de bienvenida para ubicar el recorrido y comprender cómo el viñedo convive con los cerros y la vegetación del secano costero.",task:"Fotografía panorámica, ubicación del punto y una descripción breve del entorno."},
  flora:{kicker:"Estación 02 · Flora",title:"Suculentas y especies nativas",text:"Sector para observar formas, colores y adaptaciones de las plantas. Las identificaciones se validan antes de publicarse como fichas definitivas.",task:"Fotografías de detalle y entorno, nombre común si se conoce, ubicación y característica visible."},
  tranques:{kicker:"Estación 03 · Agua",title:"Vida junto a los tranques",text:"Punto de observación respetuosa del agua como lugar de encuentro para aves y otras formas de vida, sin intervenir sus zonas de descanso.",task:"Fecha, hora, clima, especies o actividad observada y registro fotográfico cuando sea posible."},
  aves:{kicker:"Estación 04 · Avifauna",title:"Aves que visitan Polkura",text:"Observación silenciosa en dos horarios para construir un listado inicial. Cada especie debe confirmarse con una guía o persona conocedora.",task:"Nombre o descripción, cantidad aproximada, conducta, horario y fotografía o audio, si es posible."},
  plantaciones:{kicker:"Estación 05 · Restitución",title:"Nuevas plantaciones",text:"Registro de especies nativas plantadas en un sector autorizado, pensando en su cuidado y seguimiento posterior.",task:"Especie, fecha, ubicación, fotografía inicial, riego y cuidados acordados con la viña."}
};
const publicPageUrl=window.location.protocol==='file:'
  ? 'PUBLICA_PRIMERO_EN_GITHUB_PAGES'
  : `${window.location.origin}${window.location.pathname.replace(/index\.html$/, '')}`;
const qrData=encodeURIComponent(publicPageUrl);
document.querySelector('#qr-image').src=`https://api.qrserver.com/v1/create-qr-code/?size=700x700&format=svg&color=17251b&bgcolor=fbf8ef&margin=18&data=${qrData}`;
document.querySelector('#qr-download').href=`https://api.qrserver.com/v1/create-qr-code/?size=1200x1200&format=png&data=${qrData}`;
const dialog=document.querySelector('#info-dialog');
document.querySelectorAll('[data-modal]').forEach(button=>button.addEventListener('click',()=>{const item=details[button.dataset.modal];document.querySelector('#dialog-kicker').textContent=item.kicker;document.querySelector('#dialog-title').textContent=item.title;document.querySelector('#dialog-text').textContent=item.text;document.querySelector('#dialog-task').textContent=item.task;dialog.showModal()}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
document.querySelector('#show-plan').addEventListener('click',()=>document.querySelector('#days').scrollIntoView({behavior:'smooth',block:'center'}));

const escapeHtml=value=>value.replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[char]));

// --- CONEXIÓN A GOOGLE SHEETS ---
const API_URL = 'https://script.google.com/macros/s/AKfycbxpaerxnRpYzv0gIn3_5Sx0DPHzd_10iIxz6pf05YzMcCOaSO81CLA0rkeZv8gs1gSD/exec';

const renderRecords = async () => {
  const box = document.querySelector('#records');
  box.innerHTML = '<p class="empty">Cargando hallazgos desde Polkura...</p>';
  
  try {
    const response = await fetch(API_URL);
    const records = await response.json();
    
    if (!records.length) {
      box.innerHTML = '<p class="empty">Aún no hay hallazgos registrados.</p>';
      return;
    }
    
    box.innerHTML = records.map(r => `
      <article class="record-card">
        <small>${r.type} · ${r.station}</small>
        <h4>${escapeHtml(r.name)}</h4>
        <p>${escapeHtml(r.notes || 'Sin observaciones adicionales.')}</p>
      </article>
    `).join('');
  } catch (error) {
    box.innerHTML = '<p class="empty">Error al cargar los datos. Revisa tu conexión.</p>';
  }
};

document.querySelector('#observation-form').addEventListener('submit', async event => {
  event.preventDefault();
  
  // Cambiamos el texto del botón mientras envía
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Guardando...';
  submitBtn.disabled = true;

  const record = {
    type: document.querySelector('#type').value,
    name: document.querySelector('#name').value,
    station: document.querySelector('#station').value,
    notes: document.querySelector('#notes').value
  };

  try {
    await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(record),
      headers: { "Content-Type": "text/plain;charset=utf-8" }
    });
    
    event.target.reset();
    await renderRecords(); // Refresca la lista con el nuevo dato
    
    const toast = document.querySelector('#toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  } catch (error) {
    alert("Hubo un problema de conexión. Intenta nuevamente.");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

// Ocultamos el botón de borrar por seguridad (no queremos que borren el Excel desde la web)
const clearBtn = document.querySelector('#clear-records');
if (clearBtn) clearBtn.style.display = 'none';

// Cargar los registros al iniciar
renderRecords();