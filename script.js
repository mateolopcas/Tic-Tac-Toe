//HIGHLIGHT BOXES

const boxes = document.querySelectorAll('.game-box')

function highlight(event) {
    event.target.classList.toggle('hover')
}


//ALTERNATE PLAYER TURNS

const boxContainer = document.querySelector('#box-container')
const turnText = document.querySelector('.turn-text')

function handleClick(event) {
    if (event.target.classList.contains('game-turn')) {
        event.target.classList.add('clicked', 'player-1')
        turnText.innerText = `Blue's turn`
    } else {
        event.target.classList.add('clicked', 'player-2')
        turnText.innerText = `Red's turn`
    }
    event.target.disabled = true
    event.target.classList.remove('hover')
}

function playerTurn() {
    boxes.forEach((box) => {
        box.classList.toggle('game-turn')
    })
}

boxContainer.addEventListener('click', playerTurn)




//RESTART GAME

const restartButton = document.querySelector('#restart-game')

function handleRestart() {
    boxes.forEach((box) => {
        box.disabled = false
        box.classList.add('game-turn')
        box.classList.remove('clicked', 'player-1', 'player-2')
    })
    winner = null
    winnerText.innerText = ''
    turnText.innerText = `Red's turn`
}

restartButton.addEventListener('click', handleRestart)



//DETERMINING WINNER: DUMB WAY


function determineWinner() {
    let winner = null
    let player1 = document.querySelectorAll('.player-1')
    let player2 = document.querySelectorAll('.player-2')

    //PLAYER 1
    //ROWS
    if (boxes[0].classList.contains('player-1') &&
        boxes[1].classList.contains('player-1') &&
        boxes[2].classList.contains('player-1')) {
        winner = true
    } else if (boxes[3].classList.contains('player-1') &&
        boxes[4].classList.contains('player-1') &&
        boxes[5].classList.contains('player-1')) {
        winner = true
    } else if (boxes[6].classList.contains('player-1') &&
        boxes[7].classList.contains('player-1') &&
        boxes[8].classList.contains('player-1')) {
        winner = true
    } 
    //COLUMNS
    else if (boxes[0].classList.contains('player-1') &&
        boxes[3].classList.contains('player-1') &&
        boxes[6].classList.contains('player-1')) {
        winner = true
    } else if (boxes[1].classList.contains('player-1') &&
        boxes[4].classList.contains('player-1') &&
        boxes[7].classList.contains('player-1')) {
        winner = true
    } else if (boxes[2].classList.contains('player-1') &&
        boxes[5].classList.contains('player-1') &&
        boxes[8].classList.contains('player-1')) {
        winner = true
    }
    //DIAGONALS
    else if (boxes[0].classList.contains('player-1') &&
        boxes[4].classList.contains('player-1') &&
        boxes[8].classList.contains('player-1')) {
        winner = true
    } else if (boxes[2].classList.contains('player-1') &&
        boxes[4].classList.contains('player-1') &&
        boxes[6].classList.contains('player-1')) {
        winner = true
    }
    //PLAYER 2
    //ROWS
    else if (boxes[0].classList.contains('player-2') &&
        boxes[1].classList.contains('player-2') &&
        boxes[2].classList.contains('player-2')) {
        winner = false
    } else if (boxes[3].classList.contains('player-2') &&
        boxes[4].classList.contains('player-2') &&
        boxes[5].classList.contains('player-2')) {
        winner = false
    } else if (boxes[6].classList.contains('player-2') &&
        boxes[7].classList.contains('player-2') &&
        boxes[8].classList.contains('player-2')) {
        winner = false
    } 
    //COLUMNS
    else if (boxes[0].classList.contains('player-2') &&
        boxes[3].classList.contains('player-2') &&
        boxes[6].classList.contains('player-2')) {
        winner = false
    } else if (boxes[1].classList.contains('player-2') &&
        boxes[4].classList.contains('player-2') &&
        boxes[7].classList.contains('player-2')) {
        winner = false
    } else if (boxes[2].classList.contains('player-2') &&
        boxes[5].classList.contains('player-2') &&
        boxes[8].classList.contains('player-2')) {
        winner = false
    }
    //DIAGONALS
    else if (boxes[0].classList.contains('player-2') &&
        boxes[4].classList.contains('player-2') &&
        boxes[8].classList.contains('player-2')) {
        winner = false
    } else if (boxes[2].classList.contains('player-2') &&
        boxes[4].classList.contains('player-2') &&
        boxes[6].classList.contains('player-2')) {
        winner = false
    }
    if (winner === true) {
        winnerText.innerText = `Red wins!`
        turnText.innerText = ``
        boxes.forEach((box) => {
            box.disabled = true
        })
    } else if (winner === false) {
        winnerText.innerText = `Blue wins!`
        turnText.innerText = ``
        boxes.forEach((box) => {
            box.disabled = true
        })
    } else if ((player1.length + player2.length === 9) && (winner === null)) {
        winnerText.innerText = `It's a tie!`
        turnText.innerText = ``
    }
}


//ATTEMPTING SMART WAY
//ATTEMPT 1: FAILED

let winnerText = document.querySelector('.winner-text')
/*
function smartWinner() {
    let player1 = document.querySelectorAll('.player-1')
    let player2 = document.querySelectorAll('.player-2')
    let score1 = 0
    let score2 = 0
    player1.forEach((box) => {
        score1 += Number(box.id)
    })
    player2.forEach((box) => {
        score2 += Number(box.id)
    })
    if ((score1 === 111) || (score1 === 111000) || (score1 === 111000000) ||
        (score1 === 1001001) || (score1 === 10010010) || (score1 === 100100100) ||
        (score1 === 100010001) || (score1 === 1010100)) {
        winnerText.innerText = `Player 1 wins!`
    } else if ((score2 === 111) || (score2 === 111000) || (score2 === 111000000) ||
        (score2 === 1001001) || (score2 === 10010010) || (score2 === 100100100) ||
        (score2 === 100010001) || (score2 === 1010100)) {
        winnerText.innerText = `Player 2 wins!`
    } else if (player1.length + player2.length === 9) {
        winnerText.innerText = `It's a tie!`
    }
}
*/


//ATTEMPT 2
//SUCCESSFUL!

function smartWinner2 () {
    let winner = null
    let player1 = document.querySelectorAll('.player-1')
    let player2 = document.querySelectorAll('.player-2')

    for (let i=1; i<4; i++) {
        let row = Array.from(document.querySelectorAll(`.row-${i}`))
        let column = Array.from(document.querySelectorAll(`.column-${i}`))
        
        if (row.every((square) => square.classList.contains('player-1'))) {
            winner = true
        } else if (row.every((square) => square.classList.contains('player-2'))) {
            winner = false
        }
        if (column.every((square) => square.classList.contains('player-1'))) {
            winner = true
        } else if (column.every((square) => square.classList.contains('player-2'))) {
            winner = false
        }
    }
    if (boxes[0].classList.contains('player-1') &&
        boxes[4].classList.contains('player-1') &&
        boxes[8].classList.contains('player-1')) {
        winner = true
    } else if (boxes[2].classList.contains('player-1') &&
        boxes[4].classList.contains('player-1') &&
        boxes[6].classList.contains('player-1')) {
        winner = true
    }
    else if (boxes[0].classList.contains('player-2') &&
        boxes[4].classList.contains('player-2') &&
        boxes[8].classList.contains('player-2')) {
        winner = false
    } else if (boxes[2].classList.contains('player-2') &&
        boxes[4].classList.contains('player-2') &&
        boxes[6].classList.contains('player-2')) {
        winner = false
    }

    if (winner === true) {
        winnerText.innerText = `Red wins!`
        turnText.innerText = ``
        boxes.forEach((box) => {
            box.disabled = true
        })
    } else if (winner === false) {
        winnerText.innerText = `Blue wins!`
        turnText.innerText = ``
        boxes.forEach((box) => {
            box.disabled = true
        })
    } else if ((player1.length + player2.length === 9) && (winner === null)) {
        winnerText.innerText = `It's a tie!`
        turnText.innerText = ``
    }
}








boxes.forEach((box) => {
    box.addEventListener('mouseover', highlight)
    box.addEventListener('mouseleave', highlight)
    box.addEventListener('click', handleClick)
//    box.addEventListener('click', determineWinner)
    box.addEventListener('click', smartWinner2)
})


