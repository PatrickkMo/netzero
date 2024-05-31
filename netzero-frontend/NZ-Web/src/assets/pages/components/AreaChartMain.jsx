import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Monday',
    tCO2e: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Tuesday',
    tCO2e: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Wednesday',
    tCO2e: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Thursday',
    tCO2e: 5100,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Friday',
    tCO2e: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Saturday',
    tCO2e: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Sunday',
    tCO2e: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const AreaChartMain = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="tCO2e" stroke="#36C7C9" fill="#C1E8E8" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartMain