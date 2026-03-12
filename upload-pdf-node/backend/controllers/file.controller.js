import { parseCV } from "../services/file.service.js";
import { saveCandidate } from "../db/connection.js";

export const storeFile = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file received" });
  }

  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: file.buffer });
  const data = await parser.getText();
  await parser.destroy();

  const parsedCV = await parseCV(data.text);
  const candidate = JSON.parse(parsedCV);

  const insert = await saveCandidate(candidate);

  res.json({
    message: "File received",
    text: data.text,
    candidate: insert,
  });
};
