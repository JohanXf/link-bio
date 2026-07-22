import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Github, Ticket } from 'lucide-react';
import { supabase } from '../lib/supabase';

const DiscordIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 127.14 96.36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

const GoogleIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export function AuthModal({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOAuthLogin = async (provider: 'google' | 'discord') => {
    try {
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        }
      });
      if (error) throw error;
      if (data) {
          setErrorMsg('If you see this, OAuth redirect is starting. It may fail if used within the standard preview iFrame without configuration.');
          setTimeout(() => {
             onSuccess();
          }, 2000);
      }
    } catch (e: any) {
      setErrorMsg(e.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    
    try {
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');
      
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        if (data.session) {
           onSuccess();
        } else {
           setSuccessMsg('Check your email to verify your account!');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        if (data.session) {
           onSuccess();
        }
      }
    } catch (e: any) {
      setErrorMsg(e.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }} 
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] bg-[#141414] border border-white/10 rounded-2xl p-6 z-[90] shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-josefin font-bold text-white tracking-tight">Sign in or create account</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 bg-white/5 rounded-full">
                <X size={18} />
              </button>
            </div>
            
            <p className="text-gray-400 text-sm mb-6 text-center">
              Welcome to prophile.app. Choose a provider below to continue building your profile.
            </p>

            <div className="space-y-3">
              <button 
                onClick={() => handleOAuthLogin('google')} 
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-josefin font-bold tracking-tight text-[17px] hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <GoogleIcon size={18} />
                Continue with Google
              </button>
              
              <button 
                onClick={() => handleOAuthLogin('discord')} 
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-[#5865F2] text-white py-3 rounded-xl font-josefin font-bold tracking-tight text-[17px] hover:bg-[#4752C4] transition-colors disabled:opacity-50"
              >
                <DiscordIcon size={18} />
                Continue with Discord
              </button>
              
              <div className="relative flex py-2 items-center">
                 <div className="flex-grow border-t border-white/10"></div>
                 <span className="flex-shrink-0 mx-4 text-gray-500 text-xs">or</span>
                 <div className="flex-grow border-t border-white/10"></div>
              </div>

              {showEmailInput ? (
                <form onSubmit={handleEmailLogin} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-colors"
                    required
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-colors"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-josefin font-bold tracking-tight text-[17px] hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    {isSignUp ? 'Sign up' : 'Sign in'}
                  </button>
                  <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="w-full text-[15px] font-josefin font-semibold tracking-tight text-gray-400 hover:text-white transition-colors mt-2 pb-1">
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => setShowEmailInput(true)}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-[#1a1a1a] border border-white/10 text-white py-3 rounded-xl font-josefin font-bold tracking-tight text-[17px] hover:bg-[#252525] transition-colors disabled:opacity-50"
                >
                  <Mail size={18} className="text-gray-400" />
                  Continue with Email
                </button>
              )}
            </div>
            
            {errorMsg && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm text-center">
                {successMsg}
              </div>
            )}
            
            <p className="mt-6 text-center text-xs text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
