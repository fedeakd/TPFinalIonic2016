
angular.module('app', ['firebase','ionic', 'app.controllers','app.controllers2', 'app.routes', 'app.directives','app.services', 'ui.grid',
    'ui.grid.pagination',
    'ui.grid.resizeColumns',
    'ui.grid.selection',
    'ui.grid.exporter',
    'ui.grid.edit'])

.config(function($ionicConfigProvider){

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {

      StatusBar.styleDefault();
    }
  });
}).factory('Informacion',function(){
  return{

   usuarioActual:{}


    }
  })