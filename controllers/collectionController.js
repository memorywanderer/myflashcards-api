import asyncHandler from 'express-async-handler'
import Collection from '../models/collectionModel.js'

// @desc    Get collections
// @route   GET /api/collections
// @access  Private
export const getCollection = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit;


  const totalDecks = await Collection.countDocuments({ user: req.user.id })
  const totalPages = Math.ceil(totalDecks / limit)

  const collections = await Collection.find({ user: req.user.id }).skip(skip).limit(limit)

  const hasMore = page < totalPages

  if (!collections) {
    res.status(400)
    throw new Error('There are no collections')
  }

  res.status(200).json({
    collections,
    hasMore,
    totalPages
  })
})

// @desc    Create collection
// @route   POST /api/collections
// @access  Private
export const createCollection = asyncHandler(async (req, res) => {
  const { name, description } = req.body
  if (!name) {
    res.status(400)
    throw new Error('Please fill a name field')
  }
  const collection = await Collection.create({
    name,
    description,
    user: req.user.id
  })

  res.status(200).json(collection)
})

// @desc    Update collection
// @route   PATCH /api/collections/:id
// @access  Private
export const updateCollection = asyncHandler(async (req, res) => {
  const collection = await Collection.findById(req.params.id)
  if (!collection) {
    res.status(400)
    throw new Error('Update operation. Collection not found')
  }
  const updatedCollection = await Collection.findByIdAndUpdate(req.params.id, req.body, { new: true })

  res.status(201).json(updatedCollection)
})

// @desc    Delete collection
// @route   DELETE /api/collections/:id
// @access  Private
export const deleteCollection = asyncHandler(async (req, res) => {
  const collection = await Collection.findById(req.params.id)
  if (!collection) {
    res.status(400)
    throw new Error('Delete operation. Collection not found')
  }

  await collection.deleteOne()
  res.status(201).json({ id: req.params.id })
})