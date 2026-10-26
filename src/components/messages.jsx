// messages.jsx
import "tailwindcss";

export function DisplayUserName({ text = "" }) {
  const name = "Sandro";
  return (
    <h1 className="quote-container text-3xl font-bold text-blue-600 fade-in">
      {text}
    </h1>
  );
}
