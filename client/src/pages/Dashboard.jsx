import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar.jsx";
import Clock from "../components/Clock.jsx";
import Stopwatch from "../components/Stopwatch.jsx";
import SessionCard from "../components/SessionCard.jsx";
import { fetchSessions, deleteSession } from "../services/api.js";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const operator = localStorage.getItem("operatorName") || "Guest";

  const loadSessions = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await fetchSessions();
      setSessions(data);
    } catch (err) {
      setError("Couldn't reach the server. Is the backend running on port 5000?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const handleDelete = async (id) => {
    try {
      await deleteSession(id);
      setSessions((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError("Couldn't delete that session.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar operator={operator} />

      <main className="max-w-5xl mx-auto px-6 py-10 grid gap-8">
        <div className="grid md:grid-cols-2 gap-6">
          <Clock />
          <Stopwatch onSessionSaved={loadSessions} />
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs tracking-[0.3em] uppercase text-muted">Session Log</h2>
            {sessions.length > 0 && (
              <span className="text-xs text-muted">{sessions.length} recorded</span>
            )}
          </div>

          {loading && <p className="text-sm text-muted">Loading sessions…</p>}
          {error && <p className="text-sm text-crimson">{error}</p>}

          {!loading && !error && sessions.length === 0 && (
            <div className="rounded-xl border border-dashed border-graphite-700 py-10 text-center text-sm text-muted">
              No sessions yet. Run the stopwatch and save one to see it here.
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-3">
            {sessions.map((session) => (
              <SessionCard key={session._id} session={session} onDelete={handleDelete} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
