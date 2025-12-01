import { NextResponse } from "next/server";
import connect from "@/app/lib/config";
import Watchlist from "@/app/lib/models/watchlist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

export async function DELETE(req: Request, { params }: any) {
  await connect();

  const session: any = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userEmail = session.user.email;
  const animeId = Number(params.animeid);

  await Watchlist.findOneAndDelete({ animeId, userEmail });

  return NextResponse.json({ success: true });
}
