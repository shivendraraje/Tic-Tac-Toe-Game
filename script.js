const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let's create a function to initialze the game;
function initGame() {
    currentPlayer = "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    gameGrid = ["","","","","","","","",""];
    // UI emtying
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    })
    newGameBtn.classList.remove("active");
    //remove green colour
    boxes.forEach((box) => {
        box.classList.remove("win");
    })
};

initGame();

boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

function handleClick(index) {
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"

        // swap turn
        swapturn();
        // check if anyone winning
        checkGameOver();
    }
};

function swapturn()
{
    if(currentPlayer === "X")
    {
        currentPlayer = "O";
    }
    else
    {
        currentPlayer = "X";
    }

    //UI updation
    gameInfo.innerText = `Current Player - ${currentPlayer}`
};

newGameBtn.addEventListener("click", initGame);


function checkGameOver() 
{
    let answer = "";

    winningPositions.forEach((position) => {
        //all three boxes should be non-empty and exactly same in value
        if(  (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]] ) )
    {
        //check if winnner is X
        if(gameGrid[position[0]] === "X")
        {
            answer = "X"
        }
        else
        {
            answer = "O"
        }

        //disable pointer event
        boxes.forEach((box) => {
            box.style.pointerEvents = "none"
        });

        //now we know who is winner
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
    })

    //it means we have a winner then update UI (gameinfo & newgameBtn)
    if(answer != "")
    {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //check whether there is a tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });

    // if fillCount is 9 then there is a tie
    if(fillCount === 9)
    {
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }

}
