 var canvas = document.createElement('canvas');
 canvas.id = "myCanvas";
 canvas.width = 1224;
 canvas.height = 768;
 canvas.style.border = "1px solid";
 canvas.addEventListener('click', function() {miska()}, false);
 var body = document.getElementsByTagName("body")[0];
 body.appendChild(canvas);

let prvicgumb = true

let prvic  = true

function racunaj(t, p0, p1, p2, p3){
  var cX = 3 * (p1.x - p0.x)
  var bX = 3 * (p2.x - p1.x) - cX
  var aX = p3.x - p0.x - cX - bX

  var cY = 3 * (p1.y - p0.y)
  var bY = 3 * (p2.y - p1.y) - cY
  var aY = p3.y - p0.y - cY - bY

  var x = (aX * Math.pow(t, 3))
	x = x + (bX * Math.pow(t, 2))
	x = x + (cX * t) + p0.x;

  var y = (aY * Math.pow(t, 3))
	y = y + (bY * Math.pow(t, 2))
	y = y + (cY * t) + p0.y;

  return {x: x, y: y};
}

let kordinate = [];
let mankajo = 4;
let i = 0

var kolkgumb = 2;
function nova(){
	prvic = true;
	zac1 += 5
	zac2 += 5
	tf = true
	i = i + 2;
	mankajo = 4;
	var pm = {x: "stp", y: "stp"}
	kordinate.push(pm);

	var name = "button" + kolkgumb;

	var name = document.createElement("button");
	name.innerHTML = "Brisi "+kolkgumb+". najstarejsi sklop krivulj";
	name.id = kolkgumb;
	kolkgumb += 1
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(name);
	name.addEventListener ("click", function() {
		vrni = this.id
		brisi2(vrni)
	});
	document.getElementById("pisi").innerHTML = "Manjka ti se " + mankajo + " tock";
}

var zacbris = 0;
function brisi2(vrni){
	var ct = 0;
	zacbris = 0
	var tmp = []
	for(let i = 0; i < kordinate.length; i++){
		if(kordinate[i].x == "stp")
			{ct += 1}
		if(ct != (vrni - 1))
			{tmp.push(kordinate[i])}
			else{
				zacbris+=1;
			}

		}
	kordinate = tmp
	i = kordinate.length-1;
	zac1 -= zacbris;
	zac2 -= zacbris;
	znova()
}

var zac1 = 2;
var zac2 = 3;
function miska(){


	var mx = event.clientX;
	var my = event.clientY;


	mankajo = mankajo - 1;

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	let mx1 = mx



	if(prvic == false){
		if(mankajo == 2){

			var ax = kordinate[zac1].x
			var ay = kordinate[zac1].y
			var bx = kordinate[zac2].x
			var by = kordinate[zac2].y
			zac1 += 3;
			zac2 += 3;
			var tmp = ay - by

				if(tmp < 0)
				{
						if(my < by){
							my = by + by - my
						}
				}
				else{
					if(my > by){
						my = by - (my - by)
					}
				}

			k = (ay - by)/(ax - bx)
			n = ay - k * ax
			mx1 = (my - n)/k
		}
	}

	var pm = {x: mx1, y: my}

	if(mankajo == 3 || mankajo == 0){
		ctx.fillStyle = 'black';
		ctx.fillRect(mx-6, my-6, 12, 12);
}
	else
	{
ctx.beginPath();
			ctx.arc(mx, my, 6, 0, 2 * Math.PI);
			ctx.fillStyle = 'red';
			ctx.fill();
			ctx.strokeStyle = '#FF0000';
			ctx.stroke();
			tf = false
	}

kordinate.push(pm);




	if(mankajo == 0)
	{

		if(prvicgumb){
			var button1 = document.createElement("button");
			button1.innerHTML = "Brisi najstarejsi sklop krivulj";
			var body = document.getElementsByTagName("body")[0];
			body.appendChild(button1);
			button1.addEventListener ("click", function() {
				brisi1()
			});
			prvicgumb = false
		}

		if(prvic)
		{
		prvic = false;
		}

		izrisuj(kordinate[i],kordinate[i+1],kordinate[i+2],kordinate[i+3])
		i = i + 3
		mankajo = 3;
		znova()
	}
	document.getElementById("pisi").innerHTML = "Manjka ti se " + mankajo + " tock";

}

function brisi1(){
	let jesno = false
	zacbris = 0
	let tmp = []
	for(let j = 0; j < kordinate.length - 1; j++)
	{
				if(kordinate[j].x == "stp")
				{
					jesno = true
				}
				if(jesno)
				{
						tmp.push(kordinate[j+1])
				}
				else {
					zacbris += 1
				}
	}
	kordinate = tmp;
	i = kordinate.length - 1;
	zac1 -= zacbris +1 ;
	zac2 -= zacbris+ 1;
	znova();
}

function znova(){
	tf = true;


	const context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	let neki = true
	let i = 0;
	mankajo = 4;
	for(let j = 0; j < kordinate.length; j++)
	{
		mankajo = mankajo - 1;
		if(mankajo == 0)
		{
			if(kordinate[i+1].x == "stp")
			{
				i = i + 2;
				tf = true;
				neki = false
			}
			else {
				neki = true
			}
			izrisuj(kordinate[i],kordinate[i+1],kordinate[i+2],kordinate[i+3])
			i = i + 3
		 	if(neki){
			mankajo = 3;}
			else {
				mankajo = 5;
			}
		}
	}
}

let tf = true;

function izrisuj(p0, p1, p2, p3){
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.moveTo(p0.x, p0.y);


  for (var i=0; i<1; i+=0.01){
     var p = racunaj(i, p0, p1, p2, p3);
     ctx.lineTo(p.x, p.y);
  }

  ctx.strokeStyle = barva;
  ctx.stroke()

	ctx.beginPath();
  ctx.arc(p2.x, p2.y, 6, 0, 2 * Math.PI);
	ctx.fillStyle = 'red';
  ctx.fill();
	ctx.strokeStyle = '#FF0000';
  ctx.stroke();

	ctx.beginPath();
	ctx.arc(p1.x, p1.y, 6, 0, 2 * Math.PI);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.strokeStyle = '#FF0000';
	ctx.stroke();
	tf = false

	ctx.fillStyle = 'black';
	ctx.fillRect(p3.x-6, p3.y-6, 12, 12);


		ctx.fillStyle = 'black';
		ctx.fillRect(p0.x-6, p0.y-6, 12, 12);

}

let barva = "#000000"


function rdeca()
{
	barva = "#FF0000"
}
function vse_rdeca()
{
	barva = "#FF0000"
	znova();
}

function modra()
{
	barva = "#6495ED"
}
function vse_modra()
{
	barva = "#6495ED"
	znova();
}

function zelena()
{
	barva = "#006400"
}
function vse_zelena()
{
	barva = "#006400"
	znova();
}

function oranzna()
{
	barva = "#FF8C00"
}
function vse_oranzna()
{
	barva = "#FF8C00"
	znova();
}

function rumena()
{
	barva = "#FFD700"
}
function vse_rumena()
{
	barva = "#FFD700"
	znova();
}

function rjava()
{
	barva = "#A52A2A"
}
function vse_rjava()
{
	barva = "#A52A2A"
	znova();
}

function črna()
{
	barva = "#000000"
}
function vse_črna()
{
	barva = "#000000"
	znova();
}

function roza()
{
	barva = "#FF1493"
}
function vse_roza()
{
	barva = "#FF1493"
	znova();
}

function viola()
{
	barva = "#9400D3"
}
function vse_viola()
{
	barva = "#9400D3"
	znova();
}
