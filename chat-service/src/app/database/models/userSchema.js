import mongoose from "mongoose"

const userSchema = new mongoose.Schema({ 
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    }
})

export default mongoose.model("User", userSchema)