var gamePieceColors= ["yellow","red","blue","green"]
var streakArr=[];
var streakArrCopy=[];
var decisionArr=[];
var timer
var score = 0

var Jarvis = new Artyom();


function eventHandler(){
    var gamePiecesEl = document.querySelectorAll('.gamePieces')
    gamePiecesEl.forEach(element => {
        element.addEventListener('click',recordSelections)
    });
}

function removeEventHandler(){
    var gamePiecesEl = document.querySelectorAll('.gamePieces')
    gamePiecesEl.forEach(element => {
        element.removeEventListener('click',recordSelections)
    });
}

function inputHandler(){
    var nameInput = document.getElementById('nameField');
    var nameOutput = document.getElementById('name')
    nameInput.addEventListener('input',(event)=>{
        console.log('event')
        nameOutput.innerHTML=event.target.value
    })
}



function recordSelections(event){
    if(event.target.id === decisionArr[0]){ 
        decisionArr.shift() 
        scoreFunc()
        decisionArr.length === 0 ? randomSelection(): console.log('hi')
       
    } 
    else{
        clearInterval(timer)
        gameOver()
    }
}

function randomSelection(){
    streakArr.push(gamePieceColors[Math.floor(Math.random()*gamePieceColors.length)]);
    streakArrCopy = [...streakArr];
    decisionArr = [...streakArr];
    randomSelectionShow()
}

function randomSelectionShow(){
    timer = setTimeout(()=>{
        var el = document.getElementById(streakArrCopy[0]);
        el.classList.add('show');
        // Jarvis.say(streakArrCopy[0]);
        streakArrCopy.shift();
        setTimeout(()=>{el.classList.remove('show')},(1000/(streakArr.length)));
        streakArrCopy.length!==0 ? randomSelectionShow() : console.log('no')
    },1000)
}


function gameOver(){
    removeEventHandler()
    losingAudio = document.getElementById('losingSound')
    losingAudio.play()
}

function scoreFunc(){
    score++;
    var nameEl = document.getElementById('score');
    nameEl.innerHTML=score;
}


function start(){
    inputHandler()
    randomSelection()
    eventHandler()
    Jarvis.say(streakArrCopy[0]);
}start()

function btnStart(){
    var btn =  document.getElementById('gameStart')
    btn.addEventListener('click',start) 
}