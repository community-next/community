import { Room } from "./Room";

interface RoomPageProps {
  params: { roomId: string };
}

export default function RoomPage({ params }: RoomPageProps) {
  return <Room roomId={params.roomId} />;
}
