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
          period: '=',
          number: '=',
          unit: '='
        },
        link: function(scope, element, attrs) {
          scope.setFilter = function(option,e) {
            scope.period = option.value;
            scope.number = option.number;
            scope.unit = option.unit;
          }
        }
      };
    });
})();