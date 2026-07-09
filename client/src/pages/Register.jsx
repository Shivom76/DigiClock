import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api.js";

// POST /api/auth/register — the server hashes the password with bcrypt
// (salt + hash) before it's ever written to MongoDB; the plaintext value
// only exists for the duration of this request.
const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await registerUser(form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't create your account.");
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
        <p className="text-sm text-muted mb-6">Create an account to start timing.</p>

        <label className="text-xs tracking-[0.2em] uppercase text-muted" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          autoFocus
          required
          className="mt-2 mb-4 w-full rounded-xl bg-graphite-900 border border-graphite-600 px-4 py-2.5 text-sm text-ivory placeholder:text-muted focus:border-amber outline-none"
        />

        <label className="text-xs tracking-[0.2em] uppercase text-muted" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
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
          minLength={8}
          className="mt-2 w-full rounded-xl bg-graphite-900 border border-graphite-600 px-4 py-2.5 text-sm text-ivory placeholder:text-muted focus:border-amber outline-none"
        />
        <p className="mt-1.5 text-xs text-muted">At least 8 characters.</p>

        {error && <p className="mt-3 text-sm text-crimson">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-amber text-graphite-950 font-semibold py-2.5 hover:bg-amber-soft disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Creating account…" : "Create Account"}
        </button>

        <p className="mt-5 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-amber hover:text-amber-soft">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
