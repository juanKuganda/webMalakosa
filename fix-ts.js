const fs = require('fs');
let content = fs.readFileSync('app/(cms)/admin/page.tsx', 'utf8');

// Fix borderClass
content = content.replace(/borderClass:\s*"[^"]+",\s*/g, '');

// Fix agriculturalLand -> productiveLandArea
content = content.replace(/agriculturalLand/g, 'productiveLandArea');

// Fix agriculturalActivePercent -> iotActivePercent
content = content.replace(/agriculturalActivePercent/g, 'iotActivePercent');

// Remove heroImageUrl block
const blockRegex = /<div className="bg-\[#f6f3f2\] p-5 rounded-2xl border border-zinc-200 space-y-3">\s*<Label className="block text-xs font-bold font-mono text-\[#012d1d\] uppercase">\s*URL Gambar Hero \(Hero Image\)\s*<\/Label>[\s\S]*?<\/div>/;
content = content.replace(blockRegex, '');

fs.writeFileSync('app/(cms)/admin/page.tsx', content);
