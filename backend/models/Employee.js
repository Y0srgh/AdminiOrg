import mongoose from "mongoose";
import bcrypt from "bcrypt";

const employeeSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    departement: {
      type: String,
      required: true,
    },
    fonction: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mot_de_passe: {
      type: String,
      required: true,
    },
    solde_conge: {
      type: Number,
      default: 0,
    },
    dateEmbauche: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.pre("save", async function (next) {
  const employee = this;
  if (employee.isModified("mot_de_passe")) {
    const hashedPassword = await bcrypt.hash(employee.mot_de_passe, 10);
    employee.mot_de_passe = hashedPassword;
  }
  next();
});

export const Employee = mongoose.model("Employee", employeeSchema);
