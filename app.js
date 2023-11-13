const canvas = document.getElementById('bouncing-balls');
const ctx = canvas.getContext('2d');

const balls = [];

class Ball {
  constructor(x, y, radius, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 3);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.speedY = -this.speedY;
    }
  }
}

function createRandomBall() {
  const radius = Math.random() * 10 + 10;
  const x = Math.random() * (canvas.width - radius * 2) + radius;
  const y = Math.random() * (canvas.height - radius * 2) + radius;
  const color = getRandomColor();
  const speedX = (Math.random() - 0.5) * 5;
  const speedY = (Math.random() - 0.5) * 5;

  const ball = new Ball(x, y, radius, color, speedX, speedY);
  balls.push(ball);
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach(ball => {
    ball.draw();
    ball.update();
  });

  requestAnimationFrame(animate);
}

for (let i = 0; i < 7; i++) {
  createRandomBall();
}

setInterval(createRandomBall, 10000);

animate();
