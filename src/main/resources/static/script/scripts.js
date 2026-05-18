const animalsData = [
  {
    id: 1,
    name: 'Calamar Gigante',
    zone: 'Abisal',
    location: 'Océano Pacífico',
    depth: '1000 metros',
    description: 'Una criatura misteriosa que habita en las profundidades abisales. Posee ojos del tamaño de pelotas de baloncesto y tentáculos gigantescos capaces de batallar contra cachalotes.',
    image: 'https://images.unsplash.com/photo-1544626053-8985dc34ae63?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    name: 'Medusa Bioluminiscente',
    zone: 'Abisal',
    location: 'Aguas profundas globales',
    depth: '2000 metros',
    description: 'Capaz de generar su propia luz mediante reacciones químicas en su campana, creando un espectáculo visual hipnótico en la oscuridad total del océano para atraer presas.',
    image: 'https://images.unsplash.com/photo-1548682570-7d72cb612a22?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    name: 'Tiburón Blanco',
    zone: 'Superficie',
    location: 'Costas templadas',
    depth: '0 - 250 metros',
    description: 'El depredador definitivo de los mares. Su diseño hidrodinámico y sus receptores electromagnéticos casi no han cambiado en millones de años debido a su absoluta perfección evolutiva.',
    image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    name: 'Mantarraya',
    zone: 'Pelágica',
    location: 'Mares tropicales',
    depth: '0 - 120 metros',
    description: 'Los gigantes gentiles del mar. Nadan con una gracia inigualable asemejando un vuelo subacuático, filtrando toneladas de plancton mientras planean pacíficamente.',
    image: 'https://images.unsplash.com/photo-1616235129676-43b9cc20c57c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    name: 'Pez Linterna',
    zone: 'Abisal',
    location: 'Zona Antártica',
    depth: '1500 metros',
    description: 'Posee un apéndice carnoso sobre su cabeza iluminado por bacterias simbiontes. Utiliza este destello como un señuelo mortal en entornos de oscuridad absoluta.',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    name: 'Dragón Azul',
    zone: 'Superficie',
    location: 'Aguas Templadas',
    depth: '0 metros',
    description: 'Un diminuto nudibranquio flotante que se alimenta de carabelas portuguesas, asimilando y concentrando sus células urticantes para utilizarlas como su propia y letal defensa.',
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=800'
  }
];

const generalCuriosities = [
  { title: "Presión Extrema", text: "En lo más profundo de la fosa de las Marianas, la presión es equivalente a que un elefante sostenga tu dedo pulgar." },
  { title: "Oxígeno Vital", text: "Más del 50% del oxígeno de nuestro planeta es producido por el fitoplancton marino, no por los bosques terrestres." },
  { title: "El Gran Mapa", text: "Conocemos mejor la superficie de la Luna o de Marte que el propio fondo de nuestros océanos; el 80% sigue sin cartografiar." }
];

function OceanGallery() {
  const [favorites, setFavorites] = React.useState([]);
  const [activeFilter, setActiveFilter] = React.useState('Todos');
  const [selectedAnimal, setSelectedAnimal] = React.useState(null);
  const [marqueeAnimals, setMarqueeAnimals] = React.useState([]);
  
  // Puntero
  const [cursorPos, setCursorPos] = React.useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = React.useState({ x: -100, y: -100 });

  // Referencia para controlar el scroll por botones del Catálogo
  const catalogRowRef = React.useRef(null);

  // Selección aleatoria al cargar la página (Clonada x3 para evitar huecos en la ruleta)
  React.useEffect(() => {
    const shuffled = [...animalsData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    setMarqueeAnimals([...selected, ...selected, ...selected]);
  }, []);

  // Seguimiento del ratón
  React.useEffect(() => {
    const moveCursor = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Suavizado del círculo exterior del cursor
  React.useEffect(() => {
    let animationFrame;
    const updateTrailing = () => {
      setTrailingPos(prev => {
        const dx = cursorPos.x - prev.x;
        const dy = cursorPos.y - prev.y;
        return { x: prev.x + dx * 0.45, y: prev.y + dy * 0.45 };
      });
      animationFrame = requestAnimationFrame(updateTrailing);
    };
    animationFrame = requestAnimationFrame(updateTrailing);
    return () => cancelAnimationFrame(animationFrame);
  }, [cursorPos]);

  // Manejador del Scroll Lateral por Botones
  const scrollRow = (direction) => {
    if (catalogRowRef.current) {
      // Desplaza el equivalente a una tarjeta (300px) + el gap (24px)
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
    <div className="ocean-container min-vh-100 text-light py-5">
      
      {/* Cursores */}
      <div className="custom-cursor" style={{ left: `${trailingPos.x}px`, top: `${trailingPos.y}px` }}></div>
      <div className="custom-cursor-dot" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}></div>

      <header className="container mb-4 text-center">
        <h1 className="fw-bold title-glow text-uppercase tracking-wide">Explorador del Océano</h1>
        <p className="lead text-info fw-light">Descubre las maravillas de las profundidades</p>
      </header>

      {/* RUCOLETA INFINITA SIN HUECOS */}
      {marqueeAnimals.length > 0 && (
        <section className="mb-5">
          <div className="container-fluid px-4 px-md-5">
            <h3 className="text-info mb-3 fw-semibold tracking-wider text-uppercase small">Ecosistema en Movimiento</h3>
          </div>
          <div className="marquee-container">
            <div className="marquee-track">
              
              <div className="marquee-group">
                {marqueeAnimals.map((animal, index) => (
                  <div 
                    key={`m1-${animal.id}-${index}`} 
                    className="card border-0 netflix-card shadow-lg"
                    onClick={() => setSelectedAnimal(animal)}
                  >
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
                  <div 
                    key={`m2-${animal.id}-${index}`} 
                    className="card border-0 netflix-card shadow-lg"
                    onClick={() => setSelectedAnimal(animal)}
                  >
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

      {/* Filtros */}
      <section className="container mb-5">
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          {['Todos', 'Superficie', 'Pelágica', 'Abisal'].map((zone) => (
            <button
              key={zone}
              onClick={() => setActiveFilter(zone)}
              className={`filter-badge border-0 ${activeFilter === zone ? 'active' : ''}`}
            >
              {zone}
            </button>
          ))}
        </div>
      </section>

      {/* Rejilla Principal con Navegación por Flechas */}
      <main className="container-fluid px-4 px-md-5 mb-5">
        <h3 className="text-info mb-4 fw-semibold tracking-wider text-uppercase small">Catálogo de Especies</h3>
        
        <div className="row-wrapper-relative">
          
          {/* Botón Izquierda */}
          <button 
            className="nav-scroll-btn left-btn" 
            onClick={() => scrollRow('left')}
            type="button"
            aria-label="Desplazar a la izquierda"
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
          </button>

          {/* Fila de Tarjetas con asignación de Ref */}
          <div className="netflix-row" ref={catalogRowRef}>
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
                      className={`fav-toggle-btn ${isFav ? 'is-fav' : ''}`}
                      onClick={(e) => toggleFavorite(e, animal.id)}
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
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
                        <p className="card-text small text-secondary mb-4 description-text">
                          {animal.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Botón Derecha */}
          <button 
            className="nav-scroll-btn right-btn" 
            onClick={() => scrollRow('right')}
            type="button"
            aria-label="Desplazar a la derecha"
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>

        </div>
      </main>

      {/* Favoritos */}
      {favoriteAnimals.length > 0 && (
        <section className="container-fluid px-4 px-md-5 mb-5">
          <h3 className="text-danger mb-4 fw-semibold tracking-wider text-uppercase small">Mi Colección Privada</h3>
          <div className="netflix-row">
            {favoriteAnimals.map((animal) => (
              <article 
                key={`fav-${animal.id}`} 
                className="card border-0 netflix-card shadow-lg"
                onClick={() => setSelectedAnimal(animal)}
              >
                <div className="card-img-wrapper" style={{height: '280px'}}>
                  <button 
                    type="button" 
                    className="fav-toggle-btn is-fav"
                    onClick={(e) => toggleFavorite(e, animal.id)}
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
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

      {/* Curiosidades */}
      <section className="container my-5">
        <h3 className="text-success mb-4 text-center fw-semibold tracking-wider text-uppercase small">Datos de Inmersión</h3>
        <div className="row g-4">
          {generalCuriosities.map((item, index) => (
            <div key={index} className="col-12 col-md-4">
              <div className="curiosity-box h-100">
                <h4 className="h5 text-info mb-3 fw-bold">{item.title}</h4>
                <p className="small text-secondary mb-0 lh-base">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Visor Detallado */}
      {selectedAnimal && (
        <div className="custom-modal-overlay" onClick={() => setSelectedAnimal(null)}>
          <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedAnimal(null)}>×</button>
            <div className="row g-0">
              <div className="col-12 col-md-6">
                <img 
                  src={selectedAnimal.image} 
                  alt={selectedAnimal.name} 
                  style={{width: '100%', height: '100%', minHeight: '350px', objectFit: 'cover'}}
                />
              </div>
              <div className="col-12 col-md-6 p-4 p-md-5 d-flex flex-column justify-content-center">
                <span className="badge bg-info text-dark align-self-start mb-2 text-uppercase tracking-wider px-3 py-2 fw-bold">
                  Zona {selectedAnimal.zone}
                </span>
                <h2 className="display-5 fw-bold text-white mb-3">{selectedAnimal.name}</h2>
                <ul className="list-unstyled mb-4 border-start border-info ps-3 py-1">
                  <li className="mb-2"><strong className="text-info">Ubicación:</strong> <span className="text-light">{selectedAnimal.location}</span></li>
                  <li><strong className="text-info">Profundidad Máxima:</strong> <span className="text-light">{selectedAnimal.depth}</span></li>
                </ul>
                <p className="text-secondary lh-lg mb-0 fs-6">
                  {selectedAnimal.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<OceanGallery />);