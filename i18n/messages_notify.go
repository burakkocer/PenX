package i18n

// Notification catalog. These strings are rendered by background workers
// (no HTTP request), so callers use T(NotifyLocale(), key, args...); see
// NotifyLocale for how the language is selected (ARTEX_LANG).

func init() {
	for k, v := range notifyEN {
		messagesEN[k] = v
	}
	for k, v := range notifyTR {
		messagesTR[k] = v
	}
}

var notifyEN = map[Key]string{
	// Severity / status labels
	"notify.sev.critical":          "🔴 Critical",
	"notify.sev.high":              "🟠 High",
	"notify.sev.medium":            "🟡 Medium",
	"notify.sev.low":               "🔵 Low",
	"notify.status.pending":        "Pending",
	"notify.status.in_progress":    "In progress",
	"notify.status.confirmed":      "Confirmed",
	"notify.status.resolved":       "Resolved",
	"notify.status.fixed":          "Fixed",
	"notify.status.false_positive": "False positive",
	"notify.status.ignored":        "Ignored",
	"notify.status.duplicate":      "Duplicate",
	"notify.status.risk_accepted":  "Risk accepted",

	// Titles, labels and links
	"notify.untitled":           "(Untitled finding)",
	"notify.title.batch":        "Findings digest · %d total",
	"notify.title.single":       "Finding notification",
	"notify.label.statusChange": "Status change",
	"notify.label.type":         "Type",
	"notify.label.assets":       "Assets",
	"notify.label.summary":      "Summary",
	"notify.link.viewAll":       "View all in the platform",
	"notify.link.viewDetail":    "View details",
	"notify.assets.more":        "%s (%d in total)",
	"notify.intro.window":       "New findings in the last %d minutes: %d",
	"notify.intro.count":        "New findings: %d",
	"notify.intro.truncated":    " (this message shows the first %d; the remaining %d will follow in the next message)",
	"notify.tg.windowTitle":     "Last %d minutes · %s",
	"notify.tg.truncated":       " (showing the first %d; the remaining %d in the next message)",

	// Channel test message
	"notify.test.name":    "Test message · channel is configured correctly",
	"notify.test.class":   "Connectivity test",
	"notify.test.summary": "This is a test message from an ARTEX notification channel. If you received it, the channel is working.",

	// Delivery failure reasons stored with deliveries (shown in delivery history)
	"notify.srv.kindUnregistered": "Channel type %q is not registered",
	"notify.srv.snapshotBad":      "The event snapshot could not be parsed, so this finding cannot be rendered into a message",
	"notify.srv.deferred":         "The message reached the channel length limit; only the first %d were delivered and the rest are left for the next batch",
	"notify.srv.noDeliveredCount": "The channel did not report how many items were delivered (delivered=%d)",
	"notify.srv.retriesExhausted": "Still failing after %d retries: %s",
	"notify.srv.batchAllBad":      "None of the %d deliveries in the digest batch could be parsed",
	"notify.srv.snapshotEmpty":    "The event snapshot of delivery %d is empty",
	"notify.srv.snapshotParse":    "Failed to parse the event snapshot of delivery %d",
}

var notifyTR = map[Key]string{
	// Severity / status labels
	"notify.sev.critical":          "🔴 Kritik",
	"notify.sev.high":              "🟠 Yüksek",
	"notify.sev.medium":            "🟡 Orta",
	"notify.sev.low":               "🔵 Düşük",
	"notify.status.pending":        "Beklemede",
	"notify.status.in_progress":    "Devam ediyor",
	"notify.status.confirmed":      "Doğrulandı",
	"notify.status.resolved":       "Çözüldü",
	"notify.status.fixed":          "Düzeltildi",
	"notify.status.false_positive": "Yanlış pozitif",
	"notify.status.ignored":        "Yok sayıldı",
	"notify.status.duplicate":      "Yinelenen",
	"notify.status.risk_accepted":  "Risk kabul edildi",

	// Titles, labels and links
	"notify.untitled":           "(Adsız bulgu)",
	"notify.title.batch":        "Bulgu özeti · toplam %d",
	"notify.title.single":       "Bulgu bildirimi",
	"notify.label.statusChange": "Durum değişikliği",
	"notify.label.type":         "Tür",
	"notify.label.assets":       "Varlıklar",
	"notify.label.summary":      "Özet",
	"notify.link.viewAll":       "Tümünü platformda görüntüle",
	"notify.link.viewDetail":    "Ayrıntıları görüntüle",
	"notify.assets.more":        "%s (toplam %d)",
	"notify.intro.window":       "Son %d dakikada yeni bulgular: %d",
	"notify.intro.count":        "Yeni bulgular: %d",
	"notify.intro.truncated":    " (bu mesajda ilk %d gösteriliyor; kalan %d sonraki mesajda devam edecek)",
	"notify.tg.windowTitle":     "Son %d dakika · %s",
	"notify.tg.truncated":       " (ilk %d gösteriliyor; kalan %d sonraki mesajda)",

	// Channel test message
	"notify.test.name":    "Test mesajı · kanal yapılandırması doğru",
	"notify.test.class":   "Bağlantı testi",
	"notify.test.summary": "Bu, bir ARTEX bildirim kanalından gönderilen test mesajıdır. Bu mesajı aldıysanız kanal çalışıyor demektir.",

	// Delivery failure reasons stored with deliveries (shown in delivery history)
	"notify.srv.kindUnregistered": "%q kanal türü kayıtlı değil",
	"notify.srv.snapshotBad":      "Olay anlık görüntüsü çözümlenemedi, bu nedenle bu bulgu mesaja dönüştürülemiyor",
	"notify.srv.deferred":         "Mesaj kanalın uzunluk sınırına ulaştı; yalnızca ilk %d teslim edildi, kalanlar sonraki gruba bırakıldı",
	"notify.srv.noDeliveredCount": "Kanal kaç öğenin teslim edildiğini bildirmedi (delivered=%d)",
	"notify.srv.retriesExhausted": "%d yeniden denemeden sonra hâlâ başarısız: %s",
	"notify.srv.batchAllBad":      "Özet grubundaki %d tesliminin hiçbiri çözümlenemedi",
	"notify.srv.snapshotEmpty":    "%d numaralı teslimatın olay anlık görüntüsü boş",
	"notify.srv.snapshotParse":    "%d numaralı teslimatın olay anlık görüntüsü çözümlenemedi",
}
