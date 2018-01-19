describe('Thermostat', function(){
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat
  })

  it('starts at a temperature of 20 degrees', function(){
    expect(thermostat.currentTemperature()).toEqual(20)
  })

  it('starts with power saving mode on', function(){
    expect(thermostat._powerSavingMode).toEqual(true)
  })

  it('starts with a maximum temperature of 25 degrees', function(){
    expect(thermostat._maximumTemperature).toEqual(25)
  })

  describe('currentTemperature', function(){
    it('returns the temperature', function(){
      expect(thermostat.currentTemperature()).toEqual(20)
    })
  })

  describe("#up", function(){
    it('increases the temperature by 1', function(){
      thermostat.up()
      expect(thermostat.currentTemperature()).toBe(21)
    })

    it('has a maximum temperature of 25 when PSM is on', function(){
      for(let i =0;i<6;i++) {
        thermostat.up()
      }
      expect(thermostat.currentTemperature()).toBe(25)
    })

    it('has a maximum temperature of 32 when PSM is off', function(){
      thermostat.turnPowerSaveModeOff();
      for(let i=0;i<13;i++){
        thermostat.up()
      }
      expect(thermostat.currentTemperature()).toBe(32)
    })
  })

  describe('#down', function(){
    it('decreases the temperature by 1', function(){
      thermostat.down();
      expect(thermostat.currentTemperature()).toBe(19)
    })

    it('has a mimnimum temperature of 10 degrees', function(){
      for(let i=0; i<15; i++){
        thermostat.down();
      }
      expect(thermostat.currentTemperature()).toBe(10)
    })
  })

  describe('#turnPowerSaveModeOff', function(){
    it('sets PSM to false', function(){
      thermostat.turnPowerSaveModeOff();
      expect(thermostat.isPowerSavingModeOn()).toEqual(false)
    })
  })

  describe('#turnPowerSaveModeOn', function(){
    it('sets PSM to true', function(){
      thermostat.turnPowerSaveModeOn();
      expect(thermostat.isPowerSavingModeOn()).toEqual(true)
    })

    it('if temperature is above 25, reduces to the maximum temperature', function(){
      thermostat.turnPowerSaveModeOff();
      for(let i = 0; i<12; i++) {
        thermostat.up();
      }
      expect(thermostat.currentTemperature()).toEqual(32)
      thermostat.turnPowerSaveModeOn();
      expect(thermostat.currentTemperature()).toEqual(25)
    })
  })

  describe('#reset', function(){
    it('sets the temperature to 20', function(){
      for(let i= 0; i<5; i++){
        thermostat.down()
      }
      expect(thermostat.currentTemperature()).toEqual(15)
      thermostat.reset()
      expect(thermostat.currentTemperature()).toEqual(20)
    })
  })

  describe('#currentEnergyUsage', function(){
    it("returns 'low-usage' when the temperature is lower than 18 degrees", function(){
      for(let i = 0; i< 5; i++){
        thermostat.down();
      }
      expect(thermostat.currentEnergyUsage()).toEqual('low-usage')
    })

    it("returns 'medium-usage' when the temperature is lower than 25 degrees", function(){
      for(let i = 0; i< 3; i++){
        thermostat.up();
      }
      expect(thermostat.currentEnergyUsage()).toEqual('medium-usage')
    })

    it("returns 'high-usage' when the temperature is higher than 25 degrees", function(){
      for(let i = 0; i< 6; i++){
        thermostat.up();
      }
      expect(thermostat.currentEnergyUsage()).toEqual('high-usage')
    })
  })
})
