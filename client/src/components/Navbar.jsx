import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="border-b border-graphite-800">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber" />
          <span className="font-mono font-semibold tracking-wide text-ivory">DigiClock</span>
        </Link>

        {userName && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted">
              Signed in as <span className="text-ivory">{userName}</span>
            </span>
            <button
              onClick={handleLogout}
              className="text-xs text-muted hover:text-ivory border border-graphite-700 rounded-lg px-3 py-1.5 transition-colors"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
