import Ember from 'ember';

export default Ember.Component.extend({

  fueTratado: Ember.computed('temaDeMinuta.conclusion', function() {
    return !!this.get('temaDeMinuta.conclusion');
  }),

});
