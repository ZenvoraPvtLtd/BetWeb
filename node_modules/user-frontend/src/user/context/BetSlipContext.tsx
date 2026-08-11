import React, { createContext, useContext, useState } from 'react';
import type { BetSelection, PlacedBet } from '../types/bet';

interface BetSlipContextType {
  activeSelection: BetSelection | null;
  placedBets: PlacedBet[];
  addSelection: (sel: BetSelection) => void;
  clearSelection: () => void;
  placeBet: (stake: number) => boolean;
}

const BetSlipContext = createContext<BetSlipContextType | undefined>(undefined);

export const BetSlipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSelection, setActiveSelection] = useState<BetSelection | null>(null);
  const [placedBets, setPlacedBets] = useState<PlacedBet[]>([]);

  const addSelection = (sel: BetSelection) => {
    setActiveSelection(sel);
  };

  const clearSelection = () => {
    setActiveSelection(null);
  };

  const placeBet = (stake: number): boolean => {
    if (!activeSelection) return false;

    const newBet: PlacedBet = {
      no: placedBets.length + 1,
      username: 'User',
      nation: 'India',
      amount: stake,
      rate: parseFloat(activeSelection.odds) || 1.90,
      placeDate: new Date().toLocaleDateString('en-IN') + ' ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      matchDate: activeSelection.teams ? 'Today' : 'Live Game',
      ipAddress: '192.168.1.' + Math.floor(Math.random() * 254 + 1),
      selectionName: activeSelection.selectionName,
      marketName: activeSelection.marketName,
      type: activeSelection.type
    };

    setPlacedBets((prev) => [newBet, ...prev]);
    setActiveSelection(null);
    return true;
  };

  return (
    <BetSlipContext.Provider
      value={{
        activeSelection,
        placedBets,
        addSelection,
        clearSelection,
        placeBet
      }}
    >
      {children}
    </BetSlipContext.Provider>
  );
};

export const useBetSlip = () => {
  const ctx = useContext(BetSlipContext);
  if (!ctx) {
    throw new Error('useBetSlip must be used within a BetSlipProvider');
  }
  return ctx;
};
