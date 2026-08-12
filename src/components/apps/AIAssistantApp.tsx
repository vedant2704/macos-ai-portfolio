'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AIMessage, queryAIEngine, SUGGESTED_PROMPTS, UIAction } from '@/lib/ai-engine';
import { Sparkles, Send, Trash2, Bot, User, ArrowRight } from 'lucide-react';
import { sound } from '@/lib/sound';
import { PORTFOLIO_DATA } from '@/data/portfolio';

interface AIAssistantAppProps {
  onExecuteAction?: (action: UIAction) => void;
}

export const AIAssistantApp: React.FC<AIAssistantAppProps> = ({ onExecuteAction }) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: `Hello! I am ${PORTFOLIO_DATA.owner.name}'s personal AI concierge. 👋\n\nI can tell you about his engineering background, showcase his projects, explain his technical stack, or launch desktop windows for you.\n\nWhat would you like to explore today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedPrompts: SUGGESTED_PROMPTS.slice(0, 4)
    }
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text || isTyping) return;

    sound.playClick();

    const userMsg: AIMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    // Simulate real AI processing & streaming
    setTimeout(() => {
      sound.playPop();
      const aiResult = queryAIEngine(text);

      const aiMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: aiResult.responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: aiResult.action,
        suggestedPrompts: aiResult.suggestedPrompts
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      // Execute UI Action if present
      if (aiResult.action && onExecuteAction) {
        setTimeout(() => {
          onExecuteAction(aiResult.action!);
        }, 600);
      }
    }, 800);
  };

  const handleClearHistory = () => {
    sound.playClick();
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'assistant',
        content: "Conversation history cleared. How can I assist you now?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: SUGGESTED_PROMPTS.slice(0, 3)
      }
    ]);
  };

  return (
    <div className="h-full flex flex-col justify-between space-y-4">
      {/* AI Header & Glowing Orb */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/60 to-indigo-950/60 border border-cyan-500/30 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Animated AI Glowing Orb */}
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 flex items-center justify-center p-0.5 shadow-lg shadow-cyan-500/30 animate-pulse">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>
          <div>
            <h3 className="font-extrabold text-white text-sm">{PORTFOLIO_DATA.owner.name}&apos;s AI</h3>
            <p className="text-[11px] text-cyan-300">Intelligent Portfolio Assistant & UI Agent</p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-md'
                  : 'bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-md shadow-cyan-500/20'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Message Bubble */}
            <div className={`max-w-[80%] space-y-2`}>
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'bg-white/10 border border-white/10 text-slate-100 backdrop-blur-md'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>

                {/* UI Action Badge */}
                {msg.action && (
                  <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 font-semibold text-[10px] flex items-center space-x-1 border border-cyan-400/30">
                      <Sparkles className="w-3 h-3" />
                      <span>{msg.action.label || 'Action Executed'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                )}
              </div>

              {/* Timestamp */}
              <div className="text-[10px] text-slate-400 px-1">{msg.timestamp}</div>

              {/* Suggested Prompts */}
              {msg.suggestedPrompts && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {msg.suggestedPrompts.map((prompt, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => handleSendMessage(prompt)}
                      className="px-2.5 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[11px] font-medium transition-colors text-left"
                    >
                      ✨ {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/10 text-xs text-slate-400 flex items-center space-x-1">
              <span>AI is thinking</span>
              <span className="animate-ping font-bold">...</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center space-x-2 pt-2 border-t border-white/10"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={`Ask ${PORTFOLIO_DATA.owner.name}'s AI anything (e.g. 'Show me his AI projects')...`}
          className="flex-1 bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isTyping}
          className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold transition-all shadow-md shadow-cyan-500/20 disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
