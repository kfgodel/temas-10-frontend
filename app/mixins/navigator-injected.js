import Ember from "ember";

/**
 * Adds the navigator as an internal collaborator
 */
export default Ember.Mixin.create({
  _navigatorService: Ember.inject.service('navigator'),
  navigator(){
    return this.get('_navigatorService');
  },
});