'use strict';

module.exports = {
    add: {
        place: 'lambdas',
        method: 'lambda',
        list: true,
        useFilename: (id, value) => ({ id, ...value }),
        example: {
            id: '',
            options: {
                events: [],
                handler: async (request, ctx) => {}
            }
        }
    }
};
