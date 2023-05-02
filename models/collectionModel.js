import mongoose from "mongoose"
import Card from "./cardModel.js";

const collectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please, add a name of the card']
  },
  description: {
    type: String
  },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

// If collection delete, this middleware deletes cards attached to collection
collectionSchema.pre('deleteOne', { query: false, document: true }, async function (next) {
  try {
    // Find all cards associated with this collection
    const cards = await Card.find({ collectionRef: this._id });

    // Delete all found cards
    await Promise.all(cards.map(card => card.deleteOne()));
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("Collection", collectionSchema)