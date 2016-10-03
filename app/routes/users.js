import Ember from "ember";
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";
import UserServiceInjected from "../mixins/user-service-injected";


export default Ember.Route.extend(AuthenticatedRoute, UserServiceInjected, {
  model: function () {
    return this.promiseWaitingFor(this.userService().getAllUsers())
      .whenInterruptedAndReauthenticated(()=> {
        this.navigator().navigateToUsers();
      });
  },
  // PRIVATE
});
