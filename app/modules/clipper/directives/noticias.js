hash.directive('noticias', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'modules/clipper/directives/noticias.html' 
  }; 
});