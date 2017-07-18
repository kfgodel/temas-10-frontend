/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'edit-action-item',
  'Integration: EditActionItemComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#edit-action-item}}
      //     template content
      //   {{/edit-action-item}}
      // `);

      this.render(hbs`{{edit-action-item}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
