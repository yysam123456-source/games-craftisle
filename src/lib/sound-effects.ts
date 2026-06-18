// 音效工具库 - 使用 Web Audio API 生成音效

// 音频上下文单例
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

// 音效配置接口
interface SoundConfig {
  frequency?: number;
  duration?: number;
  type?: OscillatorType;
  volume?: number;
}

// 播放音效
export function playSound(config: SoundConfig = {}) {
  const {
    frequency = 800,
    duration = 0.1,
    type = "sine",
    volume = 0.3,
  } = config;

  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (error) {
    console.warn("Failed to play sound:", error);
  }
}

// 预定义音效
export const sounds = {
  // 按钮点击音效
  buttonClick: () => playSound({ frequency: 800, duration: 0.1, type: "sine", volume: 0.2 }),
  
  // 按钮悬停音效
  buttonHover: () => playSound({ frequency: 600, duration: 0.05, type: "sine", volume: 0.1 }),
  
  // 成功音效
  success: () => {
    playSound({ frequency: 523, duration: 0.1, type: "sine", volume: 0.3 });
    setTimeout(() => playSound({ frequency: 659, duration: 0.1, type: "sine", volume: 0.3 }), 100);
    setTimeout(() => playSound({ frequency: 784, duration: 0.2, type: "sine", volume: 0.3 }), 200);
  },
  
  // 游戏开始音效
  gameStart: () => {
    playSound({ frequency: 440, duration: 0.15, type: "triangle", volume: 0.2 });
    setTimeout(() => playSound({ frequency: 554, duration: 0.15, type: "triangle", volume: 0.2 }), 150);
    setTimeout(() => playSound({ frequency: 659, duration: 0.3, type: "triangle", volume: 0.2 }), 300);
  },
    
  // 游戏加载音效
  gameLoad: () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        playSound({
          frequency: 400 + i * 100,
          duration: 0.1,
          type: "sine",
          volume: 0.15,
        });
      }, i * 80);
    }
  },
    
  // 错误音效
  error: () => {
    playSound({ frequency: 200, duration: 0.2, type: "sawtooth", volume: 0.2 });
  },
    
  // 通知音效
  notification: () => {
    playSound({ frequency: 800, duration: 0.08, type: "sine", volume: 0.2 });
    setTimeout(() => playSound({ frequency: 1000, duration: 0.08, type: "sine", volume: 0.2 }), 80);
  },
};

// 音效管理器
class SoundManager {
  private enabled: boolean = true;
  private volume: number = 0.5;

  constructor() {
    // 从 localStorage 读取设置
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sound-enabled");
      if (saved !== null) {
        this.enabled = JSON.parse(saved);
      }
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("sound-enabled", JSON.stringify(enabled));
    }
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  play(soundName: keyof typeof sounds): void {
    if (!this.enabled) return;
    sounds[soundName]();
  }
}

// 全局音效管理器实例
export const soundManager = new SoundManager();

// React Hook
import { useEffect, useState } from "react";

export function useSound() {
  const [enabled, setEnabled] = useState(soundManager.isEnabled());

  useEffect(() => {
    setEnabled(soundManager.isEnabled());
  }, []);

  const toggleSound = () => {
    const newState = !enabled;
    setEnabled(newState);
    soundManager.setEnabled(newState);
  };

  const play = (soundName: keyof typeof sounds) => {
    if (enabled) {
      soundManager.play(soundName);
    }
  };

  return {
    enabled,
    toggleSound,
    play,
    sounds: soundManager,
  };
}
