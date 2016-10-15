import Ember from "ember";
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";
import NavigatorInjected from "../../mixins/navigator-injected";
import ReunionServiceInjected from "../../mixins/reunion-service-injected";

export default Ember.Route.extend(AuthenticatedRoute, ReunionServiceInjected, NavigatorInjected, {
  model() {
    return this.promiseWaitingFor(this.reunionService().getAllReuniones())
      .whenInterruptedAndReauthenticated(()=> {
        this.navigator().navigateToReuniones();
      });
  },

});
