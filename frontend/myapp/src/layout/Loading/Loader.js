import React from "react";
import LoaderGif from "../../assets/img/loader.gif";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#F8F8F8AD",
      }}
    >
      <div
        style={{
          left: "50%",
          top: "30%",
          zIndex: 1000,
          position: "absolute",
        }}
      >
        <img src={LoaderGif} alt='Loader' />
      </div>
    </div>
  );
};

export default Loader;
