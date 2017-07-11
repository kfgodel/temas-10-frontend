/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import TemaGeneralServiceInjectedMixin from 'temas-10p-frontend/mixins/tema-general-service-injected';

describe('TemaGeneralServiceInjectedMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let TemaGeneralServiceInjectedObject = Ember.Object.extend(TemaGeneralServiceInjectedMixin);
    let subject = TemaGeneralServiceInjectedObject.create();
    expect(subject).to.be.ok;
  });
});
