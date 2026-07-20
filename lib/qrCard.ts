import QRCode from "qrcode";
import sharp from "sharp";

/**
 * Renders a printable "table tent" card: white rounded card, the QR code,
 * a brand accent bar, and the table number + seat count underneath.
 * Used for email attachments — mirrors the client-side canvas version
 * rendered in the admin Business Supplies page.
 */
export async function buildQrCardBuffer(
  qrValue: string,
  tableNumber: string | number,
  capacity: number
): Promise<Buffer> {
  const qrPngBuffer = await QRCode.toBuffer(qrValue, { width: 480, margin: 1 });
  const qrBase64 = qrPngBuffer.toString("base64");

  const W = 640;
  const H = 880;
  const qrSize = 464;
  const qrX = (W - qrSize) / 2;
  const qrY = 72;
  const barW = 88;
  const barH = 8;
  const barY = qrY + qrSize + 44;
  const labelY = barY + barH + 48;
  const numberY = labelY + 90;
  const seatsY = numberY + 44;
  const seatLabel = `${capacity} seat${capacity !== 1 ? "s" : ""}`;

  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect x="16" y="16" width="${W - 32}" height="${H - 32}" rx="48" fill="#FFFFFF" stroke="#E7E5E4" stroke-width="2"/>
  <image x="${qrX}" y="${qrY}" width="${qrSize}" height="${qrSize}" href="data:image/png;base64,${qrBase64}" xlink:href="data:image/png;base64,${qrBase64}"/>
  <rect x="${(W - barW) / 2}" y="${barY}" width="${barW}" height="${barH}" rx="4" fill="#16A34A"/>
  <text x="${W / 2}" y="${labelY}" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="4" fill="#A8A29E">TABLE</text>
  <text x="${W / 2}" y="${numberY}" text-anchor="middle" font-family="Arial, sans-serif" font-size="84" font-weight="700" fill="#1C1917">${tableNumber}</text>
  <text x="${W / 2}" y="${seatsY}" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" font-weight="500" fill="#78716C">${seatLabel}</text>
</svg>`;

  return sharp(Buffer.from(svg)).png().toBuffer();
}
