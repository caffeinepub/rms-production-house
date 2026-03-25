import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Images,
  Inbox,
  Layers,
  MessageSquare,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Submission } from "../../backend";
import { useActor } from "../../hooks/useActor";

interface Counts {
  portfolio: number;
  testimonials: number;
  team: number;
  services: number;
  submissions: number;
}

export function Dashboard() {
  const { actor, isFetching } = useActor();
  const [counts, setCounts] = useState<Counts | null>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    Promise.all([
      actor.getAllPortfolioItems(),
      actor.getAllTestimonials(),
      actor.getAllTeamMembers(),
      actor.getAllServices(),
      actor.getAllSubmissions(),
    ])
      .then(([portfolio, testimonials, team, services, submissions]) => {
        setCounts({
          portfolio: portfolio.length,
          testimonials: testimonials.length,
          team: team.length,
          services: services.length,
          submissions: submissions.length,
        });
        const sorted = [...submissions].sort((a, b) =>
          Number(b.timestamp - a.timestamp),
        );
        setRecentSubmissions(sorted.slice(0, 5));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [actor, isFetching]);

  const statCards = [
    {
      label: "Portfolio Items",
      icon: Images,
      value: counts?.portfolio,
      to: "/admin/portfolio",
      color: "text-yellow-500",
    },
    {
      label: "Testimonials",
      icon: MessageSquare,
      value: counts?.testimonials,
      to: "/admin/testimonials",
      color: "text-purple-400",
    },
    {
      label: "Team Members",
      icon: Users,
      value: counts?.team,
      to: "/admin/team",
      color: "text-blue-400",
    },
    {
      label: "Services",
      icon: Layers,
      value: counts?.services,
      to: "/admin/services",
      color: "text-emerald-400",
    },
    {
      label: "Submissions",
      icon: Inbox,
      value: counts?.submissions,
      to: "/admin/submissions",
      color: "text-orange-400",
    },
  ];

  return (
    <div data-ocid="admin.dashboard.page">
      <div className="mb-6">
        <h1 className="font-cinzel text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Welcome back. Here’s what’s happening with RMS.
        </p>
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8"
        data-ocid="admin.stats.panel"
      >
        {statCards.map(({ label, icon: Icon, value, to, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Link to={to}>
              <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all hover:shadow-lg group cursor-pointer">
                <CardContent className="p-4">
                  <Icon className={`w-5 h-5 ${color} mb-3`} />
                  {loading ? (
                    <Skeleton className="h-8 w-12 bg-zinc-800 mb-1" />
                  ) : (
                    <p className="text-3xl font-bold text-white tabular-nums">
                      {value ?? 0}
                    </p>
                  )}
                  <p className="text-zinc-400 text-xs mt-1">{label}</p>
                  <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-yellow-500 mt-2 transition-colors" />
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <Card
        className="bg-zinc-900 border-zinc-800"
        data-ocid="admin.submissions.panel"
      >
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-white text-base font-semibold">
            Recent Submissions
          </CardTitle>
          <Link
            to="/admin/submissions"
            className="text-yellow-500 text-xs hover:underline flex items-center gap-1"
          >
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 bg-zinc-800 rounded" />
              ))}
            </div>
          ) : recentSubmissions.length === 0 ? (
            <div
              className="text-center py-8"
              data-ocid="admin.submissions.empty_state"
            >
              <Inbox className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-zinc-500 text-sm">No submissions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSubmissions.map((sub, i) => (
                <div
                  key={`${sub.email}-${String(sub.timestamp)}`}
                  className="flex items-start justify-between p-3 rounded-md bg-zinc-800/50 border border-zinc-700/50"
                  data-ocid={`admin.submission.item.${i + 1}`}
                >
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {sub.name}
                    </p>
                    <p className="text-zinc-400 text-xs truncate">
                      {sub.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <Badge
                      variant="outline"
                      className="border-zinc-700 text-zinc-300 text-xs"
                    >
                      {sub.projectType}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
