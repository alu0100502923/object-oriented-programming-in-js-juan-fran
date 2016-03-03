(function(exports) {
  "use strict";

  function Medida(valor,tipo)
  {
    var value = valor;
    var tipo = tipo;

    this.getValue = function() {
      return value;
    };
    this.getTipo = function() {
      return tipo;
    }
  }

  function Temperatura(valor, tipo) {
    Medida.call(this, valor, tipo);

    this.toCelsius = function() {
      var result;
      var tipo = this.getTipo().toLowerCase();
      if ("fahrenheit".match(tipo))
        result = (this.getValue() - 32) * 5 / 9;
      else if ("kelvin".match(tipo))
        result = this.getValue() - 273.15;
      else
        result = this.getValue();
      return result;
    };
    this.toFahrenheit = function() {
      var result;
      var tipo = this.getTipo().toLowerCase();
      if ("celsius".match(tipo))
        result = (this.getValue() * 9 / 5) + 32;
      else if ("kelvin".match(tipo))
        result = (this.getValue() * 9 / 5) - 459.67;
      else
        result = this.getValue();
      return result;
    };
    this.toKelvin = function() {
      var result;
      var tipo = this.getTipo().toLowerCase();
      if ("celsius".match(tipo))
        result = this.getValue() + 273.15;
      else if ("fahrenheit".match(tipo))
        result = (this.getValue() + 459.67) * 5 / 9;
      else
        result = this.getValue();
      return result;
    };
  }

  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;

  function Celsius(valor)
  {
    Temperatura.call(this, valor, "Celsius");
  }

  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;

  function Fahrenheit(valor)
  {
    Temperatura.call(this, valor, "Fahrenheit");
  }

  Fahrenheit.prototype = new Temperatura();
  Fahrenheit.prototype.constructor = Fahrenheit;

  function Kelvin(valor) {
      Temperatura.call(this, valor, "Kelvin");
    }

    Kelvin.prototype = new Temperatura();
    Kelvin.prototype.constructor = Kelvin;


  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Fahrenheit = Fahrenheit;
  exports.Kelvin = Kelvin;

  exports.convertir = function() {
   var valor = document.getElementById('convert').value,
     elemento = document.getElementById('converted'),
     tipos_aceptados = ["c", "f", "k"],
     regexp = XRegExp(
       '(?<numero>    [+-]?\\d+(\\.\\d+)?([e][+-]?\\d+)?[ ]*)\
        (?<tipo>      [a-z]+)[ ]+(?:to[ ]+)?\
        (?<tipo2> [a-z]+)[ ]*$', 'xi'),
     valor = XRegExp.exec(valor, regexp);

   if (valor) {
     var numero = valor.numero.replace(/\s+/g, ''),
       tipo = valor.tipo.toLowerCase(),
       tipo2 = valor.tipo2.toLowerCase();

     if (tipos_aceptados.indexOf(tipo) > -1 && tipos_aceptados.indexOf(tipo2) > -1) {
       elemento.style.color = "rgb(17, 5, 169)";
       console.log("Valor: " + numero + ", Tipo: " + tipo + ", Nuevo: " + tipo2);
       numero = parseFloat(numero);
       var inicial;
       switch (tipo) {
         case 'c':
           inicial = new Celsius(numero);
           break;
         case 'f':
           inicial = new Fahrenheit(numero);
           break;
         case 'k':
           inicial = new Kelvin(numero);
           break;
         default:
           console.log("No hay asignado un case para este valor");
           break;
       }

       switch (tipo2) {
         case 'c':
           elemento.innerHTML = inicial.toCelsius().toFixed(2) + " Celsius";
           break;
         case 'f':
           elemento.innerHTML = inicial.toFahrenheit().toFixed(2) + " Fahrenheit";
           break;
         case 'k':
           elemento.innerHTML = inicial.toKelvin().toFixed(2) + " Kelvin";
           break;
         default:
           console.log("No hay asignado un case para este valor");
           break;
       }
     } else {
       elemento.style.color = "rgb(138, 0, 0)";
       elemento.innerHTML = "ERROR. Introduzca por ejemplo -32.5e10f to K";
     }
   } else {
     elemento.style.color = "rgb(138, 0, 0)";
     elemento.innerHTML = "ERROR. Introduzca por ejemplo -32.5e10f to K";
   }
 }
})(this);
