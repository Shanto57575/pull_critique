import mongoose from "mongoose";

const RepositorySchema = new mongoose.Schema(
    {
        owner: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        webhookId: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
)

const Repository = mongoose.model("Repository", RepositorySchema)

export default Repository

