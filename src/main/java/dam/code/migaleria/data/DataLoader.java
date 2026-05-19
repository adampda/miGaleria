package dam.code.migaleria.data;

import dam.code.migaleria.model.Animal;
import dam.code.migaleria.repository.AnimalRepository; // Asegúrate de que el nombre coincida con tu interfaz
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private AnimalRepository animalRepository;

    @Override
    public void run(String... args) throws Exception {
        // Solo cargamos los datos si la base de datos está completamente vacía
        if (animalRepository.count() == 0) {

            List<Animal> animales = List.of(
                    // =========================================================================
                    // 10 ANIMALES DE SUPERFICIE (EPIPELÁGICOS: 0 - 200m) -> Palabra clave: Superficie
                    // =========================================================================
                    new Animal(
                            "Delfín Mular", "Superficie (0 - 50 metros)",
                            "Es una de las especies de delfines más conocidas. Son animales altamente inteligentes y sociales que viven en grupos compactos y se comunican mediante un complejo sistema de silbidos y clics.",
                            "Océano Atlántico y Pacífico",
                            "https://images.unsplash.com/photo-1607305387299-a3d9611cd46f?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Tortuga Laúd", "Superficie (0 - 200 metros)",
                            "La más grande de todas las tortugas marinas, única por no tener un caparazón rígido, sino una estructura de piel coriácea. Realiza las migraciones transoceánicas más largas de cualquier reptil.",
                            "Océano Atlántico, Pacífico e Índico",
                            "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Pez Volador", "Superficie (0 - 10 metros)",
                            "Posee aletas pectorales inusualmente grandes que le permiten planear fuera del agua a distancias de hasta 200 metros para escapar de depredadores rápidos como los atunes.",
                            "Océanos Tropicales y Subtropicales",
                            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Orca", "Superficie (0 - 100 metros)",
                            "El superdepredador definitivo de los océanos. Aunque pertenecen a la familia de los delfines, su imponente tamaño y sofisticadas estrategias de caza en equipo les permiten dominar cualquier costa.",
                            "Océanos Globales (Zonas Polares y Templadas)",
                            "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Pez Vela del Indo-Pacífico", "Superficie (0 - 30 metros)",
                            "Reconocido como el pez más rápido del océano, alcanzando velocidades de hasta 110 km/h gracias a su cuerpo aerodinámico y una impresionante aleta dorsal en forma de vela.",
                            "Océano Índico y Pacífico",
                            "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Manta Raya Gigante", "Superficie (0 - 120 metros)",
                            "Criaturas majestuosas y pacíficas con una envergadura de hasta 7 metros. A diferencia de otras rayas, no poseen aguijón venenoso y se alimentan exclusivamente filtrando plancton.",
                            "Aguas Templadas y Tropicales",
                            "https://images.unsplash.com/photo-1590242421991-64c4131cd52e?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Tiburón Ballena", "Superficie (0 - 70 metros)",
                            "El pez más grande del mundo, superando los 12 metros de longitud. Un gigante dócil que viaja por aguas cálidas filtrando agua para consumir toneladas de krill diariamente.",
                            "Mares Cálidos y Tropicales",
                            "https://images.unsplash.com/photo-1560275669-46c5a88d6a4c?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Medusa Melena de León", "Superficie (0 - 40 metros)",
                            "Una de las criaturas más largas del planeta. Sus tentáculos pueden extenderse más de 30 metros de longitud, capturando pequeños peces mediante un potente veneno urticante.",
                            "Océano Ártico y Atlántico Norte",
                            "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "León Marino de California", "Superficie (0 - 100 metros)",
                            "Mamífero marino altamente ágil e inteligente. Pasa gran parte de su tiempo en costas rocosas y muelles, utilizando sus grandes aletas delanteras para impulsarse con velocidad en el agua.",
                            "Océano Pacífico Norte",
                            "https://images.unsplash.com/photo-1470165345037-f8cc04838f53?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Pez León", "Superficie (1 - 50 metros)",
                            "Famoso por sus vistosas líneas de cebra y sus aletas espinosas cargadas de veneno neurotóxico. Es un depredador voraz y una especie invasora problemática en el Caribe.",
                            "Océano Índico y Pacífico Occidental",
                            "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=800"
                    ),

                    // =========================================================================
                    // 10 ANIMALES PELÁGICOS (MESOPELÁGICOS: 200 - 1000m) -> Palabra clave: Pelágica
                    // =========================================================================
                    new Animal(
                            "Pez Espada", "Pelágica (200 - 800 metros)",
                            "Depredador de la zona de penumbra. Utiliza su característico pico aplanado para golpear y aturdir a sus presas antes de devorarlas. Tolera cambios drásticos de temperatura.",
                            "Océanos Globales (Aguas Templadas)",
                            "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Calamar de Humboldt", "Pelágica (200 - 700 metros)",
                            "Conocido como 'el demonio rojo' debido a los destellos de color que emite su piel al cazar. Posee una fuerza descomunal y un pico capaz de quebrar huesos con facilidad.",
                            "Océano Pacífico Oriental",
                            "https://images.unsplash.com/photo-1579957134814-e1ff1999c18a?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Atún Rojo del Atlántico", "Pelágica (0 - 900 metros)",
                            "Una máquina biológica de velocidad. Su sistema circulatorio especializado le permite mantener su temperatura corporal por encima del agua circundante, lo que optimiza sus músculos en el frío intermedio.",
                            "Océano Atlántico y Mar Mediterráneo",
                            "https://images.unsplash.com/photo-1516683018643-551fdcd35cc5?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Celacanto de Comores", "Pelágica (150 - 700 metros)",
                            "Un fósil viviente que se creía extinto desde la época de los dinosaurios hasta su redescubrimiento en 1938. Sus aletas lobuladas se mueven de manera similar a las patas de los animales terrestres.",
                            "Océano Índico Occidental",
                            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Pez Linterna Opaco", "Pelágica (200 - 1000 metros)",
                            "Pequeños pero masivos en número. Emiten luz azul o verde mediante fotóforos en su vientre para camuflarse de los depredadores de abajo, un fenómeno conocido como contrailuminación.",
                            "Océanos Globales",
                            "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Nautilo Común", "Pelágica (100 - 600 metros)",
                            "Cefalópodo ancestral atrapado en el tiempo. Controla su flotabilidad en el agua regulando los niveles de gas y líquido dentro de las cámaras internas de su caparazón espiral.",
                            "Océano Pacífico Indo-Occidental",
                            "https://images.unsplash.com/photo-1629812456605-4a044aa38fbc?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Pez Opah (Pez Luna Real)", "Pelágica (100 - 500 metros)",
                            "El único pez completamente endotérmico conocido. Al calentar todo su cuerpo (incluidos el cerebro y el corazón), reacciona mucho más rápido que sus presas de sangre fría en aguas profundas.",
                            "Océanos Templados y Tropicales",
                            "https://images.unsplash.com/photo-1504370805625-d32c54b16100?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Tiburón Azul", "Pelágica (0 - 350 metros)",
                            "Un tiburón pelágico de cuerpo sumamente estilizado y aletas pectorales largas. Migra distancias masivas cruzando océanos enteros en busca de bancos de calamares.",
                            "Océanos Globales (Aguas Templadas y Tropicales)",
                            "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Gran Barracuda", "Pelágica (0 - 200 metros)",
                            "Famosas por su mandíbula inferior prominente repleta de dientes afilados como cuchillas. Cazan al acecho acelerando instantáneamente a velocidades letales.",
                            "Mares Tropicales (Atlántico e Indo-Pacífico)",
                            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Calamar Vampiro", "Pelágica (600 - 900 metros)",
                            "Un relicto evolutivo que no es ni calamar ni pulpo. Vive en la zona de mínimo oxígeno del océano y utiliza filamentos sensoriales para recoger restos orgánicos flotantes en lugar de cazar presas vivas.",
                            "Aguas Tropicales y Templadas Profundas",
                            "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&q=80&w=800"
                    ),

                    // =========================================================================
                    // 10 ANIMALES ABISALES (BATI / ABISOPELÁGICOS: > 1000m) -> Palabra clave: Abisal
                    // =========================================================================
                    new Animal(
                            "Rape Abisal (Pez Linterna)", "Abisal (1000 - 3000 metros)",
                            "La icónica pesadilla de las profundidades. Las hembras poseen un apéndice carnoso bioluminiscente en la cabeza que simula una presa atrayendo a las víctimas directo a sus colosales fauces.",
                            "Océanos Globales (Zonas Abisales)",
                            "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Pez Pelícano", "Abisal (1000 - 3000 metros)",
                            "Posee una boca gigantesca y elástica, mucho mayor que el resto de su cuerpo serpentino. Esto le permite engullir de un bocado presas significativamente más grandes que él.",
                            "Mares Tropicales y Templados",
                            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Pulpo Dumbo", "Abisal (1000 - 4000 metros)",
                            "Nombrado así por sus dos aletas membranosas en la cabeza que asemejan orejas. Habita a profundidades extremas donde la luz solar es nula y se desplaza planeando suavemente sobre el lecho.",
                            "Océanos Globales (Aguas Ultraprofundas)",
                            "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Pez Gota (Blobfish)", "Abisal (600 - 1200 metros)",
                            "En su hábitat, bajo una presión aplastante, su cuerpo es perfectamente funcional. Su carne gelatinosa tiene una densidad ligeramente menor que el agua, permitiéndole flotar sin gastar energía.",
                            "Costas de Australia y Tasmania",
                            "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Isópodo Gigante", "Abisal (500 - 2500 metros)",
                            "Un claro ejemplo de gigantismo abisal. Es un pariente lejano de las cochinillas terrestres de la humedad, pero adaptado al fondo marino, donde actúa como un importante carroñero.",
                            "Océano Atlántico e Índico",
                            "https://images.unsplash.com/photo-1544626053-8985dc34ae63?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Pez Víbora de Sloane", "Abisal (500 - 2500 metros)",
                            "Tiene unos dientes transparentes tan largos que no caben dentro de su boca y debe cerrarla replegándolos hacia los lados de los ojos. Atrapa presas nadando a gran velocidad.",
                            "Aguas Tropicales y Templadas",
                            "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Tiburón Duende", "Abisal (100 - 1300 metros)",
                            "Una rareza evolutiva con un hocico alargado y aplanado. Su característica más impresionante es que puede proyectar sus mandíbulas completamente hacia afuera de la cara para atrapar presas rápidas.",
                            "Océanos Globales",
                            "https://images.unsplash.com/photo-1513553404607-988bf2703777?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Cangrejo Yeti", "Abisal (2200 metros)",
                            "Descubierto en fuentes hidrotermales del Pacífico. Sus pinzas están cubiertas de filamentos repletos de bacterias que utiliza para desintoxicar los compuestos venonosos del azufre volcánico.",
                            "Océano Pacífico Sur",
                            "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Tiburón Anguila", "Abisal (500 - 1500 metros)",
                            "De aspecto similar a una serpiente marina, posee filas de dientes con forma de tridente orientados hacia atrás que impiden que cualquier presa que muerda logre escapar de su boca.",
                            "Océano Atlántico y Pacífico",
                            "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800"
                    ),
                    new Animal(
                            "Pez Colmillo Largo (Fangtooth)", "Abisal (500 - 5000 metros)",
                            "A pesar de su aspecto feroz y de tener los dientes proporcionalmente más grandes de cualquier pez en relación con su cuerpo, es una especie pequeña que apenas alcanza los 15 cm de largo.",
                            "Océanos Tropicales y Templados",
                            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
                    )
            );

            animalRepository.saveAll(animales);
            System.out.println(">> ¡Éxito! Se han inyectado correctamente los 30 animales marinos en la base de datos.");
        } else {
            System.out.println(">> La base de datos ya contiene registros. Saltando la inicialización del DataLoader.");
        }
    }
}
