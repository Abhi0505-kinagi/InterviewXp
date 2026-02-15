import { io } from "socket.io-client";
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ["websocket"],
  secure:true
});

export default socket;
