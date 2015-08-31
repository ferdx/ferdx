/**
 * Unit tests for the MarketplaceController
 * 
 * @param {String} The controller name
 */
describe('MarketplaceController', function() {

  /**
   * Get app module before each
   */
  beforeEach(module('app'));

  /**
   * Cache some vars for global test usage
   */
  var $controller;
  var vm;

  /**
   * beforeEach runs some stuff before each test. Returns nothing.
   * 
   * @param {Function} injects the controller and sets up the vm variable for
   *   use in all the tests.
   */
  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
    vm = $controller('MarketplaceController');
  }));

  /**
   * An empty test. Returns nothing.
   * 
   * @param {String} the test name
   */
  describe('empty test', function() {
    it('should do something', function() {

    });
  });
  
});