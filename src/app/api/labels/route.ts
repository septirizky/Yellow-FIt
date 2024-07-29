import { Label } from "@/app/types";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

let labels: Label[] = [];

const authenticate = (req: NextRequest) => {
  const secret = process.env.SECRET_KEY || "secret";

  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) throw new Error("Unauthorized");
  jwt.verify(token, secret);
};

export async function GET(req: NextRequest) {
  try {
    authenticate(req);
    return NextResponse.json(labels, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    authenticate(req);
    const newLabel: Label = { id: Date.now(), ...(await req.json()) };
    labels.push(newLabel);
    return NextResponse.json(newLabel, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    authenticate(req);
    const url = new URL(req.url);
    const id = parseInt(url.searchParams.get("id") || "");
    labels = labels.filter((l) => l.id !== id);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
