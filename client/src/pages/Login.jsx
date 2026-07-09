import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Note: the project spec (4.1–4.4) doesn't define a User model or auth
// endpoints — only Sessions are persisted to MongoDB. This page just tags
// the browser with an operator name (stored locally) so the dashboard has
// someone to greet; it is not a security boundary. Wire this up to a real
// /api/auth endpoint + User schema if login needs to be authoritative.
const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem("operatorName", trimmed);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-graphite-800 shadow-bezel p-8"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="h-2 w-2 rounded-full bg-amber" />
          <span className="font-mono font-semibold tracking-wide text-ivory">Chronolog</span>
        </div>
        <p className="text-sm text-muted mb-6">Enter a name to start timing.</p>

        <label className="text-xs tracking-[0.2em] uppercase text-muted" htmlFor="operator">
          Operator Name
        </label>
        <input
          id="operator"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Asha"
          autoFocus
          className="mt-2 w-full rounded-xl bg-graphite-900 border border-graphite-600 px-4 py-2.5 text-sm text-ivory placeholder:text-muted focus:border-amber outline-none"
        />

        <button
          type="submit"
          disabled={!name.trim()}
          className="mt-6 w-full rounded-xl bg-amber text-graphite-950 font-semibold py-2.5 hover:bg-amber-soft disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Login;
