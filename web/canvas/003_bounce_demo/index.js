window.onload = function(){
  let canvas = document.getElementById('cnv');
  let ctx = canvas.getContext('2d');
  let btn_start = document.getElementById('start');
  let btn_stop = document.getElementById('stop');
  let btn_venus = document.getElementById('venus');
  let btn_earth = document.getElementById('earth');
  let btn_moon = document.getElementById('moon');
  let btn_mars = document.getElementById('mars');
  let btn_jupiter = document.getElementById('jupiter');
  let btn_neptune = document.getElementById('neptune');
  let gravity = document.getElementById('gravity');
  let ini_pos = document.getElementById('initial-position');
  let fin_vel = document.getElementById('final-velocity');
  let date_now = Date.now;
  let reqId = 0;

  let w = canvas.width;
  let h = canvas.height;

  let scale = 10;
  let r = 5;
  let x = w/2;
  let g = parseFloat(gravity.value);
  let t = 0;
  let it = 0;
  let et = 0;
  let iv = 0;
  let v = 0;
  let ip = parseInt(ini_pos.value);
  let rip = (h/scale)-ip;
  y = rip*scale;


  let gravities = {
   venus: 8.87,
   earth: 9.8,
   moon: 1.62,
   mars: 3.711,
   jupiter: 24.79,
   neptune: 11.15
  };


  ini_pos.addEventListener('keyup', setInitialPosition);
  function setInitialPosition() {
   ip = parseInt(ini_pos.value);
   ip = isNaN(ip) ? 40 : ip;
   ip = ip > 40 ? 40 : ip;
   ip = ip < 1 ? 1 : ip;

   rip = (h/scale)-ip;
   y = rip*scale;
   canvas.width = w;
   draw();
  }


  btn_start.addEventListener('click', start);
  function start() {
   btn_start.disabled = true;
   btn_venus.disabled = true;
   btn_earth.disabled = true;
   btn_moon.disabled = true;
   btn_mars.disabled = true;
   btn_jupiter.disabled = true;
   btn_neptune.disabled = true;
   ini_pos.disabled = true;

   it = date_now();
   iv = 0;
   setInitialPosition();
   draw();
   animate();
  }


  btn_stop.addEventListener('click', stop);
  function stop() {
   btn_start.disabled = false;
   btn_venus.disabled = false;
   btn_earth.disabled = false;
   btn_moon.disabled = false;
   btn_mars.disabled = false;
   btn_jupiter.disabled = false;
   btn_neptune.disabled = false;
   ini_pos.disabled = false;

   draw();
   update_data();
   cancelAnimationFrame(reqId);
  }

  btn_venus.addEventListener('click', setGravity);
  btn_earth.addEventListener('click', setGravity);
  btn_moon.addEventListener('click', setGravity);
  btn_mars.addEventListener('click', setGravity);
  btn_jupiter.addEventListener('click', setGravity);
  btn_neptune.addEventListener('click', setGravity);
  function setGravity() {
   let id = this.id;
   g = gravities[id];
   gravity.value = g;
  }


  function draw() {
   ctx.arc(x, y-r, r, 0, 2 * Math.PI);
   ctx.fillStyle = '#aa3333';
   ctx.fill();
  }


  function animate() {
   et = date_now();
   t = (et - it) / 1000;

   y = (rip + (iv*t) + (0.5*g*t*t));
   y *= scale;
   y = ~~y;

   canvas.width = w;
   draw();
   update_data();

   reqId = requestAnimationFrame(animate);
   if (y >= h) {
    iv = -(iv + (g * t));
    rip = y/scale;
    it = date_now();
   }
  }


  function update_data() {
   fin_vel.value = (-iv).toFixed(4);
  }

  draw();
}
