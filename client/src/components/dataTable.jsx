import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    tableCellClasses,
    TablePagination,
    Paper,
    IconButton
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import dateFormatter from '../utils/dateFormatter';
import PopupFrom from './popupForm';
import { handleDelete } from '../utils/CRUD';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    '&:last-child td,  &:last-child th': {
        border: 0,
    }
}))


const DataTable = ({ data, setOpen, setData, setSelected, setIsAdd }) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(2)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };


    // Movie Name | Release Date | Studio Name | Director Name | Collection
    return (
        <Paper sx={{ width: '70%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: "279px", scrollbarGutter: "stable" }}>
                <Table stickyHeader aria-label="Movie Data" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Edit</StyledTableCell>
                            <StyledTableCell>Delete</StyledTableCell>
                            <StyledTableCell>Movie Name</StyledTableCell>
                            <StyledTableCell>Release Date</StyledTableCell>
                            <StyledTableCell>Studio Name</StyledTableCell>
                            <StyledTableCell>Director Name</StyledTableCell>
                            <StyledTableCell>Collection</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length > 0 && data.
                            slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).
                            map((row) => {
                                const formatDate = dateFormatter({ newDate: row.release_date })
                                return (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell>
                                            <IconButton onClick={() => {
                                                setSelected(data.filter(r => r.id == row.id)[0])
                                                setOpen(true)
                                                setIsAdd(false)
                                            }} >
                                                <Edit sx={{ color: '#1c54b2' }} />
                                            </IconButton>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <IconButton onClick={() => {
                                                handleDelete({ id: row.id, setData: setData })
                                            }}>
                                                <Delete sx={{ color: '#f50057' }} />
                                            </IconButton>
                                        </StyledTableCell>
                                        <StyledTableCell style={{ maxWidth: "190px", minWidth: "190px" }}>{row.movie_name}</StyledTableCell>
                                        <StyledTableCell style={{ maxWidth: "80px", minWidth: "80px" }}>{formatDate}</StyledTableCell>
                                        <StyledTableCell style={{ maxWidth: "100px", minWidth: "100px" }}>{row.studio_name}</StyledTableCell>
                                        <StyledTableCell style={{ maxWidth: "100px", minWidth: "100px" }}>{row.director_name}</StyledTableCell>
                                        <StyledTableCell style={{ maxWidth: "80px", minWidth: "80px" }}>{row.collection_in_words}</StyledTableCell>
                                    </StyledTableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer >
            <TablePagination
                sx={{ backgroundColor: '#1565c0', color: "white" }}
                rowsPerPageOptions={[2, 5, { value: data.length, label: "All" }]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper >
    )
}
export default DataTable