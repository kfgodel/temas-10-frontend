/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import {
  separarConComas
} from 'temas-10p-frontend/helpers/separar-con-comas';

describe('SepararConComasHelper', function() {
  // Replace this with your real tests.
  it('works', function() {
    let result = separarConComas(42);
    expect(result).to.be.ok;
  });
});
