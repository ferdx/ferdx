/**
 * Unit tests for the HomeController
 * 
 * @param {String} The controller name
 */
describe('HomeController', function() {

  beforeEach(module('app'));

  var $controller;
  var vm;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
    vm = $controller('HomeController');
  }));
  
  describe('$scope.clickMe', function() {
    it('should change test from false to true', function() {
      vm.clickMe();
      expect(vm.test).to.be.true;
    });
  });
  
});