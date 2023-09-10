import { useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { app_context } from "../../context";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({
  options,
  type,
  personName,
  setPersonName,
}) {
  const [names, setNames] = useState([]);
  // const [personName, setPersonName] = useState([]);
  const { data, stateName, cityName, cities, setCities, setPlacesMapped } =
    useContext(app_context);
  useEffect(() => {
    if (options && options.length) {
      let arr = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].charAt(options[i].length - 1) == ":") {
          arr.push(options[i].substring(0, options[i].length - 1));
          continue;
        }
        arr.push(options[i]);
      }
      setNames(arr);
    }
  }, [options]);

  useEffect(() => {
    if (type === "Select State" && personName?.length > 0) {
      let citiesCopy = [];
      // console.log("personName",personName)
      for (let i = 0; i < personName.length; i++) {
        if (personName[i] === "MAHARASHTRA") {
          citiesCopy = [...citiesCopy, ...Object.keys(data[personName[i]])];
          continue;
        }
        citiesCopy = [...citiesCopy, ...Object.keys(data[personName[i] + ":"])];
      }
      setCities(citiesCopy);
    }
  }, [personName]);

  useEffect(() => {
    if (personName?.length>0 && cities?.length > 0) {
      let places = [];
      let id = 0;
      if(stateName?.length>0){
        for (let i of stateName) {
          // console.log("state selected", i);
          let checkCitySelected = false;
          // console.log("citiesSelected", cityName)
          for (let j of cityName) {
            // console.log("city", j,data[i]);
            let tempObj={}
            if (data[i === "MAHARASHTRA"?i:`${i}:`]?.hasOwnProperty(j)) {
              // selected state contains selected city
              tempObj.id = id;
              tempObj.state = i;
              tempObj.city = j;
              tempObj.place_day_time = data[i === "MAHARASHTRA"?i:`${i}:`][j]; //place-day-time in city j
              id++;
              places.push(tempObj);
              checkCitySelected = true;
            }
          }
          if (!checkCitySelected) {
              for (let j in data[i === "MAHARASHTRA"?i:`${i}:`]) {
                //j is city
                let tempObj = {};
                tempObj.id = id;
                id++;
                tempObj.city = j;
                tempObj.place_day_time = data[i === "MAHARASHTRA"?i:`${i}:`][j]; //place-day-time in city j
                tempObj.state =(i === "MAHARASHTRA")? i : i.substring(0,i.length-1) // to exclude : at the end of state name
                places.push(tempObj);
              }
          }
        }
      }
      else{
        for (let i of cityName) {
          for(let j in data){
            let tempObj={}
            if (data[j]?.hasOwnProperty(i)) {
              // selected state contains selected city
              tempObj.id = id;
              tempObj.state = j;
              tempObj.city = i;
              tempObj.place_day_time = data[j][i]; //place-day-time in city i
              id++;
              places.push(tempObj);
              break;
            }
          }
        }
      }
      setPlacesMapped(places);
    }
  }, [cities,personName]);

  // [

  //   'Oliver Hansen',
  //   'Van Henry',
  //   'April Tucker',
  //   'Ralph Hubbard',
  //   'Omar Alexander',
  //   'Carlos Abbott',
  //   'Miriam Wagner',
  //   'Bradley Wilkerson',
  //   'Virginia Andrews',
  //   'Kelly Snyder',

  // ];
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // console.log("state value= ",value)
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{type}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
