import * as React from 'react'
import "./style.css"
import { useState, useRef, useEffect } from 'react';
import { Button, Box, IconButton, Typography } from '@mui/material';
import { Restore, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { handleGetData } from '../utils/CRUD';
import Grid from '@mui/material/Grid2';
// const yearOptions = [];

// for (let year = currentYear; year >= 1900; year--) {
//     yearOptions.push(year);
// }
const currentYear = new Date().getFullYear();


export default function YearPicker({ handleSetYearIntr, setData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState('');
    const [decade, setDecade] = useState(2024);
    const pickerRef = useRef(null);
    const yearOptions = [];

    for (let year = decade; year >= decade - 11; year--) {
        yearOptions.push(year);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleYearChange = (year) => {
        setSelectedYear(year);
        console.log(year)
        handleSetYearIntr({ year: year })
        // console.log(`Selected year: ${event.target.value}`);
    };

    const handlePrevDecade = () => setDecade(Math.max(decade - 10, 1911));
    const handleNextDecade = () => setDecade(Math.min(decade + 10, currentYear));

    return (
        <div className='relative' ref={pickerRef}>
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <Button
                    sx={{ width: "9rem" }}
                    variant='contained'
                    onClick={() => setIsOpen(!isOpen)}>
                    {selectedYear == '' ? "Select date" : selectedYear}
                </Button>
                <IconButton onClick={() => {
                    handleGetData({ setData: setData })
                    setSelectedYear('')
                }}>
                    <Restore sx={{ color: "red" }} />
                </IconButton>
            </div>

            {
                isOpen && (
                    <div style={{
                        position: 'absolute',
                        zIndex: 10,
                        marginTop: '1rem',
                        marginLeft: '1rem',
                        width: "16rem",
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid black'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: "center",
                            // padding: '1rem',
                        }}>
                            <IconButton onClick={() => handlePrevDecade()}>
                                <NavigateBefore />
                            </IconButton>
                            <Typography>{decade - 11} - {decade}</Typography>
                            <IconButton onClick={() => handleNextDecade()}>
                                <NavigateNext />
                            </IconButton>
                        </div>
                        <Box sx={{ padding: "1rem" }}>
                            <Grid container spacing={2}>
                                {yearOptions.map((year) => (
                                    <Grid key={year} size={4}>
                                        <Button
                                            onClick={() => handleYearChange(year)}
                                            sx={{
                                                backgroundColor: selectedYear == year ? "#1565c0" : "white",
                                                color: selectedYear == year ? "white" : "#1565c0"
                                            }}
                                            variant='outlined'
                                        >
                                            {year}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </div>
                )
            }
        </div >
    );

    // ---OLD---
    // return (
    //     <div style={{ width: "250px", display: 'flex', flexDirection: "row", justifyContent: "space-around" }}>
    //         <Typography component={'p'}>Select Year</Typography>
    //         <select id="year" name="year" value={selectedYear} onChange={handleYearChange}>
    //             <option value="" disabled>
    //                 -- Choose Year --
    //             </option>
    //             {yearOptions.map((year) => (
    //                 <option key={year} value={year}>
    //                     {year}
    //                 </option>
    //             ))}
    //         </select>
    //         <IconButton sx={{ width: "48px" }} onClick={() => handleGetData({ setData })}>
    //             <Restore sx={{ color: "red" }} />
    //         </IconButton>
    //     </div >
    // );
}