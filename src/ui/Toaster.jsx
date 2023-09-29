import Toaster from "react-hot-toast";

function ToasterMsg() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOption={{
        success: { duration: 30000 },
        error: { duration: 50000 },
        style: {
          fontSize: "25px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "red",
          color: "red",
        },
      }}
    />
  );
}

export default ToasterMsg;
