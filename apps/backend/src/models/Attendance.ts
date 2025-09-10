import { Schema, model, Document } from "mongoose";

export interface IAttendance extends Document {
  userId: Schema.Types.ObjectId;
  checkIn: Date;
  checkOut?: Date;
  date: string; // formatted YYYY-MM-DD for uniqueness
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date },
    date: { type: String, required: true }, // to prevent multiple check-ins same day
  },
  { timestamps: true }
);

AttendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

export default model<IAttendance>("Attendance", AttendanceSchema);
