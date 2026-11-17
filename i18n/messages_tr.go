package i18n

// Turkish message catalog. Keep this in sync with messages_en.go — a
// completeness check runs in i18n_test.go.
var messagesTR = map[Key]string{
	"auth.passwordRequired":       "Parola boş olamaz",
	"auth.newPasswordRequired":    "Yeni parola boş olamaz",
	"auth.malformedRequest":       "İstek biçimi hatalı",
	"auth.tokenInvalid":           "Token geçersiz veya süresi dolmuş",
	"auth.currentPasswordWrong":   "Mevcut parola hatalı",
	"auth.unauthorized":           "Yetkisiz işlem",
	"auth.invalidCredentials":     "Kullanıcı adı veya parola hatalı",
	"auth.passwordAlreadySet":     "Parola zaten ayarlanmış",
	"auth.passwordNotInitialized": "Parola henüz ayarlanmadı — lütfen önce bir parola belirleyin",
	"auth.tokenGenerationFailed":  "Token oluşturulamadı",
	"auth.passwordHashFailed":     "Parola şifrelenemedi",
	"auth.dataSourceUnavailable":  "Veri kaynağı geçici olarak kullanılamıyor, lütfen kısa süre sonra yeniden deneyin",
	"auth.passwordTooShort":       "Parola en az %d karakter olmalıdır",
	"auth.passwordTooLong":        "Parola %d bayttan uzun olamaz",
	"auth.saveFailed":             "Kaydetme başarısız: %s",
}
