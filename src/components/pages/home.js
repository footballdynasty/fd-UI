import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import Box from '@mui/system/Box';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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

function Home() {
    const [statistic, setStatistics] = useState({weekNumber: 0, statistics: []});

    useEffect(() => {
        fetch('https://quiet-waters-73507-4fc26eff764d.herokuapp.com/api/v1.0/statistics')
            .then(response => response.json())
            .then(data => {
                setStatistics(data);
                console.log(data);
            })
            .catch(error => console.error(error));
    }, []);


    return (
        <Container fixed sx={{ pt: '2em' }}>
            {statistic.weekNumber > 0 && <h1>Week {statistic.weekNumber} Statistics</h1>}
            <TableContainer component={Paper} sx={{ minWidth: 300, maxWidth: 1550 }}>
                <Table aria-label="schedule table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="left" style={{fontSize: 15}}>Coach Name</StyledTableCell>
                            <StyledTableCell align="center" style={{fontSize: 15}}>Weighted Score</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {statistic.statistics.map((stat) => (
                            <StyledTableRow
                                key={stat.coachName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="left">
                                    {stat.coachName}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {stat.teamStatistic}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}


export default Home;