'use strict';

require('./scss/base.scss');

const cowsay = require('cowsay-browser');
const angular = require('angular');

const cowApp = angular.module('cowApp', []);

cowApp.controller('CowsayController', ['$log', '$scope', CowsayController]);

function CowsayController($log, $scope) {
  $log.debug('Init CowsayController');
  let cowsayCtrl = $scope.cowsayCtrl = {};



  cowsayCtrl.title = 'I am a cowsay server in the browser moo';
  cowsayCtrl.saveCowTitle = 'Your saved cow appears below moo';
  cowsayCtrl.cowArray = ['Type in the Cowsay box!', 'Type in the Cowsay box!'];
  cowsayCtrl.typeArray = ['default', 'default'];
  cowsay.list((err, list) => {
    cowsayCtrl.cowList = list;
  });

  cowsayCtrl.updateCow = function(textInput, typeInput) {
    $log.debug('cowsayCtrl.updateCow');
    return '\n' + cowsay.say({text: textInput || 'Type in the Cowsay box!', f: typeInput});
  };

  cowsayCtrl.saveCow = function(textInput, typeInput) {
    $log.debug('cowsayCtrl.saveCow trigger. Current array: ', cowsayCtrl.cowArray.concat(cowsayCtrl.typeArray));
    return '\n' + cowsay.say({text: textInput || 'Save your cow!', f: typeInput || 'default'});
  };

}
