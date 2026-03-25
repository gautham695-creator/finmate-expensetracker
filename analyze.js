auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    generateBarChart(user.uid);
  }
});

function generateBarChart(uid) {
  const categoryTotals = {
    food: 0,
    travel: 0,
    clothing: 0,
    other: 0,
  };

  db.collection("users")
    .doc(uid)
    .collection("expenses")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        categoryTotals[data.category] += data.amount;
      });

      const ctx = document.getElementById("barChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(categoryTotals),
          datasets: [
            {
              label: "Total Spend (₹)",
              data: Object.values(categoryTotals),
              backgroundColor: ["#42a5f5", "#66bb6a", "#ffa726", "#ab47bc"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Expenses by Category",
              font: { size: 18 },
            },
          },
        },
      });
    });
}

function goBack() {
  window.location.href = "dashboard.html";
}
