export const refreshTokens = (res) => {

    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refresh = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

        //console.log("newAuthRes :",newAuthRes);

        //console.log("new token: ", newAuthRes.id_token);

        setTimeout(refresh, refreshTiming)

    }

    setTimeout(refresh, refreshTiming)
}


