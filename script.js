let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box,
};
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
};
let direction = "right";
let pontuacao = document.getElementById("pontuacao");
let pontos = 0;
let avisos = document.getElementById("avisos");

function limparJogo() {
    snake = [];
    snake[0] = {
        x: 8 * box,
        y: 8 * box,
    };
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function carregarJogo() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0 * box;
    if (snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0 * box;
    if (snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            avisos.innerHTML = "Game Over!";
            avisos.style.display = "initial";
            pontos = 0;
            document.getElementById("reiniciar").style.display = "initial";
            clearInterval(jogo);
            limparJogo();
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;

        pontos = pontos + 1;
        pontuacao.innerHTML = "Pontua????o: " + pontos;
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    snake.unshift(newHead);
}

function iniciarContador() {
    var s = 3;

    var contador = setInterval(function () {
        if (s > 0) {
            avisos.innerHTML = s;
            s = s - 1;
        } else {
            clearInterval(contador);
            avisos.style.display = "none";
            let jogo = setInterval(carregarJogo, 120);
        }
    }, 1000);
}

function iniciarJogo() {
    limparJogo();
    iniciarContador();
    document.getElementById("iniciar").style.display = "none";
    pontuacao.innerHTML = "Pontua????o: " + pontos;
}

function reiniciarJogo() {
    limparJogo();
    iniciarContador();
    document.getElementById("reiniciar").style.display = "none";
    pontuacao.innerHTML = "Pontua????o: " + pontos;
}

criarBG();
