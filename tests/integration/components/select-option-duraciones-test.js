/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'select-option-duraciones',
  'Integration: SelectOptionDuracionesComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#select-option-duraciones}}
      //     template content
      //   {{/select-option-duraciones}}
      // `);

      this.render(hbs`{{select-option-duraciones}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
