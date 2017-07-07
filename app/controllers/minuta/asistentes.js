import Ember from "ember";

export default Ember.Controller.extend({

  id: Ember.computed('model.reunionId', function () {
    debugger;
    return this.get('model.reunionId');
  })
});
