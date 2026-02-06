import { NextResponse } from "next/server";
import connect from "@/app/lib/config";
import Watchlist from "@/app/lib/models/watchlist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

export async function DELETE(req: Request, { params }: any) {
  try{
  await connect();

  const session: any = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const animeId = Number(params.animeid);
  if (isNaN(animeId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const deletedItem = await Watchlist.findOneAndDelete({ animeId, userEmail:session.user.email });

  if (!deletedItem) return NextResponse.json({ error: "Item not found" }, { status: 404 });

  return NextResponse.json({ success: true });
  
 } catch (err) {
  return NextResponse.json({ error: "Delete failed" }, { status: 500 });
}

}
