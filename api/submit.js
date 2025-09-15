// submit.js - هذا هو الكود الذي سيتعامل مع البيانات ويرسلها إلى API Telegram

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // جلب البيانات المرسلة من النموذج
    const { fullName, phone, location, urgent, household, notes, idFile } = req.body;

    // التحقق إذا كانت البيانات ضرورية موجودة
    if (!fullName || !phone || !location || !idFile) {
      return res.status(400).json({ error: 'جميع الحقول مطلوبة.' });
    }

    // رابط الـ Telegram API مع التوكن
    const telegramUrl = `https://api.telegram.org/bot7685872798:AAHYD4pnuZSVqy5wS87OzZ0qyeaRERyRTy4/sendMessage`;

    // الرسالة التي سيتم إرسالها عبر Telegram
    const message = `
      *طلب مساعدات غذائية جديد*\n
      *الاسم*: ${fullName}\n
      *رقم الهاتف*: ${phone}\n
      *المكان*: ${location}\n
      *هل يحتاج المساعدات بشكل عاجل؟*: ${urgent}\n
      *عدد أفراد الأسرة*: ${household}\n
      *ملاحظات إضافية*: ${notes}
    `;

    // إعداد البيانات التي سيتم إرسالها إلى Telegram
    const telegramData = {
      chat_id: '5946998458',  // آيدي الشات الذي أرسلته
      text: message,
      parse_mode: 'Markdown'
    };

    try {
      // إرسال البيانات إلى Telegram API
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(telegramData)
      });

      // التحقق من نجاح عملية الإرسال
      if (response.ok) {
        return res.status(200).json({ message: 'تم إرسال الطلب بنجاح.' });
      } else {
        return res.status(500).json({ error: 'حدث خطأ أثناء إرسال البيانات إلى Telegram.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'فشل الاتصال بخادم Telegram.' });
    }
  } else {
    return res.status(405).json({ error: 'طريقة الطلب غير مدعومة. استخدم POST فقط.' });
  }
}
