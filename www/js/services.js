angular.module('app.services', ['ionic','firebase'])

.service('Servicio', function ($http){
	this.borrarAlConectado=BorrarAlConectado;
	this.subirAlConectado= SubirAlConectado;

	function BorrarAlConectado(id){//Borramos al usuario  con  la  id actual  
		var firebasUsuariosConectados=new Firebase('https://desafio-2f21c.firebaseio.com/Jugadores/ListaDeUsuarios/contectado');
		firebasUsuariosConectados.on('child_added', function (snapshot) {
			//firebasUsuariosConectados.child(snapshot.key()).remove();
			if(snapshot.val().id==id){
				firebasUsuariosConectados.child(snapshot.key()).remove();
			}
		});


		console.log("holaa");
	}

	function SubirAlConectado(id){
		var myConnectionsRef = new Firebase('https://desafio-2f21c.firebaseio.com/Jugadores/ListaDeUsuarios/contectado');
		var connectedRef = new Firebase('https://desafio-2f21c.firebaseio.com/.info/connected');
		connectedRef.on('value', function(snap) {
			if (snap.val() === true) {
				var con = myConnectionsRef.push({"id":id});
				con.onDisconnect().remove();//OJO FIREBASE  ANDA COMO QUIERE !!
			}
		});
	}
});