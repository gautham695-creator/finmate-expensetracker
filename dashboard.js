const budgets = {
  food: 5000,
  travel: 3000,
  clothing: 2000,
  other: 1000,
};

auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    fetchExpenses();
  }
});

function addExpense() {
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (!desc || isNaN(amount)) {
    alert("Please enter a valid description and amount.");
    return;
  }

  const user = auth.currentUser;

  db.collection("users")
    .doc(user.uid)
    .collection("expenses")
    .add({
      desc,
      amount,
      category,
      createdAt: new Date(),
    })
    .then(() => {
      document.getElementById("desc").value = "";
      document.getElementById("amount").value = "";
      fetchExpenses();
    });
}

function fetchExpenses() {
  const user = auth.currentUser;
  const expenseList = document.getElementById("expenses");
  const budgetBars = document.getElementById("budget-bars");

  expenseList.innerHTML = "";
  budgetBars.innerHTML = "";

  const categoryTotals = {
    food: 0,
    travel: 0,
    clothing: 0,
    other: 0,
  };

  db.collection("users")
    .doc(user.uid)
    .collection("expenses")
    .orderBy("createdAt", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const exp = doc.data();
        categoryTotals[exp.category] += exp.amount;

        const div = document.createElement("div");
        div.className = "expense-item";
        div.innerHTML = `
          <strong>${exp.category.toUpperCase()}</strong> - ${exp.desc}: ₹${exp.amount}
          <button onclick="deleteExpense('${doc.id}')">🗑️</button>
        `;
        expenseList.appendChild(div);
      });

      // Show progress bars
      for (let cat in categoryTotals) {
        const percent = Math.min((categoryTotals[cat] / budgets[cat]) * 100, 100);
        const bar = document.createElement("div");
        bar.className = "budget-bar";
        bar.innerHTML = `
          <label>${cat.toUpperCase()} - ₹${categoryTotals[cat]} / ₹${budgets[cat]}</label>
          <div class="bar-container">
            <div class="bar-fill" style="width:${percent}%; background-color:${
              percent > 80 ? "#e53935" : "#43a047"
            }"></div>
          </div>
        `;
        budgetBars.appendChild(bar);
      }
    });
}

function deleteExpense(id) {
  const user = auth.currentUser;
  db.collection("users")
    .doc(user.uid)
    .collection("expenses")
    .doc(id)
    .delete()
    .then(() => fetchExpenses());
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}

function goToAnalyze() {
  window.location.href = "analyze.html";
}
