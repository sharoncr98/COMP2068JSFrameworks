document.addEventListener("DOMContentLoaded", async () => {
  const ctx = document.getElementById("chart");
  const r = await fetch("/api/dashboard-data");
  const data = await r.json();
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Workouts", "Meals", "Mood"],
      datasets: [{
        data: [data.workouts, data.meals, data.moods]
      }]
    }
  });
});