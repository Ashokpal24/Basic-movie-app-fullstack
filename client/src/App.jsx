import React, { useEffect, useState } from 'react';
import SearchBar from './components/searchBar';
import DataTable from './components/dataTable';
import YearPicker from './components/yearPicker';
import PopupFrom from './components/popupForm';
import { handleGetDate, handleSetYear } from './utils/CRUD';

import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';


const App = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(open)

    useEffect(() => {
        handleGetDate({ setData })
    }, [])

    const handleSetYearIntr = ({ year }) => {
        console.log(year)
        handleSetYear({ year, setData })
    }
    return (
        <Box sx={{
            height: "95vh",
            width: "100%",
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'flex-start',
            alignItems: 'center'
        }} >

            <Box
                sx={{
                    width: "80%",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginBottom: "2rem",
                }}>
                <Typography sx={{
                    // marginLeft: "1rem",
                    alignSelf: 'flex-start'
                }} variant="h4" >Movie API 🎞️</Typography>
                <SearchBar />
            </Box>
            <Box
                sx={{
                    width: "70%",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: "2rem",
                }}>
                <YearPicker handleSetYearIntr={handleSetYearIntr} />
            </Box>
            <Box
                sx={{
                    width: "70%",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: "2rem",
                }}>
                <Button variant='contained' color="primary" onClick={() => setOpen(true)}><Add /> Add Movie</Button>
                <PopupFrom open={open} setOpen={setOpen} />
            </Box>
            <DataTable data={data} setData={setData} />
        </Box >
    );
};

export default App;
