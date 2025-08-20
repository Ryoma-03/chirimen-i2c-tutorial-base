import { requestI2CAccess, STM32F030 } from "chirimen";
const i2cPort = i2cAccess.ports.get(1);
const STM32F030 = new STM32F030(i2cPort, 0x21);
await STM32F030.init();
let data = await STM32F030.readData();
console.dir(data);
