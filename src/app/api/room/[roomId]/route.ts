import { deleteRoomById } from "@/db/schema/rooom/schema";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { roomId: string } }) {
	try {
		const { roomId } = params;
		const room = await deleteRoomById(Number(roomId));

		if (!room) throw new Error("Room doesn't exist");

		return NextResponse.json({ success: true, message: `Successfully deleted room with id of ${room[0].id}` });
	} catch (err: any) {
		console.log("Err =>", err.message);
		return NextResponse.json({ success: false, message: err?.message });
	}
}
