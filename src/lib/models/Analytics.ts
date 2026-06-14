import mongoose, { Schema, Document } from "mongoose";

export interface IAnalytics extends Document {
  path: string;
  country: string;
  device: string;
  referrer: string;
  timestamp: Date;
}

const AnalyticsSchema = new Schema<IAnalytics>({
  path: { type: String, default: "/" },
  country: { type: String, default: "Unknown" },
  device: { type: String, default: "Desktop" },
  referrer: { type: String, default: "" },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Analytics || mongoose.model<IAnalytics>("Analytics", AnalyticsSchema);
