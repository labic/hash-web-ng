(function () {
  'use strict';

  angular
    .module('hash.words')
    .directive('wdPeriodFilter', function () {
      return {
        templateUrl: 'modules/words/views/partials/period-filter.html',
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
