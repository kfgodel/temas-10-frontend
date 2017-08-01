import Ember from 'ember';

export default Ember.Component.extend({

  texto: Ember.computed('minuta', function (){
    let tab = "    ";
    let enter = "\n";
    let minuta = this.get('minuta');
    let txt = "";
    let fecha = "Fecha: " + minuta.fecha + enter;
    let minuteador = "Minuteador: " + minuta.minuteador + enter;

    let asistentes = "Vinieron:" + enter;
    minuta.asistentes.forEach(function(asistente){
      asistentes += tab + asistente.name + enter;
    });

    let temasPropuestos = "Temas propuestos:" + enter;
    minuta.temas.forEach(function(tema){
      temasPropuestos += tab + tema.tema.titulo + enter;
    });

    let temasTratados = "Detalle de los temas hablados:" + enter;
    let temaTratado = "";
    minuta.temas.forEach(function(tema){
      temaTratado = tab + tema.tema.titulo + enter;
      temaTratado += tab + tab + "Conclusion:" + enter;
      temaTratado += tab + tab + tab + tema.conclusion + enter;
      temaTratado += tab + tab + "Action Items:" + enter;

      tema.actionItems.forEach(function(actionItem){
        temaTratado += tab + tab + tab + actionItem.descripcion + enter;
        temaTratado += tab + tab + tab + "Responsables:" + enter;

        actionItem.responsables.forEach(function(responsable){
          temaTratado += tab + tab + tab + tab + responsable.name + enter;
        });
      });

      temasTratados += temaTratado;
    });

    return fecha + minuteador + asistentes + temasPropuestos + temasTratados;
  })

});
