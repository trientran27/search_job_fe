import { useLocation, useParams } from "react-router-dom";
import useLocales from "../../../hooks/userLocales";
import useSettings from "../../../hooks/useSettings";
import NewForm from "../../../sections/group/cateJob/CateJobNewFrom";
import { Box, Container } from "@mui/material";
import ErrorOccur from "../../../components/ErrorOccur";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import NewForm from "../../../sections/group/cateJob/CateJobNewFrom";
import Page from "../../../components/Page";
import { useSelector } from "../../../redux/store";


export default function SituationCreate() {

    const { themeStretch } = useSettings();
    const { translate } = useLocales();
    const { pathname } = useLocation();
    const { id } = useParams();
    const isEdit = pathname.includes('edit');
    const isView = pathname.includes('view');
    const isNew = !isEdit && !isView;
    const { error, categories } = useSelector((state) => state.mediaCateJob);

    const category = categories.find(c => c.id === parseInt(id, 10));

    const renderForm = () => {
        if (isNew) {
            return <NewForm />
        }
        return error ? <Box sx={{ py: 3 }}>
            <ErrorOccur error={error} />
        </Box> : <EditForm isEdit={isEdit} currentItem={category} isView={isView} />;

    };

    return (
        <Page title={isNew ? translate('group.cateJob.newCateJob') : cateJob?.cateJob}>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading={isNew ? translate('group.cateJob.newCateJob') : cateJob?.cateJob}
                    links={[
                        { name: translate('menu.dashboard'), href: PATH_DASHBOARD.root },
                        {
                            name: translate('menu.group'),
                            href: PATH_DASHBOARD.group.root,
                        },
                        {
                            name: translate('menu.cateJob'),
                            href: PATH_DASHBOARD.role,
                        },
                        { name: isNew ? translate('group.cateJob.newCateJob') : cateJob?.cateJob || '' },
                    ]}
                />
                {renderForm()}
            </Container>
        </Page>
    );
}