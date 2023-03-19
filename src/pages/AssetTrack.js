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

  // Load data from local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem(EXAMPLE_STORAGE_KEY);
    if (storedData) {
      const getOldData = JSON.parse(storedData);
      console.log("--->", getOldData);

      let Credit = 0,
        debit = 0;

      getOldData?.map((data) => {
        if (data?.field1 === "Debited") {
          debit += parseFloat(data?.field2);
        } else {
          Credit += parseFloat(data?.field2);
        }
      });
      setTotalCredit(Credit);
      setTotalDebited(debit);
      setData(getOldData);
    }
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(EXAMPLE_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleAddItem = () => {
    setData([...data, newItem]);
    setNewItem({ field1: "", field2: "", field3: "", field4: "" });
  };

  const handleEditItem = () => {
    setData(data.map((item) => (item === editItem ? newItem : item)));
    setEditItem(null);
    setNewItem({ field1: "", field2: "", field3: "", field4: "" });
  };

  const handleDeleteItem = (item) => {
    setData(data.filter((i) => i !== item));
  };

  return (
    <center>
      <h1>Add/Edit/Delete Items</h1>
      <Grid container spacing={2}>
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

      {editItem ? (
        <>
          <h2>Edit Item</h2>
          <input
            type="text"
            defaultValue={editItem.field1}
            onChange={(e) => setNewItem({ ...newItem, field1: e.target.value })}
          />
          <input
            type="text"
            defaultValue={editItem.field2}
            onChange={(e) => setNewItem({ ...newItem, field2: e.target.value })}
          />
          <input
            type="text"
            defaultValue={editItem.field3}
            onChange={(e) => setNewItem({ ...newItem, field3: e.target.value })}
          />
          <button onClick={handleEditItem}>Save</button>
        </>
      ) : (
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
                  defaultValue="Debited"
                >
                  <FormControlLabel
                    value="Debited"
                    control={<Radio />}
                    label="Debited"
                    onClick={(e) =>
                      setNewItem({ ...newItem, field1: "Debited" })
                    }
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
                  fullWidth
                />

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Type"
                  onChange={(e) =>
                    setNewItem({ ...newItem, field3: e.target.value })
                  }
                  style={{ margin: 10 }}
                >
                  <MenuItem value={"Investment"}>Investment</MenuItem>
                  <MenuItem value={"Food"}>Food</MenuItem>
                  <MenuItem value={"Transport"}>Transport</MenuItem>
                  <MenuItem value={"Clothing"}>Clothing</MenuItem>
                  <MenuItem value={"Shopping"}>Shopping</MenuItem>
                  <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                  <MenuItem value={"Donation"}>Donation</MenuItem>
                  <MenuItem value={"Lone"}>Lone</MenuItem>
                  <MenuItem value={"Lone Repayment"}>Lone Repayment</MenuItem>
                  <MenuItem value={"EMI"}>EMI</MenuItem>
                  <MenuItem value={"Health"}>Health</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
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
      )}
    </center>
  );
};

export default ExampleComponent;
