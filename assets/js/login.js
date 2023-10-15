function login() {
    var username = $('#username').val();
    var password = $('#password').val();

    if (username === 'usuario' && password === 'contraseña') {
      // Cambiar el contenedor al estado de inicio de sesión exitoso
      $('.login-container').addClass('login-success');
      // Agregar animaciones adicionales o redirigir a otra página
      setTimeout(function() {
        alert('¡Inicio de sesión exitoso!');
        // Redirigir al usuario a la página de inicio después de la validación
        window.location.href = 'index.html';
      }, 1500); // Esperar 1.5 segundos antes de redirigir
    } else {
      alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  }