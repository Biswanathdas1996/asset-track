import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const EXAMPLE_STORAGE_KEY = "exampleStorageKey";

export const expanceTypeData = [
  "Investment",
  "Transport",
  "Clothing",
  "Food",
  "Shopping",
  "Entertainment",
  "Donation",
  "Lone",
  "Lone Repayment",
  "EMI",
  "Health",
  "Other",
];

const ExampleComponent = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
  });
  const [editItem, setEditItem] = useState(null);

  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebited, setTotalDebited] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://sosal.in/endpoints/get_all_transction_data.php",
      requestOptions
    )
      .then((response) => response.json())
      .then((storedData) => {
        if (storedData) {
          const getOldData = storedData;
          console.log("--->", getOldData);

          let Credit = 0,
            debit = 0;

          getOldData?.map((dataList) => {
            if (dataList?.field1 === "Debited") {
              debit += parseFloat(dataList?.field2);
            } else {
              Credit += parseFloat(dataList?.field2);
            }
          });
          setTotalCredit(Credit);
          setTotalDebited(debit);
          setData(getOldData);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleAddItem = () => {
    if (newItem?.field1 && newItem?.field2 && newItem?.field3) {
      var formdata = new FormData();
      formdata.append("field1", newItem?.field1);
      formdata.append("field2", newItem?.field2);
      formdata.append("field3", newItem?.field3);
      formdata.append("field4", newItem?.field4);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "https://sosal.in/endpoints/add_transction_data.php",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setData([...data, newItem]);
          setNewItem({ field1: "", field2: "", field3: "", field4: "" });
        })
        .catch((error) => console.log("error", error));
    }
  };

  const handleEditItem = () => {
    setData(data.map((item) => (item === editItem ? newItem : item)));
    setEditItem(null);
    setNewItem({ field1: "", field2: "", field3: "", field4: "" });
  };

  const handleDeleteItem = (item) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://sosal.in/endpoints/delete_transction_data.php?id=${item?.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        fetchData();
      })
      .catch((error) => fetchData());
  };

  return (
    <center>
      <h1>Money Tracker</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card
            style={{
              margin: 10,
              textAlign: "center",
              background: "#212F3D",
              color: "white",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <b>
                  {" "}
                  ₹
                  {parseFloat(
                    Number(totalCredit) - Number(totalDebited)
                  ).toFixed(2)}
                </b>
              </Typography>
              <Typography variant="body2" color="text.white">
                Total{" "}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={{ margin: 10, background: "#239B56", color: "white" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                ₹{parseFloat(totalCredit).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.white">
                Credited{" "}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={{ margin: 10, background: "#CB4335", color: "white" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                ₹{parseFloat(totalDebited).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.white">
                Debited{" "}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {data?.map((item, index) => {
          return (
            <Card key={JSON.stringify(item)}>
              <CardContent>
                <ListItem>
                  <ListItemAvatar
                    style={
                      item.field1 === "Credited"
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >{`₹${item.field2}`}</ListItemAvatar>
                  <ListItemText primary={item.field3} secondary={item.field4} />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteItem(item)}
                  >
                    <DeleteIcon />
                  </Button>
                </ListItem>
              </CardContent>
            </Card>
          );
        })}
      </List>

      <Card>
        <CardContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Debited"
                  control={<Radio />}
                  label="Debited"
                  onClick={(e) => setNewItem({ ...newItem, field1: "Debited" })}
                />
                <FormControlLabel
                  value="Credited"
                  control={<Radio />}
                  label="Credited"
                  onClick={(e) =>
                    setNewItem({ ...newItem, field1: "Credited" })
                  }
                />
              </RadioGroup>

              <TextField
                id="outlined-basic"
                label="Amount"
                variant="outlined"
                type="number"
                value={newItem.field2}
                onChange={(e) =>
                  setNewItem({ ...newItem, field2: e.target.value })
                }
                style={{ width: 350 }}
                fullWidth
              />

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
                onChange={(e) =>
                  setNewItem({ ...newItem, field3: e.target.value })
                }
                style={{ margin: 10, width: 350 }}
              >
                {expanceTypeData?.map((data) => (
                  <MenuItem value={data}>{data}</MenuItem>
                ))}
              </Select>

              <TextField
                id="outlined-basic"
                label="Reason"
                variant="outlined"
                type="text"
                value={newItem.field4}
                onChange={(e) =>
                  setNewItem({ ...newItem, field4: e.target.value })
                }
                fullWidth
                style={{ width: 350 }}
              />
              <Button
                variant="contained"
                onClick={handleAddItem}
                style={{ margin: 10 }}
              >
                Add
              </Button>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </center>
  );
};

export default ExampleComponent;
