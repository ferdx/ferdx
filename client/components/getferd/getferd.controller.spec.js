/**
 * Unit tests for the GetFerdController
 * 
 * @param {String} The controller name
 */
describe('GetFerdController', function() {

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
    vm = $controller('GetFerdController');
  }));

  /**
   * Tests the basic definition and existence of the controller
   *
   * @param {String} the test name
   */
  describe('definition', function() {
    it('should be defined', function() {
      expect(vm).to.be.defined;
    });
  });

  /**
   * Testing the query string
   *
   * @param {String} the test name
   */
  describe('query string empty', function() {
    it('should be empty on first page load', function() {
      expect(vm.queryString).to.be.empty;
    });

    describe('query string full', function() {
      beforeEach(function() {
        vm.queryString = {code: 'abc', state: 'abc'};
      });

      it('should not be empty', function() {
        expect(vm.queryString).to.not.be.empty;
      });

      it('should call oauthAccess', function() {
        expect(vm.oauthAccess).to.have.been.called;
      });
    });
  });
  
});