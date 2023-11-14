var random = new Random.Random();

let tiempo = [0,0];

let sodoku = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
]

let n = 0;
const gameContainer = document.querySelector('.juego');
gameContainer.addEventListener("keydown", inputNumber);

document.addEventListener("DOMContentLoaded", function () {

    fillSodoku(sodoku)
    console.log(sodoku);
    setTableDimensions()
    
});


function setTableDimensions(difficulty) {
  
    let chance = 15;

    let rows = 9;
    let columns = 9;
    let block = 0;

    let consecutivo = 0


    let consecutivo_vacio = 0

  
    let str = ``;
  
    for (let i = 0; i < columns; i++) {
      str += "<tr>";
  
      for (let j = 0; j < rows; j++) {

        if ((i >= 0 && i <= 2) && (j >= 0 && j <= 2)) {
            block = 0;
        } else if ((i >= 0 && i <= 2) && (j >= 3 && j <= 5)) {
            block = 1;
        } else if ((i >= 0 && i <= 2) && (j >= 6 && j <= 8)) {
            block = 2;
        } else if ((i >= 3 && i <= 5) && (j >= 0 && j <= 2)) {
            block = 3;
        } else if ((i >= 3 && i <= 5) && (j >= 3 && j <= 5)) {
            block = 4;
        } else if ((i >= 3 && i <= 5) && (j >= 6 && j <= 8)) {
            block = 5;
        } else if ((i >= 6 && i <= 8) && (j >= 0 && j <= 2)) {
            block = 6;
        } else if ((i >= 6 && i <= 8) && (j >= 3 && j <= 5)) {
            block = 7;
        } else if ((i >= 6 && i <= 8) && (j >= 6 && j <= 8)) {
            block = 8;
        }

        // const porcentaje = Math.floor(Math.random() * 100 + 1)
        const porcentaje = random.integer(1, 100)

        if (porcentaje <= chance) {

            if (consecutivo < 3) {
                str += `<td class="character-box preselected-box pos-${j}-${i}" data-row="${j}" data-colum="${i}" data-block="${block}" data-number="${sodoku[i][j]}">${sodoku[i][j]}</td>`;
                consecutivo ++;
            } else {

                str += `<td class="character-box unselected-box pos-${j}-${i}" data-row="${j}" data-colum="${i}" data-block="${block}" data-number="" onclick="selectCasilla(${i}, ${j})"></td>`;
                consecutivo = 0;
            }

        } else {
            
            if (consecutivo_vacio < 11) {
                str += `<td class="character-box unselected-box pos-${j}-${i}" data-row="${j}" data-colum="${i}" data-block="${block}" data-number="" onclick="selectCasilla(${i}, ${j})"></td>`;
                
                consecutivo_vacio ++;
            } else {
                str += `<td class="character-box preselected-box pos-${j}-${i}" data-row="${j}" data-colum="${i}" data-block="${block}" data-number="${sodoku[i][j]}">${sodoku[i][j]}</td>`;
                consecutivo_vacio = 0;
            }

        }
  
      }
  
      str += "</tr>";
    }
  
    selectedWord = '';
    document.querySelector(".juego table tbody").innerHTML = str;
  }

function selectCasilla(row, column) {

    const casillero = document.querySelectorAll('.character-box');

    Array.from(casillero).forEach( function(el) {
        if (el.classList.contains('waiting-response')) {
            el.classList.add('unselected-box')
            el.classList.remove('waiting-response')
        }
    })

    const casilla = document.querySelector(`.pos-${column}-${row}`);
    casilla.classList.remove('unselected-box')
    casilla.classList.add('waiting-response')
    console.log(casilla);

}

function inputNumber(event) {
    const teclaNumber = event.keyCode || event.which;
    let number = teclaNumber >= 97 ? teclaNumber - 96 : teclaNumber - 48;

    if ((teclaNumber >= 49 && teclaNumber <= 57) || (teclaNumber >= 97 && teclaNumber <= 105)) {
        markCasilla(number, true);
    } else if (teclaNumber === 8) { //backspace
        markCasilla(number, false);
    }
}

function markCasilla(numero, opcion) {
    const casillero = document.querySelectorAll('.character-box');

    Array.from(casillero).forEach( function(el) {
        if (el.classList.contains('waiting-response')) {

            if (opcion) {
                el.dataset.number = numero;
                el.innerText = numero;
                el.classList.add('marked')

            } else {
                el.dataset.number = '';
                el.innerText = '';
                if (el.classList.contains('marked')) {
                    el.classList.remove('marked')

                }
            }

        }
    })
}

function contarTiempo() {
    tiempo[1] ++ ;

    if (tiempo[1] == 60) {
        tiempo[1] = 0;

        tiempo[0] ++;
    }

    let formattedMins = tiempo[0] < 10 ? "0" + tiempo[0] : tiempo[0];
    let formattedSecs = tiempo[1] < 10 ? "0" + tiempo[1] : tiempo[1];

    document.getElementById('tiempoTranscurrido').innerText = `${formattedMins}:${formattedSecs}`
}

function startTimer() {
    var interv = setInterval(contarTiempo, 1000);
}

function fillSodoku(sodoku) {

    let randomNumbers = [...Array(9)].map((_, i) => i +1);
    for (let i = randomNumbers.length - 1; i > 0; i--) {
        const k = Math.floor(Math.random() * (i + 1));
        [randomNumbers[i], randomNumbers[k]] = [randomNumbers[k], randomNumbers[i]];
    }

    function isValid(row, column, n) {
        for (let i = 0; i < 9; i++) {
            if (sodoku[row][i] === n || sodoku[i][column] === n) {
                return false;
            }
            
        }
    
        const rowStart = Math.floor(row / 3) * 3;
        const columnStart = Math.floor(column / 3) * 3;
    
        for (let i = rowStart; i < rowStart + 3; i++) {
            for (let j = columnStart; j < columnStart + 3; j++) {
                if (sodoku[i][j] === n) {
                    return false;
                }
            }
            
        }
    
        return true;
    }


    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            if (sodoku[row][column] === 0) {

                for (let n = 0; n < 9; n++) {
                    if (isValid(row, column, randomNumbers[n])) {
                        sodoku[row][column] = randomNumbers[n];
                        if (fillSodoku(sodoku)) {
                            return true;
                        } else {
                            sodoku[row][column] = 0;
                        }
                    }
                    
                }

                return false;
            }
            
        }
        
    }
    return true;
}