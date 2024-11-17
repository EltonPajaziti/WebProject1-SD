document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Parandalon rifreskimin e faqes

    // Merr te dhënat nga forma
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Kontrollo në localStorage
    const user = localStorage.getItem(email);

    if (user) {
        const userData = JSON.parse(user);

        // Verifikon fjalëkalimin
        if (userData.password === password) {
            alert('Login successful!');
            // Ridrejto në faqen kryesore
            window.location.href = 'index.html';
        } else {
            alert('Incorrect password!');
        }
    } else {
        alert('User not found!');
    }
});