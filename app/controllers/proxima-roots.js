import Ember from "ember";

export default Ember.Controller.extend({

  temasPropuestos: Ember.A([
    Ember.Object.create({
      autor: 'autor 1',
      titulo: 'Tema 1',
      descripcion: 'Este es el tema 1 como habiamos dicho',
      cantidadVotosTotales: 4,
      cantidadVotosPropios: 2,
    }),
    Ember.Object.create({
      autor: 'autor 2',
      titulo: 'Tema 2',
      descripcion: 'Este es el tema 1 como habiamos dicho',
      cantidadVotosTotales: 1,
      cantidadVotosPropios: 1,
    }),
    Ember.Object.create({
      autor: 'autor 3',
      titulo: 'Tema 3',
      descripcion: 'Este es el tema 1 como habiamos dicho',
      cantidadVotosTotales: 6,
      cantidadVotosPropios: 0,
    }),
    Ember.Object.create({
      autor: 'autor 4',
      titulo: 'Tema 4',
      descripcion: 'Este es el tema 1 como habiamos dicho',
      cantidadVotosTotales: 6,
      cantidadVotosPropios: 0,
    }),
  ]),

  actions: {
    sumarVoto(tema){
      tema.incrementProperty('cantidadVotosTotales');
      tema.incrementProperty('cantidadVotosPropios');
    },
    restarVoto(tema){
      tema.decrementProperty('cantidadVotosTotales');
      tema.decrementProperty('cantidadVotosPropios');
    }
  }


});