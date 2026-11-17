package i18n

// English message catalog — canonical key set for this migration batch
// (auth endpoints only; see i18n.go's package comment). Add new keys here
// first, then to messages_tr.go.
var messagesEN = map[Key]string{
	"auth.passwordRequired":       "Password is required",
	"auth.newPasswordRequired":    "New password is required",
	"auth.malformedRequest":       "Malformed request",
	"auth.tokenInvalid":           "Invalid or expired token",
	"auth.currentPasswordWrong":   "Current password is incorrect",
	"auth.unauthorized":           "Unauthorized",
	"auth.invalidCredentials":     "Incorrect username or password",
	"auth.passwordAlreadySet":     "Password has already been set",
	"auth.passwordNotInitialized": "Password has not been initialized yet — please set one first",
	"auth.tokenGenerationFailed":  "Failed to generate token",
	"auth.passwordHashFailed":     "Failed to hash password",
	"auth.dataSourceUnavailable":  "Data source temporarily unavailable, please try again shortly",
	"auth.passwordTooShort":       "Password must be at least %d characters",
	"auth.passwordTooLong":        "Password must not exceed %d bytes",
	"auth.saveFailed":             "Save failed: %s",
}
