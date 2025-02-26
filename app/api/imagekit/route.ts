import { NextResponse } from "next/server";
import { config } from "@/lib/config";
import ImageKit from "imagekit";

const {
  env: {
    imagekit: { privateKey, publicKey, urlEndpoint }
  }
} = config;

const imagekit = new ImageKit(
  {
    publicKey,
    privateKey,
    urlEndpoint,
  }
)
export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}