

import Playground from "@onemorestudio/playgroundjs";

export default class Squlette {
    constructor(x,y) {

        this.umSegments = 20,
        this.x = [],
        this.y = [],
        this.angle = [],
        this.segLength = 26,
        this.targetX,
        this.targetY;

        for (let i = 0; i < this.numSegments; i++) {
            this.x[i] = 0;
            this.y[i] = 0;
            this.angle[i] = 0;
          }

    }

    setBones(){
        this.x[this.x.length - 1] =  this.width/ 2; // Set base x-coordinate
        this.y[this.x.length - 1] = this.heigt; // Set base y-coordinate

    }
    draw() {
      
        this.reachSegment(0, mouseX, mouseY);
        for (let i = 1; i < this.numSegments; i++) {
        this.reachSegment(i, targetX, targetY);
      }
      for (let j = this.x.length - 1; j >= 1; j--) {
        this.positionSegment(j, j - 1);
      }
      for (let k = 0; k < this.x.length; k++) {
        segment(this.x[k], this.y[k], this.angle[k], (k + 1) * 2);
      }
    }
    
    positionSegment(a, b) {
      x[b] = x[a] + Math.cos(angle[a]) * this.segLength;
      y[b] = y[a] + Math.sin(angle[a]) * this.segLength;
    }
    
    reachSegment(i, xin, yin) {
      const dx = xin - x[i];
      const dy = yin - y[i];
      this.angle[i] = atan2(dy, dx);
      this.targetX = xin - cos(angle[i]) * this.segLength;
      this.targetY = yin - sin(angle[i]) * this.segLength;
    }
    
    segment(x, y, a, sw) {
      strokeWeight(sw);
      push();
      translate(x, y);
      rotate(a);
      line(0, 0, this.segLength, 0);
      pop();
    }
    
}