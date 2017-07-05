import Ember from 'ember';
import TemaGeneralServiceInjected from "../mixins/tema-general-service-injected";
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";
import UserServiceInjected from "../mixins/user-service-injected";

export default Ember.Route.extend(TemaGeneralServiceInjected, UserServiceInjected, AuthenticatedRoute, {
  model() {
    return Ember.RSVP.hash({
      temasGenerales: this.promiseWaitingFor(this.temasGeneralesService().getAllTemasGenerales())
        .whenInterruptedAndReauthenticated(()=> {
          this.navigator().navigateToTemasGenerales();
        })
        .then((temasGenerales)=> {
          return temasGenerales;
        }),
      usuarioActual: this.promiseWaitingFor(this.userService().getCurrentUser())
        .whenInterruptedAndReauthenticated(()=> {
          this.navigator().navigateToTemasGenerales();
        })
    }).then((model)=> {
      return model;
    });
  },
});
