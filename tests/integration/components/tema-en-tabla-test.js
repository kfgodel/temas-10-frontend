/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'tema-en-tabla',
  'Integration: TemaEnTablaComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#tema-en-tabla}}
      //     template content
      //   {{/tema-en-tabla}}
      // `);

      this.render(hbs`{{tema-en-tabla}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
