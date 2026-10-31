# ตั้งค่าระบบรับสมัคร (Google Sheet + Drive)

หน้า `/enroll` บนเว็บจะส่งข้อมูลผู้สมัครกับสลิปมาที่ Google Apps Script ตัวนี้
สคริปต์จะบันทึกสลิปลงโฟลเดอร์ใน Drive แล้วเพิ่มแถวลง Google Sheet ให้อัตโนมัติ

- เรียนสด → แท็บ `Private` ใน Sheet, สลิปไปที่โฟลเดอร์ `private`
- เรียนคลิปออนไลน์ → แท็บ `Online` ใน Sheet, สลิปไปที่โฟลเดอร์ `online`
- คอลัมน์ใช้ชื่อเดียวกับฟอร์มเดิม (ชื่อ-สกุล จริง, ชื่อเล่น, เบอร์โทรศัพท์, อายุ ฯลฯ) มีลิงก์สลิป และช่อง `สถานะ` (เริ่มต้นเป็น `รอตรวจสลิป`) ไว้แก้เองหลังตรวจ

ทำครั้งเดียว ใช้เวลาประมาณ 10 นาที

## 1. เตรียม Sheet กับโฟลเดอร์

1. สร้าง Google Sheet ใหม่ 1 อัน (เช่น `NA TRADES – Enrollments`) แล้ว copy ID จาก URL
   `https://docs.google.com/spreadsheets/d/`**`ตรงนี้คือ ID`**`/edit`
2. ในโฟลเดอร์ Drive หลัก สร้างโฟลเดอร์ย่อย `private` กับ `online` แล้ว copy ลิงก์ของแต่ละโฟลเดอร์ไว้
   (ใส่ทั้งลิงก์ได้เลย เว็บจะดึง ID ออกมาเอง)

## 2. สร้างสคริปต์

1. ไปที่ <https://script.google.com> → **New project** ตั้งชื่อ `NA TRADES Enroll`
2. ลบโค้ดเดิมออก แล้ววางโค้ดจากไฟล์ [`Code.gs`](./Code.gs) ทั้งหมด → กด 💾 Save
3. ไปที่ ⚙️ **Project Settings** → **Script Properties** → **Add script property**
   - Property: `SECRET`
   - Value: รหัสลับยาว ๆ ที่ตั้งเอง (สุ่มได้ที่ <https://www.uuidgenerator.net>) **เก็บไว้ใช้ในข้อ 4**
4. กลับไปหน้า Editor เลือกฟังก์ชัน `authorize` แล้วกด ▶ Run → กด **Review permissions** → เลือกบัญชี → **Advanced** → **Go to NA TRADES Enroll** → **Allow**

## 3. Deploy เป็น Web app

1. กด **Deploy** → **New deployment** → ⚙️ เลือก **Web app**
2. ตั้งค่า
   - Execute as: **Me**
   - Who has access: **Anyone**
3. กด **Deploy** แล้ว copy **Web app URL** (ลงท้ายด้วย `/exec`)

> ถ้าแก้โค้ดทีหลัง ต้องไปที่ **Deploy → Manage deployments → ✏️ → Version: New version → Deploy** URL จะยังเป็นอันเดิม

## 4. ใส่ค่าใน Vercel

Vercel → Project `na-trades` → **Settings → Environment Variables** แล้วเพิ่ม

| Key | ค่า |
| --- | --- |
| `NUXT_GAS_URL` | Web app URL จากข้อ 3 |
| `NUXT_GAS_SECRET` | รหัสลับเดียวกับ `SECRET` ในข้อ 2 |
| `NUXT_SHEET_ID` | ID ของ Google Sheet (หรือทั้งลิงก์) |
| `NUXT_DRIVE_FOLDER_PRIVATE` | ลิงก์โฟลเดอร์ `private` |
| `NUXT_DRIVE_FOLDER_ONLINE` | ลิงก์โฟลเดอร์ `online` |
| `NUXT_PUBLIC_ENROLL_ENABLED` | `true` (ปุ่ม Join ทุกปุ่มจะพาไปหน้า `/enroll`) |
| `NUXT_PUBLIC_PRICE_PRIVATE` | ราคาเรียนสด เช่น `15900` |
| `NUXT_PUBLIC_PRICE_ONLINE` | ราคาคลิปออนไลน์ เช่น `4990` |
| `NUXT_PUBLIC_BANK_NAME` | ชื่อธนาคาร |
| `NUXT_PUBLIC_BANK_ACCOUNT_NO` | เลขบัญชี |
| `NUXT_PUBLIC_BANK_ACCOUNT_NAME` | ชื่อบัญชี |
| `NUXT_PUBLIC_LINE_LINK` | ลิงก์ LINE สำหรับปุ่ม "ทักผม" (ไม่บังคับ) |

กด **Save** แล้ว **Redeploy** 1 ครั้ง

## 5. ทดสอบ

เปิด `https://<เว็บ>/enroll` กรอกข้อมูลทดลอง แนบรูปอะไรก็ได้ แล้วกดส่ง
ต้องเห็นแถวใหม่ใน Sheet และไฟล์ใหม่ในโฟลเดอร์ ถ้าไม่เข้า ดู log ได้ที่ Apps Script → **Executions**

## ความปลอดภัย

- `NUXT_GAS_SECRET`, `NUXT_GAS_URL`, ID ของ Sheet และโฟลเดอร์ อยู่ฝั่งเซิร์ฟเวอร์เท่านั้น ผู้ใช้มองไม่เห็น
- เว็บตรวจไฟล์จากเนื้อไฟล์จริง (รับเฉพาะ JPG/PNG/WEBP/PDF ไม่เกิน 4 MB) และจำกัดการส่งซ้ำต่อ IP
- ข้อความที่ขึ้นต้นด้วย `=`, `+`, `-`, `@` จะถูกบันทึกเป็นข้อความธรรมดา ไม่กลายเป็นสูตรใน Sheet
- สลิปเก็บเป็นไฟล์ส่วนตัวใน Drive ของคุณ ไม่ได้แชร์สาธารณะ
