import { Search } from "@mui/icons-material";
import {
  Avatar,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth";
import { getUsers } from "../../hooks/useAllUsers";

export const HomePage: React.FC<{}> = () => {
  const [users, setUser] = useState([]);

  const [search, setSearch] = useState<string>("");

  const [countPage, setCountPage] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);

  const { user } = useContext(AuthContext);

  React.useEffect(() => {
    const resolveUsers = async () => {
      const result = await getUsers(user.access_token, user.token_type);
      console.log(result);
      setUser(result.users);
      setCountPage(Math.ceil(result.users.length / 4));
    };

    resolveUsers();
  }, []);

  const handleChangeBuscar = (e) => {
    setSearch(e.target.value);
  };

  console.log(search);

  let result = [];
  if (!search) {
    result = users;
  } else {
    result = users.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const paginationUsers = () => {
    return users.slice(currentPage, currentPage + 4);
  };

  const filteredandpagination = () => {
    if (!search) {
      return paginationUsers();
    } else {
      return users.filter((x) =>
        x.name.toLowerCase().includes(search.toLocaleLowerCase())
      );
    }
  };

  const handleChangePagination = (event, value) => {
    let current = value - 1;
    setCurrentPage(current * 4);
    console.log(event);
    console.log(value);
  };

  return (
    <Container sx={{ mt: 2 }} maxWidth="xl">
      <Grid container>
        <Grid item>
          <Typography variant="h4">Dashboard</Typography>
          <FormControl sx={{ marginBottom: 2, width: 350 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password"></InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              autoFocus
              value={search}
              onChange={handleChangeBuscar}
              endAdornment={
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {users.length > 0 ? (
            <TableContainer>
              <Table >
                <TableHead>
                  <TableRow sx={{ bgcolor: "#474444" }}>
                    <TableCell align="center">NAME</TableCell>
                    <TableCell align="center">SURNAME</TableCell>
                    <TableCell align="center">BIRTHDATE</TableCell>
                    <TableCell align="center">GENDER</TableCell>
                    <TableCell align="center">PHONE</TableCell>
                    <TableCell align="center">EMAIL</TableCell>
                    <TableCell align="center">PROFESION</TableCell>
                    <TableCell align="center">PHOTO</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length > 0
                    ? filteredandpagination().map((x) => (
                        <TableRow key={x.contactId}>
                          <TableCell align="center">
                            <Typography>{x.name}</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography>{x.surnames}</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography>
                              {new Date(x.birthDate).toLocaleDateString(
                                "en-us",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography>{x.gender}</Typography>
                          </TableCell>
                          <TableCell>
                            {x.phone ? (
                              <Typography> {x.phone} </Typography>
                            ) : (
                              <Typography align="center">--</Typography>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {x.email ? (
                              <Typography> {x.email} </Typography>
                            ) : (
                              <Typography align="center">--</Typography>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Typography>{x.profesion}</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Avatar alt="IMG" src={x.photo} />
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Grid item xs={3} sx={{ mt: 21 }}>
              <CircularProgress />
            </Grid>
          )}
          {filteredandpagination().length > 0 ? (
            <Stack spacing={2}>
              <Pagination
                style={{ marginTop: 20 }}
                count={countPage}
                color="primary"
                disabled={search ? true : false}
                onChange={handleChangePagination}
              />
            </Stack>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
};
