const API_BASE_URL = "https://dsc.pics/api";

async function fetchGlobalStats() {
    let globalStats = null;
    let error = null;

    try {
        const globalResponse = await fetch(`${API_BASE_URL}/stats/global`);
        if (!globalResponse.ok) {
            throw new Error(`HTTP error! status: ${globalResponse.status}`);
        }
        globalStats = await globalResponse.json();
        globalStats = globalStats.global;

        const lastUpdated = Date.now();
        await chrome.storage.local.set({
            globalStatsCache: globalStats,
            lastUpdated: lastUpdated
        });

        chrome.runtime.sendMessage({
            action: "globalStatsFetched",
            globalStats: globalStats,
            lastUpdated: lastUpdated
        });

    } catch (e) {
        console.error("Failed to fetch global stats:", e);
        error = e.message;

        try {
            const cached = await chrome.storage.local.get(['globalStatsCache', 'lastUpdated']);
            chrome.runtime.sendMessage({
                action: "globalStatsFetched",
                globalStats: cached.globalStatsCache || null,
                lastUpdated: cached.lastUpdated || null,
                error: `Could not fetch fresh data. ${error} Using cached data.`
            });
        } catch (cacheError) {
            console.error("Failed to load from cache after fetch error:", cacheError);
            chrome.runtime.sendMessage({ action: "globalStatsFetched", error: `Failed to load any data: ${error}` });
        }
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchGlobalStats") {
        fetchGlobalStats();
    }
});

chrome.alarms.create("fetchGlobalStatsAlarm", { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "fetchGlobalStatsAlarm") {
        fetchGlobalStats();
    }
});

chrome.runtime.onInstalled.addListener(() => {
    fetchGlobalStats();
});
