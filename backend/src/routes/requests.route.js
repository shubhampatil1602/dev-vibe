import express from 'express';
import mongoose from 'mongoose';

import { userAuth } from '../middleware/auth.middleware.js';
import { ConnectionRequest } from '../models/connectionRequest.model.js';
import { User } from '../models/user.model.js';

const router = express.Router();

router.post('/send/:status/:toUserId', userAuth, async (req, res) => {
  try {
    const fromUser = req.user;
    const { toUserId, status } = req.params;

    const allowedStatus = ['ignored', 'interested'];

    // Validate the status
    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: `Invalid status type: ${status}` });
    }

    // Check if toUserId is a valid ObjectId
    if (!mongoose.isValidObjectId(toUserId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Check if the receiver exists in the database
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check for existing connection request
    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        {
          fromUserId: fromUser._id,
          toUserId,
        },
        {
          fromUserId: toUserId,
          toUserId: fromUser._id,
        },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Request already sent' });
    }

    // Create a new connection request
    const connectionRequest = new ConnectionRequest({
      fromUserId: fromUser._id,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();
    return res.json({
      message:
        status === 'interested'
          ? 'Request sent successfully'
          : status === 'ignored' && 'Request ignored',
      data,
    });
  } catch (error) {
    console.log('send err ---', error);
    return res.status(500).json({ message: error.message });
  }
});

router.post('/review/:status/:requestId', userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const allowedStatus = ['accepted', 'rejected'];

    // Validate the status
    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: `Invalid status type: ${status}` });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: 'interested',
    });

    if (!connectionRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.json({ message: 'Connection request ' + status, data });
  } catch (error) {
    console.log('review err ---', error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
