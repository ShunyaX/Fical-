import mongoose,{Schema} from "mongoose";

const WatchlistSchema = new Schema({
    userEmail: { type: String, required: true },
    animeId: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    score: { type: Number, default: 0 },
    genres: { type: [String], default: [] },
    episodes: { type: Number, default: 0 },
    synopsis: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.models.Watchlist || mongoose.model("Watchlist", WatchlistSchema);
