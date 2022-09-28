import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useDebounce } from "../../../../hooks/useDebounce";
import { addProductInTicket } from "../../../../redux/actions/actionTicketProduct";
import { addServiceInTicket } from "../../../../redux/actions/actionTicketService";
import { productService } from "../../../../services/productService";
import { serviceService } from "../../../../services/serviceService";
import currencyFormat from "../../../../utils/currencyFormat";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "4px",
  backgroundColor: alpha(theme.palette.grey[100], 0.15),
  border: "1px solid rgb(0 0 0 / 0.3)",
  boxShadow: "1px 3px 3px rgb(0 0 0 / 0.3)",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    "&::placeholder": {
      color: "#000000",
    },
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "8ch",
      "&:focus": {
        width: "16ch",
      },
    },
  },
}));

const SearchResultBox = styled("div")(() => ({
  height: "28ch",
  position: "absolute",
  width: "68ch",
  overflowY: "auto",
  alignItems: "center",
  justifyContent: "center",
  top: 44,
  right: 0,
  borderRadius: 8,
  backgroundColor: "#fff",
  boxShadow: "0 0 30px rgb(0 0 0 / 0.5)",
  paddingRight: 8,
  zIndex: 500,
}));

export default function SearchBar({ type }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [openDialog, toggleOpenDialog] = useState(false);
  const [dialogValue, setDialogValue] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const ref = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (e) => {
    if (!ref?.current?.contains(e.target)) {
      setSearchValue("");
      setShowResult(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogValue({
      name: "",
      description: "",
      price: 0,
    });
    toggleOpenDialog(false);
  };

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();
  const debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    if (type === "PRODUCT") {
      productService
        .search(`name==${searchValue}`)
        .then(function (response) {
          setSearchResult(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (type === "SERVICE") {
      serviceService
        .search(`name==${searchValue}`)
        .then(function (response) {
          setSearchResult(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [debounced, type, searchValue]);

  return (
    <Box>
      <Toolbar sx={{ justifyContent: "end" }}>
        {type === "SERVICE" && (
          <>
            <Box sx={{ mr: 2 }}>
              <Button variant='outlined' onClick={() => toggleOpenDialog(true)}>
                Thêm Dịch Vụ
              </Button>
            </Box>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <form>
                <DialogTitle>
                  <Typography sx={{fontSize:'20px'}}>Thêm Dịch Vụ</Typography>
                </DialogTitle>
                <DialogContent>
                  <Box sx={{ mt: 1 }}>
                    <Grid container rowSpacing={3}>
                      <Grid item alignItems='center' xs={12}>
                        <TextField
                          label='Tên Dịch Vụ'
                          variant='outlined'
                          fullWidth
                          {...register("name", {
                            required: "Trường này không được để trống",
                          })}
                          value={dialogValue.name}
                          onChange={(event) =>
                            setDialogValue({
                              ...dialogValue,
                              name: event.target.value,
                            })
                          }
                        ></TextField>
                        {errors.name && (
                          <FormHelperText error id='helper-text-name'>
                            {errors.name.message}
                          </FormHelperText>
                        )}
                      </Grid>

                      <Grid item alignItems='center' xs={12}>
                        <TextField
                          variant='outlined'
                          label='Mô Tả'
                          fullWidth
                          {...register("description")}
                          value={dialogValue.description}
                          onChange={(event) =>
                            setDialogValue({
                              ...dialogValue,
                              description: event.target.value,
                            })
                          }
                        ></TextField>
                      </Grid>

                      <Grid item alignItems='center' xs={12}>
                        <TextField
                          variant='outlined'
                          label='Giá'
                          fullWidth
                          {...register("price", {
                            required: "Trường này không được để trống",
                          })}
                          value={dialogValue.price}
                          onChange={(event) =>
                            setDialogValue({
                              ...dialogValue,
                              price: event.target.value,
                            })
                          }
                        ></TextField>
                        {errors.price && (
                          <FormHelperText error id='helper-text-price'>
                            {errors.price.message}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button
                    type='button'
                    onClick={async () => {
                      const result = await trigger(["name", "price"]);
                      if (result) {
                        serviceService
                          .create(dialogValue)
                          .then((response) => {
                            dispatch(
                              addServiceInTicket({
                                id: response.data.id,
                                code: response.data.code,
                                name: response.data.name,
                                price: response.data.price,
                              })
                            );
                          })
                          .then(() => {
                            handleCloseDialog();
                          })
                          .catch((error) => {
                            console.log(error);
                            toast.error("Tạo dịch vụ không thành công");
                          });
                      }
                    }}
                  >
                    Thêm
                  </Button>
                  <Button onClick={handleCloseDialog}>Hủy</Button>
                </DialogActions>
              </form>
            </Dialog>
          </>
        )}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Tìm kiếm ...'
            inputProps={{ "aria-label": "search" }}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setShowResult(true);
            }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  size='small'
                  sx={{ mr: 0.5 }}
                  onClick={() => {
                    setSearchValue("");
                    setShowResult(false);
                  }}
                >
                  {searchValue && <CloseIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
          {searchResult.length > 0 && showResult && (
            <SearchResultBox ref={ref}>
              <Grid container spacing={1}>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
                {searchResult.map((item, index) => {
                  return (
                    <Grid item xs={12} key={index}>
                      <Grid container>
                        <Grid
                          item
                          xs={3}
                          display='flex'
                          justifyContent='center'
                        >
                          <Avatar
                            alt={item?.code}
                            src={item?.image}
                            sx={{ width: 50, height: 50 }}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              display='flex'
                              justifyContent='start'
                            >
                              <Typography textAlign='left' variant='subtitle1'>
                                {item?.name}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              display='flex'
                              justifyContent='start'
                            >
                              <Typography textAlign='left'>
                                {currencyFormat(item?.price)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            onClick={() => {
                              if (type === "PRODUCT") {
                                dispatch(
                                  addProductInTicket({
                                    id: item.id,
                                    code: item.code,
                                    name: item.name,
                                    image: item.image,
                                    price: item.price,
                                    quantity: 1,
                                    quantityInInventory: item.quantity,
                                    category: item.category,
                                  })
                                );
                              } else if (type === "SERVICE") {
                                dispatch(
                                  addServiceInTicket({
                                    id: item.id,
                                    code: item.code,
                                    name: item.name,
                                    price: item.price,
                                  })
                                );
                              }
                            }}
                          >
                            <AddCircleIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
                <Grid item xs={12}></Grid>
              </Grid>
            </SearchResultBox>
          )}
        </Search>
      </Toolbar>
    </Box>
  );
}
