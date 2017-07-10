import Ember from "ember";

export default Ember.Controller.extend({

  id: Ember.computed('model.reunionId', function () {
    return this.get('model.reunionId');
  })
});
