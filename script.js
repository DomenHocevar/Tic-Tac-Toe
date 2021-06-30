

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
        const size = 3;
        const map = new Array(size);
    
        const reset = () => {
            for (let i = 0; i < size; i++) {
                map[i] = new Array(size);
                for (let j = 0; j < size; j++) {
                    map[i][j] = null;
                }
            }    
        }

        reset();
    
        function getResult(params) {
            let empty = 0;
            for (let i = 0; i < size; i++) {   
                for (let j = 0; j < size; j++) {
                    if (map[i][j] == null) empty++;
                }
            }
    
    
            for (let i = 0; i < size; i++) {
                let end = true;
                for (let j = 1; j < size; j++) {
                    if (map[i][j] != map[i][0]) end = false;
                }
                if (end && map[i][0] != null) return map[i][0];
            }
            for (let j = 0; j < size; j++) {        
                let end = true;
                for (let i = 1; i < size; i++) {
                    if (map[i][j] != map[0][j]) end = false;
                }
                if (end && map[0][j]
                     != null) return map[0][j];
            }
    
            let end = true;
            for (let i = 0, j = 0; i < size; i++, j++) {
                if (map[i][j] != map[0][0]) end = false;
            }
            if (end && map[0][0] != null) return map[0][0];
    
            let end2 = true;
            for (let i = size - 1, j = 0; i >= 0; i--, j++) {
                if (map[i][j] != map[size - 1][0]) end = false;
            }
            if (end && map[size - 1][0] != null) return map[size - 1][0];
    
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

const displayMenu = () => {
    const menu = document.querySelector("menu");
    
    function turnOn(params) {
        menu.style.display = "block";
    }

    function turnOff(params) {
        menu.style.display = "none";
    }
}

const displayGame {

}


const displayController = (function (params) {
    
})();









