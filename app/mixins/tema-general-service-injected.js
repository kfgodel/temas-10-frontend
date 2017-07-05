import Ember from 'ember';

export default Ember.Mixin.create({
  _temasGeneralesService: Ember.inject.service('tema-general-service'),
  temasGeneralesService(){
    return this.get('_temasGeneralesService');
  },
});
