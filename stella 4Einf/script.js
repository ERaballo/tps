const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");

ctx.moveTo(240, 75);
ctx.lineTo(345, 390);
ctx.lineTo(71,205);
ctx.lineTo(409,205);
ctx.lineTo(133, 390);
ctx.lineTo(240, 75);
ctx.moveTo(415,250);
ctx.arc(240, 250, 175, 0, 2 * Math.PI);
ctx.stroke();
