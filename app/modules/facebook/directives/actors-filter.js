(function () {
  'use strict';

  angular
    .module('hash.facebook')
    .directive('fbActorsFilter', function ($timeout) {
      return {
        templateUrl: 'modules/facebook/views/partials/actors-filter.html',
        restrict: 'E',
        replace: true,
        scope: {
          options: '=',
          filter: '='
        },
        link: function(scope, element, attrs) {
          scope.setFilter = function(option, e) {
            scope.filter = option.tag;
            $('.facebook-actors-each').removeClass('selected');
            $(e.currentTarget).addClass('selected');
          }

          // TODO: POG
          $timeout(callSvgImg, 0);
        }
      };
    });

})();
