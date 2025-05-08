import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-applypilot-dark border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-applypilot-teal">ApplyPilot</h3>
            <p className="text-gray-400">
              Helping you land your dream job with AI-powered tools.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-applypilot-green">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-applypilot-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-applypilot-green transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-applypilot-blue transition-colors">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-applypilot-blue">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-applypilot-blue transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-applypilot-blue transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} ApplyPilot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
