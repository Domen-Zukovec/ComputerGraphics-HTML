let okvir = new Kvadrat(200, 200, 200, 200);
let dr = new Drevo(okvir, 4);
var smeri = ["g", "s", "l", "d", "gd", "gl", "sd", "sl"];

function dodaj_usr() {
  var m = document.getElementById("userInput").value;

  for (let i = 0; i < m; i++){
    let smer = smeri[Math.floor(Math.random() * smeri.length)];
    let t = new Tocka(Math.random() * 400,Math.random() * 400, smer, dr.tocke[i]);
    dr.vstavi(t);
  }
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  izrisuj(dr, true);
}

function spremeni(){
  dr = new Drevo(okvir, 4);

  var m = document.getElementById("userInput2").value;

  for (let i = 0; i < m; i++){
    let smer = smeri[Math.floor(Math.random() * smeri.length)];
    let t = new Tocka(Math.random() * 400,Math.random() * 400, smer, dr.tocke[i]);
    dr.vstavi(t);
  }
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  izrisuj(dr, true);
}

function start() {
  for (let i = 0; i < 10; i++){
    let smer = smeri[Math.floor(Math.random() * smeri.length)];
    let t = new Tocka(Math.random() * 400,Math.random() * 400, smer, dr.tocke[i]);
    dr.vstavi(t);
  }
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  izrisuj(dr, true);

  //let dolzina = new Kvadrat(250, 250, 106, 75);
  //let tocke = dr.preglej(dolzina);
  //console.log(tocke);
}

function posodobi(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    dr1 = izrisuj(dr, true);
    dr = dr1;
    setTimeout(posodobi, 25);
}

start();
posodobi();
