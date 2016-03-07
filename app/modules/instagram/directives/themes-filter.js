(function () {
  'use strict';

  angular
    .module('hash.instagram')
    .directive('inThemesFilter', function () {
      return {
        templateUrl: 'modules/instagram/views/partials/themes-filter.html',
        restrict: 'E',
        replace: true,
        scope: {
          options: '=',
          filter: '='
        },
        link: function(scope, element, attrs) {
          scope.setFilter = function(option, e) {
            scope.filter = option.tag;
            $('li', element).removeClass('selected');
            $(e.currentTarget).parent().addClass('selected');
          }
        }
      };
    });

})();
