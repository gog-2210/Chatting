const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  // _id: {
  //   type: String,
  //   default: () => new mongoose.Types.ObjectId(),
  // },
  name: String,
  email: { type: String, unique: true },
  emailVerified: { type: Boolean, default: false },
  verificationCode: String,
  image: String,
  hashedPassword: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  conversationIds: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  ],
  seenMessageIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  conversations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  ],
  seenMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      onDelete: "CASCADE",
    },
  ],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: String,
  provider: String,
  providerAccountId: { type: String, unique: true },
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
});

const conversationSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  lastMessageAt: { type: Date, default: Date.now },
  name: String,
  isGroup: Boolean,
  messagesIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const messageSchema = new mongoose.Schema({
  body: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  seenIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
const Conversation = mongoose.model("Conversation", conversationSchema);
const Message = mongoose.model("Message", messageSchema);

module.exports = { User, Account, Conversation, Message };
