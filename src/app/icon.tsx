import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse dùng CSS in JS (khá giống style inline)
      <div
        style={{
          fontSize: 18,
          background: '#0f172a', // Màu nền (Slate-900 giống Navbar dark mode)
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#3b82f6', // Màu chữ (Blue-500 - Primary)
          borderRadius: '6px', // Bo góc nhẹ cho mềm mại
          fontWeight: 700,     // In đậm
        }}
      >
        {/* Ký tự đại diện: </> */}
        &lt;/&gt;
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}