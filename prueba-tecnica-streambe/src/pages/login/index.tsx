import { Box, Button, Container, Grid, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/notification";
import { LoginValidate } from "../../utils/validateForm";
import { AuthContext } from "../../auth/context/AuthContext";
import { getLogin } from "../../hooks/useLogin";

type LoginType = {
  username: string;
  password: string;
};

export const LoginPage: React.FC<{}> = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const { getError, getSuccess } = useNotification();

  const [loginData, setLoginData] = useState<LoginType>({
    username: "",
    password: "",
  });

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    LoginValidate.validate(loginData)
      .then(async () => {
        if (
          loginData.username !== process.env.REACT_APP_USERNAME_LOG ||
          loginData.password !== process.env.REACT_APP_PASSWORD_LOG
        ) {
          return getError("Usuario o password incorrecto");
        }
        const user = await getLogin();
        console.log(user.access_token);
        if (user.access_token !== undefined) {
          login(user);
          navigate("/", { replace: true });
        } else {
          getError("Error de servidor. Vuelva a intentar más tarde");
        }
      })
      .catch((error) => {
        getError(error.message);
      });
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
            <Typography sx={{ mt: 1, mb: 1 }} variant="h4">
              Sign in to Streambe
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                name="username"
                sx={{ mt: 2, mb: 1.5 }}
                fullWidth
                label="Email"
                onChange={handleChangeLogin}
              />
              <TextField
                margin="normal"
                name="password"
                type="password"
                sx={{ mt: 2, mb: 1.5 }}
                fullWidth
                label="Password"
                onChange={handleChangeLogin}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 1.5, mb: 3 }}
              >
                Sign in
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
