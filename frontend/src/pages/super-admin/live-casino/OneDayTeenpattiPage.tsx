import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SuperAdminLayout } from '../../../components/super-admin/SuperAdminLayout';
import { TeenpattiGameHeader } from '../../../components/super-admin/live-casino/teenpatti/TeenpattiGameHeader';
import { OneDayTeenpattiGameStage } from '../../../components/super-admin/live-casino/one-day-teenpatti/OneDayTeenpattiGameStage';
import { OneDayTeenpattiControls } from '../../../components/super-admin/live-casino/one-day-teenpatti/OneDayTeenpattiControls';
import { OneDayTeenpattiBettingArea } from '../../../components/super-admin/live-casino/one-day-teenpatti/OneDayTeenpattiBettingArea';
import { MyBetPanel } from '../../../components/super-admin/live-casino/teenpatti/MyBetPanel';
import { oneDayTeenpattiService } from '../../../services/live-casino/oneDayTeenpattiService';
import type { MyBet } from '../../../services/live-casino/teenpatti20x20Service';

export const OneDayTeenpattiPage: React.FC = () => {
  const [bets, setBets] = useState<MyBet[]>([]);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const betsList = await oneDayTeenpattiService.getMyBets();
        setBets(betsList);
      } catch (err) {
        console.error('Failed to load 1 Day Teenpatti game data', err);
      }
    };
    fetchGameData();
  }, []);

  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left select-none animate-fadeIn">
        {/* Breadcrumb Path */}
        <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-5">
          <Link to="/admin/market-analysis" className="hover:text-zinc-955 transition-colors">
            Super Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-400">Live Casino</span>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-950">1 Day Teenpatti</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-955 leading-none">
            1 Day Teenpatti
          </h1>
          <p className="text-xs text-zinc-550 mt-1.5">
            Operational dashboard and betting ledger for the 1 Day Teenpatti live casino table.
          </p>
        </div>

        {/* Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main game block (2/3 width) */}
          <div className="lg:col-span-2 flex flex-col">
            <TeenpattiGameHeader />
            <OneDayTeenpattiGameStage />
            <OneDayTeenpattiControls />
            <OneDayTeenpattiBettingArea />
          </div>

          {/* Right sidebar block (1/3 width, excludes rules card) */}
          <div className="lg:col-span-1 flex flex-col">
            <MyBetPanel bets={bets} />
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
