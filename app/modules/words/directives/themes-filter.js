(function () {
  'use strict';

  angular
    .module('hash.words')
    .directive('wdThemesFilter', function () {
      return {
        templateUrl: 'modules/words/views/partials/themes-filter.html',
        restrict: 'E',
        replace: true,
        scope: {
          options: '=',
          tag: '=',
          title: '='
        },
        link: function(scope, element, attrs) {
          scope.setFilter = function(option, e,main) {
            scope.tag = option.tag;
            scope.title = option.title;
            $('li', element).removeClass('selected');
            $(e.currentTarget).parent().addClass('selected');
          }
        }
      };
    });
})();