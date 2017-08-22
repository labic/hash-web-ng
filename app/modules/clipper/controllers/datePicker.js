angular
    .module('hash.clipper',['ngMaterial', 'ngMessages']).controller('dater', function() {
  this.myDate = new Date();
  this.isOpen = false;
});