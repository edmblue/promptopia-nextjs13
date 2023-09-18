import { PrismaClient } from '@prisma/client';
import type { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export const revalidate = 1;
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        prompts: {
          include: {
            tags: true,
          },
        },
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error adding Prompts' },
      { status: 500 }
    );
  }
}
