import mongoose, {Schema} from 'mongoose'

const matchSchema = Schema({
  game: {
    gameId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  playerOne: {
    playerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Player'
    },
    name: {
      type: String
    }
  },
  playerTwo: {
    playerId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'Player'
    },
    name: {
      type: String
    }
  },
  turn: {
    type: String,
    enum: ['playerOne', 'playerTwo']
  },
  accepted: {
    type: Boolean,
    default: false
  },
  rejected: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model('Match', matchSchema)
