let turn = 'circle'
const playData = {
    circle:[],
    cross:[],
}
function draw(target, symbol){
    target.classList.add(symbol)
}

function recordPlay(player, index){
    playData[player].push(index)
}

document.querySelector('.app').addEventListener("click", function onTableClicked(event) {

    if(event.target.tagName !== 'TD'){
        return
    }
    
    if(turn === 'circle'){
        draw(event.target, 'circle')
        recordPlay('circle', Number(event.target.dataset.index))
        turn = 'cross'
    } else if ( turn === 'cross') {
        draw(event.target, 'cross')
        recordPlay('cross', Number(event.target.dataset.index))
        turn = 'circle'
    }
    console.log(event.target)
    console.log(playData)
})