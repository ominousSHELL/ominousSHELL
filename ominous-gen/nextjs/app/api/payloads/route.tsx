import { prisma } from "../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res:NextResponse){
    const data = await req.json()
    //Query: SELECT DISTINCT NAME FROM PAYLOADS WHERE CONNECTION_TYPE=* AND PLATFORM=* AND CATEGORY=* AND CLASS=*
    const payloads = await prisma.payloads.findMany({
        distinct: ['name'],
        select: { name :true},
        where: {
            connection_type: data.connection_type,
            platform: data.platform,
            category: data.category,
            class: data.class
        }
    })
    return NextResponse.json(payloads)
}