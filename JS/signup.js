document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Parandalon rifreskimin e faqes

    // Merr të dhënat nga forma
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Verifikon nëse fjalëkalimet përputhen
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Krijo një objekt përdoruesi
    const user = {
        firstName,
        lastName,
        email,
        gender,
        password
    };

    // Ruaj të dhënat në localStorage
    localStorage.setItem(email, JSON.stringify(user));

    alert('Account created successfully!');
    // Ridrejto në faqen e login-it
    window.location.href = 'login.html';
});