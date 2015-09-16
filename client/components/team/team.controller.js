/* team.controller.js */
(function() {

  'use strict';

  angular
    .module('app')
    .controller('TeamController', TeamController);

  /**
   * TeamController
   *
   * @description [description]
   * @param {[type]} 
   * @param {[type]} 
   */
  function TeamController(authFactory, botFactory) {
    
    var vm = this;

    vm.teamMembers = [
      {
        name: 'Nick Salloum',
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus corrupti beatae consectetur facilis. Find me on <a href="https://github.com/callmenick" target="_blank">GitHub</a>, or my blog, <a href="http://callmenick.com" target="_blank">callmenick.com.</a>',
        pic: 'nick.png'
      },
      {
        name: 'Timothy Quach',
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis qui natus ducimus nesciunt molestiae in esse adipisci odio ipsam veniam, nulla unde at accusantium laboriosam.',
        pic: 'tim.png'
      },
      {
        name: 'Andrew Kishino',
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis qui natus ducimus nesciunt molestiae in esse adipisci odio ipsam veniam, nulla unde at accusantium laboriosam.',
        pic: 'andrew.png'
      },
      {
        name: 'David Rosson',
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis qui natus ducimus nesciunt molestiae in esse adipisci odio ipsam veniam, nulla unde at accusantium laboriosam.',
        pic: 'david.png'
      }
    ];

    activate();

    /**
     * activate
     *
     * @description [description]
     * @return {[type]}
     */
    function activate() {
    }
    
  }

})();