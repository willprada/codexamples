window.onload = function(){
  let canvas = document.getElementById('cnv');
  let ctx = canvas.getContext('2d');
  let date_now = Date.now;

  let w = canvas.width;
  let h = canvas.height;

  let scale = 10;
  let r = 100;
  let rp = 6;
  let x = w/2;
  let y = h/2;
  let xp = 0;
  let yp = 0;
  let t = 0;
  let it = 0;
  let et = 0;
  let deg = 90;
  let rad = deg * Math.PI / 180;


  function draw() {
   ctx.beginPath();
   ctx.arc(x, y, r, 0, 2 * Math.PI);
   ctx.stroke();

   ctx.beginPath();
   ctx.moveTo(x+r+20, y-r);
   ctx.lineTo(x+r+20, y+r);
   ctx.stroke();

   ctx.beginPath();
   ctx.moveTo(x-r, y+r+20);
   ctx.lineTo(x+r, y+r+20);
   ctx.stroke();

   ctx.beginPath();
   ctx.arc(xp, yp, rp, 0, 2 * Math.PI);
   ctx.fillStyle = '#aa3333';
   ctx.fill();

   ctx.beginPath();
   ctx.arc(x+r+20, yp, rp, 0, 2 * Math.PI);
   ctx.fillStyle = '#aa3333';
   ctx.fill();

   ctx.beginPath();
   ctx.arc(xp, y+r+20, rp, 0, 2 * Math.PI);
   ctx.fillStyle = '#aa3333';
   ctx.fill();
  }


  function animate() {
   et = date_now();
   t = (et - it) / 1000;

   xp = x + (r * Math.cos(rad*t));
   yp = y - (r * Math.sin(rad*t));

   canvas.width = w;
   draw();
   requestAnimationFrame(animate);
  }

  it = date_now();
  animate();
}
