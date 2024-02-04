async function estimateTimeUntilWeekend() {
    const workWeekDayEndsInt = 5; // Weekend starts after Friday, 5 represents Friday
    const workWeekHourEndsInt = 22; // Weekend starts at 10:00 PM Friday
    let now;

    const testing = false; // Switch to 'false' to use current date and time

    if (testing) {
        // For testing, we set a specific date and time
        now = new Date(1707310478 * 1000); // Note: Month is 0-indexed, so 6 = July
    } else {
        // Use the current date and time
        now = new Date();
    }

    // Determine if it's already the weekend
    let isWeekend = now.getDay() > workWeekDayEndsInt || 
                    (now.getDay() === workWeekDayEndsInt && now.getHours() >= workWeekHourEndsInt);

    if (isWeekend) {
        document.getElementById("weekendTime").innerHTML = `<p>It's the weekend already. Enjoy!</p>`;
    } else {
        // Calculate time until weekend starts
        let weekendStart = new Date(now);
        if (now.getDay() < workWeekDayEndsInt) {
            // If it's before Friday, set to next Friday
            weekendStart.setDate(now.getDate() + (workWeekDayEndsInt - now.getDay()));
        }
        weekendStart.setHours(workWeekHourEndsInt, 0, 0, 0); // Set to 10:00 PM Friday

        const diff = weekendStart - now; // Difference in milliseconds
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        // Format the string to display
        const timeString = `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
        document.getElementById("weekendTime").innerHTML = `<p>Time until weekend: ${timeString}</p>`;
    }
}

// Update the time until the weekend every second
setInterval(estimateTimeUntilWeekend, 1000);

// Call it once on page load
estimateTimeUntilWeekend();
