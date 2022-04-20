class Vektor4f {
	constructor(x, y, z, w){
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}
	
	dodaj(v){
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		//this.w += v.w;
	}
	
	scalarProduct(s){
		this.x *= s;
		this.y *= s;
		this.z *= s;
		//this.w *= s;
	}
	
	negate(){
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		//this.w = -this.w;
	}
	
	dotProduct(v){
		let t = (this.x * v.x);
		t += (this.y * v.y);
		t += (this.z * v.z);
		//t += (this.w * v.w);
		return t;
	}
	
	crossProduct(v){
		const t1 = (this.y * v.z - this.z * v.y);
		const t2 = (this.z * v.x - this.x * v.z);
		const t3 = (this.x * v.y - this.y * v.x);
		const ret = [t1, t2, t3]
		return ret;
	}
	
	length(){
		const t = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
		return t;
	}
	
	normalize(){
		const t = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
		this.x /= t;
		this.y /= t;
		this.z /= t;
	}
	
	project(v){
		let t = (this.x * v.x);
		t += (this.y * v.y);
		t += (this.z * v.z);
		const n = this.x*this.x + this.y*this.y + this.z*this.z;
		const u = t / n;
		const tab = [u*this.x, u*this.y, u*this.z, this.w];
		return tab;
	}

	cosPhi(v){
		let t = (this.x * v.x);
		t += (this.y * v.y);
		t += (this.z * v.z);
		const n = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
		const m = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
		const tab = t / (m*n);
		const kot = Math.acos(tab);
		return tab;
	}
	
	
	
}



function myFunction() {
  const x1 = Number(document.getElementById("int1").value);
  const y1 = Number(document.getElementById("int2").value);
  const z1 = Number(document.getElementById("int3").value);
  const w1 = Number(document.getElementById("int4").value);
  const tab = "Vpisan vektor: [" +  [x1, y1, z1, w1] + "]";
  const A = new Vektor4f(x1, y1, z1, w1);
  document.getElementById("izp_vektor").innerHTML = tab;   
  return A
}
function myFunction2() {
  const x1 = Number(document.getElementById("int11").value);
  const y1 = Number(document.getElementById("int22").value);
  const z1 = Number(document.getElementById("int33").value);
  const w1 = Number(document.getElementById("int44").value);
  const tab = "Vpisan vektor: [" +  [x1, y1, z1, w1] + "]";
  const A = new Vektor4f(x1, y1, z1, w1);  
  return A
}

function negacija() {
	const A = myFunction()
	A.negate();
	const tab = "Negiran vektor: [" +  [A.x, A.y, A.z, A.w] + "]";
	document.getElementById("neg_vektor").innerHTML = tab;	
}

function Skalarni(){
	const sk = document.getElementById("skalar").value;
	const A = myFunction();
	A.scalarProduct(sk);
	const tab = "Skalarno pomnožen vektor: [" +  [A.x, A.y, A.z, A.w] + "]";
	document.getElementById("Skalarni").innerHTML = tab;
}

function sest(){
	const A = myFunction();
	const B = myFunction2();
	A.dodaj(B);
	const tab = "Pomnožen vektor: [" +  [A.x, A.y, A.z, A.w] + "]";
	document.getElementById("Add").innerHTML = tab;
}

function dot(){
	const A = myFunction();
	const B = myFunction2();
	const t = A.dotProduct(B);
	const tab = "dotProduct =  "+ t;
	document.getElementById("dot").innerHTML = tab;
}

function cross(){
	const A = myFunction();
	const B = myFunction2();
	const ret = A.crossProduct(B);
	const tab = "crossProduct = ["+ ret+ "]";
	document.getElementById("cross").innerHTML = tab;
}

function len(){
	const A = myFunction();
	const l = A.length();
	const tab = "Dolžina vektorja vektor= "+ l;
	document.getElementById("len").innerHTML = l;
}

function norm() {
	const A = myFunction()
	A.normalize();
	const tab = "Normiran vektor: [" +  [A.x, A.y, A.z, A.w] + "]";
	document.getElementById("norm").innerHTML = tab;	
}

function proj() {
	const A = myFunction();
	const B = myFunction2();
	const t = A.project(B);
	const tab = "Projekcija vektorja: [" +  t + "]";
	document.getElementById("proj").innerHTML = tab;	
}

function kot() {
	const A = myFunction();
	const B = myFunction2();
	const t = A.cosPhi(B);
	const tab = "Kot vektorja: " +  t;
	document.getElementById("kot").innerHTML = tab;	
}


class Matrix4{
	constructor(a, b, c, d){
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
	}
	
	negate(){
		this.a = [-this.a[0], -this.a[1], -this.a[2], -this.a[3]];
		this.b = [-this.b[0], -this.b[1], -this.b[2], -this.b[3]];
		this.c = [-this.c[0], -this.c[1], -this.c[2], -this.c[3]];
		this.d = [-this.d[0], -this.d[1], -this.d[2], -this.d[3]];
	}
	
	add(v){
		for(var i = 0; i < 4; i++){
			this.a[i] = Number(v.a[i]) + Number(this.a[i]);
		}
		for(var i = 0; i < 4; i++){
			this.b[i] = Number(v.b[i]) + Number(this.b[i]);
		}
		for(var i = 0; i < 4; i++){
			this.c[i] = Number(v.c[i]) + Number(this.c[i]);
		}
		for(var i = 0; i < 4; i++){
			this.d[i] = Number(v.d[i]) + Number(this.d[i]);
		}
	}
	
	transpose(){
		const at = [this.a[0], this.b[0], this.c[0], this.d[0]];
		const bt = [this.a[1], this.b[1], this.c[1], this.d[1]];
		const ct = [this.a[2], this.b[2], this.c[2], this.d[2]];
		const dt = [this.a[3], this.b[3], this.c[3], this.d[3]];
		this.a = at;
		this.b = bt;
		this.c = ct;
		this.d = dt;
	}
	
	multiplyScalar(t)
	{
		this.a = [this.a[0]*t, this.a[1]*t, this.a[2]*t, this.a[3]*t];
		this.b = [this.b[0]*t, this.b[1]*t, this.b[2]*t, this.b[3]*t];
		this.c = [this.c[0]*t, this.c[1*t], this.c[2]*t, this.c[3]*t];
		this.d = [this.d[0]*t, this.d[1]*t, this.d[2]*t, this.d[3]*t];
	}
}



function negmat(){
	const A = sestavi1();
	A.negate();
	document.getElementById("negmat").innerHTML = "<p>["+A.a+"]</p><p>["+A.b+"]</p><p>["+A.c+"]</p><p>["+A.d+"]</p>";
}

function sesmat(){
	const A = sestavi1();
	const B = sestavi2();
	A.add(B);
	document.getElementById("sesmat").innerHTML = "<p>["+A.a+"]</p><p>["+A.b+"]</p><p>["+A.c+"]</p><p>["+A.d+"]</p>";
}

function trans(){
	const A = sestavi1();
	A.transpose();
	document.getElementById("trans").innerHTML = "<p>["+A.a+"]</p><p>["+A.b+"]</p><p>["+A.c+"]</p><p>["+A.d+"]</p>";
}

function skalmat(){
	const A = sestavi1();
	const sk = document.getElementById("t").value;
	A.multiplyScalar(sk);
	document.getElementById("skalmat").innerHTML = "<p>["+A.a+"]</p><p>["+A.b+"]</p><p>["+A.c+"]</p><p>["+A.d+"]</p>";
}

class PointManager{
	constructor(txt){
		this.txt = txt;
	}
	
	beri()
	{
		var str = this.txt;
		var res = str.split("\n");
		var a = res[0].split(" ");
		var b = res[1].split(" ");
		var c = res[2].split(" ");
		var d = res[3].split(" ");
		const A = new Matrix4(a, b, c, d);
		return A;
	}
}

function sestavi1(){
	const lol = document.getElementById("matrika1").value;
	const B = new PointManager(lol);
	const A = B.beri();
	return A;
}
function sestavi2(){
	const lol = document.getElementById("matrika2").value;
	const B = new PointManager(lol);
	const A = B.beri();
	return A;
}

