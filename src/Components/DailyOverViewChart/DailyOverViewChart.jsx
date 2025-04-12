import { Select } from "antd";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DailyOverViewChart = ({userGrowth ,handleUserGrowth}) => {
  // console.log(userGrowth?.chart?.data[0]);

  const combineData = userGrowth?.chart?.labels?.map((month , i)=>{
    return {
      name : month,
      Active : userGrowth?.chart?.data[0]?.[i],
      Inactive :  userGrowth?.chart?.data[1]?.[i]
    }
  })
 

  const currentYear = new Date().getFullYear()

  const items = Array.from({length : 4}, (_ , i)=>{
    const year = currentYear - 1 + i
    return {
        label : year,
        value : String(year)
    }
  })
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="ml-6">
          <p className="text-2xl font-semibold mb-10 ">User Growth</p>
        </div>
        <Select
          defaultValue={currentYear}
          style={{ width: 120 }}
          onChange={handleUserGrowth}
          options={items}
        />
      </div>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={combineData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Active"  fill="#D7AF61" />
            <Bar dataKey="Inactive" fill="#715520" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default DailyOverViewChart;
