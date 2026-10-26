import type en from "./en";

/**
 * Turkish message catalog.
 *
 * Typed as `Record<keyof typeof en, string>` so a missing or renamed key is
 * a TypeScript build error, not a silently-blank or English string shown to
 * a Turkish user.
 */
const tr: Record<keyof typeof en, string> = {
  // Sidebar navigation — group labels
  "nav.group.functions": "İşlevler",
  "nav.group.system": "Sistem",

  // Sidebar navigation — items
  "nav.dashboard": "Panel",
  "nav.chat": "Sohbet",
  "nav.tasks": "Görevler",
  "nav.findings": "Bulgular",
  "nav.traffic": "Trafik",
  "nav.commands": "Araç Çalıştırmaları",
  "nav.llmRecords": "LLM Kayıtları",
  "nav.assets": "Varlıklar",
  "nav.sync": "Varlık Senkronizasyonu",
  "nav.workspace": "Çalışma Alanı",
  "nav.llm": "LLM",
  "nav.agents": "Ajanlar",
  "nav.mcp": "MCP",
  "nav.skills": "Yetenekler",
  "nav.tools": "Araçlar",
  "nav.notify": "Bildirimler",
  "nav.intercept": "Yakalama Kuralları",
  "nav.assetIntercept": "Varlık Yakalama",
  "nav.approvals": "Onay Kayıtları",
  "nav.logs": "Günlükler",
  "nav.settings": "Sistem Ayarları",

  // Shared chrome
  "common.version": "Sürüm · {version}",
  "common.language": "Dil",

  // Login page
  "auth.login.checking": "Oturum durumu kontrol ediliyor…",
  "auth.login.title": "Giriş yap",
  "auth.login.subtitle": "Tekrar hoş geldiniz — ARTEX'e devam etmek için parolanızı girin",
  "auth.login.username": "Kullanıcı adı",
  "auth.login.password": "Parola",
  "auth.login.passwordPlaceholder": "Parolanızı girin",
  "auth.login.agreePrefix": "Aşağıdaki belgeyi okudum ve kabul ediyorum:",
  "auth.login.termsLink": "Kullanım Koşulları",
  "auth.login.submit": "Giriş yap",
  "auth.login.submitting": "Giriş yapılıyor...",
  "auth.login.errorMustAgree": "Lütfen önce Kullanım Koşulları'nı okuyup kabul edin",
  "auth.login.errorBackend": "Arka uç hizmetine bağlanılamadı",
  "auth.login.errorCredentials": "Kullanıcı adı veya parola hatalı",

  // Login page — terms of use dialog
  "auth.terms.title": "ARTEX Kullanım Koşulları ve Sorumluluk Reddi",
  "auth.terms.version":
    "Sürüm v1.0 · Yürürlük tarihi 2026-09-18 · Giriş yapmadan önce lütfen aşağıdaki tüm koşulları eksiksiz okuyun",
  "auth.terms.intro":
    'Bu Kullanım Koşulları ve Sorumluluk Reddi ("bu Koşullar"), ARTEX projesinin yazarları ve katkıda bulunanları ile sizin aranızda bu yazılımın kullanımına ilişkin bir anlaşmadır. Lütfen kullanmadan önce tüm maddeleri dikkatle okuyun ve tam olarak anlayın; özellikle kalın veya renkli olarak vurgulanan sorumluluk reddi, sorumluluk sınırlaması ve yasaklayıcı maddeleri.',
  "auth.terms.introAcceptance":
    " Bu yazılımı indirdiğiniz, kurduğunuz, eriştiğiniz veya herhangi bir şekilde kullandığınız anda, bu Koşulları okumuş, anlamış ve bunlara bağlı kalmayı kabul etmiş sayılırsınız.",
  "auth.terms.section1.title": "Madde 1 · Tanımlar ve Açık Kaynak Lisansı",
  "auth.terms.section1.body":
    "Bu yazılım (ARTEX), GNU Affero General Public License v3.0 (AGPL-3.0) kapsamında yayınlanan açık kaynaklı bir programdır. Bu yazılımı söz konusu lisans uyarınca serbestçe kullanabilir, çoğaltabilir, değiştirebilir ve dağıtabilirsiniz; ancak türev çalışmalar (ağ üzerinden üçüncü taraflara sunulan çevrimiçi hizmetler dahil) de aynı şekilde AGPL-3.0 ile açık kaynak olmalı ve kullanıcılara ilgili eksiksiz kaynak kodu erişime açılmalıdır. AGPL-3.0'ın tam şartları için ekteki LICENSE dosyası esas alınır.",
  "auth.terms.section2.title": "Madde 2 · İzin Verilen Kullanım Kapsamı",
  "auth.terms.section2.body":
    "Bu yazılım yalnızca kişisel öğrenim, kod incelemesi, güvenlik teknik ilkelerinin tartışılması ve kendi kurduğunuz izole bir ortamda teknik doğrulama amaçlarıyla kullanılmak üzere sağlanmıştır; öğrenim, akademik araştırma ve kod incelemesi gibi saldırgan olmayan, yıkıcı olmayan amaçlar için uygundur. Bu maddede açıkça izin verilenler dışında, bu yazılımı başka hiçbir amaçla kullanamazsınız.",
  "auth.terms.section3.title": "Madde 3 · Yasaklanmış Davranışlar",
  "auth.terms.section3.item1":
    "Yetki alınmış olsun ya da olmasın, kendi varlığınız olsun ya da olmasın, başka bir kişiye veya üçüncü tarafa ait herhangi bir web sitesine, çevrimiçi hizmete veya ağa bağlı sisteme karşı tarama, keşif, istismar veya saldırı başlatmak kesinlikle yasaktır;",
  "auth.terms.section3.item2":
    "Bu yazılımı herhangi bir gerçek sızma testinde, kırmızı/mavi takım tatbikatında veya üretim ortamında kullanmak kesinlikle yasaktır;",
  "auth.terms.section3.item3":
    "Bu yazılımı yasa dışı izinsiz erişim, veri hırsızlığı, fidye, hizmet reddi (DoS/DDoS) veya herhangi bir yıkıcı ya da suç teşkil eden faaliyet için kullanmak kesinlikle yasaktır;",
  "auth.terms.section3.item4":
    "Bu yazılımda veya çıktısında yer alan herhangi bir telif hakkı, lisans veya güvenlik uyarısını kaldırmak, değiştirmek veya atlatmak kesinlikle yasaktır;",
  "auth.terms.section3.item5":
    "Bulunduğunuz ülke veya bölgenin yasalarını, yönetmeliklerini ve düzenleyici kurallarını ihlal eden herhangi bir faaliyette bulunmak kesinlikle yasaktır.",
  "auth.terms.section4.title": "Madde 4 · Fikri Mülkiyet",
  "auth.terms.section4.body":
    "Bu yazılımın telif hakkı ve ilgili fikri mülkiyet hakları proje yazarlarına ve katkıda bulunanlara aittir ve size AGPL-3.0 lisansında belirtilen kapsamda ilgili haklar tanınır. Bu lisans kapsamında açıkça tanınan haklar dışında, bu Koşullar size açık veya zımni olarak başka hiçbir hak tanımaz.",
  "auth.terms.section5.title": "Madde 5 · Veri ve Gizlilik",
  "auth.terms.section5.body":
    "Bu yazılım kendi kendine barındırılabilen, açık kaynaklı bir programdır; yazarları merkezi bir hizmet işletmez ve kullanım verilerinizi toplamaz veya yüklemez. Bu yazılımı kullanırken oluşturduğunuz, işlediğiniz veya eriştiğiniz tüm verilerin kontrolü ve bunların yasallığı ile güvenliğine ilişkin sorumluluk tamamen size aittir; verilerin uygunsuz işlenmesinden doğan sonuçlardan yalnızca siz sorumlusunuz.",
  "auth.terms.section6.title": "Madde 6 · Uyumluluk ve Hukuki Sorumluluk",
  "auth.terms.section6.body":
    "Bulunduğunuz ülke veya bölgenin siber güvenlik, veri güvenliği, kişisel verilerin korunması ve bilgisayar suçlarına ilişkin tüm yasa ve yönetmeliklerine uymaktan yalnızca siz sorumlusunuz.",
  "auth.terms.section6.bodyEmphasis":
    " Yukarıdaki yasa, yönetmelik veya bu Koşulları ihlal etmenizden doğan her türlü hukuki sorumluluk ve sonuç yalnızca size aittir ve bu yazılımın yazarları veya katkıda bulunanlarıyla hiçbir ilgisi yoktur.",
  "auth.terms.section7.title": "Madde 7 · Sorumluluk Reddi ve Sorumluluk Sınırlaması",
  "auth.terms.section7.body":
    'Bu yazılım, pazarlanabilirlik, belirli bir amaca uygunluk, doğruluk ve ihlal etmeme garantileri dahil ancak bunlarla sınırlı olmamak üzere, açık veya zımni hiçbir garanti vermeksizin "OLDUĞU GİBİ" ve "MEVCUT OLDUĞU ŞEKİLDE" sunulmaktadır. Yürürlükteki yasaların izin verdiği azami ölçüde, bu yazılımın yazarları ve katkıda bulunanları, bu yazılımın kullanılmasından veya kullanılamamasından (kullanım şekli ne olursa olsun) kaynaklanan veri kaybı, sistem hasarı, iş kesintisi, kâr kaybı veya hukuki uyuşmazlıklar dahil ancak bunlarla sınırlı olmaksızın hiçbir doğrudan, dolaylı, arızi, özel veya sonuç niteliğindeki kayıptan sorumlu tutulamaz.',
  "auth.terms.section8.title": "Madde 8 · Koşullardaki Değişiklikler ve Nihai Yorum",
  "auth.terms.section8.body":
    "Yazarlar, yasa, yönetmelik veya projenin gelişim ihtiyaçları doğrultusunda bu Koşulları zaman zaman güncelleme hakkını saklı tutar; güncellenmiş sürüm, proje ile birlikte yayımlandığı tarihten itibaren yürürlüğe girer. Böyle bir güncellemeden sonra yazılımı kullanmaya devam etmeniz, revize edilen koşulları kabul ettiğiniz anlamına gelir. Yasaların izin verdiği ölçüde, bu Koşulların nihai yorumlanması hakkı proje yazarlarına aittir. Bu Koşulların herhangi bir maddesinin geçersiz sayılması, diğer maddelerin geçerliliğini etkilemez.",
  "auth.terms.scrolledAll": "Tüm koşulları görüntülediniz",
  "auth.terms.scrollPrompt": "Lütfen onaylamadan önce koşulları sona kadar kaydırın",
  "auth.terms.agree": "Yukarıdaki tüm koşulları okudum ve kabul ediyorum",

  // Setup (first-run) page
  "auth.setup.titleUnavailable": "Kurulum durumu doğrulanamadı",
  "auth.setup.title": "Parolanızı belirleyin",
  "auth.setup.subtitleUnavailable":
    "Arka uç veya veritabanı geçici olarak kullanılamıyor. Bu örnekte zaten var olan bir parolanın üzerine yazılmasını önlemek için kurulum formu geçici olarak devre dışı bırakıldı — hizmet geri geldiğinde yeniden deneyin.",
  "auth.setup.subtitle":
    "ARTEX'i ilk kez kullanıyorsunuz — hesabınız için bir giriş parolası belirleyin (en az 8 karakter)",
  "auth.setup.retry": "Yeniden dene",
  "auth.setup.newPassword": "Yeni parola",
  "auth.setup.newPasswordPlaceholder": "En az 8 karakter",
  "auth.setup.confirmPassword": "Parolayı onayla",
  "auth.setup.confirmPasswordPlaceholder": "Parolanızı tekrar girin",
  "auth.setup.submit": "Parolayı ayarla ve giriş yap",
  "auth.setup.submitting": "Kaydediliyor...",
  "auth.setup.errorMismatch": "Girilen parolalar birbiriyle uyuşmuyor",
  "auth.setup.errorTooShort": "Parola en az 8 karakter olmalıdır",
  "auth.setup.errorBackend": "Arka uç hizmetine bağlanılamadı",
  "auth.setup.errorGeneric": "Kurulum başarısız oldu",

  // Settings — language section
  "settings.language.title": "Dil",
  "settings.language.description": "Arayüz dilini seçin. Değişiklik hemen uygulanır ve bu cihazda hatırlanır.",
  "settings.language.label": "Arayüz dili",
};

export default tr;
