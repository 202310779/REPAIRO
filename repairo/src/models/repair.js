import mongoose from 'mongoose';

const repairSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
}, { collection: 'repairs' });

// Use mongoose.models to prevent model recompilation in dev
const Repair = mongoose.models.Repair || mongoose.model('Repair', repairSchema);