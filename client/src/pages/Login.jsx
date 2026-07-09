import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api.js";

// Real authentication: submits credentials to POST /api/auth/login, which
// checks the password with bcrypt.compare() against the stored hash and
// returns a signed JWT. The token is stored locally and attached to every
// subsequent request by the interceptor in services/api.js.
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await loginUser(form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't log in — check your details.");
    } finally {
      setLoading(false);
    }
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
        <p className="text-sm text-muted mb-6">Log in to see your saved sessions.</p>

        <label className="text-xs tracking-[0.2em] uppercase text-muted" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          autoFocus
          required
          className="mt-2 mb-4 w-full rounded-xl bg-graphite-900 border border-graphite-600 px-4 py-2.5 text-sm text-ivory placeholder:text-muted focus:border-amber outline-none"
        />

        <label className="text-xs tracking-[0.2em] uppercase text-muted" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          className="mt-2 w-full rounded-xl bg-graphite-900 border border-graphite-600 px-4 py-2.5 text-sm text-ivory placeholder:text-muted focus:border-amber outline-none"
        />

        {error && <p className="mt-3 text-sm text-crimson">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-amber text-graphite-950 font-semibold py-2.5 hover:bg-amber-soft disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Logging in…" : "Log In"}
        </button>

        <p className="mt-5 text-center text-sm text-muted">
          No account?{" "}
          <Link to="/register" className="text-amber hover:text-amber-soft">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
