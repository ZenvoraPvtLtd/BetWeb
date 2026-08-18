import React from 'react';
import { SportListItem } from './SportListItem';
import { sportMarketConfig } from '../../../../config/superAdmin/blockMarkets';

export const SportList: React.FC = () => {
  return (
    <div className="w-full bg-[#131B2E] border border-[#1E293B] rounded-[10px] shadow-xl overflow-hidden flex flex-col">
      {sportMarketConfig.map((sport) => (
        <SportListItem key={sport.id} sport={sport} />
      ))}
    </div>
  );
};
