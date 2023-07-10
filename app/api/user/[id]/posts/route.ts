import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import type { NextApiRequest } from 'next';
import { useRouter } from 'next/navigation';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const userId = typeof id === 'string' ? id : undefined;

  console.log(searchParams);

  const promptsByUser = await prisma.user.findMany({
    where: {
      id: userId,
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
