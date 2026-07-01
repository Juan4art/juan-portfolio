const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inDir = '/Users/juan/.gemini/antigravity-ide/brain/59e87645-a875-492a-8bce-98b92c1575b8';
const outDir = '/Users/juan/Documents/blustoodio/Porfolio/portfolio/public/images';

const files = [
  'media__1782781241201.png',
  'media__1782781241378.jpg',
  'media__1782781242709.jpg',
  'media__1782781242722.jpg'
];

async function run() {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inPath = path.join(inDir, file);
    const outPath = path.join(outDir, `Faro${i + 1}.webp`);
    
    await sharp(inPath)
      .webp({ quality: 100, lossless: true })
      .toFile(outPath);
      
    console.log(`Converted ${file} to Faro${i + 1}.webp`);
  }
}

run().catch(console.error);
