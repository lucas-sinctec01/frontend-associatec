const fs = require("fs");
const path = require("path");

const feature = process.argv[2];

if (!feature) {
  console.error("❌ Você precisa informar o nome da feature.");
  console.error("📌 Ex: npm run create:feature associados");
  process.exit(1);
}

const basePath = path.join(__dirname, "src", "features", feature);

const folders = [
  "components",
  "hooks",
  "services",
  "types",
  "pages",
];

folders.forEach((folder) => {
  const fullPath = path.join(basePath, folder);
  fs.mkdirSync(fullPath, { recursive: true });
  console.log(`📁 Criado: ${fullPath}`);
});

console.log(`🚀 Feature "${feature}" criada com sucesso!`);
