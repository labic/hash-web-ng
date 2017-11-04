hash.directive('modolista', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=',
      listaSel: '='
    }, 
    templateUrl: 'modules/clipper/directives/modoLista.html' 
  }; 
});