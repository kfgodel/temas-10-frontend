import Ember from 'ember';

export default Ember.Component.extend({
  tagName:"tr",
  classNameBindings: ["holitas"],
  holitas: Ember.computed('ultimoTema',function () {
    if(this.get('tema') === this.get('ultimoTema')) {
      return "ultimo-tema-stile";
    }
    return "";
  })
});
