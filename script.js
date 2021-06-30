

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
            for (let i = 3 - 1, j = 0; i >= 0; i--, j++) {
                if (map[i][j] != map[2][0]) end = false;
            }
            if (end && map[2][0] != null) return map[2][0];
    
            if (empty == 0) {
                return "draw";
            }
            return "continue";
        }
    
        function setCell(i, j, player) {
            if (map[i][j] == null) {
                map[i][j] = player;
                return true;
            }
            return false;
        }
    
        function getCell(params) {
            map[i][j]
        }

    
        return {getResult, setCell, getCell};
    })();



    return {playCell, getOrder};
});




const player = (isCircle, name) =>{
    let type;
    if (isCircle) type = "circle";
    else type = "cross";
    let score = 0;

    function win(params) {
        score++;
    }

    return {win, name, type};
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


        displayController.advanceToGame(player(true, name1), player(false, name2));
    }

    return {turnOn, turnOff};
})();

const displayGame = (() => {
    const game = document.querySelector("#game");
    const grid = document.querySelector("#grid");
    const menuButton = document.querySelector("#menuButton");
    menuButton.addEventListener("click", returnToMenu);
    
    let round;
    let ended;

    function init(nextPlayer1, nextPlayer2) {
        round = gameController(nextPlayer1, nextPlayer2);
        ended = false;

        const childrenArray = Array.from(grid.childNodes);
        childrenArray.forEach(child => child.remove());
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const block = document.createElement("div");
                block.classList.add("block");
                block.dataset.i = i;
                block.dataset.j = j;
                grid.appendChild(block);
            }
        } 
    }

    function update(params) {
        
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

        displayGame.init(player1, player2);
        turnOnGame();
    }

    return {advanceToGame, turnOnMenu};
})();

console.log("oj");










