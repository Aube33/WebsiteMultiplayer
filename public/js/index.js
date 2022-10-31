var mousex, mousey;
const PointorsSize=(screen.width+screen.height)/18000

let players = [];
let LocalPlayer;

let elementsToUpdate=[];

socket.on('players_list', function(list) {
    players = list;
  });

socket.on('elementsToUpdate_list', function(list) {
    elementsToUpdate = list;
  });


const ctx = canvas.getContext('2d');

//===== BASICS =====

//=== WEBPAGE ENGINE ===
//Build players
function drawPlayers() {
    count=0
    elementsToUpdate.forEach(function({}) {
        
        count+=1;
    });
  }
//======

//=== PLAYERS ===
//Draw Mouse in canva
function drawMouse(xoff, yoff, xmul, ymul, color, cursorType) {
    //Default cursor
    if(cursorType==0){
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
    //Text cursor
    else if(cursorType==1){
        ctx.beginPath()
        ctx.lineTo(2 * xmul + xoff, 104 * ymul + yoff);
        ctx.lineTo(52 * xmul + xoff, 104 * ymul + yoff);
        ctx.lineTo(53 * xmul + xoff, 99 * ymul + yoff);
        ctx.lineTo(32 * xmul + xoff, 99 * ymul + yoff);
        ctx.lineTo(32 * xmul + xoff, 7 * ymul + yoff);
        ctx.lineTo(53 * xmul + xoff, 5 * ymul + yoff);
        ctx.lineTo(53 * xmul + xoff, 1 * ymul + yoff);
        ctx.lineTo(1 * xmul + xoff, 0 * ymul + yoff);
        ctx.lineTo(2 * xmul + xoff, 6 * ymul + yoff);
        ctx.lineTo(24 * xmul + xoff, 6 * ymul + yoff);
        ctx.lineTo(25 * xmul + xoff, 99 * ymul + yoff);
        ctx.lineTo(2 * xmul + xoff, 99 * ymul + yoff);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
    //Pointer cursor
    else if(cursorType==2){
        ctx.beginPath()
        ctx.lineTo(39 * xmul + xoff, 117 * ymul + yoff);
        ctx.lineTo(83 * xmul + xoff, 117 * ymul + yoff);
        ctx.bezierCurveTo(96 * xmul + xoff, 103 * ymul + yoff, 106 * xmul + xoff, 40 * ymul + yoff, 93 * xmul + xoff, 37 * ymul + yoff)
        ctx.lineTo(82 * xmul + xoff, 37 * ymul + yoff);
        ctx.lineTo(82 * xmul + xoff, 59 * ymul + yoff);
        ctx.lineTo(77 * xmul + xoff, 58 * ymul + yoff);
        ctx.lineTo(77 * xmul + xoff, 32 * ymul + yoff);
        ctx.lineTo(65 * xmul + xoff, 31 * ymul + yoff);
        ctx.lineTo(65 * xmul + xoff, 53 * ymul + yoff);
        ctx.lineTo(60 * xmul + xoff, 52 * ymul + yoff);
        ctx.lineTo(60 * xmul + xoff, 26 * ymul + yoff);
        ctx.lineTo(48 * xmul + xoff, 26 * ymul + yoff);
        ctx.lineTo(47 * xmul + xoff, 51 * ymul + yoff);
        ctx.lineTo(42 * xmul + xoff, 51 * ymul + yoff);
        ctx.lineTo(42 * xmul + xoff, 3 * ymul + yoff);
        ctx.lineTo(37 * xmul + xoff, 1 * ymul + yoff);
        ctx.lineTo(31 * xmul + xoff, 2 * ymul + yoff);
        ctx.lineTo(29 * xmul + xoff, 62 * ymul + yoff);
        ctx.lineTo(25 * xmul + xoff, 62 * ymul + yoff);
        ctx.lineTo(15 * xmul + xoff, 53 * ymul + yoff);
        ctx.lineTo(9 * xmul + xoff, 53 * ymul + yoff);
        ctx.lineTo(6 * xmul + xoff, 59 * ymul + yoff);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}

//Send MY mouse position
document.addEventListener("mousemove", () => {
    mousex = event.clientX;
    mousey = event.clientY;
    screen = [window.innerWidth, window.innerHeight];
    socket.emit('mouse_position', {mx: mousex, my: mousey, myScreen: screen});
}); 
//=== Send MY mouse cursor state ===
//Textareas
let textareas = document.getElementsByTagName("textarea");
for(var i=0; i<textareas.length; i++){
    textareas[i].addEventListener('mouseenter',function(e){
        socket.emit('mouse_cursor', {cursor: 1});
    });
    
    textareas[i].addEventListener('mouseout',function(e){
        socket.emit('mouse_cursor', {cursor: 0});
    });
}
//Texts
let texts = document.getElementsByClassName("text");
for(var i=0; i<texts.length; i++){
    texts[i].addEventListener('mouseenter',function(e){
        socket.emit('mouse_cursor', {cursor: 1});
    });
    
    texts[i].addEventListener('mouseout',function(e){
        socket.emit('mouse_cursor', {cursor: 0});
    });
}
//Buttons
let buttons = document.getElementsByTagName("button");
for(var i=0; i<buttons.length; i++){
    buttons[i].addEventListener('mouseenter',function(e){
        socket.emit('mouse_cursor', {cursor: 2});
    });
    
    buttons[i].addEventListener('mouseout',function(e){
        socket.emit('mouse_cursor', {cursor: 0});
    });
}
//Links
let links = document.getElementsByTagName("a");
for(var i=0; i<links.length; i++){
    links[i].addEventListener('mouseenter',function(e){
        //Check if link is menu to adapt
        if(this.classList.contains("menubar-links")){
            this.classList.add("hover");
        }
        socket.emit('mouse_cursor', {cursor: 2, elementId: this.id, action: "Hover", actionType: 1});
    });
    
    links[i].addEventListener('mouseout',function(e){
        //Check if link is menu to adapt
        if(this.classList.contains("menubar-links")){
            this.classList.remove("hover");
        }
        socket.emit('mouse_cursor', {cursor: 0, elementId: this.id, action: "Hover", actionType: 0});
    });
}
//===

//Add players name
function drawPlayers_name(x, y, name){
    fontSize=(screen.width+screen.height)/135
    ctx.font = '15px sans-serif';
    ctx.fillText(name, x, y);
}

//Build players
function drawPlayers() {
    count=0
    players.forEach(function({x, y, name, color, id, screen, cursorType}) {
        if(id!=socket.id){
            if(cursorType==0){
                x_sync=x*(window.innerWidth/screen[0]);
                y_sync=y*(window.innerHeight/screen[1]);
                drawMouse(x_sync, y_sync, PointorsSize, PointorsSize, color, cursorType)
                drawPlayers_name(x_sync+14,y_sync+7,name)
            }
            if(cursorType==1){
                x_sync=x*(window.innerWidth/screen[0]);
                y_sync=y*(window.innerHeight/screen[1]);
                drawMouse(x_sync-1, y_sync-7, PointorsSize, PointorsSize, color, cursorType)
                drawPlayers_name(x_sync+14,y_sync+7,name)     
            }
            if(cursorType==2){
                x_sync=x*(window.innerWidth/screen[0]);
                y_sync=y*(window.innerHeight/screen[1]);
                drawMouse(x_sync-5, y_sync+3, PointorsSize, PointorsSize, color, cursorType)
                drawPlayers_name(x_sync+14,y_sync+7,name)     
            }
        }
        else{
            LocalPlayer=players[count]
            /*
            if(cursorType==0){
                x_sync=x*(window.innerWidth/screen[0]);
                y_sync=y*(window.innerHeight/screen[1]);
                drawMouse(x_sync, y_sync, PointorsSize, PointorsSize, color, cursorType)
                drawPlayers_name(x_sync+14,y_sync+7,name)
            }
            if(cursorType==1){
                x_sync=x*(window.innerWidth/screen[0]);
                y_sync=y*(window.innerHeight/screen[1]);
                drawMouse(x_sync-1, y_sync-7, PointorsSize, PointorsSize, color, cursorType)
                drawPlayers_name(x_sync+14,y_sync+7,name)     
            }
            if(cursorType==2){
                x_sync=x*(window.innerWidth/screen[0]);
                y_sync=y*(window.innerHeight/screen[1]);
                drawMouse(x_sync-5, y_sync+3, PointorsSize, PointorsSize, color, cursorType)
                drawPlayers_name(x_sync+14,y_sync+7,name)     
            }*/
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