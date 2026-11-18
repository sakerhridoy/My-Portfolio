import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AnalyticsChart = ({ data }) => {
  // Expected data format: { month: 'Jan', inquiries: 10, projects: 5, testimonials: 2 }
  return (
    <div className="h-64 w-full bg-gray-800 p-4 rounded-lg">
      <h3 className="text-white text-lg mb-2">Monthly Activity</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
          <Legend />
          <Line type="monotone" dataKey="inquiries" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="projects" stroke="#82ca9d" />
          <Line type="monotone" dataKey="testimonials" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
