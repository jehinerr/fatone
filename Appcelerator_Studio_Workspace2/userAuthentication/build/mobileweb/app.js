// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#fff');
var tabGroup    = Titanium.UI.createTabGroup();
var main    = Titanium.UI.createWindow();
var mainTab = Titanium.UI.createTab();
 
var login = Titanium.UI.createWindow({
    title:'User Authentication Demo',
    url:'main_windows/login.js'
});
 
var loginTab = Titanium.UI.createTab({
    title:"Login",
    window:login
}); 
 
var account = Titanium.UI.createWindow({
    title:'New Account',
    url:'main_windows/account.js'
});
 
var accountTab = Titanium.UI.createTab({
    title:'New Account',
    window:account
});
 
tabGroup.addTab(loginTab);
tabGroup.addTab(accountTab);
tabGroup.open();

Ti.App.addEventListener('grantEntrance', function(event)
{
    main.tabBarHidden   = true;
    main.title      = 'Welcome ' + event.name;
    main.url        = 'main_windows/main.js';
    main.name       = event.name;
    main.email      = event.email;
    mainTab.window      = main;
     
    tabGroup.addTab(mainTab);
    tabGroup.removeTab(loginTab);
    tabGroup.removeTab(accountTab);
});


// added during app creation. this will automatically login to
// ACS for your application and then fire an event (see below)
// when connected or errored. if you do not use ACS in your
// application as a client, you should remove this block
(function(){
var ACS = require('ti.cloud'),
    env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development',
    username = Ti.App.Properties.getString('acs-username-'+env),
    password = Ti.App.Properties.getString('acs-password-'+env);

// if not configured, just return
if (!env || !username || !password) { return; }
/**
 * Appcelerator Cloud (ACS) Admin User Login Logic
 *
 * fires login.success with the user as argument on success
 * fires login.failed with the result as argument on error
 */
ACS.Users.login({
	login:username,
	password:password,
}, function(result){
	if (env==='development') {
		Ti.API.info('ACS Login Results for environment `'+env+'`:');
		Ti.API.info(result);
	}
	if (result && result.success && result.users && result.users.length){
		Ti.App.fireEvent('login.success',result.users[0],env);
	} else {
		Ti.App.fireEvent('login.failed',result,env);
	}
});

})();

