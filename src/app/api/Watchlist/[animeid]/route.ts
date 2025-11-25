import { NextResponse } from "next/server";
import connect from "@/app/lib/config";
import WatchlistModel from "@/app/lib/models/watchlist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

export async function DELETE(
  req: Request,
  context: any
) {
  await connect();

  const session: any = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user?.email;
  const animeidParam = context?.params?.animeid;
  if (!animeidParam) {
    return NextResponse.json({ error: "Missing param" }, { status: 400 });
  }

  const animeId = Number(animeidParam); 
  if (Number.isNaN(animeId)) {
    return NextResponse.json({ error: "Invalid animeId" }, { status: 400 });
  }

  await WatchlistModel.findOneAndDelete({
    animeId,
    userEmail,
  });

  return NextResponse.json({ success: true });
}
