import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Generics/Button";
import Input from "../Generics/Input";
import Footer from "../Footer";
import { Container } from "./style";
import SimpleAlert from "../SimpleAlert";

const SignUp = () => {
  const [data, setData] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });

  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "success", // success | error | warning | info
  });

  const navigate = useNavigate();

  const onChange = ({ target: { name, value } }) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const showAlert = (message, severity = "success") => {
    setAlertState({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlertState((prevState) => ({ ...prevState, open: false }));
  };

  const onSubmit = () => {
    // Validation check
    if (Object.values(data).some((field) => !field.trim())) {
      showAlert("All fields are required!", "error");
      return;
    }

    if (data.password !== data.password2) {
      showAlert("Passwords do not match!", "error");
      return;
    }

    // Fetch API call
    fetch("http://back.ecomonitoring.uz/account/v1/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "uz",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.errors.map((e) => e.detail).join("\n"));
          });
        }
        return response.json();
      })
      .then((res) => {
        console.log("Registration successful:", res);
        showAlert("User registered successfully!", "success");
        setTimeout(() => navigate("/signin"), 3000); // Redirect after 3 seconds
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        showAlert(error.message || "Registration failed!", "error");
      });
  };

  return (
    <React.Fragment>
      <Container>
        <h2>Sign Up</h2>

        <form>
          <label>Firstname</label>
          <Input
            name="first_name"
            placeholder="Enter your first name"
            onChange={onChange}
            br="6"
            mb="16"
            mt="4"
          />

          <label>Lastname</label>
          <Input
            name="last_name"
            placeholder="Enter your last name"
            onChange={onChange}
            br="6"
            mb="16"
            mt="4"
          />

          <label>Username</label>
          <Input
            name="username"
            placeholder="Enter your username"
            onChange={onChange}
            br="6"
            mb="16"
            mt="4"
          />

          <label>Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={onChange}
            br="6"
            mb="16"
            mt="4"
          />

          <label>Password</label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={onChange}
            br="6"
            mb="16"
            mt="4"
          />

          <label>Confirm Password</label>
          <Input
            type="password"
            name="password2"
            placeholder="Confirm your password"
            onChange={onChange}
            br="6"
            mb="16"
            mt="4"
          />
        </form>

        <Button type="primary" br="6" onClick={onSubmit}>
          Sign Up
        </Button>
        <p>
          Already signed up?{" "}
          <span onClick={() => navigate("/signin")} style={{ cursor: "pointer", color: "blue" }}>
            Go to sign in.
          </span>
        </p>
      </Container>

      {/* Alert Snackbar */}
      <SimpleAlert
        open={alertState.open}
        message={alertState.message}
        severity={alertState.severity}
        onClose={handleCloseAlert}
      />

      <Footer />
    </React.Fragment>
  );
};

export default SignUp;
