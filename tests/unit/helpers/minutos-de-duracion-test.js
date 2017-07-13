/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import {
  minutosDeDuracion
} from 'temas-10p-frontend/helpers/minutos-de-duracion';

describe('MinutosDeDuracionHelper', function() {
  // Replace this with your real tests.
  it('works', function() {
    let result = minutosDeDuracion(42);
    expect(result).to.be.ok;
  });
});
