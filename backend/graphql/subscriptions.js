const { PubSub, withFilter } = require('apollo-server');

const pubsub = new PubSub()

const Subscription = {
    changedCard: {
        subscribe: withFilter(
            () => pubsub.asyncIterator(['SCORE_SET']),
            (payload, variables) => {
                console.log('SUB! Payload: ', payload, 'Variables: ', variables)

                return (payload.changedCard.roundId === variables.roundId)
            }
        )
    }
}

module.exports = Subscription