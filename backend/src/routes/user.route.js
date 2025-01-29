import express from "express";

import { userAuth } from "../middleware/auth.middleware.js";
import { ConnectionRequest } from "../models/connectionRequest.model.js";
import { User } from "../models/user.model.js";

const router = express.Router();

const USER_DATA = "firstName lastName age skills about photoUrl gender";

// pending connection requests
router.get("/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_DATA);

    res.json(connectionRequests);
  } catch (error) {
    console.log("requests err ---", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_DATA)
      .populate("toUserId", USER_DATA);

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json(data);
  } catch (error) {
    console.log("connections err ---", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connection = await ConnectionRequest.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
        },
        {
          toUserId: loggedInUser._id,
        },
      ],
    }).select("fromUserId toUserId");
    // .populate("fromUserId", "firstName lastName")
    // .populate("toUserId", "firstName lastName");

    const hideUsersFromFeed = new Set();
    connection.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    // excluding connected users and loggedin user
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_DATA)
      .skip(skip)
      .limit(limit);

    res.json(users);
  } catch (error) {
    console.log("feed err ---", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
