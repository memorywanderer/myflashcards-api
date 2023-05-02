import express from 'express'
import {
  createCollection,
  deleteCollection,
  getCollection,
  updateCollection
} from '../controllers/collectionController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .get(protect, getCollection)
  .post(protect, createCollection)

router.route('/:id')
  .delete(protect, deleteCollection)
  .patch(protect, updateCollection)

export default router