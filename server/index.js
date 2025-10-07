import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/generate-script', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "AIGTX Script Generator"
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet", // Modelo grátis/barato
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    // OpenRouter retorna no formato diferente
    const scriptText = data.choices[0].message.content;
    
    res.json({ content: [{ text: scriptText }] });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error.message || 'Erro ao gerar roteiro' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});