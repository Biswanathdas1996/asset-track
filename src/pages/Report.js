import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import Button from "@mui/material/Button";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { expanceTypeData } from "./AssetTrack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function FolderList() {
  const [data, setData] = useState([]);
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
          console.log("-storedData-->", storedData);
          setData(storedData);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const calculatTotalSpend = (type) => {
    const filterData = data?.filter(
      (val) => val?.field3 === type && val?.field1 === "Debited"
    );
    let total = 0;
    filterData?.map((filterItem) => {
      total += Number(filterItem?.field2);
    });
    return total;
  };

  return (
    <>
      <center>
        <h1>Report</h1>
      </center>
      <Card>
        <CardContent>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {expanceTypeData?.map((data) => (
              <ListItem>
                <ListItemText primary={data} secondary="Jan 9, 2014" />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteItem(item)}
                >
                  <b>₹{calculatTotalSpend(data)}</b>
                </Button>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
}
