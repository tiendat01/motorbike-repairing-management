import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepContent from "@mui/material/StepContent";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";

import { ticketService } from "../../../services/ticketService";

const ticketStatusConverter = (rawData) => {
  return rawData.map((record) => {
    let label = record.updatedDate + " Trạng thái phiếu: " + record.newStatus;
    let description =
      record.oldStatus === record.newStatus
        ? "Nhân viên " +
          record.updatedBy +
          " cập nhật thông tin phiếu sửa chữa mã " +
          record.ticketCode
        : "Nhân viên " +
          record.updatedBy +
          " cập nhật Trạng thái của phiếu từ " +
          record.oldStatus +
          " sang " +
          record.newStatus;

    return { label, description };
  });
};

const TicketStatusStepper = ({ ticketId }) => {
  const [statusTracks, setStatusTracks] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  useEffect(() => {
    ticketService
      .trackStatus(ticketId)
      .then((response) => {
        setStatusTracks(ticketStatusConverter(response.data));
        setActiveStep(response.data.length - 1);
      })
      .catch((e) => console.log(e));
  }, [ticketId]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        sx={{ flexDirection: "column-reverse" }}
        orientation='vertical'
        nonLinear
        activeStep={activeStep}
      >
        {statusTracks.map((step, index) => (
            <Step key={step.label}>
              <StepButton color='inherit' onClick={handleStep(index)}>
                {step.label}
              </StepButton>
              <StepContent>
                <Typography>{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
      </Stepper>
    </Box>
  );
};

export default TicketStatusStepper;
