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

  function Farenheit(valor)
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
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i;
    valor     = valor.match(regexp);

    if (valor) {
      var numero = valor[1],
          tipo   = valor[2].toLowerCase();

      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          break;

        default:
          /* rellene este código */
      }
    }
    else
      elemento.innerHTML = "";
  };
})(this);
