import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
    CircularProgress
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const UpdateUserForm = ({ onClose }) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width: 600px)");

    return (
        <Formik
            onSubmit={"handleFormSubmit"}
            initialValues={"initialValues"}
        >
            {
                ({
                    values,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm
                }) => (
                    <form autoComplete="off">
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                            }}
                        >
                            <Box
                                gridColumn="span 4"
                                border={`1px solid ${palette.neutral.medium}`}
                                borderRadius="50%"
                                p="1rem"
                            >
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) => 
                                        setFieldValue("picture", acceptedFiles[0])
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{ "&:hover": { cursor: "pointer" }}}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                                <p>Add Picture Here</p>
                                            ) : (
                                                <FlexBetween>
                                                    <Typography>{values.picture.name}</Typography>
                                                    <EditOutlinedIcon />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>
                            <TextField 
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField 
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField 
                                label="Location"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.location}
                                name="location"
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField 
                                label="Occupation"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.occupation}
                                name="occupation"
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField 
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField 
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>

                        {/* BUTTONS */}
                        <Box>
                            <FlexBetween>
                                <Button 
                                    onClick={onClose} 
                                    sx={{
                                        m: "2rem 0",
                                        p: "1rem",
                                        backgroundColor: palette.background.alt,
                                        color: palette.primary.main,
                                        "&:hover": { color: palette.background.alt }
                                    }}
                                >
                                    Close
                                </Button>
                                <Button 
                                    onClick={"handleClose"} 
                                    sx={{
                                        m: "2rem 0",
                                        p: "1rem",
                                        backgroundColor: palette.primary.main,
                                        color: palette.background.alt,
                                        "&:hover": { color: palette.primary.main }
                                    }}
                                >
                                    { isLoading ? <CircularProgress /> : "Update" }
                                </Button>
                            </FlexBetween>
                        </Box>
                    </form>
                )
            }
        </Formik>
    );
};

export default UpdateUserForm;