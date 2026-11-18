package notify

import "github.com/Autumn-27/artex/i18n"

// Notification text follows the process-wide locale (ARTEX_LANG). Pin it to
// English so assertions do not depend on the environment running the tests.
func init() {
	i18n.SetNotifyLocale(i18n.EN)
}
