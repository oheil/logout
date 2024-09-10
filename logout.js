
async function main() {
	messenger.menus.create({
		contexts : ["folder_pane"],
		id: "logoutFromServer",
		onclick : logout_onclick,
		title: "Logout"
	});
}

function logout_onclick(item) {
	var account_promise=null
	if(item.hasOwnProperty('selectedFolder')) {
		account_promise=messenger.accounts.get(item.selectedFolder.accountId);
	}
	if(item.hasOwnProperty('selectedAccount')) {
		account_promise=messenger.accounts.get(item.selectedAccount.id);
	}
	if(account_promise != null) {
		account_promise.then(logout,logout_failure);
	}
}

function logout_failure(account) {
	console.log("logout_failure");
	console.log(account);
}

function logout(account) {
	//console.log(account);
	if( account != null && account.identities != null ) {
		messenger.exp_logout.exp_logout(account.id, account.identities.map(identity => identity.id));
	}
}

main();
