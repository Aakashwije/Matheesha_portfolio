import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export default async function Icon() {
  const logoPath = path.join(process.cwd(), "public", "matheesha_logo.png");
  const logoBuffer = await readFile(logoPath);
  const logoBase64 = logoBuffer.toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#05060b",
        }}
      >
        <img
          src={`data:image/png;base64,${logoBase64}`}
          alt="Matheesha logo"
          width="512"
          height="512"
        />
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  );
}
