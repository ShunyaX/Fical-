import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import connect from "@/app/lib/config";
import Watchlist from "@/app/lib/models/watchlist";

export async function DELETE(
  req: Request,
  { params }: { params: { animeId: string } }
) {
  await connect();

  const session:any = await getServerSession(handler);
  const userEmail = session?.user?.email;

  if (!session || !userEmail)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const animeId = Number(params.animeId);

  await Watchlist.findOneAndDelete({ userEmail, animeId });
  

  return NextResponse.json({ success: true });
}
