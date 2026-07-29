const fs = require('fs');

function refactorFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add imports
  if (!content.includes('import { Input }')) {
    content = content.replace('import React', 'import { Input } from "@/components/ui/input";\nimport { Textarea } from "@/components/ui/textarea";\nimport { Label } from "@/components/ui/label";\nimport React');
  }

  // Replace tags
  content = content.replace(/<input\b/g, '<Input');
  content = content.replace(/<\/input>/g, '</Input>');
  content = content.replace(/<textarea\b/g, '<Textarea');
  content = content.replace(/<\/textarea>/g, '</Textarea>');
  
  // Replace labels
  content = content.replace(/<label\b/g, '<Label');
  content = content.replace(/<\/label>/g, '</Label>');
  
  fs.writeFileSync(filePath, content);
  console.log('Refactored', filePath);
}

refactorFile('app/(cms)/admin/page.tsx');
refactorFile('app/(cms)/admin/login/page.tsx');
