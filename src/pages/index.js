"use client"
import React, { useEffect, useContext } from "react";
import Dropdown from "../components/Dropdown";
import Image from "next/image";
import Table from "../components/Table";
import { app_context } from "../../context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";

function Index() {
  const {
    data,
    states,
    cities,
    stateName,
    cityName,
    setData,
    setStates,
    setCities,
    setStateName,
    setCityName,
    setPlacesMapped,
  } = useContext(app_context);
  useEffect(() => {
    const getDocData = async () => {
      const docRef = doc(db, "states", "F4ojDC4HmTXZ2YGXP7EM");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem("one-day-data",JSON.stringify(docSnap.data()))
        }
        // console.log("data",data)

        // const values= Object.values(data)

        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getDocData();
  }, []);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const keys = Object.keys(data);
      setStates(keys);
      let citiesCopy = [];
      let places = [];
      let id = 0;
      for (let i in data) {
        //i is state
        for (let j in data[i]) {
          //j is city
          let tempObj = {};
          tempObj.id = id;
          id++;
          tempObj.city = j;
          tempObj.place_day_time = data[i][j]; //place-day-time in city j
          tempObj.state =
            i === "MAHARASHTRA" ? i : i.substring(0, i.length - 1); // to exclude : at the end of state name
          places.push(tempObj);
        }
        // console.log("states: ",i)
        citiesCopy = [...citiesCopy, ...Object.keys(data[i])];
      }
      setPlacesMapped(places);
      setCities(citiesCopy);
    }
  }, [data]);

  return (
    <div className="main-content">
      <div className="top-image-and-headings">
        <Image
          src="https://www.dhamma.org/assets/aniwheel-a87352d07ff79e922e5afbc8775f603b.gif"
          width="70"
          height="150"
        />
        <div className="headings">
          <h2 className="heading-1">Vipassanna Meditation</h2>
          <p className="heading-2">
            As taught by S.N. Goenka in the tradition of Sayagyi U Ba Khin
          </p>
          <p className="heading-3">
            One-day non-centres
          </p>
        </div>
      </div>
      <div className="dropdowns">
        <Dropdown
          options={states}
          type="Select State"
          personName={stateName}
          setPersonName={setStateName}
        />
        <Dropdown
          options={cities}
          type="Select City"
          personName={cityName}
          setPersonName={setCityName}
        />
        <button
          style={{ }}
          onClick={() => {
            setStateName([]);
            setCityName([]);
            let citiesCopy = [];
            let places = [];
            let id = 0;
            for (let i in data) {
              //i is state
              for (let j in data[i]) {
                //j is city
                let tempObj = {};
                tempObj.id = id;
                id++;
                tempObj.city = j;
                tempObj.place_day_time = data[i][j]; //place-day-time in city j
                tempObj.state =
                  i === "MAHARASHTRA" ? i : i.substring(0, i.length - 1); // to exclude : at the end of state name
                places.push(tempObj);
              }
              // console.log("states: ",i)
              citiesCopy = [...citiesCopy, ...Object.keys(data[i])];
            }
            setPlacesMapped(places);
            setCities(citiesCopy);
          }}
        >
          Reset
        </button>
      </div>
         <Table 
       />
    </div>
  );
}

export default Index;
