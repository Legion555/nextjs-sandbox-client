import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this pet'],
        maxlength: [20, 'Name cannot be more than 60 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide a name for this pet'],
        maxlength: [30, 'Name cannot be more than 90 characters']
    },
    password: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    albums: {
        type: Array
    },
    blog: {
        type: Array
    }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)