import dayjs from 'dayjs';
import * as React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const currentYear = dayjs();

export default function YearPicker() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                sx={{
                    '.MuiPickersYear-yearButton': {
                        borderRadius: "0px"
                    },
                    minWidth: 250
                }}

                label="Years"
                maxDate={currentYear}
                openTo="year"
                views={['year']}
                yearsOrder="desc"
                value={currentYear}
                onChange={(value) => console.log(value)}
            />
        </LocalizationProvider>
    );
}