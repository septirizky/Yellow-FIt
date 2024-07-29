import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const users = [
  {
    email: "itdev@yellowfitkitchen.com",
    password: "itdev@yellowfitkitchen.com",
  },
];

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = users.find((u) => u.email === email);
  const secret = process.env.SECRET_KEY || "secret";

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ email: user.email }, secret, {
      expiresIn: "1h",
    });
    return NextResponse.json({ token }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
