import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
await mkdir('public', { recursive: true });
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0c1117"/><path d="M70 90H1130M70 550H1130" stroke="#424449"/><text x="70" y="65" fill="#c4a572" font-family="Arial" font-size="17" letter-spacing="4">HARYSHWA NAIR / CYBERSECURITY</text><text x="70" y="265" fill="#f4f0e8" font-family="Georgia" font-size="103">Security, built</text><text x="70" y="385" fill="#c4a572" font-family="Georgia" font-style="italic" font-size="103">with intent.</text><text x="73" y="470" fill="#b5bdc7" font-family="Arial" font-size="23">Practical tools. Thoughtful automation. Visible reasoning.</text><text x="70" y="590" fill="#b5bdc7" font-family="Arial" font-size="17">SECURITY ENGINEERING · AUTOMATION · APPLIED AI</text><path d="M990 200h100v100H990zM1010 220h60v60h-60zM1040 170v30m0 100v30m-80-80h30m100 0h30" fill="none" stroke="#c4a572" stroke-width="2"/></svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/opengraph-image.png');
console.log('Generated 1200 × 630 sharing image.');
