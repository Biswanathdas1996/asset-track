import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BASE_URL } from "../config";

const holding = 969.39;

function App({ getTotal }) {
  const [maticPrice, setMaticPrice] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/matic`)
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
        <center>
          <img
            alt="Travis Howard"
            src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAABLFBMVEX////4+PghISGDR+UAAAD19fX//v/8/Pz///0MDAz5+fmDR+QeHh4ZGRn///qASeTHt+NdXV2enp6DRuk1NTV7Pt8TExP///ff39+pqakVFRVpaWmDRuuFSN/v7+/b29t7SNMzMzO0tLSIXtD/+v+VlZU8PDyCQOmmguScdNheXl6NjY3Kysp0dHSFhYUnJydNTU26urpPT0+DQ/GHR9mwk9L9/+6bf82IUtqTXefQ0NBubm746/3Bq+N6Sst9WMStlN3y5Pzp1vTUxeVzPMOUdM+9qtJwPtTVzuV4NtyEQvyPb8uvjOLHr+CNa9Szndp6TsafhsiHY778/uSCW9S+nuRsP8HZxe+xl+acg8vWxu61n8p5WrtySLjn3Ov66/+WYN2SWe2JaLWaXuw8j1dkAAAVDUlEQVR4nO2dC1vTSreAJ81lQtIm1dAGMAlVA3FzlwQoWMrVHQVBdPuxj7gPx37+//9w1ppJeiG6ESG1aNaD0OY+b9as20wikTVBEwpJBWjIRCCFDIpQMMlIwSQrBZOsFEyyUjDJSsEkKwWTrBRMslIwyUrBJCsFk6wUTLJSMMlKwSQrBZOsFEyyUjDJSsEkKwWTrPwEJmoiwz7vd8uwmQAJ1TBso2DSFdVIUCiKMszz3kiGrScKaAkqiVow6YpCbNtWVds2ir7TJ36r5ZMRNifDYqIk7sZQ/e2n7fbO7h5Zp6Atwzj3jWUoTNB2oHWlinLxTxyIulVrf/JtOqImZThM0P+qxCb7pzXdEk1Xd5y4feCT0exAw+k7gIRS0lo7DBzRNC3LCkLHqr3cA+WB5aMmw2JCFf/PdhhErmuKluNYoq47Qbzb+j2ZoIeBjvPqn5ooijoAEV2dKYsLP+0TlW0wUm4oZyYqdhtNVfdevg6BCCDRUVOQjSWixDsHqm2gBR6dIC5vPVFtRbFb72phFIlcnPAIuhBASb7VjvdsFVyTYeR6ITeQnJlApzGUk8PIdKwEie5GkesEoC/sK7gg6/CNhp76d9ETxScHOzUwIaAYCQPLCQMndPSILbFEN9KDsxMfov08L+QmknffudyIQ9cVHYtDgegkbp8e7xzWHEfEJWByddCVGpqVXC/kBpIfE1VR7dbbMyu0UEmcQDQt3ToKzqo+pDz7G/ERdCDXNJGX6EIM93KP2KoyCsqSHxMISao7scW0QQcRTT20ztdaKrRcVf2/d8DSBqKLzgicENiXw7c+eJ+cruYmkh8Tqr4LQ25IA7QnEKk13rWwSgBOBtJB+ucZWBWRxW+mDj3ICU5b9q/NRD1phAE3rBb63LB2ekAUGyM4A8MWm7Q2YgtRgQZh5OJawUtlFIxKfkz8c4hJLO5+rcAy2ycKUVBHSFpOMuzL0xjsCVpeCPWjKIwP1kcgoM2Pyav4CBrKjUkQHK6BsTAggOMVWYxbIcIl6t/t2LEgetFNMXRcd20Uym/5ManWLBM0gHnh+HjPWCfka7UBfzt2Ih0tCgQvwbMRQJI7E0xtnLhqr1P/q1uBrrTehyzK1fXfgwm4WNCSV2A6vpH52obxl//BAe+j/zZMTNdxNwiWH7/eWjC6hvEqBpcM3ef3YCKC6Tzcx1zwG3oCkQokf80Ivc9vw8RxDn3mab7BBOIUhbzhGaIbPkv9Dg6NQcBLKdZVVHRZw4v687axkOQ0ri9F7wYAxbEi5xn/rmL1DWgACRvIKJQp1LB0aDSYrAUsR9aDhIlhcO1QWyf/2b7EBInlAzld6VUZBpNvmNc+YUwiPTx6yXsIIKD2+nrr42GtFrx+uo8TEcjQipMjxMR147OLNN8BTfH/066FkBqGTvzHnsJUZzgyGkx2AxeMcbzt25QwR6Qa5O8dzCCxRGfqtXitxTJHdRjDZKPBZO0ocl+/u2Q8VINS29h/GQe89sKrDUG7qtrofYagLCPCJKyB0cCMGZoMpsRfO7ecHhERS0+H7/dVfyiGdkSYnF1AmI+Dyjg/xT85dNxIDMV+JoFjxRstNhKf0wV3ZTSYHPi2ymJdStbJ32c1CxIgt9HHBIfIgEvjLRal8oYyEkxU26B2Uord2wBD4rqYKSV9hxVs2W9drJ1Vv1pxuFPJv1ZgfUfMRtYNsBTUtlv/E+PQqWiaphOGjo513CC0XGQCOTb8ef1yHxw1VdT8qk85M3Et02pfbxcVrNFSQzlp8w6DI6egJ0AkqMU1+IjDIckIs4mzEViWlJfkXmcz9euZqKxMS/ZPXzu80O+ghriRFXzYvrjYfh+HXSKiGDq1xgk1cpxNOgQmDf9aPcGpBa2PseOITteoOuFRu0rRevgnOzUHq7UplEb84UKxcxv3yJ+JFbeu3dYn/qfzo7AhBtywui74nfNPLRwZVFTwzttnrqVzm2s1IisMwS/n5n9yt7GmU/uT8DnlmT7EZuPgX+PgrOaAOWWqAIbUFZ14Y4+oVGUxi6IYLXBHTjIwgmVvy91p2TlZ2RyZvEYlwWbUfGNdZWN/g4aRuQ4DkrvLpzGErSY3oTjVQKztHCTeioMEi3NwCmGLZaWjI6b+R16eJ0cmgeVwJuJTuKVYIlIG5g4kU5Ns/2MtMrEem8xPcc3g/MTHAlxPYE/Fr54FbiMxOJYufkef/DEZChO9XSWGbWN+17cB5rm24b+NAxw1dri50PUwPGTOdkAL2GCq7e++dprcqpiOVTvI6crzY3JQE1Mmlhuf7hlXZ92A2ijKwU4t5IPGqauN/7vPpuMPuFpMhJhz2uBZkBOFeljN6cpzY6K2YrfHRAzijy1l0CgqBkYkVqSDdQVhm1rBP+BlWZh/xSJj5yPGOtl9jdoUNEL3HjKx38QWztWCaAvQ6E7Y2PZVHp1BaKFQlbR2GwF2GhcMK/iSyLVgGw6DlWMHDodPuFBCFXIMMQxOJNWDe8eEGP575l/T2XyQwH04IMACxyjQkJz8rx4mzobPJA5rH7/DbO6Dj3fAx1u1e8dEXTda787D0G24TlICgQD0+JLA7adgQS92apaVVtIgkBeD2um+YX99VLlflIZ+X5lAF7DV/dMYu0WSw0QN6yh+s4eDx/sbtaMAItN0iigEpjtVDNevjddV9QPkzOL9ZAItBPtxcBY6URKvo2lx4vbL3d0/YqYbZpeJ2cbJbL66fu08JdX4cG/1BIIs7CKq/7YRJt7HsSDph1wlZE9nmGxmH+AydQsCedWgOGXne/TEwojtPjJJC0k22duoYfNNNvMiDUNY7czERxIsvfH0EqeOKvyJlmvlKeiYdT+ZJALGgxy8j3HqI84dHiyx6uCAg0aVKkmES+3vmM9235ngeI29jgU0NsdetPqYgKsJHfHwbUtN6mxglPfWrj/mfWfCRzQhGmntxjid3O0h0SGAFeM/9lheiDnzuv1/u+d/XD0ClUG0/lrJfWfCyiaYDxt0b+MwcNz+vuPE/+wbhg/WGCNX1T9pBO5VJlSG4JUIct+i+86EED7+y9Lig3/ioIElIVQYfHa0yh6exKkliqFcPK1BVnyFCZWJ7HmeoPVd5S/AJBUVC6tnR46L9fggtOK1FknnClD18rgBkZgbXGEiUNmjlHpan6L8Qkxw1pHS2j0XwwBSm3iDTSrhTFR7+xynPoquc4WJTDw0KNT7lfSEat2PGH+o9t7LRhzH7w/QSaO7wTWq/ewIot2vM9FkwSOe0DOy950JlbvmkddDfEVtHVxc+qriE6U3mPcmCJsNJ8sE+o6sIZNfqO+gI+3/ju+DsXEWCXgbVjhLlj5zIrfbd1hJSWDXxW0s7R4Fwf4qTFLNV3u/1f7B8Gc1FuKa0WeDPWoKSLiCoS/WEmVjeqWQHXxkDH5en+R00XkyoRrtMqHJkq550bqpDfgV8gZnUePMgZpvU99eZzAproHYRE72VcFN+aR1Hlqmbrr6PdQT4CHInAn7yIwLLGEo+Cq2HawT7DedTieCdMgJtu2/ZHkdV+M/iEsEDGOZYWKLjLWG45hutNnpVHMaCMyLCWV3WvagHRyJwLqALGgIBZsnyCzoYG013sSNxmYH6/fx/rrhMy3BrcG24pYswhdwsXZ5FjmW2/nSiOIqFXKhkpueoEHgAgSYRZDZImgqSVYJAuQx7LO60fnSPPyCkb/5oeonq9k/khwCqIJd9qttt2OK0WaMejIQ8t/hpefFBFuhpQ1iWVzSzqSZQvJRYB3iTSfuRM2mbunNTgPCOYPtIxiaoqSHsGWD7h/HnfiLa242Os1Nsypo90xPPPSmrEHQbIHZSkShCbwjkB4vImufmlYTxHTMZqfTON9tabAceaRYbRms67szy9qMNiPzS3uz2Tl/JeQzYJwfk167OR7GxGPJnMwgoYIkLRb2z46iz8DEcpvNjhk67RPfFlTB92QVt4Bftv8WTI5uciaNzx3xv/duvJiZSa2PCXoOMLnoetk6AuY2ZWLTjyEqiqtHnWazAalzfPwKXLIs+4osGLIiyBc70Ls2XbPDmESfo0YVQztN1q69lJtKrvaEmUnwQB67cDQQbCHtGtAuE7m10QYa4E86jU0cEWp0zt/t+YItcHW6/C+qULvpcj2JNhs7n3xIDDXP8+4cSn7xSRJgoB/1BLxuAb2PwKHAH9CeXt+RbfXPD1Ez6jQOmx3RsUywK+H5Gk67AX/T+tRsbLp6p9ERwbyCsrjNpxc229OTvTt3PnnGbMz3EjQcPI7QZL4osbK8X4EQDUMQtbV2bn75/LkDIRnE7m5zc7O5s93y/b2TdtD80nEtd3Mzcs3PX8QamBtfgD4F3dLz7rwBecb2WsKCCol6U9QTvhDtgIafWK7Hfq3b+6exiyM+LuYzpuuaZnzYbp83XPZwBo4J4WRI8XC3RRT04Czyv/vrz5HJTWMHavxl/N0MxcjF9xzgCJkVhCH8hJAHW5ALmSbW/uPjPUx8lPzeSzVS7xlWVdXfPg+PdBdHUdmTpBG+eokPleG7Y6z47IDzyPGtvKPERMVKNs5wxNEwnU2wN002wQ16E3v1Re38k7JOqY1vpPotmKgGe1OmTfaPX7Op9qxEm4w04xQmJ/7YUm2FzV/J8+XNI8QkEUDjV3dwTjVoCb7aAaeZu1YIYdy+cs+f8/pxMdbXIZAPHEsHBxQ6OKlLF2tsfspQXi40akxUNXlrDBs25BOJrfAoPN/22ZRqdQiPo48aEw6FTQPcf38oOnoEZsXEieY4v1b5PZngIwf4PmLDsJVquyZCkBK/PzBsSvzhEBk+ExbeC99VMwQArZPTRvu46g/3jULDZjIjoTz4rm3xnSmK75Nhv7d62Ewe1kulUmXuu7aFSGTdRsPqD/etbUNnMoZMvk9PMFYlaHWNX7vv3IQJe3EBvgD+V+87N2BCkicPhi0jzuSnSMEkKwWTrBRMslIwyUrBJCsFk6zclgnt+33tZuS2TL5+HvpvK39A7lpPerMf6FefO0mZUNaEvm3SBaS/ccl6Svu3ITLtP366Cf6lGu3b/Efldky8+ZmZmfkJIjxcHZOk8txDb+BuTc+vViSpPru0QNKWdvVEFjSQ/q1pd5Kb9/BBWZKWF7fYDDiUdANvcg5OJI2tzE/39oOdcD9tchxWLS9N3KJBTG7HZEIaq9elrem6VCmVS+WpMWnOY9eH/6ZXpHqlXCqVy3Vp+XmyR5fJA1Y0kKZTiNPs6wTRiPdCGoP9cLdHGq8tPCTskHSJrYFDVurSCm6LpyrjFjNkuiIlJ5u5ZTe6LRO4wPrMGF4nl7qEOoHTpyeBU1fK0iLXlC6Tady1NLWYHurFFHx7BNtsjdV7R1uexUOPMSbEG5d6RyxVpOcc/zhsUl+a6J0OEN4Kyh0wKdX7rhRaP80a8ERioMpTUxwYQOlnQsmjKVw85vEjeXgk3HWa7weqMAWN5J8ZEyKP81ZX6ukht0jKpPLgce++lCTvNkjuhAletTQGP+VlvOTHePc8vmas/GgxubsS6z5dPaF837EZwhDOw/LKKhiFepkrwezcI+h7pT4mi7DJMjB/sPSiwlaUS1rKBPoMrAFTw081+fOZVOqTnixMzGB7S8vsil4wLZDm8ehP2Fbl8UE94YpSXkb7SYV6Qo0fo77CTKi3KPWY8HNVHqMJlfkKbmfGuYbUZxdkeTLtkbfpPHfBpDyb6OoEMyyVFbhofs0z3Ec+598WSL+eJDtLT3BPbEt5FrZOjsAn28PyepcJp1X2uBPmQGd7TKbmmHOaw/5VeXSLNt0NE6nr/R6yJoGNWMAV5cfp3XpQSbtJf8yWtgvauFzmGr/Vo8flcdfGrpT7e0VyZq/LJDFM7PhTI8AkUROaWBFgNIP3tz6fbscUpf6IDDKZ7gLA9eWSnKwulXvTscZTJrQ8aD0R87K0lTJJzzU5akwokRJ/sJTaBy6s9UzT+5gkrgctKzaLqdF8nW3YswZdPZGZUpW6KxankjNwJlISwzGDMkJMQNhthuvjTJ6kizkTsDODTBJFmcaeVmZHYftxa8ylxwQdUrmSzgLjRhx1LGGSNGP0mHjpd2YQ692ArKfR/X0HGlZnXuJRJd2Y60kf5C4TWkpUkAtlK3p9R0rPNEpMMFLgdqP8WOM2tlTxkhvOo9GrNrYbzFa6ys/gIQOe2PXb2FXmURaT5Ykrk0eWCdoNloWxuBPvOPfFU3M8VZ2Xuvf4Sq3gRRoDJ4uSgGeMqQPtYwR7pq6bhYQspC2vklFlAh6SdfPp2QrT/Im0V0DsBY2beCQtpyb2ChPaDYRT97vCGyvNTFAib/XHbElkLC1NUG+SR7v8Zowmk5JUXl18McuSY7howlqQxOjgMKf6Wj3AhKbsSpVZXj5JAhRMFkrLU4Ox/QxfVZfKY/zgUyvdfGcEmfQlZmOrLFlNAnqWiHAk8wSV6WqdratpJIGylB6yXO7uzfNiujqWrElP6dHRZdKrFZSlOS2pnwzUCiqgPdpArYAJLFlk/a2kdctsS337ja12YzbYXZuTeslveQwyn5FlUl55Dv2jXMZCz/KT3srpB1gBwuVj0koarWfmnzAPxbNjJuC8ZqU67oY1JaFXP0F5Ms4PCWcqzaehyjI7ZLLFJPvyfXM5viV3wWSWaM9fzC4/nl1coL2EFCttDx+MLy8/Xp3f6hZZJxZQtnqHeMQccS8gwVu/ML86Dodb2krCkJQJrNqaeTA7Pruy9Fzull2fP0FJy3Xsy8LPzou5Q/mWaF99vKZbdGYRSn2pHyX/qPEv4/2Z30Dxmf5bu392ne3fmfyrpCH6dB8TSha6Bpcs8DLMrcvON5Kfy4QfAEtMfXoyMSXNJF95iWjYQ2Q/mQnPFRf6llBtuVIaG1uafP5kfjlx1NPD/X/kfy4Tj+dH/Yu0FVYUqOMoDiOyfOuxiZvKz2UyP1hSQJnuj0GYlizeemDvhnI3TH7omjXi8fL74OLpcaDS5VKXHn597xzltkxQln+MCebLfAhvcCl9CJHZVAUEOtDiBLn7B4ivkdsx0SaY/NjOEP4/mYQAy8t2ja2HL1ZXV+eWnnu3HxG/uYzcMwgjIAWTrBRMslIwyUrBJCsFk6wUTLJSMMlKwSQrBZOsFEyyUjDJSsEkKwWTrBRMslIwyUrBJCsFk6wUTLJSMMlKwSQrBZOsFEyyUjDJSsEkKwWTrAjDH44deSn0JCsCkTWhkAGR/x+91i2GjJYCXQAAAABJRU5ErkJggg==`}
            loading="lazy"
            style={{
              height: 93,
              width: 120,
            }}
          />
        </center>
        <Typography
          variant="body2"
          color="text.secondary"
          className="css-83ijpv-MuiTypography-root"
        >
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
