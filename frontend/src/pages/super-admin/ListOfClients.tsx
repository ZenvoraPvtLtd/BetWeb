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
          <div className="fixed top-20 right-6 z-50 flex items-center gap-2 bg-[#131B2E] border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-4 py-3 rounded-lg shadow-2xl animate-slideRight backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 1. Page Header */}
        <div className="mb-6">
          <span className="text-[11px] uppercase font-bold tracking-wider text-orange-400">
            {user?.role === 'SUPER_ADMIN' ? 'Super Admin' : user?.role || 'Admin'} / Clients
          </span>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 mt-1">
            Account List
          </h1>
        </div>

        {/* 2. Top Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#1E293B] pb-5">
          {/* Left Actions Group */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="h-[36px] px-3.5 rounded-[8px] border border-red-500/30 text-red-400 bg-red-950/30 text-xs font-semibold hover:bg-red-900/40 hover:text-red-300 transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout All Users</span>
            </button>

            <button
              onClick={handleExcelExport}
              className="h-[36px] px-3.5 rounded-[8px] border border-[#233252] text-slate-300 bg-[#131B2E] text-xs font-semibold hover:bg-[#18233C] hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-orange-400" />
              <span>Excel</span>
            </button>

            <button
              onClick={handlePDFExport}
              className="h-[36px] px-3.5 rounded-[8px] border border-[#233252] text-slate-300 bg-[#131B2E] text-xs font-semibold hover:bg-[#18233C] hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>PDF</span>
            </button>
          </div>

          {/* Right Add Action Trigger */}
          <div className="w-[145px]">
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
          <div className="flex bg-[#0E1524] p-1 rounded-[10px] self-start border border-[#1E293B]">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-[7px] transition-all cursor-pointer ${
                activeTab === 'active'
                  ? 'bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white shadow-md shadow-orange-950/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab('deactive')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-[7px] transition-all cursor-pointer ${
                activeTab === 'deactive'
                  ? 'bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white shadow-md shadow-orange-950/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Deactive
            </button>
          </div>

          {/* User Name Search input */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search client username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[36px] pl-9 pr-8 bg-[#0E1524] border border-[#233252] rounded-[8px] text-xs focus:outline-none focus:border-orange-500 text-slate-100 placeholder-slate-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white focus:outline-none cursor-pointer"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs select-none">
            <div className="w-full max-w-md bg-[#131B2E] border border-[#233252] rounded-[12px] shadow-2xl p-6 text-left animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
                  <User className="w-5 h-5 text-orange-400 shrink-0" />
                  <span>Account Details</span>
                </div>
                <button
                  onClick={() => setDetailUsername(null)}
                  className="p-1 hover:bg-[#18233C] rounded-lg text-slate-400 hover:text-white focus:outline-none cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 border-t border-b border-[#1E293B] text-xs md:text-sm text-slate-400 leading-relaxed mb-6">
                Detail analysis workspace for client <strong className="text-orange-400">{detailUsername}</strong> will be
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
