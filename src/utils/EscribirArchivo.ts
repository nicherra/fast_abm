import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";

export async function escribirArchivo(path, contents) {
  try {
    await writeTextFile({
      path: path,
      contents: contents,
      directory: BaseDirectory.Document, // Puedes usar: Desktop, Download, App, etc.
    });
    alert("Archivo guardado correctamente.");
  } catch (err) {
    console.error("Error al escribir archivo:", err);
    alert("Hubo un error al guardar el archivo.");
  }
}
