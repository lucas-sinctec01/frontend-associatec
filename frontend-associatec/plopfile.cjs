const fs = require('fs');
const path = require('path');

module.exports = function (plop) {
  // Helper para PascalCase
  plop.setHelper('pascalCase', (txt) => {
    return txt.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()).replace(/\s/g, '');
  });

  // Generator de Feature
  plop.setGenerator('feature', {
    description: 'Cria uma nova feature com estrutura base',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nome da feature (ex: associados):',
      },
    ],
    actions: function (data) {
      const base = `src/features/${data.name}`;
      const dirs = ['hooks', 'pages', 'services', 'types'];

      // Criação apenas de pastas, sem .gitkeep
      const createFolders = () => {
        dirs.forEach((dir) => {
          const fullPath = path.join(base, dir);
          if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
          }
        });
        return 'Pastas criadas com sucesso!';
      };

      return [
        createFolders,
        {
          type: 'add',
          path: `${base}/routes.tsx`,
          template: `// Rotas da feature {{name}}
import React from "react";
import type { RouteObject } from "react-router-dom";

export const {{camelCase name}}Routes: RouteObject[] = [
  // Páginas serão inseridas aqui
];
`,
        },
        {
          type: 'modify',
          path: 'src/routes/features.tsx',
          pattern: /(\/\/ PLOP_INJECT_IMPORT)/g,
          template: 'import { {{camelCase name}}Routes } from "../features/{{name}}/routes";\n$1',
        },
        {
          type: 'modify',
          path: 'src/routes/features.tsx',
          pattern: /(\/\/ PLOP_INJECT_ROUTES)/g,
          template: '  ...{{camelCase name}}Routes,\n$1',
        },
      ];
    },
  });

  // Generator de Page
  plop.setGenerator('page', {
    description: 'Cria uma nova página dentro de uma feature',
    prompts: [
      { type: 'input', name: 'feature', message: 'Nome da feature (ex: associados):' },
      { type: 'input', name: 'name', message: 'Nome da página (ex: AssociadosConsulta):' },
    ],
    actions: function (data) {
      const base = `src/features/${data.feature}/pages/${data.name}`;
      const dirs = ['components', 'hooks', 'services', 'types'];

      const createPageFolders = () => {
        dirs.forEach((dir) => {
          const fullPath = path.join(base, dir);
          if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
          }
        });
        return 'Subpastas da página criadas!';
      };

      return [
        createPageFolders,
        {
          type: 'add',
          path: `${base}/index.tsx`,
          template: `import React from "react";

const {{pascalCase name}} = () => {
  return <div>{{pascalCase name}} Page</div>;
};

export default {{pascalCase name}};`,
        },
        // 1. INSERE O IMPORT DA PAGE
        {
          type: 'modify',
          path: `src/features/{{feature}}/routes.tsx`,
          pattern: /(\/\/ Rotas da feature.*)/g,
          template: 'import {{pascalCase name}} from "./pages/{{name}}";\n$1',
        },
        // 2. INSERE O OBJETO DA NOVA ROTA
        {
          type: 'modify',
          path: `src/features/{{feature}}/routes.tsx`,
          pattern: /(export const .*Routes: RouteObject\[] = \[)/g,
          template: `$1
  {
    path: "/{{feature}}/{{lowerCase name}}",
    element: <{{pascalCase name}} />
  },`,
        },
      ];
    },
  });
};
