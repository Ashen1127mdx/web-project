import { useState, useRef } from 'react';
import Papa from 'papaparse';
import Topbar from '../components/Topbar';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Healthcare', 'Utilities', 'Salary', 'Freelance', 'Investment', 'Other'];
const METHODS = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash', 'Other'];

const initialForm = { date: '', description: '', category: '', type: 'expense', amount: '', method: '' };

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const parseCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        const parsed = data.map((row, i) => ({
          id: Date.now() + i,
          date: row.Date || row.date || '',
          description: row.Description || row.description || row.Narration || '',
          category: row.Category || row.category || 'Other',
          type: (row.Type || row.type || 'expense').toLowerCase(),
          amount: parseFloat(row.Amount || row.amount || 0),
          method: row['Payment Method'] || row.method || 'Other',
        }));
        setTransactions(prev => [...parsed, ...prev]);
      },
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) parseCSV(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) parseCSV(file);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.date || !form.description || !form.amount) return;
    setTransactions(prev => [
      { ...form, id: Date.now(), amount: parseFloat(form.amount) },
      ...prev,
    ]);
    setForm(initialForm);
  };

  return (
    <>
      <Topbar title="Transactions" subtitle="Upload your CSV file or add transactions manually." />
      <div className="page-content">
        <div className="upload-grid">
          {/* CSV Upload */}
          <div className="upload-card">
            <div className="upload-card-header">
              <div className="upload-card-icon">☁️</div>
              <div>
                <h3>Upload CSV File</h3>
                <p>Upload your bank statement or transaction file in CSV format.</p>
              </div>
            </div>
            <div
              className={`drop-zone ${dragging ? 'dragging' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current.click()}
            >
              <div className="drop-zone-icon">☁️</div>
              <p>Drag and drop your CSV file here</p>
              <span>or</span>
              <button className="btn-primary" onClick={e => { e.stopPropagation(); fileRef.current.click(); }}>Browse File</button>
              <input ref={fileRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleFileChange} />
            </div>
            <div className="csv-hint">ℹ️ Ensure your CSV has columns: Date, Description, Category, Amount, Type</div>
          </div>

          {/* Manual Add */}
          <div className="upload-card">
            <div className="upload-card-header">
              <div className="upload-card-icon" style={{ background: 'rgba(16,185,129,0.2)' }}>➕</div>
              <div>
                <h3>Add Transaction Manually</h3>
                <p>Enter transaction details manually.</p>
              </div>
            </div>
            <form onSubmit={handleAdd}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input type="text" placeholder="Enter description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    <option value="">Select category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Amount (₹)</label>
                  <input type="number" placeholder="Enter amount" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} required min="0" />
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select value={form.method} onChange={e => setForm(f => ({ ...f, method: e.target.value }))}>
                    <option value="">Select payment method</option>
                    {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-add">Add Transaction</button>
            </form>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No Transactions Yet</h3>
            <p>Upload a CSV file or add a transaction manually to get started.</p>
          </div>
        ) : (
          <div className="transactions-table-wrap">
            <div className="transactions-table-header">
              <h3>Transaction History <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: 13 }}>({transactions.length} records)</span></h3>
              <button className="btn-primary" onClick={() => setTransactions([])}>Clear All</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Payment Method</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id}>
                    <td>{tx.date}</td>
                    <td>{tx.description}</td>
                    <td>{tx.category || '—'}</td>
                    <td>{tx.method || '—'}</td>
                    <td>
                      <span className={`badge ${tx.type === 'income' ? 'badge-income' : 'badge-expense'}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className={tx.type === 'income' ? 'amount-income' : 'amount-expense'}>
                      {tx.type === 'income' ? '+' : '-'}₹{Number(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
