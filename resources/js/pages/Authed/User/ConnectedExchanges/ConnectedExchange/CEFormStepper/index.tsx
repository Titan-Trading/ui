import React, { useEffect, useState } from 'react';
import { Stepper, Button, Group, Title, Text } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { RiCheckboxCircleLine, RiCloseCircleLine } from 'react-icons/ri';

import ConnectExchange from './Steps/ConnectExchange';
import { isEmpty } from 'ramda';

interface ICEFormStepper {
    formData: any;
    loading: boolean;
    submit: any;
    handleClose: any;
}

const CEFormStepper = ({ formData, loading, submit, handleClose }: ICEFormStepper) => {
    const [ active, setActive ] = useState<number>(0);
    const [ error, setError ] = useState<boolean>(false);
    const { register, handleSubmit, control, formState: { errors }, watch } = useForm();

    const prevStep = () => {
        if (active === 0) {
            handleClose();
        } else {
            setActive(0);
            setError(false);
        }
    };

    const onSubmit = (data: any) => {
        if (!isEmpty(errors)) return;

        setActive(1);
        
        submit(data).then(() => {
            setActive(2);
        }).catch(() => {
            setError(true);
        });
    };


    useEffect(() => {
        if (active === 2) {
            setTimeout(() => {
                handleClose();
            }, 3000);
        }
    }, [ active ]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stepper active={active} onStepClick={setActive} completedIcon={<RiCheckboxCircleLine size={22} />}>
                <Stepper.Step label="Step One" description="Exchange Info">
                    <ConnectExchange
                        control={control}
                        register={register} 
                        errors={errors}
                        watch={watch}
                    />
                </Stepper.Step>
                <Stepper.Step 
                    label="Step Two" 
                    description="Connect Exchange" 
                    allowStepSelect={!isEmpty(formData)}
                    loading={loading}
                    color={error ? 'red' : 'blue'}
                    completedIcon={<RiCheckboxCircleLine size={22} />}
                    icon={error ? <RiCloseCircleLine size={22} /> : '2'}
                >
                    <Group position="center" direction="column">
                        <Title order={3}>
                            {error ? 'Unable to Connect Exchange' : 'Connecting Exchange...'}
                        </Title>
                    </Group>
                </Stepper.Step>
                <Stepper.Completed>
                    <Group position="center" direction="column">
                        <Title order={3}>Exchange Connected!</Title>
                        {active === 2 && (
                            <Text>This will automatically close in 3 seconds</Text>
                        )}
                    </Group>
                </Stepper.Completed>
            </Stepper>

            <Group position="center" mt="xl">
                <Button variant="default" onClick={prevStep} disabled={active === 2}>
                    {active === 0 ? 'Cancel' : 'Back'}
                </Button>
                <Button onClick={handleSubmit(onSubmit)} type="submit" disabled={active !== 0}>
                    Connect Exchange
                </Button>
            </Group>
        </form>
    );
};

export default CEFormStepper;
