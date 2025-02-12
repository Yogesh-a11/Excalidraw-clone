"use client"
import React, { useState } from 'react';
import { PenLine } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignUp() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [message, setMessage] = useState("");
        const [name, setName] = useState("");
        const router = useRouter();


    const handleSignun = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            
            const response = await axios.post("http://localhost:3001/api/v1/signup", {
            name,    
            email,
            password,
            });
    
            localStorage.setItem("token", response.data.token);
            setMessage("Signin successful!");
    
            router.push("/home");
        } catch (error: any) {
            console.error("Signin error:", error);
            setMessage(
            error.response?.data?.message ||
                "Signin failed. Please check your credentials and try again."
            );
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
            <div className="flex items-center space-x-2">
                <PenLine className="h-8 w-8 text-purple-600" />
                <span className="font-bold text-2xl text-gray-900">Excalidraw</span>
            </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/sign-in" className="font-medium text-purple-600 hover:text-purple-500">
                Sign in 
            </Link>
            </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] sm:rounded-lg sm:px-10">
            <form onSubmit={handleSignun} className="space-y-6" action="#" method="POST">
                <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full name
                </label>
                <div className="mt-1">
                    <input
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>
                </div>

                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <div className="mt-1">
                    <input
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>
                </div>

                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className="mt-1">
                    <input
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>
                </div>

                <div className="flex items-center">
            
                </div>

                <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                    Create account
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}