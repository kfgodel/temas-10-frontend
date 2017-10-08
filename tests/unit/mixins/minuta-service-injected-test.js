/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import MinutaServiceInjectedMixin from 'temas-10p-frontend/mixins/minuta-service-injected';

describe('MinutaServiceInjectedMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let MinutaServiceInjectedObject = Ember.Object.extend(MinutaServiceInjectedMixin);
    let subject = MinutaServiceInjectedObject.create();
    expect(subject).to.be.ok;
  });
});
