import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false, // เปิดโหมด headful เพื่อให้เห็นหน้าต่างเบราว์เซอร์
    viewport: { width: 1280, height: 800 }, // ขนาดหน้าจอเบราว์เซอร์
  },
});
