class Tablero {
  constructor() {
    this.columnas = 5;
    this.filas = 7;
    this.lado_celda = 60;
    this.ancho = this.columnas * this.lado_celda;
    this.alto = this.filas * this.lado_celda;
    this.posicion = createVector(MARGEN_TABLERO, MARGEN_TABLERO);
    this.tablero = [];
    this.inicializarTablero();
    this.memorizarTablero();
    this.actualizarTablero();
    this.eliminarBloque();
  }

  inicializarTablero() {
    for (let columna = 0; columna < this.columnas; columna++) {
      this.tablero[columna] = [];
      for (let fila = 0; fila < this.filas; fila++) {
        this.tablero[columna][fila] = null;
      }
    }
  }

  memorizarTablero(x, y, bloque, color) {
    if (this.esPosicionValida(createVector(x, y))) {
      if (!this.tablero[x]) {
        this.tablero[x] = [];
      }
      this.tablero[x][y] = [bloque, color];
    }
  }

  actualizarTablero() {
    push();
    textSize(32);
    textAlign(CENTER, CENTER);

    for (let columna = 0; columna < this.columnas; columna++) {
      for (let fila = 0; fila < this.filas; fila++) {
        const num = this.tablero[columna][fila];
        if (num !== null) {
          let coord = this.coordenada(columna, fila);
          fill(num[1]);
          rect(
            coord.x + 3,
            coord.y + 3,
            this.lado_celda - 6,
            this.lado_celda - 6,
            8
          );
          fill(255);
          text(
            num[0],
            coord.x + this.lado_celda / 2,
            coord.y + this.lado_celda / 2
          );
        }
      }
    }
    pop();
  }

  async eliminarBloque(x, y) {
    try {
      this.tablero[x][y] = null;
      this.actualizarTablero();
    } catch (error) {
      console.error("Ocurrió un error al intentar eliminar un bloque: ", error);
    }
  }

  esPosicionValida(posicion) {
    return (
      posicion.x >= 0 &&
      posicion.x < this.columnas &&
      posicion.y >= 0 &&
      posicion.y < this.filas
    );
  }

  hayBloqueEnPosicion(posicion) {
    if (!this.esPosicionValida(posicion)) {
      return false;
    }
    return this.tablero[posicion.x][posicion.y] !== null;
  }

  coordenada(x, y) {
    return createVector(x, y).mult(this.lado_celda).add(this.posicion);
  }

  dibujar() {
    push();
    noStroke();
    for (let columna = 0; columna < this.columnas; columna++) {
      for (let fila = 0; fila < this.filas; fila++) {
        if ((columna + fila) % 2 == 0) {
          fill("black");
        } else {
          fill("#00" + fila);
        }
        let c = this.coordenada(columna, fila);
        rect(c.x, c.y, this.lado_celda);
      }
    }
    pop();
  }
}
