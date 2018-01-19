describe('Feature Tests', function(){

  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat
  })

  it('Thermostat starts with a temperature of 20 degrees', function(){
    expect(thermostat.currentTemperature()).toEqual(20)
  })

  it('The temperature can be increased', function(){
    thermostat.up()
    expect(thermostat.currentTemperature()).toEqual(21)
  })

  it('The temperature can be decreased', function(){
    thermostat.down()
    expect(thermostat.currentTemperature()).toEqual(19)
  })

  it('The minimum temperature is ten degrees', function(){
    for(let i = 0; i < 15; i++) {
      thermostat.down();
    };
    expect(thermostat.currentTemperature()).toEqual(10)
  })

  it('power saving mode is on by default', function(){
    expect(thermostat.isPowerSavingModeOn()).toEqual(true)
  });

  it('the maximum temperature is 25 degrees when power saving mode is on', function(){
    expect(thermostat._maximumTemperature).toEqual(25)
  })

  it('the maximum temperature is 32 degrees when power saving mode is not on', function(){
    thermostat.turnPowerSaveModeOff();
    expect(thermostat._maximumTemperature).toEqual(32)
  })

  it('the reset function sets the temperature to 20', function(){
    thermostat.reset()
    expect(thermostat.currentTemperature()).toEqual(20)
  })

  it('confirms whether the current energy usage is low', function(){
    for(let i = 0; i<5; i++){
      thermostat.down();
    }
    expect(thermostat.currentEnergyUsage()).toEqual('low-usage')
  })

  it('confirms whether the current energy usage is medium', function(){
    for(let i = 0; i<3; i++){
      thermostat.up();
    }
    expect(thermostat.currentEnergyUsage()).toEqual('medium-usage')
  })

  it('confirms whether the current energy usage is high', function(){
    for(let i = 0; i<6; i++){
      thermostat.up();
    }
    expect(thermostat.currentEnergyUsage()).toEqual('high-usage')
  })
})
