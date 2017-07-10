import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    var reunionId = params.reunion_id;

    return Ember.RSVP.hash({
      reunionId: reunionId
    }).then((model)=> {
      return model;
    });
  }
});
