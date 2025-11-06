import { useEffect, useState } from 'react'

interface BrowserAPI {
  tabs?: {
    query: (queryInfo: { active: boolean; currentWindow: boolean }) => Promise<Array<{ url?: string }>>
  }
}

export function App() {
  const [currentUrl, setCurrentUrl] = useState<string>('')

  useEffect(() => {
    const getCurrentTabUrl = async () => {
      try {
        const browserAPI = (globalThis as unknown as { chrome?: BrowserAPI; browser?: BrowserAPI }).chrome ||
                          (globalThis as unknown as { chrome?: BrowserAPI; browser?: BrowserAPI }).browser

        if (browserAPI?.tabs) {
          const tabs = await browserAPI.tabs.query({ active: true, currentWindow: true })
          if (tabs[0]?.url) {
            setCurrentUrl(tabs[0].url)
          }
        }
      } catch (error) {
        console.error('Erro ao obter URL da aba:', error)
      }
    }

    getCurrentTabUrl()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">URL da Aba Atual</h1>
      <div className="bg-gray-100 p-3 rounded border break-all">
        <p className="text-sm text-gray-700">{currentUrl || 'Carregando...'}</p>
      </div>
    </div>
  )
}
