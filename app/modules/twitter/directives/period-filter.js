(function () {
  'use strict';

  angular
    .module('hash.twitter')
    .directive('periodFilter', function () {
      return {
        templateUrl: 'modules/facebook/views/partials/period-filter.html',
        restrict: 'E',
        replace: true,
        scope: {
          options: '=',
          filter: '='
        },
        link: function(scope, element, attrs) {
          scope.setFilter = function(e) {
            scope.filter = $(e.currentTarget).attr('value');
          }
        }
      };
    });

})();
