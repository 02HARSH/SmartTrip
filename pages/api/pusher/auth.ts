import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { pusherServer } from "@/app/libs/pusher";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  console.log("Auth request received...");

  // Get session
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    console.log("Unauthorized request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse request body
  const body = await req.json();
  const { socket_id, channel_name } = body;

  if (!socket_id || !channel_name) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Authorize user for Pusher
  const authResponse = pusherServer.authorizeChannel(socket_id, channel_name, {
    user_id: session.user.email,
  });

  return NextResponse.json(authResponse);
}
