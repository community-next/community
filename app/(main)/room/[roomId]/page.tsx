import { getCurrentUser } from "lib/session";
import { Room } from "./Room";

interface RoomPageProps {
  params: { roomId: string };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { roomId } = params;

  const user = await getCurrentUser();

  return <Room roomId={params.roomId} user={user} />;
}
