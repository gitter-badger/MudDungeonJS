(function(r) {
    "use strict";

    var modules = {
        data: r('./data').data,
        helper: r('./helpers').helpers,
        commands: r('./commands').commands,
        fs: r('fs'),
        world: r('../World/tutorial').tutorial,
        playerSetup: {
            player: r('./playerSetup/player-manager').playerManager
        },
        color: r('colors')
    };
    exports.playerLocation = {

        loadRoom: function (socket, playerInfo) {
            //need to broadcast this

             modules.playerSetup.player.broadcast(playerInfo.name + ' has appeared');
          //  socket.write(playerInfo.name + ' has appeared');

            //load room based on player location
            var tutorial = modules.world.rooms;

            socket.write(tutorial.prison.title.green);
            socket.write(tutorial.prison.description);
            socket.write("\r\nExits: []");

            socket.on('close', function () {
              modules.playerSetup.player.removePlayer(socket);

              console.log("Player left");
            });

            //TODO display other players? if in same room
        }
}

})(require);