# Web Development & CI/CD Lab: GitHub Actions + GitHub Pages

**ชื่อ-นามสกุล:** Kittipong Nitsaisook  
**รหัสนิสิต:** 67160316  
**Repository:** [https://github.com/kittipongnitsaisook/webdev-actions-lab](https://github.com/kittipongnitsaisook/webdev-actions-lab)  
**GitHub Pages URL:** [https://kittipongnitsaisook.github.io/webdev-actions-lab/](https://kittipongnitsaisook.github.io/webdev-actions-lab/)  

---

## สรุปการดำเนินงานตามแบบฝึกหัด (Exercises)

- [x] **Exercise 1 (พื้นฐาน):** ปรับชื่อ–รหัสนิสิต (`Kittipong Nitsaisook`, `67160316`) และข้อความต้อนรับใน `index.html`
- [x] **Exercise 2 (UI):** ออกแบบหน้าเว็บให้มีโครงสร้างอย่างน้อย 3 ส่วน ได้แก่:
  1. **About Me:** ข้อมูลส่วนตัว ความสนใจทางด้าน Web Development
  2. **Skills:** ทักษะและเทคโนโลยีที่ใช้ (HTML5, CSS3, JS, Git, GitHub Actions, CI/CD)
  3. **Contact:** ช่องทางติดต่อ (GitHub Profile, Repository, Email)
- [x] **Exercise 3 (JavaScript):** เพิ่มปุ่มสลับธีม (Light / Dark Mode Toggle) พร้อมจำสถานะผ่าน `localStorage` และปุ่มสุ่มข้อความแรงบันดาลใจ (Dynamic Inspiration Quotes) ควบคู่กับปุ่ม Say Hello เดิม
- [x] **Exercise 4 (Automation):** อธิบายการทำงานของ GitHub Actions Workflow (ดูรายละเอียดด้านล่าง)
- [x] **Challenge (เพิ่มเติม):** เพิ่มขั้นตอนตรวจสอบความถูกต้องของไฟล์ `index.html` ก่อน Deploy ด้วยคำสั่ง `test -f index.html` ในไฟล์ `.github/workflows/deploy.yml`

---

## Exercise 4: คำอธิบายการทำงานของ Workflow

### 1. Workflow จะเริ่มทำงานเมื่อใด (Trigger)?
Workflow ถูกกำหนดเงื่อนไขการทำงานในส่วน `on:` ดังนี้:
1. **`push: branches: [main]`**: จะเริ่มทำงานโดยอัตโนมัติทุกครั้งที่มีการ `git push` โค้ดใหม่เข้ามายัง Branch `main`
2. **`workflow_dispatch`**: อนุญาตให้ผู้ดูแลระบบสามารถสั่งกด Run Workflow ด้วยตนเองได้แบบ Manual ผ่านหน้าเว็บไซต์ GitHub Actions

### 2. Job `deploy` ทำหน้าที่อะไรในแต่ละขั้นตอน (Steps)?
Job `deploy` รันบนเครื่องจำลองระบบปฏิบัติการ Ubuntu (`ubuntu-latest`) โดยมีลำดับขั้นตอนดังนี้:
1. **Checkout source code (`actions/checkout@v6`)**: ดึงโค้ดเวอร์ชันล่าสุดจาก Repository ลงมายัง Runner
2. **Verify index.html exists (`test -f index.html`)**: ตรวจสอบว่ามีไฟล์ `index.html` อยู่จริงหรือไม่เพื่อป้องกันหน้าเว็บ 404 (ตามเงื่อนไข Challenge)
3. **Setup Pages (`actions/configure-pages@v5`)**: กำหนดค่าและเตรียมการเชื่อมต่อสำหรับ GitHub Pages
4. **Upload static website (`actions/upload-pages-artifact@v4`)**: บีบอัดและอัปโหลดไฟล์ Static ทั้งหมดในโปรเจกต์ (`.`) ไปเก็บไว้เป็น Artifact ของ GitHub Pages
5. **Deploy to GitHub Pages (`actions/deploy-pages@v4`)**: นำ Artifact ดังกล่าวไป Deploy ขึ้นสู่ Production บนเซิร์ฟเวอร์ของ GitHub Pages และคืนค่า URL ของเว็บไซต์ให้ใช้งาน

---

## คำตอบคำถามท้ายแลป (Lab Questions)

### ข้อ 1: GitHub Actions แตกต่างจาก GitHub Pages อย่างไร?
- **GitHub Pages** คือบริการเว็บโฮสติ้ง (Web Hosting Service) สำหรับเผยแพร่เว็บไซต์ประเภท **Static Website** (HTML, CSS, JavaScript) ออกสู่อินเทอร์เน็ตสาธารณะผ่าน URL
- **GitHub Actions** คือระบบ Automation / CI/CD (Continuous Integration / Continuous Deployment) ที่ทำหน้าที่เป็นเครื่องมือรันสคริปต์หรืองานอัตโนมัติตาม Event ที่กำหนด เช่น เมื่อมี Push หรือ Pull Request โดยสามารถใช้ทำ Automated Testing, Build, หรือสั่ง Deploy ไฟล์ไปยัง GitHub Pages ได้

### ข้อ 2: เหตุใดจึงเลือก trigger ด้วย push ที่ branch main?
- เนื่องจาก Branch `main` เป็น Branch หลัก (Production Branch) ที่เก็บโค้ดเวอร์ชันที่ผ่านการทดสอบและพร้อมใช้งานจริง การกำหนด Trigger ให้ทำงานเมื่อมีการ `push` เข้าสู่ `main` ช่วยให้เกิดกระบวนการ **Continuous Deployment (CD)** ทันทีที่การแก้ไขได้รับการตรวจสอบและรวมเข้าสู่ `main` ระบบจะนำโค้ดล่าสุดขึ้นเซิร์ฟเวอร์โดยอัตโนมัติ โดยไม่ไปรบกวน Branch อื่นๆ ที่กำลังพัฒนาอยู่

### ข้อ 3: ถ้าแก้ไฟล์ในเครื่องแต่ไม่ได้ push เว็บไซต์จะเปลี่ยนหรือไม่ เพราะเหตุใด?
- **เว็บไซต์จะไม่เปลี่ยนแปลง** เนื่องจากไฟล์ที่ถูกแก้ไขยังคงอยู่ในเครื่องคอมพิวเตอร์ส่วนตัว (Local Machine) เท่านั้น GitHub ยังไม่ได้รับข้อมูลอัปเดต และ GitHub Actions ก็จะไม่ถูกกระตุ้น (Trigger) ให้ทำงาน เว็บไซต์บน GitHub Pages จะยังคงเป็นเวอร์ชันล่าสุดที่เคยถูก Deploy ครั้งก่อนหน้า จนกว่าจะทำการ `git commit` และ `git push` ขึ้นไปยัง GitHub

### ข้อ 4: เหตุใดโปรเจกต์ PHP + MySQL จึงไม่สามารถนำไปรันบน GitHub Pages ได้โดยตรง?
- เพราะ **GitHub Pages ให้บริการเฉพาะ Static Web Hosting เท่านั้น** ไม่มี Server-side Script Engine (เช่น PHP Runtime) และไม่มีบริการ Database Server (เช่น MySQL) รองรับการประมวลผลฝั่งเซิร์ฟเวอร์ หากต้องการใช้งาน PHP + MySQL จะต้องใช้บริการ Cloud Hosting, VPS, หรือ PaaS (เช่น AWS, Render, Heroku, DigitalOcean) ที่มี Server Stack รองรับ

### ข้อ 5: อธิบายขั้นตอนการค้นหาสาเหตุ เมื่อ Workflow มีสถานะ Failed
1. เข้าไปที่หน้า Repository บน GitHub แล้วคลิกแท็บ **Actions**
2. เลือกดูรายการ Workflow Run ที่แสดงสัญลักษณ์กากบาทสีแดง (Failed)
3. คลิกเข้าไปที่ชื่อ Run นั้น แล้วคลิกเลือก **Job** ที่เกิดข้อผิดพลาด (เช่น `deploy`)
4. สังเกต Step ที่แสดงเครื่องหมายกากบาทสีแดง และคลิกคลี่ขยาย Step นั้นออกมาดู **Logs รายละเอียด**
5. อ่านข้อความ Error Message (เช่น ไวยากรณ์ YAML ผิดพลาด, ไฟล์ไม่พบ, ปัญหาเรื่องสิทธิ์ Permissions หรือ Action ไม่รองรับ)
6. นำสาเหตุที่พบมาปรับแก้ในโค้ดหรือไฟล์ Workflow บนเครื่อง จากนั้นทำการ Commit และ Push ใหม่อีกครั้งเพื่อทดสอบการทำงาน

---

## ข้อมูลสำหรับการส่งงาน (Submission Checklist)

1. **GitHub Repository URL:**  
   `https://github.com/kittipongnitsaisook/webdev-actions-lab`
2. **GitHub Pages URL:**  
   `https://kittipongnitsaisook.github.io/webdev-actions-lab/`
3. **Screenshot แท็บ Actions:** แคปเจอร์หน้า GitHub Repository -> แท็บ Actions ที่แสดงผลผ่าน (เครื่องหมายถูกสีเขียว)
4. **Screenshot หน้าเว็บไซต์:** แคปเจอร์หน้าเว็บไซต์ที่เปิดผ่านเบราว์เซอร์พร้อมแสดงข้อมูลและโหมดที่เลือก
5. **คำตอบคำถามท้ายแลป:** ดูได้จากหัวข้อคำตอบคำถามท้ายแลปด้านบน
