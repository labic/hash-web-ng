(function () {
  'use strict';

  angular
    .module('hash.metrics')
    .directive('metricsNetworkFilter', function () {
      return {
        templateUrl: 'modules/metrics/views/partials/network-filter.html',
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