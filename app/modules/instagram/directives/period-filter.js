(function () {
  'use strict';

  angular
    .module('hash.instagram')
    .directive('imPeriodFilter', function () {
      return {
        templateUrl: 'modules/instagram/views/partials/period-filter.html',
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
