import Ember from 'ember';

export default Ember.Component.extend({
  fueTratadoComputado: Ember.computed('temaDeMinuta.conclusion', function() {
    debugger;
    return !!this.get('temaDeMinuta.conclusion');
  }),
  fueTratado: Ember.computed('fueTratadoChequeado', 'temaDeMinuta.conclusion', function() {
    debugger;
    return !!(this.get('temaDeMinuta.conclusion')) || this.get('temaDeMinuta.conclusion');
  }),
});
