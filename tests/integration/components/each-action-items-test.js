/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'each-action-items',
  'Integration: EachActionItemsComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#each-action-items}}
      //     template content
      //   {{/each-action-items}}
      // `);

      this.render(hbs`{{each-action-items}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
