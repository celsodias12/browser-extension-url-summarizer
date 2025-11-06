import { useEffect, useState } from 'react'

const DEFAULT_PROMPT = '{url} summarize'

export function App() {
  const [currentUrl, setCurrentUrl] = useState('')
  const [customPrompt, setCustomPrompt] = useState(DEFAULT_PROMPT)
  const [useTemporaryChat, setUseTemporaryChat] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

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

  useEffect(() => {
    const loadSettings = async () => {
      try {
        if (chrome.storage) {
          const result = await chrome.storage.sync.get(['customPrompt', 'useTemporaryChat'])
          if (result.customPrompt) {
            setCustomPrompt(result.customPrompt)
          }
          if (result.useTemporaryChat !== undefined) {
            setUseTemporaryChat(result.useTemporaryChat)
          }
        }
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    }

    loadSettings()
  }, [])

  const saveSettings = async () => {
    try {
      if (chrome.storage) {
        await chrome.storage.sync.set({ customPrompt, useTemporaryChat })
        setShowSettings(false)
      }
    } catch (error) {
      console.error('Error saving settings:', error)
    }
  }

  const resetPrompt = () => {
    setCustomPrompt(DEFAULT_PROMPT)
  }

  const handleOpenAI = () => {
    const prompt = customPrompt.replace('{url}', currentUrl)
    const encodedPrompt = encodeURIComponent(prompt)
    const baseUrl = 'https://chat.openai.com/'
    const params = new URLSearchParams({ q: encodedPrompt })
    if (useTemporaryChat) {
      params.append('temporary-chat', 'true')
    }
    const openAIUrl = `${baseUrl}?${params.toString()}`

    if (chrome.tabs) {
      chrome.tabs.create({ url: openAIUrl })
    } else {
      window.open(openAIUrl, '_blank')
    }
  }

  if (showSettings) {
    return (
      <div className="min-w-[500px] p-6 bg-linear-to-br from-slate-900 to-slate-800">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-slate-100">Settings</h1>
            <button
              onClick={() => setShowSettings(false)}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="h-1 w-12 bg-blue-400 rounded-full"></div>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-4">
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Custom Prompt
          </label>
          <p className="text-xs text-slate-400 mb-3">
            Use <code className="bg-slate-900 px-1.5 py-0.5 rounded text-blue-400">{'{url}'}</code> as a placeholder for the current page URL
          </p>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="w-full bg-slate-900 text-slate-200 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder={DEFAULT_PROMPT}
          />
          <div className="mt-3 flex gap-2">
            <button
              onClick={saveSettings}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Save
            </button>
            <button
              onClick={resetPrompt}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-4 bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-300 mb-1">
                Use Temporary Chat
              </label>
              <p className="text-xs text-slate-400">
                Open ChatGPT in a temporary chat session (not saved to history)
              </p>
            </div>
            <button
              onClick={() => setUseTemporaryChat(!useTemporaryChat)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${
                useTemporaryChat ? 'bg-blue-500' : 'bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  useTemporaryChat ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-4 bg-slate-800 rounded-lg border border-slate-700 p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Preview</p>
          <p className="text-sm text-slate-300 break-all font-mono bg-slate-900 px-3 py-2 rounded border border-slate-700">
            {customPrompt.replace('{url}', currentUrl || 'https://example.com')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-w-[500px] p-6 bg-linear-to-br from-slate-900 to-slate-800">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-slate-100">Current Tab URL</h1>
          <button
            onClick={() => setShowSettings(true)}
            className="text-slate-400 hover:text-slate-200 transition-colors"
            title="Settings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
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
