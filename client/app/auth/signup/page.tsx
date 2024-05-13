'use client'
import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        username: '',
        fullname: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        address: '',
        password: ''
    });
    //@ts-ignore
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    //@ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://unity-hotels-api.vercel.app/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Congratulations, your account has been successfully created",
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: responseData.message || "There was a problem with your request.",
                })
            }
        } catch (error) {
            //@ts-ignore
            console.error('Signup error:', error.message);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    };


    const { toast } = useToast()

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-xl my-10">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block">Username</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div>
                            <label htmlFor="fullname" className="block">Full Name</label>
                            <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block">Phone</label>
                            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div>
                            <label htmlFor="dob" className="block">Date of Birth</label>
                            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block">Gender</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="address" className="block">Address</label>
                            <textarea id="address" name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2"></textarea>
                        </div>
                        <div>
                            <label htmlFor="password" className="block">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <Button type="submit" className="py-2 px-4 rounded" onClick={handleSubmit}>Sign Up</Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p>Already have an account? <a href="/auth/login" className="text-amber-500 hover:underline">Login</a></p>
                </CardFooter>
            </Card>
        </div>
    );
}
