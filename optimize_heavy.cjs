const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = '/Users/juan/Documents/blustoodio/Porfolio/portfolio/public/images';

async function processImages() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));

  for (const file of files) {
    const inputPath = path.join(dir, file);
    const stats = fs.statSync(inputPath);
    
    // Process files larger than 1.5MB
    if (stats.size > 1.5 * 1024 * 1024) {
      console.log(`Processing ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
      const tempPath = path.join(dir, 'temp_' + file);
      
      try {
        const metadata = await sharp(inputPath).metadata();
        let resizeOptions = {};
        
        // Resize only if it's larger than 2560 on either side (high-res standard)
        if (metadata.width > 2560 || metadata.height > 2560) {
          if (metadata.width > metadata.height) {
            resizeOptions = { width: 2560 };
          } else {
            resizeOptions = { height: 2560 };
          }
        }

        await sharp(inputPath)
          .resize(resizeOptions.width || null, resizeOptions.height || null, {
            withoutEnlargement: true
          })
          .webp({ quality: 85, smartSubsample: true })
          .toFile(tempPath);
          
        fs.renameSync(tempPath, inputPath);
        
        const newStats = fs.statSync(inputPath);
        console.log(`Finished ${file}: new size ${(newStats.size / 1024 / 1024).toFixed(2)} MB`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
  }
}

processImages();
