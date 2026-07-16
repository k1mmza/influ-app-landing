import { ImageResponse } from "next/og";

// ponytail: placeholder mark — swap for a real logo file once brand assets are finalized.
export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F0512E",
          color: "#FFFFFF",
          fontSize: 110,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        I
      </div>
    ),
    { ...size },
  );
}
