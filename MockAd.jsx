
import { useEffect, useState } from "react";

// Creates a mock advertisement component.
// The default size is 100 pixels wide and 80 pixels tall.
export default function MockAd({ size = [100, 80] }) {
  // Extract the width and height values from the size array.
  const [width, height] = size;

  // Tracks whether the advertisement should be displayed.
  const [visible, setVisible] = useState(false);

  // Runs once when the component first appears on the page.
  useEffect(() => {
    // Wait 3 seconds before displaying the advertisement.
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    // Clears the timer if the component unmounts before it finishes.
    return () => clearTimeout(timer);
  }, []);

  // Hide the advertisement until the timer finishes.
  if (!visible) return null;

  return (
    <div
      className="mock-ad"
      style={{
        position: "fixed", // Positions the ad relative to the browser window.
        top: "5%", // Places the ad 5% down from the top of the window.
        left: "40%", // Places the ad 40% across the window.
        transform: "translate(-50%, -50%)", // Offsets the ad by half its own size.
        width: width, // Sets the ad's width using the size prop.
        height: height, // Sets the ad's height using the size prop.
        zIndex: 9999, // Places the ad above most other page elements.
        background: "#334155", // Sets the ad's dark slate background.
        color: "white", // Sets the default text color to white.
        display: "flex", // Arranges the content using Flexbox.
        alignItems: "center", // Vertically centers the content.
        justifyContent: "space-between", // Distributes content horizontally.
        gap: "8px", // Adds space between the content elements.
        padding: "10px", // Adds space inside the ad's edges.
        boxSizing: "border-box", // Includes padding and borders in the dimensions.
        borderRadius: "8px", // Rounds the corners of the ad.
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)", // Adds a shadow behind the ad.
        overflow: "hidden", // Prevents content from spilling outside the ad.
      }}
    >
      {/* Close button: hides the advertisement when clicked. */}
      <button
        onClick={() => setVisible(false)} // Changes visibility to false.
        aria-label="Close ad" // Provides an accessible name for screen readers.
        style={{
          position: "absolute", // Positions the button relative to the ad.
          top: "4px", // Places it near the top edge.
          right: "6px", // Places it near the right edge.
          background: "transparent", // Removes the button background.
          color: "white", // Makes the X white.
          border: "none", // Removes the button's default border.
          fontSize: "20px", // Sets the X's font size.
          fontWeight: "bold", // Makes the X bold.
          cursor: "pointer", // Displays a pointer when hovering over it.
          lineHeight: 0.5, // Controls the height of the text line.
          padding: "2px 3px", // Adds space around the X.
        }}
      >
        {/* Span styles the X inside its own bordered box. */}
        <span
          style={{
            display: "inline-block", // Allows width and height to be applied.
            border: "1px solid white", // Adds a thin white border.
            width: "50px%", // Intended to set the width of the X box.
            height: 17, // Sets the box height to 17 pixels.
            textAlign: "center", // Centers the X horizontally.
            lineHeight: "10px", // Controls the vertical spacing of the X.
          }}
        >
          x
        </span>
      </button>

      {/* Ad content: contains the sponsorship label, heading, and description. */}
      <div style={{ minWidth: 0 }}>
        {/* Identifies the component as a sponsored mock advertisement. */}
        <div
          style={{
            fontSize: "9px", // Sets the label's font size.
            color: "#cbd5e1", // Gives the label a light gray-blue color.
          }}
        >
          MOCK AD · SPONSORED
        </div>

        {/* Main headline of the advertisement. */}
        <h3 style={{ margin: "4px 0", fontSize: "14px" }}>
          Upgrade Your Tech
        </h3>

        {/* Short description below the headline. */}
        <p
          style={{
            margin: 0, // Removes the paragraph's default margin.
            fontSize: "10px", // Sets the description's font size.
            color: "#e2e8f0", // Gives the description a light gray color.
          }}
        >
          Discover tools to boost your productivity.
        </p>
      </div>

      {/* Learn More button: displays an alert when clicked. */}
      <button
        onClick={() => alert("Mock ad clicked!")} // Simulates clicking an ad.
        style={{
          background: "#38bdf8", // Sets a light blue background.
          color: "#0f172a", // Sets the text color to dark slate.
          border: "none", // Removes the default button border.
          padding: "7px 9px", // Adds space around the button text.
          borderRadius: "6px", // Rounds the button's corners.
          cursor: "pointer", // Shows a pointer on hover.
          fontSize: "10px", // Sets the button text size.
          fontWeight: "bold", // Makes the button text bold.
          whiteSpace: "nowrap", // Prevents the text from wrapping.
          flexShrink: 0, // Prevents Flexbox from shrinking the button.
        }}
      >
        Learn More
      </button>
    </div>
  );
}
