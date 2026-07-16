import { ImageResponse } from "next/og";

// ponytail: placeholder social-share card — swap for real brand imagery once finalized.
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FBF9F6",
          color: "#1A1A1A",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 140,
            borderRadius: 28,
            background: "#F0512E",
            color: "#FFFFFF",
            fontSize: 84,
            fontWeight: 700,
            fontFamily: "sans-serif",
            marginBottom: 40,
          }}
        >
          I
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, fontFamily: "sans-serif" }}>Inflique</div>
        <div style={{ fontSize: 28, color: "#6B6B6B", marginTop: 16, fontFamily: "sans-serif" }}>
          Cast the right creator. Not the loudest one.
        </div>
      </div>
    ),
    { ...size },
  );
}
