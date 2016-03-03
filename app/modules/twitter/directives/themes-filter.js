(function () {
  'use strict';

  angular
    .module('hash.twitter')
    .directive('themesFilter', function () {
      return {
        templateUrl: 'modules/twitter/views/partials/themes-filter.html',
        restrict: 'E',
        replace: true,
        scope: {
          options: '=',
          filter: '='
        },
        link: function(scope, element, attrs) {
          scope.setFilter = function(option, e) {
            scope.filter = option.tag;
            $(element).find('li').removeClass('selected');
            $(e.currentTarget).parent().addClass('selected');
          }
        }
      };
    });

})();
