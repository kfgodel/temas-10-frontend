import Ember from 'ember';
import MinutaServiceInjected from "../../mixins/minuta-service-injected";
import NavigatorInjected from "../../mixins/navigator-injected";
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";

export default Ember.Route.extend(MinutaServiceInjected, NavigatorInjected, AuthenticatedRoute, {
  model: function (params) {
    var reunionId = params.reunion_id;

    return Ember.RSVP.hash({
      reunionId: reunionId,
      minuta: this.promiseWaitingFor(this.minutaService().getMinutaDeReunion(reunionId))
        .whenInterruptedAndReauthenticated(()=> {
          this.navigator().navigateToAsistentesMinuta(reunionId);
        }),
    }).then((model)=> {
      return model;
    });
  }
});
