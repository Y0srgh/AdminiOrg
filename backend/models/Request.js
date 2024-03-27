import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Congé', 'Attestation', 'Avance', 'Remboursement'],
    required: true
  },
  employe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  departement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  status: {
    type: String,
    enum: ['En attente', 'Approuvée', 'Refusée', 'Annulée'],
    default: 'En attente'
  },
  date_creation: {
    type: Date,
    default: Date.now
  },
  date_debut: {
    type: Date,
    required: function() {
      return this.type === 'Congé';
    }
  },
  date_fin: {
    type: Date,
    required: function() {
      return this.type === 'Congé';
    }
  },
  montant: {
    type: Number,
    min: 0,
    required: function() {
      return this.type === 'Avance';
    }
  },
  documents: [String]
});

export const Request = mongoose.model('Request', requestSchema);
