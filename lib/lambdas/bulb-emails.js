'use strict';

const Toys = require('toys');

const internals = {};

module.exports = {
    id: 'bulb-emails',
    options: {
        events: [{
            sns: 'bulb-emails-incoming'
        }],
        handler: async (event, { server }) => {

            const { lightbulbService } = server.services();

            const message = JSON.parse(internals.getMessage(event));
            const subject = internals.getSubject(message);

            if (subject === 'off') {
                await lightbulbService.off();
            }
            else if (subject === 'on') {
                await lightbulbService.on();
            }
            else if (subject === 'toggle') {
                await lightbulbService.toggle();
            }
        }
    }
};

internals.getMessage = Toys.reacher('Records.0.Sns.Message');

internals.getSubject = Toys.reacher('mail.commonHeaders.subject');
