/* team.controller.spec.js */
/* jshint expr: true */

/**
 * Unit tests for the TeamController
 * 
 * @param {String} The controller name
 */
describe('TeamController', function() {

  var $controller;
  var vm;

  // Load the app module, which contains the directive
  beforeEach(module('app'));

  // Store references to $controller and vm so they are available to all
  // tests in this describe block
  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names
    // when matching
    $controller = _$controller_;
    vm = $controller('TeamController');
  }));

  // Tests the basic definition and existence of the controller
  describe('definition', function() {
    it('should be defined', function() {
      expect(vm).to.be.defined;
    });
  });

  // Tests the team members
  describe('team members', function() {
    it('should exist', function() {
      expect(vm.teamMembers).to.be.defined;
    });

    it('should be an array', function() {
      expect(vm.teamMembers).to.be.instanceof(Array);
    });
  });
  
});