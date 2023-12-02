import mongoose from "mongoose";
const Schema = mongoose.Schema;

const goalSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      require: [true, "Please add a text value"],
    },
    selectedDates: {
      startDate: {
        type: Date,
        require: [true, "Please add a start date"],
      },
      endDate: {
        type: Date,
        require: [true, "Please add an end date"],
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Goal", goalSchema);
