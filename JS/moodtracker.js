// Initialize mood data
const moodData = JSON.parse(localStorage.getItem('moodData')) || {};

// Form submission handler
document.getElementById('mood-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const mood = parseInt(document.getElementById('mood').value);
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentHour = now.getHours();

    // Ensure user submits only once per hour
    if (!moodData[today]) {
        moodData[today] = {};
    }

    if (moodData[today][currentHour]) {
        alert('You have already submitted your mood for this hour!');
        return;
    }

    // Save mood for the current hour
    moodData[today][currentHour] = mood;

    // Update localStorage
    localStorage.setItem('moodData', JSON.stringify(moodData));

    alert('Mood submitted successfully!');
    renderDailyLineChart();
    renderWeeklyLineChart();
});

// Generate hourly labels for daily chart (00:00 to 23:00)
function generateHourlyLabels() {
    return Array.from({ length: 24 }, (_, i) => {
        const hour = i < 10 ? `0${i}:00` : `${i}:00`;
        return hour;
    });
}

// Render daily line chart
function renderDailyLineChart() {
    const canvas = document.getElementById('daily-line-chart');
    const ctx = canvas.getContext('2d');
    const today = new Date().toISOString().split('T')[0];
    const todayData = moodData[today] || {};

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const labels = generateHourlyLabels();
    const moods = hours.map(hour => todayData[hour] || null);

    drawLineChart(ctx, labels, moods, "Time", "Mood");
}

// Generate weekly labels dynamically (Monday to Sunday)
function generateWeeklyLabels() {
    const labels = [];
    const today = new Date();
    const dayIndex = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date();
        currentDate.setDate(today.getDate() - dayIndex + i); // Calculate correct day
        labels.push(currentDate.toLocaleDateString('en-US', { weekday: 'short' })); // Mon, Tue, etc.
    }

    return labels;
}

// Render weekly line chart
function renderWeeklyLineChart() {
    const canvas = document.getElementById('weekly-line-chart');
    const ctx = canvas.getContext('2d');

    const labels = generateWeeklyLabels();
    const last7Days = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() - today.getDay() + i); // Correct calculation for the week (Sunday to Saturday)
        last7Days.push(date.toISOString().split('T')[0]);
    }

    const moods = last7Days.map(date => {
        const dayData = moodData[date] || {};
        const totalMoods = Object.values(dayData);
        if (totalMoods.length > 0) {
            // Calculate average and use Math.ceil to round up correctly
            return Math.ceil(totalMoods.reduce((a, b) => a + b, 0) / totalMoods.length);
        } else {
            return null; // No data for the day
        }
    });

    drawLineChart(ctx, labels, moods, "Day", "Mood");
}

// Draw line chart with green color and improved font size
function drawLineChart(ctx, labels, data, xLabel, yLabel) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const margin = 70;

    ctx.clearRect(0, 0, width, height);

    // Draw background under the chart
    ctx.fillStyle = 'rgba(72, 190, 150, 0.1)'; // Light green background
    ctx.fillRect(margin, margin, width - margin * 2, height - margin * 2);

    // Axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, height - margin);
    ctx.stroke();

    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.stroke();

    // Draw labels and grid lines
    ctx.font = '16px Arial'; // Larger font size
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';

    // X-axis labels
    const xStep = (width - margin * 2) / (labels.length - 1);
    labels.forEach((label, i) => {
        const x = margin + i * xStep;
        ctx.fillText(label, x, height - margin + 30); // Adjust for better readability
    });

    // Y-axis labels and grid
    const yStep = (height - margin * 2) / 10; // Mood range is 1-10
    for (let i = 1; i <= 10; i++) {
        const y = height - margin - ((i - 1) / 9) * (height - margin * 2);
        ctx.fillText(i, margin - 40, y + 5); // Larger space for Y-axis labels
        ctx.strokeStyle = '#ddd'; // Light grid line
        ctx.beginPath();
        ctx.moveTo(margin, y);
        ctx.lineTo(width - margin, y);
        ctx.stroke();
    }

    // Draw line chart
    ctx.strokeStyle = '#4caf50'; // Green color for line
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((value, i) => {
        if (value !== null) {
            const x = margin + i * xStep;
            const y = height - margin - ((value - 1) / 9) * (height - margin * 2);

            if (i === 0 || data[i - 1] === null) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
    });
    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#4caf50'; // Green color for points
    data.forEach((value, i) => {
        if (value !== null) {
            const x = margin + i * xStep;
            const y = height - margin - ((value - 1) / 9) * (height - margin * 2);
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2); // Larger point size
            ctx.fill();
        }
    });
}

// Render charts on page load
renderDailyLineChart();
renderWeeklyLineChart();
