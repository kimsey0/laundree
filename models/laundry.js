/**
 * Created by budde on 02/06/16.
 */
const mongoose = require('mongoose')
const {Schema} = mongoose

const laundrySchema = new Schema({
  name: {type: String, unique: true, trim: true, required: true},
  machines: [{type: Schema.Types.ObjectId, ref: 'Machine'}],
  owners: [{type: Schema.Types.ObjectId, ref: 'User'}],
  users: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true})

laundrySchema.index({'name': 1})
laundrySchema.index({'users': 1})

laundrySchema.statics.findFromId = (id) => LaundryModel.findById(new mongoose.Types.ObjectId(id))

const LaundryModel = mongoose.model('Laundry', laundrySchema)

module.exports = LaundryModel
