
import { useEffect, useState } from "react";

export default function MockAd({ size = [220, 80] }) {
  const [width, height] = size;
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    let showTimer;
    let hideTimer;

    function showAd() {
      const maxLeft = Math.max(0, window.innerWidth - width);
      const maxTop = Math.max(0, window.innerHeight - height);

      setPosition({
        left: Math.random() * maxLeft,
        top: Math.random() * maxTop,
      });

      setVisible(true);

      hideTimer = setTimeout(() => {
        setVisible(false);
        showTimer = setTimeout(
          showAd,
          3000 + Math.random() * 7000
        );
      }, 5000);
    }

    showTimer = setTimeout(
      showAd,
      1000 + Math.random() * 4000
    );

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [width, height, dismissed]);

  if (!visible) return null;

  return (
    <div
      className="mock-ad"
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 9999,
        background: "#334155",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
        padding: "10px",
        boxSizing: "border-box",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        overflow: "hidden",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: "9px",
            color: "#cbd5e1",
          }}
        >
          MOCK AD · SPONSORED
        </div>

        <h3 style={{ margin: "4px 0", fontSize: "14px" }}>
          Upgrade Your Tech
        </h3>

        <p
          style={{
            margin: 0,
            fontSize: "10px",
            color: "#e2e8f0",
          }}
        >
          Discover tools to boost your productivity.
        </p>
      </div>

      <button
        onClick={() => alert("Mock ad clicked!")}
        style={{
          background: "#38bdf8",
          color: "#0f172a",
          border: "none",
          padding: "7px 9px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "10px",
          fontWeight: "bold",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Learn More
      </button>
      <button
        type="button"
        aria-label="Close ad"
        onClick={() => {
          setDismissed(true);
          setVisible(false);
        }}
        style={{
          background: "transparent",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "20px",
        }}
      >
        ×
      </button>
    </div>
  );
}
