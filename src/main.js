import * as THREE from 'three';

// --- IDIOMAS (ES / EN) ---
const TEXTOS = {
  es: {
    welcome_titulo: 'BIENVENIDO AL GAMBLINGFICADOR',
    welcome_pide: 'Introduce el código de acceso',
    welcome_placeholder: 'Código numérico',
    welcome_entrar: 'ENTRAR',
    welcome_error: '❌ Código incorrecto. Inténtalo de nuevo.',
    panel_tamano: 'Tamaño del panel:',
    tab_participantes: '👥 Participantes',
    tab_sino: '✅ Sí / No',
    info_sino: 'Sí 50% · No 50%. Los números se reparten siempre al azar.',
    lbl_participantes: 'PARTICIPANTES (Deben sumar 100%):',
    modo_aleatorio: '🎲 Aleatorio',
    modo_manual: '🖐️ Manual',
    btn_asignar: 'Asignar Porcentajes y Fichas',
    btn_repartir: '🎲 Repartir números al azar',
    numeritos: 'Numeritos:',
    tablero_azar: 'TABLERO (números asignados al azar):',
    fichas_manual: 'FICHAS (haz clic en un número para reclamarlo):',
    hall: 'HALL DE LOS GANADORES:',
    sin_tiradas: 'Sin tiradas todavía.',
    btn_girar: 'ES HORA DEL GAMBLING!',
    err_formato: 'Formato incorrecto. Usa: Nombre:45, Nombre2:55',
    err_suma: 'Los porcentajes suman {suma}%, deben sumar 100%.',
    faltan: ' · faltan {n}',
    estado_aleatorio: 'Modo aleatorio: números ya asignados.',
    turno_colocacion: 'Turno de colocación:',
    fichas: 'Fichas',
    estado_todas: '✅ Todas las fichas colocadas',
    casilla_cero: 'El 0 no se puede asignar',
    color_rojo: 'ROJO',
    color_negro: 'NEGRO',
    color_verde: 'VERDE',
    cartel_ganador: 'EL GANADOR ES...',
    cartel_respuesta: 'LA RESPUESTA ES...',
    cartel_resultado: 'RESULTADO',
    salio_el: 'Salió el',
    cero_titulo: '¡RULETA GAMBLER!',
    cero_texto: 'OTRA VICTORIA PARA Elaryan',
    cero_hist: '0 (Verde) ➔ Elaryan (¡Erika!)',
    rojo7_sub: 'Cuidado que asi banearon a Elaryan en GTA',
    rojo7_sufijo: ' (¡Rojo 7!)',
    sin_dueno: 'Sin dueño',
    si: 'Sí',
    no: 'No',
    gira_movil: 'Gira el móvil para jugar en horizontal'
  },
  en: {
    welcome_titulo: 'WELCOME TO THE GAMBLINGFICADOR',
    welcome_pide: 'Enter the access code',
    welcome_placeholder: 'Numeric code',
    welcome_entrar: 'ENTER',
    welcome_error: '❌ Wrong code. Try again.',
    panel_tamano: 'Panel size:',
    tab_participantes: '👥 Players',
    tab_sino: '✅ Yes / No',
    info_sino: 'Yes 50% · No 50%. Numbers are always assigned at random.',
    lbl_participantes: 'PLAYERS (must add up to 100%):',
    modo_aleatorio: '🎲 Random',
    modo_manual: '🖐️ Manual',
    btn_asignar: 'Assign Percentages & Chips',
    btn_repartir: '🎲 Shuffle numbers',
    numeritos: 'Numbers:',
    tablero_azar: 'BOARD (numbers assigned at random):',
    fichas_manual: 'CHIPS (click a number to claim it):',
    hall: 'HALL OF WINNERS:',
    sin_tiradas: 'No spins yet.',
    btn_girar: "IT'S GAMBLING TIME!",
    err_formato: 'Wrong format. Use: Name:45, Name2:55',
    err_suma: 'Percentages add up to {suma}%, they must add up to 100%.',
    faltan: ' · {n} left',
    estado_aleatorio: 'Random mode: numbers already assigned.',
    turno_colocacion: 'Placing turn:',
    fichas: 'Chips',
    estado_todas: '✅ All chips placed',
    casilla_cero: '0 cannot be assigned',
    color_rojo: 'RED',
    color_negro: 'BLACK',
    color_verde: 'GREEN',
    cartel_ganador: 'THE WINNER IS...',
    cartel_respuesta: 'THE ANSWER IS...',
    cartel_resultado: 'RESULT',
    salio_el: 'It landed on',
    cero_titulo: 'GAMBLER ROULETTE!',
    cero_texto: 'ANOTHER WIN FOR Elaryan',
    cero_hist: '0 (Green) ➔ Elaryan (Erika!)',
    rojo7_sub: "Careful, that's how Elaryan got banned in GTA",
    rojo7_sufijo: ' (Red 7!)',
    sin_dueno: 'No owner',
    si: 'Yes',
    no: 'No',
    gira_movil: 'Rotate your phone to play in landscape'
  }
};

let idioma = 'es';
try {
  const guardado = localStorage.getItem('gamblingficador-idioma');
  if (guardado === 'es' || guardado === 'en') idioma = guardado;
  else if (!String(navigator.language || 'es').toLowerCase().startsWith('es')) idioma = 'en';
} catch (e) {}

function t(clave, vars) {
  let texto = (TEXTOS[idioma] && TEXTOS[idioma][clave]) ?? TEXTOS.es[clave] ?? clave;
  if (vars) for (const k in vars) texto = texto.split('{' + k + '}').join(vars[k]);
  return texto;
}

// --- PANTALLA DE ACCESO CON CÓDIGO NUMÉRICO ---

const CODIGO_ACCESO = '91167'; // CAMBIA ESTO POR TU CÓDIGO

const startBtn = document.getElementById('start-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const accessForm = document.getElementById('access-form');
const accessCode = document.getElementById('access-code');
const accessError = document.getElementById('access-error');

// Botones de idioma de la pantalla de inicio
document.querySelectorAll('[data-lang]').forEach((boton) => {
  boton.addEventListener('click', () => {
    idioma = boton.dataset.lang;
    try { localStorage.setItem('gamblingficador-idioma', idioma); } catch (e) {}
    aplicarIdioma();
    refrescarTextosDinamicos();
  });
});

if (accessForm && welcomeScreen) {
  accessForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const codigoIntroducido = accessCode.value.trim();

    // Comprobar el código
    if (codigoIntroducido !== CODIGO_ACCESO) {
      accessError.textContent = t('welcome_error');
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

  <div style="display: flex; gap: 8px; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.05); padding: 6px 10px; border-radius: 6px;">
    <span data-i18n="panel_tamano" style="font-size: 11px; color: #aaa;">Tamaño del panel:</span>
    <div style="display: flex; gap: 4px;">
      <button id="btn-zoom-menos" style="background:#444; color:white; border:none; width:30px; padding:4px 0; border-radius:4px; cursor:pointer; font-weight:bold; font-size:12px;">A−</button>
      <button id="btn-zoom-reset" style="background:#444; color:white; border:none; min-width:46px; padding:4px 6px; border-radius:4px; cursor:pointer; font-weight:bold; font-size:11px;">100%</button>
      <button id="btn-zoom-mas" style="background:#444; color:white; border:none; width:30px; padding:4px 0; border-radius:4px; cursor:pointer; font-weight:bold; font-size:12px;">A+</button>
    </div>
  </div>

  <div style="display:flex; gap:6px;">
    <button id="tab-participantes" data-i18n="tab_participantes" style="flex:1; background:#ffd700; color:#000; border:none; padding:7px 4px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:11px;">👥 Participantes</button>
    <button id="tab-sino" data-i18n="tab_sino" style="flex:1; background:#333; color:#fff; border:none; padding:7px 4px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:11px;">✅ Sí / No</button>
  </div>

  <div style="display: flex; flex-direction: column; gap: 4px;">
    <div id="lbl-participantes" data-i18n="lbl_participantes" style="font-size: 11px; color: #aaa;">PARTICIPANTES (Deben sumar 100%):</div>
    <div id="info-sino" data-i18n="info_sino" style="display:none; font-size: 11px; color:#cfe; background: rgba(255,255,255,0.06); padding:6px 8px; border-radius:6px;"></div>
    <textarea id="input-jugadores" rows="2" style="width: 100%; padding: 6px; border-radius: 6px; border: 1px solid #444; background: #222; color: #fff; font-size: 11px; resize: none;">Paco Sanz:45, Erdogan:25, Netanyahu:30</textarea>
    <div id="fila-modos" style="display:flex; gap:6px;">
      <button id="btn-modo-aleatorio" data-i18n="modo_aleatorio" style="flex:1; background:#0088ff; color:white; border:none; padding:5px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:11px;">🎲 Aleatorio</button>
      <button id="btn-modo-manual" data-i18n="modo_manual" style="flex:1; background:#333; color:white; border:none; padding:5px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:11px;">🖐️ Manual</button>
    </div>
    <button id="btn-asignar" data-i18n="btn_asignar" style="background:#0088ff; color:white; border:none; padding:6px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:12px;">Asignar Porcentajes y Fichas</button>
  </div>

  <div data-i18n="numeritos" style="font-size: 11px; font-weight: bold; color: #00ff88; border-top: 1px solid #333; padding-top: 4px;">Numeritos:</div>
  <div id="panel-asignacion" style="font-size: 10px; color: #ddd; max-height: 80px; overflow-y: auto; background: rgba(255,255,255,0.05); padding: 6px; border-radius: 6px; display: flex; flex-direction: column; gap: 4px;"></div>

  <div id="titulo-fichas" style="font-size: 11px; font-weight: bold; color: #ffd700; border-top: 1px solid #333; padding-top: 4px;">FICHAS</div>
  <div id="panel-fichas-estado" style="font-size: 11px; color: #00ffaa; font-weight: bold;"></div>
  <div id="tablero-apuestas" style="display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 3px; max-height: 120px; overflow-y: auto; background: rgba(0,64,26,0.8); padding: 6px; border-radius: 6px; border: 1px solid #ffd700;"></div>

  <div data-i18n="hall" style="font-size: 11px; font-weight: bold; color: #ffd700; border-top: 1px solid #333; padding-top: 4px;">HALL DE LOS GANADORES:</div>
  <div id="panel-historial" style="font-size: 10px; color: #ffcc00; max-height: 60px; overflow-y: auto; background: rgba(0,0,0,0.5); padding: 6px; border-radius: 6px;">Sin tiradas todavía.</div>

  <button id="btn-girar" style="position: relative; overflow: hidden; background:#00aa55; color:white; border:none; padding:10px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:14px;">
    <span id="texto-btn-girar" data-i18n="btn_girar">ES HORA DEL GAMBLING!</span>
    <div id="efecto-fuego" style="position: absolute; inset:0; background: radial-gradient(circle, rgba(255,69,0,0.8) 0%, transparent 80%); opacity: 0; pointer-events: none; transition: opacity 0.2s;"></div>
  </button>
`;
document.body.appendChild(uiContainer);
uiContainer.id = 'panel-principal';
// Sin esto, en pantallas bajas los bloques con scroll interno se encogen en vez de dejar
// que el panel entero haga scroll, y la tabla queda cortada
Array.from(uiContainer.children).forEach((hijo) => { hijo.style.flexShrink = '0'; });


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
// Móvil (no tablet): también cuando el navegador pide la "versión de escritorio"
const ES_MOVIL = ES_TACTIL && Math.min(window.screen.width, window.screen.height) < 600;

// --- TAMAÑO DEL PANEL (botones A− / 100% / A+) ---
const NIVELES_ZOOM_PANEL = [0.85, 1, 1.25, 1.5, 1.75];
const INDICE_ZOOM_NORMAL = 1;
let indiceZoomPanel = INDICE_ZOOM_NORMAL;
try {
  const guardado = parseInt(localStorage.getItem('gamblingficador-zoom-panel'), 10);
  if (guardado >= 0 && guardado < NIVELES_ZOOM_PANEL.length) indiceZoomPanel = guardado;
} catch (e) {}

function zoomPanel() {
  return NIVELES_ZOOM_PANEL[indiceZoomPanel];
}

function cambiarZoomPanel(nuevoIndice) {
  indiceZoomPanel = Math.max(0, Math.min(NIVELES_ZOOM_PANEL.length - 1, nuevoIndice));
  try { localStorage.setItem('gamblingficador-zoom-panel', String(indiceZoomPanel)); } catch (e) {}
  ajustarImagenes();
}

document.getElementById('btn-zoom-menos').addEventListener('click', () => cambiarZoomPanel(indiceZoomPanel - 1));
document.getElementById('btn-zoom-mas').addEventListener('click', () => cambiarZoomPanel(indiceZoomPanel + 1));
document.getElementById('btn-zoom-reset').addEventListener('click', () => cambiarZoomPanel(INDICE_ZOOM_NORMAL));

// iOS Safari ignora user-scalable=no: bloqueamos el zoom con dos dedos a mano
['gesturestart', 'gesturechange', 'gestureend'].forEach((ev) => {
  document.addEventListener(ev, (e) => e.preventDefault());
});

// --- LAYOUT PROPORCIONAL (diseño de referencia: 1920x915) ---
const DISENO_W = 1920;
const DISENO_H = 915;
let escalaUI = 1;

// tipo de anclaje (para que en cualquier pantalla se vea como en escritorio):
//  'rueda'   -> pegada a la ruleta (se coloca respecto al centro de la ruleta)
//  'suelo'   -> abajo a la izquierda de la ruleta (como en escritorio, pegada al borde de abajo)
//  'borde'   -> pegada abajo a la derecha, ocupando más alto cuando la pantalla es más alta
//  'lluvia'  -> pegada ARRIBA a la derecha, para que las latas empiecen en el borde superior
const configImagenes = [
  { el: imagenEsquina1, bottom: 500, right: -75,  width: 576, tipo: 'lluvia' }, // monster rain
  { el: imagenEsquina2, bottom: 15,  right: 1500, width: 150, tipo: 'suelo' },  // cigs
  { el: imagenEsquina3, bottom: 600, right: 1100, width: 300, tipo: 'rueda' },  // cat
  { el: imagenEsquina5, bottom: -50, right: -150, width: 750, tipo: 'borde' },  // MonsterW
  { el: imagenEsquina6, bottom: 0,   right: -20,  width: 576, tipo: 'borde' },  // goth baddie
];

// Cuánto crecen la chica, las latas blancas y la lluvia cuando la pantalla es más alta que
// la de escritorio (0 = solo proporcional al ancho, 1 = ocupan toda la altura como en escritorio).
const CRECE_CON_ALTURA_HORIZONTAL = 0.75;
const CRECE_CON_ALTURA_VERTICAL = 0.25;
// Qué parte de ese crecimiento se "esconde" por el borde derecho para no tapar la ruleta (0 a 1)
const RECORTE_BORDE_DERECHO = 0.5;
// Dónde empieza la lluvia de latas respecto al borde superior (px de diseño, negativo = fuera)
const LLUVIA_TOP_DISENO = -30;

// Capa que contiene las imágenes flotantes. En vertical solo cubre la zona de la ruleta
// y se desvanece por abajo, para que las imágenes no queden cortadas en seco sobre la mesa.
const capaImagenes = document.createElement('div');
capaImagenes.style.position = 'fixed';
capaImagenes.style.left = '0';
capaImagenes.style.top = '0';
capaImagenes.style.width = '100%';
capaImagenes.style.overflow = 'hidden';
capaImagenes.style.pointerEvents = 'none';
capaImagenes.style.zIndex = '100';
document.body.appendChild(capaImagenes);
configImagenes.forEach(({ el }) => {
  el.style.position = 'absolute';
  capaImagenes.appendChild(el);
});

// En vertical (móvil, tablet en vertical) la pantalla se reparte:
// arriba la ruleta y abajo el panel, que así se puede leer y usar.
const FRACCION_PANEL_VERTICAL = 0.55; // parte de la altura que ocupa el panel
const ANCHO_PANEL_VERTICAL = 290;     // ancho de diseño del panel en vertical (px)

// Móvil en vertical: la ruleta ocupa casi todo el ancho y las imágenes se juntan en la esquina
const FRACCION_ANCHO_RULETA_MOVIL = 0.86;    // qué parte del ancho ocupa la ruleta (0 a 1)
const ESCALA_DECORACION_MOVIL_VERTICAL = 0.7; // tamaño de la chica / latas respecto a la ruleta
const FRACCION_ANCHO_RULETA_DISENO = 0.52;    // (medido en escritorio: no tocar)
const ANCHO_RULETA_DISENO = 1005;             // (medido en escritorio: no tocar)
// Si lo pones en true, en móvil en vertical sale un aviso para girar el móvil
const AVISO_GIRAR_MOVIL = false;
let factorCamara = 1;

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
  const movilVertical = vista.vertical && ES_MOVIL;
  if (movilVertical) {
    // La ruleta ocupa más ancho en el móvil: el "escenario" se escala igual que ella
    const aspectoVista = vista.w / vista.h;
    escalaUI = (FRACCION_ANCHO_RULETA_DISENO * (ASPECTO_REF / aspectoVista) / factorCamara) * vista.w / ANCHO_RULETA_DISENO;
  }

  // Imágenes flotantes (posiciones relativas a la capa, anclada abajo a la derecha)
  capaImagenes.style.height = vista.vertical ? vista.h + 'px' : '100%';
  const desvanecer = vista.vertical ? 'linear-gradient(to bottom, #000 calc(100% - 40px), transparent 100%)' : 'none';
  capaImagenes.style.maskImage = desvanecer;
  capaImagenes.style.webkitMaskImage = desvanecer;

  // El "escenario" de diseño (1920x915) se escala al ancho/alto disponible y se centra:
  // dx/dy es el hueco que sobra a cada lado (la ruleta siempre queda en el centro).
  const escalaAlto = vista.h / DISENO_H;
  const crece = vista.vertical ? CRECE_CON_ALTURA_VERTICAL : CRECE_CON_ALTURA_HORIZONTAL;
  const escalaBorde = movilVertical ? escalaUI * ESCALA_DECORACION_MOVIL_VERTICAL : escalaUI + crece * (escalaAlto - escalaUI);
  const dx = (vista.w - DISENO_W * escalaUI) / 2;
  const dy = (vista.h - DISENO_H * escalaUI) / 2;

  configImagenes.forEach(({ el, bottom, right, width, tipo }) => {
    el.style.display = 'block';
    let sc = escalaUI;
    let der = right * escalaUI;
    let aba = bottom * escalaUI;
    let arr = 'auto';

    if (tipo === 'rueda') {
      der += dx;
      aba += dy;
    } else if (tipo === 'suelo') {
      der += dx;
    } else {
      // 'borde' y 'lluvia': más grandes si hay altura, sin invadir la ruleta
      sc = escalaBorde;
      const recorte = movilVertical ? 0 : RECORTE_BORDE_DERECHO * (sc - escalaUI) * (width + right);
      der = right * sc - recorte;
      aba = bottom * sc;
      if (tipo === 'lluvia' && !movilVertical) {
        arr = (LLUVIA_TOP_DISENO * sc) + 'px';
        aba = 'auto';
      }
    }

    // Que las imágenes colocadas junto a la ruleta nunca se salgan por la izquierda de la pantalla
    if (tipo === 'rueda' || tipo === 'suelo') der = Math.min(der, vista.w - width * sc - 6);

    el.style.right = der + 'px';
    el.style.bottom = aba === 'auto' ? 'auto' : aba + 'px';
    el.style.top = arr;
    el.style.width = (width * sc) + 'px';
    el.style.height = 'auto';
    // En el móvil la lluvia cae sobre la chica y aparece suavemente (sin borde cortado)
    const desvLluvia = (tipo === 'lluvia' && movilVertical) ? 'linear-gradient(to bottom, transparent 0%, #000 35%)' : 'none';
    el.style.maskImage = desvLluvia;
    el.style.webkitMaskImage = desvLluvia;
  });

  const btnGirarEl = document.getElementById('btn-girar');
  const areaJugadores = document.getElementById('input-jugadores');
  // En pantallas táctiles, iOS hace zoom al enfocar un campo con letra < 16px
  if (areaJugadores) {
    areaJugadores.style.fontSize = ES_TACTIL ? '16px' : '11px';
    areaJugadores.style.boxSizing = 'border-box'; // que no se salga del panel
  }

  // Bloques con scroll propio: en vertical se quitan los límites y hace scroll todo el panel
  [['panel-asignacion', '80px'], ['tablero-apuestas', '120px'], ['panel-historial', '60px']].forEach(([id, limite]) => {
    const el = document.getElementById(id);
    if (el) el.style.maxHeight = vista.vertical ? 'none' : limite;
  });

  // Etiqueta del botón de tamaño
  const z = zoomPanel();

  // En vertical el tablero usa menos columnas para que los nombres de las casillas quepan
  const tableroEl = document.getElementById('tablero-apuestas');
  if (tableroEl) {
    const columnas = vista.vertical ? (z >= 1.5 ? 3 : 4) : 6;
    tableroEl.style.gridTemplateColumns = `repeat(${columnas}, minmax(0, 1fr))`;
  }
  const btnZoomReset = document.getElementById('btn-zoom-reset');
  if (btnZoomReset) btnZoomReset.textContent = Math.round(z * 100) + '%';

  if (vista.vertical) {
    // Panel abajo, centrado. Al aumentar el tamaño el panel se hace "más estrecho" por dentro,
    // así el texto crece sin que se salga de la pantalla
    const anchoLogico = ANCHO_PANEL_VERTICAL / z;
    const k = Math.min((ES_MOVIL ? 3.2 : 1.6) * z, (vista.w - 16) / anchoLogico);
    uiContainer.style.position = 'fixed';
    uiContainer.style.width = (anchoLogico - 30) + 'px';
    uiContainer.style.transformOrigin = 'bottom left';
    uiContainer.style.transform = `scale(${k})`;
    uiContainer.style.top = 'auto';
    uiContainer.style.bottom = '4px';
    uiContainer.style.left = ((vista.w - anchoLogico * k) / 2) + 'px';
    uiContainer.style.maxHeight = ((vista.panelH - 8) / k - 30) + 'px';
    uiContainer.style.border = '1px solid rgba(255, 215, 0, 0.45)';
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
    const kPanel = Math.min(Math.max(escalaUI, 0.6) * z, (vista.w - 16) / 350);
    uiContainer.style.position = 'absolute';
    uiContainer.style.width = '320px';
    uiContainer.style.transformOrigin = 'top left';
    uiContainer.style.transform = `scale(${kPanel})`;
    uiContainer.style.bottom = 'auto';
    uiContainer.style.top = (20 * kPanel) + 'px';
    uiContainer.style.left = (20 * kPanel) + 'px';
    uiContainer.style.maxHeight = ((window.innerHeight - 40 * kPanel) / kPanel - 30) + 'px';
    uiContainer.style.border = 'none';
    uiContainer.style.zIndex = '200'; // por encima de las imágenes flotantes
    if (btnGirarEl) {
      // Siempre visible al fondo del panel (si el panel tiene scroll en una pantalla baja)
      btnGirarEl.style.position = 'sticky';
      btnGirarEl.style.bottom = '0px';
      btnGirarEl.style.zIndex = '5';
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
let tipoApuesta = 'participantes'; // 'participantes' | 'sino'
let modoAntesDeSiNo = 'aleatorio';
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
  tituloFichas.textContent = esAleatorio ? t('tablero_azar') : t('fichas_manual');
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
      ? t('faltan', { n: fichasRestantesPorJugador[j.nombre] })
      : '';
    return `<div><span style="color:${j.color}; font-weight:bold;">${j.nombre} (${j.porcentaje}% · ${j.cuota}):</span> [${nums}]${pendientes}</div>`;
  }).join('');
}

function asignarPorcentajes() {
  ocultarCartel();
  historialGanadores = [];
  panelHistorial.textContent = t('sin_tiradas');

  const nuevaLista = [];
  let suma = 0;

  if (tipoApuesta === 'sino') {
    // Sí / No: siempre 50 % y 50 %, y números siempre al azar
    nuevaLista.push({ nombre: t('si'), porcentaje: 50, colorFijo: '#00dd77' });
    nuevaLista.push({ nombre: t('no'), porcentaje: 50, colorFijo: '#ff5555' });
    suma = 100;
  } else {
    const partes = document.getElementById('input-jugadores').value.split(',');

    for (const parte of partes) {
      const [nombre, porcentajeStr] = parte.split(':');
      const porcentaje = parseFloat((porcentajeStr || '').trim());
      if (!nombre || !nombre.trim() || isNaN(porcentaje)) {
        mostrarErrorAsignacion(t('err_formato'));
        return;
      }
      suma += porcentaje;
      nuevaLista.push({ nombre: nombre.trim(), porcentaje });
    }

    if (Math.abs(suma - 100) > 0.1) {
      mostrarErrorAsignacion(t('err_suma', { suma }));
      return;
    }
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
    jugador.color = jugador.colorFijo || COLORES_JUGADORES[idx % COLORES_JUGADORES.length];
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
    panelFichasEstado.textContent = t('estado_aleatorio');
  } else if (quedanFichas) {
    panelFichasEstado.innerHTML = `${t('turno_colocacion')} <span style="color:${jugadorActual.color}">${jugadorActual.nombre}</span> (${t('fichas')}: ${fichasRestantesPorJugador[jugadorActual.nombre]})`;
  } else {
    panelFichasEstado.textContent = t('estado_todas');
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
      casillaDiv.title = t('casilla_cero');
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

// --- PESTAÑAS: PARTICIPANTES / SÍ-NO ---
const tabParticipantes = document.getElementById('tab-participantes');
const tabSiNo = document.getElementById('tab-sino');

function actualizarPestanas() {
  const sino = tipoApuesta === 'sino';
  tabParticipantes.style.background = sino ? '#333' : '#ffd700';
  tabParticipantes.style.color = sino ? '#fff' : '#000';
  tabSiNo.style.background = sino ? '#ffd700' : '#333';
  tabSiNo.style.color = sino ? '#000' : '#fff';
  document.getElementById('lbl-participantes').style.display = sino ? 'none' : '';
  document.getElementById('input-jugadores').style.display = sino ? 'none' : '';
  document.getElementById('fila-modos').style.display = sino ? 'none' : 'flex';
  document.getElementById('info-sino').style.display = sino ? 'block' : 'none';
  const btnAsignar = document.getElementById('btn-asignar');
  btnAsignar.dataset.i18n = sino ? 'btn_repartir' : 'btn_asignar';
  btnAsignar.textContent = t(sino ? 'btn_repartir' : 'btn_asignar');
}

function cambiarTipoApuesta(tipo) {
  if (tipo === tipoApuesta) return;
  if (tipo === 'sino') {
    modoAntesDeSiNo = modoAsignacion;
    modoAsignacion = 'aleatorio'; // en Sí/No los números son siempre al azar
  } else {
    modoAsignacion = modoAntesDeSiNo;
  }
  tipoApuesta = tipo;
  actualizarPestanas();
  actualizarBotonesModo();
  asignarPorcentajes();
}

tabParticipantes.addEventListener('click', () => cambiarTipoApuesta('participantes'));
tabSiNo.addEventListener('click', () => cambiarTipoApuesta('sino'));

// --- IDIOMA: aplica los textos fijos (los que llevan data-i18n) ---
function aplicarIdioma() {
  document.documentElement.lang = idioma;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll('[data-lang]').forEach((b) => b.classList.toggle('activo', b.dataset.lang === idioma));
}

// Al cambiar de idioma se vuelve a repartir (solo se puede cambiar en la pantalla de inicio)
function refrescarTextosDinamicos() {
  actualizarBotonesModo();
  asignarPorcentajes();
}

aplicarIdioma();
actualizarPestanas();
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
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';

// --- FONDO KAWAII (rosa y violeta, como el icono) ---
// Todo se dibuja con código: no hace falta ninguna imagen nueva.
function generadorAleatorio(semilla) {
  let a = semilla >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) | 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

// Capa 1: degradado diagonal rosa -> violeta con un brillo suave en el centro
function dibujarBaseKawaii(canvas) {
  const S = canvas.width;
  const g = canvas.getContext('2d');
  const grad = g.createLinearGradient(S * 0.30, S * 0.30, S * 0.70, S * 0.70);
  grad.addColorStop(0, '#ff9ec9');
  grad.addColorStop(0.5, '#cf8bf5');
  grad.addColorStop(1, '#8a68ff');
  g.fillStyle = grad;
  g.fillRect(0, 0, S, S);

  const brillo = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S * 0.22);
  brillo.addColorStop(0, 'rgba(255,255,255,0.45)');
  brillo.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = brillo;
  g.fillRect(0, 0, S, S);
}

// Capa 2: tesela transparente (se repite) con franjas de coche tuneado, destellos, corazones y huellitas
function dibujarTeselaKawaii(canvas) {
  const S = canvas.width;
  const g = canvas.getContext('2d');
  const azar = generadorAleatorio(2026);
  g.clearRect(0, 0, S, S);

  // Dibuja el elemento también al otro lado de la tesela para que encaje sin cortes al repetirse
  const conRepeticion = (x, y, r, dibujar) => {
    for (const dx of [-S, 0, S]) {
      for (const dy of [-S, 0, S]) {
        if (x + dx + r < 0 || x + dx - r > S || y + dy + r < 0 || y + dy - r > S) continue;
        dibujar(x + dx, y + dy);
      }
    }
  };

  // Franjas diagonales tipo "livery" (se repiten sin costuras)
  const franja = (a, ancho, alpha, color) => {
    g.fillStyle = `rgba(${color},${alpha})`;
    for (let k = 0; k <= 1; k++) {
      const c1 = a + k * S;
      const c2 = c1 + ancho;
      g.beginPath();
      g.moveTo(c1, 0);
      g.lineTo(c2, 0);
      g.lineTo(c2 - S, S);
      g.lineTo(c1 - S, S);
      g.closePath();
      g.fill();
    }
  };
  franja(S * 0.16, S * 0.075, 0.11, '255,255,255');
  franja(S * 0.265, S * 0.018, 0.20, '255,255,255');
  franja(S * 0.60, S * 0.040, 0.09, '255,214,235');

  // Bokeh: círculos de luz muy suaves
  for (let i = 0; i < 26; i++) {
    const x = azar() * S, y = azar() * S, r = 18 + azar() * 56;
    const alpha = 0.07 + azar() * 0.11;
    conRepeticion(x, y, r, (cx, cy) => {
      g.fillStyle = `rgba(255,255,255,${alpha})`;
      g.beginPath();
      g.arc(cx, cy, r, 0, Math.PI * 2);
      g.fill();
    });
  }

  // Huellitas de gato (para la chica gato)
  const huella = (cx, cy, r, ang, alpha) => {
    g.save();
    g.translate(cx, cy);
    g.rotate(ang);
    g.fillStyle = `rgba(255,255,255,${alpha})`;
    g.beginPath();
    g.ellipse(0, r * 0.28, r * 0.52, r * 0.42, 0, 0, Math.PI * 2);
    g.fill();
    [[-0.62, -0.28, 0.2], [-0.22, -0.68, 0.22], [0.22, -0.68, 0.22], [0.62, -0.28, 0.2]].forEach(([px, py, pr]) => {
      g.beginPath();
      g.ellipse(px * r, py * r, pr * r, pr * r * 1.2, 0, 0, Math.PI * 2);
      g.fill();
    });
    g.restore();
  };
  for (let i = 0; i < 9; i++) {
    const x = azar() * S, y = azar() * S, r = 32 + azar() * 24, ang = (azar() - 0.5) * 1.2;
    conRepeticion(x, y, r * 1.6, (cx, cy) => huella(cx, cy, r, ang, 0.20));
  }

  // Corazones
  const corazon = (cx, cy, r, color) => {
    // Todo en un solo trazo, para que no se marque la unión con la transparencia
    g.fillStyle = color;
    g.beginPath();
    g.moveTo(cx - r * 0.5 + r * 0.52, cy - r * 0.35);
    g.ellipse(cx - r * 0.5, cy - r * 0.35, r * 0.52, r * 0.52, 0, 0, Math.PI * 2);
    g.moveTo(cx + r * 0.5 + r * 0.52, cy - r * 0.35);
    g.ellipse(cx + r * 0.5, cy - r * 0.35, r * 0.52, r * 0.52, 0, 0, Math.PI * 2);
    g.moveTo(cx - r * 0.98, cy - r * 0.12);
    g.lineTo(cx + r * 0.98, cy - r * 0.12);
    g.lineTo(cx, cy + r * 1.05);
    g.closePath();
    g.fill('nonzero');
  };
  for (let i = 0; i < 16; i++) {
    const x = azar() * S, y = azar() * S, r = 22 + azar() * 28;
    const color = azar() < 0.35 ? 'rgba(255,214,236,0.75)' : `rgba(255,255,255,${0.45 + azar() * 0.3})`;
    conRepeticion(x, y, r * 1.2, (cx, cy) => corazon(cx, cy, r, color));
  }

  // Destellos de cuatro puntas (con un pequeño resplandor)
  const destello = (cx, cy, r, alpha) => {
    const halo = g.createRadialGradient(cx, cy, 0, cx, cy, r * 1.25);
    halo.addColorStop(0, `rgba(255,255,255,${alpha * 0.35})`);
    halo.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = halo;
    g.beginPath();
    g.arc(cx, cy, r * 1.25, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = `rgba(255,255,255,${alpha})`;
    g.beginPath();
    for (let i = 0; i < 8; i++) {
      const ang = Math.PI / 4 * i - Math.PI / 2;
      const rr = i % 2 === 0 ? r : r * 0.26;
      const px = cx + rr * Math.cos(ang), py = cy + rr * Math.sin(ang);
      if (i === 0) g.moveTo(px, py); else g.lineTo(px, py);
    }
    g.closePath();
    g.fill();
  };
  for (let i = 0; i < 24; i++) {
    const x = azar() * S, y = azar() * S, r = 30 + azar() * 60;
    const alpha = 0.55 + azar() * 0.35;
    conRepeticion(x, y, r * 1.3, (cx, cy) => destello(cx, cy, r, alpha));
  }

  // Purpurina: destellitos pequeños por todas partes
  for (let i = 0; i < 70; i++) {
    const x = azar() * S, y = azar() * S, r = 8 + azar() * 9;
    conRepeticion(x, y, r, (cx, cy) => destello(cx, cy, r, 0.6 + azar() * 0.3));
  }
}

// Fondo de la mesa: 'kawaii' (rosa y violeta) o 'casino' (el tapete verde de siempre)
const FONDO_MESA = 'kawaii';
let texturaBrillos = null;

if (FONDO_MESA === 'kawaii') {
  const lienzoBase = document.createElement('canvas');
  lienzoBase.width = lienzoBase.height = 1024;
  dibujarBaseKawaii(lienzoBase);
  const texturaBase = new THREE.CanvasTexture(lienzoBase);
  texturaBase.colorSpace = THREE.SRGBColorSpace;

  const lienzoTesela = document.createElement('canvas');
  lienzoTesela.width = lienzoTesela.height = 2048;
  dibujarTeselaKawaii(lienzoTesela);
  texturaBrillos = new THREE.CanvasTexture(lienzoTesela);
  texturaBrillos.colorSpace = THREE.SRGBColorSpace;
  texturaBrillos.wrapS = texturaBrillos.wrapT = THREE.RepeatWrapping;
  texturaBrillos.repeat.set(3, 3);

  const anisotropia = (renderer.capabilities && renderer.capabilities.getMaxAnisotropy)
    ? Math.min(8, renderer.capabilities.getMaxAnisotropy()) : 1;
  texturaBase.anisotropy = anisotropia;
  texturaBrillos.anisotropy = anisotropia;

  // Sin luces (MeshBasicMaterial) para que los colores salgan tal cual están dibujados
  const mesaBase = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshBasicMaterial({ map: texturaBase }));
  mesaBase.rotation.x = -Math.PI / 2;
  mesaBase.position.y = -0.2;
  scene.add(mesaBase);

  const mesaBrillos = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshBasicMaterial({ map: texturaBrillos, transparent: true, depthWrite: false })
  );
  mesaBrillos.rotation.x = -Math.PI / 2;
  mesaBrillos.position.y = -0.195;
  mesaBrillos.renderOrder = 1;
  scene.add(mesaBrillos);

  // Solo recibe la sombra de la ruleta
  const mesaSombra = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.ShadowMaterial({ opacity: 0.35 }));
  mesaSombra.rotation.x = -Math.PI / 2;
  mesaSombra.position.y = -0.19;
  mesaSombra.receiveShadow = true;
  mesaSombra.renderOrder = 2;
  scene.add(mesaSombra);
} else {
  // 1.5 LA MESA DE CASINO (Tapete verde)
  const matMesa = new THREE.MeshStandardMaterial({ color: 0x00401a, roughness: 0.9, metalness: 0.0 });
  const geometriaMesa = new THREE.PlaneGeometry(50, 50); 
  const mesa = new THREE.Mesh(geometriaMesa, matMesa);
  mesa.rotation.x = -Math.PI / 2; 
  mesa.position.y = -0.2; 
  mesa.receiveShadow = true; 
  scene.add(mesa);

}

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
  let nombreColor = t('color_verde');
  let colorEstilo = "#00ff88";
  if (numeroGanador !== 0) {
    if (numerosRojos.includes(numeroGanador)) {
      nombreColor = t('color_rojo');
      colorEstilo = "#ff4444";
    } else {
      nombreColor = t('color_negro');
      colorEstilo = "#cccccc";
    }
  }

  const infoGanadora = `<span style="color:${colorEstilo};">${nombreColor} ${numeroGanador}</span>`;
  const ganadorFinal = asignacionNumeros[numeroGanador];
  let textoGanadorHistorial = "";

  if (numeroGanador === 0) {
    reproducirErika();
    mostrarCartel(t('cero_titulo'), t('cero_texto'));
    textoGanadorHistorial = t('cero_hist');
  } else {
    const esRojo7 = numeroGanador === 7;
    if (esRojo7) reproducirRojo7();
    else reproducirVictoria();

    const subtextoExtra = esRojo7 ? t('rojo7_sub') : "";
    const sufijo = esRojo7 ? t('rojo7_sufijo') : "";

    if (ganadorFinal) {
      mostrarCartel(tipoApuesta === 'sino' ? t('cartel_respuesta') : t('cartel_ganador'), `${ganadorFinal} <br><span style="font-size: 20px; font-weight: normal;">${t('salio_el')} ${infoGanadora}</span>`, subtextoExtra);
      textoGanadorHistorial = `${nombreColor} ${numeroGanador} ➔ ${ganadorFinal}${sufijo}`;
    } else {
      mostrarCartel(t('cartel_resultado'), `${t('salio_el')} ${infoGanadora}`, subtextoExtra);
      textoGanadorHistorial = `${nombreColor} ${numeroGanador} ➔ ${t('sin_dueno')}${sufijo}`;
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

  // El fondo kawaii se desliza muy despacio
  if (texturaBrillos && delta > 0 && delta < 1) {
    texturaBrillos.offset.x = (texturaBrillos.offset.x + delta * 0.004) % 1;
    texturaBrillos.offset.y = (texturaBrillos.offset.y + delta * 0.0025) % 1;
  }

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
  // El canvas ocupa toda la pantalla: así la mesa verde llega también detrás del panel
  renderer.setSize(window.innerWidth, window.innerHeight);
  const aspecto = vista.w / vista.h;
  let factor = Math.max(1, ASPECTO_REF / aspecto);
  if (vista.vertical && ES_MOVIL) {
    // En el móvil en vertical la ruleta se acerca para que ocupe casi todo el ancho
    factor = Math.max(0.92, (FRACCION_ANCHO_RULETA_DISENO * (ASPECTO_REF / aspecto)) / FRACCION_ANCHO_RULETA_MOVIL);
  }
  factorCamara = factor;

  camera.aspect = aspecto;
  camera.position.set(0, 5.0 * factor, 4.5 * factor);
  camera.lookAt(0, 0, 0);
  if (vista.vertical) {
    // La ruleta se encuadra en la zona de arriba; el resto de la pantalla enseña más mesa
    camera.setViewOffset(vista.w, vista.h, 0, 0, vista.w, window.innerHeight);
  } else {
    camera.clearViewOffset();
  }
  camera.updateProjectionMatrix();
}

// Aviso opcional para girar el móvil (ver AVISO_GIRAR_MOVIL arriba)
const avisoGirar = document.createElement('div');
avisoGirar.style.cssText = 'position:fixed; inset:0; z-index:5000; display:none; flex-direction:column; align-items:center; justify-content:center; gap:16px; background:rgba(0,0,0,0.92); color:#ffd700; font-family:Arial,sans-serif; font-weight:bold; font-size:20px; text-align:center; padding:24px;';
avisoGirar.innerHTML = '<div style="font-size:56px;">📱↔️</div><div id="aviso-girar-texto"></div>';
document.body.appendChild(avisoGirar);

function actualizarAvisoGirar() {
  const mostrar = AVISO_GIRAR_MOVIL && ES_MOVIL && window.innerHeight > window.innerWidth;
  avisoGirar.style.display = mostrar ? 'flex' : 'none';
  document.getElementById('aviso-girar-texto').textContent = t('gira_movil');
}

function reajustarTodo() {
  ajustarCamara();
  ajustarImagenes();
  ajustarCanvasFX();
  actualizarAvisoGirar();
}

window.addEventListener('resize', reajustarTodo);
// iOS tarda un momento en dar las medidas nuevas al girar el móvil (a veces se queda una banda negra)
window.addEventListener('orientationchange', () => {
  [60, 300, 800].forEach((ms) => setTimeout(() => { window.scrollTo(0, 0); reajustarTodo(); }, ms));
});
if (window.visualViewport) window.visualViewport.addEventListener('resize', reajustarTodo);

reajustarTodo();

animate(performance.now());