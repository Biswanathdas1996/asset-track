import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const holding = 900;

function App({ getTotal }) {
  const [maticPrice, setMaticPrice] = useState("");

  useEffect(() => {
    fetch("http://192.168.0.130:4000/matic")
      .then((response) => response.json())
      .then((data) => {
        setMaticPrice(data.data.MATIC.quote.INR.price);
        getTotal(parseFloat(data.data.MATIC.quote.INR.price) * holding);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <Card style={{ margin: 10 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          MATIC{" "}
          <small style={{ fontSize: 12 }}>
            (₹{parseFloat(maticPrice).toFixed(2)})
          </small>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Qty: {holding}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total: ₹{parseFloat(maticPrice) * holding}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default App;
