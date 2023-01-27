const mongoose = require("mongoose");
const USERTYPE = {
  USER: 'user',
  ADMIN: 'admin'
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    usertype: {
      type: String,
      required: false,
      default: USERTYPE.USER,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },

  {
    methods: {
      isAdmin() {
        return (USERTYPE.ADMIN === this.usertype);
      }
    }
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;