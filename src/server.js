// Need to enable the following link when using gmail:
// https://www.google.com/settings/security/lesssecureapps

"use strict";

var mqtt = require("mqtt");
var winston = require("winston");
var constants = require("./constants");

class Logger {

  constructor() {
    winston.add(winston.transports.File, { filename: 'server.log' });
    winston.remove(winston.transports.Console);    
  }

  init() {
    let url = process.env.DOCKER_MOSQUITTO_PORT || constants.mqtt.URL;
    console.log(process.env.DOCKER_MOSQUITTO_PORT);
    this.client = mqtt.connect(url);
    this.client.on(constants.mqtt.CONNECT_TOPIC, () => {
			this.outputText("Logger connected to MQTT - " + url);
      this.client.subscribe(constants.mqtt.LOG_TOPIC, {qos: 2});
		});  	
    this.client.on("message", (topic, payload) => {
      if (topic === constants.mqtt.LOG_TOPIC) {
        this.outputText("Payload - " + payload)
        this.onSendLog(payload);
      }
    });
  }

  onSendLog(payload) {
    winston.log('info', payload.toString());
  }

  outputText(text) {
    // process.stdout.write(text + "\n");
    console.log(text);
  }  

}

process.title = "dc-Logger";

let logger = new Logger();
logger.init();
