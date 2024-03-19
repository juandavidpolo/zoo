import React, { useState, useEffect } from "react";

import { Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Modal
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import { getAnimals, deleteAnimal } from "src/redux/actions";

import Table from "src/components/custom-table";

import AnimalsSkeleton from "./index-skeleton";

const Animals = () => {

  const homeInfo = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [filtersData, setFiltersData] = useState({
    type: "",
    firstSort: "type",
    firstSortOrder: "",
    secondSort: "age",
    secondSortOrder: ""
  })

  const [animals, setAnimals] = useState([]);
  const [animalToEdit, setAnimalEdit] = useState(null);

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
  };

  const defaultFilters = [
    {
      name: 'name',
      label: 'Name',
      hasFilter: false,
      active: true
    },
    {
      name: 'age',
      label: 'Age',
      hasFilter: false,
      active: true
    },
    {
      name: 'type',
      label: 'Type',
      hasFilter: true,
      type: 'search',
      value: '',
      active: true
    },
    {
      name: 'primary_care_taker',
      label: 'Primary Care Taker',
      hasFilter: false,
      active: true
    },
    {
      name: 'last_checkup',
      label: 'Last Checkup',
      hasFilter: false,
      active: true
    },
    {
      name: 'next_checkup',
      label: 'Next Checkup',
      hasFilter: false,
      active: true
    },
  ]

  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    if (!homeInfo.loadedFirstTime){
      dispatch(getAnimals(filtersData))
    }
  }, [homeInfo.loadedFirstTime])

  useEffect(()=>{
    if (homeInfo.loadedFirstTime && !homeInfo.loading){
      dispatch(getAnimals(filtersData))
    }
  }, [filtersData])

  useEffect(()=>{
    setAnimals(homeInfo.animals);
  }, [homeInfo.animals])

  const onChangeSort=(ev)=>{
    if(ev.target.name === "type"){
      setFiltersData({...filtersData,
        firstSortOrder:ev.target.value
      })
    } else if (ev.target.name === "age"){
      setFiltersData({
        ...filtersData,
        secondSortOrder: ev.target.value
      })
    }
  }

  const handleFilters = (event, actionTaken) => {
    let name = event.target.name;
    let value = event.target.value;

    switch (actionTaken) {
      case 'onChange':
        setFilters(prevFilters =>
          prevFilters.map(filter =>
            filter.name === name ? { ...filter, value: value } : filter
          )
        );
        if (value === "") {
          setFiltersData({ ...filtersData, [name]: value });
        }
      case 'keyPress':
        if (event.key === "Enter") {
          setFiltersData({ ...filtersData, [name]: value });
        }
        break;
      case 'lostFocus':
        setFiltersData({ ...filtersData, [name]: value });
        break;
      default:
        break;
    }
  }

  const handleOpenEdit = (animalToEdit=null) => {
    setAnimalEdit(animalToEdit)
    setOpenEdit(!openEdit)
  };

  const delAnimal = (id) => {
    dispatch(deleteAnimal(id))
  }

  if (!homeInfo.loadedFirstTime){
    return(
      <div className="custom--view animals--view">
        <AnimalsSkeleton />
      </div>
    )
  }

  return(
    <>
      <div className="custom--view animals--view">
        <div className="table--sorts">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name={filtersData.firstSort}
                value={filtersData.firstSortOrder}
                label="Sort"
                onChange={(ev) => onChangeSort(ev)}
              >
                <MenuItem value={"asc"}>Asc</MenuItem>
                <MenuItem value={"desc"}>Desc</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel>Age</InputLabel>
              <Select
                name={filtersData.secondSort}
                value={filtersData.secondSortOrder}
                label="Sort"
                onChange={(ev) => onChangeSort(ev)}
              >
                <MenuItem value={"asc"}>Asc</MenuItem>
                <MenuItem value={"desc"}>Desc</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <Table
          data={animals}
          filters={filters}
          handleFilters={handleFilters}
          handleOpenEdit={handleOpenEdit}
          delAnimal={delAnimal}
          deleting={homeInfo.deleteAnimal}/>
      </div>
      <Modal
        open={openEdit}
        onClose={() => { handleOpenEdit()}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          Hello world
        </Box>
      </Modal>
    </>
  )
}

export default Animals;