import { requestI2CAccess } from "chirimen";
import AlarmLightSensorightsensor from "@chirimen/AlarmLightSensor.js";
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const alarmlightsensor = new AlarmLightSensorightsensor(i2cPort, 0);
await alarmlightsensor.init();
setInterval(async function () {
  let data = await alarmlightsensor.readData();
  console.log("Proximity:", data.proximity);
  console.log("Ambient Light:", data.ambient);
}, 1000);
