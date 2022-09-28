import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { employeeService } from "../../services/employeeService";
import TicketEmployeeItem from "./TicketEmployeeItem";

const columns = [
  { id: "id", label: "STT", align: "center" },
  {
    id: "licensePlates",
    label: "Biển Số Xe",
    align: "center",
  },
  {
    id: "price",
    label: "Giá",
    align: "right",
  },
  {
    id: "status",
    label: "Trạng thái",
    align: "center",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const TicketEmployee = ({ detailEmployee }) => {
  const [totalTickets, setTotalTickets] = useState(0);

  useEffect(() => {
    employeeService
      .getTickets(detailEmployee?.id)
      .then((response) => {
        setTotalTickets(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [detailEmployee?.id]);

  return (
    <>
      {totalTickets.length > 0 ? (
        <Box sx={{ width: "100%" }}>
          {totalTickets && (
            <Grid>
              <TableContainer>
                <PerfectScrollbar
                  component='div'
                  style={{
                    // height: "calc(100vh - 380px)",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                  }}
                >
                  <Table
                    stickyHeader
                    sx={{ minWidth: 500 }}
                    aria-labelledby='tableTitle'
                  >
                    <EnhancedTableHead rowCount={totalTickets.length} />
                    <TableBody>
                      {totalTickets
                        .slice(0)
                        .reverse()
                        .map((row, index) => {
                          return (
                            <TicketEmployeeItem
                              key={index}
                              index={index + 1}
                              item={row}
                            />
                          );
                        })}
                    </TableBody>
                  </Table>
                </PerfectScrollbar>
              </TableContainer>
            </Grid>
          )}
        </Box>
      ) : (
        <Grid item xs={12} display='flex'>
          <Typography sx={{ pl: 1 }}>Nhân viên chưa có hóa đơn</Typography>
        </Grid>
      )}
    </>
  );
};

export default TicketEmployee;
