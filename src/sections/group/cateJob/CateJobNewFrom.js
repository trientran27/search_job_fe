import { useSnackbar } from 'notistack';
import { Card, Grid, Stack, Typography, useStepperContext } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import useLocales from '../../../hooks/userLocales';
import { useMemo } from 'react';
import { createCateJobAPI } from '../../../service/group.cateJob.service';
import { PATH_DASHBOARD } from '../../../routes/paths';
//component
import { FormProvider, RHFTextField } from '../../../components/hook-form/FormProvider';
import { LoadingButton } from '@mui/lab';

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

export default function CateJobNewForm() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { translate } = useLocales();

    const NewItemSchema = Yup.object().shape({
        name: Yup.string().nullable().required(translate('validation.required')),
        enabled: Yup.number().required(translate('validation.required')),

    });

    const defaultValues = useMemo(
        () => ({
            name: '',
            enabled: 1,
            id: '',
        }),
        []
    );

    const methods = useForm({
        resolver: yupResolver(NewItemSchema),
        defaultValues,
    });

    const {
        reset,
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
        const resp = await createCateJobAPI(data);

        if (resp.code === '200') {
            reset();
            enqueueSnackbar(translate('message.createSuccess'));
            navigate(PATH_DASHBOARD.cateJob.list);
        } else {
            enqueueSnackbar(`${resp.code} - ${resp.message}`, { variant: 'error' });
        }
    }
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <RHFTextField name="name" label={translate('group.cateJob.name')} />

                            <RHFTextField name="enabled" label={translate('group.cateJob.enabled')} />
                        </Stack>
                    </Card>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Stack spacing={3}>
                        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                            {translate('button.new')}
                        </LoadingButton>
                    </Stack>
                </Grid>
            </Grid>
        </FormProvider>
    );
}