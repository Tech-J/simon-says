let game ={
    pieceColors:["yellow","red","blue","green"],
    streakArr:[],
    streakArrCopy:[],
    decisionArr:[],
    timer:null,
    score:0,
}

function eventHandler(decision){
    let gamePiecesEl = document.querySelectorAll('.gamePieces')
    if(decision === 'add' ){
        addEvent(gamePiecesEl)
    }
    else{
        removeEvent(gamePiecesEl)
    }
}

function addEvent (el){
    el.forEach(element => {
        element.addEventListener('click',recordSelections)
    });
}

function removeEvent(el){
   el.forEach(element => {
        element.removeEventListener('click',recordSelections)
    });
}

function recordSelections(event){
    let correctAudio = document.getElementById('correctSound')
    if(event.target.id === game.decisionArr[0]){ 
        correctAudio.play()
        game.decisionArr.shift() 
        scoreFunc()
        game.decisionArr.length === 0 ? randomSelection(): null
    } 
    else{
        gameOver()
    }
}

function randomSelection(){
    game.streakArr.push(game.pieceColors[Math.floor(Math.random()*game.pieceColors.length)]);
    game.streakArrCopy = [...game.streakArr];
    game.decisionArr = [...game.streakArr];
    randomSelectionShow()
}

function randomSelectionShow(){
    game.timer = setTimeout(()=>{
        let el = document.getElementById(game.streakArrCopy[0]);
        el.classList.add('show');
        // Jarvis.say(game.streakArrCopy[0]);
        game.streakArrCopy.shift();
        setTimeout(()=>{el.classList.remove('show')},(1000/(game.streakArr.length)));
        game.streakArrCopy.length!==0 ? randomSelectionShow() : null;
    },1000)
}

function gameOver(){
    clearInterval(game.timer)
    let losingAudio = document.getElementById('losingSound')
    losingAudio.play()
    eventHandler('remove')
    emptyArr()
}

function emptyArr(){
    game.streakArr.splice(0,game.streakArr.length)
    game.streakArrCopy.splice(0,game.streakArr.length)
    game.decisionArr.splice(0,game.streakArr.length)
}

function scoreFunc(){
    game.score++;
    let nameEl = document.getElementById('score');
    nameEl.innerHTML=game.score;
}


function start(){
    randomSelection()
    eventHandler('add')
}

function btnStart(){
    let btn =  document.getElementById('gameStart')
    btn.addEventListener('click',start) 
}
btnStart()


