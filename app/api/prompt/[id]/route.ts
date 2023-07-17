import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import type { NextApiRequest } from 'next';

const prisma = new PrismaClient();

export async function DELETE(req: NextApiRequest, { params }: any) {
  const { id } = params;

  const deletedPrompt = await prisma.prompt.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ status: 200 });
}

//add errors
// see diference between response and nextreponse
