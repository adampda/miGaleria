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
                            "https://cetaceostenerife.com/wp-content/uploads/2021/07/delfines-tenerife.jpg.webp"
                    ),
                    new Animal(
                            "Tortuga Laúd", "Superficie (0 - 200 metros)",
                            "La más grande de todas las tortugas marinas, única por no tener un caparazón rígido, sino una estructura de piel coriácea. Realiza las migraciones transoceánicas más largas de cualquier reptil.",
                            "Océano Atlántico, Pacífico e Índico",
                            "https://ekosnegocios.com/image/posts/January2026/vha31zaQYARTxm3bc7re.jpg"
                    ),
                    new Animal(
                            "Pez Volador", "Superficie (0 - 10 metros)",
                            "Posee aletas pectorales inusualmente grandes que le permiten planear fuera del agua a distancias de hasta 200 metros para escapar de depredadores rápidos como los atunes.",
                            "Océanos Tropicales y Subtropicales",
                            "https://www.fishipedia.es/wp-content/uploads/2020/10/Exocoetus-volitans-725x483.jpg"
                    ),
                    new Animal(
                            "Orca", "Superficie (0 - 100 metros)",
                            "El superdepredador definitivo de los océanos. Aunque pertenecen a la familia de los delfines, su imponente tamaño y sofisticadas estrategias de caza en equipo les permiten dominar cualquier costa.",
                            "Océanos Globales (Zonas Polares y Templadas)",
                            "https://t4.ftcdn.net/jpg/15/93/54/61/360_F_1593546199_fCVzEkywWv2ZMOYQvH0RYxTaZW87xfeZ.jpg"
                    ),
                    new Animal(
                            "Pez Vela del Indo-Pacífico", "Superficie (0 - 30 metros)",
                            "Reconocido como el pez más rápido del océano, alcanzando velocidades de hasta 110 km/h gracias a su cuerpo aerodinámico y una impresionante aleta dorsal en forma de vela.",
                            "Océano Índico y Pacífico",
                            "https://www.aquaportail.com/aquabdd/photos/istiophorus-platypterus.webp"
                    ),
                    new Animal(
                            "Manta Raya Gigante", "Superficie (0 - 120 metros)",
                            "Criaturas majestuosas y pacíficas con una envergadura de hasta 7 metros. A diferencia de otras rayas, no poseen aguijón venenoso y se alimentan exclusivamente filtrando plancton.",
                            "Aguas Templadas y Tropicales",
                            "https://oceantoursmexico.com/wp-content/uploads/2025/05/Manta-06.jpg"
                    ),
                    new Animal(
                            "Tiburón Ballena", "Superficie (0 - 70 metros)",
                            "El pez más grande del mundo, superando los 12 metros de longitud. Un gigante dócil que viaja por aguas cálidas filtrando agua para consumir toneladas de krill diariamente.",
                            "Mares Cálidos y Tropicales",
                            "https://www.fundacionaquae.org/wp-content/uploads/2019/09/tibur%C3%B3n-ballena-1.jpg"
                    ),
                    new Animal(
                            "Medusa Melena de León", "Superficie (0 - 40 metros)",
                            "Una de las criaturas más largas del planeta. Sus tentáculos pueden extenderse más de 30 metros de longitud, capturando pequeños peces mediante un potente veneno urticante.",
                            "Océano Ártico y Atlántico Norte",
                            "https://www.anipedia.net/imagenes/medusa-melena-leon.jpg"
                    ),
                    new Animal(
                            "León Marino de California", "Superficie (0 - 100 metros)",
                            "Mamífero marino altamente ágil e inteligente. Pasa gran parte de su tiempo en costas rocosas y muelles, utilizando sus grandes aletas delanteras para impulsarse con velocidad en el agua.",
                            "Océano Pacífico Norte",
                            "https://www.junglepark.es/wp-content/uploads/2023/09/the-north-pacific-sea-lions-2403928_640.jpg"
                    ),
                    new Animal(
                            "Pez León", "Superficie (1 - 50 metros)",
                            "Famoso por sus vistosas líneas de cebra y sus aletas espinosas cargadas de veneno neurotóxico. Es un depredador voraz y una especie invasora problemática en el Caribe.",
                            "Océano Índico y Pacífico Occidental",
                            "https://estaticos-cdn.prensaiberica.es/clip/f833bf57-d59d-4c50-950a-3ffe6234c6d9_alta-libre-aspect-ratio_default_0.jpg"
                    ),

                    // =========================================================================
                    // 10 ANIMALES PELÁGICOS (MESOPELÁGICOS: 200 - 1000m) -> Palabra clave: Pelágica
                    // =========================================================================
                    new Animal(
                            "Pez Espada", "Pelágica (200 - 800 metros)",
                            "Depredador de la zona de penumbra. Utiliza su característico pico aplanado para golpear y aturdir a sus presas antes de devorarlas. Tolera cambios drásticos de temperatura.",
                            "Océanos Globales (Aguas Templadas)",
                            "https://jomenjopeix.com/wp-content/uploads/swordfish.jpg"
                    ),
                    new Animal(
                            "Calamar de Humboldt", "Pelágica (200 - 700 metros)",
                            "Conocido como 'el demonio rojo' debido a los destellos de color que emite su piel al cazar. Posee una fuerza descomunal y un pico capaz de quebrar huesos con facilidad.",
                            "Océano Pacífico Oriental",
                            "https://efeverde.com/wp-content/uploads/2022/01/Calamar-gigante-03.jpg"
                    ),
                    new Animal(
                            "Atún Rojo del Atlántico", "Pelágica (0 - 900 metros)",
                            "Una máquina biológica de velocidad. Su sistema circulatorio especializado le permite mantener su temperatura corporal por encima del agua circundante, lo que optimiza sus músculos en el frío intermedio.",
                            "Océano Atlántico y Mar Mediterráneo",
                            "https://www.realclubnauticoroquetas.es/wp-content/uploads/2021/06/cuotas-atun-rojo.jpg"
                    ),
                    new Animal(
                            "Celacanto de Comores", "Pelágica (150 - 700 metros)",
                            "Un fósil viviente que se creía extinto desde la época de los dinosaurios hasta su redescubrimiento en 1938. Sus aletas lobuladas se mueven de manera similar a las patas de los animales terrestres.",
                            "Océano Índico Occidental",
                            "https://cdn.agenciasinc.es/var/ezwebin_site/storage/images/_aliases/img_1col/en-exclusiva/embargos/confirman-la-presencia-de-pulmones-en-peces-celacantos/5496055-1-esl-MX/Confirman-la-presencia-de-pulmones-en-peces-celacantos.jpg"
                    ),
                    new Animal(
                            "Pez Linterna Opaco", "Pelágica (200 - 1000 metros)",
                            "Pequeños pero masivos en número. Emiten luz azul o verde mediante fotóforos en su vientre para camuflarse de los depredadores de abajo, un fenómeno conocido como contrailuminación.",
                            "Océanos Globales",
                            "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/ZXRGIVEMT5HFBEMYHDHTXU2HUQ.png"
                    ),
                    new Animal(
                            "Nautilo Común", "Pelágica (100 - 600 metros)",
                            "Cefalópodo ancestral atrapado en el tiempo. Controla su flotabilidad en el agua regulando los niveles de gas y líquido dentro de las cámaras internas de su caparazón espiral.",
                            "Océano Pacífico Indo-Occidental",
                            "https://muyinteresante.okdiario.com/wp-content/uploads/sites/5/2023/02/18/63f0c70a4cfd4-og.jpeg"
                    ),
                    new Animal(
                            "Pez Opah (Pez Luna Real)", "Pelágica (100 - 500 metros)",
                            "El único pez completamente endotérmico conocido. Al calentar todo su cuerpo (incluidos el cerebro y el corazón), reacciona mucho más rápido que sus presas de sangre fría en aguas profundas.",
                            "Océanos Templados y Tropicales",
                            "https://estaticos-cdn.prensaiberica.es/clip/2f8ef736-8ad7-494b-976a-158b7aaf14f4_media-libre-aspect-ratio_default_0.jpg"
                    ),
                    new Animal(
                            "Tiburón Azul", "Pelágica (0 - 350 metros)",
                            "Un tiburón pelágico de cuerpo sumamente estilizado y aletas pectorales largas. Migra distancias masivas cruzando océanos enteros en busca de bancos de calamares.",
                            "Océanos Globales (Aguas Templadas y Tropicales)",
                            "https://peru.oceana.org/wp-content/uploads/sites/22/joostvanuffelentiburonazul.jpg"
                    ),
                    new Animal(
                            "Gran Barracuda", "Pelágica (0 - 200 metros)",
                            "Famosas por su mandíbula inferior prominente repleta de dientes afilados como cuchillas. Cazan al acecho acelerando instantáneamente a velocidades letales.",
                            "Mares Tropicales (Atlántico e Indo-Pacífico)",
                            "https://pescadordeportivo.net/wp-content/uploads/2018/04/pez-barracuda.jpg"
                    ),
                    new Animal(
                            "Calamar Vampiro", "Pelágica (600 - 900 metros)",
                            "Un relicto evolutivo que no es ni calamar ni pulpo. Vive en la zona de mínimo oxígeno del océano y utiliza filamentos sensoriales para recoger restos orgánicos flotantes en lugar de cazar presas vivas.",
                            "Aguas Tropicales y Templadas Profundas",
                            "https://static.vocento.com/xlsemanal/wp-content/uploads/sites/5/2022/05/calamar-vampiro-del-infierno-mitad-pulpo-5.jpg"
                    ),

                    // =========================================================================
                    // 10 ANIMALES ABISALES (BATI / ABISOPELÁGICOS: > 1000m) -> Palabra clave: Abisal
                    // =========================================================================
                    new Animal(
                            "Rape Abisal (Pez Linterna)", "Abisal (1000 - 3000 metros)",
                            "La icónica pesadilla de las profundidades. Las hembras poseen un apéndice carnoso bioluminiscente en la cabeza que simula una presa atrayendo a las víctimas directo a sus colosales fauces.",
                            "Océanos Globales (Zonas Abisales)",
                            "https://www.cronicabalear.es/access/public/img/noticias/upload/0_1738880184.jpg"
                    ),
                    new Animal(
                            "Pez Pelícano", "Abisal (1000 - 3000 metros)",
                            "Posee una boca gigantesca y elástica, mucho mayor que el resto de su cuerpo serpentino. Esto le permite engullir de un bocado presas significativamente más grandes que él.",
                            "Mares Tropicales y Templados",
                            "https://cloudfront-eu-central-1.images.arcpublishing.com/diarioas/RIDEWCSYMVHX5FNM5CRUHNVZEE.jpg"
                    ),
                    new Animal(
                            "Pulpo Dumbo", "Abisal (1000 - 4000 metros)",
                            "Nombrado así por sus dos aletas membranosas en la cabeza que asemejan orejas. Habita a profundidades extremas donde la luz solar es nula y se desplaza planeando suavemente sobre el lecho.",
                            "Océanos Globales (Aguas Ultraprofundas)",
                            "https://images.ecestaticos.com/pp5VQ2wqC-8Gf1_xIKIqq3kW9UY=/1x1:996x592/1440x810/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F4e3%2F8ec%2Fbdb%2F4e38ecbdb525811e09b483b7e6cdd9e8.jpg"
                    ),
                    new Animal(
                            "Pez Gota (Blobfish)", "Abisal (600 - 1200 metros)",
                            "En su hábitat, bajo una presión aplastante, su cuerpo es perfectamente funcional. Su carne gelatinosa tiene una densidad ligeramente menor que el agua, permitiéndole flotar sin gastar energía.",
                            "Costas de Australia y Tasmania",
                            "https://www.shutterstock.com/image-photo/blob-fish-600nw-2537653487.jpg"
                    ),
                    new Animal(
                            "Isópodo Gigante", "Abisal (500 - 2500 metros)",
                            "Un claro ejemplo de gigantismo abisal. Es un pariente lejano de las cochinillas terrestres de la humedad, pero adaptado al fondo marino, donde actúa como un importante carroñero.",
                            "Océano Atlántico e Índico",
                            "https://d1v5k86lqgwnzg.cloudfront.net/assets/images/animals/deep-sea/mba/giant-deep-sea-isopod-tr22-0013.jpg"
                    ),
                    new Animal(
                            "Pez Víbora de Sloane", "Abisal (500 - 2500 metros)",
                            "Tiene unos dientes transparentes tan largos que no caben dentro de su boca y debe cerrarla replegándolos hacia los lados de los ojos. Atrapa presas nadando a gran velocidad.",
                            "Aguas Tropicales y Templadas",
                            "https://live.staticflickr.com/5525/30581275486_1097ce8cef_b.jpg"
                    ),
                    new Animal(
                            "Tiburón Duende", "Abisal (100 - 1300 metros)",
                            "Una rareza evolutiva con un hocico alargado y aplanado. Su característica más impresionante es que puede proyectar sus mandíbulas completamente hacia afuera de la cara para atrapar presas rápidas.",
                            "Océanos Globales",
                            "https://www.atlanticohoy.com/uploads/s1/35/98/35/6/tiburon-duende_24_1200x676.webp"
                    ),
                    new Animal(
                            "Cangrejo Yeti", "Abisal (2200 metros)",
                            "Descubierto en fuentes hidrotermales del Pacífico. Sus pinzas están cubiertas de filamentos repletos de bacterias que utiliza para desintoxicar los compuestos venonosos del azufre volcánico.",
                            "Océano Pacífico Sur",
                            "https://upload.wikimedia.org/wikipedia/commons/e/e2/Galath%C3%A9e_y%C3%A9ti%2C_un_habitant_des_profondeurs_abyssales_%28Ifremer_00569-68091_-_25272%29.jpg"
                    ),
                    new Animal(
                            "Tiburón Anguila", "Abisal (500 - 1500 metros)",
                            "De aspecto similar a una serpiente marina, posee filas de dientes con forma de tridente orientados hacia atrás que impiden que cualquier presa que muerda logre escapar de su boca.",
                            "Océano Atlántico y Pacífico",
                            "https://www.anipedia.net/imagenes/tiburon-anguila.jpg"
                    ),
                    new Animal(
                            "Pez Colmillo Largo (Fangtooth)", "Abisal (500 - 5000 metros)",
                            "A pesar de su aspecto feroz y de tener los dientes proporcionalmente más grandes de cualquier pez en relación con su cuerpo, es una especie pequeña que apenas alcanza los 15 cm de largo.",
                            "Océanos Tropicales y Templados",
                            "https://www.ecured.cu/images/e/e3/Fangtooth_shorthorned.jpg"
                    )
            );

            animalRepository.saveAll(animales);
            System.out.println(">> ¡Éxito! Se han inyectado correctamente los 30 animales marinos en la base de datos.");
        } else {
            System.out.println(">> La base de datos ya contiene registros. Saltando la inicialización del DataLoader.");
        }
    }
}
