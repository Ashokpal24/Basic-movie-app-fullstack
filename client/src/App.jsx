import React, { useEffect, useState } from 'react';
import SearchBar from './components/searchBar';
import DataTable from './components/dataTable';
import YearPicker from './components/yearPicker';
import PopupFrom from './components/popupForm';
import { handleGetData, handleSetYear } from './utils/CRUD';

import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';


const App = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(undefined)
    const [isAdd, setIsAdd] = useState(true)

    useEffect(() => {
        handleGetData({ setData })
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
            </Box>
            {/* <Box
                sx={{
                    width: "70%",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: "2rem",
                }}>
                
            </Box> */}
            <Box
                sx={{
                    width: "70%",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: "2rem",
                }}>
                <Button
                    variant='contained'
                    color="primary" onClick={() => {
                        setSelected(undefined)
                        setIsAdd(true)
                        setOpen(true)
                    }}>
                    <Add /> Add Movie
                </Button>
                <YearPicker handleSetYearIntr={handleSetYearIntr} setData={setData} />
                <SearchBar setData={setData} />
            </Box>
            <DataTable
                data={data}
                setOpen={setOpen}
                setData={setData}
                setSelected={setSelected}
                setIsAdd={setIsAdd}
            />
            <PopupFrom
                open={open}
                setOpen={setOpen}
                setData={setData}
                isAdd={isAdd}
                data={selected}
            />
        </Box >
    );
};

export default App;
