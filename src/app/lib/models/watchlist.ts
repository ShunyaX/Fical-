import mongoose,{Schema} from "mongoose";

const WatchlistSchema = new Schema({
    usermail: { type: String, required: true },
    animeId: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
}, { timestamps: true });

const Watchlist = mongoose.models.Watchlist || mongoose.model("Watchlist", WatchlistSchema);

export default Watchlist;