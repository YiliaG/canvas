var dom = document.getElementById("clock");
var ctx = dom.getContext("2d");

var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 200;

function drawBackgound() {
    ctx.translate(r, r);
    ctx.beginPath();
    ctx.lineWidth = 10 * rem;
    ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
    ctx.stroke();

    ctx.font = 14 * rem + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var numbders = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    numbders.forEach(function (number, index) {
        var rad = 2 * Math.PI / 12 * index;
        var x = Math.cos(rad) * (r - 30 * rem);
        var y = Math.sin(rad) * (r - 30 * rem);
        ctx.fillText(number, x, y);
    });

    for (var i = 0; i < 60; i++) {
        ctx.beginPath();
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 18 * rem);
        var y = Math.sin(rad) * (r - 18 * rem);

        if (i % 5 === 0)
        {
            ctx.fillStyle = '#000';
            ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
        }else{
            ctx.fillStyle = '#ccc';
            ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
        }
        ctx.fill();
    }
}

function drawHour(hour,minute,second) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * hour;
    var mrad = 2 * Math.PI / 12 / 60 * minute;
    var srad = 2 * Math.PI / 12 / 60 / 60 * second;
    ctx.rotate(rad + mrad + mrad);
    ctx.moveTo(0,10 * rem);
    ctx.lineTo(0, - r/ 2);
    ctx.lineWidth = 5 * rem;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
}

function drawMinute(minute,second) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 / 60 * minute;
    var srad = 2 * Math.PI / 12 / 60 / 60 * second;
    ctx.rotate(rad + srad);
    ctx.moveTo(0,10 * rem);
    ctx.lineTo(0, - r/ 2 - 18 * rem);
    ctx.lineWidth = 3 * rem;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
}

function drawSecond(second) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 / 60 / 60 * second;
    ctx.rotate(rad);
    ctx.moveTo(-2 * rem,20 * rem);
    ctx.lineTo(2 * rem , 20 * rem);
    ctx.lineTo(1, - r/ 2 - 30 * rem);
    ctx.lineTo(-1, - r/ 2 - 30 * rem);
    ctx.lineWidth = 3 * rem;
    ctx.lineCap = 'round';
    ctx.fillStyle = '#f00';
    ctx.fill();
    ctx.restore();
}
function draw() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    ctx.clearRect(0,0,width,height);
    drawBackgound();
    drawHour(hour,minute,second);
    drawMinute(minute,second);
    drawSecond(second);
    ctx.restore();
}

setInterval(draw,100);