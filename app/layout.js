export const metadata = {
  title: 'Image Uploader',
  description: 'Upload and preview your images',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
