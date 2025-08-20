// @ts-check
// MCP9808 driver for CHIRIMEN
// based from https://github.com/adafruit/Adafruit_MCP9808_Library/blob/master/Adafruit_MCP9808.cpp
// Programmed by Haruka Terai

const qrscaner_I2CADDR_DEFAULT= 0x18;        ///< I2C address
const qrscaner_REG_CONFIG= 0x01;             ///< MCP9808 config register
const qrscaner_REG_CONFIG_SHUTDOWN= 0x0100;  ///< shutdown config
const qrscaner_REG_AMBIENT_TEMP= 0x05;       ///< ambient temperature
const qrscaner_REG_RESOLUTION= 0x08;         ///< resolution
const WAKEUP_WAITING_TIME = 260;

class QRScaner{
    constructor(i2cPort,slaveAddress){
    this.i2cPort = i2cPort;
    this.i2cSlave = null;
    this.slaveAddress = slaveAddress;
  }

  async init() {
    this.i2cSlave = await this.i2cPort.open(this.slaveAddress);
    await this.write16(STM32F030_REG_CONFIG,0x0);
  }

  async scanData(){

  }


  void M5UnitQRCodeI2C::readBytes(uint8_t addr, uint16_t reg, uint8_t *buffer, uint16_t length) {
    uint8_t temp[];;

    temp[0] = (reg & 0x00ff);
    temp[1] = ((reg >> 8) & 0x00ff);

    _wire->beginTransmission(addr);
    _wire->write(temp[0]);
    _wire->write(temp[1]);
    _wire->endTransmission(false);
    _wire->requestFrom(addr, length);
    for (uint16_t i = 0; i < length; i++) {
        buffer[i] = _wire->read();
    }
}
  
  
  void M5UnitQRCodeI2C::setDecodeTrigger(bool en) {
  writeByes(_addr,UNIT_QRCODE_TRIGGER_REG,(uint8_t*)&encodeURI,1);
}
}



export default QRScaner;