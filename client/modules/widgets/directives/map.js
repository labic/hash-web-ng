(function () {
  'use strict';
  /**
   * @ngdoc directive
   * @name hash.widgets:map
   * @description
   * # Create a map
   */
  angular
    .module('hash.ui.widgets')
    .directive('widgetMap', function () {
      return {
        restrict: 'E',
        // require: ['^jquery', '^highmaps'],
        scope: {
          title: '=title',
          type: '=type',
          countries: '=countries'
        },
        templateUrl: 'modules/widgets/views/map.html',
        link: function(scope, element) {
          $(element).highcharts('Map', { 
            title: {
              text: 'Title' //scope.title
            },

            mapNavigation: {
              enabled: true
            },

            legend: {
              layout: 'horizontal',
              borderWidth: 0,
              backgroundColor: 'rgba(255,255,255,0.85)',
              floating: true,
              verticalAlign: 'top',
              y: 25
            },

            colorAxis: {
              min: 1,
              type: 'logarithmic',
              minColor: '#EEEEFF',
              maxColor: '#000022',
              stops: [
                [0, '#EFEFFF'],
                [0.67, '#4444FF'],
                [1, '#000022']
              ]
            },

            series : [{
              data: scope.data,
              mapData: Highcharts.maps[scope.countries], // 'countries/br/br-all'
              joinBy: ['postal', 'postal'],
              dataLabels: {
                enabled: true,
                color: 'white',
                format: '{point.code}'
              },
              name: 'name', //scope.name,
              tooltip: {
                pointFormat: '{point.code}: {point.value}'
              }
            }]
          })

          $scope.$broadcast('hash.widgets:map/ready');
        }
      };
    });

})();