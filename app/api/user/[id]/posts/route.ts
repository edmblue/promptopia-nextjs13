import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: any) {
  const { id } = params;

  const promptsByUser = await prisma.user.findMany({
    where: {
      id: id,
    },
    include: {
      prompts: {
        include: {
          tags: true,
        },
      },
    },
  });

  return NextResponse.json(promptsByUser);
}
