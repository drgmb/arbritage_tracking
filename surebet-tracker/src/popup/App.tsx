import { useEffect } from 'react';
import { useSurebetStore } from '../store/surebetStore';
import { Header } from './components/Header';
import { SurebetList } from './components/SurebetList';
import { SurebetEditor } from './components/SurebetEditor';
import { Settings } from './components/Settings';

export default function App() {
  const { view, loadSurebets, loadApiKey, isLoading, error } = useSurebetStore();

  useEffect(() => {
    loadSurebets();
    loadApiKey();
  }, [loadSurebets, loadApiKey]);

  return (
    <div className="min-h-[400px] flex flex-col">
      <Header />

      {error && (
        <div className="mx-4 mt-2 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <main className="flex-1 p-4">
        {isLoading && view === 'list' ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <>
            {view === 'list' && <SurebetList />}
            {view === 'editor' && <SurebetEditor />}
            {view === 'settings' && <Settings />}
          </>
        )}
      </main>
    </div>
  );
}
