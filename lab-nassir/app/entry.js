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

  cowsayCtrl.cowArray = ['', ''];
  cowsayCtrl.typeArray = ['', ''];

  cowsay.list((err, list) => {
    cowsayCtrl.cowList = list;
  });

  cowsayCtrl.updateCow = function(textInput, typeInput) {
    $log.debug('cowsayCtrl.updateCow');
    return '\n' + cowsay.say({text: textInput || 'Welcome to CowBrowser(tm)\nthe cutting edge in Cow-in-the-Cloud tech\nType in the Cowsay box above to replace this advert!', f: typeInput || 'default'});
  };

  cowsayCtrl.saveCow = function(textInput, typeInput) {
    $log.debug('cowsayCtrl.saveCow trigger. Current array: ', cowsayCtrl.cowArray.concat(cowsayCtrl.typeArray));
    return '\n' + cowsay.say({text: textInput || 'Revert to the previous cow by clicking the button\nUp to TWO cows can be saved at any one time!', f: typeInput || 'default'});
  };

  cowsayCtrl.saveButton = function() {
    cowsayCtrl.cowArray.reverse()[1] = cowsayCtrl.text;
    cowsayCtrl.typeArray.reverse()[1] = cowsayCtrl.cowType;
  };

  cowsayCtrl.revertButton = function() {
    cowsayCtrl.cowArray.push(cowsayCtrl.cowArray.shift());
    cowsayCtrl.typeArray.reverse();
  };

}
