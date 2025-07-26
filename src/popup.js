document.addEventListener('DOMContentLoaded', () => {
    const loadingSpinner = document.getElementById('loading');
    const statsContent = document.getElementById('stats-content');
    const statusMessageDiv = document.getElementById('status-message');

    function displayGlobalStats(stats) {
        document.getElementById('global-total-users').textContent = stats.total_users || 'N/A';
        document.getElementById('global-total-images').textContent = stats.total_images || 'N/A';
        document.getElementById('global-total-links').textContent = stats.total_links || 'N/A';
        document.getElementById('global-storage-used').textContent = `${stats.total_storage_used_mb || 'N/A'} MB (${stats.storage_percentage || 'N/A'}%)`;
    }

    function updateStatusMessage(message, isError = false) {
        statusMessageDiv.textContent = message;
        statusMessageDiv.style.backgroundColor = isError ? '#ffebeb' : '#e6f7ff';
        statusMessageDiv.style.color = isError ? '#dc3545' : '#666';
        statusMessageDiv.style.display = 'block';
    }

    async function loadStats() {
        loadingSpinner.style.display = 'block';
        statsContent.style.display = 'none';
        statusMessageDiv.style.display = 'none';

        try {
            const result = await chrome.storage.local.get(['globalStatsCache', 'lastUpdated']);
            
            if (result.globalStatsCache) {
                displayGlobalStats(result.globalStatsCache);
                updateStatusMessage(`Using cached data. Last updated: ${new Date(result.lastUpdated || Date.now()).toLocaleTimeString()}`);
                statsContent.style.display = 'block';
            }

            chrome.runtime.sendMessage({ action: "fetchGlobalStats" });

        } catch (e) {
            console.error("Error loading stats from storage:", e);
            updateStatusMessage("Could not load local data. Try fetching fresh stats.", true);
            loadingSpinner.style.display = 'none';
            statsContent.style.display = 'block';
        }
    }

    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "globalStatsFetched") {
            loadingSpinner.style.display = 'none';
            statsContent.style.display = 'block';
            if (message.error) {
                updateStatusMessage(`Error: ${message.error}`, true);
            } else {
                displayGlobalStats(message.globalStats);
                updateStatusMessage(`Last updated: ${new Date(message.lastUpdated).toLocaleTimeString()}`);
            }
        }
    });

    loadStats();
});
