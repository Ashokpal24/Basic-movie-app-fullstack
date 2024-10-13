import * as React from 'react'
import "./style.css"
import { useState } from 'react';
import { Typography } from '@mui/material';

const yearOptions = [];
const currentYear = new Date().getFullYear();

for (let year = currentYear; year >= 1900; year--) {
    yearOptions.push(year);
}

export default function YearPicker({ handleSetYearIntr }) {

    const [selectedYear, setSelectedYear] = useState(currentYear);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        console.log(event.target.value)
        handleSetYearIntr({ year: event.target.value })
        // console.log(`Selected year: ${event.target.value}`);
    };

    return (
        <div style={{ width: "250px", display: 'flex', flexDirection: "row", justifyContent: "space-around" }}>
            <Typography component={'p'}>Select Year</Typography>
            <select id="year" name="year" value={selectedYear} onChange={handleYearChange}>
                <option value="" disabled>
                    -- Choose Year --
                </option>
                {yearOptions.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div >
    );
}