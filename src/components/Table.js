import React, {useContext, useState } from 'react';
import {app_context} from "../../context"
import {
  DataGridPremium,
} from '@mui/x-data-grid-premium';
import DialogVerticalScroll from './Modal';

export default function RowGroupingBasicExample() {
  const { placesMapped} = useContext(app_context)
  const [layout, setLayout] = useState(undefined);
  const [modalContent, setModalContent] = useState("")
  
  const cols = [
    {field:"state",
     headerName: "State",
     minWidth:"0",
     maxWidth: "0"
    }, 
    {field:"city", headerName: "City",minWidth:"150"}, 
    {field:"place_day_time", headerName: "Place, Day & Time",
     minWidth:"500",
    }]

  const getRowSpacing = React.useCallback((params) => {
      return {
        top: params.isFirstVisible ? 0 : 5,
        bottom: params.isLastVisible ? 0 : 5,
      };
  }, []);  

  return (
    <div style={{height:400,  width: '95%', margin:"auto", marginTop:"40px" }}>
      
      {placesMapped && placesMapped?.length>0?
      <DataGridPremium
      columns={cols}
      rows={placesMapped}
      rowGroupingModel={["state"]}
      sortable
      autoHeight
      autoPageSize
      getRowHeight={() => 'auto'}
      rowSpacingType={"margin"}
      getRowSpacing={getRowSpacing}
      onCellClick={(e)=>{
        setLayout("center")
        // console.log(placesMapped[e.id]?.place_day_time)
        setModalContent(placesMapped[e.id]?.place_day_time)
      }}
         />:
      <h1>Loading data...</h1>}
      <DialogVerticalScroll layout={layout} setLayout={setLayout} modalContent={modalContent}/>
    </div>
  );
}