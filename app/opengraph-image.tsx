import { ImageResponse } from "next/og";

export const alt = "LAYZOX: custom software, AI automation and digital products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #040a16 0%, #0a1f4d 100%)",
          color: "#eef3fb",
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: 6, color: "#b6f24d" }}>LAYZOX</div>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, maxWidth: 980 }}>
          From scattered sheets and chats to one system your team runs on.
        </div>
        <div style={{ fontSize: 30, color: "#9db0cb" }}>Custom software, automation and data systems · Worldwide</div>
      </div>
    ),
    size
  );
}
