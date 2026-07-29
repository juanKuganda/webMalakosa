const fs = require('fs');

function safeRefactor(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add imports if they don't exist
  const imports = `import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";\n`;
  
  if (!content.includes('import { Input }')) {
    content = imports + content;
  }

  // Replace tags (case-sensitive to avoid replacing already replaced ones if any)
  content = content.replace(/<input\b/g, '<Input');
  content = content.replace(/<\/input>/g, '</Input>');
  
  content = content.replace(/<textarea\b/g, '<Textarea');
  content = content.replace(/<\/textarea>/g, '</Textarea>');
  
  content = content.replace(/<label\b/g, '<Label');
  content = content.replace(/<\/label>/g, '</Label>');
  
  // Fix TS inferences
  content = content.replace(/onChange=\{\(e\) =>/g, 'onChange={(e: any) =>');
  
  fs.writeFileSync(filePath, content);
  console.log('Safely refactored', filePath);
}

safeRefactor('app/(cms)/admin/page.tsx');
safeRefactor('app/(cms)/admin/login/page.tsx');
