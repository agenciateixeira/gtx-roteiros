import React, { useState } from 'react';
import { Video, Sparkles, TrendingUp, Copy, Download, Loader2, RotateCcw, Zap, Target, Rocket, BarChart3, Lightbulb } from 'lucide-react';

export default function AIScriptGenerator() {
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [initialSituation, setInitialSituation] = useState('');
  const [mainProblem, setMainProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [results, setResults] = useState('');
  const [format, setFormat] = useState('reels');
  const [duration, setDuration] = useState('60');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchingCompany, setSearchingCompany] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const formats = {
    reels: { name: 'Reels/TikTok', icon: Video },
    shorts: { name: 'YouTube Shorts', icon: Video },
  };

  const examples = [
    { 
      company: 'Klabin',
      type: 'Indústria de Papel e Celulose',
      situation: 'Empresa crescendo rapidamente mas sem estrutura de vendas',
      problem: 'Time comercial desorganizado, sem processo claro, perdendo oportunidades',
      solution: 'Implementamos CRM, processo comercial estruturado, treinamento de vendas',
      results: '3x mais vendas em 6 meses, time organizado, previsibilidade de receita'
    },
    { 
      company: 'Pizzaria Bella',
      type: 'Negócio Local',
      situation: 'Restaurante tradicional com queda nas vendas',
      problem: 'Delivery não funciona, poucos clientes novos, sem presença digital',
      solution: 'Otimização de delivery, estratégia de conteúdo, tráfego pago local',
      results: '300% mais pedidos, fila nos finais de semana, +40k faturamento/mês'
    },
    { 
      company: 'ConsulMed',
      type: 'Serviços Profissionais',
      situation: 'Consultório odontológico com agenda vazia',
      problem: 'Poucos pacientes novos, sem marketing, dependência de indicação',
      solution: 'Presença digital, Google Ads localizado, sistema de agendamento online',
      results: 'Agenda completa em 3 meses, 150+ pacientes novos, ROI de 400%'
    },
  ];

  const generateScript = async () => {
    if (!companyName || !businessType || !initialSituation || !mainProblem) {
      showToast('⚠️ Preencha pelo menos: Nome, Tipo de negócio, Situação inicial e Problema', 'error');
      return;
    }

    setLoading(true);
    setScript('');

    const formatInfo = formats[format];

    const prompt = `Você é um especialista em criar roteiros de vídeos virais no estilo storytelling de negócios, similar ao formato usado pela Klabin e outras empresas de sucesso.

INFORMAÇÕES DO CASE:
Nome da Empresa: ${companyName}
Tipo de Negócio: ${businessType}
Situação Inicial: ${initialSituation}
Problema Principal: ${mainProblem}
Solução Aplicada: ${solution || 'Estratégias de marketing e vendas personalizadas'}
Resultados: ${results || 'Transformação significativa no negócio'}

Formato: ${formatInfo.name} (${duration} segundos)

ESTRUTURA OBRIGATÓRIA DO ROTEIRO:
Use EXATAMENTE este formato:

━━━━━━━━━━━━━━━━━━━━
ROTEIRO - ${companyName.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━

[CENA 1 - GANCHO] (0-5s)
[Imagem: Logo da empresa ou fundador em momento de reflexão]
TEXTO NA TELA: "[Número impactante ou afirmação forte]"
NARRAÇÃO: "[Frase que prende atenção nos primeiros 3 segundos - use dados, contraste ou curiosidade]"

[CENA 2 - CONTEXTO] (5-12s)
[Imagem: Empresa em operação ou produto/serviço]
TEXTO NA TELA: "Contexto"
NARRAÇÃO: "[Apresente a empresa de forma rápida e humanizada - o que fazem, onde estão]"

[CENA 3 - PROBLEMA] (12-25s)
[Imagens: Gráficos em queda, calendário vazio, situação problema]
TEXTO NA TELA: "O Desafio"
NARRAÇÃO: "[Descreva o problema específico enfrentado - seja detalhado e emocional. Use números se possível]"

[CENA 4 - VIRADA] (25-35s)
[Imagem: Transição visual - reunião, planejamento, ação]
TEXTO NA TELA: "A Mudança"
NARRAÇÃO: "[Momento decisivo - o que mudou, que estratégias foram aplicadas. Mantenha natural]"

[CENA 5 - AÇÃO] (35-45s)
[Imagens: Implementação, trabalho em andamento, execução]
TEXTO NA TELA: "Em Ação"
NARRAÇÃO: "[O que foi feito na prática - sem jargão técnico, foque nos resultados práticos]"

[CENA 6 - RESULTADO] (45-55s)
[Imagens: Gráficos subindo, empresa movimentada, sucesso visível]
TEXTO NA TELA: "Resultados"
NARRAÇÃO: "[Números específicos e impacto real - seja preciso e impactante]"

[CENA 7 - CTA] (55-${duration}s)
[Imagem: Logo AIGTX ou chamada para ação]
TEXTO NA TELA: "Próxima história: a sua"
NARRAÇÃO: "[CTA conversacional oferecendo ajuda similar - não seja vendedor, seja consultor]"

━━━━━━━━━━━━━━━━━━━━

ORIENTAÇÕES DE PRODUÇÃO:
▸ Transição musical: Começa introspectiva, fica energética na virada
▸ Ritmo: Cortes a cada 3-5 segundos máximo
▸ Texto na tela: Sempre presente, fonte clean, destaque em palavras-chave
▸ Tom: Profissional mas acessível, storytelling genuíno
▸ Números: Use dados reais ou realistas, sempre específicos

HASHTAGS SUGERIDAS:
[Liste 8-10 hashtags relevantes para o nicho]

━━━━━━━━━━━━━━━━━━━━

DIRETRIZES CRÍTICAS:
- Conte uma história LINEAR com começo, meio e fim
- Use NÚMEROS específicos em todos os resultados
- NUNCA pareça propaganda - seja jornalístico
- Cada cena deve ter indicação clara de imagem
- Mantenha naturalidade na narração (como se estivesse contando para um amigo)
- O CTA deve ser sutil e consultivo, não vendedor

Gere o roteiro completo seguindo EXATAMENTE esta estrutura:`;

    try {
      const isDevelopment = window.location.hostname === 'localhost';
      let data;
      
      if (isDevelopment) {
        // Desenvolvimento: chama direto Gemini API - GEMINI 2.0 FLASH (MAIS RECENTE!)
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyBauutlQpQu3qZWeV5MZaVHyo2_kzgDbAE'}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }]
            })
          }
        );
        
        const result = await response.json();
        
        if (result.error) {
          throw new Error(result.error.message);
        }
        
        data = { content: [{ text: result.candidates[0].content.parts[0].text }] };
      } else {
        // Produção: usa serverless function
        const response = await fetch('/api/generate-script', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt })
        });
        
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }
        
        data = await response.json();
      }

      const claudeResponse = data.content[0].text;
      
      setScript(claudeResponse);
    } catch (error) {
      console.error("Erro ao gerar roteiro:", error);
      showToast('❌ Erro ao gerar roteiro. Verifique sua conexão!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script);
    showToast('📋 Roteiro copiado!', 'success');
  };

  const downloadScript = () => {
    const blob = new Blob([script], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roteiro-${companyName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`;
    a.click();
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const searchCompanyData = async () => {
    if (!companyName || companyName.trim().length < 2) {
      alert('Digite o nome de uma empresa para buscar!');
      return;
    }

    setSearchingCompany(true);
    
    const searchPrompt = `Você é um pesquisador especializado em coletar informações públicas sobre empresas.

EMPRESA PARA PESQUISAR: ${companyName}

Busque informações públicas e atualizadas sobre esta empresa e retorne APENAS um JSON válido com estas informações:

{
  "company": "Nome oficial da empresa",
  "businessType": "Segmento de atuação (ex: Tecnologia SaaS, E-commerce de moda, Restaurante italiano, etc) | Fundador: Nome do fundador/CEO principal",
  "initialSituation": "História da empresa: quando foi fundada, contexto inicial, missão/propósito. Seja específico com datas e localização.",
  "mainProblem": "Principais desafios e problemas que a empresa enfrentou ou enfrenta. Use dados concretos se disponíveis. Se não souber problemas específicos, infira desafios comuns do setor.",
  "solution": "Estratégias, inovações ou diferenciais que a empresa aplicou/aplica. Como se destacam no mercado? O que fazem de diferente?",
  "results": "Números atuais, conquistas, posição no mercado, quantos clientes/funcionários, faturamento (se público), prêmios, reconhecimentos. Seja específico com métricas."
}

INSTRUÇÕES CRÍTICAS:
- Use informações REAIS e PÚBLICAS da web
- Priorize sites oficiais, LinkedIn da empresa, notícias confiáveis
- Se não encontrar dados específicos, use "Informação não disponível publicamente" ou faça inferências realistas baseadas no setor
- Números devem ser reais quando disponíveis
- Retorne APENAS o JSON, sem explicações adicionais
- Não invente dados fictícios - use apenas informações verificáveis ou indique quando não há dados públicos`;
    
    try {
      // Para desenvolvimento local, chama direto a API
      // Para produção (Vercel), usa a serverless function
      const isDevelopment = window.location.hostname === 'localhost';
      
      let data;
      
      if (isDevelopment) {
        // Desenvolvimento: chama direto Gemini API - GEMINI 2.0 FLASH (MAIS RECENTE!)
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyBauutlQpQu3qZWeV5MZaVHyo2_kzgDbAE'}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: searchPrompt
                }]
              }]
            })
          }
        );
        
        const result = await response.json();
        
        if (result.error) {
          throw new Error(result.error.message);
        }
        
        data = { content: [{ text: result.candidates[0].content.parts[0].text }] };
      } else {
        // Produção: usa serverless function da Vercel
        const response = await fetch('/api/generate-script', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: searchPrompt
          })
        });
        
        if (!response.ok) {
          throw new Error('Erro ao buscar informações da empresa');
        }
        
        data = await response.json();
      }
      let responseText = data.content[0].text;
      
      // Limpar markdown e extrair JSON
      responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      
      const companyData = JSON.parse(responseText);
      
      // Preencher os campos com os dados encontrados
      setCompanyName(companyData.company);
      setBusinessType(companyData.businessType);
      setInitialSituation(companyData.initialSituation);
      setMainProblem(companyData.mainProblem);
      setSolution(companyData.solution);
      setResults(companyData.results);
      
      showToast('✅ Dados da empresa carregados com sucesso!', 'success');
      
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      showToast('❌ Erro ao buscar informações. Tente novamente ou preencha manualmente.', 'error');
    } finally {
      setSearchingCompany(false);
    }
  };

  const loadExample = async (example) => {
    // Se for a Klabin, buscar dados reais
    if (example.company === 'Klabin') {
      setLoading(true);
      setCompanyName('Klabin');
      setBusinessType('Carregando informações...');
      
      try {
        // Buscar informações reais da Klabin
        const searchPrompt = `Pesquise informações sobre a empresa Klabin e me retorne APENAS um JSON com estas informações:
        
{
  "company": "Klabin",
  "businessType": "Tipo de negócio e área de atuação",
  "founder": "Nome do fundador principal",
  "initialSituation": "História inicial da empresa, quando foi fundada, contexto",
  "mainProblem": "Principais desafios que a empresa enfrentou em sua trajetória",
  "solution": "Estratégias e inovações que aplicaram para crescer",
  "results": "Números atuais, posição no mercado, conquistas"
}

IMPORTANTE: Retorne APENAS o JSON válido, sem texto adicional. Use informações públicas e atualizadas de https://klabin.com.br/`;

        const apiUrl = process.env.NODE_ENV === 'production' 
          ? '/api/generate-script'
          : 'http://localhost:3001/api/generate-script';
        
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: searchPrompt
          })
        });

        const data = await response.json();
        let responseText = data.content[0].text;
        
        // Limpar markdown e extrair JSON
        responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        
        const klabinData = JSON.parse(responseText);
        
        setCompanyName(klabinData.company);
        setBusinessType(klabinData.businessType + " | Fundador: " + klabinData.founder);
        setInitialSituation(klabinData.initialSituation);
        setMainProblem(klabinData.mainProblem);
        setSolution(klabinData.solution);
        setResults(klabinData.results);
        
      } catch (error) {
        console.error('Erro ao buscar dados da Klabin:', error);
        // Fallback para dados do exemplo
        setCompanyName(example.company);
        setBusinessType(example.type);
        setInitialSituation(example.situation);
        setMainProblem(example.problem);
        setSolution(example.solution);
        setResults(example.results);
      } finally {
        setLoading(false);
      }
    } else {
      // Para outros exemplos, usar dados estáticos
      setCompanyName(example.company);
      setBusinessType(example.type);
      setInitialSituation(example.situation);
      setMainProblem(example.problem);
      setSolution(example.solution);
      setResults(example.results);
    }
  };

  const clearForm = () => {
    setCompanyName('');
    setBusinessType('');
    setInitialSituation('');
    setMainProblem('');
    setSolution('');
    setResults('');
    setScript('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-lime-400/20">
              <img src="/logo.png" alt="AIGTX Logo" className="h-16 w-auto" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">
            <span className="text-lime-400">Studio</span>
            <span className="text-gray-400"> Criativo</span>
          </h1>
          <p className="text-gray-300 text-lg mb-1">Gerador de Roteiros de Storytelling para Negócios</p>
          <p className="text-lime-400/70 text-sm">Crie vídeos no estilo case de sucesso</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar - Examples */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl p-4 border border-lime-400/20">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="text-lime-400" size={20} />
                <h3 className="text-sm font-bold text-white">Exemplos</h3>
              </div>
              <div className="space-y-2">
                {examples.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => loadExample(example)}
                    className="w-full text-left text-xs bg-gray-800/50 hover:bg-gray-700/50 px-3 py-3 rounded-lg transition-all border border-gray-700 hover:border-lime-400/30 group"
                  >
                    <div className="font-semibold text-lime-400 mb-1 group-hover:text-lime-300">
                      {example.company}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {example.type}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-lime-400/10 to-lime-600/5 rounded-xl p-4 border border-lime-400/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="text-lime-400" size={18} />
                <h4 className="text-xs font-bold text-lime-400">Formato Klabin</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Storytelling estruturado com problema, solução e resultados mensuráveis.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4 grid lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 border border-lime-400/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Zap className="text-lime-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Informações do Case</h2>
                </div>
                {(companyName || businessType || initialSituation) && (
                  <button
                    onClick={clearForm}
                    className="text-xs text-gray-400 hover:text-gray-300 flex items-center gap-1"
                  >
                    <RotateCcw size={14} />
                    Limpar
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Nome da Empresa
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ex: Nubank, iFood, Magazine Luiza..."
                      className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-lime-400 focus:outline-none text-white placeholder-gray-500 text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && companyName) {
                          searchCompanyData();
                        }
                      }}
                    />
                    <button
                      onClick={searchCompanyData}
                      disabled={searchingCompany || !companyName}
                      className="px-4 py-3 bg-lime-400/20 border border-lime-400/40 text-lime-400 rounded-lg hover:bg-lime-400/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-semibold whitespace-nowrap"
                      title="Buscar dados da empresa na web"
                    >
                      {searchingCompany ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span className="hidden sm:inline">Buscando...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          <span className="hidden sm:inline">Buscar</span>
                        </>
                      )}
                    </button>
                  </div>
                  {searchingCompany && (
                    <p className="text-xs text-lime-400/70 mt-2">
                      Buscando informações públicas na web... Isso pode levar 15-30 segundos.
                    </p>
                  )}
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Tipo de Negócio
                  </label>
                  <input
                    type="text"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    placeholder="Ex: Startup tech, Restaurante, Consultoria..."
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-lime-400 focus:outline-none text-white placeholder-gray-500 text-sm"
                  />
                </div>

                {/* Initial Situation */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Situação Inicial
                  </label>
                  <textarea
                    value={initialSituation}
                    onChange={(e) => setInitialSituation(e.target.value)}
                    placeholder="Como estava a empresa antes? Contexto geral..."
                    rows="2"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-lime-400 focus:outline-none resize-none text-white placeholder-gray-500 text-sm"
                  />
                </div>

                {/* Main Problem */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Problema Principal
                  </label>
                  <textarea
                    value={mainProblem}
                    onChange={(e) => setMainProblem(e.target.value)}
                    placeholder="Qual era o maior desafio? Seja específico com números se possível..."
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-lime-400 focus:outline-none resize-none text-white placeholder-gray-500 text-sm"
                  />
                </div>

                {/* Solution */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Solução Aplicada <span className="text-gray-500">(opcional)</span>
                  </label>
                  <textarea
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="O que foi feito para resolver? Estratégias aplicadas..."
                    rows="2"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-lime-400 focus:outline-none resize-none text-white placeholder-gray-500 text-sm"
                  />
                </div>

                {/* Results */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Resultados Alcançados <span className="text-gray-500">(opcional)</span>
                  </label>
                  <textarea
                    value={results}
                    onChange={(e) => setResults(e.target.value)}
                    placeholder="Números, métricas, impacto real..."
                    rows="2"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-lime-400 focus:outline-none resize-none text-white placeholder-gray-500 text-sm"
                  />
                </div>

                {/* Format & Duration */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      Formato
                    </label>
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-lime-400 focus:outline-none text-white text-sm"
                    >
                      {Object.entries(formats).map(([key, val]) => (
                        <option key={key} value={key} className="bg-gray-800">
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      Duração
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-lime-400 focus:outline-none text-white text-sm"
                    >
                      <option value="30" className="bg-gray-800">30s</option>
                      <option value="60" className="bg-gray-800">60s</option>
                      <option value="90" className="bg-gray-800">90s</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={generateScript}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-lime-400 to-lime-500 text-gray-900 font-bold py-4 rounded-lg hover:from-lime-500 hover:to-lime-600 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-lime-400/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span className="text-sm">Gerando roteiro...</span>
                    </>
                  ) : (
                    <>
                      <Rocket size={20} />
                      <span className="text-sm">Gerar Roteiro Profissional</span>
                    </>
                  )}
                </button>

                {loading && (
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Isso pode levar 10-20 segundos</p>
                  </div>
                )}
              </div>
            </div>

            {/* Output Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 border border-lime-400/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BarChart3 className="text-lime-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Roteiro Gerado</h2>
                </div>
                {script && (
                  <button
                    onClick={() => setScript('')}
                    className="text-xs text-gray-400 hover:text-gray-300 flex items-center gap-1"
                  >
                    <RotateCcw size={14} />
                    Limpar
                  </button>
                )}
              </div>

              {script ? (
                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-lg p-4 max-h-[520px] overflow-y-auto border border-gray-700 custom-scrollbar">
                    <pre className="whitespace-pre-wrap text-xs text-gray-200 font-mono leading-relaxed">
                      {script}
                    </pre>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={copyToClipboard}
                      className="bg-lime-400 text-gray-900 font-semibold py-3 rounded-lg hover:bg-lime-500 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Copy size={16} />
                      Copiar
                    </button>
                    <button
                      onClick={downloadScript}
                      className="bg-gray-700 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Download size={16} />
                      Baixar
                    </button>
                  </div>

                  <div className="bg-lime-400/10 rounded-lg p-4 border border-lime-400/20">
                    <div className="flex items-start gap-2 mb-2">
                      <TrendingUp className="text-lime-400 flex-shrink-0 mt-0.5" size={16} />
                      <div>
                        <h3 className="text-xs font-bold text-lime-400 mb-1">Próximos Passos</h3>
                        <ul className="text-xs text-gray-300 space-y-1">
                          <li>Revise e ajuste detalhes específicos</li>
                          <li>Grave múltiplas versões do gancho inicial</li>
                          <li>Mantenha cortes rápidos a cada 3-5 segundos</li>
                          <li>Use legendas em todo o vídeo</li>
                          <li>Música de fundo: começa introspectiva, fica energética</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 text-gray-500">
                  <Video size={48} className="mb-4 opacity-20" />
                  <p className="text-sm mb-1 text-gray-400">Aguardando geração</p>
                  <p className="text-xs text-gray-500">Preencha os campos e gere seu roteiro</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl p-6 border border-lime-400/20">
          <h3 className="text-lg font-bold text-white mb-4">Estrutura de Storytelling Profissional</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4 border border-lime-400/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-lime-400/20 flex items-center justify-center">
                  <span className="text-lime-400 font-bold text-sm">1</span>
                </div>
                <h4 className="font-bold text-lime-400 text-sm">Gancho</h4>
              </div>
              <p className="text-xs text-gray-400">Prenda atenção nos 3 primeiros segundos</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-lime-400/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-lime-400/20 flex items-center justify-center">
                  <span className="text-lime-400 font-bold text-sm">2</span>
                </div>
                <h4 className="font-bold text-lime-400 text-sm">Problema</h4>
              </div>
              <p className="text-xs text-gray-400">Mostre o desafio com empatia e dados</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-lime-400/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-lime-400/20 flex items-center justify-center">
                  <span className="text-lime-400 font-bold text-sm">3</span>
                </div>
                <h4 className="font-bold text-lime-400 text-sm">Solução</h4>
              </div>
              <p className="text-xs text-gray-400">Apresente a transformação de forma natural</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-lime-400/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-lime-400/20 flex items-center justify-center">
                  <span className="text-lime-400 font-bold text-sm">4</span>
                </div>
                <h4 className="font-bold text-lime-400 text-sm">Resultado</h4>
              </div>
              <p className="text-xs text-gray-400">Números concretos e impacto mensurável</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`rounded-lg px-6 py-4 shadow-2xl border-2 ${
            toast.type === 'success' 
              ? 'bg-lime-400/95 border-lime-500 text-gray-900' 
              : 'bg-red-500/95 border-red-600 text-white'
          }`}>
            <p className="font-semibold text-sm">{toast.message}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.8);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(164, 210, 51, 0.6), rgba(164, 210, 51, 0.3));
          border-radius: 10px;
          border: 1px solid rgba(164, 210, 51, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(164, 210, 51, 0.8), rgba(164, 210, 51, 0.5));
        }
      `}</style>
    </div>
  );
}