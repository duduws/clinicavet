"use client";

// Importação dos hooks necessários do React
// - useState: gerenciamento de estado local
// - useEffect: efeitos colaterais e ciclo de vida
// - useMemo: memorização de valores computados (importado mas não utilizado)
import { useEffect, useMemo, useState } from "react";

// Definição de tipos TypeScript para garantir tipagem forte
type Movie = {
  Id: string;
  Name: string;
  ProductionYear?: number; // Uso de propriedade opcional com '?'
};

// Interface para a resposta da API Jellyfin
type JellyfinResponse = {
  Items?: Movie[];
  TotalRecordCount?: number;
};

// Constantes de configuração da aplicação
const BASE_URL = "https://tv.duduw.com.br";
const API_TOKEN = "18968827877745e8adedc9915dec1dbe";
const PAGE_SIZE = 12; // Número de itens por página para paginação

export default function Jellyflix() {
  // Gerenciamento de estado com useState
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [pendingSearch, setPendingSearch] = useState(""); // Estado para implementar debounce na busca

  // Implementação de debounce para otimizar a busca
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(pendingSearch);
      setPage(1); // sempre volta para a página 1 ao pesquisar
    }, 400); // Delay de 400ms para melhor experiência do usuário
    
    // Cleanup function para evitar memory leaks
    return () => clearTimeout(t);
  }, [pendingSearch]);

  // Busca paginada na API do Jellyfin
  useEffect(() => {
    // Flag para evitar race conditions em requisições assíncronas
    let aborted = false;

    async function fetchMovies() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          IncludeItemTypes: "Movie",
          Recursive: "true",
          SortBy: "SortName",
          Limit: String(PAGE_SIZE),
          StartIndex: String((page - 1) * PAGE_SIZE),
        });

        // Adição condicional de parâmetros de busca
        if (search.trim()) {
          params.set("SearchTerm", search.trim());
        }

        // Requisição fetch com template strings e parâmetros dinâmicos
        const res = await fetch(`${BASE_URL}/Items?${params.toString()}`, {
          headers: { "X-Emby-Token": API_TOKEN }, // Autenticação via token no header
          //mode: "cors"
        });

        // Verificação de erro na resposta HTTP
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        // Parsing da resposta JSON com tipagem
        const data: JellyfinResponse = await res.json();
        if (aborted) return; // Prevenção de atualização de estado após desmontagem do componente

        const items = data.Items ?? [];
        setMovies(items);

        // Cálculo dinâmico do total de páginas baseado na resposta da API
        const total = data.TotalRecordCount ?? items.length;
        setTotalPages(Math.max(1, Math.ceil(total / PAGE_SIZE)));
      } catch (e) {

        console.error("Erro ao buscar filmes:", e);
        setMovies([]);
        setTotalPages(1);
      } finally {
        // Uso do bloco finally para garantir que o loading seja finalizado
        if (!aborted) setLoading(false);
      }
    }

    // Chamada imediata da função assíncrona
    fetchMovies();
    
    // Cleanup function para evitar memory leaks e race conditions
    return () => {
      aborted = true; // Marca a requisição como abortada se o componente for desmontado
    };
  }, [page, search]);

  // Cálculo de estados derivados para controles de paginação
  const disabledPrev = page <= 1;
  const disabledNext = page >= totalPages;

  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">🎬 Filmes para Assistir:</h1>

      {/* Busca */}
      <div className="max-w-4xl mx-auto mb-6">
        <input
          value={pendingSearch}
          onChange={(e) => setPendingSearch(e.target.value)}
          placeholder="Buscar filmes por título..."
          className="w-full rounded-xl px-4 py-3 text-black bg-gray-50 hover:bg-gray-100"
        />
      </div>

      {/* Lista - Renderização condicional com múltiplos estados */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <p>Carregando filmes...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <p>Nenhum filme encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {movies.map((m) => (
            <div
              key={m.Id}
              className="bg-white/10 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition"
            >
              <img
                src={`${BASE_URL}/Items/${m.Id}/Images/Primary?quality=90&fillHeight=450&fillWidth=300`}
                alt={m.Name}
                className="w-full h-72 object-cover"
                loading="lazy"
              />
              <div className="p-3">
                <h2 className="text-lg font-semibold truncate" title={m.Name}>
                  {m.Name}
                </h2>
                {m.ProductionYear ? (
                  <p className="text-sm text-gray-300">Ano: {m.ProductionYear}</p>
                ) : null}
                <a
                  href={`${BASE_URL}/web/index.html#!/details?id=${m.Id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white text-sm font-medium"
                >
                  ▶ Assistir
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={disabledPrev}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className={`px-4 py-2 rounded-lg ${
            disabledPrev ? "bg-gray-600 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          ◀ Anterior
        </button>
        <span className="text-lg">
          Página {page} de {totalPages}
        </span>
        <button
          disabled={disabledNext}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className={`px-4 py-2 rounded-lg ${
            disabledNext ? "bg-gray-600 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          Próxima ▶
        </button>
      </div>
    </main>
  );
}
