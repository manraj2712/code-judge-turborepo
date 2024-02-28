import path from "path";

function getCompletePath(fileName: string): string {
  return path.resolve().replace(/\\/g, "/").concat(`/${fileName}`);
}

function getUnixPath(path: string): string {
  return path.replace(/\\/g, "/");
}

function joinPath(...paths: string[]): string {
  return path.join(...paths);
}

export { getCompletePath, joinPath, getUnixPath };
