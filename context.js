import { createContext, useState } from "react";
export const app_context = createContext(null);
function Context({ children }) {
  // console.log("children",children)
  const dataFromLocal = typeof window !== 'undefined' && window.sessionStorage?
  window.sessionStorage.getItem("one-day-data"):'{}'
  const parsedData=JSON.parse(dataFromLocal)
  const [data, setData] = useState(dataFromLocal && Object.keys(parsedData).length>0?
  parsedData:{});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stateName, setStateName] = useState([]);
  const [cityName, setCityName] = useState([]);
  const [placesMapped, setPlacesMapped] = useState([])


  return (
    <app_context.Provider value={
        { data, 
          states,
          cities,
          stateName,
          cityName,
          placesMapped,
          setData,
          setStates,
          setCities,
          setStateName,
          setCityName,
          setPlacesMapped
         }}>
        {children}
    </app_context.Provider>
  );
}

export default Context;
