import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import connect from "@/app/lib/config";
import Watchlist from "@/app/lib/models/watchlist";

export async function GET() {
  await connect();

  const session: any = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!session || !userEmail)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await Watchlist.find({ userEmail });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  try {
    await connect();
    const session: any = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { animeId, title, image, score, genres, episodes, synopsis } = await req.json();

    const exists = await Watchlist.findOne({ userEmail, animeId });
    if (exists) return NextResponse.json({ message: "Already added" });

    await Watchlist.create({
      userEmail,
      animeId,
      title,
      image,
      score: score ||0,
      genres:genres || [],
      episodes:episodes || 0,
      synopsis:synopsis || "",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("WATCHLIST POST ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
