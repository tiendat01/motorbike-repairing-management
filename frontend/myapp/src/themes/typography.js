export default function themeTypography(theme) {
  return {
    h6: {
      fontSize: "0.75rem",
      color: theme.heading,
      fontWeight: 500,
    },
    h5: {
      fontSize: "0.875rem",
      color: theme.heading,
      fontWeight: 500,
    },
    h4: {
      fontSize: "1rem",
      color: theme.heading,
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.25rem",
      color: theme.heading,
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.5rem",
      color: theme.heading,
      fontWeight: 700,
    },
    h1: {
      fontSize: "2.125rem",
      color: theme.heading,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: "0.875rem",
      color: theme.textDark,
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "0.75rem",
      color: theme.darkTextSecondary,
      fontWeight: 400,
    },
    caption: {
      fontSize: "0.75rem",
      color: theme.darkTextSecondary,
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.334em",
    },
    body2: {
      letterSpacing: "0em",
      color: theme.darkTextPrimary,
      fontWeight: 400,
      lineHeight: "1.5em",
    },
    button: {
      textTransform: "capitalize",
    },
    customInput: {
      marginTop: 1,
      marginBottom: 1,
      "& > label": {
        top: 22,
        left: 0,
        color: theme.grey500,
        '&[data-shrink="false"]': {
          top: 5,
        },
      },
      "& > div > input": {
        padding: "30.5px 15px 11.5px !important",
      },
      "& legend": {
        display: "none",
      },
      "& fieldset": {
        top: 0,
      },
    },
    mainContent: {
      backgroundColor: theme.background,
      width: "100%",
      minHeight: "100vh",
      flexGrow: 1,
      padding: "30px 50px",
      marginTop: 0,
    },
    menuCaption: {
      fontSize: "0.875rem",
      color: theme.heading,
      fontWeight: 500,
      padding: "5px",
      textTransform: "capitalize",
      marginTop: "10px",
    },
    subMenuCaption: {
      fontSize: "0.6875rem",
      color: theme.darkTextSecondary,
      fontWeight: 500,
      textTransform: "capitalize",
    },
    commonAvatar: {
      cursor: "pointer",
      borderRadius: "8px",
    },
    smallAvatar: {
      width: "22px",
      height: "22px",
      fontSize: "1rem",
    },
    mediumAvatar: {
      width: "35px",
      height: "35px",
      fontSize: "1.2rem",
    },
    largeAvatar: {
      width: "45px",
      height: "45px",
      fontSize: "1.5rem",
    },
  };
}
