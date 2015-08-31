describe('HelloController', function() {

  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('$scope.hello', function() {
    it('should = hello', function() {
      var vm = $controller('HelloController');
    });
  });
  
});