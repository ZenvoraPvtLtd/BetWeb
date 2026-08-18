import React from 'react';
import { AddMatchListSportItem } from './AddMatchListSportItem';
import { addMatchListConfig } from '../../../../config/superAdmin/addMatchList';

export const AddMatchListSportList: React.FC = () => {
  return (
    <div className="w-full bg-[#131B2E] border border-[#1E293B] rounded-[10px] shadow-xl overflow-hidden flex flex-col">
      {addMatchListConfig.map((sport) => (
        <AddMatchListSportItem key={sport.id} sport={sport} />
      ))}
    </div>
  );
};
