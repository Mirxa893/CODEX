import './styles/globals.css'

export const metadata = {
  title: 'MK Codex Chat',
  description: 'AI chatbot using DeepSeek via OpenRouter'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-sans">{children}</body>
    </html>
  )
}
