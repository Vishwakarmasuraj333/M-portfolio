import mongoose, { Schema, Document } from "mongoose";

export interface IGallery extends Document {
  title: string;
  category: string;
  image: string; // Base64 or external url
  createdAt: Date;
}

const GallerySchema = new Schema<IGallery>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", GallerySchema);
