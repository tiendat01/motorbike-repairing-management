export default function componentStyleOverrides(theme) {
  const bgColor = theme.colors?.grey50;
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: "5px",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          paddingTop: "10px",
          paddingBottom: "10px",
          "&.Mui-selected": {
            color: theme.menuSelected,
            backgroundColor: theme.menuSelectedBack,
            "&:hover": {
              backgroundColor: theme.menuSelectedBack,
            },
            "& .MuiListItemIcon-root": {
              color: theme.menuSelected,
            },
          },
          "&:hover": {
            backgroundColor: theme.menuSelectedBack,
            color: theme.menuSelected,
            "& .MuiListItemIcon-root": {
              color: theme.menuSelected,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          minWidth: "36px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.textDark,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: theme.textDark,
          "&::placeholder": {
            color: theme.darkTextSecondary,
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: bgColor,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.colors?.grey400,
          },
          "&:hover $notchedOutline": {
            borderColor: theme.colors?.primaryLight,
          },
          "&.MuiInputBase-multiline": {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: bgColor,
          padding: "15.5px 15px",
          "&.MuiInputBase-inputSizeSmall": {
            padding: "10px 15px",
            "&.MuiInputBase-inputAdornedStart": {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 5,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: theme.colors?.grey300,
          },
        },
        mark: {
          backgroundColor: theme.paper,
          width: "5px",
        },
        valueLabel: {
          color: theme?.colors?.primaryLight,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.divider,
          opacity: 1,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.colors?.primaryDark,
          background: theme.colors?.primary200,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.paper,
          background: theme.colors?.grey700,
        },
      },
    },
  };
}
