angular
    .module('hash.clipper')
    .controller('menuController', [ '$scope',  function ($scope) {
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
      value:"2017-07-30T00:00:00.000000"
     },
     {
      label:'2 horas',
      value:''
     },
      {
      label:'1 dia',
      value:''
     },
      {
      label:'1 semana',
      value:''
     },
      {
      label:'Outro',
      value:''
     }
    ];

    $scope.categ = [
     {
      label:'1 hora',
      value:''
     },
     {
      label:'2 horas',
      value:''
     },
      {
      label:'1 dia',
      value:''
     },
      {
      label:'1 semana',
      value:''
     },
      {
      label:'Outro',
      value:''
     }
    ];

    $scope.prod = [
     {
      label:'1 hora',
      value:''
     },
     {
      label:'2 horas',
      value:''
     },
      {
      label:'1 dia',
      value:''
     },
      {
      label:'1 semana',
      value:''
     },
      {
      label:'Outro',
      value:''
     }
    ];

    $scope.tipoCont = [
     {
      label:'1 hora',
      value:''
     },
     {
      label:'2 horas',
      value:''
     },
      {
      label:'1 dia',
      value:''
     },
      {
      label:'1 semana',
      value:''
     },
      {
      label:'Outro',
      value:''
     }
    ];

    $scope.alcance = [
     {
      label:'1 hora',
      value:''
     },
     {
      label:'2 horas',
      value:''
     },
      {
      label:'1 dia',
      value:''
     },
      {
      label:'1 semana',
      value:''
     },
      {
      label:'Outro',
      value:''
     }
    ];

    $scope.regiao = [
     {
      label:'1 hora',
      value:''
     },
     {
      label:'2 horas',
      value:''
     },
      {
      label:'1 dia',
      value:''
     },
      {
      label:'1 semana',
      value:''
     },
      {
      label:'Outro',
      value:''
     }
    ];

    $scope.mSupE = [ 
      { 
        id: 'iconNext', 
        onclick: '#', 
        coverAtv: 'img/clipper/icon5.PNG'
      },
      // { 
      //   id: 'iconRef', 
      //   onclick: '#', 
      //   coverAtv: 'img/clipper/icon6.PNG' 
      // },
      // { 
      //   id: 'iconRead', 
      //   onclick: '#', 
      //   coverAtv: 'img/clipper/icon7.PNG'
      // },
    ];
    }]);