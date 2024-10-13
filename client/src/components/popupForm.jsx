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

const PopupFrom = ({ open, setOpen }) => {
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
            sx={{ height: "100%" }}
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    console.log(formJson)
                }
            }}
        >
            <DialogTitle>Add movie details</DialogTitle>
            <DialogContent>
                <TextField sx={{ marginBottom: "1rem" }} fullWidth autoFocus required label="Movie name" name="movie_name" />
                <TextField sx={{ marginBottom: "1rem" }} fullWidth required label="Studio name" name="studio_name" />
                <TextField sx={{ marginBottom: "1rem" }} fullWidth required label="Director name" name="director_name" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField sx={{ marginBottom: "1rem" }} required label="Release date" name="release_date" format="YYYY-MM-DD" />
                </LocalizationProvider>
                <TextField fullWidth required label="Collection amount" name="collection_amt" />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
                <CustomButton type="submit" variant="contained">Add Movie</CustomButton>
            </DialogActions>
        </Dialog>
    )
}

export default PopupFrom