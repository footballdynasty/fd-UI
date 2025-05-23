
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import Box from '@mui/system/Box';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { PersonOutline } from '@mui/icons-material';
import { SmartToyOutlined } from '@mui/icons-material';
import '../../index.css';

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
            <TableContainer component={Paper} sx={{ minWidth: 300, maxWidth: 1550 }}>
                <Table aria-label="schedule table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="left" style={{fontSize: 15}}>Home Team</StyledTableCell>
                            <StyledTableCell align="center" style={{fontSize: 15}}>Date</StyledTableCell>
                            <StyledTableCell align="right" style={{fontSize: 15}}>Away Team</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {schedule.map((game) => (
                            <StyledTableRow
                                key={game.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="left">
                                    <Box component="img" height={50} src={game.homeTeam.imageUrl}></Box>
                                    <div class="teamName" display="flex" flexDirection="column">{game.homeTeam.name}</div>
                                    {game.homeTeamRank > 0 ? <div>{game.homeTeamRank}</div> : <div></div>}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Box component="section" height={30} display="flex" alignItems="center" gap={4} justifyContent="center" >
                                        {game.homeScore > 0 ? <div>{game.homeScore}</div> : <div> - </div>}
                                        {game.homeTeam.isHuman ? <PersonOutline sx={{ fontSize: 25 }} /> : <SmartToyOutlined sx={{ fontSize: 25 }} />}
                                        <div class="teamDate">{game.date}</div>
                                        {game.awayTeam.isHuman ? <PersonOutline sx={{ fontSize: 25 }} /> : <SmartToyOutlined sx={{ fontSize: 25 }} />}
                                        {game.awayScore > 0 ? <div>{game.awayScore}</div> : <div> - </div>}
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Box component="img" height={40} src={game.awayTeam.imageUrl}></Box>
                                    <div class="teamName">
                                        {game.awayTeam.name}
                                    </div>
                                    {game.awayTeamRank > 0 ? <div>{game.awayTeamRank}</div> : <div></div>}
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