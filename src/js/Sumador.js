class Sumador {
  constructor() {
    this.maxNumber = 64;
    this.minNumber = 2;
    this.rango = [1, 2, 3, 4, 5, 6];
  }

  darNumero() {
    const exponente = this.rango[Math.floor(Math.random() * 6)];
    const numero = this.minNumber ** exponente;
    const color = this.generarColor(numero);
    return { numero, color };
  }

  generarColor(numero) {
    const valorHexadecimal = (numero * 2).toString(16);
    const colorHexadecimal = "#" + valorHexadecimal.padStart(6, "0");
    return colorHexadecimal;
  }

  moverFichaSumada() {
    tablero.tablero.forEach((fila) => {
      const filaNueva = [];
      fila.forEach((celda) => {
        if (celda !== null) {
          filaNueva.push(celda);
        }
      });

      while (filaNueva.length < tablero.tablero[0].length) {
        filaNueva.push(null);
      }

      for (let i = 0; i < tablero.tablero[0].length; i++) {
        tablero.tablero[tablero.tablero.indexOf(fila)][i] = filaNueva[i];
      }
    });
  }

  match(nVecinos, x, y, num) {
    console.log(typeof x);
    console.log(typeof y);
    console.log(typeof nVecinos);
    switch (nVecinos) {
      case 1:
        tablero.tablero[x][y] = [num * 2, this.generarColor(num * 2)];
        this.moverFichaSumada();
        break;
      case 2:
        tablero.tablero[x][y] = [num * 4, this.generarColor(num * 4)];
        this.moverFichaSumada();
        break;
      default:
        tablero.tablero[x][y] = [num * 4, this.generarColor(num * 4)];
        this.moverFichaSumada();
        break;
    }
  }

  async busquedaCercana(x, y) {
    try {
      const cola = [];
      const visitado = new Set();
      const suma = [];
      cola.push({ x, y });
      while (cola.length > 0) {
        const { x, y } = cola.shift();
        const num = tablero.tablero[x][y][0];
        visitado.add(`${x}, ${y}`);
        if (
          y - 1 >= 0 &&
          tablero.tablero[x][y - 1] !== null &&
          tablero.tablero[x][y - 1] != undefined &&
          !visitado.has(`${x}, ${y - 1}`) &&
          num == tablero.tablero[x][y - 1][0]
        ) {
          cola.push({ x, y: y - 1 });
          suma.push({ x, y: y - 1 });
          tablero.eliminarBloque(x, y - 1);
        }
        if (
          x + 1 < tablero.columnas &&
          tablero.tablero[x + 1][y] !== null &&
          tablero.tablero[x + 1][y] != undefined &&
          !visitado.has(`${x + 1}, ${y}`) &&
          num == tablero.tablero[x + 1][y][0]
        ) {
          cola.push({ x: x + 1, y });
          suma.push({ x: x + 1, y });
          tablero.eliminarBloque(x + 1, y);
        }
        if (
          y + 1 < tablero.filas &&
          tablero.tablero[x][y + 1] !== null &&
          tablero.tablero[x][y + 1] != undefined &&
          !visitado.has(`${x}, ${y + 1}`) &&
          num == tablero.tablero[x][y + 1][0]
        ) {
          cola.push({ x, y: y + 1 });
          suma.push({ x, y: y + 1 });
          tablero.eliminarBloque(x, y + 1);
        }
        if (
          x - 1 >= 0 &&
          tablero.tablero[x - 1][y] !== null &&
          tablero.tablero[x - 1][y] != undefined &&
          !visitado.has(`${x - 1}, ${y}`) &&
          num == tablero.tablero[x - 1][y][0]
        ) {
          cola.push({ x: x - 1, y });
          suma.push({ x: x - 1, y });
          tablero.eliminarBloque(x - 1, y);
        }
        if (suma.length > 0) {
          tablero.eliminarBloque(x, y);
          this.match(suma.length, x, y, num);
          this.moverFichaSumada();
          suma.splice(0);
        }
      }
    } catch (error) {
      console.error("Ocurrió un error en la busqueda BFS: ", error);
    }
  }
}
