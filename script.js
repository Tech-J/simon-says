var streakArr=[]
var streakArrCopy=[]

function eventHandler(){
    var gamePiecesEl = document.querySelectorAll('.gamePieces')
    gamePiecesEl.forEach(element => {
        element.addEventListener('click',randomSelection)
    });
}
eventHandler()

function randomSelection(){
    var gamePiecesEl = document.querySelectorAll('.gamePieces')
    streakArr.push(gamePiecesEl[Math.floor(Math.random()*gamePiecesEl.length)].id)
    streakArrCopy = [...streakArr]
    randomSelectionShow()
}


function randomSelectionShow(){
    var timer = setTimeout(()=>{
        var el = document.getElementById(streakArrCopy[0])
        el.classList.add('show')
        streakArrCopy.shift()
        setTimeout(()=>{
            el.classList.remove('show')
        },1000)
        streakArrCopy.length!=0 ? randomSelectionShow() : clearInterval(timer) 
    },2000)
}

randomSelection()

