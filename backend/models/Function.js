import mongoose from 'mongoose';

const functionSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true
  }
},
{
  timestamps: true,
});

export const Function = mongoose.model('Function', functionSchema);
