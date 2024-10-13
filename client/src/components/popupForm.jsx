import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { green } from '@mui/material/colors';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { handleAddData, handleUpdateData } from '../utils/CRUD';

const PopupFrom = ({ open, setOpen, setData, data, isAdd }) => {
    const handleClose = () => {
        setOpen(false)

    }

    const CustomButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(green['A400']),
        backgroundColor: green['A400'],
        '&:hover': {
            backgroundColor: green['A700'],
        },
    }));
    return (
        <Dialog
            sx={{ height: "100%", margin: 0 }}
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    if (isAdd) {
                        handleAddData({ newdata: formJson, setData: setData })
                    } else {
                        const ID = data.id
                        handleUpdateData({ id: ID, updatedData: formJson, setData: setData })
                    }
                    setOpen(false)
                }
            }}
        >
            <DialogTitle >Movie details</DialogTitle>
            <DialogContent>
                <TextField
                    sx={{ marginBottom: "1rem", marginTop: "1rem" }}
                    defaultValue={data == undefined ? undefined : data["movie_name"]}
                    fullWidth
                    autoFocus
                    required
                    label="Movie name"
                    name="movie_name" />
                <TextField
                    sx={{ marginBottom: "1rem" }}
                    defaultValue={data == undefined ? undefined : data["studio_name"]}
                    fullWidth
                    required
                    label="Studio name"
                    name="studio_name" />
                <TextField
                    sx={{ marginBottom: "1rem" }}
                    defaultValue={data == undefined ? undefined : data["director_name"]}
                    fullWidth
                    required
                    label="Director name"
                    name="director_name" />
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField sx={{ marginBottom: "1rem" }}
                            defaultValue={data == undefined ? undefined : dayjs(data["release_date"])}
                            required label="Release date"
                            name="release_date"
                            format="YYYY-MM-DD" />
                    </LocalizationProvider>
                    <TextField
                        defaultValue={data == undefined ? undefined : data["collection_amt"]}
                        // fullWidth
                        required
                        label="Collection amount"
                        name="collection_amt" />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
                {
                    isAdd ?
                        <CustomButton type="submit" variant="contained">Add Movie</CustomButton>
                        : <Button type="submit" variant="contained" color="primary">Update Movie</Button>
                }
            </DialogActions>
        </Dialog >
    )
}

export default PopupFrom