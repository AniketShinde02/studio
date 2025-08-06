import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPost extends Document {
  caption: string;
  image?: string;
  user: Types.ObjectId;
  createdAt: Date;
}

const PostSchema: Schema = new Schema({
  caption: {
    type: String,
    required: [true, 'Please add a caption.'],
  },
  image: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
