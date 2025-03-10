const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


//Obtiene las dimensiones de la pantalla actual

const window_height = window.innerHeight;
const window_width = window.innerWidth;


canvas.height = window_height;
canvas.width = window_width;


canvas.style.background = "#ff8";


class Circle {

constructor(x, y, radius, color, text, speed) {

this.posX = x;
this.posY = y;
this.radius = radius;
this.color = color;
this.text = text;
this.speed = speed;
this.dx = 1 * this.speed;
this.dy = 1 * this.speed;
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


update(context) {

this.draw(context);


if ((this.posX + this.radius) > window_width) {

this.dx = -this.dx;

}


if ((this.posX - this.radius) < 0) {

this.dx = -this.dx;

}


if ((this.posY - this.radius) < 0) {

this.dy = -this.dy;

}


if ((this.posY + this.radius) > window_height) {

this.dy = -this.dy;

}


this.posX += this.dx;

this.posY += this.dy;

}


}


let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;
let randomRadius = Math.floor(Math.random() * 100 + 30);
let miCirculo = new Circle(100, 100, 50, "blue", "1", 3);
let miCirculo2 = new Circle(450, 150, 80, "blue", "2", 3);
miCirculo.draw(ctx);
miCirculo2.draw(ctx);


let updateCircle = function () {

requestAnimationFrame(updateCircle);

ctx.clearRect(0, 0, window_width, window_height);

miCirculo.update(ctx);

miCirculo2.update(ctx);

};


updateCircle();