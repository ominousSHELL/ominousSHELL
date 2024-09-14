import { prisma } from "../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res:NextResponse){
    const data = await req.json()
    //Query: SELECT LANGUAGE FROM PAYLOADS WHERE NAME=*
    const payload_language = await prisma.payloads.findMany({
        select: { language:true},
        where: {
            name: data.name,
        }
    })
    return NextResponse.json(payload_language)
}