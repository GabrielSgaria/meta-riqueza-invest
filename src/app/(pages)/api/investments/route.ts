import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const { category, amount } = body;

  try {
    const investment = await prisma.investment.create({
      data: {
        category,
        amount,
      },
    });
    return NextResponse.json(investment, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Erro ao criar investimento' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const investments = await prisma.investment.findMany();
    return NextResponse.json(investments, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Erro ao buscar investimentos' }, { status: 500 });
  }
}
