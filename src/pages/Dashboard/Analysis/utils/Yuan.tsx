import React from 'react';
import { yuan } from '../components/Charts/constants';

interface YuanProps {
  value: number | string;
  
}

const Yuan: React.FC<YuanProps> = ({ value }) => {


  return <span>{yuan(value)}</span>;
};

export default Yuan;
