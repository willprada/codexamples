window.onload = function() {
   let canvas = document.getElementById('cnv');
   let ctx = canvas.getContext('2d');
   let w = canvas.width;
   let h = canvas.height;
   let r = 10;
   let x = Math.random() * w + r;
   let y = Math.random() * h + r;
   let sx = 2;
   let sy = 2;

   function animate() {
    canvas.width = w;
    if (x < r || x > w-r) {
     sx *= -1;
    }
    if (y < r || y > h-r) {
     sy *= -1;
    }

    x += sx;
    y += sy;

    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = '#aa3333';
    ctx.fill();
    requestAnimationFrame(animate);
   }

   animate();
}
