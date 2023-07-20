import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export type bodyType = {
  userId?: string;
  prompt: string;
  tags: string[];
};

const prisma = new PrismaClient();

export async function POST(req: Request) {
  /* await prisma.prompt.deleteMany({});
  await prisma.promptTag.deleteMany({}); */
  const body = await req.json();

  const { userId, prompt, tags }: bodyType = body;

  try {
    const tagsChecker = tags.map(async (tag) => {
      const existingTag = await prisma.promptTag.findFirst({ where: { tag } });

      if (existingTag) {
        return existingTag.id;
      } else {
        const newTag = await prisma.promptTag.create({ data: { tag } });
        return newTag.id;
      }
    });

    const tagsIds = await Promise.all(tagsChecker);
    const result = await prisma.prompt.create({
      data: {
        prompt: prompt,
        user: {
          connect: {
            id: userId,
          },
        },
        tags: {
          connect: tagsIds.map((id) => ({ id })),
        },
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error adding Prompts' },
      { status: 500 }
    );
  }
}
