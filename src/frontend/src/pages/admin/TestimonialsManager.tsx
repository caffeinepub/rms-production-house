import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MessageSquare, Plus, Star } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Testimonial } from "../../backend";
import { useActor } from "../../hooks/useActor";

function StarRating({
  value,
  onChange,
}: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`transition-colors ${n <= value ? "text-yellow-500" : "text-zinc-600"}`}
        >
          <Star className="w-5 h-5 fill-current" />
        </button>
      ))}
    </div>
  );
}

export function TestimonialsManager() {
  const { actor, isFetching } = useActor();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    author: "",
    role: "",
    company: "",
    text: "",
    rating: 5,
  });

  const loadItems = useCallback(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    actor
      .getAllTestimonials()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [actor, isFetching]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSaving(true);
    try {
      await actor.addTestimonial({
        id: 0n,
        createdAt: 0n,
        author: form.author,
        role: form.role,
        company: form.company,
        text: form.text,
        rating: BigInt(form.rating),
      });
      toast.success("Testimonial added!");
      setOpen(false);
      setForm({ author: "", role: "", company: "", text: "", rating: 5 });
      loadItems();
    } catch (err) {
      toast.error("Failed to add testimonial");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-ocid="testimonials.page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-cinzel text-2xl font-bold text-white">
            Testimonials
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            {items.length} testimonials
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
              data-ocid="testimonials.open_modal_button"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent
            className="bg-zinc-900 border-zinc-800 text-white max-w-lg"
            data-ocid="testimonials.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-cinzel text-yellow-500">
                Add Testimonial
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-zinc-300">Author</Label>
                  <Input
                    required
                    value={form.author}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, author: e.target.value }))
                    }
                    placeholder="John Doe"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    data-ocid="testimonials.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-zinc-300">Role</Label>
                  <Input
                    required
                    value={form.role}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, role: e.target.value }))
                    }
                    placeholder="Marketing Director"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300">Company</Label>
                <Input
                  required
                  value={form.company}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, company: e.target.value }))
                  }
                  placeholder="Company Name"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300">Testimonial</Label>
                <Textarea
                  required
                  value={form.text}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, text: e.target.value }))
                  }
                  placeholder="What they said..."
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 resize-none"
                  rows={4}
                  data-ocid="testimonials.textarea"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300">Rating</Label>
                <StarRating
                  value={form.rating}
                  onChange={(v) => setForm((p) => ({ ...p, rating: v }))}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="flex-1 border-zinc-700 text-zinc-300"
                  data-ocid="testimonials.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                  data-ocid="testimonials.submit_button"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Add Testimonial"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="space-y-3" data-ocid="testimonials.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 bg-zinc-900 rounded" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div
          className="text-center py-16 border border-dashed border-zinc-800 rounded-lg"
          data-ocid="testimonials.empty_state"
        >
          <MessageSquare className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-400">No testimonials yet.</p>
        </div>
      ) : (
        <div
          className="rounded-lg border border-zinc-800 overflow-hidden"
          data-ocid="testimonials.table"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">Author</TableHead>
                <TableHead className="text-zinc-400">Company</TableHead>
                <TableHead className="text-zinc-400">Rating</TableHead>
                <TableHead className="text-zinc-400">Testimonial</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, i) => (
                <motion.tr
                  key={String(item.id)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-zinc-800 hover:bg-zinc-900/50"
                  data-ocid={`testimonials.item.${i + 1}`}
                >
                  <TableCell>
                    <p className="text-white font-medium">{item.author}</p>
                    <p className="text-zinc-400 text-xs">{item.role}</p>
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {item.company}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-0.5">
                      {Array.from({ length: Number(item.rating) }).map(
                        (_, j) => (
                          <Star
                            key={`star-${String(item.id)}-${j}`}
                            className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500"
                          />
                        ),
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-400 text-sm max-w-xs truncate">
                    {item.text}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
