import { Avatar, Button, Container, Grid, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth";

import { useNotification } from "../../context/notification";
import { getUsers } from '../../hooks/useAllUsers';

export const HomePage: React.FC<{}> = () => {
    const {getError, getSuccess} = useNotification();
    const [users, setUser] = useState([]);
    const [birthday, setBirthDay] = useState();

    const { user } = useContext(AuthContext);

    const responseGetUsers = getUsers(user.access_token, user.token_type);

    const resolveUsers = async () => {
       const result = await responseGetUsers
       console.log(result);
        setUser(result.users)
        // return result?.users;
    }
    
    // const users = otrafuncion();
    

    const handleClick = () => {
        getSuccess('Hola Mundo');
    }

    React.useEffect(() => {
        // const getAllUsers = async() =>{
        //     const response = getUsers();
        // }
        resolveUsers();
    }, [])

    console.log(users);
    
    
  return (
    <Container sx={{ mt: 5 }} maxWidth="xl">
      <Typography variant='h4'>Dashboard</Typography>


      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
            <TableContainer sx={{mt: 3}}>
                <Table>
                    <TableHead>
                        <TableRow sx={{bgcolor: '#474444'}}>
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
                        {users ? users.map((x) => (
                            <TableRow key={x.contactId}>
                                <TableCell align="center">
                                    <Typography>{x.name}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography>{x.surnames}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography>{new Date(x.birthDate).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"})}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography>{x.gender}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{x.phone ? x.phone : '-'}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography>{x.email}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography>{x.profesion}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Avatar alt="IMG" src={x.photo} />
                                </TableCell>
                            </TableRow>
                        )): null}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};
