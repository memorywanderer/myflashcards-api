import mongoose from 'mongoose'

export const cardSchema = mongoose.Schema({
  term: {
    type: String,
    required: [true, 'Please, add a term']
  },
  description: {
    type: String,
    required: [true, 'Add a description']
  },
  collectionRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection'
  }
})

export default mongoose.model("Card", cardSchema)