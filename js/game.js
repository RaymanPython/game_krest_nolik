var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var zero = new Image();
var krest = new Image(); // Создание объекта
// alert(5);
zero.src = "/js_api/img/zero.jpg";
krest.src = "/js_api/img/krest.jpg";
var board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
var dx = 50;
var dy = 50;
var x = 10;
var y = 100;
var xod = 1;
var linewidth = 5;
cvs.addEventListener("mousedown", def_mouse);
function clear_board(){
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    location.reload();
}
function finish(){
    if (xod == 1){
        alert("Выиграл крестик!");
    }else{
        alert("Выиграл нолик!");
    }
    clear_board();
}

function prov(a){
    for (let index = 0; index < a.length; index++){
        if (a[index] != a[0] || a[index] == 0){
            return false;
        }
    }
    return true;
} 
 
function prov_board(){
    for (let i = 0; i < 3; i ++){
        if (prov(board[i])){
            return true;
        }
    }
    for (let i = 0; i < 3; i++){
        b = []
        for (let j = 0; j < 3; j++){
            b.push(board[j][i]);
        }
        if (prov(b)){
            return true;
        }
    }
    b = []
    c = []
    for (let i = 0; i < 3; i ++){
        b.push(board[i][i]);
        c.push(board[2 - i][i]);
    }
    if (prov(b) || prov(c)){
        return true;
    }
    return false;
}
function def_mouse(event){
    if (event.target.tagName == "CANVAS"){
        let rect = canvas.getBoundingClientRect()
        let xcor = event.pageX - rect.left;
        let ycor = event.pageY - rect.top;
        xcor -= x;
        ycor -= y
        let i = (ycor + dy / 2) / dy;
        let j = (xcor + dx / 2) / dx;
        i = Math.round(i);
        j = Math.round(j);
        // alert("mousemove: "+(i)+", "+(j)+","+event.target.tagName);
        i -= 1;
        j -= 1;
        if (-1 < i && i < 3 && -1 < j && j < 3){
            if (board[i][j] == 0){
                board[i][j] = xod;
                // alert(board + xod);
                if (prov_board()){
                    finish();
                }
                let flag = true;
                for (let i = 0; i < 3; i++){
                    for (let j = 0; j < 3; j++){
                        if (board[i][j] ==  0){
                            flag = false;
                        }
                    }
                }
                if (flag){
                    alert("Ничья!");
                    clear_board();
                }
                xod = 3 - xod;
                // alert(xod);
            }else{
                alert("Клетка уже занята");
            }
        } 
    }
}
function draw() {
    // Какой-либо код
    for (let i = 0; i < 3; i++) { // выведет 0, затем 1, затем 2
        for (let j = 0; j < 3; j++) { // выведет 0, затем 1, затем 2
            let xcor = x + i * dx;
            let ycor = y + j * dy;
            ctx.strokeStyle = "blue";
            ctx.lineWidth = linewidth;
            ctx.strokeRect(xcor, ycor, dx, dy);
           if (board[j][i] == 1){
            ctx.drawImage(krest, xcor, ycor, dx - linewidth, dy - linewidth);
            // ctx.beginPath();
            // ctx.moveTo(xcor + linewidth, ycor + linewidth);
            // ctx.lineTo(xcor + dx - linewidth, ycor + dy - linewidth);
            // ctx.stroke();
            // ctx.moveTo(xcor + linewidth, ycor - linewidth + dy);
            // ctx.lineTo(xcor + dx - linewidth, ycor + linewidth);
            // ctx.stroke();
           }
           if (board[j][i] == 2){
            ctx.drawImage(zero, xcor, ycor, dx - linewidth, dy - linewidth);
            // ctx.arc(xcor + dx / 2, ycor + dy / 2, dx / 2 - linewidth,0,2 * Math.PI,false);
            // ctx.stroke();
           }
          }
      }
    // ctx.drawImage(bird, xPos, yPos);
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    if (xod == 1){
        ctx.fillText("Ход крестика!");
    }else{
        ctx.fillText("Ход нолика!");
    }
    requestAnimationFrame(draw); // Вызов функции постоянно
   }
   
draw(); // Вызов функции из внец