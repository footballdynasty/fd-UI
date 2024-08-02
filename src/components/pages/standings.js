import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Container} from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

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
}));

function Standings() {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    fetch('https://quiet-waters-73507-4fc26eff764d.herokuapp.com/api/v1.0/standings')
      .then(response => response.json())
      .then(data => { 
        setStandings(data);
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <Container fixed sx={{ pt: '2em' }}>
      <TableContainer component={Paper} sx={{ minWidth: 300, maxWidth:1550 }} >
        <Table aria-label="standings table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left" style={{fontSize: 15}}>Team</StyledTableCell>
              <StyledTableCell align="center" style={{fontSize: 15}}>Wins</StyledTableCell>
              <StyledTableCell align="right" style={{fontSize: 15}}>Losses</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {standings.map((standing) => (
              <StyledTableRow
                key={standing.team.id}
                align="left"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {standing.team.name}
                </StyledTableCell>
                <StyledTableCell align="center">{standing.wins}</StyledTableCell>
                <StyledTableCell align="right">{standing.losses}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Standings;
