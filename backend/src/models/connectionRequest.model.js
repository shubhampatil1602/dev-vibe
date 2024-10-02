import mongoose from 'mongoose';

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ['ignored', 'interested', 'accepted', 'rejected'],
        message: `{VALUE} is incorrect status type`,
      },
      required: true,
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// check if fromUserId === toUserId
connectionRequestSchema.pre('save', function (next) {
  const connectionRequest = this;

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error('You cannot send a connection request to yourself.');
  }
  next();
});

export const ConnectionRequest = mongoose.model(
  'ConnectionRequest',
  connectionRequestSchema
);
