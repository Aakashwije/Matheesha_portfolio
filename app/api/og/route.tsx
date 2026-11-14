/* eslint-disable @next/next/no-img-element -- ImageResponse renders plain <img>, not next/image */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getEditableContent } from "@/lib/content";

export const runtime = "nodejs";
export const revalidate = 3600;

const size = { width: 1200, height: 630 };

async function dataUri(file: string) {
  const buffer = await readFile(path.join(process.cwd(), "public", file));
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

// Share card text stays in English: the OG renderer has no Sinhala/Tamil glyphs.
export async function GET() {
  const [content, logo, profile] = await Promise.all([
    getEditableContent("en"),
    dataUri("matheesha_logo-256.png"),
    dataUri("matheesha_profile.png"),
  ]);
  const stats: { label: string; value: string }[] = content.stats.slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #05060b 0%, #0b0e17 55%, #1a1505 100%)",
          color: "white",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <img src={logo} width={72} height={72} alt="" />
            <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#facc15", textTransform: "uppercase" }}>
              Sri Lanka · Squash
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Matheesha</div>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Wijesekara</div>
            <div style={{ display: "flex", marginTop: 16, fontSize: 28, color: "#cbd5e1" }}>
              Executive Brand Ambassador · Würth Lanka
            </div>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "2px solid rgba(250,204,21,0.45)",
                  borderRadius: 20,
                  padding: "14px 20px",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <div style={{ display: "flex", fontSize: 48, fontWeight: 700, color: "#facc15" }}>{stat.value}</div>
                <div style={{ display: "flex", fontSize: 20, color: "#cbd5e1" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: 360 }}>
          <img
            src={profile}
            width={340}
            height={340}
            alt=""
            style={{ objectFit: "contain", borderRadius: 32, border: "2px solid rgba(255,255,255,0.15)" }}
          />
        </div>
      </div>
    ),
    size,
  );
}
