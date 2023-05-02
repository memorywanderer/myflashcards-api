import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please, add your first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please, add your last name']
  },
  email: {
    type: String,
    required: [true, 'Please, add your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please, add your password']
  }
})

export default mongoose.model('User', userSchema)