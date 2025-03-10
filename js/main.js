const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Dimensiones del canvas
const window_height = window.innerHeight;
const window_width = window.innerWidth;
canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speedX, speedY) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.dx = speedX;
        this.dy = speedY;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);
        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update() {
        // Rebotar en los bordes
        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }

    detectCollision(other) {
        let dx = this.posX - other.posX;
        let dy = this.posY - other.posY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < this.radius + other.radius;
    }

    resolveCollision(other) {
        let dx = other.posX - this.posX;
        let dy = other.posY - this.posY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) return; // Evitar división por 0

        // Dirección de la colisión normalizada
        let nx = dx / distance;
        let ny = dy / distance;

        // Velocidad relativa
        let dvx = this.dx - other.dx;
        let dvy = this.dy - other.dy;
        let dotProduct = dvx * nx + dvy * ny;

        // Si los círculos ya están separándose, no hacer nada
        if (dotProduct > 0) return;

        // Intercambiar velocidades en la dirección de la colisión
        this.dx -= dotProduct * nx;
        this.dy -= dotProduct * ny;
        other.dx += dotProduct * nx;
        other.dy += dotProduct * ny;
    }
}

// Crear N círculos aleatorios
const N = 10;
let circles = [];

for (let i = 0; i < N; i++) {
    let radius = Math.floor(Math.random() * 30 + 20);
    let x = Math.random() * (window_width - 2 * radius) + radius;
    let y = Math.random() * (window_height - 2 * radius) + radius;
    let speedX = (Math.random() - 0.5) * 5;
    let speedY = (Math.random() - 0.5) * 5;
    let color = "blue";
    circles.push(new Circle(x, y, radius, color, i + 1, speedX, speedY));
}

function updateCircles() {
    requestAnimationFrame(updateCircles);
    ctx.clearRect(0, 0, window_width, window_height);

    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
        circles[i].draw(ctx);

        // Detección y resolución de colisión entre círculos
        for (let j = i + 1; j < circles.length; j++) {
            if (circles[i].detectCollision(circles[j])) {
                circles[i].resolveCollision(circles[j]);
            }
        }
    }
}

updateCircles();
