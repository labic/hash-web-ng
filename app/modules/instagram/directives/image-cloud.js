(function () {
  'use strict';

  angular
    .module('hash.instagram')
    .directive('imageCloud', function () {
      return {
        template: '<div class="d3-mosaic"><svg></svg></div>',
        restrict: 'E',
        replace: true,
        scope: {
          images: '=',
          options: '=',
        },
        link: function (scope, element, attrs) {
          var $el = $(element),
              $svg = $('svg', element);

          scope.$watch('images', function (newImages, oldImages) {
            if (scope.images.length) {
              var counter = 0,
                  n = 5, // TODO: WTF is n?
                  r = 0,
                  thumbnail_width = 0, // Thumbnail width
                  width = $el.width(),
                  increment = 3,
                  x = 0,
                  y = 0;

              d3.select($svg[0]).selectAll('a')
                .data(scope.images)
                .enter()
                .append('a')
                .attr('xlink:href', function (d) { return d.link; })
                .attr('target', '_blank')
                .append('image')
                .attr('xlink:href', function (d) { return d.src })
                .attr('width', function (d, i) {
                  if(i==0) reset(); return calcWidth() + 'px';
                })
                .attr('height', function (d, i) {
                  if(i==0) reset(); return calcWidth() + 'px';
                })
                .attr('x', function (d, i) {
                  if(i === 0) reset(); return calcX();
                })
                .attr('y', function (d, i) {
                  if(i === 0) reset(); return calcY();
                });

              function reset(){
                y = 0;
                n = 5;
                counter = 0;
                thumbnail_width = width/n;
              }

              function calcX(){
                r = thumbnail_width * counter;
                counter++;
                if (counter == n){
                  counter = 0;
                  n = n + increment;
                  thumbnail_width = width/n;
                }
                return r;
              }

              function calcWidth(){
                r = thumbnail_width;
                counter++;
                if (counter == n){
                  counter = 0;
                  n = n + increment;
                  thumbnail_width = width/n;
                }
                return r;
              }

              function calcY(){
                counter++;
                var r = y;
                if (counter == n){
                  counter = 0;
                  n = n + increment;
                  y = y + thumbnail_width;
                  thumbnail_width = width/n;
                }
                return r;
              }
            }
          });

          function sizeHandler() {
            $svg.attr('width', $el.width());
            $svg.attr('height', $el.height());
          }

          $(document).ready(sizeHandler);
          $(window).on('resize', sizeHandler);
        }
      };
    });

})();
