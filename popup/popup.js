async function calculateHours() {
  const businessDays = parseInt(document.getElementById('businessDays').value) || 0;
  const bonusDays = parseInt(document.getElementById('bonusDays').value) || 0;
  
  const totalHours = (businessDays + bonusDays) * 7;
  document.getElementById('totalHours').textContent = totalHours;

  await browser.storage.sync.set({ businessDays, bonusDays });
}

// Initialisation
(async () => {
  const { businessDays = 20, bonusDays = 0 } = await browser.storage.sync.get(['businessDays', 'bonusDays']);
  
  document.getElementById('businessDays').value = businessDays;
  document.getElementById('bonusDays').value = bonusDays;
  
  document.getElementById('businessDays').addEventListener('input', calculateHours);
  document.getElementById('bonusDays').addEventListener('input', calculateHours);
  
  document.getElementById('fetchHours').addEventListener('click', async () => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    browser.tabs.sendMessage(tab.id, { action: "fetchHours" });
  });
  
  calculateHours();
})();
