import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from 'Paths';
import { setTitle } from 'Redux/layout';
import { Anchor, Autocomplete, Box, Breadcrumbs, Button, NumberInput, Text, TextInput } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { getExchangeAccounts } from 'API/exchangeAccounts';
import { getExchangeSymbols } from 'API/exchanges';
import { getIndicator } from 'API/indicators';
import { createIndicatorTest } from 'API/indicatorTest';
import { Link } from 'react-router-dom';

interface Parameter {
    type: string,
    key: string,
    value: any
}

const IndicatorTestSetup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { indicatorId } = useParams();
    const { authed } = PATHS;
    const breadCrumbItems = [
        {title: 'Dashboard', href: `/`},
        {title: 'Lab', href: `/lab`},
        {title: 'Indicator builder', href: `/indicators/${indicatorId}`},
        {title: 'Setup test', href: null},
    ];
    const [ breadCrumbs, setBreadCrumbs ] = useState<any>([]);
    const [ indicator, setProject ] = useState<any>(null);
    const [ symbols, setSymbols ] = useState<any>([]);
    const [ symbolOptions, setSymbolOptions ] = useState<any>([]);
    const [ parameters, setParameters ] = useState<Array<Parameter>>([]);
    const [ name, setName ] = useState<any>('');
    const [ datePickerValue, setDatePickerValue ] = useState<any>([new Date(2022, 11, 1), new Date(2022, 11, 7)]);
    const [ exchangeAccounts, setExchangeAccounts ] = useState<Array<any>>([]);
    const [ exchangeAccountOptions, setExchangeAccountOptions ] = useState<Array<any>>([]);
    const [ selectedExchangeAccount, setExchangeAccount] = useState<any>('');

    useEffect(() => {
        const crumbs = breadCrumbItems.map((item, index) => (
            item.href ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
        ));
        setBreadCrumbs(crumbs);

        dispatch(setTitle(`Indicator - ${indicatorId}`));

        if(indicatorId) {
            // load indicator details from api
            getIndicator(parseInt(indicatorId)).then(({data}) => {
                setProject(data);

                let params = JSON.parse(data.parameter_options);

                // set all values to null
                params = params.map((param: any) => {
                    param.value = '';
                    return param;
                });

                setParameters(params);
            }).catch(e => {
                console.log(e);

                // indicator is not found redirect to indicator list view
                navigate(`/indicators`);
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
            navigate(`/projects`);
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

        const params = JSON.parse(JSON.stringify(parameters));

        params[index].value = event.currentTarget.value;

        setParameters(params);
    };

    // event handler for when an input is changed
    const onSymbolInputChange = (index: any, value: any) => {
        const params = JSON.parse(JSON.stringify(parameters));

        const selectedSymbolParts = value.split(' - ');
        symbols.forEach((symbol: any, index: number) => {
            if(symbol.base_currency.name === selectedSymbolParts[0] && symbol.target_currency.name === selectedSymbolParts[1]) {
                params[index].value = symbolOptions[index];
            }
        });

        setParameters(params);
    };

    // render session parameter components
    const renderSessionParameters = () => {
        let newParameters = Array<any>([]);

        parameters.forEach((param, index) => {
            switch(param.type) {
                case 'string':
                    newParameters.push(<TextInput
                        key={(index + 1)}
                        label={param.key}
                        value={parameters[index].value}
                        onChange={onTextInputChange.bind(this, index)}
                    />);
                    break;
                case 'integer':
                    newParameters.push(<TextInput
                        key={(index + 1)}
                        label={param.key}
                        value={parameters[index].value}
                        onChange={onTextInputChange.bind(this, index)}
                    />);
                    break;
                case 'symbol':
                    newParameters.push(<Autocomplete
                        key={(index + 1)}
                        label={param.key}
                        value={parameters[index].value}
                        onChange={onSymbolInputChange.bind(this, index)}
                        placeholder="Start typing to see options"
                        data={symbolOptions.length ? symbolOptions : []}
                    />)
                    break;
                default:
                    break;
            }
        });

        return newParameters;
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
        const params = JSON.parse(JSON.stringify(parameters));
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

        const newTest: any = {};
        newTest.bot_id = 1;
        newTest.indicator_id = indicatorId;
        newTest.name = name;
        newTest.exchange_account_id = selected.id;
        newTest.bot_parameters = JSON.stringify(params);
        newTest.indicator_parameters = JSON.stringify(params);
        newTest.active = true;
        newTest.started_at = datePickerValue[0].toISOString().slice(0, 19).replace('T', ' ');
        newTest.ended_at = datePickerValue[1].toISOString().slice(0, 19).replace('T', ' ');

        console.log(newTest);

        createIndicatorTest(newTest).then(({data}) => {
            navigate(`/indicators/${data.indicator_id}/tests/${data.id}`);
        });
    };

    return (
        <>
            <Breadcrumbs className="breadcrumb-container">{breadCrumbs}</Breadcrumbs>

            {(indicator && parameters.length) && <>
                {/* Indicator name */}
                <h3 style={{marginTop: '0'}}>Indicator: {indicator?.name}</h3>

                {/* Setup a backtest session */}
                <form onSubmit={onFormSubmitted.bind(this)}>
                    {/* General Settings */}
                    <Text>General Settings</Text>
                    <TextInput
                        label="Name"
                        value={name}
                        onChange={(event) => {
                            const newName = event.currentTarget.value;

                            setName(newName);
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

                    {/* Indicator Parameters */}
                    <Text style={{marginTop: '12px'}}>Indicator Parameters</Text>
                    {renderSessionParameters()}

                    <Button style={{marginTop: '12px'}} type="submit">Start test</Button>
                </form>
                
            </>}
        </>
    )
};

export default IndicatorTestSetup;