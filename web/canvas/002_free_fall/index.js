window.onload = function(){
  let canvas = document.getElementById('cnv');
  let ctx = canvas.getContext('2d');
  let btn_start = document.getElementById('start');
  let gravity = document.getElementById('gravity');
  let time = document.getElementById('time');
  let ini_vel = document.getElementById('initial-velocity');
  let ini_pos = document.getElementById('initial-position');
  let cur_vel = document.getElementById('current-velocity');
  let cur_pos = document.getElementById('current-position');
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
  let iv = parseFloat(ini_vel.value);
  let v = 0;
  let ip = parseInt(ini_pos.value);
  let rip = (h/scale)-ip;
  y = rip*scale;


  ini_pos.addEventListener('keyup', function() {
   ip = parseInt(ini_pos.value);
   ip = isNaN(ip) ? 59 : ip;
   ip = ip > 59 ? 59 : ip;
   ip = ip < 1 ? 1 : ip;

   rip = (h/scale)-ip;
   y = rip*scale;
   canvas.width = w;
   draw();
  });

  ini_vel.addEventListener('keyup', function(){
   iv = parseInt(ini_vel.value);
  });

  btn_start.addEventListener('click', start);


  function start() {
   ini_vel.disabled = true;
   ini_pos.disabled = true;

   it = date_now();
   draw();
   animate();
  }


  function stop() {
   ini_vel.disabled = false;
   ini_pos.disabled = false;

   draw();
   update_data();
   cancelAnimationFrame(reqId);
  }


  function draw() {
   ctx.arc(x, y-r, r, 0, 2 * Math.PI);
   ctx.fillStyle = '#aa3333';
   ctx.fill();
  }


  function animate() {
   et = date_now();
   t = (et - it) / 1000;

   v = (iv + (g*t));
   y = (rip + (iv*t) + (0.5*g*t*t));
   y *= scale;
   y = ~~y;

   canvas.width = w;
   draw();
   update_data();

   reqId = requestAnimationFrame(animate);
   if (y >= h) {
    stop();
   }
  }


  function update_data() {
   time.value = t;
   cur_vel.value = v.toFixed(2);
   cur_pos.value = (h-(y+r))/scale;
  }

  draw();
}
