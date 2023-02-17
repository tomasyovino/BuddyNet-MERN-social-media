import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const NotFoundPage = () => {
    const { palette } = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: palette.background.alt,
            }}
        >
            <Typography variant="h1" style={{ color: palette.neutral.dark }}>
                404
            </Typography>
            <Typography variant="h6" style={{ color: palette.neutral.dark }}>
                The page you’re looking for doesn’t exist.
            </Typography>
            <Button 
                variant="contained" 
                style={{
                    backgroundColor: palette.primary.main,
                    color: palette.neutral.dark,
                    fontWeight: "600",
                    "&:hover": { color: palette.primary.main }
                }}
                onClick={() => {
                    navigate("/");
                    navigate(0);
                }}
            >
                <KeyboardBackspaceIcon sx={{ fontSize: "2rem" }} />
            </Button>
        </Box>
    );
}

export default NotFoundPage;