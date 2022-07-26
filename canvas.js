const canvas = document.querySelector('canvas');
const c =  canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
class Circle{
  static change = 5;
  static radius = Math.random() * 3 + 1;
  constructor({position,velocity}) {
    this.position = position;
    this.velocity = velocity;
    this.radius = Math.random() * 3 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)]
    this.minRadius = 4;
    this.maxRadius = 30;
  }
  draw () {
    c.beginPath();
    c.arc(this.position.x, this.position.y,this.radius, 0,Math.PI * 2)
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.x >= innerWidth || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x;
    }
    else if (this.position.y >= innerHeight || this.position.y <= 0) {
      this.velocity.y = -this.velocity.y;
    }
    if (touchPosition.y - this.position.y < 50 && touchPosition.y - this.position.y > -50 && touchPosition.x - this.position.x < 50 && touchPosition.x - this.position.x > -50 && this.radius < this.maxRadius) {
      this.radius += 1;
    } 
    else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
  }
}
let colors = ["#D00000","#FFBA08", "#370617", "#000000", "#F48C06"]; 
let touchPosition = {
  x:undefined, 
  y:undefined
} 
let circles = [];
for (let i = 0 ; i < 1800; i++) {
  circles.push(new Circle({
    position:{
      x:Math.random() * (innerWidth - Circle.radius * 2) + Circle.radius, 
      y:Math.random() * (innerHeight - Circle.radius * 2) + Circle.radius
    }, 
    velocity:{
      x:(Math.random() - 0.5) * Circle.change, 
      y:(Math.random() - 0.5) * Circle.change
    }
  }))
}
function animate() {
  c.clearRect(0,0,innerWidth, innerHeight)
  requestAnimationFrame(animate);
  circles.map(circle => {
    circle.update();
  })
}
animate();
function event(e)  {
  for (let i = 0; i < e.touches.length; i++) {
     touchPosition.x = e.touches[i].clientX;
     touchPosition.y = e.touches[i].clientY;
  }
}
addEventListener("touchmove", event)
