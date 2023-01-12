export default interface IIndicatorTest {
    id?: number | undefined;
    connected_exchange_id: number;
    bot_id: number | string;
    indicator_id: number | string;
    name: string;
    bot_parameters: any;
    indicator_parameters: any;
    active: boolean;
};