import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

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
      unique: true,
    },
    mot_de_passe: {
      type: String,
      required: true,
      select: false,
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

/*employeeSchema.pre("save", async function (next) {
  const employee = this;
  if (employee.isModified("mot_de_passe")) {
    const hashedPassword = await bcrypt.hash(employee.mot_de_passe, 10);
    employee.mot_de_passe = hashedPassword;
  }
  next();
});

employeeSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEYRSA, {
    expiresIn: "7d",
    algorithm: "RS256" 
  });
  return token;
};*/

export const validate = (data) => {
  const schema = Joi.object({
    nom: Joi.string().required().label("nom"),
    prenom: Joi.string().required().label("prenom"),
    email: Joi.string().email.required().label("email"),
    mot_de_passe: passwordComplexity().required().label("mot de passe"),
    dateEmbauche: Joi.date().required().label("Date d'embauche"),
  });
  return schema.validate(data);
};

export const Employee = mongoose.model("Employee", employeeSchema);
