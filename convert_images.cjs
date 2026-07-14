const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = '/Users/juan/Documents/blustoodio/Porfolio/portfolio/dist/images/Exp';
const outputDir = '/Users/juan/Documents/blustoodio/Porfolio/portfolio/public/images';

async function processImages() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    
    // Map GD_doom.png to Doom_1.webp
    let outputName = file.replace('.png', '.webp');
    if (file === 'GD_doom.png') {
      outputName = 'Doom_1.webp';
    }
    
    const outputPath = path.join(outputDir, outputName);

    try {
      await sharp(inputPath)
        .webp({ quality: 90 }) // High quality WebP optimization
        .toFile(outputPath);
      console.log(`Converted ${file} to ${outputName}`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
}

processImages();
