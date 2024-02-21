import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { dayToDusk } from "@/service/replicate";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { imageUrl, params } = await request.json();
  const data = await dayToDusk(params, imageUrl);

  return NextResponse.json(data, { status: 201 });
}
