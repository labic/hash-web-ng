(function () {
  'use strict';

  angular
    .module('hash.instagram')
    .directive('imThemesFilter', function () {
      return {
        templateUrl: 'modules/instagram/views/partials/themes-filter.html',
        restrict: 'E',
        replace: true,
        scope: {
          options: '=',
          tag: '=',
          title: '=',
          social: '='
        },
        link: function(scope, element, attrs) {
          scope.setFilter = function(option, e, social) {
            scope.tag = option.tag;
            scope.title = option.title;
            scope.social = social;
            $('li', element).removeClass('selected');
            $(e.currentTarget).parent().addClass('selected');
          }
        }
      };
    });
})();