//HIGHLIGHT BOXES

const boxes = document.querySelectorAll('.game-box')

function highlight(event) {
    event.target.classList.toggle('hover')
}


//ALTERNATE PLAYER TURNS

const boxContainer = document.querySelector('#box-container')

function handleClick(event) {
    if (event.target.classList.contains('game-turn')) {
        event.target.classList.add('clicked', 'player-1')
    } else {
        event.target.classList.add('clicked', 'player-2')
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

boxes.forEach((box) => {
    box.addEventListener('mouseover', highlight)
    box.addEventListener('mouseleave', highlight)
    box.addEventListener('click', handleClick)
})


//RESTART GAME

const restartButton = document.querySelector('#restart-game')

function handleRestart() {
    boxes.forEach((box) => {
        box.disabled = false
        box.classList.add('game-turn')
        box.classList.remove('clicked', 'player-1', 'player-2')
    })
}

restartButton.addEventListener('click', handleRestart)
