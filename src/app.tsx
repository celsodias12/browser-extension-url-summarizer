import { useEffect, useState } from 'react'



export function App() {
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    const getCurrentTabUrl = async () => {
      try {

        if (chrome.tabs) {
          const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
          if (tabs[0]?.url) {
            setCurrentUrl(tabs[0].url)
          }
        } else {
          console.error('Chrome API not available')
        }
      } catch (error) {
        console.error('Error getting tab URL:', error)
      }
    }

    getCurrentTabUrl()
  }, [])

  const handleOpenAI = () => {
    const prompt = `${currentUrl} resuma em português`
    const encodedPrompt = encodeURIComponent(prompt)
    const openAIUrl = `https://chat.openai.com/?temporary-chat=true&q=${encodedPrompt}`

    if (chrome.tabs) {
      chrome.tabs.create({ url: openAIUrl })
    } else {
      window.open(openAIUrl, '_blank')
    }
  }

  return (
    <div className="min-w-[500px] p-6 bg-linear-to-br from-slate-900 to-slate-800">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100 mb-2">Current Tab URL</h1>
        <div className="h-1 w-12 bg-blue-400 rounded-full"></div>
      </div>

      <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-4 hover:shadow-xl transition-shadow">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">URL</p>
            <p className="text-sm text-slate-200 break-all font-mono bg-slate-900 px-3 py-2 rounded border border-slate-700">
              {currentUrl || (
                <span className="text-slate-500 italic">Loading...</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleOpenAI}
        disabled={!currentUrl}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Summarize on ChatGPT
      </button>
    </div>
  )
}
