/**
 * Created by budde on 27/04/16.
 */

var mongoose = require('mongoose')
var config = require('config')

mongoose.connect(config.get('mongo.url'))
mongoose.Promise = require('promise')

module.exports = {
  UserModel: require('./user'),
  TokenModel: require('./token'),
  LaundryModel: require('./laundry'),
  BookingModel: require('./booking'),
  MachineModel: require('./machine'),
  LaundryInvitationModel: require('./laundry_invitation')
}
