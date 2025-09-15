<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>تسجيل طلب مساعدات غذائية</title>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Tajawal', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      color: #333;
    }

    .container {
      max-width: 900px;
      margin: 40px auto;
      padding: 20px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    h1 {
      text-align: center;
      color: #c94e4d;
      font-size: 30px;
      margin-bottom: 20px;
    }

    label {
      font-size: 16px;
      margin-bottom: 8px;
      display: block;
      color: #555;
    }

    input, select, button {
      width: 100%;
      padding: 12px;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-sizing: border-box;
      font-size: 16px;
    }

    button {
      background-color: #c94e4d;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #a74342;
    }

    .row {
      display: flex;
      gap: 10px;
      justify-content: space-between;
    }

    .small {
      flex: 1;
    }

    .note {
      text-align: center;
      font-size: 14px;
      color: #777;
    }

    .file-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .file-label input {
      border: none;
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>نموذج تسجيل طلب مساعدات غذائية</h1>
    <p class="note">يرجى إدخال بياناتك بشكل دقيق. هذه النسخة تجريبية.</p>

    <form id="aidForm">
      <label>الاسم الثلاثي</label>
      <input type="text" id="fullName" name="fullName" placeholder="مثال: محمد أحمد الخالد" required>

      <label>رقم الهاتف</label>
      <input type="tel" id="phone" name="phone" placeholder="مثال: 0999123456" required>

      <label>مكان السكن</label>
      <select id="location" name="location" required>
        <option value="">-- اختر المحافظة أو الريف --</option>
        <option>دمشق</option>
        <option>ريف دمشق</option>
        <option>حلب</option>
        <option>ريف حلب</option>
        <option>حمص</option>
        <option>ريف حمص</option>
        <option>حماه</option>
        <option>ريف حماه</option>
        <option>اللاذقية</option>
        <option>ريف اللاذقية</option>
        <option>طرطوس</option>
        <option>ريف طرطوس</option>
        <option>إدلب</option>
        <option>ريف إدلب</option>
        <option>الرقة</option>
        <option>ريف الرقة</option>
        <option>دير الزور</option>
        <option>ريف دير الزور</option>
        <option>الحسكة</option>
        <option>ريف الحسكة</option>
        <option>درعا</option>
        <option>ريف درعا</option>
        <option>القنيطرة</option>
        <option>ريف القنيطرة</option>
        <option>السويداء</option>
        <option>ريف السويداء</option>
      </select>

      <label class="file-label">تحميل البطاقة الشخصية
        <input type="file" id="idFile" name="idFile" accept="image/*,.pdf" required>
      </label>

      <div class="row">
        <div class="small">
          <label>هل تحتاج مساعدات غذائية الآن؟</label>
          <select id="urgent" name="urgent">
            <option value="نعم">نعم</option>
            <option value="لا">لا</option>
          </select>
        </div>
        <div class="small">
          <label>عدد أفراد الأسرة</label>
          <input type="number" id="household" name="household" min="1" value="1">
        </div>
      </div>

      <label>ملاحظات إضافية</label>
      <input type="text" id="notes" name="notes" placeholder="مثال: حالات خاصة، أفراد ذوي إعاقة...">

      <button type="submit">أرسل الطلب</button>
    </form>

    <div id="msg" class="note"></div>
  </div>

  <script>
    const form = document.getElementById('aidForm');
    const msg = document.getElementById('msg');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.textContent = '';

      const fullName = document.getElementById('fullName').value;
      const phone = document.getElementById('phone').value;
      const location = document.getElementById('location').value;
      const idFile = document.getElementById('idFile').files[0];
      const urgent = document.getElementById('urgent').value;
      const household = document.getElementById('household').value;
      const notes = document.getElementById('notes').value;

      if (!fullName || !phone || !location || !idFile) {
        msg.style.color = 'crimson';
        msg.textContent = 'جميع الحقول مطلوبة.';
        return;
      }

      // استلام المتغيرات البيئية من Vercel
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      const endpoint = `https://api.telegram.org/bot${botToken}/sendMessage`;

      const message = {
        chat_id: chatId,
        text: `تم إرسال طلب من: ${fullName}\nرقم الهاتف: ${phone}\nالموقع: ${location}\nهل يحتاج مساعدات: ${urgent}\nعدد أفراد الأسرة: ${household}\nملاحظات: ${notes}`
      };

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(message),
        });

        if (res.ok) {
          msg.style.color = 'green';
          msg.textContent = 'تم إرسال الطلب بنجاح. شكراً.';
          form.reset();
        } else {
          msg.style.color = 'crimson';
          msg.textContent = 'حدث خطأ أثناء الإرسال.';
        }
      } catch (err) {
        msg.style.color = 'crimson';
        msg.textContent = 'فشل الاتصال بالسيرفر.';
        console.error(err);
      }
    });
  </script>

</body>
</html>
