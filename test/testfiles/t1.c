#include <stdio.h>
#include "localization.h"

#define	MAXSTRSIZE	512

static char _gSystemLocales[11]={0,};
static bool _gLocaleDirection=TRUE;
static ResBundleC *res_bundle = NULL;

static bool _notification_setLocaleDirection(void){

	if(strstr(_gSystemLocales,"ar")!=NULL)
		return FALSE;
	else if(strstr(_gSystemLocales,"fa")!=NULL)
		return FALSE;
	else if(strstr(_gSystemLocales,"ur")!=NULL)
		return FALSE;
	else if(strstr(_gSystemLocales,"he")!=NULL)
		return FALSE;
	else if(strstr(_gSystemLocales,"ku")!=NULL)
		return FALSE;
	else
		return TRUE;
}

static void _notification_setCurrentLocale(const char *locale){
	snprintf(_gSystemLocales, sizeof(_gSystemLocales), locale);
	_gLocaleDirection = _notification_setLocaleDirection();
}

bool notification_getLocaleDirection(void){

	return _gLocaleDirection;
}

ResBundleC* notification_getResBundle(void){

	return res_bundle;
}

char* notification_getCurrentLocale(void){

	return _gSystemLocales;
}

void notification_changeCurrentLocale(const char *locale) {

	const char* file = "cstrings.json";
	const char* resources_path = "/usr/share/localization/miracast";

	if(locale==NULL)
		return;

	if(res_bundle != NULL)
		resBundle_destroy(res_bundle);

	res_bundle = resBundle_createWithRootPath(locale, file, resources_path);
	_notification_setCurrentLocale(locale);

	return;
}

void localization(void) {

	char *screen_share_1 = (char *)resBundle_getLocString(res_bundle, "%s requests screen sharing to your TV.<br> Please end the current device's connection to view %s's screen.");
	char *screen_share_4 = (char *)resBundle_getLocString(res_bundle, "There is an issue with your %s.<br>Please restart it and try again.");
	char *screen_share_5_1 = (char *)resBundle_getLocString(res_bundle, "The device cannot be connected to your TV.");
	char *screen_share_5_2 = (char *)resBundle_getLocString(res_bundle, "Please try again. If the issue persists, please restart your TV or check your device.");
	char *screen_share_8 = (char *)resBundle_getLocString(res_bundle, "[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");
	char *screen_share_19 = (char *)resBundle_getLocString(res_bundle, "The time for entering your \"PIN code\" has expired. Please try again.");
	char *screen_share_21 = (char *)resBundle_getLocString(res_bundle, "If you accept this request, the current connection with another device will be disconnected.");
	char *screen_share_22 = (char *)resBundle_getLocString(res_bundle, "Do you want to continue?");
	char *screen_share_33 = (char *)resBundle_getLocString(res_bundle, "All devices connected via Wi-Fi Direct have been disconnected from TV.");
	char *screen_share_34 = (char *)resBundle_getLocString(res_bundle, "No");
	char *screen_share_35 = (char *)resBundle_getLocString(res_bundle, "Yes");
	char *screen_share_36 = (char *)resBundle_getLocString(res_bundle, "%s requests screen sharing via Wi-Fi Direct.");
	char *screen_share_37 = (char *)resBundle_getLocString(res_bundle, "Please try again after closing the Screen Share app.");
	char *screen_share_40 = (char *)resBundle_getLocString(res_bundle, "Overlay Mode is not available during recording or Live Playback.");
	char *screen_share_41 = (char *)resBundle_getLocString(res_bundle, "\"Overlay Mode\" will be off now to start recording or Live Playback.");
	char *screen_share_42 = (char *)resBundle_getLocString(res_bundle, "Overlay Mode is not available in {name}.");
	char *screen_share_43 = (char *)resBundle_getLocString(res_bundle, "Overlay Mode is not available now.");
	char *screen_share_54 = (char *)resBundle_getLocString(res_bundle, "%s requests screen sharing to your TV.");
	char *screen_share_58 = (char *)resBundle_getLocString(res_bundle, "OK");
	char *screen_share_59 = (char *)resBundle_getLocString(res_bundle, "Do you want to \naccept this request?");
	char *screen_share_60 = (char *)resBundle_getLocString(res_bundle, "Block");
	char *screen_share_61 = (char *)resBundle_getLocString(res_bundle, "Decline");
	char *screen_share_62 = (char *)resBundle_getLocString(res_bundle, "Accept");
	char *screen_share_63 = (char *)resBundle_getLocString(res_bundle, "The screen sharing of %s has stopped.");
	char *screen_share_64 = (char *)resBundle_getLocString(res_bundle, "%s is blocked.");
	char *screen_share_66 = (char *)resBundle_getLocString(res_bundle, "If you want to unblock this device, go to 'Settings > Connection > Mobile Connection Management' and delete Screen Share pairing history.");
	char *screen_share_67 = (char *)resBundle_getLocString(res_bundle, "Cancel");
	char *screen_share_68 = (char *)resBundle_getLocString(res_bundle, "Unable to connect with Screen Share. Try again.");
	char *settings_nw_47 = (char *)resBundle_getLocString(res_bundle, "Screen share connection history has been deleted.");


	if(screen_share_1)   free(screen_share_1);
	if(screen_share_4)   free(screen_share_4);
	if(screen_share_5_1) free(screen_share_5_1);
	if(screen_share_5_2) free(screen_share_5_2);
	if(screen_share_8)   free(screen_share_8);
	if(screen_share_19)  free(screen_share_19);
	if(screen_share_21)  free(screen_share_21);
	if(screen_share_22)  free(screen_share_22);
	if(screen_share_33)  free(screen_share_33);
	if(screen_share_34)  free(screen_share_34);
	if(screen_share_35)  free(screen_share_35);
	if(screen_share_36)  free(screen_share_36);
	if(screen_share_37)  free(screen_share_37);
	if(screen_share_40)  free(screen_share_40);
	if(screen_share_41)  free(screen_share_41);
	if(screen_share_42)  free(screen_share_42);
	if(screen_share_43)  free(screen_share_43);
	if(screen_share_54)  free(screen_share_54);
	if(screen_share_58)  free(screen_share_58);
	if(screen_share_59)  free(screen_share_59);
	if(screen_share_60)  free(screen_share_60);
	if(screen_share_61)  free(screen_share_61);
	if(screen_share_62)  free(screen_share_62);
	if(screen_share_63)  free(screen_share_63);
	if(screen_share_64)  free(screen_share_64);
	if(screen_share_66)  free(screen_share_66);
	if(screen_share_67)  free(screen_share_67);
	if(screen_share_68)  free(screen_share_68);
	if(settings_nw_47)   free(settings_nw_47);
}

