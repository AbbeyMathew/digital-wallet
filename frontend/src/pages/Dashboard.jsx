import React, { useEffect, useState } from 'react';
import { me, topup, transfer, transactions } from '../services/walletService';
import './styles/Dashboard.css'

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [amt, setAmt] = useState('');
    const [to, setTo] = useState('');
    const [note, setNote] = useState('');
    const [txs, setTxs] = useState([]);

    const load = async () => {
        try {
            const r = await me();
            setUser(r.data.user);
            const t = await transactions();
            setTxs(t.data.transactions);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const doTopup = async e => {
        e.preventDefault();
        try {
            await topup(Number(amt));
            setAmt('');
            load();
        } catch (e) {
            alert(e?.response?.data?.message || e.message)
        }
    };

    const doTransfer = async e => {
        e.preventDefault();
        try {
            await transfer({ toPhone: to, amount: Number(amt), note });
            setTo('');
            setAmt('');
            setNote('');
            load();
        } catch (e) {
            alert(e?.response?.data?.message || e.message)
        }
    };

    return (
        <div className='dash-wrapper'>
            <h2>Dashboard</h2>

            <div className="dash-contents">
                <div>Name: {user?.name ?? 'Guest'}</div>
                <div>Phone: {user?.phone ?? '0000000000'}</div>
                <div>Email: {user?.email ?? 'guestmail@vector.com'}</div>
                <div className='dash-balance'>Balance: {user?.wallet?.balance ?? 0}</div>
            </div>

            <form onSubmit={doTopup}>
                <h3>Top up (mock)</h3>
                <input placeholder='amount' value={amt} onChange={e => setAmt(e.target.value)} />
                <button>Top up</button>
            </form>

            <form onSubmit={doTransfer} style={{ marginTop: 16 }}>
                <h3>Transfer</h3>
                <input placeholder='recipient phone' value={to} onChange={e => setTo(e.target.value)} /><br />
                <input placeholder='amount' value={amt} onChange={e => setAmt(e.target.value)} /><br />
                <input placeholder='note' value={note} onChange={e => setNote(e.target.value)} /><br />
                <button>Send</button>
            </form>

            <hr />
            <h3>Transactions</h3>

            <ul>
                {txs.map(tx => (
                    <li key={tx.id ?? tx._id}>
                        {new Date(tx.createdAt ?? tx.created_at).toLocaleString()} — {tx.type} — {tx.amount}
                        <br />
                        From: {tx.from ? `${tx.from.name ?? 'Unknown'} (ID: ${tx.from.id ?? tx.from._id ?? '—'})` : 'system'}
                        <br />
                        To: {tx.to ? `${tx.to.name ?? 'Unknown'} (ID: ${tx.to.id ?? tx.to._id ?? '—'})` : 'system'}
                        {tx.note && (<><br /><em>Note: {tx.note}</em></>)}
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );

}