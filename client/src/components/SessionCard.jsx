const formatTime = (ms) => {
  const centis = Math.floor((ms % 1000) / 10);
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centis)}`;
};

// Displays one saved Session document (duration, laps, notes, date/time).
const SessionCard = ({ session, onDelete }) => {
  const recorded = new Date(session.recordedAt || session.createdAt);

  return (
    <div className="rounded-xl bg-graphite-800 border border-graphite-700 px-5 py-4 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono tabular text-2xl text-ivory">{formatTime(session.duration)}</p>
          <p className="text-xs text-muted mt-1">
            {recorded.toLocaleDateString()} · {recorded.toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={() => onDelete(session._id)}
          className="text-xs text-crimson/80 hover:text-crimson border border-crimson/30 rounded-lg px-3 py-1.5 transition-colors"
        >
          Delete
        </button>
      </div>

      {session.notes && <p className="text-sm text-ivory/80">{session.notes}</p>}

      {session.laps?.length > 0 && (
        <p className="text-xs text-muted">
          {session.laps.length} lap{session.laps.length > 1 ? "s" : ""} recorded
        </p>
      )}
    </div>
  );
};

export default SessionCard;
