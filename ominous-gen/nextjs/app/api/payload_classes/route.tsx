import { prisma } from "../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res:NextResponse){
    const data = await req.json()
    //Query: SELECT DISTINCT CLASS FROM PAYLOADS WHERE CONNECTION_TYPE=* AND PLATFORM=* AND CATEGORY=*
    const payload_classes = await prisma.payloads.findMany({
        distinct: ['class'],
        select: { class :true},
        where: {
            connection_type: data.connection_type,
            platform: data.platform,
            category: data.category
        }
    })
    return NextResponse.json(payload_classes)
}