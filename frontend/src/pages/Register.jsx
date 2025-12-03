import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './styles/Register.css';

export default function Register() {
    const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });
    const nav = useNavigate();
    const submit = async e => {
        e.preventDefault();
        try {
            const r = await register(form);
            localStorage.setItem('token', r.data.token);
            nav('/dashboard');
        } catch (err) {
            alert(err?.response?.data?.message || err.message)
        }
    };

    return (
        <div className="register-wrapper">
            <form className='register-form' onSubmit={submit}>
                <h2>Register</h2>
                <label htmlFor="name" className='register-label'>Name</label>
                <input className='register-input hoverable' placeholder='Name' value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /><br />
                <label htmlFor="name" className='register-label'>Phone Number</label>
                <input className='register-input hoverable' placeholder='Phone Number' value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /><br />
                <label htmlFor="name" className='register-label'>Email</label>
                <input className='register-input hoverable' placeholder='Email' value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /><br />
                <label htmlFor="name" className='register-label'>Password</label>
                <input className='register-input hoverable' placeholder='Password' type='password' value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /><br />
                <button className='register-button hoverable'>Register</button>
            </form>
        </div>
    );
}
