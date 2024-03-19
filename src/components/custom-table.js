import { React } from 'react';

import { Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Box} from '@mui/material';

const CustomTable = ({
  data,
  filters,
  handleFilters,
  handleOpenEdit,
  delAnimal,
  deleting }) => {

  return (
    <div className='custom--table'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Primary Care Taker</TableCell>
              <TableCell align="center">Last Checkup</TableCell>
              <TableCell align="center">Next Checkup</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
            <TableRow>
              {filters && Array.isArray(filters) && filters.length > 0 && filters.map((filter, i) => {
                if (filter.hasFilter === true) {
                  return (
                    <TableCell key={i}>
                      <TextField fullWidth
                        key={i}
                        id={`${filter.name}-${i}`}
                        name={filter.name}
                        type={filter.type}
                        label="Search"
                        variant="standard"
                        value={filter.value}
                        onKeyDown={(ev) => handleFilters(ev, 'keyPress')}
                        onBlur={(ev) => handleFilters(ev, 'lostFocus')}
                        onChange={(ev) => handleFilters(ev, 'onChange')}
                        />
                    </TableCell>
                  )
                } else {
                  return (
                    <TableCell key={i}></TableCell>
                  )
                }
              })}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data && Array.isArray(data) && data.length > 0 && data.map((row, j) => (
                <TableRow key={j}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="center">{row.age}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.primary_care_taker}</TableCell>
                  <TableCell align="center">{row.last_checkup}</TableCell>
                  <TableCell align="center">{row.next_checkup}</TableCell>
                  <TableCell align="center">
                    <div style={{display:"flex", flexDirection:"row", gap:"10px", justifyContent:"center", alignItems:"center"}}>
                      <Button variant="contained" onClick={(() => { handleOpenEdit(row) })}>Edit</Button>
                      <Button variant="contained" onClick={(() => { delAnimal(row.id) })} disabled={ deleting === row.id ? true:false }>
                        {deleting === row.id &&
                          <Box sx={{ display: 'flex' }}>
                            <CircularProgress color="inherit" size={15} />
                          </Box>
                        }
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CustomTable;