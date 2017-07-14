import Ember from 'ember';

export default Ember.Component.extend({
  fueTratadoComputado: Ember.computed('temaDeMinuta.conclusion', function() {
    return !!this.get('temaDeMinuta.conclusion');
  }),
  fueTratado: Ember.computed('fueTratadoChequeado', 'temaDeMinuta.conclusion', function() {
    return !!(this.get('temaDeMinuta.conclusion')) || this.get('temaDeMinuta.conclusion');
  }),
});
