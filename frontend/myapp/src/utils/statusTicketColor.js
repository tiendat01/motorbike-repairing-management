import { Chip } from "@mui/material";

export function statusTicketColor(status) {
  if (status === "Khởi tạo") {
    return <Chip label='Khởi tạo' color='primary' style={{ width: "125px" }} />;
  } else if (status === "Chờ khách duyệt") {
    return (
      <Chip
        variant='outlined'
        label='Chờ khách duyệt'
        color='primary'
        style={{ width: "125px" }}
      />
    );
  } else if (status === "Hoàn thành") {
    return (
      <Chip label='Hoàn thành' color='success' style={{ width: "125px" }} />
    );
  } else if (status === "Đang sửa") {
    return <Chip label='Đang sửa' color='error' style={{ width: "125px" }} />;
  } else if (status === "Đã huỷ") {
    return <Chip color='default' label='Đã hủy' style={{ width: "125px" }} />;
  } else if (status === "Chờ thanh toán") {
    return (
      <Chip
        color='error'
        label='Chờ thanh toán'
        variant='outlined'
        style={{ width: "125px" }}
      />
    );
  }
}
