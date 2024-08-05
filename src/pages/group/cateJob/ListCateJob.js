import { useSnackbar } from 'notistack';
import useLocales from '../../../hooks/userLocales';
import useSettings from '../../../hooks/useSettings'
import { useDispatch, useSelector } from '../../../redux/store';
import { useEffect, useState } from 'react';
import { getCateJobs, setCateJobSearch } from '../../../redux/slices/group.cateJob';
import { method, property, size } from 'lodash';
import { deleteCateJobAPI } from '../../../service/group.cateJob.service';
import { FormProvider, useForm } from 'react-hook-form';
import Page from '../../../components/Page';
import { Button, Container } from '@mui/material';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../../../components/Iconify';

export default function SituationList(){
    const {translate} = useLocales();
    const {themeStretch} = useSettings();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const TABLE_HEAD = [
        {id: 'id', label: translate('group.cateJob.id'), alignRight: false, checked: true, sort: true},
        {id: 'name', label: translate('group.cateJob.name'), alignRight: false, checked: true, sort: true},
        {id: 'enabled', label: translate('group.cateJob.enabled'), alignRight: false, checked: true, sort: true},
        {id: '', label: translate('label.actions'), alignRight: true, checked: true, sort: false}
    ];
    const {cateJobs, totalElements, numberOfElement, search, error} = useSelector((state) => state.mediaCateJob);
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const [openFilter, setOpenFilter] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(getCateJobs());
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]);// eslint-disable-line react-hooks/exhaustive-deps

    //sap xep
    const handleRequestSort = (property) => {
        const isAsc = search.orders[0].property === property && search.orders[0].order === 'asc';
        const order = (isAsc ? 'desc' : 'asc');

        dispatch(setCateJobSearch({
            ...search, orders: [
                {
                    order,
                    property
                }
            ]
        }));
    };

    const handleSelectAllClick = (checked) => {
        if(checked){
            const selected = cateJobs.map((n) => n.id);
            setSelected(selected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if(selectedIndex === -1){
            newSelected = newSelected.concat(selected, id);
        } else if(selectedIndex === 0){
            newSelected = newSelected.concat(selected.slice(1));
        } else if(selectedIndex === selected.length - 1){
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if(selectedIndex > 0){
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };
    
    const handleChangeRowsPerPage = (event) => {
        dispatch(setCateJobSearch({
            ...search, page: 0, size: parseInt(event.target.value, 10)
        }));
    };

    const handleChangePage = (page) => {
        dispatch(setCateJobSearch({
            ...search, page
        }));
    };

    const handleFilterByName = (value) => {
        dispatch(setCateJobSearch({
            ...search, value
        }));
    };

    const handleDeleteItem = async (id) => {
        setOpen(true);
        setSelectedId(id);
    };

    const confirmDeleteItem = async () => {
        let resp;
        if(selected.length > 0){
            resp = await deleteCateJobAPI(selected);
        }else{
            resp = await deleteCateJobAPI(selectedId)
        }
        handleDeleteResponse(resp);
    }

    const handleDeleteItems = async () => {
        setOpen(true);
    };

    const handleDeleteResponse = (resp) => {
        setOpen(false);
        if(resp.code ==="200"){
            enqueueSnackbar(translate('message.deleteSuccess'), {variant: 'success'});
            dispatch(getCateJobs);
            setSelected([]);
        }else{
            enqueueSnackbar(`${resp.code} = ${resp.message}`, {variant: 'error'});
        }
    };

    const defaultValues = {
        checkedColumns: TABLE_HEAD.filter(item => item.checked).map(item => item.label),
    };
    
    const methods = useForm({
        defaultValues,
    })

    const {reset, watch} = methods;

    const {checkedColumns} = watch();

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleResetFilter = () => {
        reset();
        handleCloseFilter();
    }
    return(
        <Page title={translate('group.cateJob.listCateJob')}>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading={translate('group.cateJob.listCateJob')}
                    links={[
                        {name: translate('menu.dashboard'), href: PATH_DASHBOARD.root},
                        {
                            name: translate('menu.group'),
                            href: PATH_DASHBOARD.group.root,
                        },
                        {name: translate('menu.cateJob')}
                    ]}
                    action={
                        <Button
                            variant='contained'
                            component={RouterLink}
                            to={PATH_DASHBOARD.cateJob.new}
                            startIcon={<Iconify icon={'eva:plus-fill'} />}
                            >
                                {translate('button.new')}
                        </Button>
                    }
                />

                <FormProvider methods={methods}>
                    <Table
                </FormProvider>
            </Container>
        </Page>
    )
}