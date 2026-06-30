// ===========================
// BURGER MENU
// ===========================
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ===========================
// BACK TO TOP
// ===========================
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
});

// ===========================
// FORM VALIDATION
// ===========================
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function showError(fieldId, errorId, msg) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.add('error');
  error.textContent = msg;
}

function clearError(fieldId, errorId) {
  document.getElementById(fieldId).classList.remove('error');
  document.getElementById(errorId).textContent = '';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.textContent = '';
  let valid = true;

  const nom = document.getElementById('nom').value.trim();
  const prenom = document.getElementById('prenom').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!nom) {
    showError('nom', 'nomError', 'Veuillez entrer votre nom.');
    valid = false;
  } else {
    clearError('nom', 'nomError');
  }

  if (!prenom) {
    showError('prenom', 'prenomError', 'Veuillez entrer votre prénom.');
    valid = false;
  } else {
    clearError('prenom', 'prenomError');
  }

  if (!email) {
    showError('email', 'emailError', 'Veuillez entrer votre email.');
    valid = false;
  } else if (!validateEmail(email)) {
    showError('email', 'emailError', 'Format d\'email invalide.');
    valid = false;
  } else {
    clearError('email', 'emailError');
  }

  if (!message) {
    showError('message', 'messageError', 'Veuillez écrire un message.');
    valid = false;
  } else {
    clearError('message', 'messageError');
  }

  if (valid) {
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Envoi en cours…';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Envoyer ma demande';
      formSuccess.textContent = 'Merci ! Votre message a bien été envoyé. Nous vous recontacterons très rapidement.';
    }, 1200);
  }
});

// Clear errors on input
['nom', 'prenom', 'email', 'message'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById(id).classList.remove('error');
    const errorEl = document.getElementById(id + 'Error');
    if (errorEl) errorEl.textContent = '';
  });
});
