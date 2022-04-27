import Wheel from "./Wheel";
import Bezier from "bezier-easing";

export default class Machine {
  constructor(x, y, ctx, params) {
    this.x = x;
    this.y = y;

    this.N_FRAMES = 360;
    
    this.N_FRAMESPULSE = 15;
    this.n = params.n || 0;
    this.taille = params.taille;

    
    this.PI1 = 80;
    this.PI2 = 30;

    this.THETA1 = params.THETA1 || 4;
    this.THETA2 = params.THETA2 || 4;
    this.THETA3 = 0;
    this.THETA4 = 0;
    

    this.MAP1 = params.MAP1 || 4;
    this.MAP2 = params.MAP2 || 4;
    this.MAP3 = 20;
    this.MAP4 = 20;


    this.PAR1 =  params.PAR1 || 10;
    this.PAR2 = params.PAR2 || 10;


    this.N1 = 0;
    this.N2 = 0;

    this.PJ1 = 0;
    this.PJ2 = 0;


    this.logged = false;
    this.sens = false;

    this.rot = 0;


    this.ctx = ctx;

    this.setup();

    // let bezier = new Bezier();
    // console.log(bezier);
    BezierEasing(0.25, 0.1, 0.0, 1.0)


  }

   pulse(time, sens) {
    const pi = 3.14;
    const frequency = 200; // Frequency in Hz
    if(!sens){
      // console.log("pipi");
      return 0.5 * (1 + Math.sin(2 * pi * frequency * time));

    }
    if(sens){
      // console.log("caca");
      return 0.5 * (1 + Math.cos(2 * pi * frequency * time));

    }
  }

  createVector(x, y) {
    let p = { x: x, y: y };
    return p;
  }
  map(num, start1, stop1, start2, stop2) {
    return ((num - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  }
  setup(){
   this.ctx.translate(this.x, this.y);

  }


   toDegrees(radians) {
    return radians * (180 / Math.PI)
  }

  moveRectangle (p) { // p move from 0 to 1
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "hsl("+Math.round(255*p)+",80%,50%)";
    var w = 50;
    var h = 50 + p * (canvas.height - 50);
    ctx.fillRect((canvas.width-w) * p, (canvas.height-h)*0.5, w, h);
  }

  animate (render, duration, easing) {
    var start = Date.now();
    (function loop () {
      var p = (Date.now()-start)/duration;
      if (p > 1) {
        render(1);
      }
      else {
        requestAnimationFrame(loop);
        render(easing(p));
      }
    }());
  }

  draw(ctx, frameCount) {

    ctx.moveTo(this.x/2, this.y/2)
    let points = [];

    // console.log(frameCount);


    const TWO_PI = 6.28318530717958647693;
    // let t = (frameCount % this.N_FRAMES) / this.N_FRAMES;
    let t = (this.N_FRAMES * Math.sin(frameCount * Math.PI/360)) / 80;


  // console.log(t);

    for (let theta = 0; theta < TWO_PI+this.THETA1   ; theta += TWO_PI/this.THETA2) {
      points.push(this.createVector(this.taille*Math.cos(theta+this.THETA3), this.taille*Math.sin(theta+this.THETA4)));
      if(theta == 0){
        //  console.log(points)
      }
      
    }



    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < points.length - 30; j += 1) {
        let pi = points[j];
        let pj = points[j + 1];
        let pk = points[(j + 2) % points.length];

        let x = this.map( t + this.PAR1 , this.MAP1, this.n + this.N1, this.MAP2, pj.x + this.PJ1);
        let y = this.map(t + this.PAR2, this.MAP3, this.n + this.N1, this.MAP4, pj.y + this.PJ2);


        ctx.strokeStyle = "#000";

          // ctx.clearRect(0, 0, this.x*2, this.y*2);
        ctx.beginPath();

        ctx.moveTo(pi.x, pi.y);
        ctx.moveTo(x, y);
        ctx.lineTo(pk.x, pk.y);
        let tPulse = (this.N_FRAMESPULSE * Math.sin(frameCount / 7)+1) / 40;
        ctx.lineWidth = tPulse * 10;
        ctx.rotate( 0 + this.rot * Math.PI / 180);

        // console.log(ctx.lineWidth);
        ctx.stroke();
        ctx.closePath();

        // line(pi.x, pi.y, x, y);
        // line(x, y, pk.x, pk.y);
      }
    }

      // ctx.save();

      // ctx.restore();
      setInterval(function(){
        // console.log("caca");
        //  this.animate(this.moveRectangle, 90000, BezierEasing(0.25, 0.1, 0.0, 1.0));
      }, 2000);
      
  }
  

}


// for (let theta = 0; theta < TWO_PI + this.PI1; theta += TWO_PI / this.PI2) {
//   points.push(
//     this.createVector(
//       this.taille * Math.cos(theta + this.THETA1),
//       this.taille * Math.sin(theta + this.THETA2)
//     )
//   );
//   if (theta == 0) {
//   }
// }



// for (let theta = 0; theta < TWO_PI + this.PI1; theta += TWO_PI / this.PI2) {
//   let COS = this.pulse(t, false);
//   let SIN = this.pulse(t, true);
//   points.push(
//     this.createVector(
//       this.taille * COS + this.THETA1,
//       this.taille * SIN + this.THETA2
//     )
//   );
//   if (theta == 0) {
//     let out = this.pulse(t);

//     // console.log(out);
    
//   }
//  let out2 =  this.interpolate(t,theta);
// }


// let COS = this.pulse(t, false);
// let SIN = this.pulse(t, true);
// points.push(
//   this.createVector(
//     this.taille * COS + this.THETA1,
//     this.taille * SIN + this.THETA2
//   )
// );
// if (theta == 0) {
//   let out = this.pulse(t);

//   // console.log(out);
  
// }