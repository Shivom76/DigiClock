import { useState, useRef, useEffect } from "react";
import { saveSession } from "../services/api";

// Formats milliseconds as HH:MM:SS.CS (centiseconds)
const formatTime = (ms) => {
  const centis = Math.floor((ms % 1000) / 10);
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  const pad = (n, len = 2) => String(n).padStart(len, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centis)}`;
};

// Stopwatch Algorithm (4.2): uses setInterval() to increment elapsed time
// while running, and clearInterval() to stop it. useRef holds the interval
// id and the running start timestamp so re-renders don't reset the timer.
const Stopwatch = ({ onSessionSaved }) => {
  const [elapsed, setElapsed] = useState(0); // ms
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  const intervalRef = useRef(null);
  const startTimeRef = useRef(0); // performance.now() at (re)start
  const baseElapsedRef = useRef(0); // elapsed accumulated before this run

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // cleanup on unmount
  }, []);

  const handleStart = () => {
    if (running) return;
    setRunning(true);
    startTimeRef.current = performance.now();
    intervalRef.current = setInterval(() => {
      const delta = performance.now() - startTimeRef.current;
      setElapsed(baseElapsedRef.current + delta);
    }, 10); // 10ms tick for smooth centisecond display
  };

  const handlePause = () => {
    if (!running) return;
    clearInterval(intervalRef.current);
    baseElapsedRef.current = elapsed;
    setRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setElapsed(0);
    baseElapsedRef.current = 0;
    setLaps([]);
    setNotes("");
    setFeedback("");
  };

  const handleLap = () => {
    if (!running) return;
    setLaps((prev) => {
      const previousLapTime = prev.length > 0 ? prev[prev.length - 1].lapTime : 0;
      const lap = {
        lapNumber: prev.length + 1,
        lapTime: elapsed,
        splitTime: elapsed - previousLapTime
      };
      return [...prev, lap];
    });
  };

  const handleSave = async () => {
    if (elapsed === 0) return;
    setSaving(true);
    setFeedback("");
    try {
      await saveSession({ duration: Math.round(elapsed), laps, notes });
      setFeedback("Session saved.");
      onSessionSaved?.();
    } catch (err) {
      setFeedback("Couldn't save — check the server connection.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl bg-graphite-800 shadow-bezel p-8">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs tracking-[0.3em] uppercase text-muted">Stopwatch</span>
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            running ? "bg-teal shadow-[0_0_10px_2px_rgba(63,184,175,0.6)]" : "bg-graphite-600"
          }`}
          aria-label={running ? "Running" : "Stopped"}
        />
      </div>

      <div className="font-mono tabular text-6xl md:text-7xl font-semibold text-ivory text-center tracking-tight">
        {formatTime(elapsed)}
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={handleStart}
          disabled={running}
          className="rounded-xl bg-teal/15 text-teal border border-teal/30 py-3 font-medium hover:bg-teal/25 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          disabled={!running}
          className="rounded-xl bg-amber/15 text-amber border border-amber/30 py-3 font-medium hover:bg-amber/25 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Pause
        </button>
        <button
          onClick={handleLap}
          disabled={!running}
          className="rounded-xl bg-graphite-700 text-ivory border border-graphite-600 py-3 font-medium hover:bg-graphite-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Lap
        </button>
        <button
          onClick={handleReset}
          disabled={elapsed === 0 && laps.length === 0}
          className="rounded-xl bg-crimson/15 text-crimson border border-crimson/30 py-3 font-medium hover:bg-crimson/25 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div className="mt-6 max-h-48 overflow-y-auto rounded-xl border border-graphite-700">
          <table className="w-full text-sm">
            <thead className="text-muted text-xs uppercase tracking-wider sticky top-0 bg-graphite-800">
              <tr>
                <th className="text-left font-medium px-4 py-2">Lap</th>
                <th className="text-right font-medium px-4 py-2">Split</th>
                <th className="text-right font-medium px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody className="font-mono tabular">
              {[...laps].reverse().map((lap) => (
                <tr key={lap.lapNumber} className="border-t border-graphite-700/60">
                  <td className="px-4 py-2 text-muted">{lap.lapNumber}</td>
                  <td className="px-4 py-2 text-right text-ivory">{formatTime(lap.splitTime)}</td>
                  <td className="px-4 py-2 text-right text-ivory">{formatTime(lap.lapTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add a note for this session (optional)"
          className="flex-1 rounded-xl bg-graphite-900 border border-graphite-600 px-4 py-2.5 text-sm text-ivory placeholder:text-muted focus:border-amber outline-none"
        />
        <button
          onClick={handleSave}
          disabled={elapsed === 0 || saving}
          className="rounded-xl bg-amber text-graphite-950 font-semibold px-6 py-2.5 hover:bg-amber-soft disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? "Saving…" : "Save Session"}
        </button>
      </div>

      {feedback && <p className="mt-3 text-sm text-muted">{feedback}</p>}
    </div>
  );
};

export default Stopwatch;
