import { Modal, Box, useTheme } from "@mui/material";
import UpdateUserForm from "components/UpdateUserForm";

const ModalWidget = ({ open, setOpen }) => {
    const handleClose = () => setOpen(false);
    const { palette } = useTheme();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 400,
        bgcolor: palette.background.alt,
        border: `2px solid ${palette.background.alt}`,
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <UpdateUserForm onClose={handleClose} />
            </Box>
        </Modal>
    );
};

export default ModalWidget;