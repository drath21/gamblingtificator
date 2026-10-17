import * as THREE from 'three';

// --- PANTALLA DE ACCESO CON CÓDIGO NUMÉRICO ---

const CODIGO_ACCESO = '91167'; // CAMBIA ESTO POR TU CÓDIGO

const startBtn = document.getElementById('start-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const accessForm = document.getElementById('access-form');
const accessCode = document.getElementById('access-code');
const accessError = document.getElementById('access-error');

if (accessForm && welcomeScreen) {
  accessForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const codigoIntroducido = accessCode.value.trim();

    // Comprobar el código
    if (codigoIntroducido !== CODIGO_ACCESO) {
      accessError.textContent = '❌ Código incorrecto. Inténtalo de nuevo.';
      accessCode.value = '';
      accessCode.focus();
      return;
    }

    // Código correcto: ocultar la pantalla de bienvenida
    accessError.textContent = '';
    startBtn.disabled = true;
    accessCode.disabled = true;

    welcomeScreen.style.opacity = '0';

    // Activar la música igual que en el comportamiento original
    musicaActiva = true;
    reproducirFondo();

    // Actualizar el botón lateral de música
    const btnMusicaUI = document.getElementById('btn-musica');

    if (btnMusicaUI) {
      btnMusicaUI.textContent = 'PLAY 🎵';
      btnMusicaUI.style.background = '#00aa55';
    }

    // Eliminar completamente la pantalla tras la transición
    setTimeout(() => {
      welcomeScreen.remove();
    }, 500);
  });
}

// --- INTERFAZ HTML LATERAL EN VERTICAL ---
const uiContainer = document.createElement('div');
uiContainer.style.position = 'absolute';
uiContainer.style.top = '20px';
uiContainer.style.left = '20px';
uiContainer.style.width = '320px';
uiContainer.style.maxHeight = '90vh';    // <--- Añadido aquí (nunca será más alto que el 90% de la pantalla)
uiContainer.style.overflowY = 'auto';    // <--- Añadido aquí (activa la barra de scroll si el menú es muy largo)
uiContainer.style.background = 'rgba(0, 0, 0, 0.9)';
uiContainer.style.padding = '15px';
uiContainer.style.borderRadius = '12px';
uiContainer.style.fontFamily = 'Arial, sans-serif';
uiContainer.style.color = '#fff';
uiContainer.style.display = 'flex';
uiContainer.style.flexDirection = 'column';
uiContainer.style.gap = '10px';
uiContainer.style.boxShadow = '0 8px 32px rgba(0,0,0,0.6)';
uiContainer.style.zIndex = '100';

uiContainer.innerHTML = `
  <div style="font-size: 16px; font-weight: bold; color: #ffd700; text-align: center;">EL GAMBLINGFICADOR V. 6.7</div>
  
  <div style="display: flex; gap: 8px; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.05); padding: 6px 10px; border-radius: 6px;">
    <span style="font-size: 11px; color: #aaa;">Gambling Music:</span>
    <button id="btn-musica" style="background:#444; color:white; border:none; padding:4px 10px; border-radius:4px; cursor:pointer; font-weight:bold; font-size:11px;">MUTED 🔇</button>
  </div>

  <div style="display: flex; flex-direction: column; gap: 4px;">
    <div style="font-size: 11px; color: #aaa;">PARTICIPANTES (Deben sumar 100%):</div>
    <textarea id="input-jugadores" rows="2" style="width: 100%; padding: 6px; border-radius: 6px; border: 1px solid #444; background: #222; color: #fff; font-size: 11px; resize: none;">Paco Sanz:45, Erdogan:25, Netanyahu:30</textarea>
    <div style="display:flex; gap:6px;">
      <button id="btn-modo-aleatorio" style="flex:1; background:#0088ff; color:white; border:none; padding:5px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:11px;">🎲 Aleatorio</button>
      <button id="btn-modo-manual" style="flex:1; background:#333; color:white; border:none; padding:5px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:11px;">🖐️ Manual</button>
    </div>
    <button id="btn-asignar" style="background:#0088ff; color:white; border:none; padding:6px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:12px;">Asignar Porcentajes y Fichas</button>
  </div>

  <div style="font-size: 11px; font-weight: bold; color: #00ff88; border-top: 1px solid #333; padding-top: 4px;">Numeritos:</div>
  <div id="panel-asignacion" style="font-size: 10px; color: #ddd; max-height: 80px; overflow-y: auto; background: rgba(255,255,255,0.05); padding: 6px; border-radius: 6px; display: flex; flex-direction: column; gap: 4px;"></div>

  <div id="titulo-fichas" style="font-size: 11px; font-weight: bold; color: #ffd700; border-top: 1px solid #333; padding-top: 4px;">FICHAS</div>
  <div id="panel-fichas-estado" style="font-size: 11px; color: #00ffaa; font-weight: bold;"></div>
  <div id="tablero-apuestas" style="display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 3px; max-height: 120px; overflow-y: auto; background: rgba(0,64,26,0.8); padding: 6px; border-radius: 6px; border: 1px solid #ffd700;"></div>

  <div style="font-size: 11px; font-weight: bold; color: #ffd700; border-top: 1px solid #333; padding-top: 4px;">HALL DE LOS GANADORES:</div>
  <div id="panel-historial" style="font-size: 10px; color: #ffcc00; max-height: 60px; overflow-y: auto; background: rgba(0,0,0,0.5); padding: 6px; border-radius: 6px;">Sin tiradas todavía.</div>

  <button id="btn-girar" style="position: relative; overflow: hidden; background:#00aa55; color:white; border:none; padding:10px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:14px;">
    <span id="texto-btn-girar">ES HORA DEL GAMBLING!</span>
    <div id="efecto-fuego" style="position: absolute; inset:0; background: radial-gradient(circle, rgba(255,69,0,0.8) 0%, transparent 80%); opacity: 0; pointer-events: none; transition: opacity 0.2s;"></div>
  </button>
`;
document.body.appendChild(uiContainer);


// --- IMAGEN FLOTANTE ABAJO A LA DERECHA ---
const imagenEsquina1 = document.createElement('img');
imagenEsquina1.src = './monster rain.gif';
imagenEsquina1.style.position = 'fixed';
imagenEsquina1.style.bottom = '500px';
imagenEsquina1.style.right = '-75px';
imagenEsquina1.style.width = 'clamp(175px, 30vw, 700px)';
imagenEsquina1.style.height = 'auto';
imagenEsquina1.style.borderRadius = '8px';
imagenEsquina1.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0)';
imagenEsquina1.style.zIndex = '100';
imagenEsquina1.style.pointerEvents = 'none';
document.body.appendChild(imagenEsquina1);

// --- SEGUNDA IMAGEN FLOTANTE ---
const imagenEsquina2 = document.createElement('img');
imagenEsquina2.src = './cigs.gif';
imagenEsquina2.style.position = 'fixed';
imagenEsquina2.style.bottom = '15px';
imagenEsquina2.style.right = '1500px';
imagenEsquina2.style.width = 'clamp(100px, 30vw, 150px)';
imagenEsquina2.style.height = 'auto';
imagenEsquina2.style.borderRadius = '8px';
imagenEsquina2.style.boxShadow = '0 4px 16px rgba(0,0,0,0)';
imagenEsquina2.style.zIndex = '100';
imagenEsquina2.style.pointerEvents = 'none';
document.body.appendChild(imagenEsquina2);

// --- TERCERA IMAGEN FLOTANTE ---
const imagenEsquina3 = document.createElement('img');
imagenEsquina3.src = './cat.gif';
imagenEsquina3.style.position = 'fixed';
imagenEsquina3.style.bottom = '600px';
imagenEsquina3.style.right = '1100px';
imagenEsquina3.style.width = 'clamp(200px, 30vw, 300px)';
imagenEsquina3.style.height = 'auto';
imagenEsquina3.style.borderRadius = '8px';
imagenEsquina3.style.boxShadow = '0 4px 16px rgba(0,0,0,0)';
imagenEsquina3.style.zIndex = '100';
imagenEsquina3.style.pointerEvents = 'none';
document.body.appendChild(imagenEsquina3);

// --- CUARTA IMAGEN FLOTANTE (MonsterW) ---
const imagenEsquina5 = document.createElement('img');
imagenEsquina5.src = './MonsterW.png';
imagenEsquina5.style.position = 'fixed';
imagenEsquina5.style.bottom = '-50px';
imagenEsquina5.style.right = '-150px';
imagenEsquina5.style.width = 'clamp(750px, 30vw, 1700px)';
imagenEsquina5.style.height = 'auto';
imagenEsquina5.style.borderRadius = '8px';
imagenEsquina5.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0)';
imagenEsquina5.style.zIndex = '100';
imagenEsquina5.style.pointerEvents = 'none';
document.body.appendChild(imagenEsquina5);

// --- QUINTA IMAGEN FLOTANTE (Goth Baddie) ---
const imagenEsquina6 = document.createElement('img');
imagenEsquina6.src = './goth baddie.png';
imagenEsquina6.style.position = 'fixed';
imagenEsquina6.style.bottom = '0px';
imagenEsquina6.style.right = '-20px';
imagenEsquina6.style.width = 'clamp(500px, 30vw, 995px)';
imagenEsquina6.style.height = 'auto';
imagenEsquina6.style.borderRadius = '8px';
imagenEsquina6.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0)';
imagenEsquina6.style.zIndex = '100';
imagenEsquina6.style.pointerEvents = 'none';
document.body.appendChild(imagenEsquina6);

// --- MÓVIL / TÁCTIL ---
const ES_TACTIL = window.matchMedia('(pointer: coarse)').matches;

// iOS Safari ignora user-scalable=no: bloqueamos el zoom con dos dedos a mano
['gesturestart', 'gesturechange', 'gestureend'].forEach((ev) => {
  document.addEventListener(ev, (e) => e.preventDefault());
});

// --- LAYOUT PROPORCIONAL (diseño de referencia: 1920x915) ---
const DISENO_W = 1920;
const DISENO_H = 915;
let escalaUI = 1;

const configImagenes = [
  { el: imagenEsquina1, bottom: 500, right: -75,  width: 576 }, // monster rain
  { el: imagenEsquina2, bottom: 15,  right: 1500, width: 150 }, // cigs
  { el: imagenEsquina3, bottom: 600, right: 1100, width: 300 }, // cat
  { el: imagenEsquina5, bottom: -50, right: -150, width: 750 }, // MonsterW
  { el: imagenEsquina6, bottom: 0,   right: -20,  width: 576 }, // goth baddie
];

// En vertical (móvil, tablet en vertical) la pantalla se reparte:
// arriba la ruleta y abajo el panel, que así se puede leer y usar.
const FRACCION_PANEL_VERTICAL = 0.55; // parte de la altura que ocupa el panel
const ANCHO_PANEL_VERTICAL = 290;     // ancho de diseño del panel en vertical (px)

function medirVista() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (h > w) {
    const panelH = Math.round(h * FRACCION_PANEL_VERTICAL);
    return { w, h: h - panelH, panelH, vertical: true };
  }
  return { w, h, panelH: 0, vertical: false };
}

function ajustarImagenes() {
  const vista = medirVista();
  escalaUI = Math.min(vista.w / DISENO_W, vista.h / DISENO_H);

  configImagenes.forEach(({ el, bottom, right, width }) => {
    el.style.display = 'block';
    el.style.bottom = (vista.panelH + bottom * escalaUI) + 'px';
    el.style.right = (right * escalaUI) + 'px';
    el.style.width = (width * escalaUI) + 'px';
    el.style.height = 'auto';
  });

  const btnGirarEl = document.getElementById('btn-girar');
  const areaJugadores = document.getElementById('input-jugadores');
  // En pantallas táctiles, iOS hace zoom al enfocar un campo con letra < 16px
  if (areaJugadores) areaJugadores.style.fontSize = ES_TACTIL ? '16px' : '11px';

  if (vista.vertical) {
    // Panel abajo, centrado y ocupando el ancho disponible
    const k = Math.min(1.6, (vista.w - 16) / ANCHO_PANEL_VERTICAL);
    uiContainer.style.position = 'fixed';
    uiContainer.style.width = (ANCHO_PANEL_VERTICAL - 30) + 'px';
    uiContainer.style.transformOrigin = 'bottom left';
    uiContainer.style.transform = `scale(${k})`;
    uiContainer.style.top = 'auto';
    uiContainer.style.bottom = '4px';
    uiContainer.style.left = ((vista.w - ANCHO_PANEL_VERTICAL * k) / 2) + 'px';
    uiContainer.style.maxHeight = ((vista.panelH - 8) / k - 30) + 'px';
    uiContainer.style.zIndex = '200';
    // El botón de girar siempre visible al fondo del panel
    if (btnGirarEl) {
      btnGirarEl.style.position = 'sticky';
      btnGirarEl.style.bottom = '0px';
      btnGirarEl.style.zIndex = '5';
      btnGirarEl.style.padding = '14px';
    }
  } else {
    // Panel lateral (PC, tablet en horizontal). Mínimo 0.6 para que se lea en móvil horizontal
    const kPanel = Math.max(escalaUI, 0.6);
    uiContainer.style.position = 'absolute';
    uiContainer.style.width = '320px';
    uiContainer.style.transformOrigin = 'top left';
    uiContainer.style.transform = `scale(${kPanel})`;
    uiContainer.style.bottom = 'auto';
    uiContainer.style.top = (20 * kPanel) + 'px';
    uiContainer.style.left = (20 * kPanel) + 'px';
    uiContainer.style.maxHeight = ((window.innerHeight - 40 * kPanel) / kPanel) + 'px';
    uiContainer.style.zIndex = '100';
    if (btnGirarEl) {
      btnGirarEl.style.position = 'relative';
      btnGirarEl.style.padding = '10px';
    }
  }

  // Cartelito del autor
  const kCartel = vista.vertical ? 0.8 : escalaUI;
  cartelAutor.style.transformOrigin = 'bottom right';
  cartelAutor.style.transform = `scale(${kCartel})`;
  cartelAutor.style.bottom = (vista.panelH + 15 * kCartel) + 'px';
  cartelAutor.style.right = (20 * kCartel) + 'px';
}

// --- CARTELITO INFERIOR DERECHO (AUTOR) ---
const cartelAutor = document.createElement('div');
cartelAutor.style.position = 'fixed';
cartelAutor.style.bottom = '15px';
cartelAutor.style.right = '20px';
cartelAutor.style.background = 'rgba(0, 0, 0, 0.75)';
cartelAutor.style.border = '1px solid rgba(255, 215, 0, 0.4)';
cartelAutor.style.padding = '6px 12px';
cartelAutor.style.borderRadius = '8px';
cartelAutor.style.fontFamily = 'Arial, sans-serif';
cartelAutor.style.fontSize = '12px';
cartelAutor.style.color = '#ffd700';
cartelAutor.style.fontWeight = 'bold';
cartelAutor.style.boxShadow = '0 4px 16px rgba(0,0,0,0.5)';
cartelAutor.style.zIndex = '100';
cartelAutor.style.pointerEvents = 'none';
cartelAutor.textContent = 'by: el drath';
document.body.appendChild(cartelAutor);

// --- PLAYLIST DE MÚSICA DE FONDO (TOTALMENTE ALEATORIA DESDE EL INICIO) ---
const playlist = [
  './d.mp3',
  './d2.mp3',
  './d3.mp3',
  './d4.mp3',
  './d5.mp3',
  './l1.mp3',
  './l2.mp3',
  './b1.mp3',
  './b2.mp3',
  './f1.mp3',
  './k1.mp3',
  './db1h.mp3'
];

// Función para obtener un índice aleatorio evitando repetir la misma canción seguida
function obtenerIndiceAleatorio(excluir = -1) {
  if (playlist.length <= 1) return 0;
  let nuevoIndice;
  do {
    nuevoIndice = Math.floor(Math.random() * playlist.length);
  } while (nuevoIndice === excluir);
  return nuevoIndice;
}

let indiceCancionActual = Math.floor(Math.random() * playlist.length);
const audioFondo = new Audio(playlist[indiceCancionActual]);
audioFondo.preload = 'auto';
audioFondo.volume = 0.5;

let musicaActiva = false;
let fallosSeguidos = 0;

function reproducirFondo() {
  if (!musicaActiva) return;
  audioFondo.play().catch((err) => {
    // AbortError: llegó otra orden (cambio de canción o pausa); la siguiente se encarga
    // NotAllowedError: el navegador exige un gesto del usuario; reintentar no sirve
    if (err.name === 'AbortError' || err.name === 'NotAllowedError') return;
    // Cualquier otro fallo: reintentar cuando haya datos suficientes
    audioFondo.addEventListener('canplay', reproducirFondo, { once: true });
  });
}

function cargarCancion(indice) {
  indiceCancionActual = indice;
  audioFondo.src = playlist[indice];
  // Arrancar solo cuando el archivo esté listo (si la música sigue activada)
  audioFondo.addEventListener('canplay', reproducirFondo, { once: true });
}

audioFondo.addEventListener('ended', () => {
  cargarCancion(obtenerIndiceAleatorio(indiceCancionActual));
});

audioFondo.addEventListener('playing', () => { fallosSeguidos = 0; });

// Si un MP3 falla (red, archivo roto...), saltar a otro en vez de quedarse en silencio
audioFondo.addEventListener('error', () => {
  if (++fallosSeguidos > playlist.length) return; // evita bucle infinito sin conexión
  setTimeout(() => cargarCancion(obtenerIndiceAleatorio(indiceCancionActual)), 500);
});

document.getElementById('btn-musica').addEventListener('click', () => {
  musicaActiva = !musicaActiva;
  const btn = document.getElementById('btn-musica');
  if (musicaActiva) {
    if (musicaActiva)reproducirFondo();
    btn.textContent = 'PLAY 🎵';
    btn.style.background = '#00aa55';
  } else {
    audioFondo.pause();
    btn.textContent = 'MUTED 🔇';
    btn.style.background = '#444';
  }
});

// --- AUDIOS ESPECIALES (ERIKA Y ROJO 7) ---
const audioErika = new Audio('./erika.mp3');
audioErika.volume = 0.8;

const audioRojo7 = new Audio('./rojo7.mp3');
audioRojo7.volume = 0.8;

// Cuando termina Erika, reanudamos la música de fondo si estaba activada
audioErika.addEventListener('ended', () => {
  if (musicaActiva) {
    reproducirFondo();
  }
});

// Cuando termina el audio del Rojo 7, reanudamos la música de fondo si estaba activada
audioRojo7.addEventListener('ended', () => {
  if (musicaActiva) {
    reproducirFondo();
  }
});

function reproducirErika() {
  if (musicaActiva) audioFondo.pause();
  audioRojo7.pause();
  audioRojo7.currentTime = 0;
  audioErika.currentTime = 0;
  audioErika.play().catch(() => {});
}

function reproducirRojo7() {
  if (musicaActiva) audioFondo.pause();
  audioErika.pause();
  audioErika.currentTime = 0;
  audioRojo7.currentTime = 0;
  audioRojo7.play().catch(() => {});
}

function detenerEspeciales() {
  audioErika.pause();
  audioErika.currentTime = 0;
  audioRojo7.pause();
  audioRojo7.currentTime = 0;
  if (musicaActiva) reproducirFondo();
}

// Audio sintético para efectos cortos (rebotes y victoria)
let audioCtx = null;
function obtenerAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function reproducirSonidoBoton() {
  try {
    const ctx = obtenerAudioContext();
    const ahora = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 1.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ahora);
    filter.frequency.exponentialRampToValueAtTime(30, ahora + 1.5);
    const gainNoise = ctx.createGain();
    gainNoise.gain.setValueAtTime(1.0, ahora);
    gainNoise.gain.exponentialRampToValueAtTime(0.01, ahora + 1.5);
    noise.connect(filter);
    filter.connect(gainNoise);
    gainNoise.connect(ctx.destination);
    noise.start(ahora);

    [0.1, 0.4, 0.7].forEach((delay, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(idx % 2 === 0 ? 320 : 380, ahora + delay);
      gain.gain.setValueAtTime(0.3, ahora + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, ahora + delay + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ahora + delay);
      osc.stop(ahora + delay + 0.25);
    });
  } catch (e) {}
}

function reproducirRebote() {
  try {
    const ctx = obtenerAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600 + Math.random() * 200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch(e) {}
}

function reproducirVictoria() {
  try {
    const ctx = obtenerAudioContext();
    const ahora = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ahora + i * 0.12);
      gain.gain.setValueAtTime(0.4, ahora + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, ahora + i * 0.12 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ahora + i * 0.12);
      osc.stop(ahora + i * 0.12 + 0.3);
    });
  } catch(e) {}
}

// --- CARTEL FLOTANTE EN EL CENTRO DE LA PANTALLA ---
const cartelCentro = document.createElement('div');
cartelCentro.style.position = 'absolute';
cartelCentro.style.top = '50%';
cartelCentro.style.left = '50%';
cartelCentro.style.transform = 'translate(-50%, -50%) scale(0)';
cartelCentro.style.background = 'rgba(0, 0, 0, 0.95)';
cartelCentro.style.border = '3px solid #ffd700';
cartelCentro.style.padding = '25px 40px';
cartelCentro.style.borderRadius = '16px';
cartelCentro.style.fontFamily = 'Arial, sans-serif';
cartelCentro.style.color = '#fff';
cartelCentro.style.textAlign = 'center';
cartelCentro.style.boxShadow = '0 0 50px rgba(255, 215, 0, 0.6)';
cartelCentro.style.zIndex = '200';
cartelCentro.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
cartelCentro.style.opacity = '0';
cartelCentro.style.pointerEvents = 'none';

cartelCentro.innerHTML = `
  <div id="cartel-titulo" style="font-size: 22px; color: #ffd700; font-weight: bold; margin-bottom: 8px;">¡RESULTADO!</div>
  <div id="cartel-texto" style="font-size: 28px; font-weight: bold; color: #00ff88;"></div>
  <div id="cartel-subtexto" style="font-size: 15px; color: #ff4444; margin-top: 10px; font-style: italic;"></div>
`;
document.body.appendChild(cartelCentro);

function mostrarCartel(titulo, texto, subtexto = '') {
  document.getElementById('cartel-titulo').textContent = titulo;
  document.getElementById('cartel-texto').innerHTML = texto;
  const sub = document.getElementById('cartel-subtexto');
  sub.textContent = subtexto;
  sub.style.display = subtexto ? 'block' : 'none';

  // En vertical se centra sobre la ruleta (zona de arriba) y con un tamaño legible
  const vista = medirVista();
  const kCartel = vista.vertical ? Math.min(1, (vista.w - 24) / 340) : Math.max(escalaUI, 0.6);
  cartelCentro.style.top = vista.vertical ? (vista.h / 2) + 'px' : '50%';
  cartelCentro.style.transform = `translate(-50%, -50%) scale(${kCartel})`;
  cartelCentro.style.opacity = '1';
  lanzarConfetiYDinero();
}

function ocultarCartel() {
  cartelCentro.style.transform = 'translate(-50%, -50%) scale(0)';
  cartelCentro.style.opacity = '0';
  detenerEspeciales();
}

// Canvas para confeti y billetes volando
const canvasFX = document.createElement('canvas');
canvasFX.style.position = 'absolute';
canvasFX.style.top = '0';
canvasFX.style.left = '0';
canvasFX.style.width = '100%';
canvasFX.style.height = '100%';
canvasFX.style.pointerEvents = 'none';
canvasFX.style.zIndex = '150';
document.body.appendChild(canvasFX);
const ctxFX = canvasFX.getContext('2d');

function ajustarCanvasFX() {
  canvasFX.width = window.innerWidth;
  canvasFX.height = window.innerHeight;
}
window.addEventListener('resize', ajustarCanvasFX);
ajustarCanvasFX();

let particulas = [];
function lanzarConfetiYDinero() {
  particulas = [];
  for (let i = 0; i < 120; i++) {
    particulas.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 300,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 1.2) * 16 - 4,
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 12,
      tipo: Math.random() > 0.4 ? 'confeti' : 'billete',
      color: ['#ffd700', '#ff4444', '#00ff88', '#0088ff', '#ff00ff'][Math.floor(Math.random() * 5)],
      size: Math.random() * 12 + 8
    });
  }
}

function actualizarYRenderizarFX() {
  ctxFX.clearRect(0, 0, canvasFX.width, canvasFX.height);
  particulas.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.5;
    p.rot += p.vrot;

    ctxFX.save();
    ctxFX.translate(p.x, p.y);
    ctxFX.rotate((p.rot * Math.PI) / 180);

    if (p.tipo === 'confeti') {
      ctxFX.fillStyle = p.color;
      ctxFX.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    } else {
      ctxFX.fillStyle = '#2e8b57';
      ctxFX.fillRect(-p.size, -p.size / 2, p.size * 2, p.size);
      ctxFX.fillStyle = '#ffd700';
      ctxFX.font = 'bold 12px Arial';
      ctxFX.textAlign = 'center';
      ctxFX.textBaseline = 'middle';
      ctxFX.fillText('$', 0, 0);
    }
    ctxFX.restore();

    if (p.y > canvasFX.height + 50) {
      particulas.splice(index, 1);
    }
  });
}

// Datos y configuración
const ordenEuropeo = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
const numerosRojos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

const TOTAL_ASIGNABLES = 36; // del 1 al 36: el 0 es de la casa y no se puede asignar
const COLORES_JUGADORES = ['#ff4444', '#3388ff', '#ffaa00', '#aa44ff', '#00ffaa'];

let modoAsignacion = 'aleatorio'; // 'aleatorio' | 'manual'
let asignacionNumeros = {};
let historialGanadores = [];
let jugadoresLista = [];
let turnoJugadorIndex = 0;
let fichasRestantesPorJugador = {};

const panelAsignacion = document.getElementById('panel-asignacion');
const panelHistorial = document.getElementById('panel-historial');
const tableroApuestas = document.getElementById('tablero-apuestas');
const panelFichasEstado = document.getElementById('panel-fichas-estado');
const tituloFichas = document.getElementById('titulo-fichas');
const btnModoAleatorio = document.getElementById('btn-modo-aleatorio');
const btnModoManual = document.getElementById('btn-modo-manual');

function actualizarBotonesModo() {
  const esAleatorio = modoAsignacion === 'aleatorio';
  btnModoAleatorio.style.background = esAleatorio ? '#0088ff' : '#333';
  btnModoManual.style.background = esAleatorio ? '#333' : '#0088ff';
  tituloFichas.textContent = esAleatorio
    ? 'TABLERO (números asignados al azar):'
    : 'FICHAS (haz clic en un número para reclamarlo):';
}

// Reparto que siempre suma exactamente TOTAL_ASIGNABLES (método del mayor resto)
function calcularCuotas(lista) {
  const exactos = lista.map(j => (j.porcentaje / 100) * TOTAL_ASIGNABLES);
  const cuotas = exactos.map(Math.floor);
  const faltan = TOTAL_ASIGNABLES - cuotas.reduce((a, b) => a + b, 0);
  const orden = exactos
    .map((e, i) => ({ i, resto: e - Math.floor(e) }))
    .sort((a, b) => b.resto - a.resto);
  for (let k = 0; k < faltan && k < orden.length; k++) cuotas[orden[k].i]++;
  return cuotas;
}

// Primer jugador (desde un índice, dando la vuelta) al que aún le queden fichas
function siguienteConFichas(desde) {
  for (let k = 0; k < jugadoresLista.length; k++) {
    const idx = (desde + k) % jugadoresLista.length;
    if (fichasRestantesPorJugador[jugadoresLista[idx].nombre] > 0) return idx;
  }
  return -1;
}

function mostrarErrorAsignacion(mensaje) {
  panelAsignacion.innerHTML = `<div style="color:#ff6666;">${mensaje}</div>`;
}

function renderPanelAsignacion() {
  panelAsignacion.innerHTML = jugadoresLista.map(j => {
    const nums = [...j.numeros].sort((a, b) => a - b).join(', ');
    const pendientes = modoAsignacion === 'manual'
      ? ` · faltan ${fichasRestantesPorJugador[j.nombre]}`
      : '';
    return `<div><span style="color:${j.color}; font-weight:bold;">${j.nombre} (${j.porcentaje}% · ${j.cuota}):</span> [${nums}]${pendientes}</div>`;
  }).join('');
}

function asignarPorcentajes() {
  ocultarCartel();
  historialGanadores = [];
  panelHistorial.textContent = "Not Gambling yet";

  const partes = document.getElementById('input-jugadores').value.split(',');
  const nuevaLista = [];
  let suma = 0;

  for (const parte of partes) {
    const [nombre, porcentajeStr] = parte.split(':');
    const porcentaje = parseFloat((porcentajeStr || '').trim());
    if (!nombre || !nombre.trim() || isNaN(porcentaje)) {
      mostrarErrorAsignacion('Formato incorrecto. Usa: Nombre:45, Nombre2:55');
      return;
    }
    suma += porcentaje;
    nuevaLista.push({ nombre: nombre.trim(), porcentaje });
  }

  if (Math.abs(suma - 100) > 0.1) {
    mostrarErrorAsignacion(`Los porcentajes suman ${suma}%, deben sumar 100%.`);
    return;
  }

  jugadoresLista = nuevaLista;
  asignacionNumeros = {};
  fichasRestantesPorJugador = {};

  // Números 1..36 mezclados (el 0 nunca se asigna)
  const numerosDisponibles = Array.from({ length: TOTAL_ASIGNABLES }, (_, i) => i + 1);
  for (let i = numerosDisponibles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numerosDisponibles[i], numerosDisponibles[j]] = [numerosDisponibles[j], numerosDisponibles[i]];
  }

  const cuotas = calcularCuotas(jugadoresLista);
  let indiceNumero = 0;

  jugadoresLista.forEach((jugador, idx) => {
    jugador.color = COLORES_JUGADORES[idx % COLORES_JUGADORES.length];
    jugador.cuota = cuotas[idx];
    jugador.numeros = [];

    if (modoAsignacion === 'aleatorio') {
      for (let c = 0; c < jugador.cuota; c++) {
        const num = numerosDisponibles[indiceNumero++];
        jugador.numeros.push(num);
        asignacionNumeros[num] = jugador.nombre;
      }
      fichasRestantesPorJugador[jugador.nombre] = 0;
    } else {
      fichasRestantesPorJugador[jugador.nombre] = jugador.cuota;
    }
  });

  turnoJugadorIndex = Math.max(0, siguienteConFichas(0));
  renderPanelAsignacion();
  actualizarTableroUI();
}

function actualizarTableroUI() {
  if (jugadoresLista.length === 0) return;
  const esManual = modoAsignacion === 'manual';
  const quedanFichas = siguienteConFichas(0) !== -1;
  const jugadorActual = jugadoresLista[turnoJugadorIndex];

  if (!esManual) {
    panelFichasEstado.textContent = 'Modo aleatorio: números ya asignados.';
  } else if (quedanFichas) {
    panelFichasEstado.innerHTML = `Turno de colocación: <span style="color:${jugadorActual.color}">${jugadorActual.nombre}</span> (Fichas: ${fichasRestantesPorJugador[jugadorActual.nombre]})`;
  } else {
    panelFichasEstado.textContent = '✅ Todas las fichas colocadas';
  }

  tableroApuestas.innerHTML = '';
  for (let i = 0; i <= 36; i++) {
    const casillaDiv = document.createElement('div');
    casillaDiv.style.padding = '5px';
    casillaDiv.style.textAlign = 'center';
    casillaDiv.style.borderRadius = '4px';
    casillaDiv.style.fontWeight = 'bold';
    casillaDiv.style.fontSize = '11px';
    casillaDiv.style.cursor = 'default';

    let colorFondo = '#1a1a1a';
    if (i === 0) colorFondo = '#006600';
    else if (numerosRojos.includes(i)) colorFondo = '#c40000';
    casillaDiv.style.background = colorFondo;
    casillaDiv.style.color = '#fff';
    casillaDiv.style.overflow = 'hidden';

    const ocupante = asignacionNumeros[i];
    if (ocupante) {
      const jug = jugadoresLista.find(j => j.nombre === ocupante);
      casillaDiv.innerHTML = `${i}<br><span style="font-size:8px; background:${jug ? jug.color : '#fff'}; color:#000; padding:1px 2px; border-radius:2px;">${ocupante}</span>`;
    } else {
      casillaDiv.textContent = i;
    }

    if (i === 0) {
      casillaDiv.style.opacity = '0.55';
      casillaDiv.style.cursor = 'not-allowed';
      casillaDiv.title = 'El 0 no se puede asignar';
    } else if (esManual && !ocupante && quedanFichas) {
      casillaDiv.style.cursor = 'pointer';
      casillaDiv.addEventListener('click', () => {
        const jAct = jugadoresLista[turnoJugadorIndex];
        if (!jAct || fichasRestantesPorJugador[jAct.nombre] <= 0 || asignacionNumeros[i]) return;

        asignacionNumeros[i] = jAct.nombre;
        jAct.numeros.push(i);
        fichasRestantesPorJugador[jAct.nombre]--;

        const sig = siguienteConFichas(turnoJugadorIndex + 1);
        if (sig !== -1) turnoJugadorIndex = sig;

        renderPanelAsignacion();
        actualizarTableroUI();
      });
    }

    tableroApuestas.appendChild(casillaDiv);
  }
}

btnModoAleatorio.addEventListener('click', () => {
  modoAsignacion = 'aleatorio';
  actualizarBotonesModo();
  asignarPorcentajes();
});
btnModoManual.addEventListener('click', () => {
  modoAsignacion = 'manual';
  actualizarBotonesModo();
  asignarPorcentajes();
});

document.getElementById('btn-asignar').addEventListener('click', asignarPorcentajes);
actualizarBotonesModo();
setTimeout(asignarPorcentajes, 100);

// 1. ESCENA Y CÁMARA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5.0, 4.5); 
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; 
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
document.body.appendChild(renderer.domElement);

// 1.5 LA MESA DE CASINO (Tapete verde)
const matMesa = new THREE.MeshStandardMaterial({ color: 0x00401a, roughness: 0.9, metalness: 0.0 });
const geometriaMesa = new THREE.PlaneGeometry(50, 50); 
const mesa = new THREE.Mesh(geometriaMesa, matMesa);
mesa.rotation.x = -Math.PI / 2; 
mesa.position.y = -0.2; 
mesa.receiveShadow = true; 
scene.add(mesa);

// 2. MATERIALES CLÁSICOS
const matMadera = new THREE.MeshStandardMaterial({ color: 0x5a2e15, roughness: 0.3 }); 
const matOro = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1.0, roughness: 0.15 });
const matNegro = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.3 }); 

// 3. CONSTRUCCIÓN DE LA RULETA
const rueda = new THREE.Group();
scene.add(rueda);

const borde = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.35, 32, 100), matMadera);
borde.rotation.x = Math.PI / 2;
borde.position.y = 0.25;
borde.scale.set(1, 1, 0.6); 
borde.receiveShadow = true;
borde.castShadow = true;
rueda.add(borde);

const paredInterior = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.12, 16, 100), matMadera);
paredInterior.rotation.x = Math.PI / 2;
paredInterior.position.y = 0.22;
paredInterior.castShadow = true;
paredInterior.receiveShadow = true;
rueda.add(paredInterior);

const pista = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.2, 16, 100), matNegro);
pista.rotation.x = Math.PI / 2;
pista.position.y = 0.15;
rueda.add(pista);

for (let i = 0; i < 8; i++) {
  const deflector = new THREE.Mesh(new THREE.OctahedronGeometry(0.08, 0), matOro);
  const angulo = (Math.PI / 4) * i;
  deflector.position.set(Math.cos(angulo) * 2.3, 0.35, Math.sin(angulo) * 2.3);
  deflector.rotation.y = -angulo;
  deflector.rotation.x = Math.PI / 2;
  deflector.scale.set(1, 0.5, 1);
  deflector.castShadow = true;
  rueda.add(deflector);
}

const torreta = new THREE.Group();
torreta.add(new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.8, 0.3, 32), matOro));
const pilar = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.8, 32), matOro);
pilar.position.y = 0.5;
torreta.add(pilar);
const bolaTop = new THREE.Mesh(new THREE.SphereGeometry(0.15, 32, 32), matOro);
bolaTop.position.y = 0.9;
torreta.add(bolaTop);
for (let i = 0; i < 4; i++) {
  const brazo = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 16), matOro);
  brazo.rotation.x = Math.PI / 2;
  brazo.rotation.z = (Math.PI / 4) * i;
  brazo.position.y = 0.5;
  torreta.add(brazo);
}
torreta.position.y = 0.15;
rueda.add(torreta);

const ang = (Math.PI * 2) / 37;
const posicionesCasillas = [];

const radioInterior = 1.1;
const radioBolsilloMax = 1.45;
const radioRampaMax = 2.0;
const alturaBolsillo = 0.025;
const alturaRampaInterior = 0.11;
const alturaRampaExterior = 0.34;
const margenAngular = 0.0015;
const segmentosPorCasilla = 8;

const matFondoBolsillo = new THREE.MeshStandardMaterial({ roughness: 0.38, metalness: 0.05, side: THREE.DoubleSide });
const matRampaCasilla = new THREE.MeshStandardMaterial({ roughness: 0.42, metalness: 0.05, side: THREE.DoubleSide });
const matMetalBolsillo = new THREE.MeshStandardMaterial({ color: 0xd5a52b, metalness: 0.8, roughness: 0.24 });
const matAlmohadilla = new THREE.MeshStandardMaterial({ color: 0x252525, roughness: 0.65, metalness: 0.0 });

function crearSuperficieRadial(a0, a1, r0, r1, h0, h1) {
  const vertices = [];
  const indices = [];
  for (let i = 0; i <= segmentosPorCasilla; i++) {
    const t = i / segmentosPorCasilla;
    const a = a0 + (a1 - a0) * t;
    vertices.push(r0 * Math.cos(a), h0, r0 * Math.sin(a), r1 * Math.cos(a), h1, r1 * Math.sin(a));
  }
  for (let i = 0; i < segmentosPorCasilla; i++) {
    const j = i * 2;
    indices.push(j, j + 2, j + 1, j + 1, j + 2, j + 3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function crearBarraEntre(puntoA, puntoB, radio) {
  const direccion = new THREE.Vector3().subVectors(puntoB, puntoA);
  const longitud = direccion.length();
  const barra = new THREE.Mesh(new THREE.CylinderGeometry(radio * 0.8, radio, longitud, 8), matMetalBolsillo);
  barra.position.copy(puntoA).add(puntoB).multiplyScalar(0.5);
  barra.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direccion.normalize());
  barra.castShadow = true;
  barra.receiveShadow = true;
  return barra;
}

const materialNumeros = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false, side: THREE.DoubleSide });
const texturasNumeros = new Map();

function obtenerTexturaNumero(numero) {
  if (texturasNumeros.has(numero)) return texturasNumeros.get(numero);
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 256, 256);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 112px Georgia';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(String(numero), 128, 130);
  const textura = new THREE.CanvasTexture(canvas);
  texturasNumeros.set(numero, textura);
  return textura;
}

ordenEuropeo.forEach((numero, indice) => {
  const a0 = indice * ang + margenAngular;
  const a1 = (indice + 1) * ang - margenAngular;
  const centro = (a0 + a1) / 2;
  const anguloLimite = indice * ang;

  posicionesCasillas.push({ numero: numero, anguloCentro: centro });

  let colorHex = 0x1a1a1a;
  if (numero === 0) colorHex = 0x006600;
  else if (numerosRojos.includes(numero)) colorHex = 0xc40000;

  const matFondo = matFondoBolsillo.clone();
  matFondo.color.setHex(colorHex);
  const matRampa = matRampaCasilla.clone();
  matRampa.color.setHex(colorHex);

  const fondo = new THREE.Mesh(crearSuperficieRadial(a0, a1, radioInterior, radioBolsilloMax, alturaBolsillo, alturaBolsillo), matFondo);
  fondo.receiveShadow = true;
  rueda.add(fondo);

  const rampa = new THREE.Mesh(crearSuperficieRadial(a0, a1, radioBolsilloMax, radioRampaMax, alturaRampaInterior, alturaRampaExterior), matRampa);
  rampa.receiveShadow = true; rampa.castShadow = true;
  rueda.add(rampa);

  const pIntA = new THREE.Vector3(Math.cos(anguloLimite) * radioInterior, alturaBolsillo + 0.025, Math.sin(anguloLimite) * radioInterior);
  const pIntB = new THREE.Vector3(Math.cos(anguloLimite) * radioBolsilloMax, alturaBolsillo + 0.025, Math.sin(anguloLimite) * radioBolsilloMax);
  rueda.add(crearBarraEntre(pIntA, pIntB, 0.018));

  const pRampA = new THREE.Vector3(Math.cos(anguloLimite) * radioBolsilloMax, alturaRampaInterior + 0.025, Math.sin(anguloLimite) * radioBolsilloMax);
  const pRampB = new THREE.Vector3(Math.cos(anguloLimite) * radioRampaMax, alturaRampaExterior + 0.025, Math.sin(anguloLimite) * radioRampaMax);
  rueda.add(crearBarraEntre(pRampA, pRampB, 0.014));

  const almohadilla = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 12), matAlmohadilla);
  almohadilla.scale.set(1.0, 0.18, 0.55);
  almohadilla.position.set(Math.cos(centro) * 1.29, alturaBolsillo + 0.006, Math.sin(centro) * 1.29);
  almohadilla.rotation.y = -centro;
  almohadilla.receiveShadow = true;
  rueda.add(almohadilla);

  const numeroMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.23, 0.23), materialNumeros.clone());
  numeroMesh.material.map = obtenerTexturaNumero(numero);
  numeroMesh.material.needsUpdate = true;
  const radioTexto = 1.72;
  const proporcion = (radioTexto - radioBolsilloMax) / (radioRampaMax - radioBolsilloMax);
  const alturaTexto = alturaRampaInterior + proporcion * (alturaRampaExterior - alturaRampaInterior) + 0.009;
  numeroMesh.position.set(Math.cos(centro) * radioTexto, alturaTexto, Math.sin(centro) * radioTexto);

  const radial = new THREE.Vector3(Math.cos(centro), 0, Math.sin(centro));
  const vertical = new THREE.Vector3(0, 1, 0);
  const tangente = new THREE.Vector3().crossVectors(radial, vertical).normalize();
  numeroMesh.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(tangente, radial, vertical));
  rueda.add(numeroMesh);
});

const anilloInterior = new THREE.Mesh(new THREE.TorusGeometry(radioInterior, 0.035, 12, 100), matOro);
anilloInterior.rotation.x = Math.PI / 2; anilloInterior.position.y = alturaBolsillo + 0.015;
rueda.add(anilloInterior);

const discoCentro = new THREE.Mesh(new THREE.CylinderGeometry(radioInterior, radioInterior, 0.12, 64), matMadera);
discoCentro.position.y = alturaBolsillo - 0.06;
rueda.add(discoCentro);

// 4. LA BOLA BLANCA
const bola = new THREE.Mesh(new THREE.SphereGeometry(0.09, 32, 32), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 }));
bola.castShadow = true;
scene.add(bola);

let estadoSorteo = 'reposo';
let anguloBola = 0;
let radioBola = 2.2;
let velocidadRueda = -0.002;
let velocidadBola = 0;
let tiempoGiro = 0;
let duracionSorteo = 5.0; 
let casillaGanadora = null;

const efectoFuego = document.getElementById('efecto-fuego');

function iniciarGiro() {
  ocultarCartel();
  detenerEspeciales();

  reproducirSonidoBoton();

  efectoFuego.style.opacity = '1';
  setTimeout(() => { efectoFuego.style.opacity = '0'; }, 800);

  estadoSorteo = 'girando';
  tiempoGiro = 0;
  casillaGanadora = null;

  velocidadRueda = -0.015;
  velocidadBola = 0.18; 
  radioBola = 2.2;
  anguloBola = Math.random() * Math.PI * 2;
}

document.getElementById('btn-girar').addEventListener('click', iniciarGiro);

function evaluarGanador(numeroGanador) {
  let nombreColor = "VERDE";
  let colorEstilo = "#00ff88";
  if (numeroGanador !== 0) {
    if (numerosRojos.includes(numeroGanador)) {
      nombreColor = "ROJO";
      colorEstilo = "#ff4444";
    } else {
      nombreColor = "NEGRO";
      colorEstilo = "#cccccc";
    }
  }

  const infoGanadora = `<span style="color:${colorEstilo};">${nombreColor} ${numeroGanador}</span>`;
  const ganadorFinal = asignacionNumeros[numeroGanador];
  let textoGanadorHistorial = "";

  if (numeroGanador === 0) {
    reproducirErika();
    mostrarCartel("¡RULETA GAMBLER!", "OTRA VICTORIA PARA Elaryan");
    textoGanadorHistorial = `0 (Verde) ➔ Elaryan (¡Erika!)`;
  } else {
    const esRojo7 = numeroGanador === 7;
    if (esRojo7) reproducirRojo7();
    else reproducirVictoria();

    const subtextoExtra = esRojo7 ? "Cuidado que asi banearon a Elaryan en GTA" : "";
    const sufijo = esRojo7 ? " (¡Rojo 7!)" : "";

    if (ganadorFinal) {
      mostrarCartel("EL GANADOR ES...", `${ganadorFinal} <br><span style="font-size: 20px; font-weight: normal;">Salió el ${infoGanadora}</span>`, subtextoExtra);
      textoGanadorHistorial = `${nombreColor} ${numeroGanador} ➔ ${ganadorFinal}${sufijo}`;
    } else {
      mostrarCartel("RESULTADO", `Salió el ${infoGanadora}`, subtextoExtra);
      textoGanadorHistorial = `${nombreColor} ${numeroGanador} ➔ Sin dueño${sufijo}`;
    }
  }

  historialGanadores.unshift(textoGanadorHistorial);
  panelHistorial.innerHTML = historialGanadores.map(h => `• ${h}`).join('<br>');
}

// 6. LUCES
const luzFoco = new THREE.SpotLight(0xffffff, 4.0); 
luzFoco.position.set(0, 10, 5);
luzFoco.castShadow = true;
scene.add(luzFoco);
scene.add(new THREE.DirectionalLight(0xffffff, 1.5).translateX(5).translateY(5));
scene.add(new THREE.AmbientLight(0xffffff, 1.2));

// 7. BUCLE DE ANIMACIÓN
let ultimoTiempo = performance.now();
let ultimoReboteAngulo = 0;

function animate(tiempoActual) {
  requestAnimationFrame(animate);
  const delta = (tiempoActual - ultimoTiempo) / 1000;
  ultimoTiempo = tiempoActual;

  actualizarYRenderizarFX();

  if (estadoSorteo === 'reposo') {
    velocidadRueda = THREE.MathUtils.lerp(velocidadRueda, 0, 0.08);
    rueda.rotation.y += velocidadRueda * delta * 60;

    if (casillaGanadora) {
      const anguloMundial = casillaGanadora.anguloCentro - rueda.rotation.y;
      bola.position.x = Math.cos(anguloMundial) * 1.28;
      bola.position.z = Math.sin(anguloMundial) * 1.28;
      bola.position.y = alturaBolsillo + 0.05;
    } else {
      bola.position.set(2.2, 0.22, 0);
    }
  } 
  else if (estadoSorteo === 'girando') {
    tiempoGiro += delta;
    const progreso = Math.min(tiempoGiro / duracionSorteo, 1.0);
    const factorFrenado = Math.pow(1.0 - progreso, 1.8);

    velocidadRueda = THREE.MathUtils.lerp(-0.001, -0.015, factorFrenado);
    rueda.rotation.y += velocidadRueda * delta * 60;

    velocidadBola = 0.18 * factorFrenado;
    anguloBola -= velocidadBola * delta * 60;

    if (Math.abs(anguloBola - ultimoReboteAngulo) > 0.8) {
      reproducirRebote();
      ultimoReboteAngulo = anguloBola;
    }

    radioBola = THREE.MathUtils.lerp(2.2, 1.28, Math.pow(progreso, 2.0));

    let alturaY = alturaBolsillo + 0.05;
    if (radioBola > radioBolsilloMax) {
      const t = (radioBola - radioBolsilloMax) / (radioRampaMax - radioBolsilloMax);
      alturaY = alturaRampaInterior + t * (alturaRampaExterior - alturaRampaInterior) + 0.05;
    }

    let boteVertical = (progreso > 0.1 && progreso < 0.8) ? Math.abs(Math.sin(anguloBola * 10)) * 0.03 : 0;

    bola.position.x = Math.cos(anguloBola) * radioBola;
    bola.position.z = Math.sin(anguloBola) * radioBola;
    bola.position.y = alturaY + boteVertical;

    if (progreso >= 1.0) {
      let anguloRelativo = anguloBola + rueda.rotation.y;
      anguloRelativo = ((anguloRelativo % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

      let mejorDistancia = Infinity;
      for (const casilla of posicionesCasillas) {
        let diferencia = Math.min(Math.abs(anguloRelativo - casilla.anguloCentro), Math.PI * 2 - Math.abs(anguloRelativo - casilla.anguloCentro));
        if (diferencia < mejorDistancia) {
          mejorDistancia = diferencia;
          casillaGanadora = casilla;
        }
      }

      estadoSorteo = 'reposo';
      evaluarGanador(casillaGanadora.numero);
    }
  }

  renderer.render(scene, camera);
}

// Mantiene la ruleta con el mismo tamaño relativo que en pantalla completa:
// si la ventana es más estrecha que 1920x915, la cámara se aleja para que quepa
const ASPECTO_REF = DISENO_W / DISENO_H;

function ajustarCamara() {
  const vista = medirVista();
  renderer.setSize(vista.w, vista.h);
  const aspecto = vista.w / vista.h;
  const factor = Math.max(1, ASPECTO_REF / aspecto);

  camera.aspect = aspecto;
  camera.position.set(0, 5.0 * factor, 4.5 * factor);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', () => {
  ajustarCamara();
  ajustarImagenes();
});

ajustarCamara();
ajustarImagenes();

animate(performance.now());