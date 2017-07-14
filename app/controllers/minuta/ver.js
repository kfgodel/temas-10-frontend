import Ember from 'ember';

export default Ember.Controller.extend({

  minuta: Ember.computed('model.minuta', function () {
    return this.get('model.minuta');
  }),

  reunionId: Ember.computed('model.reunionId', function () {
    return this.get('model.reunionId');
  }),

});
