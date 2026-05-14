"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  BookOpen,
  FileText,
  Home,
  ImageUp,
  Loader2,
  Mail,
  Medal,
  Newspaper,
  Plus,
  Save,
  Settings,
  Trash2,
  Trophy,
  Upload,
  Video,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type FieldConfig = {
  key: string;
  label: string;
  multiline?: boolean;
};

type Asset = {
  name: string;
  src: string;
  alt: string;
  source?: "local" | "supabase";
  path?: string;
};

type AssetGroup = {
  label: string;
  accept: string;
};

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "gallery", label: "Gallery", icon: ImageUp },
  { id: "podium", label: "Podium", icon: Medal },
  { id: "media", label: "Media", icon: Newspaper },
  { id: "sponsors", label: "Sponsors", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "advanced", label: "Advanced", icon: Settings },
];

const collectionFields: Record<string, FieldConfig[]> = {
  stats: [
    { key: "value", label: "Value" },
    { key: "label", label: "Label" },
  ],
  podiumHighlights: [
    { key: "title", label: "Title" },
    { key: "detail", label: "Detail", multiline: true },
  ],
  mediaHighlights: [
    { key: "title", label: "Title" },
    { key: "outlet", label: "Outlet" },
    { key: "date", label: "Date" },
    { key: "summary", label: "Summary", multiline: true },
  ],
  mediaArticles: [
    { key: "title", label: "Title" },
    { key: "outlet", label: "Outlet" },
    { key: "date", label: "Date" },
    { key: "summary", label: "Summary", multiline: true },
  ],
  achievementsTimeline: [
    { key: "year", label: "Year" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description", multiline: true },
  ],
  achievementCards: [
    { key: "title", label: "Title" },
    { key: "detail", label: "Detail", multiline: true },
  ],
  olResults: [
    { key: "subject", label: "Subject" },
    { key: "grade", label: "Grade" },
  ],
  galleryImages: [
    { key: "src", label: "Image URL" },
    { key: "alt", label: "Alt Text" },
  ],
  latestUpdateCards: [
    { key: "image", label: "Image file name" },
    { key: "title", label: "Title" },
    { key: "badge", label: "Badge" },
    { key: "icon", label: "Icon: trophy or dumbbell" },
    { key: "description", label: "Description", multiline: true },
  ],
  contactCards: [
    { key: "label", label: "Label" },
    { key: "name", label: "Name" },
    { key: "detail", label: "Detail" },
    { key: "href", label: "Link / mailto" },
  ],
};

const collectionLabels: Record<string, string> = {
  stats: "Ranking Stats",
  podiumHighlights: "Home Podium Highlights",
  mediaHighlights: "Home Media Cards",
  mediaArticles: "Media Articles",
  achievementsTimeline: "Timeline",
  achievementCards: "Award Cards",
  olResults: "O/L Results",
  galleryImages: "Home Gallery Cards",
  latestUpdateCards: "Latest Update Cards",
  contactCards: "Contact Cards",
};

const sectionCopyGroups: Record<string, string[]> = {
  home: ["homeStats", "homePodium", "homeVideos", "homeMedia"],
  achievements: ["achievements"],
  gallery: ["gallery", "localGallery", "internationalGallery", "schoolGallery"],
  sponsors: ["sponsors"],
  contact: ["contact"],
};

const uploadsBySection: Record<string, string[]> = {
  home: ["profile", "homeGallery", "videos"],
  gallery: ["homeGallery", "localGallery", "internationalGallery", "schoolGallery"],
  podium: ["localPodium", "internationalPodium"],
  media: ["media"],
};

const advancedSections = [
  "hero",
  "latestUpdate",
  "sectionCopy",
  "stats",
  "podiumHighlights",
  "mediaHighlights",
  "mediaArticles",
  "achievementsTimeline",
  "achievementCards",
  "achievementSections",
  "sponsorBenefits",
  "sponsorPackages",
  "olResults",
  "academicProfile",
  "galleryImages",
  "contactCards",
];

const emptyByCollection: Record<string, Record<string, string>> =
  Object.fromEntries(
    Object.entries(collectionFields).map(([key, fields]) => [
      key,
      Object.fromEntries(fields.map((field) => [field.key, ""])),
    ]),
  );

function humanize(value: string) {
  return value.replaceAll(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function fileKind(asset: Asset) {
  const name = asset.name.toLowerCase();
  if (name.endsWith(".mp4") || name.endsWith(".mov") || name.endsWith(".webm")) {
    return "video";
  }
  if (name.endsWith(".pdf")) {
    return "document";
  }
  return "image";
}

export default function AdminDashboard() {
  const [content, setContent] = useState<any>(null);
  const [assetGroups, setAssetGroups] = useState<Record<string, AssetGroup>>({});
  const [assets, setAssets] = useState<Record<string, Asset[]>>({});
  const [activeSection, setActiveSection] = useState("home");
  const [jsonDrafts, setJsonDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    const response = await fetch("/api/admin/content", { cache: "no-store" });
    const data = await response.json();
    setContent(data.content);
    setAssetGroups(data.assetGroups);
    setAssets(data.assets);
    setJsonDrafts(
      Object.fromEntries(
        advancedSections.map((section) => [
          section,
          JSON.stringify(data.content[section], null, 2),
        ]),
      ),
    );
    setLoading(false);
  }

  const activeUploadGroups = useMemo(
    () => uploadsBySection[activeSection] ?? [],
    [activeSection],
  );

  function updateHero(key: string, value: string) {
    setContent((current: any) => ({
      ...current,
      hero: { ...current.hero, [key]: value },
    }));
  }

  function updateLatestUpdate(key: string, value: string) {
    setContent((current: any) => ({
      ...current,
      latestUpdate: { ...current.latestUpdate, [key]: value },
    }));
  }

  function updateSectionCopy(section: string, key: string, value: string) {
    setContent((current: any) => ({
      ...current,
      sectionCopy: {
        ...current.sectionCopy,
        [section]: { ...current.sectionCopy[section], [key]: value },
      },
    }));
  }

  function updateCollectionItem(
    collection: string,
    index: number,
    key: string,
    value: string,
  ) {
    setContent((current: any) => {
      if (collection === "latestUpdateCards") {
        const items = [...current.latestUpdate.cards];
        items[index] = { ...items[index], [key]: value };
        return {
          ...current,
          latestUpdate: { ...current.latestUpdate, cards: items },
        };
      }

      const items = [...current[collection]];
      items[index] = { ...items[index], [key]: value };
      return { ...current, [collection]: items };
    });
  }

  function addCollectionItem(collection: string) {
    if (collection === "latestUpdateCards") {
      setContent((current: any) => ({
        ...current,
        latestUpdate: {
          ...current.latestUpdate,
          cards: [
            ...current.latestUpdate.cards,
            emptyByCollection.latestUpdateCards,
          ],
        },
      }));
      return;
    }

    setContent((current: any) => ({
      ...current,
      [collection]: [...current[collection], emptyByCollection[collection]],
    }));
  }

  function removeCollectionItem(collection: string, index: number) {
    if (collection === "latestUpdateCards") {
      setContent((current: any) => ({
        ...current,
        latestUpdate: {
          ...current.latestUpdate,
          cards: current.latestUpdate.cards.filter(
            (_item: any, itemIndex: number) => itemIndex !== index,
          ),
        },
      }));
      return;
    }

    setContent((current: any) => ({
      ...current,
      [collection]: current[collection].filter(
        (_item: any, itemIndex: number) => itemIndex !== index,
      ),
    }));
  }

  function updateStringList(collection: string, value: string) {
    setContent((current: any) => ({
      ...current,
      [collection]: value.split("\n").filter(Boolean),
    }));
  }

  function updateAchievementSection(index: number, key: string, value: string) {
    setContent((current: any) => {
      const sections = [...current.achievementSections];
      sections[index] = {
        ...sections[index],
        [key]: key === "items" ? value.split("\n").filter(Boolean) : value,
      };
      return { ...current, achievementSections: sections };
    });
  }

  function addAchievementSection() {
    setContent((current: any) => ({
      ...current,
      achievementSections: [
        ...current.achievementSections,
        { title: "", items: [""] },
      ],
    }));
  }

  function removeAchievementSection(index: number) {
    setContent((current: any) => ({
      ...current,
      achievementSections: current.achievementSections.filter(
        (_item: any, itemIndex: number) => itemIndex !== index,
      ),
    }));
  }

  function updateSponsorPackage(index: number, key: string, value: string) {
    setContent((current: any) => {
      const packages = [...current.sponsorPackages];
      packages[index] = {
        ...packages[index],
        [key]: key === "perks" ? value.split("\n").filter(Boolean) : value,
      };
      return { ...current, sponsorPackages: packages };
    });
  }

  function addSponsorPackage() {
    setContent((current: any) => ({
      ...current,
      sponsorPackages: [
        ...current.sponsorPackages,
        { name: "", price: "", perks: [""] },
      ],
    }));
  }

  function removeSponsorPackage(index: number) {
    setContent((current: any) => ({
      ...current,
      sponsorPackages: current.sponsorPackages.filter(
        (_item: any, itemIndex: number) => itemIndex !== index,
      ),
    }));
  }

  function updateAcademic(path: string, value: string) {
    setContent((current: any) => {
      const next = structuredClone(current.academicProfile);
      const [group, key] = path.split(".");
      next[group][key] = key === "subjects" ? value.split("\n").filter(Boolean) : value;
      return { ...current, academicProfile: next };
    });
  }

  async function saveContent(nextContent = content) {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextContent),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      setContent(nextContent);
      setJsonDrafts(
        Object.fromEntries(
          advancedSections.map((section) => [
            section,
            JSON.stringify(nextContent[section], null, 2),
          ]),
        ),
      );
      setMessage("Saved successfully.");
    } catch {
      setMessage("Could not save content.");
    } finally {
      setSaving(false);
    }
  }

  function applyAdvancedJson(section: string) {
    try {
      const parsed = JSON.parse(jsonDrafts[section]);
      const nextContent = { ...content, [section]: parsed };
      setContent(nextContent);
      saveContent(nextContent);
    } catch {
      setMessage(`${section} contains invalid JSON.`);
    }
  }

  async function uploadFile(group: string, file: File | null) {
    if (!file) return;

    setUploading((current) => ({ ...current, [group]: true }));
    setMessage("");

    const formData = new FormData();
    formData.append("group", group);
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setAssets((current) => ({
        ...current,
        [group]: [
          ...(current[group] ?? []),
          {
            name: data.file.name,
            source: "supabase",
            path: data.file.path,
            src: data.file.src,
            alt: data.file.name.replace(/\.[^.]+$/, ""),
          },
        ],
      }));

      if (group === "profile") {
        const nextContent = {
          ...content,
          hero: { ...content.hero, image: data.file.src },
        };
        setContent(nextContent);
        await saveContent(nextContent);
      }

      if (group === "homeGallery") {
        const nextContent = {
          ...content,
          galleryImages: [
            ...content.galleryImages,
            { src: data.file.src, alt: data.file.name.replace(/\.[^.]+$/, "") },
          ],
        };
        setContent(nextContent);
        await saveContent(nextContent);
      }

      setMessage(`Uploaded ${data.file.name}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading((current) => ({ ...current, [group]: false }));
    }
  }

  async function deleteAsset(group: string, asset: Asset) {
    setMessage("");

    const response = await fetch("/api/admin/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        group,
        name: asset.name,
        source: asset.source,
      }),
    });

    if (!response.ok) {
      setMessage("Could not delete file.");
      return;
    }

    setAssets((current) => ({
      ...current,
      [group]: (current[group] ?? []).filter((item) => item.name !== asset.name),
    }));

    let nextContent = content;
    if (group === "homeGallery") {
      nextContent = {
        ...content,
        galleryImages: content.galleryImages.filter(
          (item: any) => item.src !== asset.src,
        ),
      };
    }

    if (group === "profile" && content.hero.image === asset.src) {
      nextContent = {
        ...nextContent,
        hero: { ...nextContent.hero, image: "/matheesha_profile.png" },
      };
    }

    if (nextContent !== content) {
      setContent(nextContent);
      await saveContent(nextContent);
    }

    setMessage(`Deleted ${asset.name}.`);
  }

  if (loading) {
    return (
      <main className="admin-dashboard flex min-h-screen items-center justify-center bg-[#05060b] text-white">
        <Loader2 className="animate-spin text-yellow-400" />
      </main>
    );
  }

  return (
    <main className="admin-dashboard min-h-screen bg-[#05060b] text-white">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-white/10 bg-[#080a12] p-4 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
          <div className="mb-6 px-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
              Admin
            </p>
            <h1 className="mt-2 text-2xl font-semibold">Portfolio Control</h1>
          </div>
          <nav className="grid gap-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-3 rounded-lg border px-3 py-3 text-left text-sm font-semibold transition ${
                  activeSection === id
                    ? "border-yellow-400 bg-yellow-400 text-black"
                    : "border-transparent text-white/75 hover:border-white/10 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="px-5 py-6 md:px-8">
          <header className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
                {navItems.find((item) => item.id === activeSection)?.label}
              </p>
              <h2 className="mt-2 text-3xl font-semibold md:text-5xl">
                Manage {navItems.find((item) => item.id === activeSection)?.label}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => saveContent()}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-5 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-yellow-300 disabled:opacity-60"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Save Changes
            </button>
          </header>

          {message ? (
            <p className="mb-6 rounded-lg border border-yellow-400/30 bg-yellow-400/10 p-4 text-sm text-yellow-100">
              {message}
            </p>
          ) : null}

          <div className="space-y-6">
            {activeSection === "home" ? (
              <>
                <Card title="Hero">
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      "eyebrow",
                      "title",
                      "highlight",
                      "primaryCtaLabel",
                      "primaryCtaHref",
                      "secondaryCtaLabel",
                      "secondaryCtaHref",
                      "image",
                    ].map((field) => (
                      <TextField
                        key={field}
                        label={humanize(field)}
                        value={content.hero[field] ?? ""}
                        onChange={(value) => updateHero(field, value)}
                      />
                    ))}
                    <TextField
                      label="Description"
                      value={content.hero.description ?? ""}
                      multiline
                      className="md:col-span-2"
                      onChange={(value) => updateHero("description", value)}
                    />
                  </div>
                </Card>
                <SectionCopyEditor
                  sections={sectionCopyGroups.home}
                  content={content}
                  onChange={updateSectionCopy}
                />
                <LatestUpdateEditor
                  content={content}
                  onChange={updateLatestUpdate}
                  onAdd={addCollectionItem}
                  onRemove={removeCollectionItem}
                  onCardChange={updateCollectionItem}
                />
                <CollectionEditor collection="stats" content={content} onAdd={addCollectionItem} onRemove={removeCollectionItem} onChange={updateCollectionItem} />
                <CollectionEditor collection="podiumHighlights" content={content} onAdd={addCollectionItem} onRemove={removeCollectionItem} onChange={updateCollectionItem} />
                <CollectionEditor collection="mediaHighlights" content={content} onAdd={addCollectionItem} onRemove={removeCollectionItem} onChange={updateCollectionItem} />
              </>
            ) : null}

            {activeSection === "achievements" ? (
              <>
                <SectionCopyEditor
                  sections={sectionCopyGroups.achievements}
                  content={content}
                  onChange={updateSectionCopy}
                />
                <CollectionEditor collection="achievementsTimeline" content={content} onAdd={addCollectionItem} onRemove={removeCollectionItem} onChange={updateCollectionItem} />
                <CollectionEditor collection="achievementCards" content={content} onAdd={addCollectionItem} onRemove={removeCollectionItem} onChange={updateCollectionItem} />
                <AchievementSectionsEditor
                  sections={content.achievementSections}
                  onAdd={addAchievementSection}
                  onRemove={removeAchievementSection}
                  onChange={updateAchievementSection}
                />
                <AcademicsEditor content={content} onAcademicChange={updateAcademic} onCollectionAdd={addCollectionItem} onCollectionRemove={removeCollectionItem} onCollectionChange={updateCollectionItem} />
              </>
            ) : null}

            {activeSection === "gallery" ? (
              <>
                <SectionCopyEditor
                  sections={sectionCopyGroups.gallery}
                  content={content}
                  onChange={updateSectionCopy}
                />
                <CollectionEditor collection="galleryImages" content={content} onAdd={addCollectionItem} onRemove={removeCollectionItem} onChange={updateCollectionItem} />
              </>
            ) : null}

            {activeSection === "podium" ? (
              <>
                <LatestUpdateEditor
                  content={content}
                  onChange={updateLatestUpdate}
                  onAdd={addCollectionItem}
                  onRemove={removeCollectionItem}
                  onCardChange={updateCollectionItem}
                />
                <CollectionEditor collection="podiumHighlights" content={content} onAdd={addCollectionItem} onRemove={removeCollectionItem} onChange={updateCollectionItem} />
              </>
            ) : null}

            {activeSection === "media" ? (
              <>
                <CollectionEditor collection="mediaHighlights" content={content} onAdd={addCollectionItem} onRemove={removeCollectionItem} onChange={updateCollectionItem} />
                <CollectionEditor collection="mediaArticles" content={content} onAdd={addCollectionItem} onRemove={removeCollectionItem} onChange={updateCollectionItem} />
              </>
            ) : null}

            {activeSection === "sponsors" ? (
              <>
                <SectionCopyEditor
                  sections={sectionCopyGroups.sponsors}
                  content={content}
                  onChange={updateSectionCopy}
                />
                <StringListEditor
                  title="Sponsor Benefits"
                  items={content.sponsorBenefits}
                  onChange={(value) => updateStringList("sponsorBenefits", value)}
                />
                <SponsorPackagesEditor
                  packages={content.sponsorPackages}
                  onAdd={addSponsorPackage}
                  onRemove={removeSponsorPackage}
                  onChange={updateSponsorPackage}
                />
              </>
            ) : null}

            {activeSection === "contact" ? (
              <>
                <SectionCopyEditor
                  sections={sectionCopyGroups.contact}
                  content={content}
                  onChange={updateSectionCopy}
                />
                <CollectionEditor collection="contactCards" content={content} onAdd={addCollectionItem} onRemove={removeCollectionItem} onChange={updateCollectionItem} />
              </>
            ) : null}

            {activeSection === "advanced" ? (
              <AdvancedEditor
                drafts={jsonDrafts}
                onDraftChange={(section, value) =>
                  setJsonDrafts((current) => ({ ...current, [section]: value }))
                }
                onApply={applyAdvancedJson}
              />
            ) : null}

            {activeUploadGroups.length ? (
              <UploadsPanel
                groups={activeUploadGroups}
                assetGroups={assetGroups}
                assets={assets}
                uploading={uploading}
                onUpload={uploadFile}
                onDelete={deleteAsset}
              />
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
  multiline,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  className?: string;
}) {
  return (
    <label className={`space-y-2 text-sm text-white/70 ${className}`}>
      <span>{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-yellow-400"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-yellow-400"
        />
      )}
    </label>
  );
}

function SectionCopyEditor({
  sections,
  content,
  onChange,
}: {
  sections: string[];
  content: any;
  onChange: (section: string, key: string, value: string) => void;
}) {
  return (
    <Card title="Section Headings">
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section}
            className="grid gap-4 rounded-lg border border-white/10 bg-black/20 p-4 md:grid-cols-3"
          >
            <h4 className="font-semibold text-yellow-300 md:col-span-3">
              {humanize(section)}
            </h4>
            {["eyebrow", "title", "subtitle"].map((field) => (
              <TextField
                key={field}
                label={humanize(field)}
                value={content.sectionCopy[section]?.[field] ?? ""}
                onChange={(value) => onChange(section, field, value)}
                multiline={field === "subtitle"}
              />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}

function CollectionEditor({
  collection,
  content,
  onAdd,
  onRemove,
  onChange,
}: {
  collection: string;
  content: any;
  onAdd: (collection: string) => void;
  onRemove: (collection: string, index: number) => void;
  onChange: (collection: string, index: number, key: string, value: string) => void;
}) {
  const fields = collectionFields[collection];
  const items =
    collection === "latestUpdateCards"
      ? content.latestUpdate.cards
      : content[collection];

  return (
    <Card
      title={collectionLabels[collection]}
      action={
        <button
          type="button"
          onClick={() => onAdd(collection)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:border-yellow-400"
        >
          <Plus size={16} />
          Add
        </button>
      }
    >
      <div className="space-y-4">
        {items.map((item: any, index: number) => (
          <div
            key={`${collection}-${index}`}
            className="grid gap-4 rounded-lg border border-white/10 bg-black/20 p-4 md:grid-cols-2"
          >
            {fields.map((field) => (
              <TextField
                key={field.key}
                label={field.label}
                value={item[field.key] ?? ""}
                multiline={field.multiline}
                className={field.multiline ? "md:col-span-2" : ""}
                onChange={(value) => onChange(collection, index, field.key, value)}
              />
            ))}
            <button
              type="button"
              onClick={() => onRemove(collection, index)}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-400/30 px-3 py-2 text-sm font-semibold text-red-200 hover:border-red-300"
            >
              <Trash2 size={16} />
              Remove
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function LatestUpdateEditor({
  content,
  onChange,
  onAdd,
  onRemove,
  onCardChange,
}: {
  content: any;
  onChange: (key: string, value: string) => void;
  onAdd: (collection: string) => void;
  onRemove: (collection: string, index: number) => void;
  onCardChange: (
    collection: string,
    index: number,
    key: string,
    value: string,
  ) => void;
}) {
  return (
    <>
      <Card title="Latest Update Event">
        <div className="grid gap-4 md:grid-cols-2">
          {["label", "event", "date", "venue"].map((field) => (
            <TextField
              key={field}
              label={humanize(field)}
              value={content.latestUpdate[field] ?? ""}
              onChange={(value) => onChange(field, value)}
            />
          ))}
        </div>
      </Card>
      <CollectionEditor
        collection="latestUpdateCards"
        content={content}
        onAdd={onAdd}
        onRemove={onRemove}
        onChange={onCardChange}
      />
    </>
  );
}

function StringListEditor({
  title,
  items,
  onChange,
}: {
  title: string;
  items: string[];
  onChange: (value: string) => void;
}) {
  return (
    <Card title={title}>
      <TextField
        label="One item per line"
        value={items.join("\n")}
        multiline
        onChange={onChange}
      />
    </Card>
  );
}

function AchievementSectionsEditor({
  sections,
  onAdd,
  onRemove,
  onChange,
}: {
  sections: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, key: string, value: string) => void;
}) {
  return (
    <Card
      title="Tournament Track Record Sections"
      action={
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:border-yellow-400"
        >
          <Plus size={16} />
          Add
        </button>
      }
    >
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div
            key={`${section.title}-${index}`}
            className="grid gap-4 rounded-lg border border-white/10 bg-black/20 p-4"
          >
            <TextField
              label="Title"
              value={section.title ?? ""}
              onChange={(value) => onChange(index, "title", value)}
            />
            <TextField
              label="Items, one per line"
              value={(section.items ?? []).join("\n")}
              multiline
              onChange={(value) => onChange(index, "items", value)}
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-400/30 px-3 py-2 text-sm font-semibold text-red-200 hover:border-red-300"
            >
              <Trash2 size={16} />
              Remove
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AcademicsEditor({
  content,
  onAcademicChange,
  onCollectionAdd,
  onCollectionRemove,
  onCollectionChange,
}: {
  content: any;
  onAcademicChange: (path: string, value: string) => void;
  onCollectionAdd: (collection: string) => void;
  onCollectionRemove: (collection: string, index: number) => void;
  onCollectionChange: (
    collection: string,
    index: number,
    key: string,
    value: string,
  ) => void;
}) {
  return (
    <>
      <Card title="Academic Profile">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="O/L Exam" value={content.academicProfile.ol.exam} onChange={(value) => onAcademicChange("ol.exam", value)} />
          <TextField label="O/L School" value={content.academicProfile.ol.school} onChange={(value) => onAcademicChange("ol.school", value)} />
          <TextField label="O/L Summary" value={content.academicProfile.ol.summary} onChange={(value) => onAcademicChange("ol.summary", value)} />
          <TextField label="A/L Stream" value={content.academicProfile.al.stream} onChange={(value) => onAcademicChange("al.stream", value)} />
          <TextField label="A/L School" value={content.academicProfile.al.school} onChange={(value) => onAcademicChange("al.school", value)} />
          <TextField label="A/L Status" value={content.academicProfile.al.status} onChange={(value) => onAcademicChange("al.status", value)} />
          <TextField
            label="A/L Subjects, one per line"
            value={content.academicProfile.al.subjects.join("\n")}
            multiline
            className="md:col-span-2"
            onChange={(value) => onAcademicChange("al.subjects", value)}
          />
        </div>
      </Card>
      <CollectionEditor
        collection="olResults"
        content={content}
        onAdd={onCollectionAdd}
        onRemove={onCollectionRemove}
        onChange={onCollectionChange}
      />
    </>
  );
}

function SponsorPackagesEditor({
  packages,
  onAdd,
  onRemove,
  onChange,
}: {
  packages: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, key: string, value: string) => void;
}) {
  return (
    <Card
      title="Sponsor Packages"
      action={
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:border-yellow-400"
        >
          <Plus size={16} />
          Add
        </button>
      }
    >
      <div className="space-y-4">
        {packages.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="grid gap-4 rounded-lg border border-white/10 bg-black/20 p-4 md:grid-cols-2"
          >
            <TextField label="Name" value={item.name ?? ""} onChange={(value) => onChange(index, "name", value)} />
            <TextField label="Price" value={item.price ?? ""} onChange={(value) => onChange(index, "price", value)} />
            <TextField
              label="Perks, one per line"
              value={(item.perks ?? []).join("\n")}
              multiline
              className="md:col-span-2"
              onChange={(value) => onChange(index, "perks", value)}
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-400/30 px-3 py-2 text-sm font-semibold text-red-200 hover:border-red-300"
            >
              <Trash2 size={16} />
              Remove
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function UploadsPanel({
  groups,
  assetGroups,
  assets,
  uploading,
  onUpload,
  onDelete,
}: {
  groups: string[];
  assetGroups: Record<string, AssetGroup>;
  assets: Record<string, Asset[]>;
  uploading: Record<string, boolean>;
  onUpload: (group: string, file: File | null) => void;
  onDelete: (group: string, asset: Asset) => void;
}) {
  return (
    <Card title="Images, Videos, and Documents">
      <div className="grid gap-4 xl:grid-cols-2">
        {groups.map((group) => (
          <div
            key={group}
            className="rounded-lg border border-white/10 bg-black/20 p-4"
          >
            <label className="block">
              <span className="flex items-center gap-3 text-lg font-semibold">
                {assetGroups[group]?.accept.includes("video") ? (
                  <Video size={20} />
                ) : (
                  <Upload size={20} />
                )}
                {assetGroups[group]?.label}
              </span>
              <input
                type="file"
                accept={assetGroups[group]?.accept}
                disabled={uploading[group]}
                onChange={(event) => onUpload(group, event.target.files?.[0] ?? null)}
                className="mt-4 block w-full cursor-pointer rounded-lg border border-white/10 bg-black/30 p-3 text-sm text-white file:mr-4 file:rounded-md file:border-0 file:bg-yellow-400 file:px-3 file:py-2 file:font-semibold file:text-black"
              />
            </label>
            {uploading[group] ? (
              <span className="mt-3 inline-flex items-center gap-2 text-sm text-yellow-300">
                <Loader2 size={14} className="animate-spin" />
                Uploading
              </span>
            ) : null}
            <div className="mt-5 grid gap-3">
              {(assets[group] ?? []).map((asset) => (
                <div
                  key={asset.src}
                  className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {asset.name}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs uppercase tracking-wide text-white/45">
                      {fileKind(asset) === "document" ? <FileText size={12} /> : null}
                      {fileKind(asset)} · {asset.source ?? "local"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDelete(group, asset)}
                    className="shrink-0 rounded-md border border-red-400/30 p-2 text-red-200 hover:border-red-300"
                    aria-label={`Delete ${asset.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AdvancedEditor({
  drafts,
  onDraftChange,
  onApply,
}: {
  drafts: Record<string, string>;
  onDraftChange: (section: string, value: string) => void;
  onApply: (section: string) => void;
}) {
  return (
    <div className="space-y-5">
      {advancedSections.map((section) => (
        <Card
          key={section}
          title={section}
          action={
            <button
              type="button"
              onClick={() => onApply(section)}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:border-yellow-400"
            >
              Apply JSON
            </button>
          }
        >
          <textarea
            value={drafts[section] ?? ""}
            onChange={(event) => onDraftChange(section, event.target.value)}
            rows={12}
            spellCheck={false}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-3 font-mono text-sm text-white outline-none focus:border-yellow-400"
          />
        </Card>
      ))}
    </div>
  );
}
