import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    useTheme,
    CircularProgress
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import UserImage from "./UserImage";

const UpdateUserForm = ({ setOpen }) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const updateSchema = yup.object().shape({
        firstName: yup.string(),
        lastName: yup.string(),
        email: yup.string().email("invalid email"),
        password: yup.string(),
        location: yup.string(),
        occupation: yup.string(),
        picture: yup.string(),
    });

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        location: "",
        occupation: "",
        picture: "",
    };

    const handleImageDrop  = (acceptedFiles) => {
        if(imagePreview !== "") {
            URL.revokeObjectURL(imagePreview);
            setImagePreview(URL.createObjectURL(acceptedFiles));
        } else {
            setImagePreview(URL.createObjectURL(acceptedFiles));
        };
    };

    const updateUser = async (values, onSubmitProps) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            for(let value in values) {
                if(values[value] !== "") formData.append(value, values[value]);
            };
            if(values.picture) formData.append("picturePath", values.picture.name);

            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/users/${user._id}`,
                {
                    method: "PUT",
                    body: formData
                }
            );
            const savedUser = await savedUserResponse.json();
            onSubmitProps.resetForm();

            if(savedUser) {
                dispatch(setUser({user: savedUser}));
                setOpen(false);;
            };
        } catch(err) {
            console.log(err);
        } finally {
            URL.revokeObjectURL(imagePreview);
            setImagePreview("");
            setIsLoading(false);
        };
    };

    return (
        <Formik
            onSubmit={updateUser}
            initialValues={initialValues}
            validationSchema={updateSchema}
        >
            {
                ({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue
                }) => (
                    <form onSubmit={handleSubmit} autoComplete="off">
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
                                borderRadius="50%"
                            >
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) => {
                                        setFieldValue("picture", acceptedFiles[0]);
                                        handleImageDrop(acceptedFiles[0]);
                                    }}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            sx={{ "&:hover": { cursor: "pointer" }}}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                                <Box position="relative" width="100px" height="100px" borderRadius="50%">
                                                    <UserImage image={user.picturePath} size={"100px"} />
                                                    <Add style={{ position: "absolute", bottom: "0", left: "0", width: "100%", height: "100%", borderRadius: "50%", backgroundColor: "rgba(191, 191, 191, .5)", fontSize: "12px" }} />
                                                </Box>
                                            ) : (
                                                <Box position="relative" width="100px" height="100px" borderRadius="50%">
                                                    <img src={imagePreview}  style={{ objectFit: "cover", borderRadius: "50%" }}  width="100px" height="100px" alt="Preview" />
                                                    <Edit style={{ position: "absolute", bottom: "0px", right: "-3px",  }} />
                                                </Box>
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
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
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
                                    onClick={() => {
                                            URL.revokeObjectURL(imagePreview);
                                            setImagePreview("");
                                            setOpen(false);
                                    }}
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
                                    type="submit"
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