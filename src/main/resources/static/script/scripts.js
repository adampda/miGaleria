// 1. VACIAR EL ARRAY (Usamos 'let' para poder reescribirlo después)
let animalsData = [];


// 2. LÓGICA DEL CURSOR DE RADAR EN VANILLA JS (Se queda exactamente igual)
const cursorOuter = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('custom-cursor-dot');
let mouseX = -100, mouseY = -100;
let trailX = -100, trailY = -100;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if(cursorDot) {
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


// 3. COMPONENTE REACT (Se queda exactamente igual)
function OceanCatalog() {
  const [favorites, setFavorites] = React.useState([]);
  const [activeFilter, setActiveFilter] = React.useState('Todos');
  const [selectedAnimal, setSelectedAnimal] = React.useState(null);
  const [marqueeAnimals, setMarqueeAnimals] = React.useState([]);
  const catalogRowRef = React.useRef(null);

  // Escuchar el cambio de categoría proveniente de los botones del HTML
  React.useEffect(() => {
    const handleZoneChange = (event) => {
      setActiveFilter(event.detail);
    };

    window.addEventListener('swimzoneChanged', handleZoneChange);
    return () => window.removeEventListener('swimzoneChanged', handleZoneChange);
  }, []);

  React.useEffect(() => {
    const shuffled = [...animalsData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    setMarqueeAnimals([...selected, ...selected, ...selected]);
  }, []);

  const scrollRow = (direction) => {
    if (catalogRowRef.current) {
      const scrollAmount = direction === 'left' ? -324 : 324;
      catalogRowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredAnimals = activeFilter === 'Todos' 
    ? animalsData 
    : animalsData.filter(animal => animal.zone === activeFilter);

  const favoriteAnimals = animalsData.filter(animal => favorites.includes(animal.id));

  return (
    <>
      {/* Sistema de Ruleta Infinito */}
      {marqueeAnimals.length > 0 && (
        <section className="mb-5">
          <div className="container-fluid px-4 px-md-5">
            <h3 className="text-info mb-3 fw-semibold tracking-wider text-uppercase small">Ecosistema en Movimiento</h3>
          </div>
          <div className="marquee-container">
            <div className="marquee-track">
              <div className="marquee-group">
                {marqueeAnimals.map((animal, index) => (
                  <div key={`m1-${animal.id}-${index}`} className="card border-0 netflix-card shadow-lg" onClick={() => setSelectedAnimal(animal)}>
                    <div className="card-img-wrapper" style={{height: '240px'}}>
                      <img src={animal.image} className="custom-img" alt={animal.name} />
                      <div className="card-img-overlay d-flex flex-column justify-content-end overlay-smooth p-3">
                        <h4 className="fw-bold m-0 text-white h5">{animal.name}</h4>
                        <span className="small text-info">{animal.zone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="marquee-group">
                {marqueeAnimals.map((animal, index) => (
                  <div key={`m2-${animal.id}-${index}`} className="card border-0 netflix-card shadow-lg" onClick={() => setSelectedAnimal(animal)}>
                    <div className="card-img-wrapper" style={{height: '240px'}}>
                      <img src={animal.image} className="custom-img" alt={animal.name} />
                      <div className="card-img-overlay d-flex flex-column justify-content-end overlay-smooth p-3">
                        <h4 className="fw-bold m-0 text-white h5">{animal.name}</h4>
                        <span className="small text-info">{animal.zone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid del Catálogo Principal */}
      <main className="container-fluid px-4 px-md-5 mb-5">
        <h3 className="text-info mb-4 fw-semibold tracking-wider text-uppercase small">Catálogo de Especies</h3>
        <div className="row-wrapper-relative">
          <button className="nav-scroll-btn left-btn" onClick={() => scrollRow('left')} type="button" aria-label="Desplazar izquierda">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>
          </button>

          <div className="netflix-row" ref={catalogRowRef}>
            {filteredAnimals.map((animal) => {
              const isFav = favorites.includes(animal.id);
              return (
                <article key={animal.id} className="card border-0 netflix-card shadow-lg" onClick={() => setSelectedAnimal(animal)}>
                  <div className="card-img-wrapper">
                    <button type="button" className={`fav-toggle-btn ${isFav ? 'is-fav' : ''}`} onClick={(e) => toggleFavorite(e, animal.id)}>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>
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

          <button className="nav-scroll-btn right-btn" onClick={() => scrollRow('right')} type="button" aria-label="Desplazar derecha">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
          </button>
        </div>
      </main>

      {/* Colección de Favoritos */}
      {favoriteAnimals.length > 0 && (
        <section className="container-fluid px-4 px-md-5 mb-5">
          <h3 className="text-danger mb-4 fw-semibold tracking-wider text-uppercase small">Mi Colección Privada</h3>
          <div className="netflix-row">
            {favoriteAnimals.map((animal) => (
              <article key={`fav-${animal.id}`} className="card border-0 netflix-card shadow-lg" onClick={() => setSelectedAnimal(animal)}>
                <div className="card-img-wrapper" style={{height: '280px'}}>
                  <button type="button" className="fav-toggle-btn is-fav" onClick={(e) => toggleFavorite(e, animal.id)}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>
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

      {/* Modal Detallado */}
      {selectedAnimal && (
        <div className="custom-modal-overlay" onClick={() => setSelectedAnimal(null)}>
          <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedAnimal(null)}>×</button>
            <div className="row g-0">
              <div className="col-12 col-md-6">
                <img src={selectedAnimal.image} alt={selectedAnimal.name} style={{width: '100%', height: '100%', minHeight: '350px', objectFit: 'cover'}}/>
              </div>
              <div className="col-12 col-md-6 p-4 p-md-5 d-flex flex-column justify-content-center">
                <span className="badge bg-info text-dark align-self-start mb-2 text-uppercase tracking-wider px-3 py-2 fw-bold">Zona {selectedAnimal.zone}</span>
                <h2 className="display-5 fw-bold text-white mb-3">{selectedAnimal.name}</h2>
                <ul className="list-unstyled mb-4 border-start border-info ps-3 py-1">
                  <li className="mb-2"><strong className="text-info">Ubicación:</strong> <span className="text-light">{selectedAnimal.location}</span></li>
                  <li><strong className="text-info">Profundidad Máxima:</strong> <span className="text-light">{selectedAnimal.depth}</span></li>
                </ul>
                <p className="text-secondary lh-lg mb-0 fs-6">{selectedAnimal.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// =================================================================
// 4. LÓGICA DE EXTRACCIÓN REAL: MAPEO EXACTO DE TU ENTIDAD ANIMAL
// =================================================================
async function extraerAnimalesDeJava() {
  const rootContenedor = document.getElementById('react-catalog-root');
  
  try {
    const response = await fetch('http://localhost:8080/api/animals');
    
    if (!response.ok) {
      throw new Error(`El servidor respondió con código: ${response.status}`);
    }
    
    // Aquí llegan los animales tal y como están en tu clase Java (Entity)
    const datosDesdeJava = await response.json();
    
    // Traducimos los campos de Java al "idioma" que espera tu HTML/React
    animalsData = datosDesdeJava.map(animal => {
      return {
        id: animal.id,
        name: animal.name,
        description: animal.description,
        
        // 1. ASIGNACIÓN DEL FILTRO: Usamos tu propiedad 'deep' de Java para la 'zone' de React
        zone: mapearDeepAZona(animal.deep), 
        
        // 2. CAMPOS EXTRA: Pasamos tus datos de Java a lo que la tarjeta visual espera pintar
        location: animal.ocean,    // animal.ocean en Java -> location en React
        depth: animal.deep,        // animal.deep en Java -> depth en React
        
        // 3. SOLUCIÓN A LAS IMÁGENES: Mapeamos tu propiedad 'urlImagen'
        image: animal.urlImagen    // animal.urlImagen en Java -> image en React
      };
    });
    
    if (rootContenedor) rootContenedor.innerHTML = '';
    
    // Inicializamos React con los datos corregidos
    const root = ReactDOM.createRoot(rootContenedor);
    root.render(<OceanCatalog />);
    
  } catch (error) {
    console.error("Error al sincronizar con Spring Boot:", error);
  }
}

// Función para que los botones "Superficie", "Pelágica" y "Abisal" funcionen con tu texto de 'deep'
function mapearDeepAZona(deepTexto) {
  if (!deepTexto) return 'Todos';
  
  const texto = deepTexto.toLowerCase();
  
  if (texto.includes('superficie')) return 'Superficie';
  if (texto.includes('pelagica') || texto.includes('pelágica')) return 'Pelágica';
  if (texto.includes('abisal')) return 'Abisal';
  
  return 'Todos'; 
}

// Ejecución automática al cargar la página
extraerAnimalesDeJava();