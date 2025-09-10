import { Schema, model, Document } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  description?: string;
  managerId?: Schema.Types.ObjectId; // optional link
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    managerId: { type: Schema.Types.ObjectId, ref: "User" }, // one manager per dept
  },
  { timestamps: true }
);

export default model<IDepartment>("Department", DepartmentSchema);
