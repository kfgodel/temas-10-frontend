/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'mostrador-de-minuta',
  'Integration: MostradorDeMinutaComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#mostrador-de-minuta}}
      //     template content
      //   {{/mostrador-de-minuta}}
      // `);

      this.render(hbs`{{mostrador-de-minuta}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
