export interface Machine {
  id: string;
  username: string;
  ip_address: string;
  status: "online" | "offline";
  lastUpdated: string;
  created_at: string;
}
