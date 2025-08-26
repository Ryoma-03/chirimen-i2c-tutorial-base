import { requestI2CAccess } from "chirimen";
import AlarmLightSensorightsensor from "@chirimen/AlarmLightSensor.js";
import AlarmLightSensor from "./AlarmLightSensor";
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const alarmlightsensor = new AlarmLightSensor(i2cPort, 9600);
await alarmlightsensor.init();
for (;;) {
  let data = await alarmlightsensor.readProximity();
  console.log("Proximity:", data);
  data = await alarmlightsensor.readAmbient();
  console.log("Ambient Light:", data);
}
