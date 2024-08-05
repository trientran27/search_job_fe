import { useSnackbar } from "notistack";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useLocales from "../../../hooks/userLocales";
import * as Yup from 'yup';
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import { update } from "lodash";
import { updateCateJobAPI } from "../../../service/group.cateJob.service";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { Button, Card, Grid, Stack } from "@mui/material";
import RHFTextField from "../../../components/hook-form/RHFTextField";
import Iconify from "../../../components/Iconify";
import { LoadingButton } from "@mui/lab";


export default function CateJobEditForm({ isEdit, isView, currentItem }) {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();
    const { translate } = useLocales();

    const NewItemSchema = Yup.object().shape({
        id: Yup.string().required(translate('validation.required')),
        name: Yup.string().required(translate('validation.required')),
        enabled: Yup.number().required(translate('validation.required')),
    });

    const defaultValues = useMemo(
        () => ({
            name: currentItem?.name || '',
            enabled: currentItem?.enabled ? 1 : 0 || 1,
            id: currentItem?.id || '',
        }),
        [currentItem]
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
        const resp = await updateCateJobAPI(data);

        if (resp.code === '200') {
            reset();
            enqueueSnackbar(translate('message.updateSuccess'));
            navigate(PATH_DASHBOARD.cateJob.list);
        } else {
            enqueueSnackbar(`${resp.code} - ${resp.message}`, { variant: 'error' });
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <RHFTextField name="id" label={translate('group.cateJob.id')} disabled />
                            <RHFTextField name="name" label={translate('group.cateJob.name')} disabled={isView} />
                            <RHFTextField name="enabled" value={currentItem?.enabled ? 1 : 0 ?? null} label={translate('group.cateJob.enabled')} disabled={isView} />
                        </Stack>
                    </Card>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Stack spacing={3}>
                        {
                            isView ? (<Button
                                variant="contained"
                                component={RouterLink}
                                to={PATH_DASHBOARD.cateJob.edit(currentItem.id)}
                                size="large"
                                startIcon={<Iconify icon={'eva:edit-fill'} />}
                            >
                                {translate('button.edit')}
                            </Button>) : (<LoadingButton type="submit" variant="contrained" size="large" loading={isSubmitting}
                            >
                                {!isEdit ? translate('button.new') : translate('button.save')}
                            </LoadingButton>)
                        }
                    </Stack>
                </Grid>
            </Grid>
        </FormProvider>
    )
}