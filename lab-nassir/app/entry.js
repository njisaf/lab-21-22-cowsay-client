'use strict';

require('./scss/base.scss');

const cowsay = require('cowsay-browser');
const angular = require('angular');

const cowApp = angular.module('cowApp', []);
cowApp.controller('CowsayController', ['$log', CowsayController]);

function CowsayController($log) {
  $log.debug('Init CowsayController');

  this.title = 'I am a cowsay server in the browser moo';
  this.saveCowTitle = 'Your saved cow appears below moo';

  this.cowArray = ['', ''];
  this.typeArray = ['', ''];

  cowsay.list((err, list) => {
    this.cowList = list;
  });

  this.updateCow = function(textInput, typeInput) {
    $log.debug('this.updateCow. Current array: ', this.cowArray.concat(this.typeArray));
    return '\n' + cowsay.say({text: textInput || 'Welcome to CowBrowser(tm)\nthe cutting edge in Cow-in-the-Cloud tech\nType in the Cowsay box above to replace this advert!', f: typeInput || 'default'});
  };

  this.saveCow = function() {
    $log.debug('this.saveCow trigger. Current array: ', this.cowArray.concat(this.typeArray));
    this.cowArray.reverse()[1] = this.text;
    this.typeArray.reverse()[1] = this.cowType;
  };

  this.revertButton = function() {
    $log.debug('this.revertButton. Current array: ', this.cowArray.concat(this.typeArray));
    this.cowArray.push(this.cowArray.shift());
    this.typeArray.push(this.typeArray.shift());
  };

}
