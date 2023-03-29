import React, { useState } from "react";
import "./MemoryGame.css";

function MemoryGame() {
    const grid = [
        [1, 2, 4, 5],
        [0, 1, 7, 0],
        [7, 6, 2, 3],
        [3, 4, 6, 5],
    ];

    const [selectedGridMask, setselectedGridMask] = useState(
        grid.map((row) => row.map(() => false))
    );

    const [wonCardsMask, setwonCardsMask] = useState(
        grid.map((row) => row.map(() => false))
    );

    const [selectedCardValue, setSelectedCardValue] = useState(null);

    const [counter, setCounter] = useState(0);

    const cardsSelected = [].concat
        .apply([], selectedGridMask)
        .reduce((accum, next) => accum + next, 0);

    var pairSelected = cardsSelected >= 2;

    function appendWonCards(selctedGridMask) {
        const newWonCardsMask = [...wonCardsMask];
        wonCardsMask.forEach((rowValue, rowIndex) => {
            rowValue.forEach((columnValue, columnIndex) => {
                newWonCardsMask[rowIndex][columnIndex] =
                    columnValue || selectedGridMask[rowIndex][columnIndex];
            });
        });
        return newWonCardsMask;
    }

    function selectCard(row, column) {
        const newselectedGridMask = [...selectedGridMask];
        newselectedGridMask[row][column] = !newselectedGridMask[row][column];
        setselectedGridMask(newselectedGridMask);

        if (cardsSelected >= 1 && newselectedGridMask[row][column]) {
            if (selectedCardValue === grid[row][column]) {
                setCounter((prevState) => prevState + 1);
                setwonCardsMask(appendWonCards(selectedGridMask));
                console.log(appendWonCards(selectedGridMask));
                setselectedGridMask(grid.map((row) => row.map(() => false)));
            } else {
                setTimeout(() => {
                    setselectedGridMask(
                        grid.map((row) => row.map(() => false))
                    );
                    setSelectedCardValue(null);
                }, 1000);
            }
        } else if (newselectedGridMask[row][column]) {
            setSelectedCardValue(grid[row][column]);
        }
    }

    console.log("selected:", selectedGridMask);
    console.log("pair?:", pairSelected);
    console.log("cardValue:", selectedCardValue);
    console.log("counter:", counter);
    console.log("cardsSelected:", cardsSelected);

    return (
        <div className="grid">
            <div>{`pairs found: ${counter}`}</div>
            {grid.map((row, rowIndex) => (
                <div className="row">
                    {row.map((element, columnIndex) => (
                        <div
                            onClick={() => selectCard(rowIndex, columnIndex)}
                            className={
                                !wonCardsMask[rowIndex][columnIndex]
                                    ? "card"
                                    : "card won"
                            }
                            disabled={
                                pairSelected ||
                                wonCardsMask[rowIndex][columnIndex]
                                    ? true
                                    : false
                            }
                        >
                            {selectedGridMask[rowIndex][columnIndex] ||
                            wonCardsMask[rowIndex][columnIndex]
                                ? element
                                : null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default MemoryGame;
