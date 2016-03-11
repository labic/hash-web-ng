hash.controller('mainInstagram', function ($scope, settings, InstagramMedia) {
  $scope.config = {
    filter: settings.get('instagram.filters'),
    map: {
      center: { latitude: -13.32156, longitude: -53.8852 },
      zoom: 4,
      options: {}
    }
  };

  $scope.filter = {
    tags: 'categoria-midia',
    period: 'recent',
  };

  $scope.mediasGeolocation = [];
  $scope.mediasImages = [];

  $scope.$watch('filter', function (newFilter, oldFilter) {
    // Populate the map
    InstagramMedia.find({
      'period': $scope.filter.period,
      'tags': [newFilter.tema],
      'geo': true,
      'page': 1,
      'per_page': 100
    }, function(medias) {
      var makers = [];

      for (var i = 0; i < medias.length; i++) {
        var maker = {
          id: i,
          latitude: medias[i].data.location.latitude,
          longitude: medias[i].data.location.longitude
        }
        if (medias[i].data.caption)
          maker.title = medias[i].data.caption.text

        makers.push(maker);
      }

      $scope.mediasGeolocation = makers;
    });

    // Populate the mosaic
    InstagramMedia.find({
      'period': $scope.filter.period,
      'tags': [newFilter.tema],
      'page': 1,
      'per_page': 100
    }, function(medias) {
      medias = _.sortBy(medias, ['data.created_time']);
      var images = [];

      for (var i = 0; i < medias.length; i++) {
        images.push({
          link: medias[i].data.link,
          src: medias[i].data.images.standard_resolution.url
        });
      }

      $scope.mediasImages = images;
    });
  },true);

});
