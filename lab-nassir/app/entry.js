'use strict';

require('./scss/base.scss');

const cowsay = require('cowsay-browser');
const angular = require('angular');

const cowApp = angular.module('cowApp', []);

cowApp.controller('CowsayController', ['$log', '$scope', CowsayController]);

function CowsayController($log, $scope) {
  $log.debug('Init CowsayController');
  let cowsayCtrl = $scope.cowsayCtrl = {};

  cowsayCtrl.title = 'moo i am a cowsay server in the browser moo';
  cowsayCtrl.saveCowTitle = 'moo here is your previous cow moo';
  cowsayCtrl.cowArray = ['Save your cow!', 'Save your cow!'];

  cowsayCtrl.updateCow = function(input) {
    $log.debug('cowsayCtrl.updateCow');
    return '\n' + cowsay.say({text: input || 'Feed me text!'});
  };

  cowsayCtrl.saveCow = function(input) {
    $log.debug('cowsayCtrl.saveCow', cowsayCtrl.cowArray);
    return '\n' + cowsay.say({text: input || 'Save your cow!'});
  };

}
