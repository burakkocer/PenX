package i18n

func init() {
	for k, v := range assetEN {
		messagesEN[k] = v
	}
	for k, v := range assetTR {
		messagesTR[k] = v
	}
}

var assetEN = map[Key]string{
	"asset.decisionInvalid":           "decision must be allowed or denied",
	"asset.failActionInvalid":         "fail_action must be allow, ask or deny",
	"asset.askTimeoutActionInvalid":   "ask_timeout_action must be allow or deny",
	"asset.conversationDeleted":       "Conversation has been deleted",
	"asset.approvalNotFound":          "Approval record was deleted or does not exist",
	"asset.bodyTooLarge":              "Request body too large",
	"asset.companyNameExists":         "Company name already exists",
	"asset.invalidJSONBody":           "Request body is not valid JSON: %s",
	"asset.channelKindInvalid":        "Invalid channel type, allowed: %s",
	"asset.channelNameMissing":        "Channel name is missing",
	"asset.pushModeInvalid":           "Invalid push mode, allowed: realtime / digest",
	"asset.rateLimitNegative":         "Rate limit cannot be negative",
	"asset.channelIDInvalid":          "Invalid channel id",
	"asset.channelNameEmpty":          "Channel name cannot be empty",
	"asset.channelKindUnregistered":   "Channel type %q is not registered",
	"asset.deliveryIDInvalid":         "Invalid delivery id",
	"asset.listProjectsDataFailed":    "list_projects_data failed: %s",
	"asset.parseProjectListFailed":    "Failed to parse project list: %s",
	"asset.listTasksFailed":           "list_tasks failed: %s",
	"asset.parseTaskListFailed":       "Failed to parse task list: %s",
	"asset.dimensionInvalid":          "dimension must be project or task",
	"asset.targetsEmpty":              "targets cannot be empty",
	"asset.triggerCustomAgentOnly":    "Triggers are only supported for custom agents",
	"asset.scopeAndAssetIDsExclusive": "scope and asset_ids cannot be submitted together",
	"asset.nameOrPinnedRequired":      "At least one of name or pinned is required",
	"asset.taskNameEmpty":             "Task name cannot be empty",
	"asset.taskNameTooLong":           "Task name can be at most %d characters",
}

var assetTR = map[Key]string{
	"asset.decisionInvalid":           "decision allowed veya denied olmalıdır",
	"asset.failActionInvalid":         "fail_action allow, ask veya deny olmalıdır",
	"asset.askTimeoutActionInvalid":   "ask_timeout_action allow veya deny olmalıdır",
	"asset.conversationDeleted":       "Sohbet silindi",
	"asset.approvalNotFound":          "Onay kaydı silinmiş veya mevcut değil",
	"asset.bodyTooLarge":              "İstek gövdesi çok büyük",
	"asset.companyNameExists":         "Şirket adı zaten mevcut",
	"asset.invalidJSONBody":           "İstek gövdesi geçerli bir JSON değil: %s",
	"asset.channelKindInvalid":        "Geçersiz kanal türü, kabul edilenler: %s",
	"asset.channelNameMissing":        "Kanal adı eksik",
	"asset.pushModeInvalid":           "Geçersiz gönderim modu, kabul edilenler: realtime / digest",
	"asset.rateLimitNegative":         "Hız sınırı negatif olamaz",
	"asset.channelIDInvalid":          "Geçersiz kanal id",
	"asset.channelNameEmpty":          "Kanal adı boş olamaz",
	"asset.channelKindUnregistered":   "%q kanal türü kayıtlı değil",
	"asset.deliveryIDInvalid":         "Geçersiz teslimat id",
	"asset.listProjectsDataFailed":    "list_projects_data başarısız oldu: %s",
	"asset.parseProjectListFailed":    "Proje listesi ayrıştırılamadı: %s",
	"asset.listTasksFailed":           "list_tasks başarısız oldu: %s",
	"asset.parseTaskListFailed":       "Görev listesi ayrıştırılamadı: %s",
	"asset.dimensionInvalid":          "dimension project veya task olmalıdır",
	"asset.targetsEmpty":              "targets boş olamaz",
	"asset.triggerCustomAgentOnly":    "Tetikleyiciler yalnızca özel ajanlar için desteklenir",
	"asset.scopeAndAssetIDsExclusive": "scope ve asset_ids birlikte gönderilemez",
	"asset.nameOrPinnedRequired":      "name veya pinned alanlarından en az biri gereklidir",
	"asset.taskNameEmpty":             "Görev adı boş olamaz",
	"asset.taskNameTooLong":           "Görev adı en fazla %d karakter olabilir",
}
