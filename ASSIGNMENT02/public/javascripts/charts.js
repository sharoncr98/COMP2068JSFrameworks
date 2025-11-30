document.addEventListener('DOMContentLoaded', function() {
  //get data
  const chartDataElement = document.getElementById('chartData');
  if (!chartDataElement) return;
  const chartData = JSON.parse(chartDataElement.textContent);
  //workout data and styling
  const workoutCtx = document.getElementById('workoutChart');
  if (workoutCtx) {
    new Chart(workoutCtx, {
      type: 'line',
      data: {
        labels: chartData.workouts.labels,
        datasets: [{
          label: 'Workout Duration (minutes)',
          data: chartData.workouts.data,
          backgroundColor: 'rgba(101, 170, 194, 0.2)',
          borderColor: 'rgba(101, 170, 194, 1)',
          borderWidth: 3,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  //food data and styling
  const caloriesCtx = document.getElementById('caloriesChart');
  if (caloriesCtx) {
    new Chart(caloriesCtx, {
      type: 'bar',
      data: {
        labels: chartData.meals.labels,
        datasets: [{
          label: 'Daily Calories',
          data: chartData.meals.data,
          backgroundColor: 'rgba(173, 186, 94, 0.7)',
          borderColor: 'rgba(173, 186, 94, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  //mood data
  const moodCtx = document.getElementById('moodChart');
  if (moodCtx) {
    new Chart(moodCtx, {
      type: 'doughnut',
      data: {
        labels: chartData.moods.labels,
        datasets: [{
          label: 'Mood Distribution',
          data: chartData.moods.data,
          backgroundColor: [
            'rgba(101, 170, 194, 0.8)',
            'rgba(173, 186, 94, 0.8)',
            'rgba(134, 154, 105, 0.8)',
            'rgba(231, 229, 215, 0.8)',
            'rgba(101, 170, 194, 0.6)',
            'rgba(173, 186, 94, 0.6)',
            'rgba(134, 154, 105, 0.6)',
            'rgba(231, 229, 215, 0.6)',
            'rgba(101, 170, 194, 0.4)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right'
          }
        }
      }
    });
  }
});