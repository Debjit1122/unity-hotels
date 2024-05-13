'use client'
import { useState } from 'react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Failed to request password reset');
            }

            console.log('Password reset email sent successfully');
        } catch (error) {
            console.error('Error requesting password reset:', error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-8 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <button type="submit" className="bg-amber-500 text-white py-2 px-4 rounded">Reset Password</button>
                </form>
            </div>
        </div>
    );
}
