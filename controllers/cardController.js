import asyncHandler from 'express-async-handler'
import Card from '../models/cardModel.js'
import Collection from '../models/collectionModel.js'

// @desc GET Cards
// @path /api/cards/
// @access  Private
export const getCards = asyncHandler(async (req, res) => {
  const cards = await Card.find()
  if (!cards) {
    res.status(400)
    throw new Error('Cards are empty')
  }
  res.status(200).json(cards)
})

// @desc POST Cards
// @path /api/cards/
// @access  Private
export const createCard = asyncHandler(async (req, res) => {
  const { term, description, collectionRef } = req.body

  if (!term || !description) {
    res.status(400)
    throw new Error('Add all fields')
  }

  const card = await Card.create({
    term,
    description,
    collectionRef
  })

  res.status(201).json(card)
})

// @desc PATCH Cards
// @path /api/cards/:id
// @access  Private
export const updateCard = asyncHandler(async (req, res) => {
  const card = Card.findById(req.params.id)
  if (!card) {
    res.status(400)
    throw new Error('Update operation. Card not found')
  }
  const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(201).json(updatedCard)
})


// @desc DELETE Cards
// @path /api/cards/:id
// @access  Private
export const deleteCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id)
  if (!card) {
    res.status(400)
    throw new Error('Delete operation. Card not found')
  }
  const collection = await Collection.findById(card.collectionRef)
  if (!collection) {
    throw new Error('Delete card. Collection doesn\'t exist')
  } else {
    collection.cards = collection.cards.filter(collectionCard => card._id.toString() !== collectionCard.toString())
    await collection.save()
    await card.deleteOne()
    res.status(201).json({ id: req.params.id })
  }
})