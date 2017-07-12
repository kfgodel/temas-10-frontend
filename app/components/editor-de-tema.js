import Ember from "ember";

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);
    $('select').material_select();
  },
  saraza:Ember.computed('tema.duracion', function () {
    debugger;
    return 32;
  }),

});
