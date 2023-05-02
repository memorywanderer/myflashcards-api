import express from 'express'
import {
  createCard,
  deleteCard,
  getCards,
  updateCard
} from '../controllers/cardController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .get(protect, getCards)
  .post(protect, createCard)

router.route('/:id')
  .patch(protect, updateCard)
  .delete(protect, deleteCard)

export default router