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
        blurb: 'From Trinidad &amp; Tobago - a small island with a big personality. Loves surfing and the joys of discovering art and food. Active writer on his blog <a href="http://callmenick.com" target="_blank">callmenick.com</a>, is an <a href="https://www.linkedin.com/in/nicksalloum" target="_blank">ambitious software engineer</a>, and has fun <a href="https://github.com/callmenick" target="_blank">building stuff with code.</a>',
        pic: 'nick.jpg'
      },
      {
        name: 'Timothy Quach',
        blurb: 'Thought about monads and ended up with <a href="https://github.com/ferdx/ferd" target="_blank">Ferd</a>. Currently learning Functional Reactive programming after writing stateful code for years. Secretly has a <a href="http://timothyquach.me/" target="_blank">blog</a>. Can be found on <a href="https://github.com/timothyquach" target="_blank">GitHub</a> and <a href="https://www.linkedin.com/in/timothyquach" target="_blank">LinkedIn</a>.',
        pic: 'tim.jpg'
      },
      {
        name: 'Andrew Kishino',
        blurb: 'Enjoys cycling and water sports. Stoked about cryptocurrencies and blockchain technologies. Blogs at <a href="http://andrewkishino.me" target="_blank">andrewkishino.me</a>, and can be found on <a href="https://github.com/AndrewKishino" target="_blank">Github</a> and <a href="https://www.linkedin.com/in/andrewkishino" target="_blank">LinkedIn</a>.',
        pic: 'andrew.jpg'
      },
      {
        name: 'David Rosson',
        blurb: 'Software <a href="https://www.linkedin.com/in/derosson" target="_blank">engineer</a> by profession, <a href="http://dave-the-linguist.tumblr.com" target="_blank">linguist</a> by training, looking to <a href="https://www.facebook.com/taavi.rosson" target="_blank">make friends</a>. Interested in linguistics, cognitive science, AI, futurology, city planning, design, and puppies.',
        pic: 'david.jpg'
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
