
$(document).ready(function(){
  thermostat = new Thermostat

  $.getJSON('http://localhost:9292/temperature', function(data){
    thermostat._temperature = parseInt(data.temperature);
    console.log('The API is returning....' +data.psm)
    thermostat._powerSavingMode = (data.psm === "true");
    console.log(thermostat)
    $('h3').text(thermostat.currentTemperature())
    $('#psm-status').text(getPSMStatus())
    addClasses();
  })

  $('#up').on('click', function(){
    thermostat.up();
    changeTemperature()
  })

  $('#down').on('click', function(){
    thermostat.down();
    changeTemperature()
  })

  $('#reset').on('click', function(){
    thermostat.reset();
    refreshTemp();
  })

  $('#psm-toggle').on('click', function(){
    thermostat.togglePSM();
    changeTemperature()
    refreshTemp();
    $('#psm-status').text(getPSMStatus())
  })

  $('input').keypress(function(e){
    if (e.which === 13) {
      city = $(this).val();
      getWeather(city);
    }
  })
})

getWeather = function(city){
  var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city;
  var token = "&APPID=9a15d8212a9f29d9bc9c45b05c480823";
  var units = "&units=metric";
  $.getJSON((url + token + units), function(res) {
    current_temperature = Math.round(parseInt(res.main.temp));
    $('#city').text(city);
    $('#weatherDescription').text(current_temperature)
  })
}

changeTemperature = function(){
  var url = 'http://localhost:9292/temperature';
  var data = {'temp': thermostat.currentTemperature().toString(),
              'psm': thermostat._powerSavingMode};
              console.log(data)
  $.post(url, data);
  refreshTemp();
}

refreshTemp = function(){
  $('h3').text(thermostat.currentTemperature())
  addClasses();
}

addClasses = function(){
  var status = thermostat.currentEnergyUsage()
  $('#psm-status').attr('class', status);
  $('h3').attr('class', status)
  var color = $('h3').css('color');
  $('.line').css('background-color', color);
}

getPSMStatus = function(){
 return thermostat.isPowerSavingModeOn() ? 'on' : 'off'
}
