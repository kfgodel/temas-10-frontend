import Ember from "ember";
import Application from "../concepts/application";

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['indigo'],
  application: Application.create(),
});
