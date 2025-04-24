
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchHours") {
    const hoursElements = Array.from(document.querySelectorAll('*'))
      .filter(el => el.textContent.match(/\d+\s*h/i));
    
    const hours = hoursElements
      .map(el => parseFloat(el.textContent.replace(',', '.')) || 0)
      .reduce((a, b) => a + b, 0);

    browser.runtime.sendMessage({ 
      type: "hoursUpdate",
      hours: Math.round(hours * 100) / 100
    });
  }
});
