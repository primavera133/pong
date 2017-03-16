import mongoose, {Schema} from 'mongoose'

const matchSchema = Schema({
    game: {
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

export default mongoose.model('Match', matchSchema)
