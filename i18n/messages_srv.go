package i18n

func init() {
	for k, v := range srvEN {
		messagesEN[k] = v
	}
	for k, v := range srvTR {
		messagesTR[k] = v
	}
}

var srvEN = map[Key]string{
	"srv.taskDeletingControlIntent": "Task is being deleted; intents cannot be controlled",
	"srv.taskDeletingRerunIntent":   "Task is being deleted; intents cannot be rerun",
	"srv.intentNotRerunnable":       "Intent is not in a rerunnable state (only blocked/exhausted/stopped can be rerun)",
	"srv.sourceTasksMax":            "At most %d linked tasks can be selected",
	"srv.sourceTaskIdInvalid":       "Linked task id is invalid or duplicated",
	"srv.sourceTaskNotFound":        "Linked task #%d does not exist",
	"srv.companiesInvalidMax":       "Invalid linked companies: at most %d valid companies can be selected",
	"srv.taskInterceptRulesInvalid": "Invalid task-level intercept rules: %s",
	"srv.taskCategoryInvalid":       "Task category does not exist or is invalid",
	"srv.companyInvalid":            "Linked company does not exist or is invalid",
	"srv.assetStoreDisabled":        "Asset store is not enabled",
	"srv.assetIdRequired":           "asset_id is required",
	"srv.pythonNotFound":            "Python not found (neither python3 nor python is in PATH)",
	"srv.callbackUrlScheme":         "Callback URL must start with http:// or https://",
	"srv.digestIntervalRange":       "Digest interval must be between 1 and 1440 minutes",
	"srv.taskDeletingNewSession":    "Task is being deleted; a new session cannot be created",
	"srv.taskDeletingSendMessage":   "Task is being deleted; new messages cannot be sent",
	"srv.mainAgentBusy":             "The main agent is still processing the previous message, please wait",
}

var srvTR = map[Key]string{
	"srv.taskDeletingControlIntent": "Görev siliniyor; niyetler kontrol edilemez",
	"srv.taskDeletingRerunIntent":   "Görev siliniyor; niyetler yeniden çalıştırılamaz",
	"srv.intentNotRerunnable":       "Niyet yeniden çalıştırılabilir durumda değil (yalnızca blocked/exhausted/stopped yeniden çalıştırılabilir)",
	"srv.sourceTasksMax":            "En fazla %d bağlantılı görev seçilebilir",
	"srv.sourceTaskIdInvalid":       "Bağlantılı görev kimliği geçersiz veya yinelenmiş",
	"srv.sourceTaskNotFound":        "Bağlantılı görev #%d mevcut değil",
	"srv.companiesInvalidMax":       "Bağlantılı şirketler geçersiz: en fazla %d geçerli şirket seçilebilir",
	"srv.taskInterceptRulesInvalid": "Görev düzeyindeki yakalama kuralları geçersiz: %s",
	"srv.taskCategoryInvalid":       "Görev kategorisi mevcut değil veya geçersiz",
	"srv.companyInvalid":            "Bağlantılı şirket mevcut değil veya geçersiz",
	"srv.assetStoreDisabled":        "Varlık deposu etkin değil",
	"srv.assetIdRequired":           "asset_id gerekli",
	"srv.pythonNotFound":            "Python bulunamadı (PATH içinde ne python3 ne de python var)",
	"srv.callbackUrlScheme":         "Geri çağrı adresi http:// veya https:// ile başlamalıdır",
	"srv.digestIntervalRange":       "Özet aralığı 1 ile 1440 dakika arasında olmalıdır",
	"srv.taskDeletingNewSession":    "Görev siliniyor; yeni oturum oluşturulamaz",
	"srv.taskDeletingSendMessage":   "Görev siliniyor; yeni mesaj gönderilemez",
	"srv.mainAgentBusy":             "Ana ajan önceki mesajı hâlâ işliyor, lütfen bekleyin",
}
