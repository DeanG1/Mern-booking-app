import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
// Here we created a representation of a userDoc in our DB
//Type that represent out user
export type UserType = 
{
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

//User schema

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, require: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true}
});

userSchema.pre("save", async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
