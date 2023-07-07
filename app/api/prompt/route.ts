import { PrismaClient } from '@prisma/client';
import type { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      prompts: {
        include: {
          tags: true,
        },
      },
    },
  });

  return NextResponse.json(users);
}
