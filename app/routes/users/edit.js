import Ember from "ember";
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";
import UserServiceInjected from "../../mixins/user-service-injected";

export default Ember.Route.extend(AuthenticatedRoute, UserServiceInjected, {
  model: function (params) {
    var userId = params.user_id;

    return this.promiseWaitingFor(this.userService().getUser(userId))
      .whenInterruptedAndReauthenticated(()=> {
        this.navigator().navigateToUsersEdit(userId);
      });
  },
});
