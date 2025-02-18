import React from "react";
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return <>{children}</>;
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <marquee style={{fontSize:"30px"}} behavior="scroll" direction="left" scrollamount="6">
          Please Login 🚀
        </marquee>
      </div>
    );
  }
};

export default ProtectedRoute;
