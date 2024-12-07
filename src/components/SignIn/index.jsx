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
    if (!data.email || !data.password) {
      setAlertState({
        open: true,
        message: "Please fill in all fields!",
        severity: "warning",
      });
      return;
    }

    fetch(`https://back.ecomonitoring.uz/account/v1/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "uz",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.detail || "Login failed. Please try again.");
          });
        }
        return res.json();
      })
      .then((res) => {
        console.log("Login successful:", res);

        // Tokenlarni LocalStorage'ga saqlash
        localStorage.setItem("access_token", res.access);
        localStorage.setItem("refresh_token", res.refresh);
        localStorage.setItem("account_id", res.account_id);
        localStorage.setItem("expires_in", res.expires_in);

        // Muvaffaqiyatli xabar va navigatsiya
        setAlertState({
          open: true,
          message: "Login successful! Redirecting to home...",
          severity: "success",
        });

        // 3 soniya kutib, home sahifasiga o'tish
        setTimeout(() => {
          navigate("/home"); // Marshrutingizga mos ravishda yo'naltirish
        }, 1000);
      })
      .catch((error) => {
        console.error("Login error:", error);
        setAlertState({
          open: true,
          message: error.message || "An error occurred. Please try again.",
          severity: "error",
        });
      });
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
