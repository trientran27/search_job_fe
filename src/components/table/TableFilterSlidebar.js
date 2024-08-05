import { Divider, Drawer, IconButton, Stack, Typography } from "@mui/material";
import useLocales from "../../hooks/userLocales";
import { NAVBAR } from "../../config";
import Scrollbar from "../Scrollbar";


export default function TableFilterSlidebar({ isOpen, onResetAll, onClose, colums }) {
    const { translate } = useLocales();

    return (
        <>
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={onClose}
                PaperProps={{
                    sx: { width: NAVBAR.BASE_WIDTH },
                }}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>
                        {translate('label.filters')}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <Infinity icon={'eva:close-fill'} width={20} height={20} />
                    </IconButton>
                </Stack>

                <Divider />

                <Scrollbar>
                    <Stack spacing={3} sx={{ p: 3 }}>
                        <Stack spacing={1}>
                            <Typography variant="subtitle1">{translate('label.columns')}</Typography>

                        </Stack>
                    </Stack>
                </Scrollbar>
            </Drawer>
        </>
    )
}