import React from "react";
import RadarChart from 'react-svg-radar-chart';

const data = [
   {
    data: {
      battery: 0.7,
      design: .8,
      useful: 0.9,
      speed: 0.67,
      weight: 0.8
    },
    meta: { color: '#6ad8a9' }
  },
];

const captions = {
  battery: '가격',
  design: '안전성',
  useful: '입자크기',
  speed: '평판',
  weight: '기호성'
};

const Rader = () => {
  return (
    <RadarChart
        captions={captions}
        data={data}
        size={450}
      />
  );
};

export default Rader;
