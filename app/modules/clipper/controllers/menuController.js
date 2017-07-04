hash.controller('menuController', [ '$scope',  function ($scope) {
     $scope.news = 2;
     $scope.mLat = [ 
      { 
        id: 'iconNot', 
        link: '#', 
        coverAtv: 'img/clipper/menu1_atv.PNG', 
        coverDes: 'img/clipper/menu1_des.PNG' 
      }, 
      { 
        id: 'iconGraf', 
        link: '#', 
        coverAtv: 'img/clipper/menu2_atv.PNG', 
        coverDes: 'img/clipper/menu2_des.PNG' 
      }, 
    ];
    $scope.plusOne = function (index) {
         $scope.news += 1;
        };
    $scope.minusOne = function (index) {
         $scope.news -= 1;
        };
    $scope.ultHora = [
     {
      label:'1 hora',
      link:''
     },
     {
      label:'2 horas',
      link:''
     },
      {
      label:'1 dia',
      link:''
     },
      {
      label:'1 semana',
      link:''
     },
      {
      label:'Outro',
      link:''
     }
    ];

    $scope.categ = [
     {
      label:'1 hora',
      link:''
     },
     {
      label:'2 horas',
      link:''
     },
      {
      label:'1 dia',
      link:''
     },
      {
      label:'1 semana',
      link:''
     },
      {
      label:'Outro',
      link:''
     }
    ];

    $scope.prod = [
     {
      label:'1 hora',
      link:''
     },
     {
      label:'2 horas',
      link:''
     },
      {
      label:'1 dia',
      link:''
     },
      {
      label:'1 semana',
      link:''
     },
      {
      label:'Outro',
      link:''
     }
    ];

    $scope.tipoCont = [
     {
      label:'1 hora',
      link:''
     },
     {
      label:'2 horas',
      link:''
     },
      {
      label:'1 dia',
      link:''
     },
      {
      label:'1 semana',
      link:''
     },
      {
      label:'Outro',
      link:''
     }
    ];

    $scope.alcance = [
     {
      label:'1 hora',
      link:''
     },
     {
      label:'2 horas',
      link:''
     },
      {
      label:'1 dia',
      link:''
     },
      {
      label:'1 semana',
      link:''
     },
      {
      label:'Outro',
      link:''
     }
    ];

    $scope.regiao = [
     {
      label:'1 hora',
      link:''
     },
     {
      label:'2 horas',
      link:''
     },
      {
      label:'1 dia',
      link:''
     },
      {
      label:'1 semana',
      link:''
     },
      {
      label:'Outro',
      link:''
     }
    ];

    $scope.mSupE = [ 
      { 
        id: 'iconRead', 
        onclick: '#', 
        coverAtv: 'img/clipper/icon7.PNG'
      },
      { 
        id: 'iconRef', 
        onclick: '#', 
        coverAtv: 'img/clipper/icon6.PNG' 
      }, 
      { 
        id: 'iconNext', 
        onclick: '#', 
        coverAtv: 'img/clipper/icon5.PNG'
      }, 
    ];
    }]);