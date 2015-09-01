/**
 * Unit tests for the helpersFactory
 * 
 * @param {String} The factory name
 */
describe('Factory: helpersFactory', function() {

  /**
   * Get app module before each
   */
  beforeEach(module('app'));

  /**
   * Cache some vars for global test usage
   */
  var factory;

  /**
   * beforeEach runs some stuff before each test. Returns nothing.
   * 
   * @param {Function} injects the controller and sets up the vm variable for
   *   use in all the tests.
   */
  beforeEach(inject(function(helpersFactory) {
    factory = helpersFactory;
  }));

  /**
   * Tests the basic definition and existence of the factory
   *
   * @param {String} the test name
   */
  describe('definition', function() {
    it('should be defined', function() {
      expect(factory).to.be.defined;
    });
  });

  /**
   * Tests the generateHash function
   *
   * @param {String} the test name
   */
  describe('generateHash', function() {
    it('should return a string', function() {
      expect(factory.generateHash()).to.be.a('string');
    });

    it('should return a string of length 10', function() {
      expect(factory.generateHash()).to.have.length(10);
    })
  });
  
});