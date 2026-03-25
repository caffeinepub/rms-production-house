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
import { Textarea } from "@/components/ui/textarea";
import { Images, Loader2, Plus, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, type PortfolioItem } from "../../backend";
import { useActor } from "../../hooks/useActor";

const CATEGORIES = [
  { value: "ads", label: "Ads" },
  { value: "music-videos", label: "Music Videos" },
  { value: "brand-shoots", label: "Brand Shoots" },
  { value: "audio", label: "Audio" },
];

export function PortfolioManager() {
  const { actor, isFetching } = useActor();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    category: "ads",
    description: "",
    servicesUsed: "",
  });

  const loadItems = useCallback(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    actor
      .getAllPortfolioItems()
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
      let imageBlob = ExternalBlob.fromURL("");
      const file = fileRef.current?.files?.[0];
      if (file) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        imageBlob = ExternalBlob.fromBytes(bytes).withUploadProgress((p) =>
          setUploadProgress(p),
        );
      }
      await actor.addPortfolioItem({
        id: 0n,
        createdAt: 0n,
        title: form.title,
        category: form.category,
        description: form.description,
        servicesUsed: form.servicesUsed
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        imageUrl: imageBlob,
      });
      toast.success("Portfolio item added!");
      setOpen(false);
      setForm({
        title: "",
        category: "ads",
        description: "",
        servicesUsed: "",
      });
      setUploadProgress(0);
      setSelectedFileName("");
      loadItems();
    } catch (err) {
      toast.error("Failed to add item");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-ocid="portfolio.page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-cinzel text-2xl font-bold text-white">
            Portfolio
          </h1>
          <p className="text-zinc-400 text-sm mt-1">{items.length} items</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
              data-ocid="portfolio.open_modal_button"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent
            className="bg-zinc-900 border-zinc-800 text-white max-w-lg"
            data-ocid="portfolio.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-cinzel text-yellow-500">
                Add Portfolio Item
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
                  placeholder="Project title"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  data-ocid="portfolio.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
                >
                  <SelectTrigger
                    className="bg-zinc-800 border-zinc-700 text-white"
                    data-ocid="portfolio.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {CATEGORIES.map((c) => (
                      <SelectItem
                        key={c.value}
                        value={c.value}
                        className="text-white hover:bg-zinc-700"
                      >
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300">Description</Label>
                <Textarea
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Project description..."
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 resize-none"
                  rows={3}
                  data-ocid="portfolio.textarea"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300">
                  Services Used{" "}
                  <span className="text-zinc-500">(comma-separated)</span>
                </Label>
                <Input
                  value={form.servicesUsed}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, servicesUsed: e.target.value }))
                  }
                  placeholder="Video Production, Color Grading"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300">Image</Label>
                <label
                  htmlFor="portfolio-file"
                  className="border-2 border-dashed border-zinc-700 rounded-md p-4 text-center cursor-pointer hover:border-yellow-500/50 transition-colors block"
                  data-ocid="portfolio.dropzone"
                >
                  <Upload className="w-5 h-5 text-zinc-500 mx-auto mb-1" />
                  <p className="text-zinc-500 text-xs">
                    {selectedFileName || "Click to upload image"}
                  </p>
                </label>
                <input
                  id="portfolio-file"
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setSelectedFileName(e.target.files?.[0]?.name ?? "")
                  }
                  data-ocid="portfolio.upload_button"
                />
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full bg-zinc-800 rounded-full h-1.5">
                    <div
                      className="bg-yellow-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="flex-1 border-zinc-700 text-zinc-300"
                  data-ocid="portfolio.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                  data-ocid="portfolio.submit_button"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Add Item"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="space-y-3" data-ocid="portfolio.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 bg-zinc-900 rounded" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div
          className="text-center py-16 border border-dashed border-zinc-800 rounded-lg"
          data-ocid="portfolio.empty_state"
        >
          <Images className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-400">No portfolio items yet.</p>
          <p className="text-zinc-600 text-sm">
            Click “Add Item” to create your first entry.
          </p>
        </div>
      ) : (
        <div
          className="rounded-lg border border-zinc-800 overflow-hidden"
          data-ocid="portfolio.table"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">Title</TableHead>
                <TableHead className="text-zinc-400">Category</TableHead>
                <TableHead className="text-zinc-400">Services</TableHead>
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
                  data-ocid={`portfolio.item.${i + 1}`}
                >
                  <TableCell className="text-white font-medium">
                    {item.title}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="border-zinc-700 text-zinc-300 text-xs capitalize"
                    >
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-zinc-400 text-sm">
                    {item.servicesUsed.join(", ") || "—"}
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
