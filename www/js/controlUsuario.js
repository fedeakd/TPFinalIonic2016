angular.module('app.controllers2', ['firebase'])
.controller('loginCtrl', 
	function ($scope, $stateParams,$state,$timeout,$ionicPopup,Informacion,Servicio) {

		firebase.auth().onAuthStateChanged(function(user) {//si esta logeado
			if (user) {
				firabaseJugadores.on('child_added', function (snapshot) {//Compruebo el usuario  que se logeo y traigo el dato

					var message = snapshot.val();
					if(message.id===user.uid){
						//Servicio.subirAlConectado(message.id);	
						Informacion.usuarioActual=message;
						$state.go("tabs.generarDesafio", {}, { reload: true });
						return;
					}
				});
			} else {

			}
		});

		$scope.user={};
		$scope.user.mail="soii_fede@hotmail.com";
		$scope.user.clave="federico18";

		var firabaseJugadores=new Firebase('https://desafio-2f21c.firebaseio.com/Jugadores');
		$scope.IrARegistrar=function(){

			$state.go("registrar");
		}

		$scope.IrAlDesafio=function(){
			firebase.auth().signInWithEmailAndPassword($scope.user.mail,$scope.user.clave).then(function(user){
				$timeout(function(){
					$scope.datoUsuario=JSON.stringify(user,"sin registrar","");

					if(user){
						firabaseJugadores.on('child_added', function (snapshot) {//Compruebo el usuario  que se logeo y traigo el dato

							var message = snapshot.val();
							if(message.id===user.uid){
								Informacion.usuarioActual=message;
								$state.go("tabs.generarDesafio", {}, { reload: true });
								return;
							}
						});
						
						$scope.estalogeado="si";
					}
					else{

						$scope.estalogeado="no";

					}

					$scope.habilitarfORM=true;
				})

			}).catch(function(error){
				var errorCode=error.code;
				var erroMessage=error.menssage;
				var  mensaje="";

				if(errorCode==="auth/wrong-password")
				{	
					mensaje="Error, contraseña no valida";
					console.log("Wrong password");

				}
				else if(errorCode==="auth/invalid-email"){
					mensaje="Error, MAIL no valido";
				}
				else if(errorCode==="auth/user-disabled"){
					mensaje="Error, El usuario se ah dado de baja";
					//Usuario  desactivado
				}
				else if(errorCode==="auth/user-not-found"){
					mensaje="Error, el usuario no existe";
					// usuario  no existe
				}

				else{

					console.log(erroMessage);
				}


				$ionicPopup.alert({
					title:'Algo salio mal!!',
					template:mensaje
				});

				$scope.habilitarfORM=true;
				console.info("errores:",error);
				console.log(error);
			})


		}

		$scope.RecuperarClave=function(mailEstado){
			if(!mailEstado){
				$ionicPopup.alert({
					title:'Error',
					template:'Necesito  un mail correcto!!'
				});
				return;
			}
			var auth = firebase.auth();
			var emailAddress =$scope.user.mail;

			auth.sendPasswordResetEmail(emailAddress).then(function() {

				$ionicPopup.alert({
					title:'Mail enviado!!',
					template:"Te hemos mandado un mail a tu casilla, revisa ",
					cssClass: 'animated bounceInDown'


				});
			}, function(error) {
				$ionicPopup.alert({
					title:'ALgo malo a pasado!!',
					template:"Puede ser  que el mail no existe,  o problemas ajenos a nuestro servicio, gracias "
				});
			});

		}

	}).controller('registrarCtrl', 
	function ($scope, $stateParams,$state,$ionicPopup) {
		var firabaseJugadores=new Firebase('https://desafio-2f21c.firebaseio.com/Jugadores');
		$scope.persona={};
		$scope.persona.mail="soii_fede123@hotmail.com";
		$scope.persona.clave="federico18";
		$scope.persona.reClave="federico18";
		$scope.fechaActual= function(){
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; 
			var yyyy = today.getFullYear();

			if(dd<10) {
				dd='0'+dd
			} 

			if(mm<10) {
				mm='0'+mm
			} 

			today = dd+'/'+mm+'/'+yyyy;
			return today;
		}

		$scope.IrAlLogin=function(){
			$state.go("login");
		}

		$scope.Registrar=function(){
			console.log($scope.persona);
			firebase.auth().createUserWithEmailAndPassword($scope.persona.mail,$scope.persona.clave).then(function(user){
				if(user){
					console.log(user);
					firabaseJugadores.push({
						'id':user.uid,
						"mail":$scope.persona.mail,
						'clave':$scope.persona.clave,
						'estado':'normal',
						'proveedor':'ordinario',
						'puntos':1000,
						'tickets':[],
						'partidas':{
							'ganada':[],
							'empatada':[],
							'perdida':[],
							'cantidad':0},
							'fechaIncripcion':$scope.fechaActual()


						});

					$state.go("login");
				}


			}).catch(function(error){

				var errorCode=error.code;
				var erroMessage=error.menssage;
				var  mensaje="";

				if(errorCode==="auth/email-already-in-use")
				{	
					mensaje="Error, el MAIL ya se encuentra registrado";
				}
				else if(errorCode==="auth/invalid-email"){
					mensaje="Error, MAIL no valido";
				}
				else if(errorCode==="auth/operation-not-allowed"){
					mensaje="Error, El usuario no esta habilitado";
					//Usuario  desactivado
				}
				else if(errorCode==="auth/weak-password"){
					mensaje="Error, la clave es debil";
					// usuario  no existe
				}

				else{

					console.log(erroMessage);
				}


				$ionicPopup.alert({
					title:'Algo salio mal!!',
					template:mensaje
				});

				$scope.habilitarfORM=true;
			})
		}
		$scope.ConectarseConTwitter=function(){
			console.log("twitter");

		}

		$scope.ConectarseConFacebook=function(){
			console.log("facebook");

			var credential = firebase.auth.FacebookAuthProvider.credential(
				response.authResponse.accessToken);

			firebase.auth().signInWithCredential(credential).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
		}

		$scope.ConectarseConGitHub=function(){
			console.log("GitHub");
			var provider = new firebase.auth.GithubAuthProvider();
			firebase.auth().signInWithPopup(provider).then(function(result) {
				var token = result.credential.accessToken;

				var user = result.user;

			}).catch(function(error) {

				var errorCode = error.code;
				var errorMessage = error.message;
				var email = error.email;
				var credential = error.credential;
  // ...
});
		}

		$scope.ConectarseConGoogle=function(){
			console.log("google");

		}
	})
.controller('usuarioCtrl', 
	function ($scope, $stateParams,$state,$ionicModal,$ionicPopup,Informacion) {
		console.log(Informacion.usuarioActual.estado);
		$scope.usuario= Informacion.usuarioActual;
		console.log($scope.usuario);
		$scope.Volver=function(){
			$state.go("tabs.generarDesafio");
			
			
		}
		$scope.EliminarCuenta=function(){
			var confirmPopup = $ionicPopup.confirm({
				title: 'Eliminar cuenta',
				template: 'Seguro que quieres eliminar esta cuenta?'
			});
			confirmPopup.then(function(res) {
				if(res) {
					var user = firebase.auth().currentUser;
					
					user.delete().then(function() {
						var alertPopup = $ionicPopup.alert({
							title: 'Usuario eliminado',
							template: 'El usuario a sido  eliminado'
						});
						$state.go("login");
					}, function(error) {
						alert(error);
					});
				} else {
					
				}
			});
		}
	})



		/*var provider = new firebase.auth.GithubAuthProvider();
			firebase.auth().signInWithRedirect(provider);
			firebase.auth().getRedirectResult().then(function(result) {
				if (result.credential) {
					var token = result.credential.accessToken;

					var user = result.user;
					alert(user);
					console.log(user);
				}
				}).catch(function(error) {
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log(error.code);
					var email = error.email;
					console.log("hola");
					var credential = error.credential;

				});*/