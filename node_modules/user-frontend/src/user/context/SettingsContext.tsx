import React, { createContext, useContext, useState } from 'react';
import { mockBlockedMarkets } from '../data/settings/blockedMarkets';
import { mockMessages } from '../data/settings/messages';
import { mockAvailableMatches } from '../data/settings/availableMatches';
import { mockCasinoSettings } from '../data/settings/casinoSettings';
import { mockPaymentMethods } from '../data/settings/paymentMethods';
import type { BlockedMarket, Message, Match, CasinoGameSetting, PaymentMethod, Toast } from '../types/settings';
import { CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface ConfirmDialogState {
  title: string;
  description: string;
  confirmText: string;
  onConfirm: () => void;
}

interface SettingsContextType {
  blockedMarkets: BlockedMarket[];
  messages: Message[];
  availableMatches: Match[];
  casinoSettings: CasinoGameSetting[];
  paymentMethods: PaymentMethod[];
  unreadMessagesCount: number;
  balanceVisible: boolean;
  setBalanceVisible: (visible: boolean) => void;
  exposureVisible: boolean;
  setExposureVisible: (visible: boolean) => void;
  // Actions
  toggleMarketBlock: (id: string) => void;
  toggleCasinoGame: (id: string) => void;
  toggleMatchAdded: (id: string) => void;
  selectPaymentMethod: (id: string) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  // Feedback Systems
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  showConfirm: (title: string, description: string, confirmText: string, onConfirm: () => void) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blockedMarkets, setBlockedMarkets] = useState<BlockedMarket[]>(mockBlockedMarkets);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [availableMatches, setAvailableMatches] = useState<Match[]>(mockAvailableMatches);
  const [casinoSettings, setCasinoSettings] = useState<CasinoGameSetting[]>(mockCasinoSettings);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);

  const [balanceVisible, setBalanceVisibleState] = useState(() => {
    return localStorage.getItem('user_balance_visible') !== 'false';
  });
  const [exposureVisible, setExposureVisibleState] = useState(() => {
    return localStorage.getItem('user_exposure_visible') !== 'false';
  });

  const setBalanceVisible = (visible: boolean) => {
    setBalanceVisibleState(visible);
    localStorage.setItem('user_balance_visible', String(visible));
  };

  const setExposureVisible = (visible: boolean) => {
    setExposureVisibleState(visible);
    localStorage.setItem('user_exposure_visible', String(visible));
  };

  // Alerts & Overlays States
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Toast System
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Dialog System
  const showConfirm = (title: string, description: string, confirmText: string, onConfirm: () => void) => {
    setConfirmDialog({ title, description, confirmText, onConfirm });
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (confirmDialog) {
      confirmDialog.onConfirm();
    }
    setDialogOpen(false);
    setTimeout(() => setConfirmDialog(null), 200);
  };

  // Toggles
  const toggleMarketBlock = (id: string) => {
    const market = blockedMarkets.find((m) => m.id === id);
    if (!market) return;

    if (market.status === 'AVAILABLE') {
      showConfirm(
        `Block ${market.marketName}?`,
        `This will hide the market outcomes for "${market.competition}" from your betting dashboard grids.`,
        'Block Market',
        () => {
          setBlockedMarkets((prev) =>
            prev.map((m) => (m.id === id ? { ...m, status: 'BLOCKED' } : m))
          );
          addToast('Market blocked successfully', 'success');
        }
      );
    } else {
      setBlockedMarkets((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: 'AVAILABLE' } : m))
      );
      addToast('Market unblocked successfully', 'success');
    }
  };

  const toggleCasinoGame = (id: string) => {
    const game = casinoSettings.find((g) => g.id === id);
    if (!game) return;

    if (game.status === 'ENABLED') {
      showConfirm(
        `Disable ${game.gameName}?`,
        `This will hide this casino room category from your dashboard.`,
        'Disable',
        () => {
          setCasinoSettings((prev) =>
            prev.map((g) => (g.id === id ? { ...g, status: 'DISABLED' } : g))
          );
          addToast('Casino room disabled', 'success');
        }
      );
    } else {
      setCasinoSettings((prev) =>
        prev.map((g) => (g.id === id ? { ...g, status: 'ENABLED' } : g))
      );
      addToast('Casino room enabled', 'success');
    }
  };

  const toggleMatchAdded = (id: string) => {
    setAvailableMatches((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextStatus = m.status === 'ADD' ? 'ADDED' : 'ADD';
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
    const item = availableMatches.find((m) => m.id === id);
    if (item) {
      addToast(item.status === 'ADD' ? 'Match added successfully' : 'Match removed successfully', 'success');
    }
  };

  const selectPaymentMethod = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((p) => ({ ...p, isDefault: p.id === id }))
    );
    addToast('Payment method updated', 'success');
  };

  const markMessageRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'READ' as const } : m))
    );
    addToast('Notification marked as read', 'success');
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    addToast('Notification deleted', 'success');
  };

  // Live Audit Unread Count
  const unreadMessagesCount = messages.filter((m) => m.status === 'UNREAD').length;

  return (
    <SettingsContext.Provider
      value={{
        blockedMarkets,
        messages,
        availableMatches,
        casinoSettings,
        paymentMethods,
        unreadMessagesCount,
        balanceVisible,
        setBalanceVisible,
        exposureVisible,
        setExposureVisible,
        toggleMarketBlock,
        toggleCasinoGame,
        toggleMatchAdded,
        selectPaymentMethod,
        markMessageRead,
        deleteMessage,
        addToast,
        showConfirm
      }}
    >
      {children}

      {/* 1. Global Toast Notifications Stack overlay */}
      <div className="fixed top-6 right-6 z-[2000] flex flex-col gap-3 select-none pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              p-4 rounded-[12px] border flex items-start gap-3 shadow-xl pointer-events-auto animate-slideLeft
              ${
                toast.type === 'success'
                  ? 'bg-zinc-950/90 border-[#22C55E]/30 text-[#22C55E]'
                  : toast.type === 'error'
                  ? 'bg-zinc-950/90 border-[#F43F5E]/30 text-[#F43F5E]'
                  : 'bg-zinc-950/90 border-[#0EA5E9]/30 text-[#0EA5E9]'
              }
            `}
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 shrink-0 mt-0.5" />}
            <span className="text-xs font-bold text-white leading-relaxed">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* 2. Global Custom Confirmation Dialog Modal overlay */}
      {dialogOpen && confirmDialog && (
        <div className="fixed inset-0 z-[1999] flex items-center justify-center p-4 select-none">
          <div
            onClick={() => setDialogOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-2xs animate-fadeIn"
          />
          <div className="relative w-full max-w-sm bg-[#0D1B2A] border border-slate-700/15 rounded-[16px] p-6 shadow-2xl z-50 text-left animate-scaleUp">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>{confirmDialog.title}</span>
            </h3>
            <p className="text-xs font-semibold text-zinc-400 mt-2.5 leading-relaxed">
              {confirmDialog.description}
            </p>
            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => setDialogOpen(false)}
                className="px-4 h-9 rounded-[8px] bg-[#111F30] border border-slate-700/10 hover:bg-[#16283D] text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider outline-none transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 h-9 rounded-[8px] bg-[#F43F5E] hover:bg-[#e11d48] text-white text-xs font-bold uppercase tracking-wider outline-none transition-colors cursor-pointer"
              >
                {confirmDialog.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used inside a SettingsProvider wrapper');
  }
  return context;
};
