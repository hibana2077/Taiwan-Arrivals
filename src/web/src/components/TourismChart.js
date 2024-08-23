'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TourismChart = ({ data }) => {
  const formatYAxis = (number) => {
    return `${(number / 1000).toFixed(0)}K`;
  }

  const formatTooltip = (value) => {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="year" stroke="rgba(255,255,255,0.7)" />
        <YAxis stroke="rgba(255,255,255,0.7)" tickFormatter={formatYAxis} />
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.2)' }}
          itemStyle={{ color: 'rgba(255,255,255,0.7)' }}
          formatter={formatTooltip}
        />
        <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.7)' }} />
        <Line type="monotone" dataKey="tourism" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="business" stroke="#82ca9d" strokeWidth={2} />
        <Line type="monotone" dataKey="family" stroke="#ffc658" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TourismChart;