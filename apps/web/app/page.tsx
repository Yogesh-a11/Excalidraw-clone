"use client";
import React from 'react';
import { PenLine, Users, Lock, Sparkles, Github, Share2, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
function page() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-b from-purple-50 to-white">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <PenLine className="h-6 w-6 text-purple-600" />
            <span className="font-bold text-xl text-gray-900">Excalidraw</span>
          </div>
          <div>
            <button onClick={() => router.push("/auth/sign-in")} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Sign In
            </button>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Whiteboard collaboration made simple
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create beautiful hand-drawn like diagrams, wireframes, and illustrations. 
              Collaborate in real-time with your team, anywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transform hover:-translate-y-1 transition-all">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-time Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">Work together with your team in real-time, see changes instantly, and bring your ideas to life together.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transform hover:-translate-y-1 transition-all">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure by Default</h3>
              <p className="text-gray-600 leading-relaxed">End-to-end encryption ensures your data stays private and secure, giving you peace of mind.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transform hover:-translate-y-1 transition-all">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Beautiful Results</h3>
              <p className="text-gray-600 leading-relaxed">Create professional-looking diagrams with our hand-drawn style that brings your ideas to life.</p>
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80" 
              alt="Collaborative whiteboard example"
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h2 className="text-3xl font-bold mb-4">See it in action</h2>
                <p className="text-lg mb-6">Watch how teams use Excalidraw to bring their ideas to life.</p>
                <button className="bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to start creating?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of teams already using Excalidraw</p>
          <div className="flex justify-center space-x-4">
            <button onClick={()=> router.push("/auth/sign-up")} className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-lg">
              Get Started Free
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors text-lg">
              View Pricing
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <PenLine className="h-6 w-6" />
              <span className="font-bold text-xl text-white">Excalidraw</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white">
                <Share2 className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white">
                <Download className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 flex justify-between">
            <p>&copy; 2025 Excalidraw. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default page