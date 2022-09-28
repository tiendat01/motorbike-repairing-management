import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import { IconSearch } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { brandService } from "../../../../../services/brandService";
import { modelService } from "../../../../../services/modelService";
import { motorbikeService } from "../../../../../services/motorbikeService";

const SearchMotorbike = ({ resultList, setSearchResult, setOpen }) => {
  const [value, setValue] = useState(null);
  const [openDialog, toggleOpenDialog] = useState(false);
  const [dialogValue, setDialogValue] = useState({
    licensePlates: "",
    modelName: "",
    brandName: "",
  });
  const theme = useTheme();

  const {
    trigger,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const options = resultList.map((item) => {
    return {
      id: item.id,
      licensePlates: item.licensePlates,
      model: item.model,
      brand: item.model.brand,
    };
  });

  const handleCloseDialog = () => {
    setDialogValue({
      licensePlates: "",
      modelName: "",
      brandName: "",
    });
    toggleOpenDialog(false);
  };

  const [dataBrand, setDataBrand] = useState([]);
  const [dataModel, setDataModel] = useState([]);
  const [chosenBrand, setChosenBrand] = useState("");
  const [isDisableBrand, setIsDisableBrand] = useState(true);

  useEffect(() => {
    setSearchResult(value);
    setOpen((previousOpen) => !previousOpen);
  }, [value, setSearchResult, setOpen]);

  useEffect(() => {
    brandService.listAll().then((res) => {
      setDataBrand(res.data);
    });
  }, []);

  useEffect(() => {
    if (chosenBrand) {
      modelService.search(`brand==${chosenBrand}`).then((res) => {
        setDataModel(res.data);
        setIsDisableBrand(false);
      });
    }
  }, [chosenBrand]);

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
                licensePlates: newValue,
                modelName: "",
                brandName: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpenDialog(true);
            setDialogValue({
              licensePlates: newValue.inputValue,
              modelName: "",
              brandName: "",
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
              licensePlates: `Thêm Xe "${params.inputValue}"`,
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
          return option.licensePlates;
        }}
        renderOption={(props, option) => (
          <li {...props}>{option.licensePlates}</li>
        )}
        freeSolo
        renderInput={(params) => (
          <TextField
            id='input-search-header'
            placeholder='Nhập Biển số xe'
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
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='md'>
        <form>
          <DialogTitle>Thêm Xe Máy</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 1 }}>
              <Grid container rowSpacing={3}>
                <Grid item alignItems='center' xs={12}>
                  <TextField
                    label='Biển số xe'
                    variant='outlined'
                    placeholder='Biển số xe'
                    fullWidth
                    value={dialogValue.licensePlates}
                    {...register("licensePlates", {
                      required: "Trường này không được để trống",
                    })}
                    onChange={(event) =>
                      setDialogValue({
                        ...dialogValue,
                        licensePlates: event.target.value,
                      })
                    }
                  ></TextField>
                  {errors.licensePlates && (
                    <FormHelperText error id='helper-text-licensePlates'>
                      {errors.licensePlates.message}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item alignItems='center' xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-select-label'>Hãng xe</InputLabel>
                    <Select
                      defaultValue=''
                      variant='outlined'
                      placeholder='Hãng xe'
                      label='Hãng xe'
                      labelId='demo-select-label'
                      {...register("brandName", {
                        required: "Trường này không được để trống",
                        onChange: (e) => {
                          setChosenBrand(e.target.value);
                          setDialogValue({
                            ...dialogValue,
                            brandName: e.target.value,
                          });
                        },
                      })}
                    >
                      {dataBrand.map((option) => (
                        <MenuItem value={option.brandName} key={option.id}>
                          {option.brandName}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.brandName && (
                      <FormHelperText error id='helper-text-brandName'>
                        {errors.brandName.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item alignItems='center' xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-select-modelName'>Kiểu xe</InputLabel>
                    <Select
                      defaultValue=''
                      disabled={isDisableBrand}
                      variant='outlined'
                      placeholder='Kiểu xe'
                      label='Kiểu xe'
                      labelId='demo-select-modelName'
                      {...register("modelName", {
                        required: "Trường này không được để trống",
                        onChange: (e) => {
                          setDialogValue({
                            ...dialogValue,
                            modelName: e.target.value,
                          });
                        },
                      })}
                    >
                      {dataModel.map((option) => (
                        <MenuItem value={option.modelName} key={option.id}>
                          {option.modelName}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.modelName && (
                      <FormHelperText error id='helper-text-modelName'>
                        {errors.modelName.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              type='button'
              onClick={async () => {
                const result = await trigger([
                  "modelName,brandName,licensePlates",
                ]);
                if (result) {
                  motorbikeService
                    .create(dialogValue)
                    .then((response) => {
                      setValue({
                        id: response.data.id,
                        licensePlates: response.data.licensePlates,
                        model: response.data.model,
                        brand: response.data.model.brand,
                      });
                    })
                    .then(() => {
                      handleCloseDialog();
                    })
                    .catch((error) => {
                      console.log(error);
                      toast.error("Tạo xe không thành công");
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

export default SearchMotorbike;
