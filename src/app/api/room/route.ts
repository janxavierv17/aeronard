import { NextRequest, NextResponse } from "next/server";
import { getAllRooms, newRoom, postRoom } from "@/db/schema/rooom";

export async function POST(request: NextRequest) {
	try {
		const body: newRoom = await request.json();
		const room = await postRoom(body);

		return NextResponse.json({ success: true, room });
	} catch (err) {
		return NextResponse.json({ success: false, err });
	}
}

export async function GET() {
	try {
		const rooms = await getAllRooms();
		return NextResponse.json({ success: true, rooms });
	} catch (err) {
		return NextResponse.json({ success: false, err });
	}
}
