import './style.css';
import * as THREE from 'three';

// --- INTERFAZ HTML LATERAL EN VERTICAL ---
const uiContainer = document.createElement('div');
uiContainer.style.position = 'absolute';
uiContainer.style.top = '20px';
uiContainer.style.left = '20px';
uiContainer.style.width = '320px';
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
    <span style="font-size: 11px; color: #aaa;">Música de Fondo (Playlist):</span>
    <button id="btn-musica" style="background:#444; color:white; border:none; padding:4px 10px; border-radius:4px; cursor:pointer; font-weight:bold; font-size:11px;">MUTED 🔇</button>
  </div>

  <div style="display: flex; flex-direction: column; gap: 4px;">
    <div style="font-size: 11px; color: #aaa;">Participantes y porcentajes (Deben sumar 100%):</div>
    <textarea id="input-jugadores" rows="2" style="width: 100%; padding: 6px; border-radius: 6px; border: 1px solid #444; background: #222; color: #fff; font-size: 11px; resize: none;">Jorge:45, Manuel:25, Elaryan:30</textarea>
    <button id="btn-asignar" style="background:#0088ff; color:white; border:none; padding:6px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:12px;">Asignar Porcentajes y Fichas</button>
  </div>

  <div style="font-size: 11px; font-weight: bold; color: #00ff88; border-top: 1px solid #333; padding-top: 4px;">Numeritos:</div>
  <div id="panel-asignacion" style="font-size: 10px; color: #ddd; max-height: 80px; overflow-y: auto; background: rgba(255,255,255,0.05); padding: 6px; border-radius: 6px; display: flex; flex-direction: column; gap: 4px;"></div>

  <div style="font-size: 11px; font-weight: bold; color: #ffd700; border-top: 1px solid #333; padding-top: 4px;">Tablero de Fichas (Haz clic para apostar):</div>
  <div id="panel-fichas-estado" style="font-size: 11px; color: #00ffaa; font-weight: bold;"></div>
  <div id="tablero-apuestas" style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 3px; max-height: 120px; overflow-y: auto; background: rgba(0,64,26,0.8); padding: 6px; border-radius: 6px; border: 1px solid #ffd700;"></div>

  <div style="font-size: 11px; font-weight: bold; color: #ffd700; border-top: 1px solid #333; padding-top: 4px;">Historial de Ganadores:</div>
  <div id="panel-historial" style="font-size: 10px; color: #ffcc00; max-height: 60px; overflow-y: auto; background: rgba(0,0,0,0.5); padding: 6px; border-radius: 6px;">Sin tiradas todavía.</div>

  <button id="btn-girar" style="position: relative; overflow: hidden; background:#00aa55; color:white; border:none; padding:10px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:14px;">
    <span id="texto-btn-girar">ES HORA DEL GAMBLING!</span>
    <div id="efecto-fuego" style="position: absolute; inset:0; background: radial-gradient(circle, rgba(255,69,0,0.8) 0%, transparent 80%); opacity: 0; pointer-events: none; transition: opacity 0.2s;"></div>
  </button>
`;
document.body.appendChild(uiContainer);


// --- IMAGEN FLOTANTE ABAJO A LA DERECHA ---
const imagenEsquina1 = document.createElement('img');
imagenEsquina1.src = './monster rain.gif'; // Cambia 'foto.png' por el nombre exacto de tu archivo
imagenEsquina1.style.position = 'fixed';
imagenEsquina1.style.bottom = '400px'; // Un poco más arriba del texto de autor
imagenEsquina1.style.right = '-60px';
imagenEsquina1.style.width = 'clamp(400px, 10vw, 120px)'
imagenEsquina1.style.height = 'auto';
imagenEsquina1.style.borderRadius = '8px';
imagenEsquina1.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0)';
imagenEsquina1.style.zIndex = '100';
imagenEsquina1.style.pointerEvents = 'none';
document.body.appendChild(imagenEsquina1);

// --- SEGUNDA IMAGEN FLOTANTE ---
const imagenEsquina2 = document.createElement('img');
imagenEsquina2.src = './cigs.gif'; // Nombre de tu segunda foto en la carpeta public
imagenEsquina2.style.position = 'fixed';
imagenEsquina2.style.bottom = '15px'; // Altura donde se colocará
imagenEsquina2.style.right = '390px'; // Distancia desde la derecha (para ponerla al lado de la otra)
imagenEsquina2.style.width = 'clamp(100px, 10vw, 120px)'
imagenEsquina2.style.height = 'auto';
imagenEsquina2.style.borderRadius = '8px';
imagenEsquina2.style.boxShadow = '0 4px 16px rgba(0,0,0,0)';
imagenEsquina2.style.zIndex = '100';
imagenEsquina2.style.pointerEvents = 'none';
document.body.appendChild(imagenEsquina2);

// --- TERCERA IMAGEN FLOTANTE ---
const imagenEsquina3 = document.createElement('img');
imagenEsquina3.src = './cat.gif'; // Nombre de tu tercera foto en la carpeta public
imagenEsquina3.style.position = 'fixed';
imagenEsquina3.style.bottom = '430px'; // Altura donde se colocará
imagenEsquina3.style.right = '680px'; // Distancia desde la derecha (para ponerla al lado de la otra)
imagenEsquina3.style.width = 'clamp(200px, 10vw, 120px)';  // Ancho de la imagen
imagenEsquina3.style.height = 'auto';
imagenEsquina3.style.borderRadius = '8px';
imagenEsquina3.style.boxShadow = '0 4px 16px rgba(0,0,0,0)';
imagenEsquina3.style.zIndex = '100';
imagenEsquina3.style.pointerEvents = 'none';
document.body.appendChild(imagenEsquina3);

// --- IMAGEN FLOTANTE ABAJO A LA DERECHA ---
const imagenEsquina5 = document.createElement('img');
imagenEsquina5.src = './MonsterW.png'; // Cambia 'foto.png' por el nombre exacto de tu archivo
imagenEsquina5.style.position = 'fixed';
imagenEsquina5.style.bottom = '0px'; // Un poco más arriba del texto de autor
imagenEsquina5.style.right = '-150px';
imagenEsquina5.style.width = 'clamp(555px, 10vw, 120px)';  // Ajusta el tamaño como prefieras
imagenEsquina5.style.height = 'auto';
imagenEsquina5.style.borderRadius = '8px';
imagenEsquina5.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0)';
imagenEsquina5.style.zIndex = '100';
imagenEsquina5.style.pointerEvents = 'none';
document.body.appendChild(imagenEsquina5);

// --- IMAGEN FLOTANTE ABAJO A LA DERECHA ---
const imagenEsquina6 = document.createElement('img');
imagenEsquina6.src = './goth baddie.png'; // Cambia 'foto.png' por el nombre exacto de tu archivo
imagenEsquina6.style.position = 'fixed';
imagenEsquina6.style.bottom = '0px'; // Un poco más arriba del texto de autor
imagenEsquina6.style.right = '-20px';
imagenEsquina6.style.width = 'clamp(445px, 10vw, 120px)';  // Ajusta el tamaño como prefieras
imagenEsquina6.style.height = 'auto';
imagenEsquina6.style.borderRadius = '8px';
imagenEsquina6.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0)';
imagenEsquina6.style.zIndex = '100';
imagenEsquina6.style.pointerEvents = 'none';
document.body.appendChild(imagenEsquina6);

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

// --- PLAYLIST DE MÚSICA DE FONDO ---
const playlist = [
  './deftones.mp3',
  './deftones2.mp3',
  './deftones3.mp3'
];

let indiceCancionActual = 0;
const audioFondo = new Audio(playlist[indiceCancionActual]);
audioFondo.volume = 0.5;

// Pasar automáticamente a la siguiente canción de la playlist al terminar
audioFondo.addEventListener('ended', () => {
  indiceCancionActual = (indiceCancionActual + 1) % playlist.length;
  audioFondo.src = playlist[indiceCancionActual];
  if (musicaActiva) {
    audioFondo.play().catch(() => {});
  }
});

let musicaActiva = false;
document.getElementById('btn-musica').addEventListener('click', () => {
  musicaActiva = !musicaActiva;
  const btn = document.getElementById('btn-musica');
  if (musicaActiva) {
    audioFondo.play().catch(() => {});
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
    audioFondo.play().catch(() => {});
  }
});

// Cuando termina el audio del Rojo 7, reanudamos la música de fondo si estaba activada
audioRojo7.addEventListener('ended', () => {
  if (musicaActiva) {
    audioFondo.play().catch(() => {});
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
  if (musicaActiva) audioFondo.play().catch(() => {});
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

  cartelCentro.style.transform = 'translate(-50%, -50%) scale(1)';
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

let asignacionNumeros = {}; 
let historialGanadores = [];
let jugadoresLista = [];
let turnoJugadorIndex = 0;
let fichasRestantesPorJugador = {}; 
let apuestasEnTablero = {}; 

const panelAsignacion = document.getElementById('panel-asignacion');
const panelHistorial = document.getElementById('panel-historial');
const tableroApuestas = document.getElementById('tablero-apuestas');
const panelFichasEstado = document.getElementById('panel-fichas-estado');

function asignarPorcentajes() {
  ocultarCartel();
  historialGanadores = [];
  panelHistorial.textContent = "Sin tiradas todavía.";
  apuestasEnTablero = {};

  const textoInput = document.getElementById('input-jugadores').value;
  const partes = textoInput.split(',');
  
  jugadoresLista = [];
  let sumaPorcentajes = 0;

  for (let parte of partes) {
    const [nombre, porcentajeStr] = parte.split(':');
    if (!nombre || !porcentajeStr) return;
    const porcentaje = parseFloat(porcentajeStr.trim());
    if (isNaN(porcentaje)) return;
    sumaPorcentajes += porcentaje;
    jugadoresLista.push({ nombre: nombre.trim(), porcentaje });
  }

  if (Math.abs(sumaPorcentajes - 100) > 0.1) return;

  const todosLosNumeros = Array.from({length: 37}, (_, i) => i);
  for (let i = todosLosNumeros.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [todosLosNumeros[i], todosLosNumeros[j]] = [todosLosNumeros[j], todosLosNumeros[i]];
  }

  asignacionNumeros = {};
  fichasRestantesPorJugador = {};
  let indiceNumero = 0;
  let resumenHTML = '';

  jugadoresLista.forEach((jugador, idxColor) => {
    const colorAsignado = ['#ff4444', '#3388ff', '#ffaa00', '#aa44ff', '#00ffaa'][idxColor % 5];
    const cantidadCasillas = Math.max(1, Math.round((jugador.porcentaje / 100) * 37));
    
    jugador.numeros = [];
    jugador.color = colorAsignado;
    for (let c = 0; c < cantidadCasillas && indiceNumero < todosLosNumeros.length; c++) {
      const num = todosLosNumeros[indiceNumero++];
      jugador.numeros.push(num);
      asignacionNumeros[num] = jugador.nombre;
    }

    fichasRestantesPorJugador[jugador.nombre] = Math.max(1, Math.round(jugador.porcentaje / 10));

    resumenHTML += `<div><span style="color:${colorAsignado}; font-weight:bold;">${jugador.nombre} (${jugador.porcentaje}%):</span> [${jugador.numeros.join(', ')}]</div>`;
  });

  panelAsignacion.innerHTML = resumenHTML;
  turnoJugadorIndex = 0;
  actualizarTableroUI();
}

function actualizarTableroUI() {
  if (jugadoresLista.length === 0) return;
  const jugadorActual = jugadoresLista[turnoJugadorIndex];
  panelFichasEstado.innerHTML = `Turno de colocación: <span style="color:${jugadorActual.color}">${jugadorActual.nombre}</span> (Fichas: ${fichasRestantesPorJugador[jugadorActual.nombre] || 0})`;

  tableroApuestas.innerHTML = '';
  for (let i = 0; i <= 36; i++) {
    const casillaDiv = document.createElement('div');
    casillaDiv.style.padding = '5px';
    casillaDiv.style.textAlign = 'center';
    casillaDiv.style.borderRadius = '4px';
    casillaDiv.style.cursor = 'pointer';
    casillaDiv.style.fontWeight = 'bold';
    casillaDiv.style.fontSize = '11px';

    let colorFondo = '#1a1a1a';
    if (i === 0) colorFondo = '#006600';
    else if (numerosRojos.includes(i)) colorFondo = '#c40000';
    casillaDiv.style.background = colorFondo;
    casillaDiv.style.color = '#fff';

    const ocupante = apuestasEnTablero[i];
    if (ocupante) {
      const jug = jugadoresLista.find(j => j.nombre === ocupante);
      casillaDiv.innerHTML = `${i}<br><span style="font-size:8px; background:${jug ? jug.color : '#fff'}; color:#000; padding:1px 2px; border-radius:2px;">${ocupante}</span>`;
    } else {
      casillaDiv.textContent = i;
    }

    casillaDiv.addEventListener('click', () => {
      const jAct = jugadoresLista[turnoJugadorIndex];
      if (fichasRestantesPorJugador[jAct.nombre] > 0 && !apuestasEnTablero[i]) {
        apuestasEnTablero[i] = jAct.nombre;
        fichasRestantesPorJugador[jAct.nombre]--;
        turnoJugadorIndex = (turnoJugadorIndex + 1) % jugadoresLista.length;
        actualizarTableroUI();
      }
    });

    tableroApuestas.appendChild(casillaDiv);
  }
}

document.getElementById('btn-asignar').addEventListener('click', asignarPorcentajes);
setTimeout(asignarPorcentajes, 100);

// 1. ESCENA Y CÁMARA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5.0, 4.5); 
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
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

  let infoGanadora = `<span style="color:${colorEstilo};">${nombreColor} ${numeroGanador}</span>`;
  const propietarioAsignado = asignacionNumeros[numeroGanador];
  const propietarioApuesta = apuestasEnTablero[numeroGanador];

  let ganadorFinal = propietarioApuesta || propietarioAsignado;
  let textoGanadorHistorial = "";

  if (numeroGanador === 0) {
    reproducirErika();
    mostrarCartel("¡RULETA GAMBLER!", "OTRA VICTORIA PARA Elaryan");
    textoGanadorHistorial = `0 (Verde) ➔ Elaryan (¡Erika!)`;
  } else if (numeroGanador === 7 && numerosRojos.includes(7)) {
    reproducirRojo7();
    let subtextoExtra = "Cuidado que asi banearon a Elaryan en GTA";
    if (ganadorFinal) {
      mostrarCartel("EL GANADOR ES...", `${ganadorFinal} <br><span style="font-size: 20px; font-weight: normal;">Salió el ${infoGanadora}</span>`, subtextoExtra);
      textoGanadorHistorial = `ROJO 7 ➔ ${ganadorFinal} ${propietarioApuesta ? '(por apuesta)' : ''} (¡Rojo 7!)`;
    } else {
      mostrarCartel("RESULTADO", `Salió el ${infoGanadora}`, subtextoExtra);
      textoGanadorHistorial = `ROJO 7 ➔ Sin dueño (¡Rojo 7!)`;
    }
  } else {
    reproducirVictoria();
    let subtextoExtra = "";
    if (numeroGanador === 7) {
      subtextoExtra = "Cuidado que asi banearon a Elaryan en GTA";
    }

    if (ganadorFinal) {
      mostrarCartel("EL GANADOR ES...", `${ganadorFinal} <br><span style="font-size: 20px; font-weight: normal;">Salió el ${infoGanadora}</span>`, subtextoExtra);
      textoGanadorHistorial = `${nombreColor} ${numeroGanador} ➔ ${ganadorFinal} ${propietarioApuesta ? '(por apuesta)' : ''}`;
    } else {
      mostrarCartel("RESULTADO", `Salió el ${infoGanadora}`, subtextoExtra);
      textoGanadorHistorial = `${nombreColor} ${numeroGanador} ➔ Sin dueño`;
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

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate(performance.now());