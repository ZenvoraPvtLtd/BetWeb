import React, { useState, useEffect } from 'react';
import { Search, X, Download, FileText, UserPlus, LogOut, User, CheckCircle2 } from 'lucide-react';
import { SuperAdminLayout } from '../../components/super-admin/SuperAdminLayout';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { exportService } from '../../services/exportService';
import { AddAccountModal } from '../../components/super-admin/accounts/AddAccountModal';
import { LogoutAllModal } from '../../components/super-admin/accounts/LogoutAllModal';
import { AccountPagination } from '../../components/super-admin/accounts/AccountPagination';
import { AccountTable } from '../../components/super-admin/accounts/AccountTable';
import { Button } from '../../components/ui/Button';

const PAGE_SIZE = 5;

export const ListOfClients: React.FC = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'deactive'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [detailUsername, setDetailUsername] = useState<string | null>(null);

  // Load accounts dynamically from backend mock API checking role hierarchy
  useEffect(() => {
    if (user && !isAddModalOpen) {
      api.getClients(user.role).then((res) => {
        setAccounts(res);
      });
    }
  }, [user, isAddModalOpen]);

  // Dismiss notification toast automatically after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Simulate loader state on tab changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Reset page numbers on query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  // Apply filters against dynamically fetched dataset
  const filteredAccounts = accounts.filter((acc) => {
    const matchesTab = acc.status === activeTab;
    const matchesSearch = acc.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Calculate pagination properties
  const totalPages = Math.max(1, Math.ceil(filteredAccounts.length / PAGE_SIZE));
  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleExcelExport = () => {
    exportService.exportAccountsToExcel(filteredAccounts);
    setToastMessage('Filtered accounts exported to Excel successfully!');
  };

  const handlePDFExport = () => {
    exportService.exportAccountsToPDF(filteredAccounts);
  };

  const handleForceLogoutAll = () => {
    setToastMessage('Force logged out all active user sessions.');
  };

  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left select-none relative animate-fadeIn">
        {/* Notification Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-xl animate-slideRight">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="ml-2 hover:text-zinc-400 cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 1. Page Header */}
        <div className="mb-6">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
            {user?.role === 'SUPER_ADMIN' ? 'Super Admin' : user?.role || 'Admin'} / Clients
          </span>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-950 mt-1">
            Account List
          </h1>
        </div>

        {/* 2. Top Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-zinc-200/80 pb-5">
          {/* Left Actions Group */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="h-[36px] px-3.5 rounded-[6px] border border-red-200 text-red-650 bg-red-50/20 text-xs font-semibold hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout All Users</span>
            </button>

            <button
              onClick={handleExcelExport}
              className="h-[36px] px-3.5 rounded-[6px] border border-zinc-200 text-zinc-650 bg-white text-xs font-semibold hover:bg-zinc-50 hover:text-zinc-800 transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-zinc-450" />
              <span>Excel</span>
            </button>

            <button
              onClick={handlePDFExport}
              className="h-[36px] px-3.5 rounded-[6px] border border-zinc-200 text-zinc-650 bg-white text-xs font-semibold hover:bg-zinc-50 hover:text-zinc-800 transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-450" />
              <span>PDF</span>
            </button>
          </div>

          {/* Right Add Action Trigger */}
          <div className="w-[140px]">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center gap-1.5"
            >
              <UserPlus className="w-4 h-4 shrink-0" />
              <span>Add Account</span>
            </Button>
          </div>
        </div>

        {/* 3. Search input and Status Tab Select */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          {/* Active / Deactive Tab Selection */}
          <div className="flex bg-zinc-100 p-0.5 rounded-[8px] self-start border border-zinc-200/45">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-[6px] transition-all cursor-pointer ${
                activeTab === 'active'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-850'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab('deactive')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-[6px] transition-all cursor-pointer ${
                activeTab === 'deactive'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-850'
              }`}
            >
              Deactive
            </button>
          </div>

          {/* User Name Search input */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search client username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[36px] pl-9 pr-8 bg-white border border-zinc-250 rounded-[6px] text-xs focus:outline-none focus:ring-1 focus:ring-zinc-700/80 text-zinc-900 placeholder-zinc-450 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-650 focus:outline-none cursor-pointer"
                aria-label="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 4. Table Grid */}
        <AccountTable
          accounts={paginatedAccounts}
          isLoading={isLoading}
          onUserClick={(username) => setDetailUsername(username)}
          emptyStateText={
            activeTab === 'active' ? 'No clients found' : 'No deactivated accounts'
          }
        />

        {/* 5. Pagination Toolbar */}
        <AccountPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />

        {/* Add Account Modal */}
        <AddAccountModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

        {/* Force Logout confirmation dialog */}
        <LogoutAllModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleForceLogoutAll}
        />

        {/* User Detail Placeholder Modal */}
        {detailUsername && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none">
            <div className="w-full max-w-md bg-white border border-zinc-200 rounded-[8px] shadow-lg p-6 text-left animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-zinc-900 font-bold text-base">
                  <User className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span>Account Details</span>
                </div>
                <button
                  onClick={() => setDetailUsername(null)}
                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-600 focus:outline-none cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 border-t border-b border-zinc-100 text-xs md:text-sm text-zinc-500 leading-relaxed mb-6">
                Detail analysis workspace for client <strong>{detailUsername}</strong> will be
                implemented once visual layout specifications are provided.
              </div>

              <div className="flex justify-end">
                <div className="w-[100px]">
                  <Button onClick={() => setDetailUsername(null)}>Close</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SuperAdminLayout>
  );
};
