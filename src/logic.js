$(document).ready(function(){
  thermostat = new Thermostat
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

  $('#psm').on('click', function(){
    thermostat.togglePSM();
    refreshTemp();
    $('#psmStatus').text(getPSMStatus())
  })
})

refreshTemp = function(){
  $('h3').text(thermostat.currentTemperature())
}

getPSMStatus = function(){
  var status;
  if (thermostat.isPowerSavingModeOn()){
    status = 'On'
  } else {
    status = 'Off'
  }
  return status;
}
