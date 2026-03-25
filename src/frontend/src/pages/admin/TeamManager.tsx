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
import { Loader2, Plus, Upload, Users } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, type TeamMember } from "../../backend";
import { useActor } from "../../hooks/useActor";

export function TeamManager() {
  const { actor, isFetching } = useActor();
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
    displayOrder: "1",
  });

  const loadItems = useCallback(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    actor
      .getAllTeamMembers()
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
      await actor.addTeamMember({
        id: 0n,
        name: form.name,
        role: form.role,
        bio: form.bio,
        displayOrder: BigInt(Number.parseInt(form.displayOrder) || 1),
        imageUrl: imageBlob,
      });
      toast.success("Team member added!");
      setOpen(false);
      setForm({ name: "", role: "", bio: "", displayOrder: "1" });
      setUploadProgress(0);
      setSelectedFileName("");
      loadItems();
    } catch (err) {
      toast.error("Failed to add team member");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-ocid="team.page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-cinzel text-2xl font-bold text-white">Team</h1>
          <p className="text-zinc-400 text-sm mt-1">{items.length} members</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
              data-ocid="team.open_modal_button"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent
            className="bg-zinc-900 border-zinc-800 text-white max-w-lg"
            data-ocid="team.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-cinzel text-yellow-500">
                Add Team Member
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-zinc-300">Name</Label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Full name"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    data-ocid="team.input"
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
                    placeholder="Director of Photography"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300">Bio</Label>
                <Textarea
                  required
                  value={form.bio}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, bio: e.target.value }))
                  }
                  placeholder="Short biography..."
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 resize-none"
                  rows={3}
                  data-ocid="team.textarea"
                />
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
              <div className="space-y-1.5">
                <Label className="text-zinc-300">Photo</Label>
                <label
                  htmlFor="team-file"
                  className="border-2 border-dashed border-zinc-700 rounded-md p-4 text-center cursor-pointer hover:border-yellow-500/50 transition-colors block"
                  data-ocid="team.dropzone"
                >
                  <Upload className="w-5 h-5 text-zinc-500 mx-auto mb-1" />
                  <p className="text-zinc-500 text-xs">
                    {selectedFileName || "Click to upload photo"}
                  </p>
                </label>
                <input
                  id="team-file"
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setSelectedFileName(e.target.files?.[0]?.name ?? "")
                  }
                  data-ocid="team.upload_button"
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
                  data-ocid="team.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                  data-ocid="team.submit_button"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Add Member"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="space-y-3" data-ocid="team.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 bg-zinc-900 rounded" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div
          className="text-center py-16 border border-dashed border-zinc-800 rounded-lg"
          data-ocid="team.empty_state"
        >
          <Users className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-400">No team members yet.</p>
        </div>
      ) : (
        <div
          className="rounded-lg border border-zinc-800 overflow-hidden"
          data-ocid="team.table"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">Name</TableHead>
                <TableHead className="text-zinc-400">Role</TableHead>
                <TableHead className="text-zinc-400">Order</TableHead>
                <TableHead className="text-zinc-400">Bio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...items]
                .sort((a, b) => Number(a.displayOrder - b.displayOrder))
                .map((item, i) => (
                  <motion.tr
                    key={String(item.id)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-zinc-800 hover:bg-zinc-900/50"
                    data-ocid={`team.item.${i + 1}`}
                  >
                    <TableCell className="text-white font-medium">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-zinc-300">{item.role}</TableCell>
                    <TableCell className="text-zinc-400">
                      {String(item.displayOrder)}
                    </TableCell>
                    <TableCell className="text-zinc-400 text-sm max-w-xs truncate">
                      {item.bio}
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
