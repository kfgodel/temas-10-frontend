import Ember from "ember";

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);
    $('select').material_select();
  },
  guardarHabilitado: Ember.computed('tema.duracion', 'tema.titulo','tema.actionItems', function () {
    if (!this.get('tema.duracion') || !this.get('tema.titulo') ) {
      return "disabled";
    }
    else {
      return "";
    }
  }),
});
