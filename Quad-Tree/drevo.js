let kazi = true;
class Tocka {
    constructor(x, y, smer, userData){
      this.x = x;
      this.y = y;
      this.smer = smer;
      this.zadeta = false;
      this.userData = userData;
    }

    trci(ostali) {
      let r = Math.sqrt((this.x - ostali.x)*(this.x - ostali.x) + (this.y - ostali.y)*(this.y- ostali.y));
      //let r = razdalja(this.x, this.y, ostali.x, ostali.y);
      return (r <= 8.5);
    }
}

class Kvadrat {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  vsebuje(tocka) {
    return (tocka.x > this.x - this.w && tocka.x < this.x + this.w && tocka.y > this.y - this.h && tocka.y < this.y + this.h);
  }

  prekriva(dolzina){
    return !(dolzina.x - dolzina.w > this.x + this.w || dolzina.x + dolzina.w < this.x - this.w || dolzina.y - dolzina.h > this.y + this.h || dolzina.y + dolzina.h < this.y - this.h);
  }

}



class Drevo {
  constructor(okvir, n){
    this.okvir = okvir;
    this.kapaciteta = n;
    this.tocke = [];
    this.razdeljen = false;
  }

  razdeli() {
    let dg = new Kvadrat(this.okvir.x + this.okvir.w/2, this.okvir.y - this.okvir.h/2, this.okvir.w/2, this.okvir.h/2);
    this.desnogor = new Drevo(dg, this.kapaciteta/2);

    let lg = new Kvadrat(this.okvir.x - this.okvir.w/2, this.okvir.y - this.okvir.h/2, this.okvir.w/2, this.okvir.h/2);
    this.levogor = new Drevo(lg, this.kapaciteta/2);

    let ds = new Kvadrat(this.okvir.x + this.okvir.w/2, this.okvir.y + this.okvir.h/2, this.okvir.w/2, this.okvir.h/2);
    this.desnospodaj = new Drevo(ds, this.kapaciteta/2);

    let ls = new Kvadrat(this.okvir.x - this.okvir.w/2, this.okvir.y + this.okvir.h/2, this.okvir.w/2, this.okvir.h/2);
    this.levospodaj = new Drevo(ls, this.kapaciteta/2);


  }

  vstavi(tocka) {


    if(!this.okvir.vsebuje(tocka)){
      return
    }




    if (this.tocke.length < 5){
      this.tocke.push(tocka);
    } else {
      if (!this.razdeljen) {
        this.razdeli();
        this.razdeljen = true;
      }
      this.desnogor.vstavi(tocka);
      this.levogor.vstavi(tocka);
      this.desnospodaj.vstavi(tocka);
      this.levospodaj.vstavi(tocka);
      for (let drug of this.tocke){
        if(tocka != drug && tocka.trci(drug)){
          tocka.zadeta = "true";
          drug.zadeta = "true";
          //console.log("trci")
        }

    }
    }
  }

  preglej(dolzina, najdu) {
    if(!najdu){
      najdu = [];
    }

    if (!this.okvir.prekriva(dolzina)){
      return;
    } else {
      for(let t of this.tocke) {
        if(dolzina.prekriva(t)) {
          najdu.push(t)
        }
      }

      if (this.razdeljen){
        this.desnogor.preglej(dolzina, najdu);
        this.levogor.preglej(dolzina, najdu);
        this.desnospodaj.preglej(dolzina, najdu);
        this.levospodaj.preglej(dolzina, najdu);
      }
    }
    return najdu;
  }
}

function izrisuj(neki, tf){
  if (tf){
    dr1 = new Drevo(okvir, 5);
  }




  for (let t of neki.tocke){
    switch(t.smer) {
      case "g":
        if (t.y - 2 <= 0){
          //t.y = t.y + 2;
          var kam = ["s", "sd", "sl"];
          let nova = kam[Math.floor(Math.random() * kam.length)];
          t.smer = nova;
        } else {
          t.y = t.y - 2;
        }
        dr1.vstavi(t);
      break;
      case "s":
        if (t.y + 5 >= 400){
          //t.y = t.y - 2;
          var kam = ["g", "gd", "gl"];
          let nova = kam[Math.floor(Math.random() * kam.length)];
          t.smer = nova;
        } else {
          t.y = t.y + 2;
        }
        dr1.vstavi(t);
      break;
      case "l":
        if (t.x - 2 <= 0){
          //t.x = t.x + 2;
          var kam = ["d", "gd", "sd"];
          let nova = kam[Math.floor(Math.random() * kam.length)];
          t.smer = nova;
        } else {
          t.x = t.x - 2;
        }
        dr1.vstavi(t);
      break;
      case "d":
        if (t.x + 5 >= 400){
          //t.x = t.x - 2;
          var kam = ["l", "gl", "sl"];
          let nova = kam[Math.floor(Math.random() * kam.length)];
          t.smer = nova;
        } else {
          t.x = t.x + 2;
        }
        dr1.vstavi(t);
      break;
      case "gd":
        if (t.x + 5 >= 400 || t.y - 2 <= 0){
          //t.x = t.x - 2;
          //t.y = t.y + 2;
          var kam = ["sl", "gl"];
          let nova = kam[Math.floor(Math.random() * kam.length)];
          t.smer = nova;
        } else {
          t.x = t.x + 2;
          t.y = t.y - 2;
        }
        dr1.vstavi(t);
      break;
      case "sd":
        if (t.x + 5 >= 400 || t.y + 5 >= 400){
          //t.x = t.x - 2;
          //t.y = t.y - 2;
          var kam = ["gl", "sl"];
          let nova = kam[Math.floor(Math.random() * kam.length)];
          t.smer = nova;
        } else {
          t.x = t.x + 2;
          t.y = t.y + 2;
        }
        dr1.vstavi(t);
      break;
      case "gl":
        if (t.x - 2 <= 0 || t.y - 2 <= 0){
          //t.x = t.x + 2;
          //t.y = t.y + 2;
          var kam = ["sd", "gd"];
          let nova = kam[Math.floor(Math.random() * kam.length)];
          t.smer = nova;
        } else {
          t.x = t.x - 2;
          t.y = t.y - 2;
        }
        dr1.vstavi(t);
      break;
      case "sl":
        if (t.x - 2 <= 0 || t.y + 5 >= 400){
          //t.x = t.x + 2;
          //t.y = t.y - 2;
          var kam = ["gl", "sl"];
          let nova = kam[Math.floor(Math.random() * kam.length)];
          t.smer = nova;
        } else {
          t.x = t.x - 2;
          t.y = t.y + 2;
        }
        dr1.vstavi(t);
      break;
      default:
        // code block
      }
    }

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(neki.okvir.x - neki.okvir.w, neki.okvir.y - neki.okvir.h, neki.okvir.w*2, neki.okvir.h*2);
    if(kazi)
      ctx.stroke();

    if (neki.razdeljen) {
      izrisuj(neki.desnogor, false);
      izrisuj(neki.levogor, false);
      izrisuj(neki.desnospodaj, false);
      izrisuj(neki.levospodaj, false);
    }
    for (let t of neki.tocke){
      if (t.zadeta){
        ctx.fillStyle = "#FF0000";
      } else {
        ctx.fillStyle = "#000000";
      }
      ctx.beginPath();
      ctx.fillRect(t.x,t.y,4,4);
      ctx.stroke();
    }

    for (let t of neki.tocke){
        t.zadeta = false;
    }


    return dr1;
}


function skrij() {
  kazi = !kazi;
}
