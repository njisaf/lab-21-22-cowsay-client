'use strict';

require('./lib/test-setup');

const cowsay = require('cowsay-browser');
const angular = require('angular');

describe('Testing cowsay controller, aka cowsayCtrl', function() {
  beforeEach(() => {
    angular.mock.module('cowApp');
    angular.mock.inject($controller => {
      this.cowsayCtrl = new $controller('CowsayController');
    });
  });

  describe('Testing default values', () => {
    it('cowsayCtrl.title should have a message', () => {
      expect(this.cowsayCtrl.title).toBe('I am a cowsay server in the browser moo');
    });

    it('cowsayCtrl.saveCowTitle should have a message', () => {
      expect(this.cowsayCtrl.saveCowTitle).toBe('Your saved cow appears below moo');
    });

    it('cowsayCtrl.cowArray and typeArray should have two empty strings', () => {
      expect(this.cowsayCtrl.cowArray.length).toBe(2);
      expect(this.cowsayCtrl.typeArray.length).toBe(2);
      expect(this.cowsayCtrl.cowArray[0]).toBe('');
      expect(this.cowsayCtrl.typeArray[0]).toBe('');
      expect(this.cowsayCtrl.cowArray[1]).toBe('');
      expect(this.cowsayCtrl.typeArray[1]).toBe('');
    });

    it('cowsayCtrl.cowList should be same as cowsay.list', () => {
      cowsay.list((err, list) => {
        expect(this.cowsayCtrl.cowList).toEqual(list);
      });
    });
  });

  describe('Testing #cowsayCtrl.updateCow()', () => {
    it('Should return a dragon burning a cow and saying, dinner at last. the cow says ack by default', () => {
      let expectedResult = '\n' + cowsay.say({text: 'dinner at last', f: 'dragon-and-cow'});
      let result = this.cowsayCtrl.updateCow('dinner at last', 'dragon-and-cow');
      expect(result).toEqual(expectedResult);
    });

    it('Should not return a dragon burning a cow', () => {
      let satiatedDragon = '\n' + cowsay.say({text: 'dinner at last', f: 'dragon-and-cow'});
      let unsatiatedDragon = this.cowsayCtrl.updateCow('god i am hungry', 'dragon');
      expect(unsatiatedDragon).not.toEqual(satiatedDragon);
    });
  });

  describe('Testing #cowsayCtrl.saveCow()', () => {
    it('Should return values at index[1] of two arrays', () => {
      this.cowsayCtrl.text = 'i looooOOOooove you ren';
      this.cowsayCtrl.cowType = 'stimpy';
      this.cowsayCtrl.saveCow();
      expect(this.cowsayCtrl.cowArray[1]).toBe('i looooOOOooove you ren');
      expect(this.cowsayCtrl.typeArray[1]).toBe('stimpy');
    });

    it('Should return values at index[1] of two arrays after two saves', () => {
      this.cowsayCtrl.text = 'i looooOOOooove you ren';
      this.cowsayCtrl.cowType = 'stimpy';
      this.cowsayCtrl.saveCow();
      this.cowsayCtrl.text = 'i weel keeeeel you stimpy!!';
      this.cowsayCtrl.cowType = 'ren';
      this.cowsayCtrl.saveCow();
      expect(this.cowsayCtrl.cowArray[1]).toBe('i weel keeeeel you stimpy!!');
      expect(this.cowsayCtrl.typeArray[1]).toBe('ren');
    });
  });

  describe('Testing #cowsayCtrl.revertButton()', () => {
    it('Should return the first pair of values after a revert', () => {
      this.cowsayCtrl.text = 'i looooOOOooove you ren';
      this.cowsayCtrl.cowType = 'stimpy';
      this.cowsayCtrl.saveCow();
      this.cowsayCtrl.text = 'i weel keeeeel you stimpy!!';
      this.cowsayCtrl.cowType = 'ren';
      this.cowsayCtrl.saveCow();
      this.cowsayCtrl.revertButton();
      expect(this.cowsayCtrl.cowArray[1]).toBe('i looooOOOooove you ren');
      expect(this.cowsayCtrl.typeArray[1]).toBe('stimpy');
    });
  });
});
