import mongoose, { Schema } from 'mongoose'
import { IMenu } from './type.dt'

const menuSchema = new mongoose.Schema<IMenu>({
  name: { type: String, required: true, unique: true },
  parent: Schema.Types.ObjectId,
  path: String,
  icon: String,
  sort_order: { type: Number, default: 1 },
})

export const menuModel =
  mongoose.models.menu || mongoose.model<IMenu>('menu', menuSchema)

// menu.createCollection().then(function (collection) {
//   console.log('Collection is created!')
// })
