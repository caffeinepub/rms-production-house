import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Layers, Loader2, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Service } from "../../backend";
import { useActor } from "../../hooks/useActor";

export function ServicesManager() {
  const { actor, isFetching } = useActor();
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "visual",
    description: "",
    iconName: "",
    displayOrder: "1",
  });

  const loadItems = useCallback(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    actor
      .getAllServices()
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
      await actor.addService({
        id: 0n,
        title: form.title,
        category: form.category,
        description: form.description,
        iconName: form.iconName,
        displayOrder: BigInt(Number.parseInt(form.displayOrder) || 1),
      });
      toast.success("Service added!");
      setOpen(false);
      setForm({
        title: "",
        category: "visual",
        description: "",
        iconName: "",
        displayOrder: "1",
      });
      loadItems();
    } catch (err) {
      toast.error("Failed to add service");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const visual = items
    .filter((s) => s.category === "visual")
    .sort((a, b) => Number(a.displayOrder - b.displayOrder));
  const audio = items
    .filter((s) => s.category === "audio")
    .sort((a, b) => Number(a.displayOrder - b.displayOrder));

  function ServiceTable({
    data,
    category,
  }: { data: Service[]; category: string }) {
    return data.length === 0 ? (
      <div
        className="text-center py-10"
        data-ocid={`services.${category}.empty_state`}
      >
        <Layers className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
        <p className="text-zinc-500 text-sm">No {category} services yet.</p>
      </div>
    ) : (
      <div
        className="rounded-lg border border-zinc-800 overflow-hidden"
        data-ocid={`services.${category}.table`}
      >
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400">Title</TableHead>
              <TableHead className="text-zinc-400">Icon</TableHead>
              <TableHead className="text-zinc-400">Order</TableHead>
              <TableHead className="text-zinc-400">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, i) => (
              <motion.tr
                key={String(item.id)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="border-zinc-800 hover:bg-zinc-900/50"
                data-ocid={`services.item.${i + 1}`}
              >
                <TableCell className="text-white font-medium">
                  {item.title}
                </TableCell>
                <TableCell className="text-zinc-400 font-mono text-xs">
                  {item.iconName || "—"}
                </TableCell>
                <TableCell className="text-zinc-400">
                  {String(item.displayOrder)}
                </TableCell>
                <TableCell className="text-zinc-400 text-sm max-w-xs truncate">
                  {item.description}
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div data-ocid="services.page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-cinzel text-2xl font-bold text-white">
            Services
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            {visual.length} visual · {audio.length} audio
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
              data-ocid="services.open_modal_button"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent
            className="bg-zinc-900 border-zinc-800 text-white max-w-lg"
            data-ocid="services.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-cinzel text-yellow-500">
                Add Service
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-zinc-300">Title</Label>
                <Input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Service title"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  data-ocid="services.input"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-zinc-300">Category</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, category: v }))
                    }
                  >
                    <SelectTrigger
                      className="bg-zinc-800 border-zinc-700 text-white"
                      data-ocid="services.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="visual" className="text-white">
                        Visual Production
                      </SelectItem>
                      <SelectItem value="audio" className="text-white">
                        Audio & Music
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-zinc-300">Display Order</Label>
                  <Input
                    type="number"
                    min="1"
                    value={form.displayOrder}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, displayOrder: e.target.value }))
                    }
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300">
                  Icon Name{" "}
                  <span className="text-zinc-500">(lucide icon name)</span>
                </Label>
                <Input
                  value={form.iconName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, iconName: e.target.value }))
                  }
                  placeholder="Film, Music, Camera..."
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300">Description</Label>
                <Textarea
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Service description..."
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 resize-none"
                  rows={3}
                  data-ocid="services.textarea"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="flex-1 border-zinc-700 text-zinc-300"
                  data-ocid="services.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                  data-ocid="services.submit_button"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Add Service"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="space-y-3" data-ocid="services.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 bg-zinc-900 rounded" />
          ))}
        </div>
      ) : (
        <Tabs defaultValue="visual">
          <TabsList className="bg-zinc-900 border border-zinc-800 mb-4">
            <TabsTrigger
              value="visual"
              className="data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-500"
              data-ocid="services.visual.tab"
            >
              Visual Production
              <Badge
                variant="outline"
                className="ml-2 border-zinc-700 text-zinc-400 text-xs"
              >
                {visual.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="audio"
              className="data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-500"
              data-ocid="services.audio.tab"
            >
              Audio & Music
              <Badge
                variant="outline"
                className="ml-2 border-zinc-700 text-zinc-400 text-xs"
              >
                {audio.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="visual">
            <ServiceTable data={visual} category="visual" />
          </TabsContent>
          <TabsContent value="audio">
            <ServiceTable data={audio} category="audio" />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
