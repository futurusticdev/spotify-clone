import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock window.crypto for consistent random number generation in tests
Object.defineProperty(window, "crypto", {
  value: {
    getRandomValues: (array: Uint32Array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 1000);
      }
      return array;
    },
  },
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  value: MockIntersectionObserver,
});

// Enhanced MockAudio with proper event handling
class MockAudio extends EventTarget {
  src: string = "";
  currentTime: number = 0;
  volume: number = 1;
  paused: boolean = true;
  duration: number = 0;
  readyState: number = 0;
  private eventListeners: { [key: string]: Function[] } = {};
  private playPromise: Promise<void> | null = null;

  constructor(src?: string) {
    super();
    if (src) {
      this.src = src;
      this.load();
    }
  }

  play(): Promise<void> {
    if (this.playPromise) {
      return this.playPromise;
    }

    this.playPromise = new Promise<void>((resolve) => {
      this.paused = false;
      this.dispatchEvent(new Event("play"));
      this.playPromise = null;
      resolve();
    });

    return this.playPromise;
  }

  pause(): void {
    this.paused = true;
    this.dispatchEvent(new Event("pause"));
  }

  load(): void {
    this.readyState = 1;
    this.dispatchEvent(new Event("loadstart"));

    // Simulate async loading sequence
    this.readyState = 2;
    this.duration = 180;
    this.dispatchEvent(new Event("durationchange"));
    this.dispatchEvent(new Event("loadedmetadata"));

    this.readyState = 3;
    this.dispatchEvent(new Event("loadeddata"));

    this.readyState = 4;
    this.dispatchEvent(new Event("canplay"));
    this.dispatchEvent(new Event("canplaythrough"));
  }

  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject
  ): void {
    if (!this.eventListeners[type]) {
      this.eventListeners[type] = [];
    }
    this.eventListeners[type].push(callback as Function);
    super.addEventListener(type, callback);
  }

  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject
  ): void {
    if (!this.eventListeners[type]) return;
    this.eventListeners[type] = this.eventListeners[type].filter(
      (cb) => cb !== callback
    );
    super.removeEventListener(type, callback);
  }

  dispatchEvent(event: Event): boolean {
    return super.dispatchEvent(event);
  }

  reset(): void {
    this.src = "";
    this.currentTime = 0;
    this.volume = 1;
    this.paused = true;
    this.duration = 0;
    this.readyState = 0;
    this.eventListeners = {};
    this.playPromise = null;
  }
}

// Mock the global Audio constructor
Object.defineProperty(window, "Audio", {
  value: MockAudio,
  writable: true,
  configurable: true,
});

// Mock HTMLMediaElement methods
Object.defineProperty(HTMLMediaElement.prototype, "play", {
  configurable: true,
  value() {
    this.paused = false;
    this.dispatchEvent(new Event("play"));
    return Promise.resolve();
  },
});

Object.defineProperty(HTMLMediaElement.prototype, "pause", {
  configurable: true,
  value() {
    this.paused = true;
    this.dispatchEvent(new Event("pause"));
  },
});

Object.defineProperty(HTMLMediaElement.prototype, "load", {
  configurable: true,
  value() {
    this.readyState = 4;
    this.duration = 180;
    this.dispatchEvent(new Event("loadedmetadata"));
    this.dispatchEvent(new Event("canplay"));
  },
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Reset all mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});
