import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        thumbnail: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        title: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        duration: {
            type: Number,
            required: true
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
            required: true,
        },
    },
    {
        timestamps: true
    });

videoSchema.plugin(mongooseAggregatePaginate);

export const video = mongoose.model("Video", videoSchema);