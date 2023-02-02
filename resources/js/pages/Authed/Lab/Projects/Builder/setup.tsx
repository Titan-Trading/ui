import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from 'Paths';
import { setTitle } from 'Redux/layout';
import { Anchor, Autocomplete, Box, Breadcrumbs, Button, NumberInput, Text, TextInput } from '@mantine/core';
import { getBot } from 'API/bots';
import { DateRangePicker } from '@mantine/dates';
import { getExchangeAccounts } from 'API/exchangeAccounts';
import { createBotSession } from 'API/botSessions';
import { getExchangeSymbols } from 'API/exchanges';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { BiChevronLeft } from 'react-icons/bi';

interface Parameter {
    type: string;
    key: string;
    name: string;
    value: any;
    defaultValue: any;
}

const BacktestSetup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectId } = useParams();
    const { authed } = PATHS;
    const breadCrumbItems = [
        {title: 'Dashboard', href: `/`},
        {title: 'Lab', href: `/lab`},
        {title: 'Project builder', href: `/lab/projects/${projectId}`},
        {title: 'Setup backtest', href: null},
    ];
    const [ breadCrumbs, setBreadCrumbs ] = useState<any>([]);
    const [ project, setProject ] = useState<any>(null);
    const [ symbols, setSymbols ] = useState<any>([]);
    const [ symbolOptions, setSymbolOptions ] = useState<any>([]);
    const [ sessionParameters, setSessionParameters ] = useState<Array<Parameter>>([]);
    const [ sessionName, setSessionName ] = useState<any>('');
    const [ initialBalance, setInitialBalance ] = useState<any>(1000);
    const [ datePickerValue, setDatePickerValue ] = useState<any>([new Date(2022, 11, 1), new Date(2022, 11, 7)]);
    const [ exchangeAccounts, setExchangeAccounts ] = useState<Array<any>>([]);
    const [ exchangeAccountOptions, setExchangeAccountOptions ] = useState<Array<any>>([]);
    const [ selectedExchangeAccount, setExchangeAccount] = useState<any>('');

    useEffect(() => {
        const crumbs = breadCrumbItems.map((item, index) => (
            item.href ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
        ));
        setBreadCrumbs(crumbs);

        dispatch(setTitle(`Project - ${projectId}`));

        if(projectId) {
            // load project details from api
            getBot(parseInt(projectId)).then(({data}) => {
                setProject(data);

                let params = JSON.parse(data.parameter_options);

                // set all values to null
                if(!params.length) {
                    return;
                }

                params = params.map((param: any) => {
                    param.value = '';
                    return param;
                });

                setSessionParameters(params);
            }).catch(e => {
                console.log(e);

                // project is not found redirect to project list view
                navigate(`/lab/projects`);
            });

            // load connected exchanges from api
            getExchangeAccounts().then(({data}) => {
                let foundAccounts: any = [];
                data.forEach((account: any, index: Number) => {
                    foundAccounts.push(account.exchange.name + ' - ' + account.name);
                });

                setExchangeAccountOptions(foundAccounts);
                setExchangeAccounts(data);
            });
        }
        else {
            // project is not found redirect to project list view
            navigate(`/lab/projects`);
        }
    }, []);

    // load symbols from API
    const loadSymbols = (exchangeId: number) => {
        getExchangeSymbols(exchangeId).then(({data}) => {
            let foundSymbols: any = [];
            data.forEach((symbol: any, index: Number) => {
                foundSymbols.push(symbol.base_currency.name + ' - ' + symbol.target_currency.name);
            });

            setSymbols(data);
            setSymbolOptions(foundSymbols);
        });
    };

    // event handler for when a text input is changed
    const onTextInputChange = (index: any, event: any) => {
        // if(typeof event === 'undefined' || typeof event.currentTarget === 'undefined' || typeof event.currentTarget.value === 'undefined') {
        //     return;
        // }

        const params = JSON.parse(JSON.stringify(sessionParameters));

        // console.log('text changed', params);

        params[index].value = event.currentTarget.value;

        // console.log('new text value: ' + params[index].value);

        setSessionParameters(params);
    };

    // event handler for when a number input is changed
    const onNumberInputChanged = (index: any, value: any) => {
        // if(typeof event === 'undefined' || typeof event.currentTarget === 'undefined' || typeof event.currentTarget.value === 'undefined') {
        //     return;
        // }

        const params = JSON.parse(JSON.stringify(sessionParameters));

        // console.log('number changed', params);

        params[index].value = value;

        // console.log('new number value: ' + params[index].value);

        setSessionParameters(params);
    };

    // event handler for when an input is changed
    const onSymbolInputChange = (index: any, value: any) => {
        const params = JSON.parse(JSON.stringify(sessionParameters));

        // console.log('index: ' + index);
        // console.log('value: ' + value);
        // console.log('current param value: ' + params[index].value);

        let foundSymbol: any = null;
        const selectedSymbolParts = value.split(' - ');
        symbols.forEach((symbol: any, sIndex: number) => {
            if(symbol.base_currency.name === selectedSymbolParts[0] && symbol.target_currency.name === selectedSymbolParts[1] && !foundSymbol) {
                foundSymbol = symbolOptions[sIndex];
            }
        });

        params[index].value = foundSymbol ? foundSymbol : value;

        // console.log('new param value: ' + params[index].value);

        setSessionParameters(params);
    };

    // render session parameter components
    const renderSessionParameters = () => {
        let parameters = Array<any>([]);

        // console.log('render strategy parameters:', sessionParameters);

        sessionParameters.forEach((param, index) => {
            // console.log('render parameter:' + index, param);

            switch(param.type) {
                case 'string':
                    parameters.push(<TextInput
                        key={param.key}
                        label={param.name}
                        placeholder={param.defaultValue}
                        value={sessionParameters[index].value}
                        onChange={onTextInputChange.bind(this, index)}
                    />);
                    break;
                case 'integer':
                    parameters.push(<NumberInput
                        key={param.key}
                        label={param.name}
                        placeholder={param.defaultValue}
                        value={sessionParameters[index].value}
                        onChange={onNumberInputChanged.bind(this, index)}
                        precision={0}
                    />);
                    break;
                case 'float':
                    parameters.push(<TextInput
                        key={param.key}
                        label={param.name}
                        placeholder={param.defaultValue}
                        value={sessionParameters[index].value}
                        onChange={onTextInputChange.bind(this, index)}
                    />);
                    break;
                case 'symbol':
                    parameters.push(<Autocomplete
                        key={param.key}
                        label={param.name}
                        value={sessionParameters[index].value}
                        onChange={onSymbolInputChange.bind(this, index)}
                        placeholder="Start typing to see options"
                        data={symbolOptions.length ? symbolOptions : []}
                    />)
                    break;
                default:
                    break;
            }
        });

        return parameters;
    };

    // event handler for when the form is submitted
    const onFormSubmitted = (event: any) => {
        event.preventDefault();

        let selected: any = null;
        const selectedKey = selectedExchangeAccount.split(' - ')[1];
        exchangeAccounts.forEach((account: any, index: number) => {
            if(account.name === selectedKey) {
                selected = account;
            }
        });

        if(!selected) {
            return;
        }

        // if symbol param found, convert form string to id
        const params = JSON.parse(JSON.stringify(sessionParameters));
        params.forEach((param: any, index: number) => {
            if(param.type === 'symbol') {
                const selectedSymbolParts = param.value.split(' - ');
                symbols.forEach((symbol: any, symbolIndex: number) => {
                    if(symbol.base_currency.name === selectedSymbolParts[0] && symbol.target_currency.name === selectedSymbolParts[1]) {
                        param.value = symbol.id;
                        return;
                    }
                });
            }
            else if(param.type === 'float') {
                param.value = parseFloat(param.value);
            }
            else if(param.type === 'integer') {
                param.value = parseInt(param.value);
            }
        });

        const newSession: any = {};
        newSession.bot_id = projectId;
        newSession.name = sessionName;
        newSession.initial_balance = initialBalance;
        newSession.exchange_account_id = selected.id;
        newSession.parameters = JSON.stringify(params);
        newSession.mode = 'backtest';
        newSession.active = true;
        newSession.started_at = new Date(datePickerValue[0]).toISOString().slice(0, 19).replace('T', ' ');
        newSession.ended_at = new Date(datePickerValue[1]).toISOString().slice(0, 19).replace('T', ' ');

        createBotSession(newSession).then(({data}) => {
            navigate(`/lab/projects/${data.bot_id}/backtests/${data.id}`);
        });
    };

    return (
        <>
            {project && <>
                <Link to={`/lab/projects/${projectId}`}><BiChevronLeft /> back  to strategy builder</Link>

                {/* Strategy name */}
                <h3 style={{marginTop: '0'}}>Strategy: {project?.name}</h3>

                {/* Setup a backtest session */}
                <form onSubmit={onFormSubmitted.bind(this)}>
                    {/* General Settings */}
                    <Text>General Settings</Text>
                    <TextInput
                        label="Session name"
                        value={sessionName}
                        onChange={(event) => {
                            const newSessionName = event.currentTarget.value;

                            setSessionName(newSessionName);
                        }}
                    />

                    <NumberInput
                        label="Initial balance"
                        value={initialBalance}
                        onChange={(value) => {
                            const newInitialBalance = value;

                            setInitialBalance(newInitialBalance);
                        }}
                        precision={2}
                    />

                    {/* Connected exchange account to use (auto-complete from API) */}
                    <Autocomplete
                        value={selectedExchangeAccount}
                        onChange={(value) => {
                            setExchangeAccount(value);
                            setSymbolOptions([]);
                            setSymbols([]);

                            if(!value) {
                                return;
                            }

                            let selected: any = null;
                            const selectedKey = value.split(' - ')[1];
                            exchangeAccounts.forEach((account: any, index: number) => {
                                if(account.name === selectedKey) {
                                    selected = account;
                                }
                            });

                            if(!selected) {
                                return;
                            }

                            loadSymbols(selected.exchange_id);
                        }}
                        label="Connect exchange/broker account"
                        placeholder="Start typing to see options"
                        data={exchangeAccountOptions}
                    />

                    {/* Start date/End date */}
                    <DateRangePicker
                        label="Start and end date"
                        placeholder="Pick dates range"
                        value={datePickerValue}
                        onChange={setDatePickerValue}
                    />

                    {/* Strategy Parameters */}
                    {sessionParameters.length ? <>
                        <Text style={{marginTop: '24px'}}>Strategy Parameters</Text>
                        {renderSessionParameters()}
                    </> : <></>}

                    <Button style={{marginTop: '12px'}} type="submit">Start backtesting</Button>
                </form>
                
            </>}
        </>
    )
};

export default BacktestSetup;