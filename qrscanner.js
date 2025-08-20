// @ts-check
// Driver for the QR Code Scanner Unit
// based from https://github.com/m5stack/M5Unit-QRCode/blob/main/src/M5UnitQRCodeI2C.cpp
// Programmed by Ryoma Aoki

const qrscanner_I2CADDR_DEFAULT= 0x18;        ///< I2C address
const qrscanner_REG_CONFIG= 0x01;             ///< MCP9808 config register
const qrscanner_REG_CONFIG_SHUTDOWN= 0x0100;  ///< shutdown config
const qrscanner_REG_AMBIENT_TEMP= 0x05;       ///< ambient temperature
const qrscanner_REG_RESOLUTION= 0x08;         ///< resolution
const WAKEUP_WAITING_TIME = 260;
const qrscanner_QRCODE_ADDR:0x21
const qrscanner_QRCODE_TRIGGER_REG:0x0000
const qrscanner_QRCODE_READY_REG:0x0010
const qrscanner_QRCODE_LENGTH_REG:0x0020
const qrscanner_QRCODE_TRIGGER_MODE_REG:0x0030
const qrscanner_QRCODE_TRIGGER_KEY_REG:0x0040
const qrscanner_QRCODE_DATA_REG:0x1000
  JUMP_TO_BOOTLOADER_REG:0x00FD
  FIRMWARE_VERSION_REG:0x00FE

class QRScanner{
    constructor(i2cPort,slaveAddress){
    this.i2cPort = i2cPort;
    this.i2cSlave = null;
    this.slaveAddress = slaveAddress;
  }

  async init() {
    this.i2cSlave = await this.i2cPort.open(this.slaveAddress);
    await this.write16(qrscanner_REG_CONFIG,0x0);
  }

async _write(addr, reg, buffer) {
  const regLow = reg & 0x00FF;
  const regHigh = (reg >> 8) & 0x00FF;

  const data = Buffer.alloc(2 + buffer.length);
  data[0] = regLow;
  data[1] = regHigh;
  for (let i = 0; i < buffer.length; i++) {
    data[2 + i] = buffer[i];
  }

  await this._wire.i2cWrite(addr, data.length, data);
}

 


void M5UnitQRCodeI2C::writeBytes(uint8_t addr, uint16_t reg, uint8_t *buffer, uint8_t length) {
    uint8_t temp[2];

    temp[0] = (reg & 0x00ff);
    temp[1] = ((reg >> 8) & 0x00ff);

    _wire->beginTransmission(addr);
    _wire->write(temp[0]);
    _wire->write(temp[1]);
    for (int i = 0; i < length; i++) {
        _wire->write(*(buffer + i));
    }
    _wire->endTransmission();
}


async readBytes(addr, reg, length) {
  // 16bitレジスタをリトルエンディアンで分割（C++コードと同じ）
  const temp = Buffer.alloc(2);
  temp[0] = reg & 0x00FF;
  temp[1] = (reg >> 8) & 0x00FF;

  // レジスタアドレスを送信（書き込み）
  await this._wire.i2cWrite(addr, temp.length, temp);

  // デバイスからlengthバイト読み取り
  const buffer = Buffer.alloc(length);
  await this._wire.i2cRead(addr, length, buffer);

  return buffer;
}
  
  
  void M5UnitQRCodeI2C::setDecodeTrigger(bool en) {
  writeByes(_addr,UNIT_QRCODE_TRIGGER_REG,(uint8_t*)&encodeURI,1);
}




const UNIT_QRCODE_TRIGGER_MODE_REG = 0x0030;
async getTriggerMode(){
  return await this._read(this.c.UNIT_QRCODE_TRIGGER_MODE_REG,1)[0];
}



  async scanData(){

  }
  async while (condition) {
    
  }
}

export default QRScanner;