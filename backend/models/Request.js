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

  fonction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Function",
  },
  status: {
    type: String,
    enum: ["En_attente", "Approuvée", "Refusée", "Annulée"],
    default: "En_attente",
  },
  date_creation: {
    type: Date,
    default: Date.now,
  },
  typeConge: {
    type: String,
    enum: ["payé", "sans_solde"],
    required: function () {
      return this.type === "Congé";
    },
  },
  nom: {
    type: String,
  },
  prenom: {
    type: String,
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
  date_reprise: {
    type: Date,
    required: function () {
      return this.type === "Congé";
    },
  },
  remplaçant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
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
  documents: {
    type: String,
    required: function () {
      return this.type === "Remboursement";
    },
  },
  validationRH: {
    type: Boolean,
    default: false,
  },
  validationChef: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
});

export const Request = mongoose.model("Request", requestSchema);
