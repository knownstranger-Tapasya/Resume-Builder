const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: { type:String, required: true},
        bio: { type: String, default: '' },
        profileImageUrl: { type: String, default: null},
        preferences: {
            emailNotifications: { type: Boolean, default: true },
            theme: { type: String, enum: ['light', 'dark', 'system'], default: 'light' }
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);
