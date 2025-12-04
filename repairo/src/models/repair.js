import mongoose from "mongoose";

const repairSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    technicianId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "repairs" }
);

// Use mongoose.models to prevent model recompilation in dev
const Repair = mongoose.models.Repair || mongoose.model("Repair", repairSchema);

export default Repair;
