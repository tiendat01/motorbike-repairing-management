import { Box, Button, Popper, Zoom } from "@mui/material";
import { IconSearch } from "@tabler/icons";
import PropTypes from "prop-types";
import { forwardRef, useState } from "react";
import SearchCustomer from "./TicketCustomer/SearchCustomer";
import SearchMotorbike from "./TicketMotorbike/SearchMotorbike";

const Transitions = forwardRef(({ children, ...others }, ref) => {
  const positionSX = {
    transformOrigin: "0 0 0",
  };

  return (
    <Box ref={ref}>
      <Zoom {...others}>
        <Box sx={positionSX}>{children}</Box>
      </Zoom>
    </Box>
  );
});

Transitions.propTypes = {
  children: PropTypes.node,
};

const SearchBox = ({ isSearchCustomer, resultList, setSearchResult }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickSearchIcon = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  return (
    <Box>
      <Box>
        <Button onClick={handleClickSearchIcon}>
          <IconSearch stroke={1.5} display='block' size='1.5rem' />
        </Button>
      </Box>
      <Popper open={open} anchorEl={anchorEl} transition placement='left'>
        {({ TransitionProps }) => (
          <>
            <Transitions {...TransitionProps} sx={{ transformOrigin: "right" }}>
              {isSearchCustomer ? (
                <SearchCustomer
                  resultList={resultList}
                  setSearchResult={setSearchResult}
                  setOpen={setOpen}
                />
              ) : (
                <SearchMotorbike
                  resultList={resultList}
                  setSearchResult={setSearchResult}
                  setOpen={setOpen}
                />
              )}
            </Transitions>
          </>
        )}
      </Popper>
    </Box>
  );
};

export default SearchBox;
