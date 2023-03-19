import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Stocks from "../pages/Stocks";
import Crypto from "../pages/Crypto";
import EPF from "../pages/EPF";
import Others from "../pages/Others";

function Home() {
  const [stock, setStock] = useState(0);
  const [crypto, setCrypto] = useState(0);
  const [epf, setEpf] = useState(0);
  const [others, setOthers] = useState(0);
  const [total, setTotal] = useState(0);

  const getStockInfo = (total) => setStock(total);
  const getCryptoInfo = (total) => setCrypto(total);
  const getEpfInfo = (total) => setEpf(total);
  const getOthersInfo = (total) => setOthers(total);

  useEffect(() => {
    const totlaVal = stock + crypto + epf + others;
    setTotal(totlaVal);
  }, [stock, crypto, epf, others]);

  return (
    <div>
      <h2
        style={{
          margin: 10,
          textAlign: "center",
        }}
      >
        Asset Tracker
      </h2>
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
            <b> ₹{parseFloat(total).toFixed(2)}</b>
          </Typography>
          <Typography variant="body2" color="text.white">
            Total{" "}
          </Typography>
        </CardContent>
      </Card>
      <Card style={{ margin: 10, background: "#6C3483", color: "white" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ₹{parseFloat(stock).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.white">
            Equity{" "}
          </Typography>
        </CardContent>
      </Card>
      <Card style={{ margin: 10, background: "#2874A6", color: "white" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ₹{parseFloat(crypto).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.white">
            Crypto{" "}
          </Typography>
        </CardContent>
      </Card>
      <Card style={{ margin: 10, background: "#1E8449", color: "white" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ₹{parseFloat(others).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.white">
            Others Asset{" "}
          </Typography>
        </CardContent>
      </Card>
      <Card style={{ margin: 10, background: "#A04000", color: "white" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ₹{parseFloat(epf).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.white">
            Employees Provident Fund{" "}
          </Typography>
        </CardContent>
      </Card>

      <Stocks getTotal={getStockInfo} />
      <Crypto getTotal={getCryptoInfo} />
      <Others getTotal={getOthersInfo} />
      <EPF getTotal={getEpfInfo} />
    </div>
  );
}

export default Home;
