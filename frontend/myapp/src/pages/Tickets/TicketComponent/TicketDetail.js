import { Box, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateTickets } from "../../../redux/actions/actionTickets";
import { ticketService } from "../../../services/ticketService";
import { formatDateTime } from "../../../utils/getCurrentDate";
import { selectRole } from "../../../utils/selectRole";
import TicketInvoice from "./TicketInvoice";

const TicketDetail = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const tickets = useSelector((state) => state.tickets);
  const itemId = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [buttonUpdate, setButtonUpdate] = useState(false);
  const [detailTicket, setDetailTicket] = useState(null);
  const ticketDetail = tickets?.find((item) => item.id === parseInt(itemId.id));

  useEffect(() => {
    if (ticketDetail) {
      setDetailTicket(ticketDetail);
    } else {
      ticketService
        .getOne(itemId.id)
        .then(function (response) {
          setDetailTicket(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [itemId.id, ticketDetail]);

  useEffect(() => {
    if (detailTicket) {
      if (
        detailTicket?.status === "Đã huỷ" ||
        detailTicket?.status === "Chờ thanh toán" ||
        detailTicket?.status === "Hoàn thành"
      ) {
        setButtonUpdate(false);
      } else setButtonUpdate(true);
    }
  }, [detailTicket]);

  const ticketObject = {
    appointmentDate: formatDateTime(detailTicket?.appointmentDate),
    motorbikeId: detailTicket?.motorbike?.id,
    productRequestSet: detailTicket?.products?.map((item) => {
      return { productId: item?.product?.id, quantity: item?.quantity };
    }),
    serviceRequestSet: detailTicket?.services?.map((item) => {
      return { serviceId: item?.service?.id };
    }),
    description: detailTicket?.description,
    note: detailTicket?.note,
    discount: detailTicket?.discount,
    customerId: detailTicket?.customer?.id,
    repairingEmployeeId: detailTicket?.repairingEmployee?.id,
    // status,
  };

  const handleConfirmTicket = () => {
    const statusObject = { status: 2 };
    const reqObj = { ...ticketObject, ...statusObject };
    ticketService
      .update(detailTicket?.id, reqObj)
      .then((res) => {
        dispatch(updateTickets(detailTicket?.id, res.data));
        toast.success("Duyệt thành công");
        navigate("/manage/tickets");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Duyệt không thành công");
      });
  };

  const handleCancelTicket = () => {
    const statusObject = { status: -1 };
    const reqObj = { ...ticketObject, ...statusObject };
    ticketService
      .update(detailTicket?.id, reqObj)
      .then((res) => {
        dispatch(updateTickets(detailTicket?.id, res.data));
        toast.success("Hủy thành công");
        navigate("/manage/tickets");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Hủy không thành công");
      });
  };

  const handleDoneRepairing = () => {
    const statusObject = { status: 3 };
    const reqObj = { ...ticketObject, ...statusObject };
    ticketService
      .update(detailTicket?.id, reqObj)
      .then((res) => {
        dispatch(updateTickets(detailTicket?.id, res.data));
        toast.success("Cập nhật thành công");
        navigate("/manage/tickets");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cập nhật không thành công");
      });
  };

  const handleDoneTicket = () => {
    const statusObject = { status: 4 };
    const reqObj = { ...ticketObject, ...statusObject };
    ticketService
      .update(detailTicket?.id, reqObj)
      .then((res) => {
        dispatch(updateTickets(detailTicket?.id, res.data));
        toast.success("Hoàn tất đơn hàng");
        navigate("/manage/tickets");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cập nhật không thành công");
      });
  };

  return (
    <div>
      {detailTicket && (
        <div>
          <TicketInvoice detailInfor={detailTicket} />
          {buttonUpdate && selectRole(user?.roles) !== "Thu Ngân" ? (
            <Box sx={{ mt: 3 }}>
              <Stack direction='row' spacing={2}>
                {detailTicket?.status === "Chờ khách duyệt" && (
                  <Button
                    disableElevation
                    size='large'
                    variant='contained'
                    color='success'
                    onClick={handleConfirmTicket}
                  >
                    Duyệt Phiếu
                  </Button>
                )}
                {detailTicket?.status === "Đang sửa" ? (
                  <Button
                    disableElevation
                    size='large'
                    variant='contained'
                    color='success'
                    onClick={handleDoneRepairing}
                  >
                    Sửa Hoàn Tất
                  </Button>
                ) : (
                  <Button
                    disableElevation
                    size='large'
                    variant='outlined'
                    color='primary'
                    onClick={handleCancelTicket}
                  >
                    Hủy Phiếu
                  </Button>
                )}
                <Button
                  disableElevation
                  size='large'
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    navigate(`/manage/tickets/update/${detailTicket?.id}`);
                  }}
                >
                  Chỉnh Sửa Phiếu
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box sx={{ mt: 3 }}>
              {detailTicket?.status === "Chờ thanh toán" &&
                user.roles.includes("ROLE_CASHIER") && (
                  <Button
                    disableElevation
                    size='large'
                    variant='contained'
                    color='success'
                    onClick={handleDoneTicket}
                  >
                    Thanh Toán Hoàn Tất
                  </Button>
                )}
            </Box>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketDetail;
