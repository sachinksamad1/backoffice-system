import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  role: "admin" | "manager" | "staff";
  departmentId?: Schema.Types.ObjectId; // for manager/staff
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "manager", "staff"],
      required: true,
    },
    departmentId: { type: Schema.Types.ObjectId, ref: "Department" },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
