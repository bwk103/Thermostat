
$(document).ready(function(){
  thermostat = new Thermostat
  // getWeather('London')
  refreshTemp()

  $('#up').on('click', function(){
    thermostat.up();
    refreshTemp();
  })

  $('#down').on('click', function(){
    thermostat.down();
    refreshTemp();
  })

  $('#reset').on('click', function(){
    thermostat.reset();
    refreshTemp();
  })

  $('#psm-toggle').on('click', function(){
    thermostat.togglePSM();
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

refreshTemp = function(){
  $('h3').text(thermostat.currentTemperature())
  var status = thermostat.currentEnergyUsage()
  $('#psm-status').attr('class', status);
  $('h3').attr('class', status)
  var color = $('h3').css('color');
  $('.line').css('background-color', color);
}

getPSMStatus = function(){
 return thermostat.isPowerSavingModeOn() ? 'on' : 'off'
}
