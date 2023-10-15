// Datos iniciales de materias (simulados)
var materiasData = JSON.parse(localStorage.getItem('studentsData')) || [ 
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
  
  // Cargar materias iniciales
  cargarMaterias(1); // Mostrar materias del 1er semestre por defecto
  