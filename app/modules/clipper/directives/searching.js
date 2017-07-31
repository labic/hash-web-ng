hash.directive('searching', function() { 
  return { 
    restrict: 'E',
    templateUrl: 'modules/clipper/directives/searching.html',
    link: function(scope, element, attrs) {
        scope.buttonIMG = "img/clipper/lupa.PNG",
        scope.hide = true,

        scope.novaPesquisa = function() {
          if(scope.hide){
            document.getElementById('taggy').style.display = 'block';
            document.getElementById('taggy').focus();
            scope.hide = false;
          }
          else {
            document.getElementById('taggy').style.display = 'none';
            scope.hide = true;
          }

        }
      }
  }; 
});