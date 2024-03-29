import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Congé", "Attestation", "Avance", "Remboursement", "Fiche_Paie"],
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  status: {
    type: String,
    enum: ["En_attente", "Approuvée", "Refusée", "Annulée"],
    default: "En attente",
  },
  date_creation: {
    type: Date,
    default: Date.now,
  },
  date_debut: {
    type: Date,
    required: function () {
      return this.type === "Congé";
    },
  },
  date_fin: {
    type: Date,
    required: function () {
      return this.type === "Congé";
    },
  },
  montant: {
    type: Number,
    min: 0,
    required: function () {
      return this.type === "Avance";
    },
  },
  documents: [String],
  validationRH: {
    type: Boolean,
    default: false,
  },
  validationChef: {
    type: Boolean,
    default: false,
  },
});

export const Request = mongoose.model("Request", requestSchema);
