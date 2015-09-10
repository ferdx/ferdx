/**
 * The marketplace controller. 
 */
(function() {

  'use strict';

  /**
   * Require the base level module and controller
   */
  angular
    .module('app')
    .controller('MarketplaceController', MarketplaceController);

  /**
   * MarketplaceController is where all the actual controller functionality resides.
   */
  function MarketplaceController() {
    var vm = this;

    // TODO: Actually make this dynamic
    vm.modules = [
      {
        name: 'yo',
        title: 'Yo!',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem temporibus natus tenetur veniam saepe necessitatibus accusamus.',
        created_at: 'September 7th, 2015'
      },
      {
        name: 'bart',
        title: 'Bart',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem temporibus natus tenetur veniam saepe necessitatibus accusamus.',
        created_at: 'September 7th, 2015'
      },
      {
        name: 'eliza',
        title: 'Eliza',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem temporibus natus tenetur veniam saepe necessitatibus accusamus.',
        created_at: 'September 7th, 2015'
      },
      {
        name: 'directions',
        title: 'Directions',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem temporibus natus tenetur veniam saepe necessitatibus accusamus.',
        created_at: 'September 7th, 2015'
      },
      {
        name: 'moo',
        title: 'Moo',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem temporibus natus tenetur veniam saepe necessitatibus accusamus.',
        created_at: 'September 7th, 2015'
      },
      {
        name: 'schedule',
        title: 'Schedule',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem temporibus natus tenetur veniam saepe necessitatibus accusamus.',
        created_at: 'September 7th, 2015'
      },
      {
        name: 'burrito',
        title: 'Burrito',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem temporibus natus tenetur veniam saepe necessitatibus accusamus.',
        created_at: 'September 7th, 2015'
      },
      {
        name: 'trinidad',
        title: 'Trinidad',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem temporibus natus tenetur veniam saepe necessitatibus accusamus.',
        created_at: 'September 7th, 2015'
      }
    ];
  }

})();