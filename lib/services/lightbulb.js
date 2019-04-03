'use strict';

const Util = require('util');
const Mqtt = require('mqtt');
const Toys = require('toys');
const { Service } = require('schmervice');

const OFF = 0;
const ON = 1;
const TOGGLE = 2;
const NOOP = null;

module.exports = class LightbulbService extends Service {

    constructor(server, options) {

        super(server, options);

        this.POSITIONS = { OFF, ON, TOGGLE, NOOP };

        this.client = Mqtt.connect(options.lightbulb.mqtt);
        this.client.end = Util.promisify(this.client.end);
        this.client.publish = Util.promisify(this.client.publish);
    }

    async initialize() {

        if (this.client.connected) {
            return;
        }

        await Toys.event(this.client, 'connect');
    }

    async teardown() {

        await this.client.end();
    }

    async on() {

        await this.publish({
            1: ON,
            2: ON,
            3: ON,
            4: ON,
            5: ON,
            6: ON
        });
    }

    async off() {

        await this.publish({
            1: OFF,
            2: OFF,
            3: OFF,
            4: OFF,
            5: OFF,
            6: OFF
        });
    }

    async toggle() {

        await this.publish({
            1: TOGGLE,
            2: TOGGLE,
            3: TOGGLE,
            4: TOGGLE,
            5: TOGGLE,
            6: TOGGLE
        });
    }

    async publish(lights) {

        const message = {};

        for (const [light, position] of Object.entries(lights)) {
            if (position !== NOOP) {
                message[`L${light}`] = position;
            }
        }

        return await this.client.publish(this.options.lightbulb.topic, JSON.stringify(message));
    }
};
