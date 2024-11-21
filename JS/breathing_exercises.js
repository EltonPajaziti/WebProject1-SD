document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-breathing-btn');
    const stopButton = document.getElementById('stop-breathing-btn');
    const circle = document.getElementById('breathing-circle');

    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    let colorIndex = 0;
    let isBreathing = false;
    let growing = true; // Gjendja fillestare: duke u zmadhuar
    let breathingInterval;

    function toggleCircleSizeAndColor() {
        if (growing) {
            // Zmadho rrethin dhe ndrysho ngjyrën
            circle.style.width = '200px';
            circle.style.height = '200px';
            circle.style.backgroundColor = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length; // Ndërron ngjyrën
        } else {
            // Zvogëlo rrethin
            circle.style.width = '100px';
            circle.style.height = '100px';
        }
        growing = !growing; // Ndërron gjendjen
    }

    startButton.addEventListener('click', () => {
        if (!isBreathing) {
            isBreathing = true;
            toggleCircleSizeAndColor(); // Fillon me një ndryshim
            breathingInterval = setInterval(toggleCircleSizeAndColor, 4000); // Ndërron çdo 4 sekonda
        }
    });

    stopButton.addEventListener('click', () => {
        isBreathing = false;
        clearInterval(breathingInterval); // Ndalon ciklin
    });
});




//---------------------------------------------------------------------------------------------------------------------------------------


// $(document).ready(function () {
//     $('#start-test-btn').click(function () {
//         $('#chart-container').css({
//             position: 'absolute', 
//             left: '50%', 
//             transform: 'translateX(-50%)'
//         });

//         $('#chart-container').show();
//         $('#stop-test-btn').show();
//         $('#results').hide();
//         $('#status-message').text('Inhale...');

//         const ctx = document.getElementById('lung-chart').getContext('2d');
//         const chart = new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: [],
//                 datasets: [{
//                     label: 'Lung Capacity Test',
//                     data: [],
//                     borderColor: 'rgba(75, 192, 192, 1)',
//                     borderWidth: 2,
//                     fill: false,
//                 }]
//             },
//             options: {
//                 scales: {
//                     x: {
//                         type: 'linear',
//                         position: 'bottom',
//                         title: {
//                             display: true,
//                             text: 'Time (seconds)'
//                         }
//                     },
//                     y: {
//                         title: {
//                             display: true,
//                             text: 'Lung Capacity'
//                         },
//                         min: 0,
//                         max: 100
//                     }
//                 }
//             }
//         });

//         let time = 0;
//         let phase = 'inhaling'; 
//         let stopTest = false;

//         const interval = setInterval(function () {
//             if (stopTest) {
//                 clearInterval(interval);
//                 return;
//             }

//             time += 1;
//             let value;

//             if (phase === 'inhaling') {
//                 value = Math.min(time * 8, 70); 
//                 if (time >= 10) {
//                     phase = 'holding';
//                     time = 0;
//                     $('#status-message').text('Hold your breath...');
//                 }
//             } else if (phase === 'holding') {
//                 value = 70; 
//                 if (time >= 60) {
//                     phase = 'exhaling';
//                     time = 0;
//                     $('#status-message').text('Exhale...');
//                 }
//             } else if (phase === 'exhaling') {
//                 value = Math.max(70 - time * 7, 0);
//                 if (time >= 10) {
//                     clearInterval(interval);
//                     calculateLungPerformance(time);
//                 }
//             }

//             chart.data.labels.push(chart.data.labels.length);
//             chart.data.datasets[0].data.push(value);
//             chart.update();
//         }, 1000);

//         $('#stop-test-btn').click(function () {
//             stopTest = true;
//             calculateLungPerformance(time);
//         });

//         function calculateLungPerformance(finalTime) {
//             $('#chart-container').show();
//             $('#stop-test-btn').hide();
            
//             // Kur tshfaqet grafiku i rezultateve, rivendosi pozitat e tij
//             $('#chart-container').css({
//                 position: 'relative',
//                 left: 'auto',
//                 transform: 'translateX(0%)'
//             });

//             $('#results').show();

//             let percentage;
//             if (finalTime >= 30 && finalTime < 60) {
//                 percentage = 75;
//             } else if (finalTime >= 60) {
//                 percentage = 100;
//             } else {
//                 percentage = 50;
//             }
//             $('#lung-percentage').text(percentage + '%');

//             const resultCtx = document.getElementById('results-chart').getContext('2d');
//             new Chart(resultCtx, {
//                 type: 'bar',
//                 data: {
//                     labels: ['Lung Capacity'],
//                     datasets: [{
//                         label: 'Performance',
//                         data: [percentage],
//                         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//                         borderColor: 'rgba(75, 192, 192, 1)',
//                         borderWidth: 1
//                     }]
//                 },
//                 options: {
//                     scales: {
//                         y: {
//                             beginAtZero: true,
//                             max: 100
//                         }
//                     }
//                 }
//             });
//         }
//     });
// });


