
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import Box from '@mui/system/Box';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { PersonOutline } from '@mui/icons-material';
import { SmartToyOutlined } from '@mui/icons-material';
import { fontSize } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1976d2",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '& th': {
        fontSize: '1.2em',
    },
    '.team-name': {
        fontSize: '1.4em',
    },
    '.team-date': {
        fontSize: '1.3em',
    }
}));

function Schedule() {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        fetch('https://quiet-waters-73507-4fc26eff764d.herokuapp.com/api/v1.0/schedule')
            .then(response => response.json())
            .then(data => {
                setSchedule(data);
                console.log(data);
            })
            .catch(error => console.error(error));
    }, []);


    return (
        <Container fixed sx={{ pt: '2em' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, maxWidth: 1550 }} aria-label="schedule table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="left" >Home Team</StyledTableCell>
                            <StyledTableCell align="center">Date</StyledTableCell>
                            <StyledTableCell align="right">Away Team</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {schedule.map((game) => (
                            <StyledTableRow
                                key={game.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="left">
                                    <Box component="img" height={100} src={game.homeTeam.imageUrl}></Box>
                                    <div class="team-name" display="flex" flexDirection="column" >{game.homeTeam.name}</div>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Box component="section" height={75} display="flex" alignItems="center" gap={4} justifyContent="center" >
                                        {/* <Box height={50} width={50} component="section"> */}
                                        {game.homeTeam.isHuman ? <PersonOutline sx={{ fontSize: 40 }} /> : <SmartToyOutlined sx={{ fontSize: 40 }} />}
                                        {/* </Box> */}
                                        <div class="team-date">{game.date}</div>
                                        {/* <Box height={50} width={50} component="section"> */}
                                        {game.awayTeam.isHuman ? <PersonOutline sx={{ fontSize: 40 }} /> : <SmartToyOutlined sx={{ fontSize: 40 }} />}
                                        {/* </Box> */}
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Box component="img" height={100} src={game.awayTeam.imageUrl}></Box>
                                    <div class="team-name">
                                        {game.awayTeam.name}
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}


export default Schedule;