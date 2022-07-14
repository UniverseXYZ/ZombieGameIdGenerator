const UserModel = require('./user.model');

module.exports = {
  updateUser: (walletAddress) => {
    return UserModel.findOneAndUpdate({
      'walletAddress': walletAddress
    }, {
      walletAddress,
      id: Math.random().toString(36).substring(2, 12).toUpperCase(),
      idIsUsed: false
    }, {
      upsert: true,
      new: true
    })
      .exec()
      .then(user => user);
  },
  getUser: (walletAddress) => {
    return UserModel.findOne({
      'walletAddress': walletAddress
    })
      .exec()
      .then(user => user)
  },
  removeUser: (walletAddress) => {
    return UserModel.deleteOne({
      'walletAddress': walletAddress
    })
      .exec()
      .then(user => user)
  }
}