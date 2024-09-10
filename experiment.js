
var { MailServices } = ChromeUtils.importESModule("resource:///modules/MailServices.sys.mjs");

var exp_logout = class extends ExtensionCommon.ExtensionAPI {
	getAPI(context) {
		return {
			exp_logout: {
				async exp_logout(accountId, identityIds) {
					let account = MailServices.accounts.getAccount(accountId);
					if (!account) {
						return;
					}
					account.incomingServer.forgetPassword();
					account.incomingServer.forgetSessionPassword(false);
					account.incomingServer.closeCachedConnections();
					if(!identityIds) {
						return;
					}
					for (let identityId of identityIds) {
						let identity = MailServices.accounts.getIdentity(identityId);
						if (!identity) {
							continue;
						}
						let smtpServer = MailServices.outgoingServer.getServerByKey(identity.smtpServerKey);
						if(!smtpServer) {
							continue;
						}
						smtpServer.forgetPassword();
					}
				}
			}
		}
	}
};

