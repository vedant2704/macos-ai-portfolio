'use client';

import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Minus, Square, X } from 'lucide-react';
import { sound } from '@/lib/sound';

export interface WindowFrameProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  children: React.ReactNode;
  defaultWidth?: string;
  defaultHeight?: string;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  id,
  title,
  icon,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
  defaultWidth = 'max-w-4xl w-[92vw] sm:w-[85vw] md:w-[780px]',
  defaultHeight = 'h-[75vh] max-h-[680px] min-h-[420px]'
}) => {
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);

  if (!isOpen || isMinimized) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    onFocus(id);
    if ((e.target as HTMLElement).closest('.window-drag-handle')) {
      dragControls.start(e);
    }
  };

  return (
    <motion.div
      ref={windowRef}
      drag={!isMaximized}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.05}
      dragConstraints={{ left: -300, top: 0, right: 300, bottom: 300 }}
      initial={{ scale: 0.92, opacity: 0, y: 15 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0,
        width: isMaximized ? '100vw' : undefined,
        height: isMaximized ? 'calc(100vh - 32px)' : undefined,
        top: isMaximized ? '32px' : undefined,
        left: isMaximized ? '0px' : undefined
      }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      onPointerDown={handlePointerDown}
      style={{ zIndex }}
      className={`fixed ${
        isMaximized
          ? 'top-[32px] left-0 w-full h-[calc(100vh-32px)] rounded-none'
          : `top-[10%] left-[5%] md:left-[18%] ${defaultWidth} ${defaultHeight} rounded-2xl`
      } flex flex-col overflow-hidden bg-slate-900/80 dark:bg-slate-950/85 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl shadow-black/50 transition-shadow duration-300 select-none text-slate-100 font-sans`}
    >
      {/* Title Bar */}
      <div
        className="window-drag-handle h-10 px-4 flex items-center justify-between bg-white/10 dark:bg-white/5 border-b border-white/10 cursor-grab active:cursor-grabbing backdrop-blur-md select-none shrink-0"
      >
        {/* macOS Traffic Lights */}
        <div className="flex items-center space-x-2 group">
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playWindowClose();
              onClose(id);
            }}
            aria-label="Close window"
            className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center text-slate-950 opacity-90 transition-all shadow-sm"
          >
            <X className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playPop();
              onMinimize(id);
            }}
            aria-label="Minimize window"
            className="w-3.5 h-3.5 rounded-full bg-amber-400 hover:bg-amber-500 flex items-center justify-center text-slate-950 opacity-90 transition-all shadow-sm"
          >
            <Minus className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playPop();
              onMaximize(id);
            }}
            aria-label="Maximize window"
            className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-slate-950 opacity-90 transition-all shadow-sm"
          >
            <Square className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
          </button>
        </div>

        {/* Title */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200/90 tracking-wide">
          {icon && <span className="opacity-80">{icon}</span>}
          <span>{title}</span>
        </div>

        {/* Window controls right alignment spacer */}
        <div className="w-14" />
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-auto p-4 md:p-6 text-slate-100 custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
};
