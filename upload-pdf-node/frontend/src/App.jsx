import { useRef, useState } from "react";
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/file";

const App = () => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const setSelectedFile = (selectedFile) => {
    if (!selectedFile) return;

    const isPdf =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setError("Solo se permiten archivos PDF");
      setFile(null);
      return;
    }

    setError(null);
    setResponse(null);
    setFile(selectedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setSelectedFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    setSelectedFile(droppedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    if (!file) {
      setError("Selecciona un archivo primero");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("No se pudo subir el archivo");
      }

      const data = await res.json();
      const candidateText = data.candidate?.email
        ? `Nombre: ${data.candidate.name} / Email: ${data.candidate.email}`
        : null;

      setResponse(
        candidateText ? `${data.message}: ${candidateText}` : data.message,
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-sky-50 via-white to-indigo-50 px-5 py-10 text-slate-900">
      <section className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_18px_50px_rgba(13,38,76,0.12)] backdrop-blur">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-800">
          Subir PDF
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Arrastra tu archivo o selecciónalo manualmente.
        </p>

        <form method="post" className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
              isDragging
                ? "border-sky-500 bg-sky-50"
                : "border-slate-300 bg-slate-50 hover:border-sky-400 hover:bg-sky-50/60"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,application/pdf"
              name="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-base font-medium text-slate-700">
              Arrastra y suelta tu PDF aqui
            </p>
            <p className="mt-1 text-sm text-slate-500">
              o haz clic para elegir un archivo
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-sm text-slate-600">
              {file ? `Seleccionado: ${file.name}` : "Aun no hay archivo"}
            </p>
            <button
              type="submit"
              disabled={isLoading || !file}
              className="rounded-xl bg-sky-500 px-5 py-2.5 font-medium text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isLoading ? "Subiendo..." : "Enviar PDF"}
            </button>
          </div>
        </form>

        {response && (
          <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {response}
          </p>
        )}
        {error && (
          <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        )}
      </section>
    </main>
  );
};

export default App;
