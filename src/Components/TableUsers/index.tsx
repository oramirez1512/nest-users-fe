import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { CardHeader } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';

interface user {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city:string;
    street: string;
    suite: string;
    zipcode: string;
    geo: Array<{
      lat: string;
      lng: string;
    }>;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface IProps {
  persons: never[];
}

function TableUser(props: IProps) {
  const persons: never[] = props.persons;
  const [addr, setAddr] = React.useState("");
  const [website, setwebsite] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [avatar, setAvatar] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const updateRow = (p: never) => {
    console.log(p)
    const {id,email,username, website, phone, address: { street, city, suite }, company: {name, bs} } = p;
    setAddr(suite+"-"+street+"-"+city);
    setwebsite(website);
    setPhone(phone);
    setCompany(name+"-"+bs);
    setAvatar(id);
    setEmail(email);
    setUsername(username);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <React.Fragment>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {persons.map((p, index) => {
                  return (
                    <React.Fragment>
                      <TableRow key={index} onClick={() => updateRow(p)} hover>
                        <TableCell component="th" scope="row">
                          {p["id"]}
                        </TableCell>
                        <TableCell>{p["name"]}</TableCell>
                        <TableCell>{p["username"]}</TableCell>
                        <TableCell>{p["email"]}</TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardHeader avatar={
            <Avatar>{avatar}</Avatar>
          }
          title={username}
          subheader={email}/>
          <CardContent>
            <Typography>Adress:</Typography>
            <Typography>{addr}</Typography>
            <Typography>website:</Typography>
            <Typography>{website}</Typography>
            <Typography>Phone:</Typography>
            <Typography>{phone}</Typography>
            <Typography>Company:</Typography>
            <Typography>{company}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default class PersonList extends React.Component {
  state = {
    persons: [],
  };

  componentDidMount() {
    axios.get(`https://nest-user-be.herokuapp.com/users`).then((res) => {
      const persons: [user] = res.data;
      this.setState({ persons });
    });
  }

  render() {
    return <TableUser persons={this.state.persons}></TableUser>;
  }
}
