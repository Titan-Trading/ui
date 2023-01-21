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

interface Parameter {
    type: string,
    key: string,
    value: any
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
                    foundAccounts.push(account.exchange.name + ' - ' + account.api_key);
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
        if(typeof event === 'undefined' || typeof event.currentTarget === 'undefined' || typeof event.currentTarget.value === 'undefined') {
            return;
        }

        const params = JSON.parse(JSON.stringify(sessionParameters));

        params[index].value = event.currentTarget.value;

        setSessionParameters(params);
    };

    // event handler for when an input is changed
    const onSymbolInputChange = (index: any, value: any) => {
        const params = JSON.parse(JSON.stringify(sessionParameters));

        const selectedSymbolParts = value.split(' - ');
        symbols.forEach((symbol: any, index: number) => {
            if(symbol.base_currency.name === selectedSymbolParts[0] && symbol.target_currency.name === selectedSymbolParts[1]) {
                params[index].value = symbolOptions[index];
            }
        });

        setSessionParameters(params);
    };

    // render session parameter components
    const renderSessionParameters = () => {
        let parameters = Array<any>([]);

        sessionParameters.forEach((param, index) => {
            switch(param.type) {
                case 'string':
                    parameters.push(<TextInput
                        key={(index + 1)}
                        label={param.key}
                        value={sessionParameters[index].value}
                        onChange={onTextInputChange.bind(this, index)}
                    />);
                    break;
                case 'integer':
                    parameters.push(<TextInput
                        key={(index + 1)}
                        label={param.key}
                        value={sessionParameters[index].value}
                        onChange={onTextInputChange.bind(this, index)}
                    />);
                    break;
                case 'symbol':
                    parameters.push(<Autocomplete
                        key={(index + 1)}
                        label={param.key}
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
            if(account.api_key === selectedKey) {
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
            else if(param.type === 'integer') {
                param.value = parseFloat(param.value);
            }
        });

        const newSession: any = {};
        newSession.bot_id = projectId;
        newSession.name = sessionName;
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
                {/* Project name */}
                <h3 style={{marginTop: '0'}}>Project: {project?.name}</h3>

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
                                if(account.api_key === selectedKey) {
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
                        <Text style={{marginTop: '12px'}}>Strategy Parameters</Text>
                        {renderSessionParameters()}
                    </> : <></>}

                    <Button style={{marginTop: '12px'}} type="submit">Start backtesting</Button>
                </form>
                
            </>}
        </>
    )
};

export default BacktestSetup;