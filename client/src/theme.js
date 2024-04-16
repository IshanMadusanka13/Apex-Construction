const siteTheme = (mode) => {
  return {
    palette: {
      mode: mode,

      ...(mode === "dark"
        ? {
          primary: {
            main: "#ff5200", //orange
            mainOpacity: "#ffae87", //dead orange
            mainOpacity2: "#ffccaa",
          },

          background: {
            default: "#100d08", //blue black
            inverse: "#edf2f7", //grey white
            white: "#ffffff", //white
          },

          text: {
            default: "#ffffff", //white
            inverse: "#000000", //black
            main: "#ff5200", //orange
            grey: "#797979",
          },

          typography: {
            poppins: {
              fontFamily: "poppins, Arial, sans-serif",
            },
          },
          gridBody: {
            marginLeft: 1,
            padding: "20px",
            width: "98%",
            marginTop: "1vh",
            backgroundColor: "rgba(200, 200, 200, 0.4)",
            borderRadius: "10px",
          }
        }
        : {
          primary: {
            main: "#ff5200", //orange
            mainOpacity: "#ffae87", //dead orange
            mainOpacity2: "#ffccaa",
          },

          background: {
            default: "#edf2f7", //grey white
            inverse: "#100d08", //blue black
            white: "#ffffff", //white
          },

          text: {
            default: "#000000", //black
            inverse: "#ffffff", //white
            main: "#ff5200", //orange
            grey: "#797979",
          },

          typography: {
            poppins: {
              fontFamily: "poppins, Arial, sans-serif",
            },
          },

          gridBody: {
            marginLeft: 1,
            padding: "20px",
            width: "95%",
            marginTop: "1vh",
            backgroundColor: "rgba(200, 200, 200, 0.4)",
            borderRadius: "10px",
          }

        }),
    },
  };
};

export default siteTheme;
