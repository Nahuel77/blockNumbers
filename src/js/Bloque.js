class Bloque {
  constructor() {
    this.posicion = createVector(2, 7);
    this.randomNum = sumador;
    this.sumador = new Sumador();
    this.numero = 2;
    this.color = "#AA284B";
  }

  moverDerecha() {
    if (this.posicion.x < 4) {
      this.posicion.x++;
    }
  }

  moverIzquierda() {
    if (this.posicion.x > 0) {
      this.posicion.x--;
    }
  }

  moverArriba(tablero) {
    let nuevaPosicion = createVector(this.posicion.x, this.posicion.y - 1);

    while (
      tablero.esPosicionValida(nuevaPosicion) &&
      !tablero.hayBloqueEnPosicion(nuevaPosicion)
    ) {
      this.posicion = nuevaPosicion;
      nuevaPosicion = createVector(this.posicion.x, this.posicion.y - 1);
    }
  }

  crearNuevoBloque() {
    this.posicion = createVector(2, 7);
    this.disparada = false;
    const { numero, color } = this.sumador.darNumero();
    this.numero = numero;
    this.color = color;
  }

  dibujar() {
    push();
    fill(this.color);
    let coord = tablero.coordenada(this.posicion.x, this.posicion.y);
    rect(
      coord.x + 3,
      coord.y + 3,
      tablero.lado_celda - 6,
      tablero.lado_celda - 6,
      8
    );
    textSize(44);
    fill(255);
    textAlign(CENTER, CENTER);
    text(
      this.numero,
      coord.x + tablero.lado_celda / 2,
      coord.y + tablero.lado_celda / 2
    );
    pop();
  }
}
