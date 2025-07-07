import React from "react"
import { nanoid } from "nanoid";
import Die from "./Die"

export default function App() {

    const [dice, setDice] = React.useState(generateAllNewDice)

    function generateAllNewDice() {
        const newDice = [];

        for (let i=0; i<10; i++) {
            const random = {
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
            }

            newDice.push(random)
        }
        return newDice;
    }

    function rollDice() {
        setDice(oldDice => oldDice.map(die =>
            die.isHeld ?
                die :
                {...die, value: Math.ceil(Math.random() * 6) }
        ))
    }

    function hold(id) {
        setDice(oldDice => oldDice.map(die =>
                die.id === id ?
                    {...die, isHeld: !die.isHeld} :
                    die
        ))
    }


    const diceElements = dice.map(dieObj => (
        <Die 
            key={dieObj.id} 
            value={dieObj.value} 
            isHeld={dieObj.isHeld} 
            hold={hold}
            id={dieObj.id}
        />)
)

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            
            <div className="dice-container">
              {diceElements}
            </div>

            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
)}