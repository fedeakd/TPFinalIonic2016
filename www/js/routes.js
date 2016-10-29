angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabs', {
    url: '/desafio',
    templateUrl: 'templates/tabs.html',
    abstract:true
  })

  .state('tabs.listaDeDesafios', {
    url: '/Desafios',
    views: {
      'tab4': {
        templateUrl: 'templates/listaDeDesafios.html',
        controller: 'listaDeDesafiosCtrl'
      }
    }
  })

  .state('tabs.listaDeJugadores', {
    url: '/Jugadores',
    cache:false,
    views: {
      'tab6': {
       templateUrl: 'templates/listaDeJugadores.html',
        controller: 'listaDeJugadoresCtrl'
      }
    }
  })

  .state('tabs.generarDesafio', {
    url: '/altaDesafio',
    views: {
      'tab7': {
        templateUrl: 'templates/generarDesafio.html',
        controller: 'generarDesafioCtrl'
      }
    }
  })

  .state('login', {
    url: '/Login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('registrar', {
    url: '/registrar',
    templateUrl: 'templates/registrar.html',
    controller: 'registrarCtrl'
  })
  .state('usuario', {
    url: '/usuario',
    cache:false,
    templateUrl: 'templates/usuario.html',
    controller: 'usuarioCtrl'
  })
$urlRouterProvider.otherwise('/Login')

  

}).factory("global",function(){
  return{
    votante:'',
    modificar:false,
    persona:'',
    modificarPersona:''
  }
});