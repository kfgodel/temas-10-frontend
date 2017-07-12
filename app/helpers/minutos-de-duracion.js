import Ember from 'ember';

export function minutosDeDuracion(params/*, hash*/) {

  var nombre=params[0];
  var duraciones=params[1];
  return '('+ duraciones.find((duracion)=>{
    return duracion.nombre===nombre;
  }).cantidadDeMinutos + ' minutos)';
}

export default Ember.Helper.helper(minutosDeDuracion);
