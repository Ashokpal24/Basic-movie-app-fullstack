import React, { useEffect, useState } from 'react';
import SearchBar from './components/searchBar';
import DataTable from './components/dataTable';
import axios from 'axios';
import getMovieURL from './urls';
import { Box, Typography } from '@mui/material';
import YearPicker from './components/yearPicker';

const App = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(getMovieURL).
            then(data => {
                setData(data.data)
                console.log(data)
            }).
            catch(err => console.log(err))
    }, [])
    return (
        <Box sx={{
            height: "90vh",
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
                    width: "100vw",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginBottom: "2rem",
                }}>
                <YearPicker />
            </Box>
            <DataTable data={data} />
        </Box >
    );
};

export default App;
