import React, { useState } from "react";
import Button from "../Generics/Button";
import { Container } from "./style";
import Input from "../Generics/Input";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SignIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "success", // "success", "error", "warning", "info"
  });

  const navigate = useNavigate();

  const onChange = ({ target: { value, name } }) => {
    setData({ ...data, [name]: value });
  };

  const handleCloseAlert = () => {
    setAlertState((prev) => ({ ...prev, open: false }));
  };

  const onSubmit = () => {
    // Hardcoded credentials
    const validEmail = "muhammadalinosirov34@gmail.com";
    const validPassword = "muhammadali123";

    // Ensure all fields are filled
    if (!data.email || !data.password) {
      setAlertState({
        open: true,
        message: "Please fill in all fields!",
        severity: "warning",
      });
      return;
    }

    // Validate credentials
    if (data.email === validEmail && data.password === validPassword) {
      setAlertState({
        open: true,
        message: "Login successful!",
        severity: "success",
      });

      // Delay navigation to show the alert
      setTimeout(() => {
        navigate("/home"); // Redirect to home page
      }, 2000); // 2 seconds delay
    } else {
      setAlertState({
        open: true,
        message: "Invalid email or password.",
        severity: "error",
      });
    }
  };

  const onSignUp = () => {
    navigate("/signup");
  };

  return (
    <React.Fragment>
      <Container>
        <h2>Sign in</h2>
        <form>
          <label htmlFor="">Your Email</label>
          <Input
            br={"6"}
            mb={"16"}
            mt={"4"}
            name={"email"}
            onChange={onChange}
            typing={"register"}
            placeholder={"Enter your email"}
          />
          <label htmlFor="">Your Password</label>
          <Input
            type={"password"}
            br={"6"}
            mb={"16"}
            mt={"4"}
            name={"password"}
            onChange={onChange}
            typing={"register"}
            placeholder={"Enter your password"}
          />
        </form>
        <Button type={"primary"} br={"6"} onClick={onSubmit}>
          Sign In
        </Button>
        <p onClick={onSignUp}>
          Don't have an account? <span>Go to sign up.</span>
        </p>
      </Container>
      <Footer />

      {/* Snackbar Alert */}
      <Snackbar
        open={alertState.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Top-right corner
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertState.severity}
          sx={{ width: "100%" }}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default SignIn;
