import React, { useState, useEffect, useRef } from 'react';
import type { Message } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import { UserIcon, RobotIcon, SendIcon, MicIcon } from './Icons';
import VoiceChat from './VoiceChat';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMessages([
      {
        id: 'initial',
        text: 'Hello! I\'m your AI assistant for exchange students at HS Pforzheim. How can I help you get settled in today?',
        sender: 'ai',
      },
    ]);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponseText = await getChatbotResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-16rem)] sm:h-[calc(100vh-14rem)]">
      {isVoiceMode && <VoiceChat onClose={() => setIsVoiceMode(false)} />}
      
      <div className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-hs-gold/20 flex items-center justify-center text-hs-gold">
                <RobotIcon />
              </div>
            )}
            <div className={`max-w-md p-4 rounded-2xl ${
              msg.sender === 'user' 
                ? 'bg-hs-gold text-hs-dark rounded-br-none' 
                : 'bg-gray-100 text-hs-dark rounded-bl-none'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
            {msg.sender === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                <UserIcon />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-hs-gold/20 flex items-center justify-center text-hs-gold">
              <RobotIcon />
            </div>
            <div className="max-w-md p-4 rounded-2xl bg-gray-100 text-hs-dark rounded-bl-none flex items-center gap-2">
                <span className="w-2 h-2 bg-hs-gold rounded-full animate-pulse delay-0"></span>
                <span className="w-2 h-2 bg-hs-gold rounded-full animate-pulse delay-150"></span>
                <span className="w-2 h-2 bg-hs-gold rounded-full animate-pulse delay-300"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about housing, visas, or local tips..."
          className="flex-grow bg-gray-100 border border-gray-300 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-hs-gold transition text-hs-dark placeholder:text-gray-500"
          disabled={isLoading}
        />
         <button
          type="button"
          onClick={() => setIsVoiceMode(true)}
          className="w-12 h-12 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
          title="Start Voice Assistant"
        >
          <MicIcon />
        </button>
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="w-12 h-12 flex-shrink-0 bg-hs-gold rounded-full flex items-center justify-center text-hs-dark font-bold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-yellow-500 transition-colors"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;