import { NextResponse } from "next/server";
import connect from "@/app/lib/config";
import WatchlistModel from "@/app/lib/models/watchlist";
import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(
  req: Request,
  context: { params: { animeid: string } }
) {
  await connect();

  const session: any = await getServerSession(handler);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user?.email;
  const animeId = context.params.animeid;

  await WatchlistModel.findOneAndDelete({
    animeId,
    userEmail,
  });

  return NextResponse.json({ success: true });
}
