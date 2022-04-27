/**
CREATIVE CODING
---
Kill server : CTRL + C
Start server : npm run start
Start secure server : npm run start-https
Final build : npm run build
---
To generate new certificate for https connection with external device run :
#sh
mkcert 0.0.0.0 localhost 127.0.0.1 yourLocalIP ::1
mv 0.0.0.0+4-key.pem certificate.key
mv 0.0.0.0+4.pem certificate.cert
**/

import Playground from "@onemorestudio/playgroundjs";
import Machine from "./Machine";
import * as dat from "./dat.gui.module.js";
import FireBase from "./Firebase";
// import "static/json/config.json"

export default class App extends Playground {
  constructor() {
    super();
    this.init();
  }

  loadJSON(url) {
    return fetch(url)
      .then((data) => data.json())
      .then((json) => json);
  }
  async init() {
    const config = await this.loadJSON("json/config.json");

    const keys = Object.keys(config["danse"])
    this.mesMachines = [];
    keys.forEach(user=>{
     
      const params = config["danse"][user];
      // console.log(params);
      // this.mesMachines.push(new Machine(this.width / 2, this.height / 2,this.ctx, params));      

    })

    // console.log(config);

    // this.loadJSON();

    this.myMachine = new Machine(this.width / 2, this.height / 1.4, this.ctx,config["danse"]["N3czdZhpTlZIDA1F2E6Sv2kgpkg1"]);

    this.timestamp = 0;
    this.draw();
    this.firebase = new FireBase();

    this.text = "";

    this.gui = new dat.GUI();

    this.gui.domElement.id = "gui_css";

    const formeControl = this.gui.addFolder("forme");
    formeControl.add(this.myMachine, "taille", 0, 120);
    formeControl.add(this.myMachine, "n", 4, 15);

    formeControl.add(this.myMachine, "THETA1", 0, 70);
    formeControl.add(this.myMachine, "THETA2", 0, 70);

    // formeControl.add(this.myMachine, "rot", 0, 300d);

    console.log(this.myMachine.taille);
    // formeControl.add(this.myMachine, "MAP1", 0, 300);
    // formeControl.add(this.myMachine, "MAP2", 0, 300);
    formeControl.add(this.myMachine, "MAP3", 20, 300);
    formeControl.add(this.myMachine, "MAP4", 20, 300);

    formeControl.add(this.myMachine, "PAR1", 0, 10);
    formeControl.add(this.myMachine, "PAR2", 0, 10);

    // formeControl.add(this.myMachine, "N1", 0, 300);
    // formeControl.add(this.myMachine, "N2", 0, 300);

    formeControl.add(this.myMachine, "PJ1", 0, 50);
    formeControl.add(this.myMachine, "PJ2", 0, 50);

    document
      .getElementById("myBtn")
      .addEventListener("click", this.displayDate.bind(this));

    document.addEventListener("click", this.onClick.bind(this));

    this.n1 = 0;
    this.n2 = 0;
    this.n3 = 0;
    this.n4 = 0;
    this.n5 = Math.random();
  }

  onClick(event) {
    this.firebase.send("danse/" + this.firebase.uid, {
      text: this.text,
      taille: this.myMachine.taille,
      n: this.myMachine.n,
      THETA1: this.myMachine.THETA1,
      THETA2: this.myMachine.THETA2,
      MAP1: this.myMachine.MAP1,
      MAP2: this.myMachine.MAP2,
      MAP3: this.myMachine.MAP3,
      MAP4: this.myMachine.MAP4,
      PAR1: this.myMachine.PAR1,
      PAR2: this.myMachine.PAR2,
      N1: this.myMachine.N1,
      N2: this.myMachine.N2,
      PJ1: this.myMachine.PJ1,
      PJ2: this.myMachine.PJ2,
    });
  }
  displayDate() {
    console.log("pipi");
    document.querySelector("canvas").style.display = "block";
    document.getElementById("popUp").style.display = "none";
    let text = document.getElementById("w3review");
    // this.getText(text.textContent);
    this.text = text.textContent;
  }
  // getText(text){
  //   this.text = text;
  // }

  draw() {
    this.ctx.clearRect(
      -this.width,
      -this.height,
      this.width * 2,
      this.height * 2
    );
    this.ctx.fillStyle = "blue";
    this.ctx.fill();
    // this.ctx.rect(40, 40, 150, 100);

    this.myMachine.draw(this.ctx, this.timestamp);

    this.mesMachines.forEach(machine =>{
      machine.draw(this.ctx, this.timestamp);
    })
    //  console.log(this.myMachine2);

    this.timestamp += 1;

    requestAnimationFrame(this.draw.bind(this));
  }
}
