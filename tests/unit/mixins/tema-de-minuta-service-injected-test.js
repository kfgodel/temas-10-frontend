/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import TemaDeMinutaServiceInjectedMixin from 'temas-10p-frontend/mixins/tema-de-minuta-service-injected';

describe('TemaDeMinutaServiceInjectedMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let TemaDeMinutaServiceInjectedObject = Ember.Object.extend(TemaDeMinutaServiceInjectedMixin);
    let subject = TemaDeMinutaServiceInjectedObject.create();
    expect(subject).to.be.ok;
  });
});
