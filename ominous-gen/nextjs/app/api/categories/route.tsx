import { prisma } from "../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res:NextResponse){
    const data = await req.json()
    //Query: SELECT DISTINCT CATEGORY FROM PAYLOADS WHERE CONNECTION_TYPE=* AND PLATFORM=*
    const categories = await prisma.payloads.findMany({
        distinct: ['category'],
        select: { category :true},
        where: {
            connection_type: data.connection_type,
            platform: data.platform
        }
    })
    return NextResponse.json(categories)
}