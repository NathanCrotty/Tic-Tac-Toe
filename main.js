const players = (function () {
    /* The players module has 3  */

    let sign = "X";
    function start() {
        document.querySelector("#names").style = "display: none;";
    }
    function play(x, y) {
        if (gameboard.coordinates(x, y) == "") {
            gameboard.update(x, y, sign);
            if (sign == "X") {
                sign = "O";
            } else {
                sign = "X";
            }
        }
        displayController.update();


    }
    function reset() {
        gameboard.reset();
        displayController.reset();
    }
    return {
        play,
        reset,
        start
    }
})()

const gameboard = (function () {
    let array = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
    function coordinates(x, y) {
        return array[2 - y][x];
    }
    function reset() {
        array = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    }
    return {
        reset,
        array,
        coordinates,
        update: function (x, y, text) {
            array[2 - y][x] = text;
        },
        isWin: function () {

            //horizontal
            for (let y = 0; y <= 2; y++) {
                if (
                    coordinates(0, y) != "" &&
                    coordinates(0, y) == coordinates(1, y) &&
                    coordinates(1, y) == coordinates(2, y)
                ) {
                    return coordinates(0, y);
                }
            }

            //vertical
            for (let x = 0; x <= 2; x++) {
                if (
                    coordinates(x, 0) != "" &&
                    coordinates(x, 0) == coordinates(x, 1) &&
                    coordinates(x, 1) == coordinates(x, 2)
                ) {
                    return coordinates(x, 0);
                }
            }

            //diagonal
            if (
                coordinates(0, 0) == coordinates(1, 1) &&
                coordinates(1, 1) == coordinates(2, 2)
            ) {
                return coordinates(0, 0);
            }
            if (
                coordinates(2, 0) == coordinates(1, 1) &&
                coordinates(1, 1) == coordinates(0, 2)
            ) {
                return coordinates(2, 0);
            }
        }
    }
})();

const displayController = (function () {
    boxes = document.querySelector("#gameboard").children;
    function coordinates(x, y) {
        for (let i = 0; i < 9; i++) {
            if (boxes[i].getAttribute("onclick") == `players.play(${x}, ${y})`) {
                let node = boxes[i];
                return node;
            }
        }
    }
    function setOnclick() {
        let x = 0;
        let y = 2;
        for (let i = 0; i < 9; i++) {
            boxes[i].setAttribute("onclick", `players.play(${x}, ${y})`)
            if (x >= 2) {
                x = 0;
                y = y - 1;
            }
            else {
                x++;
            }
        }
    }
    setOnclick()
    function win() {
        let winner = "";
        let inputs = document.querySelector("#names").querySelectorAll("input");
        
        const names = [];
        names[0] = inputs[0].value;
        names[1] = inputs[1].value;

        const container = document.querySelector("#win");
        container.style = "display: flex;";
        if (gameboard.isWin() == "X") {
            winner = names[0];
        }
        else {
            winner = names[1];
        }


        container.querySelector("h2").innerHTML = `${winner} won`;

    }
    function update() {
        let x = 0;
        let y = 2;
        for (let i = 0; i < 9; i++) {
            boxes[i].innerHTML = gameboard.coordinates(x, y);
            if (gameboard.isWin()) {
                win();
            }

            if (x >= 2) {
                x = 0;
                y = y - 1;
            }
            else {
                x++;
            }
        }
    }
    function reset() {
        update();
        const container = document.querySelector("#win");
        container.style = "display: none;";

    }
    return {
        reset,
        update,
        coordinates,
        win
    }
})()
displayController.update();


