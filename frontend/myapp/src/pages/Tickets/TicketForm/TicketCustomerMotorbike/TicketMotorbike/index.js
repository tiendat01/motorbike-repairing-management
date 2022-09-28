import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTicketMotorbike } from "../../../../../redux/actions/actionTicket";
import { motorbikeService } from "../../../../../services/motorbikeService";
import SearchBox from "../SearchBox";

const TicketMotorbike = ({ existData }) => {
  const [resultList, setResultList] = useState(null);
  const [searchResult, setSearchResult] = useState(existData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTicketMotorbike(searchResult?.id));
  }, [dispatch, searchResult]);

  useEffect(() => {
    motorbikeService
      .listAll()
      .then(function (response) {
        setResultList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", my: 3, p: 2 }} elevation={1}>
        <Grid container rowSpacing={2}>
          <Grid item alignItems='center' xs={3} display='flex'>
            <Typography variant='body1' sx={{ fontWeight: "bold" }}>
              Biển số xe:
            </Typography>
          </Grid>
          <Grid item alignItems='center' xs={8} display='flex'>
            <Typography variant='body1'>
              {searchResult?.licensePlates}
            </Typography>
          </Grid>
          <Grid
            item
            alignItems='center'
            justifyContent='end'
            xs={1}
            display='flex'
          >
            {!existData ? (
              <SearchBox
                isSearchCustomer={false}
                resultList={resultList}
                setSearchResult={setSearchResult}
              />
            ) : (
              <div style={{ height: 36 }}></div>
            )}
          </Grid>

          <Grid item alignItems='center' xs={3} display='flex'>
            <Typography variant='body1' sx={{ fontWeight: "bold" }}>
              Hãng xe:
            </Typography>
          </Grid>
          <Grid item alignItems='center' xs={9} display='flex'>
            <Typography variant='body1'>
              {searchResult?.model?.brand?.brandName}
            </Typography>
          </Grid>
          <Grid item alignItems='center' xs={3} display='flex'>
            <Typography variant='body1' sx={{ fontWeight: "bold" }}>
              Kiểu xe:
            </Typography>
          </Grid>
          <Grid item alignItems='center' xs={9} display='flex'>
            <Typography variant='body1'>
              {searchResult?.model?.modelName}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default memo(TicketMotorbike);
