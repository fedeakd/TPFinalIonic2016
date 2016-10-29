
angular.module('app.controllers', [])

.controller('listaDeDesafiosCtrl',
	function ($scope, $stateParams) {


	})

.controller('listaDeJugadoresCtrl', 
	function ($scope, $stateParams,uiGridConstants,$timeout) {
		var listaDeConectados=[];
		function  DarTabla () {
			return [
			{ field: 'mail', name: 'mail'},
			{ field: 'puntos', name: 'puntos'},
			{ field: 'fecha', name: 'fecha'},
			{ field: 'conexion', name: 'conexion',cellTemplate:"<div><img ng-src=\"{{grid.getCellValue(row, col)=='online'?'img/userOnline.png':'img/userOffline.png'}}\"  > "+
			"{{grid.getCellValue(row, col)}}</div>"},
			
			
			];
		}
		$scope.myTable ={};
		 //$scope.myTable = { rowHeight:60,rowWith:60,enableRowSelection: true, enableRowHeaderSelection: false };
		 $scope.myTable.paginationPageSizes = [25, 50, 75];
		 $scope.myTable.paginationPageSize = 25;
		 $scope.myTable.columnDefs=DarTabla();



		 var firebasUsuariosConectados=new Firebase('https://desafio-2f21c.firebaseio.com/Jugadores/ListaDeUsuarios/contectado');
		 firebasUsuariosConectados.on('child_added', function (snapshot) {
			//firebasUsuariosConectados.child(snapshot.key()).remove();
			var val = snapshot.val();
			listaDeConectados.push(val.id);
		});

		 var firabaseJugadores=new Firebase('https://desafio-2f21c.firebaseio.com/Jugadores');
		 var usuarios=[];
		 var num=0;
		 $timeout(function(){
		 	firabaseJugadores.on('child_added', function (snapshot) {

		 		var val = snapshot.val();
		 		ban=false;
		 		var usuario={'mail': val.mail,
		 		'puntos':val.puntos,
		 		'fecha':val.fechaIncripcion,
		 		'conexion':''} 
		 		listaDeConectados.forEach(function(conectado){
		 			if(conectado==val.id){
		 				ban=true;
		 				usuario.conexion="online";
		 			}
		 		})

		 		if(!ban){
		 			usuario.conexion="offline";
		 		}

		 		if(usuario.mail==null){
		 			return;
		 		}			
		 		usuarios.push(usuario);
		 	});

		 })

		 $timeout(function(){
		 	console.log("listo");
		 	$scope.myTable.data =usuarios;
		 },10000)




		})

.controller('generarDesafioCtrl', 
	function ($scope, $stateParams,$state,Informacion,Servicio) {

		firebase.auth().onAuthStateChanged(function(user) {//si esta logeado
			if (user) {
				Servicio.subirAlConectado(user.uid);
			} else {
				$state.go("login");
			}
		});
		$scope.Salir=function(){
			firebase.auth().signOut().then(function() {
				Servicio.borrarAlConectado(Informacion.usuarioActual.id);
				$state.go("login");
			}, function(error) {
				alert('Sign Out Error: '+ error);
			});
		}
		$scope.IrAMiPerfil=function(){
			$state.go("usuario" , {}, { reload: true });
		}

	})



