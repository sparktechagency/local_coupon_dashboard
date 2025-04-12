import { Select } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const IncomeOverview = ({ subscriptionGrowth , handleChangeYear }) => {
  const values = subscriptionGrowth?.chart?.data;

  const currentYear = new Date().getFullYear()

  const items = Array.from({length : 4}, (_ , i)=>{
    const year = currentYear - 1 + i
    return {
        label : year,
        value : String(year)
    }
  })

  

  const combinedData = subscriptionGrowth?.chart?.labels.map(
    (label, index) => ({
      name: label,
      uv: values[index],
    })
  );


 
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="ml-6">
          <p className="text-2xl font-semibold mb-10  ">Subscription Growth</p>
        </div>
        <Select
          defaultValue={currentYear}
          style={{ width: 120 }}
          onChange={handleChangeYear}
          options={items}
        />
      </div>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={400}
            height={400}
            data={combinedData}
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
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#D7AF61"
              opacity={1}
              fillOpacity={1}
              fill="#D7AF61"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default IncomeOverview;
