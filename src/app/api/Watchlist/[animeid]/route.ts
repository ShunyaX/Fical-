import { NextResponse } from "next/server";
import connect from "@/app/lib/config";
import WatchlistModel from "@/app/lib/models/watchlist";
import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";

interface Params {
  params: {
    animeid: string;
  };
}

export async function DELETE(req: Request, { params }: Params) {
  await connect();

  const session:any = await getServerSession(handler);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user?.email;

  await WatchlistModel.findOneAndDelete({
    animeId: params.animeid,
    userEmail,
  });

  return NextResponse.json({ success: true });
}
