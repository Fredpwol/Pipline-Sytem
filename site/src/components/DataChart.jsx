import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

// const data = [
//   { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
//   { name: "Page B", uv: 300, pv: 1200, amt: 2400 },
//   { name: "Page C", uv: 200, pv: 4100, amt: 1000 },
//   { name: "Page D", uv: 500, pv: 1500, amt: 2400 },
// ];

const useDimension = () => {
    const [height, setHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setHeight(window.innerHeight);
            setWidth(window.innerWidth)
        })
    }, [])

    return { height, width }
}

const DataChart = ({ data }) => {
const { width } = useDimension();
  return (
    <LineChart
      width={width- 200}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="vibration" stroke="#ffe32e" />
      <Line type="monotone" dataKey="flowRate" stroke="#e3425f" />
      <Line type="monotone" dataKey="temperature" stroke="#2ec0ff" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default DataChart;
