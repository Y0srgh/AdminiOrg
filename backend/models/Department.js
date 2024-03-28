import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  chefDepartement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee' // Référence à l'employé
  }
});

export const Department = mongoose.model('Department', departmentSchema);
