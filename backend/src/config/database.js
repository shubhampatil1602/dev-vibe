import mongoose from 'mongoose';

export const connectDB = async () => {
  const MONGO_URI =
    'mongodb+srv://shubhamspatilnbr:shubhamspatilnbr@cluster0.h6dpqoj.mongodb.net/dev-vibe?retryWrites=true&w=majority&appName=Cluster0';

  await mongoose.connect(MONGO_URI);
};
