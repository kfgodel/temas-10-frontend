import Ember from 'ember';

export default Ember.Controller.extend({

  minuta: Ember.computed('model.minuta', function () {
    return this.get('model.minuta');
  }),

  reunionId: Ember.computed('model.reunionId', function () {
    return this.get('model.reunionId');
  }),

  temasTratados: Ember.computed('minuta.temas', function () {
    return this.get('minuta.temas').filter(function (tema) {
      return tema.fueTratado;
    });
  }),

});
