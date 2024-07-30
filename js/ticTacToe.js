
const board = ['','','','','','','','',''];
let gameOver = false;
const winningSequences = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const simbols = {
        options: ['O','X'],
        turn_index: 0,
        change: function(){
            this.turn_index = ( this.turn_index === 0 ? 1:0 );
        }
}
function drawPlayerTurn(simbol) {
    const player = document.querySelector('.player');
    player.innerHTML = "Turno do Jogador: " + (simbol !== 0 ? '"Bolinha"': '"Xis"')
}

function checkWin(simbol) { 
    for(let i = 0; i < winningSequences.length; i++) {
        if (board[ winningSequences[i][0] ] == simbol &&
            board[ winningSequences[i][1] ] == simbol &&
            board[ winningSequences[i][2] ] == simbol) {
            
            return i;
        }
    }
    return -1
}
function draw() {
    const containerElement = document.querySelector('.game');
    let content = '';
    for(let i = 0; i < board.length; i++) {
        content += `<div onclick="makePlay(${i})" >${board[i]}</div>`;
    }
   containerElement.innerHTML = content;
}
function makePlay(position) {
    if (gameOver) return false
    if (board[position] === '') {       
        let play = simbols.options[simbols.turn_index]
        drawPlayerTurn(simbols.turn_index)
        board[position] = play
        draw()    
        let winningIndex = checkWin(play)
        
        if (winningIndex >= 0) { 
            alert((play === 'O' ? '"Bolinha"': '"Xis"') + " Venceu a partida")
            gameOver = true
        } else if (!board.includes('')) {
            gameOver = true
            alert("Empatou")
            return true
        } else {
            simbols.change()
                   
        }
        return true;
    } 
  
    return false

}
function start() {
    board.fill('');
    drawPlayerTurn(1)
    draw();
    simbols.turn_index = 0
    gameOver = false;
}

start();
// inicia o jogo