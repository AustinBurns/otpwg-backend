import mongoose from 'mongoose';

const connectToDb = (url = process.env.MONGO_URL, opts = {}) =>
  mongoose.connect(url, { ...opts, useNewUrlParser: true });

export default connectToDb;
