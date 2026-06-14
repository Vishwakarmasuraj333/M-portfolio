import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  category: string; // e.g. "AI", "Full Stack", "Featured"
  image: string; // Base64 or external url
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  liveUrl: { type: String, default: "" },
  githubUrl: { type: String, default: "" },
  techStack: [{ type: String }],
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
