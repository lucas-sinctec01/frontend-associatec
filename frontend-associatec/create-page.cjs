const fs = require("fs");
const path = require("path");

const feature = process.argv[2];
const page = process.argv[3];

if (!feature || !page) {
  console.error("❌ Você precisa informar a feature e o nome da página.");
  console.error("📌 Ex: npm run create:page associados AssociadosConsulta");
  process.exit(1);
}

const basePath = path.join(__dirname, "src", "features", feature, "pages", page);

// Pastas internas da página
const folders = [
  "components",
  "hooks",
  "types",
];

// Cria diretório base da página e subpastas
fs.mkdirSync(basePath, { recursive: true });

folders.forEach((folder) => {
  const fullPath = path.join(basePath, folder);
  fs.mkdirSync(fullPath, { recursive: true });
  console.log(`📁 Criado: ${fullPath}`);
});

// Cria o index.tsx básico
const indexPath = path.join(basePath, "index.tsx");
fs.writeFileSync(indexPath, `// Página ${page}
import React from "react";

const ${page} = () => {
  return <div>${page}</div>;
};

export default ${page};
`);

console.log(`🚀 Página "${page}" criada dentro de "features/${feature}/pages"`);
