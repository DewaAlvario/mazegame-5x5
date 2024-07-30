let maze = [
  [9, 5, 7, 9, 5],
  [7, 5, 8, 7, 6],
  [7, 5, 5, 6, 8],
  [5, 9, 5, 5, 9],
  [7, 5, 8, 8, 9]
];
let mazeSize = 5;
let cellSize = 100;
let playerX = 0;
let playerY = 0;
let totalSum = 0;
let visited = []; // Menyimpan sel yang sudah dikunjungi
let stopMoving = false;
let kunciJawaban = 42;

function setup() {
  createCanvas(mazeSize * cellSize + 20, mazeSize * cellSize + 40);
  totalSum = maze[playerY][playerX]; // Mulai dari angka awal di posisi (0, 0)
  frameRate(10); // Atur frame rate agar gerakan otomatis lebih terlihat
  visited.push({ x: playerX, y: playerY });
  console.table(visited.push({ x: playerX, y: playerY }))
}

function draw() {
  background(255);
  drawMaze();
  drawPlayer();
  drawTotalSum();
  if (!stopMoving) {
    movePlayer();
  }
  
}

function drawMaze() {
  for (let i = 0; i < mazeSize; i++) {
    for (let j = 0; j < mazeSize; j++) {
      let x = j * cellSize;
      let y = i * cellSize;
      stroke(0);
      noFill();
      rect(x, y, cellSize, cellSize);
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(32);
      text(maze[i][j], x + cellSize / 2, y + cellSize / 2);
      if(i <= 4 && j < 4 ){
        drawArrow(x + 98,y + 50,x + 105,y + 50,'black');
      }
      if(j <= 4 && i < 4 ){
        drawArrow(x + 50,y + 98,x + 50,y + 105,'black');
      }
      if(i==0 && j==0){
      fill('green');
      noStroke();
      textSize(18);
      textAlign(CENTER)
      text('START',x+50,y+15);
      }
      if(i==4 && j==4){
      fill('red');
      noStroke();
      textSize(18);
      textAlign(CENTER)
      text('FINISH',x+50,y+85);  
      }
    }
  }
}

function drawPlayer() {
  noStroke();
  fill('green');
  ellipse(playerX * cellSize + cellSize / 2, playerY * cellSize + cellSize / 2, cellSize / 2);
}

function drawTotalSum() {
  fill(0);
  textSize(24);
  textAlign(CENTER, TOP);
  if(totalSum == kunciJawaban){
    fill('green');
    text("Angka yang dikumpulkan: " + totalSum, 200, 505);
  }
  else{
    fill('red');
    text("Angka yang dikumpulkan: " + totalSum, 200, 505);
  }
}

function movePlayer() {
  let directions = [];
  if (kb.pressed ('down') && playerY < mazeSize - 1) directions.push({ x: playerX, y: playerY + 1 }); // Bawah
  if (kb.pressed ('right') && playerX < mazeSize - 1) directions.push({ x: playerX + 1, y: playerY }); // Kanan
  
  let maxNum = -Infinity;
  let nextMove = null;

  for (let dir of directions) {
    let num = maze[dir.y][dir.x];
    maxNum = num;
    nextMove = dir;
  }

  if (nextMove) {
    totalSum += maxNum;
    playerX = nextMove.x;
    playerY = nextMove.y;
    visited.push({ x: playerX, y: playerY });
    if (totalSum == kunciJawaban) {
      stopMoving = true;
    }
  }
}

function isVisited(x, y) {
  for (let pos of visited) {
    if (pos.x === x && pos.y === y) {
      return true;
    }
  }
  return false;
}

function drawArrow(x1, y1, x2, y2,warna) {
  // Menggambar batang panah
  stroke(warna);
  strokeWeight(2);
  line(x1, y1, x2, y2);
  
  // Menghitung sudut panah
  let angle = atan2(y2 - y1, x2 - x1);
  
  // Menghitung posisi kepala panah
  let arrowSize = 10;
  push(); // Menyimpan keadaan transformasi saat ini
  translate(x2, y2); // Mentranslasi origin ke ujung panah
  rotate(angle); // Memutar kanvas ke arah panah
  // Menggambar kepala panah
  fill(warna);
  triangle(0, 0, -arrowSize, arrowSize / 2, -arrowSize, -arrowSize / 2);
  pop(); // Mengembalikan keadaan transformasi yang disimpan
}
