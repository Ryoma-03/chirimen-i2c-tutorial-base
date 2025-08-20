// @ts-check
// Driver for the QR Code Scanner Unit
// based from https://github.com/m5stack/M5Unit-QRCode/blob/main/src/M5UnitQRCodeI2C.cpp
// Programmed by Ryoma Aoki

const qrscanner_I2CADDR_DEFAULT = 0x18; ///< I2C address
const qrscanner_REG_CONFIG = 0x01; ///< MCP9808 config register
const qrscanner_REG_CONFIG_SHUTDOWN = 0x0100; ///< shutdown config
const qrscanner_REG_AMBIENT_TEMP = 0x05; ///< ambient temperature
const qrscanner_REG_RESOLUTION = 0x08; ///< resolution
const WAKEUP_WAITING_TIME = 260;
const qrscanner_QRCODE_ADDR = 0x21;
const qrscanner_QRCODE_TRIGGER_REG = 0x0000;
const qrscanner_QRCODE_READY_REG = 0x0010;
const qrscanner_QRCODE_LENGTH_REG = 0x0020;
const qrscanner_QRCODE_TRIGGER_MODE_REG = 0x0030;
const qrscanner_QRCODE_TRIGGER_KEY_REG = 0x0040;
const qrscanner_QRCODE_DATA_REG = 0x1000;
const JUMP_TO_BOOTLOADER_REG = 0x00fd;
const FIRMWARE_VERSION_REG = 0x00fe;

class QRScanner {
  constructor(i2cPort, slaveAddress) {
    this.i2cPort = i2cPort;
    this.i2cSlave = null;
    this.slaveAddress = slaveAddress;
  }

  async init() {
    this.i2cSlave = await this.i2cPort.open(this.slaveAddress);
    await this.write16(qrscanner_REG_CONFIG, 0x0);
  }

  async _write(addr, reg, buffer) {
    const regLow = reg & 0x00ff;
    const regHigh = (reg >> 8) & 0x00ff;

    const data = Buffer.alloc(2 + buffer.length);
    data[0] = regLow;
    data[1] = regHigh;
    for (let i = 0; i < buffer.length; i++) {
      data[2 + i] = buffer[i];
    }

    await this._wire.i2cWrite(addr, data.length, data);
  }

  async _read(reg16, length) {
    let sendData = [];
    sendData[0] = reg16 & 0x00ff;
    sendData[1] = (reg16 >> 8) & 0x00ff;
    await this.i2cSlave.writeBytes(sendData);
    return await this.i2cSlave.readBytes(length);
  }

  async setTriggerMode() {}
  async getTriggerMode() {
    return await this._read(this.c.UNIT_QRCODE_TRIGGER_MODE_REG, 1)[0];
  }

  async getDecodeReadyStatus() {}
  async getDecodeLength() {}
  async getDecodeData() {}

  async scanData() {}
}

export default QRScanner;
