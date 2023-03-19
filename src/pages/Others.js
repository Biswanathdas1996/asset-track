import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const total = 65000;

function App({ getTotal }) {
  getTotal(total);
  return (
    <Card style={{ margin: 10 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Others Asset{" "}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Total: ₹{parseFloat(total).toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default App;
