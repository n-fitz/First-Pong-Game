const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.backgroundColor = "#1c478c";

// // ___________________ mouse input___________________

// let mouse = {
//   down: false,
//   x: 0,
//   y: 0
// };
// canvas.addEventListener("mousemove", event => {
//   mouse.x = event.clientX;
//   mouse.y = event.clientY;
// });
// canvas.addEventListener("mousedown", event => {
//   mouse.down = true;
//   // console.log(mouse);
// });
// canvas.addEventListener("mouseup", event => {
//   mouse.down = false;
// });


// // ___________________ key input___________________
let left = false
let right = false
let up = false
let down = false

window.addEventListener("keyup", function(event) {
  switch (event.code) {
    case "ArrowRight":
      right = false
      break;
    case "ArrowLeft":
      left = false
      break;
    case "ArrowUp":
      up = false
      break;
    case "ArrowDown":
      down = false
      break;
  }
});


window.addEventListener("keydown", function(event) {
  console.log(event.code)
  switch (event.code) {
    case "ArrowRight":
      right = true
      break
    case "ArrowLeft":
      left = true
      break
    case "ArrowUp":
      up = true
      break
    case "ArrowDown":
      down = true
      break
  }
})


//-----------------------------------------------------------------//
function createTheRectangle(x, y, w, l) {
  ctx.fillRect(x, y, w, l);
}

var keys = [];
document.onkeydown = function(e) {
  keys[e.keyCode] = true;

}
document.onkeyup = function(e) {
  keys[e.keyCode] = false;
}


const P1 = {
  X: 5,
  Y: canvas.height / 2,
  L: 90,
  W: 30,
  score: 0
}

const P2 = {
  X: canvas.width - 35,
  Y: canvas.height / 2,
  L: 90,
  W: 30,
  score: 0
}

const ball = {
  x: 0,
  y: 0,
  r: 5,
  Vx: 0,
  Vy: 0,
  speed: 2,
  color: "#faeb1b"
};




function cycle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white"

  createTheRectangle(P1.X, P1.Y, P1.W, P1.L)
  createTheRectangle(P2.X, P2.Y, P2.W, P2.L)

  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
  ctx.fillStyle = ball.color;
  ctx.fill();

  if (keys[81]) {
    P1.Y -= 3
  }

  if (keys[65]) {
    P1.Y += 3
  }

  if (keys[76]) {
    P2.Y += 3
  }

  if (keys[80]) {
    P2.Y -= 3
  }

  function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    if (Math.random() < 0.5) {
      ball.Vx = ball.speed;
    } else {
      ball.Vx = -ball.speed;
    }
  }


  function ballMove() {
    ball.x += ball.Vx;
    ball.y += ball.Vy;
    //vertical wall collision
    if (ball.y - ball.r < 0) {
      ball.Vy = ball.speed;
    }
    if (ball.y + ball.r > canvas.height) {
      ball.Vy = -ball.speed;
    }
    //horizontal wall collision, scoring
    if (ball.x - ball.r < 0) {
      P2.score++;
      resetBall();
    }
    if (ball.x + ball.r > canvas.width) {
      P1.score++;
      resetBall();


    }
  }
  ballMove();

  // document.getElementById('score2').innerHTML = P2.score;
  document.createElement('score1').innerHTML = P1.score;


  function paddleBallCollision() {
    if (ball.x - ball.r < P1.X + P1.W &&
      ball.x - ball.r > P1.X - ball.speed * 2 &&
      ball.y > P1.Y &&
      ball.y < P1.Y + P1.L) {
      ball.Vx = ball.speed;
    }
    if (ball.x + ball.r > P2.X &&
      ball.x + ball.r < P2.X + ball.speed * 2 &&
      ball.y > P2.Y &&
      ball.y < P2.Y + P2.L) {
      ball.Vx = -ball.speed;
    }
  }

  paddleBallCollision();


  requestAnimationFrame(cycle);
}

requestAnimationFrame(cycle);