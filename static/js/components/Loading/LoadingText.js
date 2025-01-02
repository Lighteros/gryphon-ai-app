import React from "react";

const LoadingText = () => {
  return (
    <div className="flex space-x-1 justify-center">
      <span className="animate-bounce text-xl font-bold text-[#FF9649]">L</span>
      <span
        className="animate-bounce text-xl font-bold text-[#FF9649]"
        style={{ animationDelay: "0.1s" }}
      >
        O
      </span>
      <span
        className="animate-bounce text-xl font-bold text-[#FF9649]"
        style={{ animationDelay: "0.2s" }}
      >
        A
      </span>
      <span
        className="animate-bounce text-xl font-bold text-[#FF9649]"
        style={{ animationDelay: "0.3s" }}
      >
        D
      </span>
      <span
        className="animate-bounce text-xl font-bold text-[#FF9649]"
        style={{ animationDelay: "0.4s" }}
      >
        I
      </span>
      <span
        className="animate-bounce text-xl font-bold text-[#FF9649]"
        style={{ animationDelay: "0.5s" }}
      >
        N
      </span>
      <span
        className="animate-bounce text-xl font-bold text-[#FF9649]"
        style={{ animationDelay: "0.6s" }}
      >
        G...
      </span>
    </div>
  );
};

export default LoadingText;
