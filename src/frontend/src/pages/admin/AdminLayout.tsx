import { Button } from "@/components/ui/button";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  Images,
  Inbox,
  Layers,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  MessageSquare,
  Shield,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useActor } from "../../hooks/useActor";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import { Dashboard } from "./Dashboard";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/portfolio", label: "Portfolio", icon: Images },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { to: "/admin/team", label: "Team", icon: Users },
  { to: "/admin/services", label: "Services", icon: Layers },
  { to: "/admin/submissions", label: "Submissions", icon: Inbox },
];

export function AdminLayout() {
  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const { actor, isFetching } = useActor();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!actor || isFetching || !identity) {
      setIsAdmin(null);
      return;
    }
    actor
      .isCallerAdmin()
      .then(setIsAdmin)
      .catch(() => setIsAdmin(false));
  }, [actor, isFetching, identity]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (!identity) {
    return (
      <div
        className="min-h-screen bg-zinc-950 flex items-center justify-center"
        data-ocid="admin.page"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-yellow-500" />
          </div>
          <h1 className="font-cinzel text-3xl font-bold text-white mb-2">
            Admin Access
          </h1>
          <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
            Sign in with Internet Identity to access the RMS Production House
            admin panel.
          </p>
          <Button
            onClick={() => login()}
            disabled={loginStatus === "logging-in"}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold uppercase tracking-widest text-sm px-8 py-3 w-full"
            data-ocid="admin.primary_button"
          >
            {loginStatus === "logging-in" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Connecting...
              </>
            ) : (
              "Login with Internet Identity"
            )}
          </Button>
          <p className="text-zinc-600 text-xs mt-4">
            <Link to="/" className="hover:text-yellow-500 transition-colors">
              ← Back to website
            </Link>
          </p>
        </motion.div>
      </div>
    );
  }

  if (isFetching || isAdmin === null) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-yellow-500 mx-auto mb-3" />
          <p className="text-zinc-400 text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        className="min-h-screen bg-zinc-950 flex items-center justify-center"
        data-ocid="admin.page"
      >
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="font-cinzel text-2xl font-bold text-white mb-2">
            Access Denied
          </h1>
          <p className="text-zinc-400 mb-6 text-sm">
            Your account does not have admin privileges.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => clear()}
              className="border-zinc-700 text-zinc-300 hover:border-yellow-500 hover:text-yellow-500"
            >
              Sign Out
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:border-yellow-500 hover:text-yellow-500"
            >
              <Link to="/">Back to Site</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const principal = identity.getPrincipal().toString();
  const shortPrincipal = `${principal.slice(0, 8)}...${principal.slice(-4)}`;

  return (
    <div className="min-h-screen bg-zinc-950 flex" data-ocid="admin.page">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-zinc-800">
          <Link
            to="/admin"
            className="flex items-center gap-2"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="font-cinzel text-yellow-500 font-bold tracking-wider text-base">
              RMS
            </span>
            <span className="text-zinc-400 text-xs uppercase tracking-widest">
              Admin
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1" data-ocid="admin.panel">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive =
              location.pathname === to ||
              (to !== "/admin" && location.pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
                data-ocid={`admin.${label.toLowerCase()}.link`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
              <Shield className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-zinc-300 font-medium truncate">
                Admin
              </p>
              <p className="text-xs text-zinc-500 truncate font-mono">
                {shortPrincipal}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => clear()}
            className="w-full justify-start text-zinc-400 hover:text-red-400 hover:bg-red-500/10 text-xs"
            data-ocid="admin.logout_button"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10 backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-zinc-400 hover:text-white p-1"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-zinc-300 text-sm font-medium">
              {navItems.find(
                (n) =>
                  n.to === location.pathname ||
                  (n.to !== "/admin" && location.pathname.startsWith(n.to)),
              )?.label ?? "Dashboard"}
            </span>
          </div>
          <Link
            to="/"
            className="text-zinc-500 hover:text-yellow-500 text-xs transition-colors"
          >
            ← View Site
          </Link>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {location.pathname === "/admin" || location.pathname === "/admin/" ? (
            <Dashboard />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}
