import { prisma } from "../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res:NextResponse){
    const data = await req.json()
    //Query: SELECT DATA FROM PAYLOADS WHERE NAME=*
    const payload_data = await prisma.payloads.findMany({
        select: { data:true},
        where: {
            name: data.name,
        }
    })
    return NextResponse.json(payload_data)
}