import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const total = 66807;

function App({ getTotal }) {
  const [maticPrice, setMaticPrice] = useState("");
  getTotal(total);
  return (
    <Card style={{ margin: 10 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Employees Provident Fund{" "}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Total: ₹{parseFloat(total).toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default App;
