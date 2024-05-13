'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [loadingProfile, setLoadingProfile] = useState(false);
    const { login, user, profileInfo } = useAuth(); // Get login function and profile info from authentication context
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        if (user && !profileInfo) {
            fetchProfileInfo();
        }
    }, [user, profileInfo]);

    const fetchProfileInfo = async () => {
        try {
            setLoadingProfile(true);
            const response = await fetch('http://localhost:5000/api/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': user.token
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile information');
            }

            const data = await response.json();
            // Set user profile info in authentication context
            // This assumes you have a function like setProfileInfo in your useAuth hook
            // Replace setProfileInfo with the appropriate function from your useAuth hook
            setProfileInfo(data);
            setLoadingProfile(false);
        } catch (error) {
            console.error(error.message);
            setLoadingProfile(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: val
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();

            if (response.ok) {
                // Store token in local storage
                localStorage.setItem('token', responseData.token);

                // Set user data in authentication context
                login({ token: responseData.token });

                toast({
                    title: "Success",
                    description: "You have successfully logged in",
                });

                // Redirect to dashboard page after successful login
                router.push('/');
            } else {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: responseData.message || "Invalid credentials. Please try again.",
                });
            }
        } catch (error) {
            console.error('Login error:', error.message);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="rememberMe" className="flex items-center">
                                <input type="checkbox" id="rememberMe" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="mr-2" />
                                <span>Remember Me</span>
                            </label>
                            <a href="/forgot-password" className="text-amber-500 hover:underline">Forgot Password?</a>
                        </div>
                        <Button type="submit" className="py-2 px-4 rounded">Login</Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p>Don&apos;t have an account? <a href="/auth/signup" className="text-amber-500 hover:underline">Sign Up</a></p>
                </CardFooter>
            </Card>
        </div>
    );
}
