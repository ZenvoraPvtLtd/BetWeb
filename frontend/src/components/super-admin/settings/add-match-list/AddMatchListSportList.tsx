import React from 'react';
import { AddMatchListSportItem } from './AddMatchListSportItem';
import { addMatchListConfig } from '../../../../config/superAdmin/addMatchList';

export const AddMatchListSportList: React.FC = () => {
  return (
    <div className="w-full bg-white border border-zinc-200 rounded-[8px] shadow-sm overflow-hidden flex flex-col">
      {/* Map sports configurations dynamically */}
      {addMatchListConfig.map((sport) => (
        <AddMatchListSportItem key={sport.id} sport={sport} />
      ))}
    </div>
  );
};
