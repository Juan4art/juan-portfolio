const fs = require('fs');
const path = require('path');

const projectRoot = '/Users/juan/Documents/blustoodio/Porfolio/portfolio';

function replaceInFile(filePath, replacements) {
  const fullPath = path.join(projectRoot, filePath);
  let content = fs.readFileSync(fullPath, 'utf-8');
  let originalContent = content;
  
  for (const [target, replacement] of replacements) {
    content = content.replace(target, replacement);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

// 1. index.html
replaceInFile('index.html', [
  [/https:\/\/juan-portfolio-six\.vercel\.app\//g, 'https://juanmerla.com/']
]);

// 2. App.vue - Add copyright and aria-label
replaceInFile('src/App.vue', [
  [
    /<button\n\s*class="lang-toggle/g,
    '<button\n      aria-label="Toggle language"\n      class="lang-toggle'
  ],
  [
    /<\/main>/g,
    `</main>\n\n    <!-- Copyright Footer -->\n    <div class="fixed bottom-4 left-4 md:bottom-6 md:left-8 z-[100] text-[9px] tracking-[0.15em] uppercase font-mono text-white/30 pointer-events-none transition-opacity duration-500" :class="(isHeaderHidden || forceHideHeader) ? 'opacity-0' : 'opacity-100'">\n      &copy; {{ new Date().getFullYear() }} Juan Merla\n    </div>`
  ]
]);

// 3. FreestyleMarqueeGallery.vue
replaceInFile('src/components/FreestyleMarqueeGallery.vue', [
  [/<img :src="item\.gallery\[0\]"/g, '<img :src="item.gallery[0]" :alt="item.title"']
]);

// 4. HorizontalRectGallery.vue
replaceInFile('src/components/HorizontalRectGallery.vue', [
  [
    /<img\n\s+:src="img"/g,
    '<img \n            :src="img" \n            :alt="cat?.title || \'Gallery Image\'"'
  ],
  [
    /<img :src="img" class="w-full h-auto/g,
    '<img :src="img" :alt="cat?.title || \'Project Image\'" class="w-full h-auto'
  ]
]);

// 5. CategoryView.vue
replaceInFile('src/components/pages/CategoryView.vue', [
  [
    /<img\n\s+:src="item\.cover"/g,
    '<img \n              :src="item.cover" \n              :alt="item.title"'
  ]
]);

// 6. HomeView.vue
replaceInFile('src/components/pages/HomeView.vue', [
  [
    /<img src="\/JeansFront\.webp" class="absolute/g,
    '<img src="/JeansFront.webp" alt="Jeans Background Texture" class="absolute'
  ]
]);

// 7. PlaylistView.vue
replaceInFile('src/components/pages/PlaylistView.vue', [
  [
    /<img :src="`https:\/\/img\.youtube\.com\/vi\/\$\{currentTrack\.videoId\}\/mqdefault\.jpg`"/g,
    '<img :src="`https://img.youtube.com/vi/${currentTrack.videoId}/mqdefault.jpg`" :alt="currentTrack.title"'
  ],
  [
    /<img :src="`https:\/\/img\.youtube\.com\/vi\/\$\{track\.videoId\}\/mqdefault\.jpg`" class="w-full h-full/g,
    '<img :src="`https://img.youtube.com/vi/${track.videoId}/mqdefault.jpg`" :alt="track.title" class="w-full h-full'
  ]
]);

// 8. PoemNarrativeView.vue
replaceInFile('src/components/PoemNarrativeView.vue', [
  [
    /<img :src="img" :class="\['w-full h-auto/g,
    '<img :src="img" :alt="activeItem?.title || \'Publishing Image\'" :class="[\'w-full h-auto'
  ]
]);

console.log("Accessibility and Copyright fixes applied.");
