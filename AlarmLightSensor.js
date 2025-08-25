//  driver for the Alarm Light Sensor Unit
// Temperature and Humidity I2C Sensor
// Programmed by Satoru Takagi

class AlarmLightSensor {
  constructor(i2cPort, slaveAddress) {
    this.i2cPort = i2cPort;
    this.i2cSlave = null;
    this.slaveAddress = slaveAddress;
  }

  async init() {
    this.i2cSlave = await this.i2cPort.open(this.slaveAddress);
  }

  async readData() {
    await this.i2cSlave.writeByte(0xfd); // High repeatability measurement
    await sleep(10); // wait for measurement?
    var mdata = await this.i2cSlave.readBytes(6); // prev data..
    // cTemp MSB, cTemp LSB, cTemp CRC, Humididty MSB, Humidity LSB, Humidity CRC
    var cTemp = (175 * (mdata[0] * 256 + mdata[1])) / 65535.0 - 45; // celsius
    var humidity = (125 * (mdata[3] * 256 + mdata[4])) / 65535.0 - 6;
    return {
      humidity: humidity,
      temperature: cTemp,
    };
  }
}

export default larmLightSensor;
