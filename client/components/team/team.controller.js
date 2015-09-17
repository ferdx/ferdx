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
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus corrupti beatae consectetur facilis.\
        Find me on <a href="https://github.com/callmenick" target="_blank">GitHub</a>, or my blog,\
        <a href="http://callmenick.com" target="_blank">callmenick.com.</a>',
        pic: 'nick.png'
      },
      {
        name: 'Timothy Quach',
        blurb: 'Thought about monads and ended up with <a href="https://github.com/ferdx/ferd" target="_blank">Ferd</a>.\
        Currently learning Functional Reactive programming after writing stateful code for years.\
        Secretly has a <a href="http://timothyquach.me/" target="_blank">blog</a>.\
        Can be found on <a href="https://github.com/timothyquach" target="_blank">GitHub</a> and\
        <a href="https://www.linkedin.com/in/timothyquach" target="_blank">LinkedIn</a>.',
        pic: 'tim.png'
      },
      {
        name: 'Andrew Kishino',
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\
        Perferendis qui natus ducimus nesciunt molestiae in esse adipisci odio ipsam veniam, nulla unde at accusantium laboriosam.',
        pic: 'andrew.png'
      },
      {
        name: 'David Rosson',
        blurb: 'Software <a href="linkedin.com/in/derosson" target="_blank">engineer</a> by profession,\
        <a href="http://dave-the-linguist.tumblr.com" target="_blank">linguist</a> by training, looking to\
        <a href="https://www.facebook.com/taavi.rosson" target="_blank">make friends</a>. Interested in linguistics,\
        cognitive science, AI, futurology, city planning, design, and puppies.',
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
