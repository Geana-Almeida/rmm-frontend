export interface Machine{
    id: string;
    name: string;
    ip: string;
    status: 'online' | 'offline';
    lastUpdated: string;
}