import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'

// @desc   Authenticate user
// @route  POST /api/users/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Fill all fields')
  } else {
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  }
})

// @desc   Register user
// @route  POST /api/users/register
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password
  ) {
    res.status(400)
    throw new Error('Fill all fields')
  } else {
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')

    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })

    if (newUser) {
      res.status(201).json({
        _id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        token: generateToken(newUser._id)
      })
    } else {
      res.status(400)
      throw new Error('Incorrect user data')
    }
  }
})

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )
}