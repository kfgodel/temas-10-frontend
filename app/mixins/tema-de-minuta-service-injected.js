import Ember from 'ember';

export default Ember.Mixin.create({
  _temaDeMinutaService: Ember.inject.service('temaDeMinuta-service'),
  temaDeMinutaService(){
    return this.get('_temaDeMinutaService');
  },
});
