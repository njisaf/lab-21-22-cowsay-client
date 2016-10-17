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
  cowsayCtrl.typeArray = ['default', 'default'];
  cowsay.list((err, list) => {
    cowsayCtrl.cowList = list;
  });

  cowsayCtrl.updateCow = function(textInput, typeInput) {
    $log.debug('cowsayCtrl.updateCow');
    return '\n' + cowsay.say({text: textInput || 'Feed me text!', f: typeInput});
  };

  cowsayCtrl.saveCow = function(textInput, typeInput) {
    $log.debug('cowsayCtrl.saveCow trigger. Current array: ', cowsayCtrl.cowArray);
    return '\n' + cowsay.say({text: textInput || 'Save your cow!', f: typeInput});
  };

}
