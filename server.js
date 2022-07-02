
const fastify = require('fastify')
const fastifyStatic = require('@fastify/static')
const path = require('path')

const socketio = require('fastify-socket.io')

const app = fastify({ logger: false })
app.register(socketio)

const players = {};

app.ready().then(() => {

    app.io.on("connection", (socket) => {
        //Création du nouveau joueur à la connnexion
        console.log("Socket.io new connection", socket.id)
        players[socket.id] = {
          x: 0,
          y: 0,
          name: "Guest",
          color: "#"+((1<<24)*Math.random()|0).toString(16),
          id: socket.id,
          screen: [1920,1080]
        };

        //Récupération de la nouvelle position du joueur
        socket.on('mouse_position', function (data) {
          players[socket.id].x=data.mx
          players[socket.id].y=data.my
          players[socket.id].screen=data.myScreen
        });

        //Emission des nouvelles positions des joueurs
        function update() {
          socket.volatile.emit('players_list', Object.values(players));
        }
        setInterval(update, 1000/60);

        //Destruction du joueur une fois déconnecté
        socket.on('disconnect', () => {
            console.log('Socket.io deconnection', socket.id);
            delete players[socket.id];
          });
          
      });

});





// Default root in Public
app.register(fastifyStatic, {
  root: path.join(__dirname, '/public')
})


//Start the server
const start = async () => {
  try {
    await app.listen({ port: 3000 })
  } 
  catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()