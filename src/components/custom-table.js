import { React, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { updateAnimal } from "src/redux/actions";
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
  Box,
  Modal,
  Typography
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

import { formatAge, formatDateTime } from "src/utils/helpers";

const CustomTable = ({
  data,
  filters,
  handleFilters,
  delAnimal,
  deleting,
  updatingAnimal }) => {

  const dispatch = useDispatch();

  const [animal, setAnimal] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [open, setOpen] = useState(false);
  const handleOpenEdit = (animalToEdit = null) => {
    setAnimal(animalToEdit)
  };

  useEffect(() => {
    if (animal === null) { setOpen(false) } else { setOpen(true) }
  }, [animal])

  useEffect(() => {
    if (animal !== null){
      setAnimal({...animal,
        next_checkup: selectedDate
      })
    }
  }, [selectedDate])

  const editAnimal = () => {
    console.log("test: ", animal)
    dispatch(updateAnimal(animal))
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

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
                  <TableCell align="center">{formatAge(row.age)}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.primary_care_taker}</TableCell>
                  <TableCell align="center">{formatDateTime(row.last_checkup)}</TableCell>
                  <TableCell align="center">{formatDateTime(row.next_checkup)}</TableCell>
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
      <Modal
        open={open}
        onClose={() => { handleOpenEdit() }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {open && animal !== null &&
            <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "10px", }}>
              <Typography>{`Set new Checkup date and time for ${animal.name}`}</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Date and Time"
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                />
              </LocalizationProvider>
              <div style={{ display: "flex", flexDirection: "row", gap: "10px", justifyContent: "flex-end", alignItems: "center" }}>
                <Button variant="contained" onClick={(ev) => { editAnimal() }} disabled={updatingAnimal?true:false}>
                  {updatingAnimal &&
                    <Box sx={{ display: 'flex' }}>
                      <CircularProgress color="inherit" size={15} />
                    </Box>
                  }
                  Save
                </Button>
                <Button variant="contained" onClick={() => { handleOpenEdit() }}>Cancel</Button>
              </div>
            </div>
          }
        </Box>
      </Modal>
    </div>
  );
}

export default CustomTable;