import { Modal } from "@mui/material";

const ModalWidget = ({ open, setOpen, children }) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            {
                children
            }
            {/* <Box sx={style}>
                <UpdateUserForm onClose={handleClose} />
            </Box> */}
        </Modal>
    );
};

export default ModalWidget;