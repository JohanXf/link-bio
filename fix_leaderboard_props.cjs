const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace unsafe user property accesses
code = code.replace(/window\.open\(\`\/\$\{user\.username\}\`, "_blank"\)/g, 'window.open(`/${user?.username || ""}`, "_blank")');
code = code.replace(/\{user\.name \|\| user\.username\}/g, '{user?.name || user?.username || "Anonymous"}');
code = code.replace(/prophile\.bio\/\{user\.username\}/g, 'prophile.bio/{user?.username || "unknown"}');

fs.writeFileSync('src/App.tsx', code);
