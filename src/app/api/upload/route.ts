import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { v4 as uuidv4 } from "uuid";
import { upload } from "@/service/firestore";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = uuidv4();
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  try {
    const uploadResult = await upload(file, url);

    return NextResponse.json(
      {
        bucket: uploadResult.metadata.bucket,
        name: uploadResult.metadata.name,
        downloadURL: uploadResult.metadata.downloadURL,
      },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        error: "Firebase image upload failed",
      },
      { status: 400 },
    );
  }
}
