import * as React from 'react'
import { styled, alpha, colors } from '@mui/material'
import { Search } from '@mui/icons-material'
import InputBase from '@mui/material/InputBase'
import { useState } from 'react'
import { handleGetNameFilterData } from '../utils/CRUD'

const SearchMain = styled('div')(({ theme }) => ({
    position: "relative",
    width: "50%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.light, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.light, 0.25),
    },
    // marginRight: theme.spacing(2),
    marginLeft: 0
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: "100%",
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1rem + ${theme.spacing(2)})`
    },
}))

const SearchBar = ({ setData }) => {
    const [filter, setFilter] = useState("")
    return (
        <SearchMain>
            <SearchIconWrapper>
                <Search />
            </SearchIconWrapper>
            <StyledInputBase
                value={filter}
                placeholder='Search by Movie|Director|Studio Name'
                onChange={(event) => {
                    setFilter(event.target.value)
                    console.log(event.target.value)
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        handleGetNameFilterData({ filter, setData })
                        setFilter('')
                    }

                }}
            />
        </SearchMain>
    )
}
export default SearchBar