/* footer.directive.spec.js */
/* jshint expr: true */

/**
 * Unit tests for the footerDirective
 * 
 * @param {String} The directive name
 */
describe('footerDirective', function() {

  var $compile;
  var $rootScope;
  var element;

  // Load the app module, which contains the directive
  beforeEach(module('app'));

  // Store references to $rootScope and $compile so they are available to all
  // tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names
    // when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  // Compile a piece of HTML containing the directive
  beforeEach(function() {
    element = $compile("<footer-directive></footer-directive>")($rootScope);
  });

  // Tests the basic definition and existence of the directive
  describe('definition', function() {
    it('should be defined', function() {
      expect(element).to.be.defined;
    });
  });
  
});