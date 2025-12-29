import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

// 1. MUDANÇA: Usar variável de ambiente para segurança no Render
const API_KEY = process.env.API_KEY || "AIzaSyC3yNT-08Eh1BiHDAh5lYR5ZNPt80fChuI";

const fileManager = new GoogleAIFileManager(API_KEY);
const genAI = new GoogleGenerativeAI(API_KEY);

const upload = multer({ dest: 'uploads/' });

app.post('/analyze-video', upload.single('video'), async (req, res) => {
  if (!req.file) return res.status(400).send("Sem vídeo.");
  const videoPath = req.file.path;

  try {
    console.log(`🚀 Vídeo recebido: ${req.file.originalname}`);

    const uploadResult = await fileManager.uploadFile(videoPath, {
      mimeType: "video/mp4",
      displayName: "Aula Matematizando",
    });

    let file = await fileManager.getFile(uploadResult.file.name);
    // 2. MUDANÇA: Aumentei o tempo para 5 segundos para garantir que o Google processe na nuvem
    while (file.state === "PROCESSING") {
      process.stdout.write(".");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      file = await fileManager.getFile(uploadResult.file.name);
    }
    console.log("\n✅ Vídeo pronto no Google!");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: file.mimeType,
          fileUri: file.uri
        }
      },
      { text: "Aja como estrategista do canal Matematizando. Analise este vídeo detalhadamente, extraia os Pulos do Gato e gere o roteiro sugerido." }
    ]);

    fs.unlinkSync(videoPath);
    console.log("🔥 Sucesso! Enviando resposta...");
    res.json({ analysis: result.response.text() });

  } catch (error) {
    console.error("❌ ERRO:", error);
    if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
    res.status(500).json({ error: error.message });
  }
});

// 3. MUDANÇA: A porta deve ser dinâmica para o Render aceitar
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Servidor rodando na porta ${PORT}`));