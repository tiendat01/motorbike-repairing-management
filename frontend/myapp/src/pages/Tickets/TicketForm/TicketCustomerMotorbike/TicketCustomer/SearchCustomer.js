import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import { IconSearch } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { customerService } from "../../../../../services/customerService";

const SearchCustomer = ({ resultList, setSearchResult, setOpen }) => {
  const [value, setValue] = useState(null);
  const [openDialog, toggleOpenDialog] = useState(false);
  const [dialogValue, setDialogValue] = useState({
    name: "",
    phone: "",
  });
  const theme = useTheme();

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const options = resultList.map((item) => {
    return { id: item.id, name: item.name, phone: item.phone };
  });

  const handleCloseDialog = () => {
    setDialogValue({
      name: "",
      phone: "",
    });
    toggleOpenDialog(false);
  };

  useEffect(() => {
    setSearchResult(value);
    setOpen((previousOpen) => !previousOpen);
  }, [value, setSearchResult, setOpen]);

  return (
    <>
      <Autocomplete
        value={value}
        sx={{ width: 250 }}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTimeout(() => {
              toggleOpenDialog(true);
              setDialogValue({
                phone: newValue,
                name: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpenDialog(true);
            setDialogValue({
              phone: newValue.inputValue,
              name: "",
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filter = createFilterOptions();
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              phone: `Thêm KH "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        disableClearable
        clearOnBlur
        id='free-solo-with-text-demo'
        options={options}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.phone;
        }}
        renderOption={(props, option) => <li {...props}>{option.phone}</li>}
        freeSolo
        renderInput={(params) => (
          <TextField
            id='input-search-header'
            placeholder='Nhập SĐT khách hàng'
            autoFocus
            sx={{
              "& .MuiInputBase-root": {
                height: 36,
                alignContent: "center",
              },
            }}
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position='start'>
                  <IconSearch
                    stroke={1.5}
                    size='1.25rem'
                    color={theme.palette.grey[500]}
                  />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <form>
          <DialogTitle>Thêm Khách Hàng</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 1 }}>
              <Grid container rowSpacing={3}>
                <Grid item alignItems='center' xs={12}>
                  <TextField
                    label='Tên khách hàng'
                    variant='outlined'
                    placeholder='Tên KH'
                    fullWidth
                    {...register("name")}
                    value={dialogValue.name}
                    onChange={(event) =>
                      setDialogValue({
                        ...dialogValue,
                        name: event.target.value,
                      })
                    }
                  ></TextField>
                </Grid>

                <Grid item alignItems='center' xs={12}>
                  <TextField
                    variant='outlined'
                    placeholder='SĐT'
                    label='Số điện thoại'
                    fullWidth
                    {...register("phone", {
                      required: "Trường này không được để trống",
                    })}
                    value={dialogValue.phone}
                    onChange={(event) =>
                      setDialogValue({
                        ...dialogValue,
                        phone: event.target.value,
                      })
                    }
                  ></TextField>
                  {errors.phone && (
                    <FormHelperText error id='helper-text-phone'>
                      {errors.phone.message}
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
                const result = await trigger("phone");
                if (result) {
                  customerService
                    .create(dialogValue)
                    .then((response) => {
                      setValue({
                        id: response.data.id,
                        phone: response.data.phone,
                        name: response.data.name,
                      });
                    })
                    .then(() => {
                      handleCloseDialog();
                    })
                    .catch((error) => {
                      console.log(error);
                      toast.error("Tạo khách hàng không thành công");
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
  );
};

export default SearchCustomer;
