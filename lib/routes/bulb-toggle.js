'use strict';

const Joi = require('joi');

module.exports = {
    method: 'post',
    path: '/bulb/toggle/{bulbId}',
    options: {
        validate: {
            params: Joi.object({
                bulbId: Joi.number().min(1).max(6)
            })
        },
        handler: async (request) => {

            const { lightbulbService } = request.services();
            const { bulbId } = request.params;

            const { TOGGLE } = lightbulbService.POSITIONS;

            await lightbulbService.publish({ [bulbId]: TOGGLE });

            return { success: true };
        }
    }
};
