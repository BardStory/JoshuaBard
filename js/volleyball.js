const container = document.createElement("div");
container.style.position = "fixed";
container.style.right = "0";
container.style.top = "50%";
container.style.transform = "translateY(-50%)";
container.style.width = "220px";
container.style.padding = "10px";
container.style.background = "rgba(0, 0, 0, 0.8)";
container.style.color = "white";
container.style.textAlign = "center";
container.style.borderRadius = "10px";
container.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
container.style.zIndex = "1000";
document.body.appendChild(container);

const toggleButton = document.createElement("button");
toggleButton.innerText = "Toggle Game";
toggleButton.style.marginBottom = "10px";
toggleButton.style.padding = "8px";
toggleButton.style.background = "#ff9800";
toggleButton.style.color = "white";
toggleButton.style.border = "none";
toggleButton.style.borderRadius = "5px";
toggleButton.style.cursor = "pointer";
container.appendChild(toggleButton);

const canvas = document.createElement("canvas");
canvas.width = 200;
canvas.height = 400;
canvas.style.background = "#f0f0f0";
canvas.style.display = "none";
container.appendChild(canvas);

const ctx = canvas.getContext("2d");
let ball = { x: 100, y: 100, radius: 15, dy: 2, gravity: 0.5, bounce: -10, score: 0 };
let player = { x: 80, y: 300, width: 40, height: 10, speed: 5 };

const keys = { w: false, s: false, a: false, d: false };

document.addEventListener("keydown", (event) => {
    if (event.key === "w") keys.w = true;
    if (event.key === "s") keys.s = true;
    if (event.key === "a") keys.a = true;
    if (event.key === "d") keys.d = true;
});

document.addEventListener("keyup", (event) => {
    if (event.key === "w") keys.w = false;
    if (event.key === "s") keys.s = false;
    if (event.key === "a") keys.a = false;
    if (event.key === "d") keys.d = false;
});

toggleButton.addEventListener("click", () => {
    canvas.style.display = canvas.style.display === "none" ? "block" : "none";
});

function update() {
    if (keys.w && player.y > 0) player.y -= player.speed;
    if (keys.s && player.y < canvas.height - player.height) player.y += player.speed;
    if (keys.a && player.x > 0) player.x -= player.speed;
    if (keys.d && player.x < canvas.width - player.width) player.x += player.speed;
    
    ball.dy += ball.gravity;
    ball.y += ball.dy;
    
    if (ball.y + ball.radius >= canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.dy *= -0.8;
    }
    
    // Collision with player
    if (ball.y + ball.radius >= player.y && ball.y - ball.radius <= player.y + player.height &&
        ball.x + ball.radius >= player.x && ball.x - ball.radius <= player.x + player.width) {
        ball.dy = ball.bounce;
        ball.score++;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw ball
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw player
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Score
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + ball.score, 10, 20);
}

function loop() {
    if (canvas.style.display !== "none") {
        update();
        draw();
    }
    requestAnimationFrame(loop);
}

loop();
