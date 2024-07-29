import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

let labels = [
  {
    id: 1,
    name: "Acquisition",
    category: "Customer Type",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Retention",
    category: "Customer Type",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Hidup Sehat",
    category: "Goals",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Turun Berat Badan",
    category: "Goals",
    createdAt: new Date().toISOString(),
  },
];

const secret = process.env.SECRET_KEY || "secret";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authorization = request.headers.get("Authorization");
  if (!authorization) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(authorization.split(" ")[1], secret);
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const label = labels.find((label) => label.id === parseInt(id));
  if (!label) {
    return NextResponse.json({ message: "Label not found" }, { status: 404 });
  }

  return NextResponse.json(label);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authorization = request.headers.get("Authorization");
  if (!authorization) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(authorization.split(" ")[1], secret);
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const label = labels.find((label) => label.id === parseInt(id));
  if (!label) {
    return NextResponse.json({ message: "Label not found" }, { status: 404 });
  }

  const { name } = await request.json();
  label.name = name;
  return NextResponse.json(label);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authorization = request.headers.get("Authorization");
  if (!authorization) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(authorization.split(" ")[1], secret);
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const labelIndex = labels.findIndex((label) => label.id === parseInt(id));
  if (labelIndex === -1) {
    return NextResponse.json({ message: "Label not found" }, { status: 404 });
  }

  labels.splice(labelIndex, 1);
  return NextResponse.json(null, { status: 204 });
}
