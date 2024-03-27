import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true
  }
},
{
  timestamps: true,
});

export const Department = mongoose.model('Department', departmentSchema);
