import React from 'react';
import { SportListItem } from './SportListItem';
import { sportMarketConfig } from '../../../../config/superAdmin/blockMarkets';

export const SportList: React.FC = () => {
  return (
    <div className="w-full bg-white border border-zinc-200 rounded-[8px] shadow-sm overflow-hidden flex flex-col">
      {/* Map sports configurations dynamically */}
      {sportMarketConfig.map((sport) => (
        <SportListItem key={sport.id} sport={sport} />
      ))}
    </div>
  );
};
