import React, {useContext} from 'react';
import {app_context} from "../../context"
import {
  DataGridPremium,
} from '@mui/x-data-grid-premium';

export default function RowGroupingBasicExample() {
  const { placesMapped} = useContext(app_context)
  const cols = [
    {field:"state", headerName: "State",minWidth:"180"}, 
    {field:"city", headerName: "City",minWidth:"150"}, 
    {field:"place_day_time", headerName: "Place, Day & Time",
     minWidth:"1000",
    }]

  const getRowSpacing = React.useCallback((params) => {
      return {
        top: params.isFirstVisible ? 0 : 5,
        bottom: params.isLastVisible ? 0 : 5,
      };
  }, []);  

  return (
    <div style={{height:400,  width: '95%', margin:"auto", marginTop:"40px" }}>
      
      {placesMapped && placesMapped.length>0?
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
         />:
      <h1>Loading data...</h1>}
    </div>
  );
}