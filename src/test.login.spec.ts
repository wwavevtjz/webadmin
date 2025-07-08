import { test, expect } from '@playwright/test';

test('ทดสอบการ login ด้วย username และ password และคลิกปุ่มเพิ่มข้อมูลบัญชี', async ({ page }) => {
  // ไปที่หน้า login
  await page.goto('https://admin-erp.supercoconut.net/login');

  // กรอกข้อมูล Username ในฟิลด์ที่มี id="outlined-basic"
  await page.locator('input#outlined-basic').fill('admin');  // กรอกชื่อผู้ใช้ 'admin'

  // คลิกปุ่มถัดไป (เพื่อไปสู่ฟิลด์ password)
  await page.locator('button:has-text("ถัดไป")').click();

  // รอให้ฟิลด์ Password ปรากฏ
  await page.waitForSelector('input#\\:r3\\:', { timeout: 90000 });  // รอให้ฟิลด์ Password ปรากฏ

  // กรอกรหัสผ่านในฟิลด์ Password
  await page.locator('input#\\:r3\\:').fill('Admin@1234');  // กรอกรหัสผ่าน 'Admin@1234'

  // คลิกปุ่มเข้าสู่ระบบ
  const [response] = await Promise.all([
    page.waitForNavigation({ timeout: 90000 }),  // รอให้หน้าโหลดหลังจากคลิกเข้าสู่ระบบ
    page.locator('button:has-text("เข้าสู่ระบบ")').click()  // คลิกปุ่ม "เข้าสู่ระบบ"
  ]);

  // ตรวจสอบว่า URL หลังจาก login เป็นหน้า Dashboard หรือหน้าที่คาดหวัง
  await expect(page).toHaveURL('https://admin-erp.supercoconut.net/');  // ตรวจสอบ URL หลังจาก login


  // หรือใช้คลาส CSS ในการเลือกปุ่ม
  // await page.locator('button.MuiButton-contained').click(); 

  // หรือใช้ XPath
  // await page.locator('//button[p="เพิ่มข้อมูลบัญชี"]').click();

  // หลังจากคลิกปุ่มแล้ว สามารถเพิ่มการตรวจสอบหรือการทดสอบเพิ่มเติมได้
});
