// 1. VACIAR EL ARRAY (Usamos 'let' para poder reescribirlo después)
let animalsData = [];

// 2. LÓGICA DEL CURSOR DE RADAR EN VANILLA JS (Se queda exactamente igual)
const cursorOuter = document.getElementById("custom-cursor");
const cursorDot = document.getElementById("custom-cursor-dot");
let mouseX = -100,
  mouseY = -100;
let trailX = -100,
  trailY = -100;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorDot) {
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }
});

function animateRadar() {
  const dx = mouseX - trailX;
  const dy = mouseY - trailY;
  trailX += dx * 0.25;
  trailY += dy * 0.25;

  if (cursorOuter) {
    cursorOuter.style.left = `${trailX}px`;
    cursorOuter.style.top = `${trailY}px`;
  }
  requestAnimationFrame(animateRadar);
}
animateRadar();

// 3. COMPONENTE REACT CON CRUD INTEGRADO
function OceanCatalog() {
  const [favorites, setFavorites] = React.useState([]);
  const [activeFilter, setActiveFilter] = React.useState("Todos");
  const [selectedAnimal, setSelectedAnimal] = React.useState(null);
  const [marqueeAnimals, setMarqueeAnimals] = React.useState([]);

  // Escuchar el cambio de categoría proveniente de los botones del HTML
  React.useEffect(() => {
    const handleZoneChange = (event) => {
      setActiveFilter(event.detail);
    };

    window.addEventListener("swimzoneChanged", handleZoneChange);
    return () =>
      window.removeEventListener("swimzoneChanged", handleZoneChange);
  }, []);

  // Ruleta superior decorativa
  React.useEffect(() => {
    const shuffled = [...animalsData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    setMarqueeAnimals([...selected, ...selected, ...selected]);
  }, []);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // FUNCIONES DE CONTROLADORES CRUD DESDE LA INTERFAZ
  const handleEliminar = async (id, name) => {
    if (confirm(`¿Estás seguro de que deseas eliminar al ${name} para siempre de la base de datos?`)) {
      try {
        const response = await fetch(`http://localhost:8080/api/animals/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setSelectedAnimal(null); // Cerramos el modal
          await extraerAnimalesDeJava(); // Recargamos el grid
        } else {
          alert("Error al intentar eliminar el animal en el servidor.");
        }
      } catch (error) {
        console.error("Error en la petición DELETE:", error);
      }
    }
  };

  const handleEditar = async (animal) => {
    const nuevoNombre = prompt("Modificar Nombre:", animal.name);
    const nuevaUbicacion = prompt("Modificar Ubicación (Océano):", animal.location);
    const nuevaProfundidad = prompt("Modificar Profundidad (Eje: Superficie (0-50 metros)):", animal.depth);
    const nuevaDescripcion = prompt("Modificar Descripción:", animal.description);
    const nuevaImagen = prompt("Modificar URL de Imagen:", animal.image);

    if (nuevoNombre && nuevaUbicacion && nuevaProfundidad && nuevaDescripcion && nuevaImagen) {
      // Importante: Volvemos a empaquetar el objeto con los nombres exactos que espera tu entidad Java
      const animalDetails = {
        name: nuevoNombre,
        ocean: nuevaUbicacion,
        deep: nuevaProfundidad,
        description: nuevaDescripcion,
        urlImagen: nuevaImagen
      };

      try {
        const response = await fetch(`http://localhost:8080/api/animals/${animal.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(animalDetails)
        });

        if (response.ok) {
          alert("¡Especie modificada con éxito!");
          setSelectedAnimal(null); // Cerramos el modal
          await extraerAnimalesDeJava(); // Forzamos la actualización global del catálogo
        } else {
          alert("Error al intentar guardar los cambios.");
        }
      } catch (error) {
        console.error("Error en la petición PUT:", error);
      }
    }
  };

  const filteredAnimals =
    activeFilter === "Todos"
      ? animalsData
      : animalsData.filter((animal) => animal.zone === activeFilter);

  const favoriteAnimals = animalsData.filter((animal) =>
    favorites.includes(animal.id),
  );

  return (
    <>
      {/* 1. Sistema de Ruleta Infinito Decorativo */}
      {marqueeAnimals.length > 0 && (
        <section className="mb-5">
          <div className="container-fluid px-4 px-md-5">
            <h3 className="text-info mb-3 fw-semibold tracking-wider text-uppercase small">
              Ecosistema en Movimiento
            </h3>
          </div>
          <div className="marquee-container">
            <div className="marquee-track">
              <div className="marquee-group">
                {marqueeAnimals.map((animal, index) => {
                  const isFav = favorites.includes(animal.id);
                  return (
                    <div
                      key={`m1-${animal.id}-${index}`}
                      className="card border-0 netflix-card shadow-lg"
                      onClick={() => setSelectedAnimal(animal)}
                    >
                      <div className="card-img-wrapper" style={{ height: "240px" }}>
                        <button
                          type="button"
                          className={`fav-toggle-btn ${isFav ? "is-fav" : ""}`}
                          onClick={(e) => toggleFavorite(e, animal.id)}
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                          </svg>
                        </button>
                        <img src={animal.image} className="custom-img" alt={animal.name} />
                        <div className="card-img-overlay d-flex flex-column justify-content-end overlay-smooth p-3">
                          <h4 className="fw-bold m-0 text-white h5">{animal.name}</h4>
                          <span className="small text-info">{animal.zone}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="marquee-group">
                {marqueeAnimals.map((animal, index) => {
                  const isFav = favorites.includes(animal.id);
                  return (
                    <div
                      key={`m2-${animal.id}-${index}`}
                      className="card border-0 netflix-card shadow-lg"
                      onClick={() => setSelectedAnimal(animal)}
                    >
                      <div className="card-img-wrapper" style={{ height: "240px" }}>
                        <button
                          type="button"
                          className={`fav-toggle-btn ${isFav ? "is-fav" : ""}`}
                          onClick={(e) => toggleFavorite(e, animal.id)}
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                          </svg>
                        </button>
                        <img src={animal.image} className="custom-img" alt={animal.name} />
                        <div className="card-img-overlay d-flex flex-column justify-content-end overlay-smooth p-3">
                          <h4 className="fw-bold m-0 text-white h5">{animal.name}</h4>
                          <span className="small text-info">{animal.zone}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Grid del Catálogo Principal */}
      <main className="container-fluid px-4 px-md-5 mb-5">
        <h3 className="text-info mb-4 fw-semibold tracking-wider text-uppercase small">
          Catálogo de Especies
        </h3>
        <div className="ocean-cards-grid">
          {filteredAnimals.map((animal) => {
            const isFav = favorites.includes(animal.id);
            return (
              <article
                key={animal.id}
                className="card border-0 netflix-card shadow-lg"
                onClick={() => setSelectedAnimal(animal)}
              >
                <div className="card-img-wrapper">
                  <button
                    type="button"
                    className={`fav-toggle-btn ${isFav ? "is-fav" : ""}`}
                    onClick={(e) => toggleFavorite(e, animal.id)}
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>
                  </button>
                  <img src={animal.image} className="card-img-top custom-img" alt={animal.name} />
                  <div className="card-img-overlay d-flex flex-column justify-content-end overlay-smooth p-4">
                    <h2 className="card-title h4 fw-bold mb-1 text-white">{animal.name}</h2>
                    <div className="reveal-content">
                      <span className="badge bg-info text-dark mb-2">{animal.zone}</span>
                      <ul className="list-unstyled small text-info mb-3">
                        <li><strong className="text-light">Ubicación:</strong> {animal.location}</li>
                        <li><strong className="text-light">Profundidad:</strong> {animal.depth}</li>
                      </ul>
                      <p className="card-text small text-secondary mb-4 description-text">{animal.description}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* 3. Colección de Favoritos */}
      {favoriteAnimals.length > 0 && (
        <section className="container-fluid px-4 px-md-5 mb-5">
          <h3 className="text-danger mb-4 fw-semibold tracking-wider text-uppercase small">
            Mi Colección Privada
          </h3>
          <div className="ocean-cards-grid">
            {favoriteAnimals.map((animal) => (
              <article
                key={`fav-${animal.id}`}
                className="card border-0 netflix-card shadow-lg"
                onClick={() => setSelectedAnimal(animal)}
              >
                <div className="card-img-wrapper" style={{ height: "280px" }}>
                  <button
                    type="button"
                    className="fav-toggle-btn is-fav"
                    onClick={(e) => toggleFavorite(e, animal.id)}
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>
                  </button>
                  <img src={animal.image} className="card-img-top custom-img" alt={animal.name} />
                  <div className="card-img-overlay d-flex flex-column justify-content-end overlay-smooth p-4">
                    <h2 className="card-title h4 fw-bold mb-1 text-white">{animal.name}</h2>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 4. Modal Detallado con Botones de Edición y Eliminación Estilizados */}
{selectedAnimal && (
  <div className="custom-modal-overlay" onClick={() => setSelectedAnimal(null)}>
    <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
      
      {/* La X de cerrar ahora se queda sola y limpia en su esquina */}
      <button className="close-modal-btn" onClick={() => setSelectedAnimal(null)}>×</button>
      
      <div className="row g-0">
        {/* Lado Izquierdo: Imagen */}
        <div className="col-12 col-md-6">
          <img
            src={selectedAnimal.image}
            alt={selectedAnimal.name}
            style={{ width: "100%", height: "100%", minHeight: "350px", objectFit: "cover" }}
          />
        </div>
        
        {/* Lado Derecho: Contenido */}
        <div className="col-12 col-md-6 p-4 p-md-5 d-flex flex-column justify-content-center">
          
          <span className="badge bg-info text-dark align-self-start mb-2 text-uppercase tracking-wider px-3 py-2 fw-bold">
            Zona {selectedAnimal.zone}
          </span>
          
          <h2 className="display-5 fw-bold text-white mb-3">{selectedAnimal.name}</h2>
          
          <ul className="list-unstyled mb-4 border-start border-info ps-3 py-1">
            <li className="mb-2">
              <strong className="text-info">Ubicación:</strong>{" "}
              <span className="text-light">{selectedAnimal.location}</span>
            </li>
            <li>
              <strong className="text-info">Profundidad Máxima:</strong>{" "}
              <span className="text-light">{selectedAnimal.depth}</span>
            </li>
          </ul>
          
          <p className="text-secondary lh-lg mb-4 fs-6">{selectedAnimal.description}</p>
          
          {/* SECCIÓN DE ACCIONES: Integrada orgánicamente al final del texto */}
          <div className="d-flex gap-3 pt-3 border-top border-dark mt-auto">
            <button 
              type="button" 
              className="btn btn-sm text-uppercase fw-semibold tracking-wider p-0" 
              style={{ color: '#ffc107', background: 'none', border: 'none', fontSize: '0.8rem', opacity: 0.7 }}
              onMouseOver={(e) => e.target.style.opacity = 1}
              onMouseOut={(e) => e.target.style.opacity = 0.7}
              onClick={() => handleEditar(selectedAnimal)}
            >
              ✏️ Editar Especie
            </button>
            
            <button 
              type="button" 
              className="btn btn-sm text-uppercase fw-semibold tracking-wider p-0" 
              style={{ color: '#dc3545', background: 'none', border: 'none', fontSize: '0.8rem', opacity: 0.7 }}
              onMouseOver={(e) => e.target.style.opacity = 1}
              onMouseOut={(e) => e.target.style.opacity = 0.7}
              onClick={() => handleEliminar(selectedAnimal.id, selectedAnimal.name)}
            >
              🗑️ Eliminar Registro
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
}

// =================================================================
// 4. LÓGICA DE EXTRACCIÓN REAL
// =================================================================
async function extraerAnimalesDeJava() {
  const rootContenedor = document.getElementById("react-catalog-root");

  try {
    const response = await fetch("http://localhost:8080/api/animals");

    if (!response.ok) {
      throw new Error(`El servidor respondió con código: ${response.status}`);
    }

    const datosDesdeJava = await response.json();

    animalsData = datosDesdeJava.map((animal) => {
      return {
        id: animal.id,
        name: animal.name,
        description: animal.description,
        zone: mapearDeepAZona(animal.deep),
        location: animal.ocean, 
        depth: animal.deep, 
        image: animal.urlImagen, 
      };
    });

    if (rootContenedor) rootContenedor.innerHTML = "";

    const root = ReactDOM.createRoot(rootContenedor);
    root.render(<OceanCatalog />);
  } catch (error) {
    console.error("Error al sincronizar con Spring Boot:", error);
  }
}

function mapearDeepAZona(deepTexto) {
  if (!deepTexto) return "Todos";
  const texto = deepTexto.toLowerCase();
  if (texto.includes("superficie")) return "Superficie";
  if (texto.includes("pelagica") || texto.includes("pelágica")) return "Pelágica";
  if (texto.includes("abisal")) return "Abisal";
  return "Todos";
}

// Ejecución automática al cargar la página
extraerAnimalesDeJava();