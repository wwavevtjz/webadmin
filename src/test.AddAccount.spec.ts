import { test, expect } from '@playwright/test';

test('ทดสอบสร้างสมาชิกร้านค้า', async ({ page }) => {
  // ไปที่หน้า login
  await page.goto('https://admin-erp.supercoconut.net/login');

  // กรอกข้อมูล Username
  await page.locator('input#outlined-basic').fill('admin');

  // คลิกปุ่มถัดไป
  await page.locator('button:has-text("ถัดไป")').click();

  // รอให้ฟิลด์ Password ปรากฏ
  await page.waitForSelector('input#\\:r3\\:', { timeout: 90000 });

  // กรอกรหัสผ่าน
  await page.locator('input#\\:r3\\:').fill('Admin@1234');

  // คลิกปุ่มเข้าสู่ระบบ
  const [response] = await Promise.all([
    page.waitForNavigation({ timeout: 90000 }),
    page.locator('button:has-text("เข้าสู่ระบบ")').click(),
  ]);

  // ตรวจสอบว่า URL หลังจาก login เป็นหน้า Dashboard หรือหน้าที่คาดหวัง
  await expect(page).toHaveURL('https://admin-erp.supercoconut.net/');

  // คลิกปุ่ม "เพิ่มข้อมูลบัญชี"
  await page.locator('button:has-text("เพิ่มข้อมูลบัญชี")').click();

  // กรอกข้อมูลในฟิลด์ "ระบุ Owner Name"
  await page.locator('input[placeholder="ระบุ Owner Name"]').fill('John Wick');
  await page.locator('input[placeholder="ระบุรหัสร้านค้า"]').fill('1234567890');
  await page.locator('input[placeholder="ระบุประเภทร้านค้า"]').fill('ร้านค้าอาหาร');
  await page.locator('input[placeholder="กรุณาระบุเบอร์โทร"]').fill('0912345678');
  await page.locator('input[name="email"]').fill('test@example.com');
  await page.locator('input[placeholder="กรุณาระบุรหัสผ่าน"]').fill('Password@123');
  await page.locator('input[placeholder="กรุณาระบุ username "]').fill('johnwick123');
  await page.locator('input[placeholder="กรุณาระบุยืนยันรหัสผ่าน"]').fill('Password@123');

  // คลิกปุ่ม "เพิ่มสาขา"
  await page.locator('button:has-text("เพิ่มสาขา")').click();

  // กรอกข้อมูลในฟิลด์ "กรุณาระบุชื่อสาขา"
  await page.locator('input[placeholder="กรุณาระบุชื่อสาขา"]').fill('สาขาใหม่');

  // รอให้ฟิลด์ "กรุณาระบุประเภทสาขา" ปรากฏ และคลิกเพื่อเปิดรายการ
  await page.locator('input[placeholder="กรุณาระบุประเภทสาขา"]').click();

  // รอให้ตัวเลือกในรายการปรากฏ
  await page.waitForSelector('ul[role="listbox"]', { timeout: 90000 });

  // เลือกประเภทสาขาจากรายการ (สมมติว่าเลือกตัวเลือกแรก)
  await page.locator('ul[role="listbox"] li').first().click();

  // กรอกข้อมูลในฟิลด์ "กรุณาระบุรหัสสาขา"
  await page.locator('input[placeholder="กรุณาระบุรหัสสาขา"]').fill('S0001');

  // กรอกข้อมูลในฟิลด์ "กรุณาระบุที่อยู่"
  await page.locator('input[placeholder="กรุณาระบุที่อยู่"]').fill('123 ถนนสุขุมวิท แขวงบางนา กรุงเทพฯ');

  // กรอกเบอร์โทร
  await page.locator('input[placeholder="กรุณาระบุเบอร์โทร"]').fill('0912345678');

  // บัญชีผู้ใช้สาขา
  await page.locator('input[placeholder="กรุณาระบุชื่อบัญชีผู้ใช้ (Username)"]').fill('user123');
  await page.locator('input[placeholder="กรุณาระบุรหัสผ่าน"]').fill('NewPassword@123');

  // เลือกแพ็คเกจ 
  await page.locator('input[value="2fed4c0e16564847825fef398f142618"]').click(); // เลือก "Starter"

  // ตรวจสอบว่าแพ็คเกจที่เลือกมีการเช็คแล้ว
  await expect(page.locator('input[value="2fed4c0e16564847825fef398f142618"]')).toBeChecked();

  // เพิ่มส่วนของการเลือกบริการ
  // คลิกที่ฟิลด์เลือกบริการ
  await page.locator('input#\\:r14\\:').click();

  // รอให้ตัวเลือกในรายการบริการปรากฏ
  await page.waitForSelector('ul[role="listbox"]', { timeout: 90000 });

  // เลือกบริการจากรายการ (สมมติว่าเลือกตัวเลือกแรก)
  await page.locator('ul[role="listbox"] li').first().click();

  // หยุดทดสอบไว้ที่นี่เพื่อให้คุณตรวจสอบผลในเบราว์เซอร์ก่อน
  await page.pause();
});
