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
}
