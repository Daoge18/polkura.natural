const details={
  mirador:{
    kicker:"Estación 01 · Paisaje",
    title:"Mirador del paisaje",
    text:"Este punto elevado ofrece una vista panorámica inigualable del viñedo y su entorno. Aquí se aprecia cómo los cuarteles se adaptan a la topografía ondulada de Marchigüe. El objetivo es comprender la magnitud del terreno, la influencia del clima en el secano costero y cómo la producción vitivinícola coexiste armónicamente con la geografía natural del Valle de Colchagua.",
    task:"Fotografía panorámica, ubicación del punto y una descripción breve del entorno.",
    image:"imagenes/mirador.png"
  },
  flora:{
    kicker:"Estación 02 · Flora",
    title:"Suculentas y especies nativas",
    text:"El secano costero exige resiliencia. En este sector observaremos de cerca las adaptaciones fascinantes de las suculentas y especies nativas que sobreviven con escasa humedad. Aprenderemos a identificar sus formas y colores, entendiendo el rol vital que juegan en la retención de suelos y el equilibrio del ecosistema local de la viña.",
    task:"Fotografías de detalle y entorno, nombre común si se conoce, ubicación y característica visible.",
    image:"imagenes/especie.png"
  },
  tranques:{
    kicker:"Estación 03 · Agua",
    title:"Vida junto a los tranques",
    text:"Los tranques son mucho más que reservas para el riego; son oasis que atraen y sustentan vida. Este es un punto de observación respetuosa donde documentaremos cómo el agua se convierte en un centro de encuentro silvestre, manteniendo siempre una distancia prudente para no intervenir en sus zonas naturales de descanso y alimentación.",
    task:"Fecha, hora, clima, especies o actividad observada y registro fotográfico cuando sea posible.",
    image:"imagenes/tranques.jpg"
  },
  aves:{
    kicker:"Estación 04 · Avifauna",
    title:"Aves que visitan Polkura",
    text:"El viñedo es sobrevolado constantemente por especies fundamentales para el control de plagas y la biodiversidad. Mediante observación silenciosa en horarios estratégicos, construiremos un listado de la avifauna. Documentar sus conductas y rutas de vuelo nos ayuda a medir de manera directa la salud del entorno natural.",
    task:"Nombre o descripción, cantidad aproximada, conducta, horario y fotografía o audio, si es posible.",
    image:"imagenes/aves.png"
  },
  plantaciones:{
    kicker:"Estación 05 · Restitución",
    title:"Nuevas plantaciones",
    text:"La tierra siempre devuelve lo que se le entrega. En este sector registraremos los esfuerzos de restitución mediante especies nativas plantadas. Haremos un seguimiento de su crecimiento, necesidades de riego y cuidados posteriores, dejando un legado tangible de conservación forestal que opera en paralelo a la logística de producción.",
    task:"Especie, fecha, ubicación, fotografía inicial, riego y cuidados acordados con la viña.",
    image:"imagenes/plantacion.png"
  }
};

const dayDetails = {
  dia1: {
    kicker: "Jornada 01 · Terreno",
    title: "Selección de puntos",
    text: "Reconocimiento del terreno para definir estratégicamente las estaciones. Se evalúa la viabilidad, el acceso seguro para el personal y la relevancia biológica de cada punto dentro de los límites de Polkura.",
    task: "Mapeo GPS de las 5 estaciones iniciales."
  },
  dia2: {
    kicker: "Jornada 02 · Logística",
    title: "Delimitación del sendero",
    text: "Instalación de señalética provisional de bajo impacto visual. El objetivo es guiar el tránsito de forma clara sin alterar la dinámica de trabajo de los cuarteles ni el paisaje del secano.",
    task: "Marcaje físico y confirmación de distancias."
  },
  dia3: {
    kicker: "Jornada 03 · Levantamiento",
    title: "Catastro de flora nativa",
    text: "Levantamiento fotográfico y taxonómico de la flora endémica y suculentas. Esta información formará la base de datos primaria para observar la retención de humedad y salud del suelo.",
    task: "Registro en plataforma de especies clave."
  },
  dia4: {
    kicker: "Jornada 04 · Levantamiento",
    title: "Monitoreo de avifauna",
    text: "Estudio silencioso en la zona de tranques para registrar aves endémicas y migratorias. Las aves actúan como bioindicadores fundamentales de la sanidad del ecosistema que rodea a las parras.",
    task: "Registro fotográfico y conteo en horarios estratégicos."
  },
  dia5: {
    kicker: "Jornada 05 · Intervención",
    title: "Gestión de plantaciones",
    text: "Ejecución de plantaciones compensatorias. Se documenta la ubicación exacta, la especie nativa seleccionada y el estado inicial para asegurar su supervivencia y seguimiento.",
    task: "Ingreso de coordenadas y estado a la base de datos."
  },
  dia6: {
    kicker: "Jornada 06 · Gabinete",
    title: "Auditoría de datos",
    text: "Revisión exhaustiva de todos los hallazgos ingresados en Google Sheets. Se filtran anomalías, se corrigen textos y se valida la integridad de la base de datos recolectada.",
    task: "Limpieza de la hoja de cálculo y estandarización."
  },
  dia7: {
    kicker: "Jornada 07 · Implementación",
    title: "Despliegue y entrega",
    text: "Publicación oficial de la plataforma web, instalación de los códigos QR definitivos en terreno y traspaso del control total de la base de datos a la viña.",
    task: "Prueba de estrés del sistema y entrega operativa."
  }
};

const publicPageUrl=window.location.protocol==='file:'
  ? 'PUBLICA_PRIMERO_EN_GITHUB_PAGES'
  : `${window.location.origin}${window.location.pathname.replace(/index\.html$/, '')}`;
const qrData=encodeURIComponent(publicPageUrl);
document.querySelector('#qr-image').src=`https://api.qrserver.com/v1/create-qr-code/?size=700x700&format=svg&color=17251b&bgcolor=fbf8ef&margin=18&data=${qrData}`;
document.querySelector('#qr-download').href=`https://api.qrserver.com/v1/create-qr-code/?size=1200x1200&format=png&data=${qrData}`;
const dialog=document.querySelector('#info-dialog');

// Lógica de apertura para ESTACIONES DE LA RUTA (Muestra la foto)
document.querySelectorAll('[data-modal]').forEach(button => button.addEventListener('click', () => {
  const item = details[button.dataset.modal];
  const imgEl = document.querySelector('#dialog-image');
  
  imgEl.src = item.image;
  imgEl.parentElement.style.display = 'block'; // Enciende el contenedor de la imagen
  
  document.querySelector('#dialog-kicker').textContent = item.kicker;
  document.querySelector('#dialog-title').textContent = item.title;
  document.querySelector('#dialog-text').textContent = item.text;
  document.querySelector('#dialog-task').textContent = item.task;
  dialog.showModal();
}));

// Lógica de apertura para DÍAS DEL PLAN (Oculta la foto)
document.querySelectorAll('[data-day]').forEach(item => item.addEventListener('click', () => {
  const day = dayDetails[item.dataset.day];
  const imgEl = document.querySelector('#dialog-image');
  
  imgEl.parentElement.style.display = 'none'; // Apaga el contenedor de la imagen
  
  document.querySelector('#dialog-kicker').textContent = day.kicker;
  document.querySelector('#dialog-title').textContent = day.title;
  document.querySelector('#dialog-text').textContent = day.text;
  document.querySelector('#dialog-task').textContent = day.task;
  dialog.showModal();
}));

document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
document.querySelector('#show-plan').addEventListener('click',()=>document.querySelector('#days').scrollIntoView({behavior:'smooth',block:'center'}));
const escapeHtml=value=>value.replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[char]));

// --- CONEXIÓN A GOOGLE SHEETS ---
const API_URL = 'https://script.google.com/macros/s/AKfycbyM73O5ZIePiIvnilDw1F1ozSGevqlAYvCwLa0K5pprAEMbMGD2zd0JNCUk9IBf4tkB/exec';

// Convierte el enlace de Google Drive en una imagen directa usando la API de miniaturas
const getDirectImageUrl = (driveUrl) => {
  if (!driveUrl || driveUrl === 'Sin foto') return null;
  const match = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    // Usamos 'thumbnail' en lugar de 'uc' y pedimos un ancho de 800px (sz=w800)
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
  }
  return null;
};

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
    
    box.innerHTML = records.map(r => {
      const imgUrl = getDirectImageUrl(r.photo);
      
      return `
      <article class="record-card">
        <small>${String(r.type || 'Sin categoría')} · ${String(r.station || 'Sin estación')}</small>
        <h4>${escapeHtml(String(r.name || 'Sin nombre'))}</h4>
        <p>${escapeHtml(String(r.notes || 'Sin observaciones adicionales.'))}</p>
        
        ${imgUrl ? `
          <div style="margin-top: 14px; border-radius: 6px; overflow: hidden; height: 180px; background: #d3d5cb;">
            <img src="${imgUrl}" alt="Registro" style="width: 100%; height: 100%; object-fit: cover; display: block; border: none;">
          </div>
        ` : ''}
        
        <div style="margin-top: 14px; font-size: 0.8rem; color: #68785e; border-top: 1px solid #cfc8b5; padding-top: 10px;">
          <strong>👤 Registrado por:</strong> ${escapeHtml(String(r.volunteer || 'Anónimo'))}
        </div>
      </article>
      `;
    }).join('');
  } catch (error) {
    console.error("Error al cargar:", error);
    box.innerHTML = '<p class="empty">Error al cargar los datos. Revisa tu conexión.</p>';
  }
};
document.querySelector('#observation-form').addEventListener('submit', async event => {
  event.preventDefault();
  
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Subiendo imagen y guardando... (Puede demorar)';
  submitBtn.disabled = true;

  // Leer la imagen si es que seleccionaron una
  const fileInput = document.querySelector('#photo');
  let photoBase64 = "";
  let photoName = "";

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    photoName = file.name;
    // Transformar la imagen a código para enviarla por internet
    photoBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  const record = {
    volunteer: document.querySelector('#volunteer').value,
    type: document.querySelector('#type').value,
    name: document.querySelector('#name').value,
    station: document.querySelector('#station').value,
    notes: document.querySelector('#notes').value,
    photoBase64: photoBase64,
    photoName: photoName
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(record),
      headers: { "Content-Type": "text/plain;charset=utf-8" }
    });
    
    const result = await response.json();
    if(result.status === "error") throw new Error(result.message);
    
    event.target.reset();
    await renderRecords(); 
    
    const toast = document.querySelector('#toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  } catch (error) {
    alert("⚠️ HUBO UN ERROR AL ENVIAR. \n\nEs probable que la señal de internet sea muy débil para subir la fotografía. Por favor, asegúrate de tener cobertura 4G/5G, o guarda tus datos para subirlos más tarde.");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

const clearBtn = document.querySelector('#clear-records');
if (clearBtn) clearBtn.style.display = 'none';

renderRecords();