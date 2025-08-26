//  driver for the Alarm Light Sensor Unit
// Temperature and Humidity I2C Sensor
// Programmed by Ryoma Aoki

const VCNL4010_COMMAND = 0x80;
const VCNL4010_PROXIMITYDATA = 0x87;
const VCNL4010_INTCONTROL = 0x89;
const VCNL4010_PROXRATE = 0x82;
const VCNL4010_INTSTAT = 0x8e;
const VCNL4010_IRLED = 0x83;
const VCNL4010_MEASUREPROXIMITY = 0x08;
const VCNL4010_PROXIMITYREADY = 0x20;
const VCNL4010_AMBIENTREADY = 0x40;

const vcnl4010_freq = {
  VCNL4010_1_95: 0, // 1.95     measurements/sec (Default)
  VCNL4010_3_90625: 1, // 3.90625  measurements/sec
  VCNL4010_7_8125: 2, // 7.8125   measurements/sec
  VCNL4010_16_625: 3, // 16.625   measurements/sec
  VCNL4010_31_25: 4, // 31.25    measurements/sec
  VCNL4010_62_5: 5, // 62.5     measurements/sec
  VCNL4010_125: 6, // 125      measurements/sec
  VCNL4010_250: 7, // 250      measurements/sec
};

class AlarmLightSensor {
  constructor(i2cPort, slaveAddress) {
    this.i2cPort = i2cPort;
    this.i2cSlave = null;
    this.slaveAddress = slaveAddress;
    this.freqConst = vcnl4010_freq;
  }

  async init() {
    this.i2cSlave = await this.i2cPort.open(this.slaveAddress);
    await this.setLEDcurrent(20);
    await this.setFrequency(this.freqConst.VCNL4010_16_625);
    await this.i2cSlave.write8(VCNL4010_INTCONTROL, 0x08);
  }

  async setLEDcurrent(current_10mA) {
    if (current_10mA > 20) current_10mA = 20;
    await this.i2cSlave.write8(VCNL4010_IRLED, current_10mA);
  }

  async getLEDcurrent() {
    return await this.i2cSlave.read8(VCNL4010_IRLED);
  }

  async setFrequency(freq) {
    await this.i2cSlave.write8(VCNL4010_PROXRATE, freq);
  }

  wait(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  async readProximity() {
    let i = await this.i2cSlave.read8(VCNL4010_INTSTAT);
    i &= ~0x80;
    await this.i2cSlave.write8(VCNL4010_INTSTAT, i);

    await this.i2cSlave.write8(VCNL4010_COMMAND, VCNL4010_MEASUREPROXIMITY);
    while (1) {
      // Serial.println(read8(VCNL4010_INTSTAT), HEX);
      let result = await this.i2cSlave.read8(VCNL4010_COMMAND);
      // Serial.print("Ready = 0x"); Serial.println(result, HEX);
      if (result & VCNL4010_PROXIMITYREADY) {
        return await this.i2cSlave.read16(VCNL4010_PROXIMITYDATA);
      }
      await this.wait(1000);
    }
  }
  async readAmbient() {
    let i = await this.i2cSlave.read8(VCNL4010_INTSTAT);
    i &= ~0x40;
    await this.i2cSlave.write8(VCNL4010_INTSTAT, i);

    await this.i2cSlave.write8(VCNL4010_COMMAND, VCNL4010_MEASUREPROXIMITY);
    while (1) {
      // Serial.println(read8(VCNL4010_INTSTAT), HEX);
      let result = await this.i2cSlave.read8(VCNL4010_COMMAND);
      // Serial.print("Ready = 0x"); Serial.println(result, HEX);
      if (result & VCNL4010_AMBIENTREADY) {
        return await this.i2cSlaveS.read16(VCNL4010_AMBIENTREADY);
      }
      await this.wait(1000);
    }
  }
}

export default AlarmLightSensor;
