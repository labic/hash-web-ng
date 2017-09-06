hash.directive('noticias', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=',
      listaSel: '='
    }, 
    templateUrl: 'modules/clipper/directives/noticias.html' 
  }; 
});