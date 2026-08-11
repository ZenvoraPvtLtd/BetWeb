import type { Account } from '../mock/super-admin/accounts';
import { formatFinancial } from '../utils/formatters';

export const exportService = {
  /**
   * Generates a clean Excel-compatible CSV file download.
   */
  exportAccountsToExcel(accounts: Account[]) {
    const headers = [
      'User Name',
      'Credit Reference',
      'Balance',
      'Client (P/L)',
      'Exposure',
      'Available Balance',
      'User Status',
      'Bet Status',
      'Exposure Limit',
      'Default %',
      'Account Type',
    ];

    const rows = accounts.map((acc) => [
      acc.username,
      acc.creditReference,
      acc.balance,
      acc.clientPL,
      acc.exposure,
      acc.availableBalance,
      acc.userStatus,
      acc.betStatus,
      acc.exposureLimit,
      acc.defaultPercentage,
      acc.accountType,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `account_list_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  /**
   * Renders a print-friendly document sheet in a new tab, triggering the browser's PDF generator.
   */
  exportAccountsToPDF(accounts: Account[]) {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocker is preventing export. Please enable pop-ups.');
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <title>Account List PDF Export</title>
          <style>
            body { font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; color: #18181b; }
            h1 { font-size: 20px; font-weight: bold; margin-bottom: 4px; }
            p { font-size: 11px; color: #71717a; margin-bottom: 24px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border-bottom: 1px solid #e4e4e7; padding: 10px; text-align: left; font-size: 11px; }
            th { background-color: #fafafa; font-weight: 600; color: #52525b; text-transform: uppercase; font-size: 9px; letter-spacing: 0.05em; }
            td.numeric { text-align: right; font-variant-numeric: tabular-nums; }
            th.numeric { text-align: right; }
          </style>
        </head>
        <body>
          <h1>Super Admin - Account List</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th class="numeric">Credit Ref</th>
                <th class="numeric">Balance</th>
                <th class="numeric">Client P/L</th>
                <th class="numeric">Exposure</th>
                <th class="numeric">Available Bal</th>
                <th>Status</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              ${accounts
                .map(
                  (acc) => `
                <tr>
                  <td><strong>${acc.username}</strong></td>
                  <td class="numeric">${acc.creditReference}</td>
                  <td class="numeric">${formatFinancial(acc.balance)}</td>
                  <td class="numeric">${formatFinancial(acc.clientPL)}</td>
                  <td class="numeric">${formatFinancial(acc.exposure)}</td>
                  <td class="numeric">${formatFinancial(acc.availableBalance)}</td>
                  <td>${acc.userStatus}</td>
                  <td>${acc.accountType}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  },
};
