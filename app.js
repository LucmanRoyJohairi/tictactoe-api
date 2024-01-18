import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const port = 3002

app.use(bodyParser.json())
app.use(cors())

let players = []
let gameState = {
    history: [Array(9).fill(null)],
    currentMove: 0,
}

//
app.get('/api/join', (req, res) => {
    const playerId = players.length + 1;
    players.push(playerId);
    res.json({playerId});
})


// get current game state
app.get('/api/game', (req, res) => {
    res.json(gameState);
})


// make move
app.post('/api/play/', (req, res)=>{
    const {nextSquares} = req.body
    const {history, currentMove} = gameState
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]

    gameState = {
        history:nextHistory,
        currentMove: nextHistory.length - 1
    }

    return res.json(gameState)
});

//reset
app.post('/api/reset/', (req, res)=>{

    gameState = {
        history: [Array(9).fill(null)],
        currentMove: 0
    }
    return res.json(gameState)
});

app.listen(port, ()=>{
    console.log('tictac toe server is running.')
})