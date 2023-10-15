$(document).ready(function () {
   // data.js
   var estudiantesData = [
    { id: 1, nombre: 'John Doe', apellido: 'Smith', ci: '12345', correo: 'john@example.com' },
    { id: 2, nombre: 'Jane Smith', apellido: 'Doe', ci: '67890', correo: 'jane@example.com' },
    { id: 3, nombre: 'Alice Johnson', apellido: 'Brown', ci: '54321', correo: 'alice@example.com' },
    { id: 4, nombre: 'Bob Brown', apellido: 'Johnson', ci: '09876', correo: 'bob@example.com' },
    { id: 5, nombre: 'Eve Davis', apellido: 'Wilson', ci: '11111', correo: 'eve@example.com' }
  ];
  
  var materiasData = [
    { semestre: 1, nombre: 'Estructuras Discretas' },
    { semestre: 1, nombre: 'Fundamentos de Matemáticas' },
    { semestre: 1, nombre: 'Hardware y Software' },
    { semestre: 1, nombre: 'Programación Básica' },
    { semestre: 1, nombre: 'Técnicas de Investigación' },
    { semestre: 1, nombre: 'Inglés I' },
    { semestre: 2, nombre: 'Álgebra Lineal' },
    { semestre: 2, nombre: 'Sistemas Digitales I' },
    { semestre: 2, nombre: 'Física I' },
    { semestre: 2, nombre: 'Programación I' },
    // Agrega las materias restantes aquí
  ];
  

    // Función para cargar las opciones de materias en el select
    function cargarOpcionesMaterias() {
      var selectMaterias = $('#materia');
      selectMaterias.empty();
      materiasData.forEach(function (materia) {
        selectMaterias.append(`<option value="${materia.nombre}">${materia.nombre}</option>`);
      });
    }

    
    // Buscar estudiante por ID
    $('#buscarEstudianteBtn').click(function () {
      var idEstudiante = $('#buscarEstudianteId').val();
      var estudiante = estudiantesData.find(est => est.id == idEstudiante);
      if (estudiante) {
        $('#nombreEstudiante').val(estudiante.nombre);
        $('#idEstudiante').val(estudiante.id);
        $('#registroMateriaModal').modal('show');
        cargarOpcionesMaterias();
      } else {
        alert('Estudiante no encontrado');
      }
    });

    // Registrar materia
    $('#registrarMateriaBtn').click(function () {
      var idEstudiante = $('#idEstudiante').val();
      var nombreEstudiante = $('#nombreEstudiante').val();
      var materia = $('#materia').val();
      if (idEstudiante && nombreEstudiante && materia) {
        var url = `comprobante.html?id=${idEstudiante}&nombre=${nombreEstudiante}&materia=${materia}`;
        window.location.href = url;
      }
    });
});
