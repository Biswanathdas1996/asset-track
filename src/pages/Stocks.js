import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { BASE_URL as API_END_POINT } from "../config";
import StockData from "../Data/Stock.json";

export default function FolderList({ getTotal }) {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const apiEndpoints = StockData.map(
      (data) =>
        `${API_END_POINT}/nse/get_quote_info?companyName=${data?.symbol}`
    );
    const promises = apiEndpoints.map((url) => fetch(url));
    Promise.all(promises)
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((data) => {
        console.log("--data->", data);

        setResponse(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getPrice = (symbol) => {
    const findPriceData = response?.find(
      (val) => val?.data[0]?.symbol === symbol
    );
    return findPriceData?.data[0]?.lastPrice.replace(/,/g, "");
  };

  const getTotalInvestment = () => {
    let totalInv = 0;
    StockData?.map((data, index) => {
      let total =
        parseFloat(getPrice(data?.symbol)) * parseFloat(data?.holding);
      totalInv += total;
    });
    getTotal(totalInv);
    return totalInv;
  };
  getTotalInvestment();
  return (
    <>
      <Card>
        <CardContent>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {StockData?.map((data, index) => {
              let total =
                parseFloat(getPrice(data?.symbol)) * parseFloat(data?.holding);

              return (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${data?.name} (₹${getPrice(data?.symbol)})`}
                    secondary={`Qty: ${data?.holding}  ||  Total: ₹${parseFloat(
                      total
                    ).toFixed(2)}`}
                  />
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
}
