import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { bodyType } from '../new/route';

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: any) {
  try {
    const { id } = await params;
    const deletedPrompt = await prisma.prompt.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedPrompt, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error deleting Prompts' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, { params }: any) {
  try {
    const { id } = params;
    const prompt = await prisma.prompt.findFirst({
      where: {
        id: id,
      },
      include: {
        tags: true,
      },
    });
    return NextResponse.json(prompt, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error Retrieving Prompt Information' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: any) {
  const body = await req.json();

  const { prompt, tags }: bodyType = body;

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

    const { id } = params;

    const updatedPrompt = await prisma.prompt.update({
      where: {
        id: id,
      },
      data: {
        prompt: prompt,
        tags: {
          connect: tagsIds.map((id) => ({ id })),
        },
      },
    });
    return NextResponse.json(updatedPrompt, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error deleting Prompts' },
      { status: 500 }
    );
  }
}
