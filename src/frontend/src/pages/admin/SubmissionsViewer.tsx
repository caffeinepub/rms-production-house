import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Inbox, Mail, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Submission } from "../../backend";
import { useActor } from "../../hooks/useActor";

function formatDate(timestamp: bigint) {
  if (!timestamp || timestamp === 0n) return "—";
  const ms = Number(timestamp / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function SubmissionsViewer() {
  const { actor, isFetching } = useActor();
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    actor
      .getAllSubmissions()
      .then((data) => {
        const sorted = [...data].sort((a, b) =>
          Number(b.timestamp - a.timestamp),
        );
        setItems(sorted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [actor, isFetching]);

  return (
    <div data-ocid="submissions.page">
      <div className="mb-6">
        <h1 className="font-cinzel text-2xl font-bold text-white">
          Submissions
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          {items.length} contact form submission{items.length !== 1 ? "s" : ""}
        </p>
      </div>

      {loading ? (
        <div className="space-y-4" data-ocid="submissions.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 bg-zinc-900 rounded-lg" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div
          className="text-center py-20 border border-dashed border-zinc-800 rounded-lg"
          data-ocid="submissions.empty_state"
        >
          <Inbox className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-400">No submissions yet.</p>
          <p className="text-zinc-600 text-sm mt-1">
            Contact form submissions will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4" data-ocid="submissions.list">
          {items.map((sub, i) => (
            <motion.div
              key={`${sub.email}-${String(sub.timestamp)}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              data-ocid={`submissions.item.${i + 1}`}
            >
              <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-base">
                        {sub.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Mail className="w-3.5 h-3.5 text-zinc-500" />
                        <a
                          href={`mailto:${sub.email}`}
                          className="text-zinc-400 text-sm hover:text-yellow-500 transition-colors"
                        >
                          {sub.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="border-yellow-500/30 text-yellow-400 text-xs"
                      >
                        {sub.projectType}
                      </Badge>
                      {sub.budget && (
                        <Badge
                          variant="outline"
                          className="border-emerald-500/30 text-emerald-400 text-xs"
                        >
                          <DollarSign className="w-3 h-3 mr-1" />
                          {sub.budget}
                        </Badge>
                      )}
                      <span className="text-zinc-600 text-xs self-center">
                        {formatDate(sub.timestamp)}
                      </span>
                    </div>
                  </div>
                  <div className="bg-zinc-800/60 rounded-md p-3 border border-zinc-700/50">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                      <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {sub.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
