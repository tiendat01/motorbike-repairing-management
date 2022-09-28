import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTicketCustomer } from "../../../../../redux/actions/actionTicket";
import { customerService } from "../../../../../services/customerService";
import SearchBox from "../SearchBox";

const TicketCustomer = ({ existData }) => {
  const [resultList, setResultList] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (existData) setSearchResult(existData);
  }, [existData]);

  useEffect(() => {
    dispatch(addTicketCustomer(searchResult?.id));
  }, [dispatch, searchResult]);

  useEffect(() => {
    customerService
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
          <Grid item alignItems='center' xs={5} display='flex'>
            <Typography variant='body1' sx={{ fontWeight: "bold" }}>
              Mã khách hàng:
            </Typography>
          </Grid>
          <Grid item alignItems='center' xs={6} display='flex'>
            <Typography variant='body1'>{searchResult?.id}</Typography>
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
                isSearchCustomer={true}
                resultList={resultList}
                setSearchResult={setSearchResult}
              />
            ) : (
              <div style={{ height: 36 }}></div>
            )}
          </Grid>
          <Grid item alignItems='center' xs={5} display='flex'>
            <Typography variant='body1' sx={{ fontWeight: "bold" }}>
              Tên khách hàng:
            </Typography>
          </Grid>
          <Grid item alignItems='center' xs={7} display='flex'>
            <Typography variant='body1'>{searchResult?.name}</Typography>
          </Grid>
          <Grid item alignItems='center' xs={5} display='flex'>
            <Typography variant='body1' sx={{ fontWeight: "bold" }}>
              Số điện thoại:
            </Typography>
          </Grid>
          <Grid item alignItems='center' xs={7} display='flex'>
            <Typography variant='body1'>{searchResult?.phone}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default memo(TicketCustomer);
