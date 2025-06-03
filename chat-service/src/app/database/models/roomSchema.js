import mongoose from "mongoose"

const roomSchema = new mongoose.Schema({
    participants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }],
    status: {
        type: String,
        enum: ['active', 'archived', 'closed'],
        default: 'active'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})
export default mongoose.model("Room", roomSchema)