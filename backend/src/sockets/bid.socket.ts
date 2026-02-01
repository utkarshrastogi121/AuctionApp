import { Server, Socket } from "socket.io";
import { placeBid } from "../services/bid.service";

export const registerBidSocket = (io: Server, socket: Socket) => {
  socket.on("BID_PLACED", async (payload) => {
    try {
      const updated = await placeBid(
        payload.itemId,
        payload.amount,
        payload.user,
      );
      io.emit("UPDATE_BID", updated);
    } catch (err: any) {
      socket.emit("BID_ERROR", err.message);
    }
  });
};
