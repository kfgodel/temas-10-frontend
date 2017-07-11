import Ember from 'ember';
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";
import MinutaServiceInjected from "../../mixins/minuta-service-injected";
import NavigatorInjected from "../../mixins/navigator-injected";

export default Ember.Route.extend(AuthenticatedRoute,MinutaServiceInjected,NavigatorInjected,{
  model: function (params) {
    var reunionId = params.reunion_id;

    return Ember.RSVP.hash({
      reunionId: reunionId,
      minuta:this.promiseWaitingFor(this.minutaService().getMinutaDeReunion(reunionId))
      .whenInterruptedAndReauthenticated(()=> {
        this.navigator().navigateToConclusiones(reunionId);
      }),
    }).then((model) => {
      return model;
    });
  }
});
