var Thermostat = function() {
  this._minimumTemperature = 10;
  this._maximumTemperature = 25;
  this._temperature = 20;
  this._powerSavingMode = true;
}

Thermostat.prototype.currentTemperature = function(){
  return this._temperature
}

Thermostat.prototype.up = function(){
  this._temperature += 1;
  if (this.currentTemperature() > this._maximumTemperature) {
    this._temperature = this._maximumTemperature
  }
}

Thermostat.prototype.down = function(){
  this._temperature -= 1;
  if (this.currentTemperature() < this._minimumTemperature) {
    this._temperature = this._minimumTemperature;
  }
}

Thermostat.prototype.isPowerSavingModeOn = function(){
  return this._powerSavingMode
}

Thermostat.prototype.turnPowerSaveModeOff = function(){
  this._maximumTemperature = 32;
  return this._powerSavingMode = false;
}

Thermostat.prototype.turnPowerSaveModeOn = function(){
  this._maximumTemperature = 25;
  if (this.currentTemperature() > this._maximumTemperature) {
    this._temperature = this._maximumTemperature
  }
  return this._powerSavingMode = true;
}

Thermostat.prototype.reset = function(){
  this._temperature = 20;
}

Thermostat.prototype.currentEnergyUsage = function(){
  if (this.currentTemperature() < 18) {
    return 'low-usage'
  } else if (this.currentTemperature() < 25) {
    return 'medium-usage'
  } else {
    return 'high-usage'
  }
}
