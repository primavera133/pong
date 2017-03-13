import mongoose, {Schema} from 'mongoose'

const gameSchema = Schema({
    gameType: {
        type: String,
        required: true
    },
    playerOne: {
        type: Schema.Types.ObjectId,
        required: true
    },
    playerTwo: {
        type: Schema.Types.ObjectId,
        required: false
    }
})

export default mongoose.model('Game', gameSchema)
