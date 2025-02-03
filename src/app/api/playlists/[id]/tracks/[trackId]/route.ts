import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; trackId: string } }
) {
  try {
    const token = request.headers.get("Authorization");
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${BACKEND_URL}/api/playlists/${params.id}/tracks/${params.trackId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await response.json();

    if (response.status === 401) {
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to remove track from playlist" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Remove track from playlist error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
