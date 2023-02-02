export default interface IBotSession {
    id?: number | undefined;
    connected_exchange_id: number;
    bot_id: number | string;
    name: string;
    parameters: any;
    mode: string;
    active: boolean;
    paused_at: string | null;
};