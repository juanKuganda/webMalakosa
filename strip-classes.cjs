const fs = require('fs');

function strip(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove custom styling that conflicts with Shadcn base styles
  const classesToRemove = [
    'bg-white', 'bg-gray-50', 'px-4', 'py-3', 'py-4', 'rounded-xl', 'rounded-2xl',
    'border', 'border-zinc-300', 'border-gray-200', 'focus:outline-none',
    'focus:border-[#012d1d]', 'focus:bg-white', 'focus:ring-2', 'focus:ring-[#0e6c4a]',
    'transition-all', 'text-gray-900', 'text-[#012d1d]'
  ];

  classesToRemove.forEach(cls => {
    // regex to match whole word
    const regex = new RegExp(`\\b${cls}\\b\\s*`, 'g');
    content = content.replace(regex, '');
  });
  
  fs.writeFileSync(filePath, content);
}
strip('app/(cms)/admin/page.tsx');
strip('app/(cms)/admin/login/page.tsx');
