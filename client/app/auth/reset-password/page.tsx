'use client'
import { useState } from 'react';

export default function ResetPassword() {
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-8 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block">New Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <button type="submit" className="bg-amber-500 text-white py-2 px-4 rounded">Reset Password</button>
                </form>
            </div>
        </div>
    );
}
