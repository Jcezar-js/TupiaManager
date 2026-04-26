import mongoose, { mongo } from "mongoose";

const materialSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  category:{
    type:String,
    enum: ['MDF', 'Madeira Maci�a', 'Compensado', 'Aglomerado', 'Metal', 'Vidro', 'Pl�stico', 'Tecido', 'Couro', 'Espuma', 'Ferragem'],
    required: true
  },
  unit:{
    type:String,
    enum:[ 'm2', 'm', 'unidade', 'kg', 'litro'],
    required: true
  },
  pricePerUnit:{
    type:Number,
    required:true
  },
  wasteFactor:{
    type: Number,
    default: 1.10,
    help: "Multiplicador de seguran�a para perca de material no corte"
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {timestamps: true});

materialSchema.index({ name: 'text' });

export default mongoose.model('Material', materialSchema)