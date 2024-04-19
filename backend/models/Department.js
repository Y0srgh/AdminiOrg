import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  chefDepartement: {
    type: mongoose.Schema.Types.ObjectId || undefined,
    ref: 'Employee' // Référence à l'employé
  }
},
{
  Timestamp: true
});

export const Department = mongoose.model('Department', departmentSchema);
