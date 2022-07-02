var mousex, mousey;
const PointorsSize=(screen.width+screen.height)/17000

let players = [];
let LocalPlayer;

socket.on('players_list', function(list) {
    players = list;
  });

const ctx = canvas.getContext('2d');

//===== BASICS =====

//=== PLAYERS ===
//Draw Mouse in canva
function drawMouse(xoff, yoff, xmul, ymul, color, type) {
    if(type==0){
        ctx.beginPath()
        ctx.lineTo(2 * xmul + xoff, 1 * ymul + yoff);
        ctx.lineTo(2 * xmul + xoff, 108 * ymul + yoff);
        ctx.lineTo(26 * xmul + xoff, 87 * ymul + yoff);
        ctx.lineTo(40 * xmul + xoff, 114 * ymul + yoff);
        ctx.lineTo(62 * xmul + xoff, 104 * ymul + yoff);
        ctx.lineTo(47 * xmul + xoff, 76 * ymul + yoff);
        ctx.lineTo(78 * xmul + xoff, 77 * ymul + yoff);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
    else if(type==1){
        
    }
}

//Send MY mouse position
document.addEventListener("mousemove", () => {
    mousex = event.clientX;
    mousey = event.clientY;
    screen = [window.innerWidth, window.innerHeight];
    socket.emit('mouse_position', {mx: mousex, my: mousey, myScreen: screen});
}); 

//Add players name
function drawPlayers_name(x, y, name){
    fontSize=(screen.width+screen.height)/135
    ctx.font = '15px sans-serif';
    ctx.fillText(name, x, y);
}

//Build players
function drawPlayers() {
    count=0
    players.forEach(function({x, y, name, color, id, screen, type}) {
        if(id!=socket.id){
            x_sync=x*(window.innerWidth/screen[0]);
            y_sync=y*(window.innerHeight/screen[1]);
            drawMouse(x_sync, y_sync, PointorsSize, PointorsSize, color, type)
            drawPlayers_name(x_sync+13,y_sync+7,name)
        }
        else{
            LocalPlayer=players[count]
        }
        count+=1;
      });
  }
//======

//Update
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayers();
    requestAnimationFrame(update);
}

requestAnimationFrame(update);

//==========