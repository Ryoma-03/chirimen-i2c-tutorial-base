import {requestI2CAccess, SHT29} from "chirimen";

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const sht29 = new SHT40(i2cPort, 0x29);
await sht29.init();
setInterval(async function() {
let data = await sht40.readData();
console.log(data)
},1000);   
