import React from 'react';
import type { SportEvent } from '../../types/sports';

interface DemoScoreboardProps {
  event: SportEvent;
}

export const DemoScoreboard: React.FC<DemoScoreboardProps> = ({ event }) => {
  const { sportType, meta, participants, score } = event;

  if (event.status === 'Upcoming') {
    return <div className="text-[11px] text-zinc-400 font-medium">Match starts: {event.startTime}</div>;
  }

  const formatTime = (secs?: number) => {
    if (secs === undefined) return '';
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  switch (sportType) {
    case 'cricket':
      return (
        <div className="flex flex-col gap-1 text-left select-none">
          <div className="text-xs font-bold text-zinc-800">
            {participants.home.name}: {participants.home.score}/{participants.home.subScore}
            {participants.away.score
              ? ` vs ${participants.away.name}: ${participants.away.score}/${participants.away.subScore}`
              : ''}
          </div>
          <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono">
            <span>{score?.detail || `Overs: ${meta?.overs || '0.0'}`}</span>
            {meta?.currentOverRuns && (
              <span className="flex items-center gap-1">
                <span>Over runs:</span>
                {meta.currentOverRuns.map((r: any, idx: number) => (
                  <span
                    key={idx}
                    className="px-1 bg-zinc-100 border border-zinc-200 rounded text-[9px] font-bold"
                  >
                    {r === 6 ? '6' : r === 4 ? '4' : r}
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
      );

    case 'soccer':
    case 'futsal':
      return (
        <div className="flex items-center gap-4 text-left select-none">
          <div className="text-sm font-bold text-zinc-800 font-mono">
            {participants.home.score} - {participants.away.score}
          </div>
          <div className="flex flex-col text-[10px] text-zinc-500 font-mono leading-none">
            <span className="font-semibold text-indigo-650">
              {meta?.half ? `${meta.half} Half` : ''}
            </span>
            <span className="mt-0.5">{formatTime(meta?.timer)}</span>
          </div>
        </div>
      );

    case 'basketball':
      return (
        <div className="flex items-center gap-4 text-left select-none">
          <div className="text-sm font-bold text-zinc-800 font-mono">
            {participants.home.score} - {participants.away.score}
          </div>
          <div className="flex flex-col text-[10px] text-zinc-500 font-mono leading-none">
            <span className="font-semibold text-indigo-650">
              {meta?.quarter ? `Quarter ${meta.quarter}` : ''}
            </span>
            <span className="mt-0.5">{formatTime(meta?.timer)}</span>
          </div>
        </div>
      );

    case 'kabaddi':
      return (
        <div className="flex flex-col gap-0.5 text-left select-none">
          <div className="text-sm font-bold text-zinc-800 font-mono">
            {participants.home.score} - {participants.away.score}
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">
            <span className="text-red-500 font-bold">{meta?.raidStatus || 'Raid Active'}</span>
            {meta?.timer && <span className="ml-3">{formatTime(meta.timer)}</span>}
          </div>
        </div>
      );

    case 'tennis':
    case 'table-tennis':
    case 'volleyball':
      return (
        <div className="flex flex-col gap-0.5 text-left select-none">
          <div className="text-xs font-bold text-zinc-800">
            {participants.home.name} ({participants.home.score}) vs {participants.away.name} (
            {participants.away.score})
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">
            {score?.detail || `Sets: ${meta?.setsHome || 0}-${meta?.setsAway || 0}`}
          </div>
        </div>
      );

    case 'snooker':
      return (
        <div className="flex flex-col gap-0.5 text-left select-none">
          <div className="text-xs font-bold text-zinc-800">
            Frames: {meta?.framesHome || 0} - {meta?.framesAway || 0}
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">
            Current frame points: {participants.home.name} ({participants.home.score}) -{' '}
            {participants.away.name} ({participants.away.score})
          </div>
        </div>
      );

    case 'golf':
      return (
        <div className="flex flex-col gap-1 text-left select-none">
          <div className="text-xs font-semibold text-zinc-800">
            {score?.scoreDisplay || `Leader: ${participants.home.name} (${participants.home.score})`}
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">Hole: {meta?.hole || 1}</div>
        </div>
      );

    case 'horse-racing':
    case 'greyhound-racing':
      return (
        <div className="flex flex-col gap-1 text-left select-none">
          <div className="text-xs font-bold text-zinc-800 uppercase tracking-wide">
            {score?.detail || `Race ${meta?.raceNumber || 1} - Live`}
          </div>
          {meta?.runners && (
            <div className="flex flex-wrap gap-2 text-[10px] text-zinc-500 font-mono">
              {meta.runners.slice(0, 3).map((r: any, idx: number) => (
                <span key={idx} className="bg-zinc-50 px-1.5 py-0.5 border border-zinc-200 rounded">
                  {idx + 1}. {r.name}
                </span>
              ))}
            </div>
          )}
        </div>
      );

    case 'e-games':
      return (
        <div className="flex flex-col gap-0.5 text-left select-none">
          <div className="text-xs font-bold text-zinc-800">
            {participants.home.name} {participants.home.score} - {participants.away.score}{' '}
            {participants.away.name}
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">Map {meta?.map || 1}</div>
        </div>
      );

    default:
      return (
        <div className="text-xs font-bold text-zinc-800">
          {participants.home.score} - {participants.away.score}
        </div>
      );
  }
};
