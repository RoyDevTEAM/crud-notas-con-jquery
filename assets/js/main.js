




$(document).ready(function () {
    // Recuperar datos de estudiantes de localStorage al cargar la página
    var studentsData = JSON.parse(localStorage.getItem('studentsData')) ||  [
        { id: 1, nombre: 'John Doe', apellido: 'Smith', ci: '12345', correo: 'john@example.com' },
        { id: 2, nombre: 'Jane Smith', apellido: 'Doe', ci: '67890', correo: 'jane@example.com' },
        { id: 3, nombre: 'Alice Johnson', apellido: 'Brown', ci: '54321', correo: 'alice@example.com' },
        { id: 4, nombre: 'Bob Brown', apellido: 'Johnson', ci: '09876', correo: 'bob@example.com' },
        { id: 5, nombre: 'Eve Davis', apellido: 'Wilson', ci: '11111', correo: 'eve@example.com' }
      ];;
  
    // Variable para rastrear el estudiante actualmente en edición
    var estudianteEditando = null;
    var materiasData = JSON.parse(localStorage.getItem('materiasData')) || [ 
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
        { semestre: 2, nombre: 'Sistemas Operativos I' },
        { semestre: 2, nombre: 'Deontología y Prosocialidad' },
        { semestre: 3, nombre: 'Cálculo I' },
        { semestre: 3, nombre: 'Sistemas Digitales II' },
        { semestre: 3, nombre: 'Investigación Operativa I' },
        { semestre: 3, nombre: 'Programación II' },
        { semestre: 3, nombre: 'Taller de Sistemas Operativos I' },
        { semestre: 3, nombre: 'Inglés II' },
        // Agrega las materias restantes aquí
      
        // Las materias iniciales aquí
      ];
      
    // Función para cargar estudiantes en la tabla
    function cargarEstudiantes() {
      $('#students-table').empty();
      studentsData.forEach(function (student, index) {
        $('#students-table').append(
          `<tr>
            <td>${student.id}</td>
            <td>${student.nombre}</td>
            <td>${student.apellido}</td>
            <td>${student.ci}</td>
            <td>${student.correo}</td>
            <td>
              <button class="btn btn-info btn-editar" data-id="${student.id}">Editar</button>
              <button class="btn btn-danger btn-eliminar" data-id="${student.id}">Eliminar</button>
            </td>
          </tr>`
        );
      });
    }
  
    // Función para guardar datos de estudiantes en localStorage
    function guardarEstudiantesEnLocalStorage() {
      localStorage.setItem('studentsData', JSON.stringify(studentsData));
    }
  
    // Agregar o actualizar estudiante
    function agregarOActualizarEstudiante(_id, nombre, apellido, ci, correo) {
      if (estudianteEditando === null) {
        // Agregar un nuevo estudiante
        var newStudent = {
          id: studentsData.length + 1,
          nombre: nombre,
          apellido: apellido,
          ci: ci,
          correo: correo
        };
        studentsData.push(newStudent);
      } else {
        // Actualizar el estudiante existente
        var student = studentsData.find(s => s.id === estudianteEditando);
        student.nombre = nombre;
        student.apellido = apellido;
        student.ci = ci;
        student.correo = correo;
        estudianteEditando = null;
      }
  
      cargarEstudiantes();
      $('#agregarEstudianteModal').modal('hide');
      // Limpia el formulario
      $('#student-form')[0].reset();
      guardarEstudiantesEnLocalStorage();
    }
  
    // Buscar estudiante por ID
    $('#buscarIdBtn').click(function () {
      var buscarId = $('#buscarIdInput').val();
      var student = studentsData.find(s => s.id === parseInt(buscarId));
  
      if (student) {
        // Mostrar el estudiante encontrado en el modal de edición
        $('#nombre').val(student.nombre);
        $('#apellido').val(student.apellido);
        $('#ci').val(student.ci);
        $('#correo').val(student.correo);
  
        estudianteEditando = student.id;
  
        $('#agregarEstudianteModal').modal('show');
      } else {
        alert('Estudiante no encontrado');
      }
    });
  
    // Agregar estudiante
    $('#agregarEstudianteBtn').click(function () {
      var nombre = $('#nombre').val();
      var apellido = $('#apellido').val();
      var ci = $('#ci').val();
      var correo = $('#correo').val();
  
      if (nombre && apellido && ci && correo) {
        agregarOActualizarEstudiante(estudianteEditando, nombre, apellido, ci, correo);
      }
    });
  
    // Editar estudiante
    $('#students-table').on('click', '.btn-editar', function () {
      estudianteEditando = $(this).data('id');
      var student = studentsData.find(s => s.id === estudianteEditando);
  
      if (student) {
        $('#nombre').val(student.nombre);
        $('#apellido').val(student.apellido);
        $('#ci').val(student.ci);
        $('#correo').val(student.correo);
  
        $('#agregarEstudianteModal').modal('show');
      }
    });
  
    // Eliminar estudiante
    $('#students-table').on('click', '.btn-eliminar', function () {
      var studentId = $(this).data('id');
      studentsData = studentsData.filter(s => s.id !== studentId);
      cargarEstudiantes();
      guardarEstudiantesEnLocalStorage();
    });
    // Función para cargar materias en la tabla
    function cargarMaterias(semestreSeleccionado) {
      $('#materias-table').empty();
      materiasData.forEach(function (materia, index) {
        if (semestreSeleccionado === materia.semestre) {
          $('#materias-table').append(
            `<tr>
              <td>${materia.semestre}º Semestre</td>
              <td>${materia.nombre}</td>
              <td>
                <button class="btn btn-info btn-editar" data-semestre="${materia.semestre}" data-nombre="${materia.nombre}">Editar</button>
                <button class="btn btn-danger btn-eliminar" data-semestre="${materia.semestre}" data-nombre="${materia.nombre}">Eliminar</button>
              </td>
            </tr>`
          );
        }
      });
    }
    
    // Filtro por semestre
    $('#filtroSemestre').change(function () {
      var semestreSeleccionado = parseInt($(this).val());
      cargarMaterias(semestreSeleccionado);
    });
    
    // Función para guardar las materias en el localStorage
    function guardarMateriasEnLocalStorage() {
      localStorage.setItem('materiasData', JSON.stringify(materiasData));
    }
    
    // Agregar materia
    $('#agregarMateriaBtn').click(function () {
      var semestre = $('#semestre').val();
      var nombreMateria = $('#nombreMateria').val();
    
      if (semestre && nombreMateria) {
        // Agregar una nueva materia
        materiasData.push({ semestre: parseInt(semestre), nombre: nombreMateria });
        cargarMaterias(parseInt(semestre));
        $('#agregarMateriaModal').modal('hide');
        // Limpia el formulario
        $('#materia-form')[0].reset();
        // Guardar las materias en el localStorage
        guardarMateriasEnLocalStorage();
      }
    });
    
    // Editar materia
    var materiaAEditar = null;
    
    $('#materias-table').on('click', '.btn-editar', function () {
      materiaAEditar = {
        semestre: $(this).data('semestre'),
        nombre: $(this).data('nombre')
      };
      $('#semestre').val(materiaAEditar.semestre);
      $('#nombreMateria').val(materiaAEditar.nombre);
      $('#agregarMateriaModal').modal('show');
    });
    
    $('#editarMateriaBtn').click(function () {
      var semestre = $('#semestre').val();
      var nombreMateria = $('#nombreMateria').val();
    
      if (semestre && nombreMateria) {
        // Actualiza la materia existente
        materiaAEditar.semestre = parseInt(semestre);
        materiaAEditar.nombre = nombreMateria;
    
        // Encuentra y actualiza la materia en el arreglo de datos
        materiasData = materiasData.map(function (materia) {
          if (materia.semestre === materiaAEditar.semestre && materia.nombre === materiaAEditar.nombre) {
            return materiaAEditar;
          }
          return materia;
        });
    
        cargarMaterias(parseInt(semestre));
        $('#agregarMateriaModal').modal('hide');
        // Limpia el formulario
        $('#materia-form')[0].reset();
        // Guardar las materias en el localStorage
        guardarMateriasEnLocalStorage();
      }
    });
    
    // Eliminar materia
    $('#materias-table').on('click', '.btn-eliminar', function () {
      var semestre = $(this).data('semestre');
      var nombreMateria = $(this).data('nombre');
    
      materiasData = materiasData.filter(function (materia) {
        return !(materia.semestre === semestre && materia.nombre === nombreMateria);
      });
    
      var semestreSeleccionado = parseInt($('#filtroSemestre').val());
      cargarMaterias(semestreSeleccionado);
      // Guardar las materias en el localStorage
      guardarMateriasEnLocalStorage();
    });
    
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
        var estudiante = studentsData.find(est => est.id == idEstudiante);
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
        // Crear un objeto para representar el registro de materia
        var registroMateria = {
            idEstudiante: idEstudiante,
            nombreEstudiante: nombreEstudiante,
            materia: materia
        };

        // Obtener los registros de materias del almacenamiento local o inicializar un arreglo vacío
        var registrosMaterias = JSON.parse(localStorage.getItem('registrosMaterias')) || [];

        // Agregar el nuevo registro de materia al arreglo
        registrosMaterias.push(registroMateria);

        // Guardar los registros actualizados en el almacenamiento local
        localStorage.setItem('registrosMaterias', JSON.stringify(registrosMaterias));

        var url = `comprobante.html?id=${idEstudiante}&nombre=${nombreEstudiante}&materia=${materia}`;
        window.location.href = url;
    }
    
});

    // Cargar materias iniciales
    cargarMaterias(1); // Mostrar materias del 1er semestre por defecto
  
    // Cargar estudiantes iniciales desde localStorage
    cargarEstudiantes();
  });
  