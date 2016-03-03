(function () {
  'use strict';

  angular
    .module('hash.twitter')
    .directive('themesFilter', function () {
      return {
        templateUrl: 'modules/twitter/views/partials/themes-filter.html',
        restrict: 'E',
        scope: {
          options: '='
        },
        link: function(scope, element, attrs) {
          console.log(scope.options);
        }
      };
    });

})();
