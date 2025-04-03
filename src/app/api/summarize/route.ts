import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { youtubeUrl } = body;

    if (!youtubeUrl) {
      return NextResponse.json(
        { error: "Please provide a valid YouTube URL" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/summary/generate-summary`,
      {
        youtubeUrl,
        isPremium: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in summary API route:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: error.response.data.message || "Error from external API" },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { error: "Failed to summarize video" },
      { status: 500 }
    );
  }
}
