import { getConnectToken } from 'API/connectApiTokens';
import React, { createContext, FunctionComponent, ReactNode, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import JsonParser from '../../helpers/JsonParser';
import io, { Socket } from 'socket.io-client';
import { getExchangeAccounts } from 'API/exchangeAccounts';

export const WebSocketContext = createContext<Socket | null>(null);

const WebSocketProvider: FunctionComponent<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
    const userStore = useSelector((store: any) => store.user);
    const [connection, setConnection] = useState<Socket | null>(null);

    useEffect(() => {
        try {
            const websocketUrl = process.env.WEBSOCKET_SERVER_URL;
            if(userStore && websocketUrl) {
                getConnectToken().then((res) => {
                    const options = {
                        auth: {
                            token: res.data.access_token
                        },
                        parser: JsonParser
                    };
    
                    const socketConnection = io(websocketUrl ? websocketUrl : '127.0.0.1', options);
    
                    socketConnection.on('error', (err) => {
                        console.log(err);
                    });
                    
                    // implemented else-where in the code
                    socketConnection.on('message', (message) => {
                        console.log(message.data);
                    });
                
                    socketConnection.on('channel_joined', (message) => {
                        console.log(message);
                        // channels.push(message.channel);
                        // TODO: add channel to channels array
                    });

                    socketConnection.on('channel_left', (message) => {
                        console.log(message);
                    });
                    
                    socketConnection.on('connect', () => {
                        setConnection(socketConnection);
                        console.log('connected to server!');
                
                        getExchangeAccounts().then((res) => {
                            // if(res.data.length) {
                            //     for(let iA in res.data) {
                            //         socketConnection.emit('join_channel', 'EXCHANGE_ACCOUNT_DATA:TRADE_UPDATE:' + res.data[iA].id);
                            //     }
                            // }
                        });
                        
                        // const symbol = 'ETH-USDT';
                        // socketConnection.emit('join_channel', 'EXCHANGE_DATA:ORDER_UPDATE:' + symbol);
                        // socketConnection.emit('join_channel', 'EXCHANGE_DATA:ORDERBOOK_UPDATE:' + symbol);
                        // socketConnection.emit('join_channel', 'EXCHANGE_DATA:KLINE_UPDATE:' + symbol);
                    });
                
                    socketConnection.on('disconnect', () => {
                        setConnection(null);
                        console.log('disconnect from server');
                        // socketConnection.close();
                    });
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [userStore]);

    return (
        <WebSocketContext.Provider value={connection}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = (): Socket | null => {
    const ctx = useContext(WebSocketContext);

    if (ctx === undefined) {
        throw new Error('useWebsocket can only be used inside WebsocketContext');
    }
    
    return ctx;
};

export default WebSocketProvider;