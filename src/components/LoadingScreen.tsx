"use client";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#121212] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8">
        {/* Spotify Logo */}
        <svg
          viewBox="0 0 16 16"
          className="h-20 w-20 text-[#1ED760]"
          fill="currentColor"
        >
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z" />
        </svg>

        {/* Loading bars */}
        <div className="flex items-center gap-[2px]">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-[3px] h-4 bg-[#1ED760] rounded-full animate-spotify-bar"
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
