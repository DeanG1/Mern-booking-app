import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define an interface representing the document in MongoDB
interface UserDoc extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

// Define an interface for the user model
interface UserModel extends Model<UserDoc> {
    // You can define static methods here if needed
}

// User schema
const userSchema = new Schema<UserDoc, UserModel>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

// Pre-save hook
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const hashedPassword: string = await bcrypt.hash(this.password, 12);
            this.password = hashedPassword;
            next();
        } catch (error) {
            next(error); // Pass any error that occurs during hashing to the next middleware
        }
    } else {
        next(); // If the password is not modified, proceed to the next middleware
    }
});

// Define and export the User model
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export default User;