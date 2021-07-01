

const gameController = ((playerPlaying, playerWaiting) => {
    function swapPlayers(params) {
        let temp = playerPlaying;
        playerPlaying = playerWaiting;
        playerWaiting = temp;
    }

    function playCell(i, j) {
        const done = gameBoard.setCell(i, j, playerPlaying);
        if (done) {            
            swapPlayers();
            return gameBoard.getResult();
        }

        return null;
    }

    function getCell(i, j) {
        return gameBoard.getCell(i, j);
    }

    /*
    Returns the player whose turn it is as the first and the other as the second in an array.
    */
    function getOrder(params) {
        return [playerPlaying, playerWaiting];
    }

    const gameBoard = (function(params) {
        const selector = document.querySelector("#gameBoard");
        const map = new Array(3);
    
        const init = () => {
            for (let i = 0; i < 3; i++) {
                map[i] = new Array(3);
                for (let j = 0; j < 3; j++) {
                    map[i][j] = null;
                }
            }    
        }

        init();
    
        function getResult(params) {
            let empty = 0;
            for (let i = 0; i < 3; i++) {   
                for (let j = 0; j < 3; j++) {
                    if (map[i][j] == null) empty++;
                }
            }
    
    
            for (let i = 0; i < 3; i++) {
                let end = true;
                for (let j = 1; j < 3; j++) {
                    if (map[i][j] != map[i][0]) end = false;
                }
                if (end && map[i][0] != null) return map[i][0];
            }
            for (let j = 0; j < 3; j++) {        
                let end = true;
                for (let i = 1; i < 3; i++) {
                    if (map[i][j] != map[0][j]) end = false;
                }
                if (end && map[0][j]
                     != null) return map[0][j];
            }
    
            let end = true;
            for (let i = 0, j = 0; i < 3; i++, j++) {
                if (map[i][j] != map[0][0]) end = false;
            }
            if (end && map[0][0] != null) return map[0][0];
    
            let end2 = true;
            for (let i = 2, j = 0; i >= 0; i--, j++) {
                if (map[i][j] != map[2][0]) end2 = false;
            }
            if (end2 && map[2][0] != null) return map[2][0];
    
            if (empty == 0) {
                return "draw";
            }
            return "continue";
        }
    
        function setCell(i, j, player) {
            if (map[i][j] == null) {
                console.log(player);
                map[i][j] = player;
                return true;
            }
            return false;
        }
    
        function getCell(i, j) {
            return map[i][j];
        }

    
        return {getResult, setCell, getCell};
    })();



    return {playCell, getOrder, getCell};
});




const player = (isCircle, name) =>{
    let type;
    if (isCircle) type = "circle";
    else type = "cross";
    let score = 0;

    function win(params) {
        score++;
    }

    function getScore(params) {
        return score;
    }

    return {win, name, type, getScore};
}

const displayMenu = (() => {
    const menu = document.querySelector("#menu");
    const playButton = document.querySelector("#playButton");
    const inputName1 = document.querySelector("#inputName1");
    const inputName2 = document.querySelector("#inputName2");

    playButton.addEventListener("click", tryToAdvance);
    

    function turnOn(params) {
        menu.style.display = "flex";
    }

    function turnOff(params) {
        menu.style.display = "none";
    }

    function tryToAdvance(params) {
        const name1 = inputName1.value;
        const name2 = inputName2.value;
        if (!name1) {
            alert("Starting player's name is empty!");
            return;
        }
        if (!name2) {
            alert("Other player's name is empty!");
            return;
        }
        /*
        if (name1 == name2) {
            alert("The names must not be the same!");
            return;
        }
        */

        displayController.advanceToGame(player(true, name1), player(false, name2));
    }

    return {turnOn, turnOff};
})();

const displayGame = (() => {
    const game = document.querySelector("#game");
    const grid = document.querySelector("#grid");
    const menuButton = document.querySelector("#menuButton");
    const restartButton = document.querySelector("#restartButton");
    const messageSpan = document.querySelector("#messageSpan");
    const scoreName1 = document.querySelector("#scoreName1");
    const scoreName2 = document.querySelector("#scoreName2");
    const scoreNumber1 = document.querySelector("#scoreNumber1");
    const scoreNumber2 = document.querySelector("#scoreNumber2");
    
    let player1;
    let player2;
    let round;

    let firstPlayerHasTurn;

    menuButton.addEventListener("click", returnToMenu);
    restartButton.addEventListener("click", () => (init(player1, player2, firstPlayerHasTurn)));

    function init(nextPlayer1, nextPlayer2, changeOrder) {
        firstPlayerHasTurn = !changeOrder;
        player1 = nextPlayer1;
        player2 = nextPlayer2;
        if (changeOrder) round = gameController(player2, player1);
        else round = gameController(player1, player2);

        scoreName1.textContent = player1.name;
        scoreName2.textContent = player2.name; 

        updateScore();
        updateGrid();
        setHasTurnMessage(); 
    }

    function updateGrid(params) {
        const childrenArray = Array.from(grid.childNodes);
        childrenArray.forEach(child => child.remove());
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const block = document.createElement("div");
                block.classList.add("block");
                block.dataset.i = i;
                block.dataset.j = j;
                if (round.getCell(i, j) != null) {
                    if (round.getCell(i, j).type === "circle") {
                        block.textContent = "O";
                        block.style.color = "blue";
                    } else {
                        block.textContent = "X";
                        block.style.color = "red";
                    }
                }
                block.addEventListener("click", playCell);
                grid.appendChild(block);
            }
        }        
    }

    function updateScore(params) {
        scoreNumber1.textContent = player1.getScore();
        scoreNumber2.textContent = player2.getScore();
    }

    function playCell() {
        const i = this.dataset.i;
        const j = this.dataset.j;
        processResult(round.playCell(i, j));
    }

    function setHasTurnMessage(params) {
        messageSpan.textContent = "It's " + round.getOrder()[0].name + "'s turn.";
    }

    function setHasWonMessage(player) {
        messageSpan.textContent = "The winner is " + player.name + "!";
    }

    function setDrawMessage(params) {
        messageSpan.textContent = "It's a draw!";
    }

    function processResult(result) {
        console.log(result);
        console.log(round.getCell(0, 0));
        updateGrid();
        if (result == null) return;
        if (result === "continue") {
            setHasTurnMessage();
            return;
        }

        grid.childNodes.forEach(child => child.removeEventListener("click", playCell));

        if (result == "draw") setDrawMessage();
        else {
            result.win();
            setHasWonMessage(result);
        }

        updateScore();
    }
    
    function turnOn(params) {
        game.style.display = "block";
    }

    function turnOff(params) {
        game.style.display = "none";
    }

    function returnToMenu(params) {
        displayController.turnOnMenu();
    }

    return {turnOn, turnOff, init};
})();


const displayController = (function (params) {
    let player1;
    let player2;
    
    turnOnMenu();
    
    function turnOnMenu(params) {
        displayMenu.turnOn();
        displayGame.turnOff();
    }

    function turnOnGame(params) {
        displayMenu.turnOff();
        displayGame.turnOn();
    }

    function advanceToGame(nextPlayer1, nextPlayer2) {
        player1 = nextPlayer1;
        player2 = nextPlayer2;

        displayGame.init(player1, player2, false);
        turnOnGame();
    }

    return {advanceToGame, turnOnMenu};
})();

console.log("oj");










