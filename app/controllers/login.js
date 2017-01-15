import Ember from "ember";
import AuthenticatorInjected from "ateam-ember-authenticator/mixins/authenticator-injected";
import Application from "../concepts/application";

export default Ember.Controller.extend(AuthenticatorInjected, {
  application: Application.create(),
  queryParams: ['failed'],

  actions: {
    logIn: function () {
      window.location.replace('https://backoffice.10pines.com/auth/sign_in?app_id=temas-roots&redirect_url=' + window.location.origin + '/j_security_check');
      // this.requestLogin();
    }
  }

});
