const MARGEN_TABLERO = 20;
let regulador_velocidad_teclas = 0;
let bloque;
let barraHabilitada = true;

async function setup() {
  let canvas = createCanvas(900, 700);
  canvas.parent("game");
  tablero = new Tablero();
  sumador = new Sumador();
  bloque = new Bloque();
  resizeCanvas(
    tablero.ancho + MARGEN_TABLERO * 2,
    tablero.alto + MARGEN_TABLERO * 6
  );
}

function draw() {
  background("#22A");
  tablero.dibujar();
  if (bloque) {
    bloque.dibujar();
  }
  keyEventsBloques();
  tablero.actualizarTablero();
}

function keyEventsBloques() {
  if (millis() - regulador_velocidad_teclas < 100) {
    return;
  }
  regulador_velocidad_teclas = millis();
  if (keyIsDown(RIGHT_ARROW)) {
    bloque.moverDerecha();
  }
  if (keyIsDown(LEFT_ARROW)) {
    bloque.moverIzquierda();
  }
  if (barraHabilitada && keyIsDown(32)) {
    bloque.moverArriba(tablero);
    tablero.memorizarTablero(
      bloque.posicion.x,
      bloque.posicion.y,
      bloque.numero,
      bloque.color
    );
    sumador.busquedaCercana(bloque.posicion.x, bloque.posicion.y, bloque.numero);
    bloque.crearNuevoBloque();
    barraHabilitada = false;
    setTimeout(() => {
      barraHabilitada = true;
    }, 500);
  }
}
