import Ember from 'ember';

export default Ember.Mixin.create({
  _minutaService: Ember.inject.service('minuta-service'),
  minutaService(){
    return this.get('_minutaService');
  },
});
