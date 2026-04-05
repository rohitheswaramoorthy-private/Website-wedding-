// Scroll to next page
document.querySelector(".page1").addEventListener("click", () => {
  window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
});

// Google Map
function openMap() {
  window.open("https://maps.app.goo.gl/DAGrEyq78ii4sw8QA");
}

// MUSIC
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");

window.addEventListener("load", () => {
  music.play().catch(() => {
    document.body.addEventListener("click", () => music.play(), { once: true });
  });
});

btn.onclick = () => {
  if (music.paused) { music.play(); btn.innerText="🔊"; }
  else { music.pause(); btn.innerText="🔇"; }
};

// TEMPLE PARALLAX
window.addEventListener("scroll", () => {
  let y = window.scrollY;
  document.querySelector(".temple-img").style.transform =
    `translateY(${y * 0.3}px)`;
});

// BUTTERFLIES
const canvas = document.getElementById("butterflyCanvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

class Butterfly {
  constructor(){
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    this.angle=Math.random()*6.28;
    this.speed=1;
    this.phase=Math.random()*6.28;
    this.color=`hsl(${Math.random()*360},70%,60%)`;
  }

  drawWing(side){
    let flap=Math.sin(this.phase)*0.6;

    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.angle);
    ctx.scale(side,1);
    ctx.rotate(flap);

    ctx.fillStyle=this.color;
    ctx.beginPath();
    ctx.bezierCurveTo(20,-10,50,0,40,30);
    ctx.bezierCurveTo(10,20,0,0,0,0);
    ctx.fill();

    ctx.restore();
  }

  update(){
    this.x+=Math.cos(this.angle)*this.speed;
    this.y+=Math.sin(this.angle)*this.speed;
    this.angle+=(Math.random()-0.5)*0.1;
    this.phase+=0.2;

    this.drawWing(-1);
    this.drawWing(1);
  }
}

let bfly=[];
for(let i=0;i<12;i++) bfly.push(new Butterfly());

function animateB(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  bfly.forEach(b=>b.update());
  requestAnimationFrame(animateB);
}
animateB();

// FLOWERS
const fCanvas=document.getElementById("flowers");
const fctx=fCanvas.getContext("2d");
fCanvas.width=innerWidth;
fCanvas.height=innerHeight;

let blooms=[];

class Flower{
  constructor(x,y){
    this.x=x; this.y=y;
    this.r=0; this.alpha=1;
  }
  draw(){
    for(let i=0;i<6;i++){
      let a=i*Math.PI/3;
      fctx.beginPath();
      fctx.arc(
        this.x+Math.cos(a)*this.r,
        this.y+Math.sin(a)*this.r,
        this.r/4,0,6.28
      );
      fctx.fillStyle="pink";
      fctx.globalAlpha=this.alpha;
      fctx.fill();
    }
  }
  update(){
    this.r+=2;
    this.alpha-=0.02;
    this.draw();
  }
}

window.addEventListener("click",e=>{
  for(let i=0;i<5;i++){
    blooms.push(new Flower(e.clientX,e.clientY));
  }
});

function animateF(){
  fctx.clearRect(0,0,fCanvas.width,fCanvas.height);
  blooms.forEach((b,i)=>{
    b.update();
    if(b.alpha<=0) blooms.splice(i,1);
  });
  requestAnimationFrame(animateF);
}
animateF();
