var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')

autoSetCanvasSize(yyy)
listenToUser(yyy)

var lineWidth = 5

thin.onclick = function () {
    lineWidth = 5
}
thick.onclick = function () {
    lineWidth = 10
}

var eraserEnabled = false
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList .add('active')
    pen.classList.remove('active')
}
black.onclick= function () {
  context.fillStyle  = 'black'
  context.strokeStyle = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  yellow.classList.remove('active')
  green.classList.remove('active')
}
red.onclick= function () {
    context.fillStyle  = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    yellow.classList.remove('active')
    green.classList.remove('active')
}
yellow.onclick= function () {
    context.fillStyle  = 'yellow'
    context.strokeStyle = 'yellow'
    yellow.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    green.classList.remove('active')
}
green.onclick= function () {
    context.fillStyle  = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    yellow.classList.remove('active')
    red.classList.remove('active')
    black.classList.remove('active')
}

clear.onclick = function (){
    context.clearRect(0, 0, yyy.width, yyy.height);
}

download.onclick = function () {
    var  url = yyy.toDataURL("image/png")
    console.log(url)
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画'
    a.target ='_blank'
    a.click()
}


function drawCircle(x,y,radius){
    context.beginPath();
    context.arc(x , y, radius ,0, Math.PI * 2 );
    context.fill();
}
function drawLine(x1,y1,x2,y2) {
    context.beginPath();
    context.lineWidth = lineWidth
    context.moveTo( x1, y1)
    context.lineTo( x2,  y2)
    context.stroke()
    context.closePath()
}


function autoSetCanvasSize(canvas){
    SetCanvasSize()
    window.onresize = function(){
        SetCanvasSize()
    }
    function SetCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}


function listenToUser(canvas) {
    var using = false
    var lastPoint = {x: undefined, y: undefined}

    if (document.body.ontouchstart  !== undefined) {

        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
             var y = aaa.touches[0].clientY
            console.log(x,y)
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 20, 20)
            } else {
                lastPoint = {"x": x, "y": y}
            }
        }
        canvas.ontouchmove = function (aaa) {
             var x = aaa.touches[0].clientX
             var y = aaa.touches[0].clientY
            console.log('嗷！动了！')
             if (!using) {
                 return
             }

             if (eraserEnabled) {
                 context.clearRect(x - 5, y - 5, 10, 10)
             } else {
                 var newPoint = {"x": x, "y": y}
                 drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                 lastPoint = newPoint
             }
        }
        canvas.ontouchend = function (aaa) {
            using = false
            console.log('嗷！停了！')
        }
    }else {
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {"x": x, "y": y}
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) {
                return
            }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {"x": x, "y": y}
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function (aaa) {
            using = false
        }
    }
}